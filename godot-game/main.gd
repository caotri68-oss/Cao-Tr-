extends Node3D

# Đảo nhỏ có biển: địa hình, nước, cây rung nhẹ, người que đi được.
# Toàn bộ scene được dựng bằng code nên không cần kéo thả trong editor.
# _terrain_h() và shader water.gdshader phải dùng cùng công thức.

const SPEED: float = 4.0
const TREE_COUNT: int = 26
const ISLAND_SIZE: float = 44.0
const GRID: int = 90

var figure: Node3D
var leg_l: Node3D
var leg_r: Node3D
var cam: Camera3D
var trees: Array[Node3D] = []
var t: float = 0.0

func _ready() -> void:
	_build_environment()
	_build_terrain()
	_build_water()
	_build_trees()
	_build_figure()
	_build_camera()

# Độ cao địa hình. Cùng công thức với bản web và với shader nước.
func _terrain_h(x: float, z: float) -> float:
	var d: float = Vector2(x, z).length() / 22.0
	var h: float = 3.0 * (1.0 - smoothstep(0.15, 1.0, d)) - 1.6
	h += 0.35 * sin(x * 0.45) * cos(z * 0.38) * (1.0 - smoothstep(0.3, 1.0, d))
	h += 0.15 * sin(x * 1.1 + z * 0.7)
	return h

func _build_environment() -> void:
	var env := Environment.new()
	env.background_mode = Environment.BG_COLOR
	env.background_color = Color(0.72, 0.89, 0.95)
	env.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	env.ambient_light_color = Color(0.85, 0.92, 1.0)
	env.ambient_light_energy = 0.9
	env.fog_enabled = true
	env.fog_light_color = Color(0.75, 0.9, 0.95)
	env.fog_density = 0.008

	var world := WorldEnvironment.new()
	world.environment = env
	add_child(world)

	var sun := DirectionalLight3D.new()
	sun.rotation_degrees = Vector3(-55, -30, 0)
	sun.light_energy = 2.2
	sun.light_color = Color(1.0, 0.95, 0.84)
	sun.shadow_enabled = true
	add_child(sun)

func _build_terrain() -> void:
	var st := SurfaceTool.new()
	st.begin(Mesh.PRIMITIVE_TRIANGLES)
	var half: float = ISLAND_SIZE / 2.0
	var step: float = ISLAND_SIZE / GRID
	for i in GRID:
		for j in GRID:
			_add_quad(st, -half + i * step, -half + j * step, step)
	st.generate_normals()

	var mat := StandardMaterial3D.new()
	mat.vertex_color_use_as_albedo = true
	mat.roughness = 1.0
	mat.cull_mode = BaseMaterial3D.CULL_DISABLED

	var mesh := MeshInstance3D.new()
	mesh.mesh = st.commit()
	mesh.material_override = mat
	add_child(mesh)

func _add_quad(st: SurfaceTool, x0: float, z0: float, s: float) -> void:
	var a := Vector3(x0, 0, z0)
	var b := Vector3(x0 + s, 0, z0)
	var c := Vector3(x0, 0, z0 + s)
	var d := Vector3(x0 + s, 0, z0 + s)
	# Thứ tự a-c-b và b-c-d để pháp tuyến hướng lên trên.
	for v in [a, c, b, b, c, d]:
		_add_ground_vertex(st, v)

func _add_ground_vertex(st: SurfaceTool, v: Vector3) -> void:
	v.y = _terrain_h(v.x, v.z)
	st.set_color(_ground_color(v.y, v.x, v.z))
	st.add_vertex(v)

func _ground_color(h: float, x: float, z: float) -> Color:
	var bed := Color(0.31, 0.45, 0.5)
	var wet := Color(0.72, 0.65, 0.45)
	var sand := Color(0.91, 0.83, 0.61)
	var grass_a := Color(0.47, 0.72, 0.31)
	var grass_b := Color(0.3, 0.6, 0.26)
	if h < -0.6:
		return bed
	if h < 0.0:
		return bed.lerp(wet, smoothstep(-0.6, 0.0, h))
	if h < 0.28:
		return wet.lerp(sand, smoothstep(0.0, 0.1, h))
	var c := sand.lerp(grass_a, smoothstep(0.28, 0.6, h))
	var n: float = (sin(x * 1.7) * cos(z * 1.3) + 1.0) * 0.5
	return c.lerp(grass_b, smoothstep(0.8, 1.6, h) * 0.6 + n * 0.25 * smoothstep(0.3, 0.7, h))

func _build_water() -> void:
	var plane := PlaneMesh.new()
	plane.size = Vector2(300, 300)
	plane.subdivide_width = 150
	plane.subdivide_depth = 150

	var mat := ShaderMaterial.new()
	mat.shader = load("res://water.gdshader")

	var water := MeshInstance3D.new()
	water.mesh = plane
	water.material_override = mat
	add_child(water)

func _build_trees() -> void:
	var rng := RandomNumberGenerator.new()
	rng.seed = 20261030
	var trunk_mat := StandardMaterial3D.new()
	trunk_mat.albedo_color = Color(0.45, 0.29, 0.18)
	var leaf_mat := StandardMaterial3D.new()
	leaf_mat.albedo_color = Color(0.36, 0.68, 0.30)

	var placed: int = 0
	var tries: int = 0
	while placed < TREE_COUNT and tries < 800:
		tries += 1
		var x: float = rng.randf_range(-18, 18)
		var z: float = rng.randf_range(-18, 18)
		var h: float = _terrain_h(x, z)
		if h < 0.45 or Vector2(x, z).length() < 3.5:
			continue

		var tree := Node3D.new()
		tree.position = Vector3(x, h, z)
		tree.scale = Vector3.ONE * rng.randf_range(0.8, 1.4)

		var trunk := MeshInstance3D.new()
		var trunk_mesh := CylinderMesh.new()
		trunk_mesh.top_radius = 0.12
		trunk_mesh.bottom_radius = 0.18
		trunk_mesh.height = 1.2
		trunk.mesh = trunk_mesh
		trunk.material_override = trunk_mat
		trunk.position.y = 0.6
		tree.add_child(trunk)

		var crown := MeshInstance3D.new()
		var crown_mesh := SphereMesh.new()
		crown_mesh.radius = 0.9
		crown_mesh.height = 1.8
		crown.mesh = crown_mesh
		crown.material_override = leaf_mat
		crown.position.y = 1.9
		tree.add_child(crown)

		add_child(tree)
		trees.append(tree)
		placed += 1

func _build_figure() -> void:
	var ink := StandardMaterial3D.new()
	ink.albedo_color = Color(0.1, 0.1, 0.12)

	figure = Node3D.new()
	figure.position = Vector3(0, _terrain_h(0, 0), 0)
	add_child(figure)

	var body := _limb(0.95, 0.05, ink)
	body.position.y = 1.5
	figure.add_child(body)

	var head := MeshInstance3D.new()
	var head_mesh := SphereMesh.new()
	head_mesh.radius = 0.28
	head_mesh.height = 0.56
	head.mesh = head_mesh
	head.material_override = ink
	head.position.y = 2.15
	figure.add_child(head)

	leg_l = _pivot(figure, Vector3(-0.12, 1.03, 0), 1.05, 0.05, ink)
	leg_r = _pivot(figure, Vector3(0.12, 1.03, 0), 1.05, 0.05, ink)
	_pivot(figure, Vector3(-0.1, 1.9, 0), 0.85, 0.045, ink)
	_pivot(figure, Vector3(0.1, 1.9, 0), 0.85, 0.045, ink)

func _limb(length: float, radius: float, mat: Material) -> MeshInstance3D:
	var m := MeshInstance3D.new()
	var cyl := CylinderMesh.new()
	cyl.top_radius = radius
	cyl.bottom_radius = radius
	cyl.height = length
	m.mesh = cyl
	m.material_override = mat
	return m

# Tạo một khớp (pivot) đặt tại vai/hông để chân/tay đung đưa quanh đầu khớp.
func _pivot(parent: Node3D, at: Vector3, length: float, radius: float, mat: Material) -> Node3D:
	var pivot := Node3D.new()
	pivot.position = at
	var m := _limb(length, radius, mat)
	m.position.y = -length / 2.0
	pivot.add_child(m)
	parent.add_child(pivot)
	return pivot

func _build_camera() -> void:
	cam = Camera3D.new()
	cam.current = true
	add_child(cam)

func _process(delta: float) -> void:
	t += delta

	var dir: Vector2 = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	var move := Vector3(dir.x, 0, dir.y)
	var moving: bool = move.length() > 0.01
	if moving:
		var next: Vector3 = figure.position + move.normalized() * SPEED * delta
		# Không cho đi xuống nước.
		if _terrain_h(next.x, next.z) > -0.2:
			figure.position.x = next.x
			figure.position.z = next.z
		figure.rotation.y = atan2(-move.x, -move.z)
	figure.position.y = _terrain_h(figure.position.x, figure.position.z)

	# Chân đung đưa khi đi, đứng yên thì thở nhẹ.
	var swing: float = sin(t * 9.0) * 0.6 if moving else 0.0
	leg_l.rotation.x = swing
	leg_r.rotation.x = -swing

	# Cây rung nhẹ theo gió.
	for i in trees.size():
		trees[i].rotation.z = sin(t * 1.4 + i * 0.7) * 0.035

	# Camera bám theo người que.
	cam.position = figure.position + Vector3(0, 7, 10)
	cam.look_at(figure.position + Vector3(0, 1.2, 0))
