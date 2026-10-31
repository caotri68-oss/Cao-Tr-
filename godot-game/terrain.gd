extends RefCounted
# Công thức độ cao địa hình, dùng chung cho code và shader nước (water.gdshader).
# Nếu sửa ở đây thì phải sửa cả hàm terrain_h() trong water.gdshader.

const WATER_Y: float = 0.0

static func h(x: float, z: float) -> float:
	var ang: float = atan2(z, x)
	var d: float = Vector2(x, z).length() / 24.0
	d *= 1.0 + 0.10 * sin(ang * 3.0 + 0.5) + 0.05 * sin(ang * 7.0 + 1.3)
	var r: float = 1.0 - smoothstep(0.12, 1.0, d)
	var out: float = 3.4 * r - 1.8
	out += 0.9 * (1.0 - smoothstep(0.0, 0.5, d))
	out += 0.45 * sin(x * 0.31 + 1.0) * cos(z * 0.27) * (1.0 - smoothstep(0.3, 1.0, d))
	out += 0.14 * sin(x * 1.1 + z * 0.7) * (1.0 - smoothstep(0.5, 1.0, d))
	return out

static func normal(x: float, z: float) -> Vector3:
	var e: float = 0.25
	var dx: float = h(x + e, z) - h(x - e, z)
	var dz: float = h(x, z + e) - h(x, z - e)
	return Vector3(-dx, 2.0 * e, -dz).normalized()
