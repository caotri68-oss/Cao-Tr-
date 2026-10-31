shader_type spatial;
render_mode cull_disabled, depth_draw_opaque, specular_schlick_ggx;

// Nước biển: sóng lớn (vertex), gợn nhỏ (fragment), màu theo độ sâu,
// bọt vỗ bờ + bọt đầu sóng, phản chiếu bầu trời qua PBR.

uniform vec3 deep_color : source_color = vec3(0.015, 0.11, 0.17);
uniform vec3 shallow_color : source_color = vec3(0.16, 0.50, 0.48);
uniform vec3 foam_color : source_color = vec3(0.93, 0.96, 0.97);

varying vec3 world_pos;
varying vec3 w_normal;

// Phải giống hệt Terrain.h() trong terrain.gd.
float terrain_h(vec2 p) {
	float ang = atan(p.y, p.x);
	float d = length(p) / 24.0;
	d *= 1.0 + 0.10 * sin(ang * 3.0 + 0.5) + 0.05 * sin(ang * 7.0 + 1.3);
	float r = 1.0 - smoothstep(0.12, 1.0, d);
	float o = 3.4 * r - 1.8;
	o += 0.9 * (1.0 - smoothstep(0.0, 0.5, d));
	o += 0.45 * sin(p.x * 0.31 + 1.0) * cos(p.y * 0.27) * (1.0 - smoothstep(0.3, 1.0, d));
	o += 0.14 * sin(p.x * 1.1 + p.y * 0.7) * (1.0 - smoothstep(0.5, 1.0, d));
	return o;
}

float hash21(vec2 p) {
	return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453);
}

float vnoise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	f = f * f * (3.0 - 2.0 * f);
	float a = hash21(i);
	float b = hash21(i + vec2(1.0, 0.0));
	float c = hash21(i + vec2(0.0, 1.0));
	float d = hash21(i + vec2(1.0, 1.0));
	return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
	float v = 0.5 * vnoise(p);
	p = p * 2.03 + vec2(17.0, 9.0);
	return v + 0.5 * vnoise(p) * 0.5 + 0.25;
}

void vertex() {
	float t = TIME;
	float a1 = VERTEX.x * 0.35 + t * 0.8;
	float a2 = VERTEX.z * 0.5 + VERTEX.x * 0.2 - t * 0.6;
	float a3 = (VERTEX.x + VERTEX.z) * 0.9 + t * 1.3;
	VERTEX.y += sin(a1) * 0.12 + sin(a2) * 0.09 + sin(a3) * 0.04;
	float dx = cos(a1) * 0.35 * 0.12 + cos(a2) * 0.2 * 0.09 + cos(a3) * 0.9 * 0.04;
	float dz = cos(a2) * 0.5 * 0.09 + cos(a3) * 0.9 * 0.04;
	w_normal = normalize(vec3(-dx, 1.0, -dz));
	world_pos = VERTEX;
}

void fragment() {
	vec2 q = world_pos.xz;
	float t = TIME;

	// Gợn nhỏ: tổng vài sóng sin (rẻ hơn noise).
	vec2 g = vec2(
		sin(q.y * 2.1 + t * 1.1) + sin(q.x * 3.3 - t * 0.9),
		cos(q.x * 2.3 + t * 0.8) + cos(q.y * 3.1 - t * 1.0)
	) * 0.035;
	vec3 nw = normalize(w_normal + vec3(g.x, 0.0, g.y));
	NORMAL = (VIEW_MATRIX * vec4(nw, 0.0)).xyz;

	// Độ sâu so với đáy; dùng cùng hàm địa hình với terrain.gd.
	float depth = max(-terrain_h(q), 0.0);
	float shallow = exp(-depth * 0.85);
	vec3 body = mix(deep_color, shallow_color, shallow);

	// Bọt: viền bờ lốm đốm, dải sóng vỗ vào, bọt trắng đầu sóng.
	float fn = fbm(q * 2.2 + vec2(t * 0.15, -t * 0.1));
	float wob = sin(t * 1.3 + q.x * 0.7 + q.y * 0.5) * 0.07;
	float edge = (1.0 - smoothstep(0.0, 0.30 + wob, depth)) * smoothstep(0.18, 0.62, fn + 0.3);
	float ring = sin(depth * 9.0 - t * 1.5 + fn * 3.0);
	float rings = smoothstep(0.86, 1.0, ring) * (1.0 - smoothstep(0.15, 1.1, depth)) * smoothstep(0.25, 0.6, fn);
	float crest = smoothstep(0.16, 0.26, world_pos.y) * smoothstep(0.4, 0.7, fn) * 0.7;
	float foam = clamp(edge + rings * 0.7 + crest, 0.0, 1.0);

	ALBEDO = mix(body, foam_color, foam);
	ROUGHNESS = mix(0.05, 0.85, foam);
	SPECULAR = 0.6;
	METALLIC = 0.0;
	EMISSION = body * 0.18 * smoothstep(0.1, 0.25, world_pos.y);
	ALPHA = max(mix(0.40, 1.0, smoothstep(0.0, 1.1, depth)), foam);
}
