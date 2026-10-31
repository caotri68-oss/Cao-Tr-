shader_type sky;

// Bầu trời hoàng hôn: dải màu, mặt trời, mây nhiều lớp được nhuộm theo nắng.

uniform vec3 top_color : source_color = vec3(0.10, 0.20, 0.42);
uniform vec3 mid_color : source_color = vec3(0.55, 0.50, 0.62);
uniform vec3 horizon_color : source_color = vec3(1.0, 0.62, 0.36);
uniform vec3 ground_color : source_color = vec3(0.10, 0.09, 0.10);
uniform vec3 sun_color : source_color = vec3(1.0, 0.72, 0.42);
uniform vec3 sun_dir = vec3(0.6, 0.3, -0.7);
uniform float cloud_cover = 0.52;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float vnoise(vec2 p) {
	vec2 i = floor(p);
	vec2 f = fract(p);
	f = f * f * (3.0 - 2.0 * f);
	return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
		mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}

float fbm(vec2 p) {
	float v = 0.0;
	float a = 0.5;
	for (int i = 0; i < 5; i++) {
		v += a * vnoise(p);
		p = p * 2.07 + vec2(31.0, 17.0);
		a *= 0.5;
	}
	return v;
}

void sky() {
	vec3 dir = normalize(EYEDIR);
	vec3 sd = normalize(sun_dir);
	float y = dir.y;

	vec3 col;
	if (y >= 0.0) {
		col = mix(horizon_color, mid_color, smoothstep(0.0, 0.22, y));
		col = mix(col, top_color, smoothstep(0.15, 0.75, y));
	} else {
		col = mix(horizon_color * 0.35, ground_color, smoothstep(0.0, 0.4, -y));
	}

	float s = max(dot(dir, sd), 0.0);
	// Quầng sáng quanh mặt trời tô ấm vùng trời phía nó.
	col += sun_color * pow(s, 6.0) * 0.28 * smoothstep(-0.05, 0.3, y + 0.1);
	col += sun_color * (pow(s, 900.0) * 9.0 + pow(s, 60.0) * 0.6);

	// Mây: chiếu lên một mặt phẳng ở trên cao.
	if (y > 0.0) {
		vec2 uv = dir.xz / (y + 0.18) * 0.9;
		float n = fbm(uv * 1.3);
		float detail = fbm(uv * 4.0 + 5.0);
		float c = smoothstep(1.0 - cloud_cover, 1.0 - cloud_cover + 0.28, n * 0.8 + detail * 0.3);
		float fade = smoothstep(0.0, 0.18, y);
		// Mặt hướng về mặt trời sáng rực viền vàng, mặt khuất tối tím.
		float lit = clamp(0.45 + 0.9 * dot(dir, sd) + (n - detail) * 0.8, 0.0, 1.0);
		vec3 shadow_c = vec3(0.22, 0.20, 0.32);
		vec3 lit_c = mix(vec3(1.0, 0.70, 0.52), vec3(1.0, 0.86, 0.70), lit);
		vec3 cc = mix(shadow_c, lit_c, lit);
		col = mix(col, cc, c * fade * 0.92);
	}
	COLOR = col;
}
