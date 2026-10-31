extends Node3D
# Đảo Hình Que: dựng thế giới (trời, đảo, biển, rừng), người chơi, camera,
# các đợt quái từ biển bò lên và hệ thống nâng cấp vũ khí.
# Chạy thử tự động (không cần bấm gì): thêm tham số  -- --demo

const Terrain = preload("res://terrain.gd")
const Weapons = preload("res://weapons.gd")
const Fx = preload("res://fx.gd")
const PlayerScript = preload("res://player.gd")
const MonsterScript = preload("res://monster.gd")
const HudScript = preload("res://hud.gd")

const SUN_DIR: Vector3 = Vector3(0.62, 0.42, -0.55)   # hướng TỚI mặt trời
const TERRAIN_SIZE: float = 90.0
const TERRAIN_GRID: int = 180
const SPAWN_RADIUS: float = 28.0

enum Phase { MENU, FIGHT, SHOP, OVER }

var player: Node3D
var cam: Camera3D
var hud: CanvasLayer
var phase: Phase = Phase.MENU
var wave: int = 0
var queue: Array[String] = []
var spawn_timer: float = 0.0
var shake_amt: float = 0.0
var cam_pos: Vector3 = Vector3.ZERO
var rng := RandomNumberGenerator.new()
var demo: bool = false
var demo_t: float = 0.0
var spawn_radius: float = SPAWN_RADIUS
var showcase: bool = false
var env: Environment
var low_quality: bool = false
var cam_fix: PackedFloat64Array = PackedFloat64Array()

func _ready() -> void:
	rng.seed = 20261030
	for a in OS.get_cmdline_user_args():
		if a == "--demo":
			demo = true
		elif a == "--showcase":
			showcase = true
		elif a.begins_with("--cam="):
			cam_fix = a.substr(6).split_floats(",")
	if demo:
		spawn_radius = 16.0
	_setup_input()
	_build_environment()
	_build_terrain()
	_build_water()
	_build_vegetation()
	_build_player()
	_build_camera()
	_build_hud()
	if showcase:
		_build_showcase()
	elif demo:
		player.ai_control = true
		_on_start_wave()
	else:
		hud.show_start()

# ----------------------------------------------------------------- phím bấm

func _key(code: Key) -> InputEventKey:
	var e := InputEventKey.new()
	e.physical_keycode = code
	return e

func _add_action(action: String, keys: Array) -> void:
	if not InputMap.has_action(action):
		InputMap.add_action(action)
	for k in keys:
		InputMap.action_add_event(action, _key(k))

func _setup_input() -> void:
	_add_action("move_left", [KEY_A, KEY_LEFT])
	_add_action("move_right", [KEY_D, KEY_RIGHT])
	_add_action("move_up", [KEY_W, KEY_UP])
	_add_action("move_down", [KEY_S, KEY_DOWN])
	_add_action("attack", [KEY_SPACE, KEY_J])
	_add_action("skill", [KEY_E, KEY_K])
	_add_action("dodge", [KEY_SHIFT, KEY_L])
	_add_action("weapon_1", [KEY_1])
	_add_action("weapon_2", [KEY_2])
	_add_action("weapon_3", [KEY_3])
	_add_action("weapon_next", [KEY_Q])
	_add_action("confirm", [KEY_ENTER, KEY_KP_ENTER])

func _toggle_quality() -> void:
	low_quality = not low_quality
	env.volumetric_fog_enabled = not low_quality
	env.ssao_enabled = not low_quality
	get_viewport().msaa_3d = Viewport.MSAA_DISABLED if low_quality else Viewport.MSAA_4X
	hud.show_toast("Đồ họa: THẤP  (F2 để đổi)" if low_quality else "Đồ họa: CAO  (F2 để đổi)")

func _unhandled_input(event: InputEvent) -> void:
	if event is InputEventKey and event.pressed and not event.echo and event.physical_keycode == KEY_F2:
		_toggle_quality()
		return
	if event.is_action_pressed("confirm"):
		match phase:
			Phase.MENU, Phase.SHOP: _on_start_wave()
			Phase.OVER: get_tree().reload_current_scene()

# ------------------------------------------------------------- môi trường

func _noise_tex(freq: float, normal: bool, ramp: Array[Color] = [],
		type: int = FastNoiseLite.TYPE_SIMPLEX_SMOOTH, size: int = 512, bump: float = 4.0) -> NoiseTexture2D:
	var n := FastNoiseLite.new()
	n.noise_type = type
	n.frequency = freq
	n.fractal_octaves = 4
	var t := NoiseTexture2D.new()
	t.noise = n
	t.width = size
	t.height = size
	t.seamless = true
	t.as_normal_map = normal
	if normal:
		t.bump_strength = bump
	elif ramp.size() >= 2:
		var g := Gradient.new()
		g.set_color(0, ramp[0])
		g.set_color(1, ramp[ramp.size() - 1])
		if ramp.size() == 3:
			g.add_point(0.5, ramp[1])
		t.color_ramp = g
	return t

func _build_environment() -> void:
	var sky_mat := ShaderMaterial.new()
	sky_mat.shader = load("res://sky.gdshader")
	sky_mat.set_shader_parameter("sun_dir", SUN_DIR.normalized())
	var sky := Sky.new()
	sky.sky_material = sky_mat
	sky.radiance_size = Sky.RADIANCE_SIZE_256

	env = Environment.new()
	env.background_mode = Environment.BG_SKY
	env.sky = sky
	env.ambient_light_source = Environment.AMBIENT_SOURCE_SKY
	env.ambient_light_energy = 1.25
	env.reflected_light_source = Environment.REFLECTION_SOURCE_SKY
	env.tonemap_mode = Environment.TONE_MAPPER_ACES
	env.tonemap_exposure = 1.0
	env.tonemap_white = 6.0
	env.glow_enabled = true
	env.glow_intensity = 0.55
	env.glow_bloom = 0.04
	env.glow_hdr_threshold = 1.1
	env.glow_blend_mode = Environment.GLOW_BLEND_MODE_SCREEN
	env.ssao_enabled = true
	env.ssao_radius = 1.6
	env.ssao_intensity = 2.2
	env.fog_enabled = true
	env.fog_light_color = Color(0.74, 0.62, 0.58)
	env.fog_density = 0.0045
	env.fog_sun_scatter = 0.4
	env.fog_sky_affect = 0.35
	env.volumetric_fog_enabled = true
	env.volumetric_fog_density = 0.006
	env.volumetric_fog_albedo = Color(0.95, 0.78, 0.62)
	env.volumetric_fog_length = 90.0
	env.volumetric_fog_anisotropy = 0.6
	env.adjustment_enabled = true
	env.adjustment_contrast = 1.07
	env.adjustment_saturation = 1.08

	var we := WorldEnvironment.new()
	we.environment = env
	add_child(we)

	var sun := DirectionalLight3D.new()
	sun.light_color = Color(1.0, 0.80, 0.60)
	sun.light_energy = 2.6
	sun.shadow_enabled = true
	sun.directional_shadow_mode = DirectionalLight3D.SHADOW_PARALLEL_4_SPLITS
	sun.directional_shadow_max_distance = 90.0
	sun.directional_shadow_blend_splits = true
	sun.light_angular_distance = 0.8
	sun.shadow_blur = 1.4
	add_child(sun)
	sun.position = SUN_DIR.normalized() * 80.0
	sun.look_at(Vector3.ZERO)

	var fill := DirectionalLight3D.new()
	fill.light_color = Color(0.40, 0.52, 0.95)
	fill.light_energy = 0.55
	add_child(fill)
	fill.position = Vector3(-0.6, 0.5, 0.6) * 80.0
	fill.look_at(Vector3.ZERO)

# ------------------------------------------------------------------ địa hình

func _ground_color(h: float, nrm: Vector3, x: float, z: float) -> Color:
	var bed := Color(0.17, 0.24, 0.26)
	var wet := Color(0.42, 0.35, 0.26)
	var sand := Color(0.78, 0.67, 0.47)
	var grass_a := Color(0.30, 0.38, 0.14)
	var grass_b := Color(0.13, 0.27, 0.10)
	var rock := Color(0.33, 0.30, 0.28)
	var dirt := Color(0.28, 0.20, 0.13)
	var c: Color
	if h < -0.9:
		c = bed
	elif h < -0.02:
		c = bed.lerp(wet, smoothstep(-0.9, -0.02, h))
	elif h < 0.4:
		c = wet.lerp(sand, smoothstep(-0.02, 0.18, h))
	else:
		c = sand.lerp(grass_a, smoothstep(0.4, 0.95, h))
		var n: float = (sin(x * 0.7) * cos(z * 0.6) + sin(x * 0.23 + z * 0.37)) * 0.25 + 0.5
		c = c.lerp(grass_b, smoothstep(1.0, 2.0, h) * 0.55 + n * 0.35 * smoothstep(0.5, 1.2, h))
		c = c.lerp(dirt, smoothstep(0.58, 0.82, n) * 0.35 * smoothstep(0.6, 1.2, h))
	var slope: float = 1.0 - nrm.y
	c = c.lerp(rock, smoothstep(0.16, 0.36, slope) * smoothstep(-0.3, 0.3, h))
	return c

func _build_terrain() -> void:
	var n: int = TERRAIN_GRID + 1
	var half: float = TERRAIN_SIZE * 0.5
	var step: float = TERRAIN_SIZE / float(TERRAIN_GRID)
	var verts := PackedVector3Array()
	var norms := PackedVector3Array()
	var cols := PackedColorArray()
	verts.resize(n * n)
	norms.resize(n * n)
	cols.resize(n * n)
	for j in n:
		for i in n:
			var x: float = -half + float(i) * step
			var z: float = -half + float(j) * step
			var h: float = Terrain.h(x, z)
			var nrm: Vector3 = Terrain.normal(x, z)
			var k: int = j * n + i
			verts[k] = Vector3(x, h, z)
			norms[k] = nrm
			cols[k] = _ground_color(h, nrm, x, z)
	var idx := PackedInt32Array()
	idx.resize(TERRAIN_GRID * TERRAIN_GRID * 6)
	var w: int = 0
	for j in TERRAIN_GRID:
		for i in TERRAIN_GRID:
			var a: int = j * n + i
			var b: int = a + 1
			var c: int = a + n
			var d: int = c + 1
			idx[w] = a; idx[w + 1] = b; idx[w + 2] = c
			idx[w + 3] = b; idx[w + 4] = d; idx[w + 5] = c
			w += 6
	var arrays: Array = []
	arrays.resize(Mesh.ARRAY_MAX)
	arrays[Mesh.ARRAY_VERTEX] = verts
	arrays[Mesh.ARRAY_NORMAL] = norms
	arrays[Mesh.ARRAY_COLOR] = cols
	arrays[Mesh.ARRAY_INDEX] = idx
	var mesh := ArrayMesh.new()
	mesh.add_surface_from_arrays(Mesh.PRIMITIVE_TRIANGLES, arrays)

	var mat := StandardMaterial3D.new()
	mat.vertex_color_use_as_albedo = true
	mat.vertex_color_is_srgb = true
	mat.roughness = 0.95
	mat.albedo_texture = _noise_tex(0.035, false, [Color(0.62, 0.62, 0.62), Color(0.88, 0.88, 0.88), Color(1.0, 1.0, 1.0)],
		FastNoiseLite.TYPE_SIMPLEX_SMOOTH, 512)
	mat.normal_enabled = true
	mat.normal_texture = _noise_tex(0.06, true, [], FastNoiseLite.TYPE_SIMPLEX_SMOOTH, 512, 6.0)
	mat.normal_scale = 1.0
	mat.uv1_triplanar = true
	mat.uv1_world_triplanar = true
	mat.uv1_scale = Vector3(0.35, 0.35, 0.35)
	var mi := MeshInstance3D.new()
	mi.mesh = mesh
	mi.material_override = mat
	add_child(mi)

func _build_water() -> void:
	var mat := ShaderMaterial.new()
	mat.shader = load("res://water.gdshader")
	var near := PlaneMesh.new()
	near.size = Vector2(300, 300)
	near.subdivide_width = 240
	near.subdivide_depth = 240
	var mi := MeshInstance3D.new()
	mi.mesh = near
	mi.material_override = mat
	mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(mi)
	# Mặt biển xa tới chân trời (thấp hơn chút để không chồng lên mặt gần).
	var far := PlaneMesh.new()
	far.size = Vector2(4000, 4000)
	far.subdivide_width = 24
	far.subdivide_depth = 24
	var fi := MeshInstance3D.new()
	fi.mesh = far
	fi.material_override = mat
	fi.position.y = -0.45
	fi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(fi)

# ---------------------------------------------------------------- thực vật

func _foliage_mat(base: Color, tip: Color, href: float, sway: float, start: float, rng_h: float,
		rough: float = 0.85, back: float = 0.35) -> ShaderMaterial:
	var m := ShaderMaterial.new()
	m.shader = load("res://foliage.gdshader")
	m.set_shader_parameter("base_color", base)
	m.set_shader_parameter("tip_color", tip)
	m.set_shader_parameter("height_ref", href)
	m.set_shader_parameter("sway", sway)
	m.set_shader_parameter("sway_start", start)
	m.set_shader_parameter("sway_range", rng_h)
	m.set_shader_parameter("roughness_v", rough)
	m.set_shader_parameter("backlight", back)
	return m

func _scatter(mesh: Mesh, xf: Array[Transform3D], shadows: bool = true) -> void:
	var mm := MultiMesh.new()
	mm.transform_format = MultiMesh.TRANSFORM_3D
	mm.mesh = mesh
	mm.instance_count = xf.size()
	for i in xf.size():
		mm.set_instance_transform(i, xf[i])
	var mi := MultiMeshInstance3D.new()
	mi.multimesh = mm
	if not shadows:
		mi.cast_shadow = GeometryInstance3D.SHADOW_CASTING_SETTING_OFF
	add_child(mi)

func _surface(parts: Array) -> SurfaceTool:
	var st := SurfaceTool.new()
	st.begin(Mesh.PRIMITIVE_TRIANGLES)
	for p in parts:
		st.append_from(p[0] as Mesh, 0, p[1] as Transform3D)
	return st

func _cylm(r_top: float, r_bot: float, h: float, seg: int = 8) -> CylinderMesh:
	var c := CylinderMesh.new()
	c.top_radius = r_top
	c.bottom_radius = r_bot
	c.height = h
	c.radial_segments = seg
	c.rings = 2
	return c

func _pine_mesh(trunk_mat: Material, leaf_mat: Material) -> ArrayMesh:
	var am := ArrayMesh.new()
	var trunk_parts: Array = [[_cylm(0.09, 0.22, 2.4, 8), Transform3D(Basis(), Vector3(0, 1.2, 0))]]
	_surface(trunk_parts).commit(am)
	var leaf_parts: Array = []
	var layers: Array = [[1.75, 2.0, 1.7], [1.45, 1.9, 2.8], [1.15, 1.7, 3.8], [0.85, 1.5, 4.8], [0.5, 1.3, 5.8]]
	for L in layers:
		var r: float = float(L[0]) * rng.randf_range(0.92, 1.08)
		var hh: float = float(L[1])
		var y0: float = float(L[2])
		var b := Basis(Vector3.UP, rng.randf() * TAU)
		leaf_parts.append([_cylm(0.0, r, hh, 9), Transform3D(b, Vector3(rng.randf_range(-0.08, 0.08), y0 + hh * 0.5, rng.randf_range(-0.08, 0.08)))])
	_surface(leaf_parts).commit(am)
	am.surface_set_material(0, trunk_mat)
	am.surface_set_material(1, leaf_mat)
	return am

func _palm_mesh(trunk_mat: Material, leaf_mat: Material) -> ArrayMesh:
	var am := ArrayMesh.new()
	var trunk_parts: Array = []
	var cur := Transform3D(Basis(Vector3.BACK, 0.12), Vector3.ZERO)
	var seg_h: float = 0.95
	for i in 7:
		var rb: float = lerpf(0.24, 0.13, float(i) / 6.0)
		var rt: float = lerpf(0.24, 0.13, float(i + 1) / 6.0)
		trunk_parts.append([_cylm(rt, rb, seg_h, 8), cur * Transform3D(Basis(), Vector3(0, seg_h * 0.5, 0))])
		cur = cur.translated_local(Vector3(0, seg_h, 0))
		cur = cur.rotated_local(Vector3.RIGHT, 0.075)
	_surface(trunk_parts).commit(am)
	var leaf_parts: Array = []
	var fronds: int = 13
	for k in fronds:
		var yawk: float = TAU * float(k) / float(fronds) + rng.randf_range(-0.15, 0.15)
		var fx := cur * Transform3D(Basis(Vector3.UP, yawk), Vector3.ZERO)
		fx = fx.rotated_local(Vector3.RIGHT, rng.randf_range(0.5, 1.0))
		for s in 6:
			var len: float = 0.55
			var w: float = 0.5 * (1.0 - float(s) * 0.13)
			for sgn in [-1.0, 1.0]:
				var bx := BoxMesh.new()
				bx.size = Vector3(w * 0.55, 0.02, len * 1.05)
				leaf_parts.append([bx, fx * Transform3D(Basis(Vector3.BACK, sgn * 0.45), Vector3(sgn * w * 0.24, 0, -len * 0.5))])
			fx = fx.translated_local(Vector3(0, 0, -len))
			fx = fx.rotated_local(Vector3.RIGHT, -0.36)
	_surface(leaf_parts).commit(am)
	am.surface_set_material(0, trunk_mat)
	am.surface_set_material(1, leaf_mat)
	return am

func _bush_mesh(leaf_mat: Material) -> ArrayMesh:
	var am := ArrayMesh.new()
	var parts: Array = []
	for i in 4:
		var s := SphereMesh.new()
		var r: float = rng.randf_range(0.42, 0.7)
		s.radius = r
		s.height = r * 1.5
		s.radial_segments = 8
		s.rings = 4
		parts.append([s, Transform3D(Basis(), Vector3(rng.randf_range(-0.45, 0.45), r * 0.55, rng.randf_range(-0.45, 0.45)))])
	_surface(parts).commit(am)
	am.surface_set_material(0, leaf_mat)
	return am

func _rock_mesh(mat: Material) -> ArrayMesh:
	var sph := SphereMesh.new()
	sph.radius = 1.0
	sph.height = 2.0
	sph.radial_segments = 10
	sph.rings = 6
	var arr: Array = sph.get_mesh_arrays()
	var v: PackedVector3Array = arr[Mesh.ARRAY_VERTEX]
	var ind: PackedInt32Array = arr[Mesh.ARRAY_INDEX]
	var st := SurfaceTool.new()
	st.begin(Mesh.PRIMITIVE_TRIANGLES)
	for k in ind.size():
		var p: Vector3 = v[ind[k]]
		var hsh: float = fposmod(sin(p.dot(Vector3(12.9898, 78.233, 37.719)) * 3.1) * 43758.5453, 1.0)
		st.add_vertex(p * (0.78 + 0.5 * hsh))
	st.generate_normals()
	var m: ArrayMesh = st.commit()
	m.surface_set_material(0, mat)
	return m

func _ground_ok(x: float, z: float, hmin: float, hmax: float, slope_max: float = 0.4) -> bool:
	var h: float = Terrain.h(x, z)
	if h < hmin or h > hmax:
		return false
	return (1.0 - Terrain.normal(x, z).y) < slope_max

func _build_vegetation() -> void:
	var bark_albedo := _noise_tex(0.05, false, [Color(0.12, 0.08, 0.05), Color(0.30, 0.22, 0.15), Color(0.45, 0.35, 0.25)],
		FastNoiseLite.TYPE_SIMPLEX_SMOOTH, 512)
	var bark_normal := _noise_tex(0.06, true, [], FastNoiseLite.TYPE_SIMPLEX_SMOOTH, 512, 9.0)
	var trunk_mat := _foliage_mat(Color.WHITE, Color.WHITE, 4.0, 0.45, 0.5, 7.5, 0.9, 0.0)
	trunk_mat.set_shader_parameter("use_tex", true)
	trunk_mat.set_shader_parameter("albedo_tex", bark_albedo)
	trunk_mat.set_shader_parameter("normal_tex", bark_normal)
	var palm_trunk := _foliage_mat(Color.WHITE, Color.WHITE, 4.0, 0.55, 1.0, 6.0, 0.9, 0.0)
	palm_trunk.set_shader_parameter("use_tex", true)
	palm_trunk.set_shader_parameter("albedo_tex", bark_albedo)
	palm_trunk.set_shader_parameter("normal_tex", bark_normal)
	palm_trunk.set_shader_parameter("uv_scale", Vector2(2.0, 1.0))

	var pine_leaf := _foliage_mat(Color(0.03, 0.10, 0.05), Color(0.13, 0.26, 0.09), 7.0, 0.45, 0.5, 7.5, 0.9, 0.15)
	var palm_leaf := _foliage_mat(Color(0.08, 0.22, 0.05), Color(0.32, 0.52, 0.12), 7.5, 0.65, 1.0, 6.0, 0.7, 0.55)
	var bush_leaf := _foliage_mat(Color(0.04, 0.13, 0.05), Color(0.18, 0.32, 0.09), 1.2, 0.12, 0.1, 1.2)
	var grass_mat := _foliage_mat(Color(0.05, 0.12, 0.03), Color(0.40, 0.52, 0.17), 0.8, 0.26, 0.0, 0.8, 0.9, 0.55)

	var placed: Array[Vector2] = []

	var pine_xf: Array[Transform3D] = []
	var tries: int = 0
	while pine_xf.size() < 30 and tries < 4000:
		tries += 1
		var p := Vector2(rng.randf_range(-21, 21), rng.randf_range(-21, 21))
		if not _ground_ok(p.x, p.y, 0.9, 5.0, 0.3):
			continue
		if p.length() < 8.0:
			continue
		var close: bool = false
		for q in placed:
			if q.distance_to(p) < 2.7:
				close = true
				break
		if close:
			continue
		placed.append(p)
		var s: float = rng.randf_range(0.5, 0.85)
		var b := Basis(Vector3.UP, rng.randf() * TAU) * Basis.from_scale(Vector3(s, s * rng.randf_range(0.9, 1.25), s))
		pine_xf.append(Transform3D(b, Vector3(p.x, Terrain.h(p.x, p.y) - 0.1, p.y)))
	_scatter(_pine_mesh(trunk_mat, pine_leaf), pine_xf)

	var palm_xf: Array[Transform3D] = []
	tries = 0
	while palm_xf.size() < 30 and tries < 4000:
		tries += 1
		var p := Vector2(rng.randf_range(-21, 21), rng.randf_range(-21, 21))
		if not _ground_ok(p.x, p.y, 0.2, 1.0, 0.3) or p.length() < 7.0:
			continue
		var close: bool = false
		for q in placed:
			if q.distance_to(p) < 3.2:
				close = true
				break
		if close:
			continue
		placed.append(p)
		var s: float = rng.randf_range(0.6, 0.9)
		var b := Basis(Vector3.UP, rng.randf() * TAU) * Basis.from_scale(Vector3(s, s, s))
		palm_xf.append(Transform3D(b, Vector3(p.x, Terrain.h(p.x, p.y) - 0.15, p.y)))
	_scatter(_palm_mesh(palm_trunk, palm_leaf), palm_xf)

	var bush_xf: Array[Transform3D] = []
	tries = 0
	while bush_xf.size() < 70 and tries < 4000:
		tries += 1
		var p := Vector2(rng.randf_range(-21, 21), rng.randf_range(-21, 21))
		if not _ground_ok(p.x, p.y, 0.5, 3.5, 0.3):
			continue
		if p.length() < 5.5:
			continue
		var s: float = rng.randf_range(0.5, 1.0)
		var b := Basis(Vector3.UP, rng.randf() * TAU) * Basis.from_scale(Vector3(s, s * rng.randf_range(0.8, 1.2), s))
		bush_xf.append(Transform3D(b, Vector3(p.x, Terrain.h(p.x, p.y) - 0.05, p.y)))
	_scatter(_bush_mesh(bush_leaf), bush_xf)

	var rock_mat := StandardMaterial3D.new()
	rock_mat.albedo_color = Color(0.30, 0.30, 0.31)
	rock_mat.roughness = 0.92
	rock_mat.albedo_texture = _noise_tex(0.05, false, [Color(0.55, 0.55, 0.55), Color(1, 1, 1)],
		FastNoiseLite.TYPE_CELLULAR, 512)
	rock_mat.normal_enabled = true
	rock_mat.normal_texture = _noise_tex(0.07, true, [], FastNoiseLite.TYPE_SIMPLEX_SMOOTH, 512, 8.0)
	rock_mat.uv1_triplanar = true
	rock_mat.uv1_world_triplanar = true
	rock_mat.uv1_scale = Vector3(0.6, 0.6, 0.6)
	var rock_xf: Array[Transform3D] = []
	tries = 0
	while rock_xf.size() < 90 and tries < 5000:
		tries += 1
		var p := Vector2(rng.randf_range(-24, 24), rng.randf_range(-24, 24))
		var h: float = Terrain.h(p.x, p.y)
		if h < -0.6 or h > 3.0:
			continue
		if p.length() < 6.0 and h > 0.5:
			continue
		var big: bool = rng.randf() < 0.15
		var sc: float = rng.randf_range(0.6, 1.2) if big else rng.randf_range(0.15, 0.45)
		var b := Basis.from_euler(Vector3(rng.randf_range(-0.3, 0.3), rng.randf() * TAU, rng.randf_range(-0.3, 0.3))) \
			* Basis.from_scale(Vector3(sc * rng.randf_range(0.9, 1.5), sc * rng.randf_range(0.55, 0.95), sc * rng.randf_range(0.9, 1.4)))
		rock_xf.append(Transform3D(b, Vector3(p.x, h - sc * 0.22, p.y)))
	_scatter(_rock_mesh(rock_mat), rock_xf)

	var blade := _cylm(0.0, 0.035, 0.75, 3)
	blade.rings = 1
	var grass_xf: Array[Transform3D] = []
	tries = 0
	while grass_xf.size() < 9000 and tries < 40000:
		tries += 1
		var p := Vector2(rng.randf_range(-21, 21), rng.randf_range(-21, 21))
		if not _ground_ok(p.x, p.y, 0.45, 4.0, 0.3):
			continue
		var sy: float = rng.randf_range(0.45, 1.05)
		var b := Basis(Vector3.UP, rng.randf() * TAU) * Basis(Vector3.RIGHT, rng.randf_range(-0.25, 0.25)) \
			* Basis.from_scale(Vector3(rng.randf_range(0.8, 1.4), sy, rng.randf_range(0.8, 1.4)))
		grass_xf.append(Transform3D(b, Vector3(p.x, Terrain.h(p.x, p.y) + 0.37 * sy * 0.0, p.y)))
	var grass_mesh := ArrayMesh.new()
	_surface([[blade, Transform3D(Basis(), Vector3(0, 0.375, 0))]]).commit(grass_mesh)
	grass_mesh.surface_set_material(0, grass_mat)
	_scatter(grass_mesh, grass_xf, false)

# ------------------------------------------------------------ nhân vật, camera

func _build_player() -> void:
	player = PlayerScript.new()
	player.world = self
	player.position = Vector3(2.0, 0.0, 3.0)
	add_child(player)
	player.shake.connect(func(a: float): shake_amt = maxf(shake_amt, a))
	player.died.connect(_on_player_died)

func _build_camera() -> void:
	cam = Camera3D.new()
	cam.fov = 56.0
	cam.far = 1500.0
	cam.near = 0.1
	add_child(cam)
	cam.current = true
	cam_pos = player.global_position + Vector3(0, 4.3, 6.4)
	cam.global_position = cam_pos
	cam.look_at(player.global_position + Vector3(0, 1.4, 0))

func _build_hud() -> void:
	hud = HudScript.new()
	add_child(hud)
	hud.start_wave.connect(_on_start_wave)
	hud.upgrade_weapon.connect(_on_upgrade)
	hud.buy_heal.connect(_on_buy_heal)
	hud.buy_max_hp.connect(_on_buy_max_hp)
	hud.restart.connect(func(): get_tree().reload_current_scene())
	player.hp_changed.connect(hud.set_hp)
	player.damaged.connect(hud.flash_damage)
	player.weapon_changed.connect(_refresh_weapon_hud)
	_refresh_weapon_hud()
	hud.set_hp(player.hp, player.max_hp)
	hud.set_gold(player.gold)

func _refresh_weapon_hud() -> void:
	hud.set_weapon(player.weapon, player.levels)

# Chế độ xem thử (-- --showcase): đặt sẵn 3 loại quái đứng yên để kiểm tra hình dáng.
func _build_showcase() -> void:
	hud.hide_menu()
	player.position = Vector3(-1.5, 0.0, 5.0)
	var spots := {"crab": Vector3(-4.0, 0, 1.0), "merman": Vector3(0.5, 0, 1.0), "kraken": Vector3(6.0, 0, -1.5)}
	for kind in spots:
		var m: Node3D = MonsterScript.new()
		m.setup(kind, player, self, 1)
		m.position = spots[kind]
		m.frozen = true
		add_child(m)

# ------------------------------------------------------------------- đợt quái

func _compose_wave(w: int) -> Array[String]:
	var list: Array[String] = []
	var n: int = 3 + w * 2
	for i in n:
		var r: float = rng.randf()
		if w >= 3 and r < 0.22 + 0.03 * float(w):
			list.append("merman")
		elif w == 2 and r < 0.3:
			list.append("merman")
		else:
			list.append("crab")
	list.shuffle()
	if w % 5 == 0:
		list.append("kraken")
	return list

func _on_start_wave() -> void:
	if phase == Phase.FIGHT or phase == Phase.OVER:
		return
	wave += 1
	queue = _compose_wave(wave)
	spawn_timer = 0.8
	phase = Phase.FIGHT
	hud.hide_menu()
	hud.show_toast("Đợt %d" % wave + ("  —  HẢI QUÁI XUẤT HIỆN!" if wave % 5 == 0 else ""))

func _spawn_one(kind: String) -> void:
	var ang: float = rng.randf() * TAU
	var m: Node3D = MonsterScript.new()
	m.setup(kind, player, self, wave)
	m.position = Vector3(cos(ang) * spawn_radius, 0.0, sin(ang) * spawn_radius)
	add_child(m)
	m.died.connect(_on_monster_died)

func _monsters_left() -> int:
	return get_tree().get_nodes_in_group("monsters").size() + queue.size()

func _on_monster_died(m: Node3D) -> void:
	var g: int = int(m.get("gold"))
	player.gold += g
	hud.set_gold(player.gold)
	Fx.damage_text(self, m.global_position + Vector3(0, float(m.get("height")) + 0.6, 0), "+%d" % g, Color(1.0, 0.82, 0.3))

func _on_player_died() -> void:
	phase = Phase.OVER
	hud.show_game_over(wave - 1)

func _open_shop() -> void:
	hud.show_shop(wave, player.gold, player.levels, player.hp, player.max_hp)

func _on_upgrade(id: String) -> void:
	var lvl: int = int(player.levels[id])
	if lvl >= Weapons.MAX_LEVEL:
		return
	var cost: int = Weapons.upgrade_cost(lvl)
	if player.gold < cost:
		return
	player.gold -= cost
	player.levels[id] = lvl + 1
	hud.set_gold(player.gold)
	_refresh_weapon_hud()
	hud.show_toast("%s lên Lv %d!" % [Weapons.wname(id), lvl + 1])
	_open_shop()

func _on_buy_heal() -> void:
	if player.gold < 30 or player.hp >= player.max_hp:
		return
	player.gold -= 30
	player.heal(50.0)
	hud.set_gold(player.gold)
	_open_shop()

func _on_buy_max_hp() -> void:
	if player.gold < 60:
		return
	player.gold -= 60
	player.add_max_hp(20.0)
	hud.set_gold(player.gold)
	_open_shop()

# ------------------------------------------------------------------ vòng lặp

func _process(delta: float) -> void:
	if phase == Phase.FIGHT:
		spawn_timer -= delta
		if spawn_timer <= 0.0 and not queue.is_empty():
			_spawn_one(queue.pop_front())
			spawn_timer = maxf(0.45, 2.0 - float(wave) * 0.1)
		hud.set_wave(wave, _monsters_left())
		if queue.is_empty() and get_tree().get_nodes_in_group("monsters").is_empty():
			phase = Phase.SHOP
			var bonus: int = 20 + wave * 5
			player.gold += bonus
			hud.set_gold(player.gold)
			hud.show_toast("Quét sạch! +%d vàng" % bonus)
			_open_shop()
			hud.set_wave(wave, 0)
	if player.skill_cd_total > 0.0:
		hud.set_skill(1.0 - player.skill_cd_left / player.skill_cd_total)
	if demo:
		_demo_ai(delta)
	_update_camera(delta)

func _update_camera(delta: float) -> void:
	if cam_fix.size() == 6:
		cam.global_position = Vector3(cam_fix[0], cam_fix[1], cam_fix[2])
		cam.look_at(Vector3(cam_fix[3], cam_fix[4], cam_fix[5]))
		return
	var target: Vector3 = player.global_position + Vector3(0, 1.4, 0)
	var desired: Vector3 = target + Vector3(0, 4.3, 6.4)
	cam_pos = cam_pos.lerp(desired, 1.0 - exp(-7.0 * delta))
	shake_amt = maxf(0.0, shake_amt - delta * 2.4)
	var off := Vector3(rng.randf_range(-1, 1), rng.randf_range(-1, 1), rng.randf_range(-1, 1)) * shake_amt * 0.3
	cam.global_position = cam_pos + off
	cam.look_at(target + Vector3(0, 0.4, 0))

# Điều khiển tự động để chạy thử/kiểm tra (chỉ khi có tham số --demo).
func _demo_ai(delta: float) -> void:
	demo_t += delta
	if int(demo_t * 2.0) != int((demo_t - delta) * 2.0) and int(demo_t) % 5 == 0 and int(demo_t * 2.0) % 2 == 0:
		print("[demo] t=%ds đợt=%d vàng=%d máu=%d quái=%d vũ khí=%s cấp=%s" % [int(demo_t), wave, player.gold, int(player.hp), _monsters_left(), player.weapon, str(player.levels)])
	if phase == Phase.SHOP:
		for id in Weapons.IDS:
			while int(player.levels[id]) < Weapons.MAX_LEVEL and player.gold >= Weapons.upgrade_cost(int(player.levels[id])):
				_on_upgrade(id)
		_on_start_wave()
	var wi: int = int(demo_t / 7.0) % Weapons.IDS.size()
	player.set_weapon(Weapons.IDS[wi])
	var best: Node3D = null
	var best_d: float = 1e9
	for n in get_tree().get_nodes_in_group("monsters"):
		var m: Node3D = n as Node3D
		var d: float = m.global_position.distance_to(player.global_position)
		if d < best_d:
			best_d = d
			best = m
	player.in_move = Vector2.ZERO
	player.in_attack = false
	player.in_skill = false
	player.in_roll = false
	if best != null:
		var dv: Vector3 = best.global_position - player.global_position
		dv.y = 0.0
		var reach: float = Weapons.reach(player.weapon)
		if best_d > reach * 0.85:
			player.in_move = Vector2(dv.x, dv.z).normalized()
		player.in_attack = best_d < reach + 1.2
		player.in_skill = best_d < 4.5 and rng.randf() < 0.04
		player.in_roll = rng.randf() < 0.004
