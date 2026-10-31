extends Node3D
# Đạn bay dùng chung: sóng kiếm, giáo ném, sóng chấn của người chơi,
# và cầu điện của sứa. Tự gắn mô hình hiển thị từ bên ngoài.

const Terrain = preload("res://terrain.gd")
const Fx = preload("res://fx.gd")

var vel: Vector3 = Vector3.ZERO
var dmg: float = 10.0
var knock: float = 3.0
var hit_radius: float = 0.8
var life: float = 2.0
var pierce: bool = true
var stun: float = 0.0
var from_player: bool = true
var player: Node3D
var world: Node3D
var trail_color: Color = Color(0, 0, 0, 0)
var lift: float = 1.0
var hit_set: Array = []
var _trail_t: float = 0.0

func _process(delta: float) -> void:
	position += vel * delta
	position.y = maxf(Terrain.h(position.x, position.z), Terrain.WATER_Y) + lift
	life -= delta
	if trail_color.a > 0.0:
		_trail_t -= delta
		if _trail_t <= 0.0:
			_trail_t = 0.1
			Fx.burst(world, global_position + Vector3(0, -lift * 0.6, 0), trail_color, 4, 1.6, 0.35, 0.16, 1.0)
	if from_player:
		_hit_monsters()
	else:
		_hit_player()
	if life <= 0.0:
		queue_free()

func _flat(a: Vector3, b: Vector3) -> Vector3:
	var d: Vector3 = b - a
	d.y = 0.0
	return d

func _hit_monsters() -> void:
	for n in get_tree().get_nodes_in_group("monsters"):
		var m: Node3D = n as Node3D
		if hit_set.has(m):
			continue
		var d: Vector3 = _flat(global_position, m.global_position)
		if d.length() <= hit_radius + float(m.get("radius")):
			hit_set.append(m)
			var dir: Vector3 = vel.normalized()
			m.take_damage(dmg, dir, knock, stun)
			if not pierce:
				queue_free()
				return

func _hit_player() -> void:
	if player == null:
		return
	var d: Vector3 = _flat(global_position, player.global_position)
	if d.length() <= hit_radius + float(player.get("radius_hit")):
		player.take_damage(dmg, vel.normalized(), false, null)
		Fx.burst(world, global_position, Color(0.5, 1.0, 0.9), 12, 4.0, 0.4, 0.14)
		queue_free()
