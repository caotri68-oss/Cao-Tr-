shader_type spatial;
render_mode cull_disabled;

// Dùng cho thân cây, tán lá và cỏ: lắc theo gió, đổi màu theo chiều cao,
// lá được ánh sáng xuyên qua (BACKLIGHT) khi nhìn ngược nắng.

uniform vec3 base_color : source_color = vec3(0.05, 0.15, 0.07);
uniform vec3 tip_color : source_color = vec3(0.16, 0.32, 0.10);
uniform float roughness_v : hint_range(0.0, 1.0) = 0.85;
uniform float height_ref = 5.0;
uniform float sway = 0.15;          // biên độ lắc ở ngọn (mét)
uniform float sway_start = 0.5;     // độ cao bắt đầu lắc
uniform float sway_range = 6.0;     // độ cao để lắc đạt tối đa
uniform float wind = 1.0;
uniform float backlight = 0.35;
uniform bool use_tex = false;       // thân cây dùng texture vỏ
uniform sampler2D albedo_tex : source_color, repeat_enable, filter_linear_mipmap;
uniform sampler2D normal_tex : hint_normal, repeat_enable, filter_linear_mipmap;
uniform vec2 uv_scale = vec2(2.0, 4.0);

varying float v_h;
varying vec3 v_world;
varying float v_tint;

float hash(vec2 p) {
	return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void vertex() {
	v_h = VERTEX.y;
	vec3 origin = MODEL_MATRIX[3].xyz;
	v_tint = hash(floor(origin.xz * 0.37));
	float bend = clamp((VERTEX.y - sway_start) / sway_range, 0.0, 1.0);
	bend = bend * bend;
	float gust = 0.55 + 0.45 * sin(TIME * 0.6 + origin.x * 0.12 + origin.z * 0.09);
	float w1 = sin(TIME * 1.8 + origin.x * 0.5 + origin.z * 0.4 + VERTEX.y * 0.8);
	float w2 = cos(TIME * 1.4 + origin.z * 0.45 + VERTEX.y * 0.6);
	VERTEX.x += (w1 * 0.6 + 0.8) * gust * bend * sway * wind;
	VERTEX.z += w2 * 0.5 * gust * bend * sway * wind;
	v_world = (MODEL_MATRIX * vec4(VERTEX, 1.0)).xyz;
}

void fragment() {
	float speck = hash(floor(v_world.xz * 7.0 + v_world.y * 3.0)) * 0.18
		+ hash(floor(v_world.xz * 23.0 + v_world.y * 9.0)) * 0.10;
	float k = clamp(v_h / height_ref, 0.0, 1.0);
	vec3 c = mix(base_color, tip_color, k);
	if (use_tex) {
		c = texture(albedo_tex, UV * uv_scale).rgb;
		speck *= 0.3;
	}
	c *= (0.78 + speck) * (0.85 + 0.3 * v_tint);
	ALBEDO = c;
	ROUGHNESS = roughness_v;
	SPECULAR = 0.2;
	BACKLIGHT = c * backlight;
}
