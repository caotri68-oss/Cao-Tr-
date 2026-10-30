extends Node3D

# Màn thử nghiệm: đảo nhỏ, cây rung nhẹ, người que di chuyển bằng phím mũi tên.
# Toàn bộ scene được dựng bằng code nên không cần kéo thả trong editor.

const SPEED: float = 4.0
const TREE_COUNT: int = 22

var figure: Node3D
var leg_l: Node3D
var leg_r: Node3D
var trees: Array[Node3D] = []
var t: float = 0.0

func _ready() -> void:
	_build_environment()
	_build_ground()
	_build_trees()
	_build_figure()
	_build_camera()

func _build_environment() -> void:
	var env := Environment.new()
	env.background_mode = Environment.BG_COLOR
	env.background_color = Color(0.72, 0.89, 0.95)
	env.ambient_light_source = Environment.AMBIENT_SOURCE_COLOR
	env.ambient_light_color = Color(0.85, 0.92, 1.0)
	env.ambient_light_energy = 0.9

	var world := WorldEnvironment.new()
	world.environment = env
	add_child(world)

	var sun := DirectionalLight3D.new()
	sun.rotation_degrees = Vector3(-55, -30, 0)
	sun.light_energy = 2.2
	sun.light_color = Color(1.0, 0.95, 0.84)
	sun.shadow_enabled = true
	add_child(sun)

func _build_ground() -> void:
	var plane := PlaneMesh.new()
	plane.size = Vector2(40, 40)
	var mat := StandardMaterial3D.new()
	mat.albedo_color = Color(0.48, 0.73, 0.32)
	var ground := MeshInstance3D.new()
	ground.mesh = plane
	ground.material_override = mat
	add_child(ground)

func _build_trees() -> void:
	var rng := RandomNumberGenerator.new()
	rng.seed = 20261030
	var trunk_mat := StandardMaterial3D.new()
	trunk_mat.albedo_color = Color(0.45, 0.29, 0.18)
	var leaf_mat := StandardMaterial3D.new()
	leaf_mat.albedo_color = Color(0.36, 0.68, 0.30)

	var placed: int = 0
	var tries: int = 0
	while placed < TREE_COUNT and tries < 500:
		tries += 1
		var p := Vector3(rng.randf_range(-16, 16), 0, rng.randf_range(-16, 16))
		if p.length() < 3.5:
			continue
		var tree := Node3D.new()
		tree.position = p
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
	var cam := Camera3D.new()
	cam.position = Vector3(0, 7, 10)
	cam.rotation_degrees = Vector3(-30, 0, 0)
	cam.current = true
	add_child(cam)

func _process(delta: float) -> void:
	t += delta

	var dir: Vector2 = Input.get_vector("ui_left", "ui_right", "ui_up", "ui_down")
	var move := Vector3(dir.x, 0, dir.y)
	var moving: bool = move.length() > 0.01
	if moving:
		figure.position += move.normalized() * SPEED * delta
		figure.rotation.y = atan2(-move.x, -move.z)

	# Chân đung đưa khi đi, đứng yên thì thở nhẹ.
	var swing: float = sin(t * 9.0) * 0.6 if moving else 0.0
	leg_l.rotation.x = swing
	leg_r.rotation.x = -swing

	# Cây rung nhẹ theo gió.
	for i in trees.size():
		trees[i].rotation.z = sin(t * 1.4 + i * 0.7) * 0.035
