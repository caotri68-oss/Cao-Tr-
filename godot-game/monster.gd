extends Node3D
# Quái biển: trồi lên từ nước, bơi vào bờ, bò lên cạn và tấn công người que.
# Ba loại: crab (cua đá), merman (ngư nhân), kraken (hải quái - trùm).

const Terrain = preload("res://terrain.gd")
const Fx = preload("res://fx.gd")

signal died(monster: Node3D)

enum S { EMERGE, MOVE, WINDUP, STRIKE, RECOVER, STAGGER, DEAD }

static var _skin_normal: NoiseTexture2D

var kind: String = "crab"
var player: Node3D
var world: Node3D
var hp: float = 30.0
var max_hp: float = 30.0
var speed_land: float = 3.0
var speed_swim: float = 3.0
var dmg: float = 8.0
var reach: float = 1.5
var radius: float = 0.7
var windup_time: float = 0.5
var recover_time: float = 0.6
var gold: int = 5
var height: float = 1.2
var submerge: float = 0.3

var state: S = S.EMERGE
var st_t: float = 0.0
var yaw: float = 0.0
var knock_vel: Vector3 = Vector3.ZERO
var flash: float = 0.0
var anim_t: float = 0.0
var walk_amt: float = 0.0
var struck: bool = false
var frozen: bool = false   # chỉ dùng khi xem thử hình dáng

var body: Node3D
var mats: Array[StandardMaterial3D] = []
var legs: Array[Node3D] = []
var arms: Array[Node3D] = []
var tentacles: Array = []   # mỗi phần tử là Array[Node3D] (các đốt)
var bar_root: Node3D
var bar_fg: MeshInstance3D
var bar_w: float = 1.0

func setup(p_kind: String, p_player: Node3D, p_world: Node3D, wave: int) -> void:
	kind = p_kind
	player = p_player
	world = p_world
	anim_t = randf() * 10.0
	match kind:
		"crab":
			max_hp = 36.0; speed_land = 3.7; speed_swim = 3.2; dmg = 8.0; reach = 1.6
			radius = 0.75; windup_time = 0.45; recover_time = 0.7; gold = 6
			height = 1.1; submerge = 0.3
		"merman":
			max_hp = 90.0; speed_land = 3.0; speed_swim = 3.8; dmg = 14.0; reach = 2.0
			radius = 0.6; windup_time = 0.6; recover_time = 0.9; gold = 14
			height = 2.5; submerge = 0.9
		"kraken":
			max_hp = 560.0; speed_land = 2.0; speed_swim = 2.5; dmg = 28.0; reach = 3.6
			radius = 1.7; windup_time = 0.95; recover_time = 1.3; gold = 120
			height = 4.0; submerge = 1.3
	var scale_wave: float = 1.0 + 0.12 * float(wave - 1)
	max_hp *= scale_wave
	dmg *= 1.0 + 0.07 * float(wave - 1)
	hp = max_hp
	_build_model()
	_build_bar()
	add_to_group("monsters")

# ------------------------------------------------------------------ mô hình

func _mat(color: Color, rough: float = 0.4, metal: float = 0.08, flashable: bool = true) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_color = color
	m.roughness = rough
	m.metallic = metal
	m.rim_enabled = true
	m.rim = 0.35
	m.rim_tint = 0.5
	if _skin_normal == null:
		var n := FastNoiseLite.new()
		n.noise_type = FastNoiseLite.TYPE_CELLULAR
		n.frequency = 0.06
		_skin_normal = NoiseTexture2D.new()
		_skin_normal.noise = n
		_skin_normal.as_normal_map = true
		_skin_normal.bump_strength = 5.0
		_skin_normal.seamless = true
		_skin_normal.width = 256
		_skin_normal.height = 256
	m.normal_enabled = true
	m.normal_texture = _skin_normal
	m.normal_scale = 0.9
	m.uv1_scale = Vector3(3, 3, 3)
	m.uv1_triplanar = true
	if flashable:
		mats.append(m)
	return m

func _glow(color: Color, energy: float = 3.0) -> StandardMaterial3D:
	var m := StandardMaterial3D.new()
	m.albedo_color = color
	m.emission_enabled = true
	m.emission = color
	m.emission_energy_multiplier = energy
	m.roughness = 0.2
	return m

func _part(parent: Node3D, mesh: Mesh, mat: Material, pos: Vector3 = Vector3.ZERO,
		rot_deg: Vector3 = Vector3.ZERO, scl: Vector3 = Vector3.ONE) -> MeshInstance3D:
	var mi := MeshInstance3D.new()
	mi.mesh = mesh
	mi.material_override = mat
	mi.position = pos
	mi.rotation_degrees = rot_deg
	mi.scale = scl
	parent.add_child(mi)
	return mi

func _sphere(r: float) -> SphereMesh:
	var s := SphereMesh.new()
	s.radius = r
	s.height = r * 2.0
	s.radial_segments = 20
	s.rings = 10
	return s

func _cyl(r_top: float, r_bot: float, h: float, seg: int = 10) -> CylinderMesh:
	var c := CylinderMesh.new()
	c.top_radius = r_top
	c.bottom_radius = r_bot
	c.height = h
	c.radial_segments = seg
	c.rings = 1
	return c

func _pivot(parent: Node3D, pos: Vector3) -> Node3D:
	var n := Node3D.new()
	n.position = pos
	parent.add_child(n)
	return n

func _build_model() -> void:
	body = Node3D.new()
	add_child(body)
	match kind:
		"crab": _build_crab()
		"merman": _build_merman()
		"kraken": _build_kraken()

func _build_crab() -> void:
	var shell := _mat(Color(0.42, 0.10, 0.07), 0.5, 0.05)
	var shell2 := _mat(Color(0.62, 0.22, 0.12), 0.45, 0.05)
	var belly := _mat(Color(0.75, 0.62, 0.5), 0.6, 0.0)
	_part(body, _sphere(0.6), shell, Vector3(0, 0.5, 0), Vector3.ZERO, Vector3(1.2, 0.52, 1.0))
	_part(body, _sphere(0.4), shell2, Vector3(0, 0.66, 0.05), Vector3.ZERO, Vector3(1.3, 0.35, 1.0))
	_part(body, _sphere(0.5), belly, Vector3(0, 0.32, 0), Vector3.ZERO, Vector3(1.1, 0.3, 0.9))
	for i in 5:
		var sx: float = -0.5 + 0.25 * float(i)
		_part(body, _cyl(0.0, 0.07, 0.2, 5), shell2, Vector3(sx, 0.86 - absf(sx) * 0.22, 0.05))
	var eye_m := _glow(Color(1.0, 0.85, 0.2), 2.5)
	for sx in [-0.22, 0.22]:
		_part(body, _cyl(0.025, 0.03, 0.3, 6), belly, Vector3(sx, 0.85, -0.5))
		_part(body, _sphere(0.065), eye_m, Vector3(sx, 1.02, -0.5))
	for side in [-1.0, 1.0]:
		var sh := _pivot(body, Vector3(0.62 * side, 0.55, -0.3))
		sh.rotation_degrees = Vector3(0, -25.0 * side, 0)
		_part(sh, _cyl(0.07, 0.09, 0.55, 8), shell, Vector3(0.0, 0, -0.27), Vector3(90, 0, 0))
		var el := _pivot(sh, Vector3(0, 0, -0.55))
		_part(el, _sphere(0.1), shell2)
		_part(el, _sphere(0.28), shell, Vector3(0, 0, -0.25), Vector3.ZERO, Vector3(0.85, 0.5, 1.4))
		_part(el, _cyl(0.0, 0.1, 0.35, 6), shell2, Vector3(0.1, 0, -0.62), Vector3(-90, 0, 0))
		_part(el, _cyl(0.0, 0.1, 0.35, 6), shell2, Vector3(-0.1, 0, -0.62), Vector3(-90, 0, 0))
		arms.append(sh)
	for side in [-1.0, 1.0]:
		for i in 3:
			var hip := _pivot(body, Vector3(0.55 * side, 0.4, 0.15 - 0.22 * float(i)))
			hip.rotation_degrees = Vector3(0, 0, -50.0 * side)
			_part(hip, _cyl(0.035, 0.05, 0.6, 6), shell, Vector3(0, -0.28, 0))
			legs.append(hip)

func _build_merman() -> void:
	var skin := _mat(Color(0.20, 0.40, 0.38), 0.42, 0.04)
	var skin2 := _mat(Color(0.52, 0.64, 0.52), 0.5, 0.02)
	var fin := _mat(Color(0.30, 0.16, 0.34), 0.5, 0.0)
	var claw := _mat(Color(0.82, 0.80, 0.7), 0.3, 0.2)
	var eye_m := _glow(Color(0.6, 1.0, 0.3), 3.0)
	# thân
	_part(body, _sphere(0.34), skin, Vector3(0, 1.35, 0.05), Vector3.ZERO, Vector3(1.0, 1.35, 0.8))
	_part(body, _sphere(0.26), skin2, Vector3(0, 1.3, -0.12), Vector3.ZERO, Vector3(1.0, 1.2, 0.5))
	_part(body, _sphere(0.28), skin, Vector3(0, 0.95, 0.0), Vector3.ZERO, Vector3(1.0, 0.8, 0.8))
	for i in 5:
		_part(body, _cyl(0.0, 0.06, 0.28, 5), fin, Vector3(0, 1.62 - 0.17 * float(i), 0.3), Vector3(25, 0, 0))
	# đầu
	_part(body, _sphere(0.25), skin, Vector3(0, 1.98, -0.08), Vector3.ZERO, Vector3(0.9, 0.9, 1.35))
	_part(body, _sphere(0.2), fin, Vector3(0, 2.14, 0.16), Vector3.ZERO, Vector3(0.12, 0.95, 1.6))
	_part(body, _sphere(0.15), skin2, Vector3(0, 1.84, -0.25), Vector3.ZERO, Vector3(1.0, 0.45, 1.3))
	for sx in [-0.17, 0.17]:
		_part(body, _sphere(0.07), eye_m, Vector3(sx, 2.04, -0.22))
	for sx in [-0.09, 0.09]:
		_part(body, _cyl(0.0, 0.025, 0.12, 4), claw, Vector3(sx, 1.78, -0.42), Vector3(180, 0, 0))
	# tay
	for side in [-1.0, 1.0]:
		var sh := _pivot(body, Vector3(0.4 * side, 1.62, 0.0))
		_part(sh, _cyl(0.12, 0.095, 0.7, 10), skin, Vector3(0, -0.35, 0))
		var el := _pivot(sh, Vector3(0, -0.7, 0))
		_part(el, _cyl(0.095, 0.07, 0.6, 10), skin, Vector3(0, -0.3, 0))
		for fx in [-0.05, 0.0, 0.05]:
			_part(el, _cyl(0.0, 0.022, 0.26, 4), claw, Vector3(fx, -0.72, -0.02), Vector3(8, 0, 0))
		arms.append(sh)
	# chân
	for side in [-1.0, 1.0]:
		var hip := _pivot(body, Vector3(0.16 * side, 0.85, 0.0))
		_part(hip, _cyl(0.15, 0.11, 0.5, 10), skin, Vector3(0, -0.25, 0))
		var kn := _pivot(hip, Vector3(0, -0.5, 0))
		_part(kn, _cyl(0.11, 0.08, 0.45, 10), skin, Vector3(0, -0.22, 0))
		_part(kn, _sphere(0.1), skin2, Vector3(0, -0.5, -0.1), Vector3.ZERO, Vector3(1.3, 0.35, 2.2))
		legs.append(hip)

func _build_kraken() -> void:
	var skin := _mat(Color(0.30, 0.06, 0.16), 0.3, 0.12)
	var skin2 := _mat(Color(0.55, 0.16, 0.25), 0.35, 0.05)
	var eye_w := _glow(Color(1.0, 0.8, 0.25), 2.2)
	var pupil := _mat(Color(0.02, 0.0, 0.02), 0.2, 0.0, false)
	var spots := _glow(Color(0.2, 0.95, 0.9), 3.5)
	_part(body, _sphere(1.5), skin, Vector3(0, 1.5, 0), Vector3.ZERO, Vector3(1.0, 0.85, 1.1))
	_part(body, _sphere(1.2), skin2, Vector3(0, 2.4, 0.8), Vector3(-20, 0, 0), Vector3(0.9, 1.15, 1.0))
	for i in 9:
		var a: float = float(i) * 2.4
		_part(body, _sphere(0.09), spots, Vector3(sin(a) * 0.7, 3.0 + cos(a * 1.7) * 0.3, 0.6 + cos(a) * 0.6))
	for sx in [-0.7, 0.7]:
		_part(body, _sphere(0.34), eye_w, Vector3(sx, 1.85, -1.3))
		_part(body, _sphere(0.16), pupil, Vector3(sx, 1.85, -1.58), Vector3.ZERO, Vector3(0.6, 1.4, 0.5))
	for i in 8:
		var ang: float = TAU * float(i) / 8.0
		var root := _pivot(body, Vector3(sin(ang) * 1.1, 1.0, -cos(ang) * 1.0))
		root.rotation = Vector3(0, ang, 0)
		var chain: Array[Node3D] = []
		var parent: Node3D = root
		var seg_len: float = 0.85
		for s in 6:
			var t: float = float(s) / 5.0
			var seg := _pivot(parent, Vector3(0, 0, 0) if s == 0 else Vector3(0, 0, -seg_len))
			seg.rotation_degrees = Vector3(-20.0 if s == 0 else 0.0, 0, 0)
			_part(seg, _cyl(0.28 * (1.0 - t * 0.7), 0.28 * (1.0 - (t - 0.2) * 0.7) if s > 0 else 0.3,
				seg_len, 10), skin, Vector3(0, 0, -seg_len * 0.5), Vector3(90, 0, 0))
			_part(seg, _sphere(0.2 * (1.0 - t * 0.6)), skin2, Vector3(0, 0, -seg_len))
			chain.append(seg)
			parent = seg
		tentacles.append(chain)

func _build_bar() -> void:
	bar_w = {"crab": 0.9, "merman": 1.1, "kraken": 2.4}.get(kind, 1.0)
	bar_root = Node3D.new()
	bar_root.position = Vector3(0, height + 0.5, 0)
	bar_root.visible = false
	add_child(bar_root)
	var bg := MeshInstance3D.new()
	var q := QuadMesh.new()
	q.size = Vector2(bar_w + 0.06, 0.16)
	bg.mesh = q
	var m1 := StandardMaterial3D.new()
	m1.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	m1.albedo_color = Color(0, 0, 0, 0.7)
	m1.transparency = BaseMaterial3D.TRANSPARENCY_ALPHA
	m1.no_depth_test = true
	m1.render_priority = 1
	bg.material_override = m1
	bar_root.add_child(bg)
	bar_fg = MeshInstance3D.new()
	var q2 := QuadMesh.new()
	q2.size = Vector2(bar_w, 0.1)
	bar_fg.mesh = q2
	var m2 := StandardMaterial3D.new()
	m2.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	m2.albedo_color = Color(0.85, 0.15, 0.12)
	m2.no_depth_test = true
	m2.render_priority = 2
	bar_fg.material_override = m2
	bar_fg.position.z = 0.001
	bar_root.add_child(bar_fg)

func _update_bar(cam_pos: Vector3) -> void:
	if bar_root == null or not bar_root.visible:
		return
	bar_root.look_at(cam_pos, Vector3.UP, true)
	var r: float = clampf(hp / max_hp, 0.0, 1.0)
	bar_fg.scale.x = maxf(r, 0.001)
	bar_fg.position.x = -(1.0 - r) * bar_w * 0.5

# --------------------------------------------------------------- hành vi

func ground_y(x: float, z: float) -> float:
	return maxf(Terrain.h(x, z), Terrain.WATER_Y - submerge)

func in_water() -> bool:
	return Terrain.h(global_position.x, global_position.z) < -0.3

func take_damage(amount: float, dir: Vector3, knock: float) -> void:
	if state == S.DEAD:
		return
	hp -= amount
	flash = 1.0
	bar_root.visible = true
	var k: float = 0.35 if kind == "kraken" else 1.0
	knock_vel += dir * knock * k
	var top: Vector3 = global_position + Vector3(0, height * 0.9, 0)
	Fx.damage_text(world, top, str(int(round(amount))), Color(1.0, 0.92, 0.5))
	Fx.burst(world, global_position + Vector3(0, height * 0.5, 0), Color(0.45, 1.0, 0.8), 10, 4.5, 0.4, 0.12)
	if hp <= 0.0:
		_die()
		return
	if kind != "kraken" and (state == S.WINDUP or knock > 3.0 or randf() < 0.5):
		state = S.STAGGER
		st_t = 0.0

func _die() -> void:
	state = S.DEAD
	st_t = 0.0
	remove_from_group("monsters")
	bar_root.visible = false
	died.emit(self)
	Fx.burst(world, global_position + Vector3(0, height * 0.5, 0), Color(0.5, 1.0, 0.85), 26, 6.0, 0.7, 0.2)

func _process(delta: float) -> void:
	anim_t += delta
	st_t += delta
	flash = maxf(0.0, flash - delta * 5.0)
	var cam := get_viewport().get_camera_3d()
	if cam != null:
		_update_bar(cam.global_position)

	if frozen:
		_place_y()
		_animate(delta)
		_apply_flash()
		return
	match state:
		S.EMERGE: _do_emerge(delta)
		S.MOVE: _do_move(delta)
		S.WINDUP: _do_windup(delta)
		S.STRIKE: _do_strike(delta)
		S.RECOVER: _do_recover(delta)
		S.STAGGER: _do_stagger(delta)
		S.DEAD: _do_dead(delta)
	_apply_knockback(delta)
	_animate(delta)
	_apply_flash()

func _flat_to_player() -> Vector3:
	var d: Vector3 = player.global_position - global_position
	d.y = 0.0
	return d

func _face(d: Vector3, delta: float, rate: float = 8.0) -> void:
	if d.length() > 0.01:
		var target: float = atan2(-d.x, -d.z)
		yaw = lerp_angle(yaw, target, clampf(rate * delta, 0.0, 1.0))
		rotation.y = yaw

func _place_y(extra: float = 0.0) -> void:
	var y: float = ground_y(global_position.x, global_position.z)
	if in_water() or y < 0.0:
		y += sin(anim_t * 2.0) * 0.06
	global_position.y = y + extra

func _do_emerge(delta: float) -> void:
	var u: float = clampf(st_t / 1.3, 0.0, 1.0)
	_place_y(-(1.0 - u * u) * (height + 0.6))
	if st_t < delta * 1.5:
		Fx.burst(world, global_position + Vector3(0, 0.3, 0), Color(0.85, 0.95, 1.0), 22, 5.0, 0.8, 0.22, 7.0, true)
	if u >= 1.0:
		state = S.MOVE
		st_t = 0.0

func _do_move(delta: float) -> void:
	var d: Vector3 = _flat_to_player()
	var dist: float = d.length()
	_face(d, delta)
	if dist <= reach * 0.9:
		state = S.WINDUP
		st_t = 0.0
		struck = false
		return
	var wet: bool = in_water()
	var spd: float = speed_swim if wet else speed_land
	var step: Vector3 = d.normalized() * spd * delta
	global_position += step
	walk_amt = lerpf(walk_amt, 1.0, clampf(6.0 * delta, 0.0, 1.0))
	_separate(delta)
	_place_y()

func _separate(delta: float) -> void:
	for o in get_tree().get_nodes_in_group("monsters"):
		if o == self or not (o is Node3D):
			continue
		var off: Vector3 = global_position - (o as Node3D).global_position
		off.y = 0.0
		var min_d: float = radius + float(o.get("radius"))
		var dl: float = off.length()
		if dl < min_d and dl > 0.001:
			global_position += off.normalized() * (min_d - dl) * 4.0 * delta

func _do_windup(delta: float) -> void:
	walk_amt = lerpf(walk_amt, 0.0, clampf(8.0 * delta, 0.0, 1.0))
	_face(_flat_to_player(), delta, 12.0)
	_place_y()
	if st_t >= windup_time:
		state = S.STRIKE
		st_t = 0.0

func _do_strike(delta: float) -> void:
	_place_y()
	if not struck and st_t >= 0.08:
		struck = true
		var d: Vector3 = _flat_to_player()
		var rr: float = reach + 0.6
		if d.length() <= rr + float(player.get("radius_hit")):
			player.take_damage(dmg, d.normalized(), kind == "kraken")
		if kind == "kraken":
			Fx.shockwave(world, global_position, 6.0, Color(1.0, 0.45, 0.4, 0.7))
		global_position += _flat_to_player().normalized() * 0.4
	if st_t >= 0.18:
		state = S.RECOVER
		st_t = 0.0

func _do_recover(delta: float) -> void:
	_place_y()
	if st_t >= recover_time:
		state = S.MOVE
		st_t = 0.0

func _do_stagger(delta: float) -> void:
	_place_y()
	if st_t >= 0.3:
		state = S.MOVE
		st_t = 0.0

func _do_dead(delta: float) -> void:
	var u: float = clampf(st_t / 1.3, 0.0, 1.0)
	global_position.y = maxf(ground_y(global_position.x, global_position.z), -2.0) - u * (height + 0.5)
	if st_t >= 1.3:
		queue_free()

func _apply_knockback(delta: float) -> void:
	if knock_vel.length() > 0.05:
		global_position += knock_vel * delta
		knock_vel = knock_vel.lerp(Vector3.ZERO, clampf(9.0 * delta, 0.0, 1.0))

# -------------------------------------------------------------- hoạt họa

func _animate(delta: float) -> void:
	var ph: float = anim_t * (9.0 if kind == "crab" else 6.0)
	var wind_u: float = 0.0
	if state == S.WINDUP:
		wind_u = clampf(st_t / windup_time, 0.0, 1.0)
	elif state == S.STRIKE:
		wind_u = 1.0 - clampf(st_t / 0.18, 0.0, 1.0)

	match kind:
		"crab":
			for i in legs.size():
				var side: float = 1.0 if i >= 3 else -1.0
				var off: float = float(i % 3) * 1.1
				legs[i].rotation_degrees.z = -50.0 * side + sin(ph + off) * 18.0 * walk_amt * side
				legs[i].rotation_degrees.x = cos(ph + off) * 14.0 * walk_amt
			for i in arms.size():
				var side: float = 1.0 if i == 1 else -1.0
				arms[i].rotation_degrees.x = -wind_u * 55.0 + sin(anim_t * 2.0 + float(i)) * 4.0
				arms[i].rotation_degrees.y = -25.0 * side + (wind_u * 25.0 * side if state == S.STRIKE else 0.0)
			body.position.y = sin(ph * 2.0) * 0.03 * walk_amt
		"merman":
			for i in legs.size():
				var sgn: float = 1.0 if i == 0 else -1.0
				legs[i].rotation_degrees.x = sin(ph) * 32.0 * walk_amt * sgn
			for i in arms.size():
				var sgn2: float = 1.0 if i == 0 else -1.0
				var raise: float = -wind_u * 150.0 if state == S.WINDUP else (wind_u * 40.0 if state == S.STRIKE else 0.0)
				arms[i].rotation_degrees.x = -sin(ph) * 22.0 * walk_amt * sgn2 + raise - 18.0
			body.position.y = absf(sin(ph)) * 0.05 * walk_amt
			body.rotation_degrees.x = wind_u * -12.0 if state == S.WINDUP else (18.0 if state == S.STRIKE else 0.0)
		"kraken":
			for i in tentacles.size():
				var chain: Array = tentacles[i]
				for s in chain.size():
					var seg: Node3D = chain[s]
					var w: float = sin(anim_t * 2.2 + float(i) * 0.9 + float(s) * 0.7)
					var base_x: float = -20.0 if s == 0 else 0.0
					seg.rotation_degrees.x = base_x + w * 11.0 + (-wind_u * 14.0 if state == S.WINDUP else 0.0)
					seg.rotation_degrees.y = cos(anim_t * 1.7 + float(i) + float(s) * 0.6) * 9.0
			body.position.y = sin(anim_t * 1.6) * 0.08
			body.rotation_degrees.x = -wind_u * 14.0 if state == S.WINDUP else (10.0 if state == S.STRIKE else 0.0)
	if state != S.MOVE:
		walk_amt = lerpf(walk_amt, 0.0, clampf(6.0 * delta, 0.0, 1.0))

func _apply_flash() -> void:
	var emissive: bool = flash > 0.01 or state == S.WINDUP
	for m in mats:
		if emissive:
			m.emission_enabled = true
			if state == S.WINDUP and flash <= 0.01:
				m.emission = Color(1.0, 0.12, 0.05)
				m.emission_energy_multiplier = 0.5 + 0.4 * sin(anim_t * 30.0)
			else:
				m.emission = Color(1.0, 0.9, 0.75)
				m.emission_energy_multiplier = flash * 1.8
		else:
			m.emission_enabled = false
