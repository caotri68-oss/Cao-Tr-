shader_type spatial;
render_mode cull_disabled, depth_draw_opaque;

// Màu nước: sâu ngoài khơi, nông gần bờ.
uniform vec3 deep_color : source_color = vec3(0.04, 0.31, 0.47);
uniform vec3 shallow_color : source_color = vec3(0.25, 0.82, 0.79);
uniform vec3 sky_color : source_color = vec3(0.7, 0.88, 0.95);

varying vec3 world_pos;

// Phải giống hệt _terrain_h() trong main.gd.
float terrain_h(vec2 p) {
	float d = length(p) / 22.0;
	float h = 3.0 * (1.0 - smoothstep(0.15, 1.0, d)) - 1.6;
	h += 0.35 * sin(p.x * 0.45) * cos(p.y * 0.38) * (1.0 - smoothstep(0.3, 1.0, d));
	h += 0.15 * sin(p.x * 1.1 + p.y * 0.7);
	return h;
}

void vertex() {
	float t = TIME;
	float a1 = VERTEX.x * 0.35 + t * 0.8;
	float a2 = VERTEX.z * 0.5 + VERTEX.x * 0.2 - t * 0.6;
	float a3 = (VERTEX.x + VERTEX.z) * 0.9 + t * 1.3;
	VERTEX.y += sin(a1) * 0.12 + sin(a2) * 0.09 + sin(a3) * 0.04;
	// Đạo hàm của sóng để có pháp tuyến cho ánh sáng.
	float dx = cos(a1) * 0.35 * 0.12 + cos(a2) * 0.2 * 0.09 + cos(a3) * 0.9 * 0.04;
	float dz = cos(a2) * 0.5 * 0.09 + cos(a3) * 0.9 * 0.04;
	NORMAL = normalize(vec3(-dx, 1.0, -dz));
	world_pos = VERTEX;
}

void fragment() {
	vec2 q = world_pos.xz;
	float t = TIME;

	// Gợn nhỏ làm vỡ mặt phản chiếu.
	vec3 n = NORMAL;
	n.xz += vec2(
		sin(q.y * 2.1 + t * 1.1) + sin(q.x * 3.3 - t * 0.9),
		cos(q.x * 2.3 + t * 0.8) + cos(q.y * 3.1 - t * 1.0)
	) * 0.035;
	n = normalize(n);
	float fres = 0.04 + 0.96 * pow(1.0 - clamp(dot(n, VIEW), 0.0, 1.0), 4.0);

	// Độ sâu = âm của độ cao đáy.
	float depth = max(-terrain_h(q), 0.0);
	float shallow = exp(-depth * 1.1);
	vec3 body = mix(deep_color, shallow_color, shallow);
	vec3 col = mix(body, sky_color, fres * 0.85);

	// Bọt bờ và các dải sóng vỗ vào.
	float wob = sin(t * 1.4 + q.x * 0.8 + q.y * 0.6) * 0.06;
	float edge = 1.0 - smoothstep(0.0, 0.16 + wob, depth);
	float ring = sin(depth * 11.0 - t * 1.7 + sin(q.x * 0.9 + q.y * 0.7) * 1.5);
	float rings = smoothstep(0.82, 1.0, ring) * (1.0 - smoothstep(0.1, 0.95, depth));
	float foam = clamp(edge + rings * 0.55, 0.0, 1.0);

	ALBEDO = mix(col, vec3(1.0), foam);
	ROUGHNESS = 0.12;
	SPECULAR = 0.7;
	ALPHA = max(mix(0.6, 0.92, smoothstep(0.0, 0.5, depth)), foam);
}
