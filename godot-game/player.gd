extends Node3D
# Người que: di chuyển, 3 vũ khí (kiếm/giáo/búa), đòn liên hoàn, chiêu đặc biệt,
# lăn né, máu. Tất cả hoạt họa được tính bằng code (không cần file animation).

const Terrain = preload("res://terrain.gd")
const Weapons = preload("res://weapons.gd")
const Fx = preload("res://fx.gd")

signal hp_changed(hp: float, max_hp: float)
signal died
signal shake(amount: float)
signal weapon_changed
signal damaged

enum St { FREE, ATTACK, SKILL, ROLL, DEAD }

const WALK_SPEED: float = 5.4
const ROLL_SPEED: float = 11.5
const ROLL_TIME: float = 0.4
const SCARF_N: int = 8
const SCARF_SEG: float = 0.17

var radius_hit: float = 0.45
var max_hp: float = 100.0
var hp: float = 100.0
var gold: int = 0
var levels: Dictionary = {"sword": 1, "spear": 1, "hammer": 1}
var weapon: String = "sword"
var world: Node3D

var st: St = St.FREE
var st_t: float = 0.0
var st_dur: float = 0.3
var yaw: float = 0.0
var push: Vector3 = Vector3.ZERO
var invuln: float = 0.0
var atk_cd: float = 0.0
var skill_cd_left: float = 0.0
var skill_cd_total: float = 1.0
var roll_cd: float = 0.0
var roll_dir: Vector3 = Vector3.ZERO
var combo_idx: int = 0
var since_attack: float = 99.0
var hit_set: Array = []
var hits_done: int = 0
var walk_phase: float = 0.0
var walk_amt: float = 0.0
var swing_dir: float = 1.0
var t: float = 0.0

# Đầu vào (có thể do người chơi hoặc AI demo điều khiển)
var in_move: Vector2 = Vector2.ZERO
var in_attack: bool = false
var in_skill: bool = false
var in_roll: bool = false
var ai_control: bool = false

var figure: Node3D
var hips: Node3D
var chest: Node3D
var sh_r: Node3D
var el_r: Node3D
var sh_l: Node3D
var el_l: Node3D
var th_r: Node3D
var kn_r: Node3D
var th_l: Node3D
var kn_l: Node3D
var hand_r: Node3D
var weapon_nodes: Dictionary = {}
var scarf_pts: Array[Vector3] = []
var scarf_segs: Array[MeshInstance3D] = []

func _ready() -> void:
	_build_figure()
	_build_weapons()
	_build_scarf()
	_show_weapon()
	position.y = Terrain.h(position.x, position.z)

# ------------------------------------------------------------------ dựng hình

func _limb(parent: Node3D, r0: float, r1: float, len: float, mat: Material, y0: float = 0.0) -> MeshInstance3D:
	var mi := MeshInstance3D.new()
	var c := CylinderMesh.new()
	c.top_radius = r0
	c.bottom_radius = r1
	c.height = len
	c.radial_segments = 10
	c.rings = 1
	mi.mesh = c
	mi.material_override = mat
	mi.position = Vector3(0, y0 - len * 0.5, 0)
	parent.add_child(mi)
	return mi

func _ball(parent: Node3D, r: float, mat: Material, pos: Vector3 = Vector3.ZERO) -> MeshInstance3D:
	var mi := MeshInstance3D.new()
	var s := SphereMesh.new()
	s.radius = r
	s.height = r * 2.0
	s.radial_segments = 16
	s.rings = 8
	mi.mesh = s
	mi.material_override = mat
	mi.position = pos
	parent.add_child(mi)
	return mi

func _joint(parent: Node3D, pos: Vector3) -> Node3D:
	var n := Node3D.new()
	n.position = pos
	parent.add_child(n)
	return n

func _build_figure() -> void:
	var ink := StandardMaterial3D.new()
	ink.albedo_color = Color(0.07, 0.075, 0.09)
	ink.roughness = 0.35
	ink.metallic = 0.45
	ink.rim_enabled = true
	ink.rim = 0.9
	ink.rim_tint = 0.4

	figure = Node3D.new()
	add_child(figure)
	hips = _joint(figure, Vector3(0, 1.0, 0))
	_ball(hips, 0.05, ink)
	# thân: một thanh dọc từ hông lên ngực
	var torso := _limb(hips, 0.035, 0.04, 0.72, ink)
	torso.position.y = 0.36
	torso.mesh.set("height", 0.72)
	chest = _joint(hips, Vector3(0, 0.72, 0))
	_ball(chest, 0.045, ink)
	var neck := _limb(chest, 0.025, 0.03, 0.14, ink)
	neck.position.y = 0.07
	_ball(chest, 0.13, ink, Vector3(0, 0.27, 0))

	# tay
	for side in [-1.0, 1.0]:
		var sh := _joint(chest, Vector3(0.16 * side, -0.02, 0))
		_ball(sh, 0.04, ink)
		_limb(sh, 0.028, 0.025, 0.32, ink)
		var el := _joint(sh, Vector3(0, -0.32, 0))
		_ball(el, 0.034, ink)
		_limb(el, 0.025, 0.022, 0.30, ink)
		var hand := _joint(el, Vector3(0, -0.30, 0))
		_ball(hand, 0.04, ink)
		if side > 0.0:
			sh_r = sh; el_r = el; hand_r = hand
		else:
			sh_l = sh; el_l = el
	# chân
	for side in [-1.0, 1.0]:
		var th := _joint(hips, Vector3(0.1 * side, 0, 0))
		_ball(th, 0.045, ink)
		_limb(th, 0.034, 0.03, 0.5, ink)
		var kn := _joint(th, Vector3(0, -0.5, 0))
		_ball(kn, 0.04, ink)
		_limb(kn, 0.03, 0.026, 0.5, ink)
		var foot := MeshInstance3D.new()
		var fb := BoxMesh.new()
		fb.size = Vector3(0.09, 0.05, 0.22)
		foot.mesh = fb
		foot.material_override = ink
		foot.position = Vector3(0, -0.52, -0.05)
		kn.add_child(foot)
		if side > 0.0:
			th_r = th; kn_r = kn
		else:
			th_l = th; kn_l = kn

func _build_weapons() -> void:
	var steel := StandardMaterial3D.new()
	steel.albedo_color = Color(0.82, 0.85, 0.9)
	steel.metallic = 0.95
	steel.roughness = 0.2
	var dark := StandardMaterial3D.new()
	dark.albedo_color = Color(0.25, 0.17, 0.11)
	dark.roughness = 0.7
	var gold_m := StandardMaterial3D.new()
	gold_m.albedo_color = Color(0.85, 0.65, 0.2)
	gold_m.metallic = 0.9
	gold_m.roughness = 0.3
	var rune := StandardMaterial3D.new()
	rune.albedo_color = Color(0.3, 0.8, 1.0)
	rune.emission_enabled = true
	rune.emission = Color(0.3, 0.8, 1.0)
	rune.emission_energy_multiplier = 1.8
	var red := StandardMaterial3D.new()
	red.albedo_color = Color(0.7, 0.05, 0.08)
	red.roughness = 0.8

	# Kiếm (lưỡi chạy theo hướng -Y của bàn tay)
	var sword := Node3D.new()
	_wpart(sword, _box(0.07, 1.0, 0.016), steel, Vector3(0, -0.62, 0))
	_wpart(sword, _box(0.016, 0.9, 0.02), rune, Vector3(0, -0.64, 0.0))
	_wpart(sword, _cone(0.035, 0.14), steel, Vector3(0, -1.19, 0))
	_wpart(sword, _box(0.22, 0.035, 0.06), gold_m, Vector3(0, -0.1, 0))
	_wpart(sword, _cylm(0.022, 0.2), dark, Vector3(0, 0.0, 0))
	_wpart(sword, _ball_mesh(0.035), gold_m, Vector3(0, 0.11, 0))
	hand_r.add_child(sword)
	weapon_nodes["sword"] = sword

	# Giáo
	var spear := Node3D.new()
	_wpart(spear, _cylm(0.024, 2.5), dark, Vector3(0, -0.65, 0))
	_wpart(spear, _cone(0.055, 0.42), steel, Vector3(0, -2.1, 0))
	_wpart(spear, _box(0.12, 0.03, 0.03), gold_m, Vector3(0, -1.88, 0))
	_wpart(spear, _ball_mesh(0.05), red, Vector3(0, -1.8, 0))
	_wpart(spear, _cylm(0.03, 0.08), gold_m, Vector3(0, 0.6, 0))
	hand_r.add_child(spear)
	weapon_nodes["spear"] = spear

	# Búa
	var hammer := Node3D.new()
	_wpart(hammer, _cylm(0.03, 1.35), dark, Vector3(0, -0.55, 0))
	_wpart(hammer, _box(0.55, 0.3, 0.3), steel, Vector3(0, -1.25, 0))
	_wpart(hammer, _box(0.58, 0.04, 0.32), gold_m, Vector3(0, -1.12, 0))
	_wpart(hammer, _box(0.58, 0.04, 0.32), gold_m, Vector3(0, -1.38, 0))
	_wpart(hammer, _box(0.1, 0.1, 0.32), rune, Vector3(0, -1.25, 0))
	hand_r.add_child(hammer)
	weapon_nodes["hammer"] = hammer

func _box(x: float, y: float, z: float) -> BoxMesh:
	var b := BoxMesh.new()
	b.size = Vector3(x, y, z)
	return b

func _cone(r: float, h: float) -> CylinderMesh:
	# mũi nhọn hướng xuống (-Y)
	var c := CylinderMesh.new()
	c.top_radius = r
	c.bottom_radius = 0.0
	c.height = h
	c.radial_segments = 4
	c.rings = 1
	return c

func _cylm(r: float, h: float) -> CylinderMesh:
	var c := CylinderMesh.new()
	c.top_radius = r
	c.bottom_radius = r
	c.height = h
	c.radial_segments = 8
	c.rings = 1
	return c

func _ball_mesh(r: float) -> SphereMesh:
	var s := SphereMesh.new()
	s.radius = r
	s.height = r * 2.0
	s.radial_segments = 12
	s.rings = 6
	return s

func _wpart(parent: Node3D, mesh: Mesh, mat: Material, pos: Vector3) -> void:
	var mi := MeshInstance3D.new()
	mi.mesh = mesh
	mi.material_override = mat
	mi.position = pos
	parent.add_child(mi)

func _build_scarf() -> void:
	var cloth := StandardMaterial3D.new()
	cloth.albedo_color = Color(0.62, 0.05, 0.07)
	cloth.roughness = 0.85
	cloth.cull_mode = BaseMaterial3D.CULL_DISABLED
	for i in SCARF_N - 1:
		var mi := MeshInstance3D.new()
		var b := BoxMesh.new()
		b.size = Vector3(0.075 - 0.005 * float(i), 0.01, SCARF_SEG * 1.15)
		mi.mesh = b
		mi.material_override = cloth
		mi.top_level = true
		add_child(mi)
		scarf_segs.append(mi)

func _show_weapon() -> void:
	for id in weapon_nodes:
		(weapon_nodes[id] as Node3D).visible = (id == weapon)

func set_weapon(id: String) -> void:
	if st != St.FREE and st != St.DEAD:
		return
	if id == weapon or not Weapons.IDS.has(id):
		return
	weapon = id
	combo_idx = 0
	_show_weapon()
	weapon_changed.emit()

# ------------------------------------------------------------------ đầu vào

func _unhandled_input(event: InputEvent) -> void:
	if ai_control:
		return
	if event.is_action_pressed("weapon_1"):
		set_weapon("sword")
	elif event.is_action_pressed("weapon_2"):
		set_weapon("spear")
	elif event.is_action_pressed("weapon_3"):
		set_weapon("hammer")
	elif event.is_action_pressed("weapon_next"):
		var i: int = Weapons.IDS.find(weapon)
		set_weapon(Weapons.IDS[(i + 1) % Weapons.IDS.size()])

func _read_input() -> void:
	if ai_control:
		return
	in_move = Input.get_vector("move_left", "move_right", "move_up", "move_down")
	in_attack = Input.is_action_pressed("attack")
	in_skill = Input.is_action_just_pressed("skill")
	in_roll = Input.is_action_just_pressed("dodge")

# ------------------------------------------------------------------ vòng lặp

func _process(delta: float) -> void:
	t += delta
	since_attack += delta
	invuln = maxf(0.0, invuln - delta)
	atk_cd = maxf(0.0, atk_cd - delta)
	skill_cd_left = maxf(0.0, skill_cd_left - delta)
	roll_cd = maxf(0.0, roll_cd - delta)
	_read_input()
	match st:
		St.FREE: _do_free(delta)
		St.ATTACK: _do_attack(delta)
		St.SKILL: _do_skill(delta)
		St.ROLL: _do_roll(delta)
		St.DEAD: pass
	_apply_push(delta)
	position.y = Terrain.h(position.x, position.z)
	_pose(delta)
	_update_scarf(delta)

func fwd() -> Vector3:
	return Vector3(-sin(yaw), 0.0, -cos(yaw))

func _try_move(next: Vector3) -> void:
	if Terrain.h(next.x, next.z) > -0.12:
		position.x = next.x
		position.z = next.z
	elif Terrain.h(next.x, position.z) > -0.12:
		position.x = next.x
	elif Terrain.h(position.x, next.z) > -0.12:
		position.z = next.z

func _apply_push(delta: float) -> void:
	if push.length() > 0.05:
		_try_move(position + push * delta)
		push = push.lerp(Vector3.ZERO, clampf(10.0 * delta, 0.0, 1.0))

func _do_free(delta: float) -> void:
	var mv := Vector3(in_move.x, 0.0, in_move.y)
	var moving: bool = mv.length() > 0.1
	if moving:
		var dir: Vector3 = mv.normalized()
		yaw = lerp_angle(yaw, atan2(-dir.x, -dir.z), clampf(14.0 * delta, 0.0, 1.0))
		_try_move(position + dir * WALK_SPEED * delta)
	walk_amt = lerpf(walk_amt, 1.0 if moving else 0.0, clampf(10.0 * delta, 0.0, 1.0))
	walk_phase += delta * 11.0 * walk_amt

	if in_roll and roll_cd <= 0.0:
		_start_roll(mv.normalized() if moving else fwd())
	elif in_skill and skill_cd_left <= 0.0:
		_start_skill()
	elif in_attack and atk_cd <= 0.0:
		_start_attack()

# ------------------------------------------------------------------ tấn công

func _nearest_monster(max_dist: float) -> Node3D:
	var best: Node3D = null
	var best_score: float = max_dist
	var f: Vector3 = fwd()
	for n in get_tree().get_nodes_in_group("monsters"):
		var m: Node3D = n as Node3D
		var d: Vector3 = m.global_position - global_position
		d.y = 0.0
		var dist: float = d.length()
		if dist > max_dist:
			continue
		var score: float = dist - (1.5 if dist > 0.01 and d.normalized().dot(f) > 0.3 else 0.0)
		if score < best_score:
			best_score = score
			best = m
	return best

func _aim_assist() -> void:
	var m: Node3D = _nearest_monster(5.5)
	if m != null:
		var d: Vector3 = m.global_position - global_position
		d.y = 0.0
		if d.length() > 0.05:
			yaw = atan2(-d.x, -d.z)

func _start_attack() -> void:
	_aim_assist()
	var lvl: int = int(levels[weapon])
	var clen: int = Weapons.combo_len(weapon, lvl)
	if since_attack < 0.75:
		combo_idx = (combo_idx + 1) % clen
	else:
		combo_idx = 0
	var finisher: bool = clen > 1 and combo_idx == clen - 1
	st = St.ATTACK
	st_t = 0.0
	st_dur = Weapons.attack_cd(weapon, lvl) * (1.35 if finisher else 1.0)
	hit_set.clear()
	hits_done = 0
	swing_dir = 1.0 if combo_idx % 2 == 0 else -1.0
	push += fwd() * 4.0

func _do_attack(delta: float) -> void:
	st_t += delta
	var u: float = st_t / st_dur
	if u >= 0.38 and hits_done == 0:
		hits_done = 1
		_light_hit()
	if in_roll and roll_cd <= 0.0 and u > 0.5:
		_start_roll(fwd())
		return
	if st_t >= st_dur:
		st = St.FREE
		since_attack = 0.0

func _light_hit() -> void:
	var lvl: int = int(levels[weapon])
	var clen: int = Weapons.combo_len(weapon, lvl)
	var finisher: bool = clen > 1 and combo_idx == clen - 1
	var mult: float = 1.0
	if finisher:
		mult = 1.65
	elif combo_idx == 1:
		mult = 1.15
	var r: float = Weapons.reach(weapon) * (1.12 if finisher else 1.0)
	var arc: float = Weapons.half_arc(weapon) * (1.3 if finisher and weapon == "sword" else 1.0)
	var n: int = _strike(r, arc, Weapons.dmg(weapon, lvl) * mult, Weapons.knock(weapon) * mult, hit_set)
	var tip: Vector3 = global_position + fwd() * r * 0.75 + Vector3(0, 1.2, 0)
	if n > 0:
		Fx.burst(world, tip, Color(1.0, 0.85, 0.5), 12, 6.0, 0.3, 0.09, 12.0)
		shake.emit(0.16 * mult + (0.25 if weapon == "hammer" else 0.0))
	if weapon == "hammer":
		Fx.shockwave(world, global_position + fwd() * r * 0.8, 2.6, Color(1.0, 0.9, 0.7, 0.5))

func _strike(reach: float, half_arc_deg: float, dmg: float, knock: float, hset: Array) -> int:
	var f: Vector3 = fwd()
	var cos_lim: float = cos(deg_to_rad(half_arc_deg))
	var n: int = 0
	for node in get_tree().get_nodes_in_group("monsters"):
		var m: Node3D = node as Node3D
		if hset.has(m):
			continue
		var to: Vector3 = m.global_position - global_position
		to.y = 0.0
		var dist: float = to.length()
		var mr: float = float(m.get("radius"))
		if dist > reach + mr:
			continue
		if dist > mr and to.normalized().dot(f) < cos_lim:
			continue
		hset.append(m)
		m.take_damage(dmg, to.normalized() if dist > 0.01 else f, knock)
		n += 1
	return n

# -------------------------------------------------------------------- chiêu

func _start_skill() -> void:
	_aim_assist()
	var lvl: int = int(levels[weapon])
	skill_cd_total = Weapons.skill_cd(weapon, lvl)
	skill_cd_left = skill_cd_total
	st = St.SKILL
	st_t = 0.0
	hit_set.clear()
	hits_done = 0
	invuln = maxf(invuln, 0.25)
	match weapon:
		"sword": st_dur = 0.62
		"spear": st_dur = 0.34
		"hammer": st_dur = 0.9

func _do_skill(delta: float) -> void:
	st_t += delta
	var u: float = st_t / st_dur
	var lvl: int = int(levels[weapon])
	var base: float = Weapons.dmg(weapon, lvl) * Weapons.skill_mult(weapon)
	var rad: float = Weapons.skill_radius(weapon, lvl)
	match weapon:
		"sword":
			if u >= 0.28 and hits_done == 0:
				hits_done = 1
				hit_set.clear()
				_skill_hit(rad, 180.0, base * 0.55, 5.0)
			elif u >= 0.62 and hits_done == 1:
				hits_done = 2
				hit_set.clear()
				_skill_hit(rad, 180.0, base * 0.55, 6.5)
		"spear":
			if u > 0.08 and u < 0.85:
				push = fwd() * 26.0
				var n: int = _strike(2.2, 45.0, base, 5.0, hit_set)
				if n > 0:
					shake.emit(0.3)
					Fx.burst(world, global_position + fwd() * 1.8 + Vector3(0, 1.2, 0), Color(1.0, 0.9, 0.6), 14, 7.0, 0.35, 0.1)
		"hammer":
			if u >= 0.58 and hits_done == 0:
				hits_done = 1
				_skill_hit(rad, 180.0, base, 9.0)
				Fx.shockwave(world, global_position, rad, Color(1.0, 0.85, 0.55, 0.75))
				Fx.burst(world, global_position + Vector3(0, 0.3, 0), Color(0.75, 0.62, 0.45), 30, 6.0, 0.7, 0.25, 6.0, true)
				shake.emit(0.75)
	if st_t >= st_dur:
		st = St.FREE
		since_attack = 0.0

func _skill_hit(rad: float, arc: float, dmg: float, knock: float) -> void:
	var n: int = _strike(rad, arc, dmg, knock, hit_set)
	shake.emit(0.3 if n > 0 else 0.12)
	if weapon == "sword":
		Fx.burst(world, global_position + Vector3(0, 1.1, 0), Color(0.7, 0.9, 1.0), 20, rad * 2.2, 0.35, 0.1, 2.0)

# --------------------------------------------------------------------- lăn

func _start_roll(dir: Vector3) -> void:
	st = St.ROLL
	st_t = 0.0
	st_dur = ROLL_TIME
	roll_dir = dir
	yaw = atan2(-dir.x, -dir.z)
	invuln = ROLL_TIME + 0.08
	roll_cd = 0.75

func _do_roll(delta: float) -> void:
	st_t += delta
	var u: float = st_t / st_dur
	_try_move(position + roll_dir * ROLL_SPEED * (1.15 - u) * delta)
	if st_t >= st_dur:
		st = St.FREE

# -------------------------------------------------------------------- sát thương

func take_damage(amount: float, dir: Vector3, big: bool = false) -> void:
	if st == St.DEAD or invuln > 0.0:
		return
	hp = maxf(0.0, hp - amount)
	invuln = 0.55
	push += dir * (11.0 if big else 6.5)
	if st == St.ATTACK:
		st = St.FREE
	hp_changed.emit(hp, max_hp)
	damaged.emit()
	shake.emit(0.5 if big else 0.32)
	Fx.burst(world, global_position + Vector3(0, 1.2, 0), Color(0.9, 0.12, 0.1), 14, 5.0, 0.45, 0.12)
	Fx.damage_text(world, global_position + Vector3(0, 2.4, 0), str(int(round(amount))), Color(1.0, 0.3, 0.25), true)
	if hp <= 0.0:
		st = St.DEAD
		died.emit()

func heal(amount: float) -> void:
	hp = minf(max_hp, hp + amount)
	hp_changed.emit(hp, max_hp)

func add_max_hp(amount: float) -> void:
	max_hp += amount
	hp += amount
	hp_changed.emit(hp, max_hp)

# --------------------------------------------------------------------- tư thế

func _ease_out(x: float) -> float:
	return 1.0 - pow(1.0 - clampf(x, 0.0, 1.0), 3.0)

func _ease_in(x: float) -> float:
	return pow(clampf(x, 0.0, 1.0), 2.0)

func _pose(delta: float) -> void:
	var breathe: float = sin(t * 1.9)
	var r_sh: Vector3 = Vector3(0.7, 0.0, 0.12)
	var r_el: float = 1.1
	var l_sh: Vector3 = Vector3(0.45, 0.0, -0.1)
	var l_el: float = 0.9
	var lean: float = 0.0
	var twist: float = 0.0
	var hop: float = 0.0
	var spin: float = 0.0
	var lunge: float = 0.0
	var crouch: float = 0.0
	var stance: float = 0.0
	var two_hand: bool = weapon != "sword"

	if two_hand:
		l_sh = Vector3(0.85, 0.35, -0.1)
		l_el = 1.0

	match st:
		St.ATTACK:
			stance = 1.0
			var u: float = st_t / st_dur
			var wind: float = _ease_out(u / 0.38)
			var hit: float = _ease_out((u - 0.38) / 0.2)
			var rec: float = _ease_in((u - 0.62) / 0.38)
			var lvl: int = int(levels[weapon])
			var clen: int = Weapons.combo_len(weapon, lvl)
			var finisher: bool = clen > 1 and combo_idx == clen - 1
			match weapon:
				"sword":
					if finisher:
						r_sh.x = lerpf(0.7, 3.0, wind)
						r_sh.x = lerpf(r_sh.x, 0.35, hit)
						r_sh.x = lerpf(r_sh.x, 0.7, rec)
						r_el = lerpf(1.1, 0.5, wind)
						lean = hit * 0.4 * (1.0 - rec)
						l_sh = r_sh * 0.9
					else:
						var start: float = -1.35 * swing_dir
						var end: float = 1.35 * swing_dir
						r_sh.x = lerpf(0.7, 1.45, wind)
						r_sh.y = lerpf(0.0, start, wind)
						r_sh.y = lerpf(r_sh.y, end, hit)
						r_sh.y = lerpf(r_sh.y, 0.0, rec)
						r_el = lerpf(1.1, 0.25, wind)
						twist = r_sh.y * 0.5
				"spear":
					r_sh.x = lerpf(0.7, 0.15, wind)
					r_sh.x = lerpf(r_sh.x, 1.5, hit)
					r_sh.x = lerpf(r_sh.x, 0.7, rec)
					r_el = lerpf(1.1, 1.55, wind)
					r_el = lerpf(r_el, 0.1, hit)
					r_el = lerpf(r_el, 1.1, rec)
					lunge = hit * 0.45 * (1.0 - rec)
					lean = hit * 0.2
					l_sh = Vector3(lerpf(0.85, 1.2, hit), 0.3, 0.0)
				"hammer":
					r_sh.x = lerpf(0.7, 3.1, wind)
					r_sh.x = lerpf(r_sh.x, 0.25, hit)
					r_sh.x = lerpf(r_sh.x, 0.7, rec)
					r_el = lerpf(1.1, 0.35, wind)
					lean = hit * 0.5 * (1.0 - rec)
					crouch = hit * 0.15
					l_sh = Vector3(r_sh.x * 0.95, 0.35, -0.1)
		St.SKILL:
			stance = 1.0
			var u2: float = st_t / st_dur
			match weapon:
				"sword":
					r_sh = Vector3(1.55, 0.0, 0.0)
					r_el = 0.1
					l_sh = Vector3(1.55, 0.0, 0.0)
					l_el = 0.1
					spin = _ease_out(u2) * TAU
					lean = 0.1
				"spear":
					r_sh = Vector3(1.5, 0.0, 0.0)
					r_el = 0.1
					l_sh = Vector3(1.25, 0.3, 0.0)
					lean = 0.55
					lunge = 0.3
				"hammer":
					var up: float = clampf(u2 / 0.58, 0.0, 1.0)
					var down: float = _ease_out((u2 - 0.58) / 0.15)
					r_sh.x = lerpf(0.7, 3.1, _ease_out(up))
					r_sh.x = lerpf(r_sh.x, 0.2, down)
					r_el = 0.3
					l_sh = Vector3(r_sh.x * 0.95, 0.35, -0.1)
					hop = sin(PI * up) * 1.1 * (1.0 - down)
					lean = down * 0.55
					crouch = down * 0.2
		St.ROLL:
			var u3: float = st_t / st_dur
			spin = 0.0
			r_el = 2.1
			l_el = 2.1
			r_sh = Vector3(0.9, 0.0, 0.2)
			l_sh = Vector3(0.9, 0.0, -0.2)
			crouch = 0.35
			hips.rotation.x = -TAU * _ease_out(u3)
		St.DEAD:
			pass
		_:
			# Đứng/đi: tư thế thủ, hơi thở
			r_sh.x += breathe * 0.03
			l_sh.x += breathe * 0.03
			if walk_amt > 0.05:
				r_sh.x += sin(walk_phase + PI) * 0.35 * walk_amt * (0.0 if weapon != "sword" else 1.0)
				l_sh.x += sin(walk_phase) * 0.3 * walk_amt * (0.0 if two_hand else 1.0)
			lean = 0.12 * walk_amt

	if st != St.ROLL:
		hips.rotation.x = lerpf(hips.rotation.x, -lean, clampf(16.0 * delta, 0.0, 1.0)) if st == St.FREE else -lean
	var k: float = clampf(18.0 * delta, 0.0, 1.0) if st == St.FREE else 1.0
	sh_r.rotation = sh_r.rotation.lerp(r_sh, k)
	sh_l.rotation = sh_l.rotation.lerp(l_sh, k)
	el_r.rotation.x = lerpf(el_r.rotation.x, r_el, k)
	el_l.rotation.x = lerpf(el_l.rotation.x, l_el, k)
	hips.rotation.y = lerpf(hips.rotation.y, twist, k)
	hips.position.z = -lunge
	hips.position.y = 1.0 + breathe * 0.006 + absf(sin(walk_phase)) * 0.045 * walk_amt - crouch
	figure.position.y = hop
	figure.rotation.y = yaw + spin

	# Chân: bước đi / thế đứng khi đánh
	var swing: float = sin(walk_phase) * 0.85 * walk_amt
	var bend_r: float = maxf(0.0, -sin(walk_phase + 0.7)) * 1.2 * walk_amt
	var bend_l: float = maxf(0.0, sin(walk_phase + 0.7)) * 1.2 * walk_amt
	var th_r_t: float = lerpf(swing, 0.55, stance)
	var th_l_t: float = lerpf(-swing, -0.35, stance)
	if st == St.ROLL:
		th_r_t = 1.2
		th_l_t = 1.2
		bend_r = 2.0
		bend_l = 2.0
	if st == St.SKILL and weapon == "hammer":
		th_r_t = lerpf(0.3, 0.9, clampf(hop, 0.0, 1.0))
		th_l_t = lerpf(-0.2, -0.5, clampf(hop, 0.0, 1.0))
	th_r.rotation.x = lerpf(th_r.rotation.x, th_r_t + crouch * 1.5, k)
	th_l.rotation.x = lerpf(th_l.rotation.x, th_l_t + crouch * 1.5, k)
	kn_r.rotation.x = lerpf(kn_r.rotation.x, -(bend_r + 0.12 + crouch * 2.2 + stance * 0.25), k)
	kn_l.rotation.x = lerpf(kn_l.rotation.x, -(bend_l + 0.12 + crouch * 2.2 + stance * 0.1), k)

	if st == St.DEAD:
		figure.rotation.x = lerpf(figure.rotation.x, -PI * 0.5, clampf(5.0 * delta, 0.0, 1.0))
		figure.position.y = lerpf(figure.position.y, 0.12, clampf(5.0 * delta, 0.0, 1.0))
	else:
		figure.rotation.x = 0.0

# -------------------------------------------------------------------- khăn

func _update_scarf(delta: float) -> void:
	var neck: Vector3 = chest.to_global(Vector3(0, 0.1, 0.03))
	if scarf_pts.is_empty():
		for i in SCARF_N:
			scarf_pts.append(neck + Vector3(0, -0.02 * float(i), float(i) * 0.1))
	scarf_pts[0] = neck
	var back: Vector3 = Vector3(sin(yaw), 0.0, cos(yaw))
	for i in range(1, SCARF_N):
		var p: Vector3 = scarf_pts[i]
		var gust: Vector3 = Vector3(sin(t * 3.1 + float(i)) * 0.25, 0.0, cos(t * 2.4 + float(i) * 1.3) * 0.25)
		p += (back * 1.4 + gust + Vector3(0, -0.9, 0)) * delta * (0.5 + 0.18 * float(i))
		var d: Vector3 = p - scarf_pts[i - 1]
		if d.length() < 0.001:
			d = back
		scarf_pts[i] = scarf_pts[i - 1] + d.normalized() * SCARF_SEG
	for i in SCARF_N - 1:
		var a: Vector3 = scarf_pts[i]
		var b: Vector3 = scarf_pts[i + 1]
		var seg: MeshInstance3D = scarf_segs[i]
		seg.global_position = (a + b) * 0.5
		var dir: Vector3 = b - a
		if dir.length() > 0.001:
			var up: Vector3 = Vector3.UP if absf(dir.normalized().y) < 0.95 else Vector3.RIGHT
			seg.look_at(b, up)
