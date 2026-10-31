extends RefCounted
# Dữ liệu vũ khí, chiêu thức (E / R / Q) và công thức nâng cấp.

const IDS: Array[String] = ["sword", "spear", "hammer"]
const MAX_LEVEL: int = 5
const SLOTS: Array[String] = ["E", "R", "Q"]
# Cấp vũ khí cần để mở từng chiêu.
const UNLOCK: Dictionary = {"E": 1, "R": 3, "Q": 5}

const DATA: Dictionary = {
	"sword": {
		"name": "Kiếm", "dmg": 18.0, "reach": 2.9, "half_arc": 70.0, "cd": 0.36,
		"combo": 2, "knock": 3.5, "heavy": "Chém nặng",
		"skills": {
			"E": {"name": "Xoáy kiếm", "cd": 6.0, "mult": 1.7, "radius": 3.8},
			"R": {"name": "Chém sóng", "cd": 8.0, "mult": 1.6, "radius": 14.0},
			"Q": {"name": "Kiếm vũ", "cd": 22.0, "mult": 0.5, "radius": 3.7},
		},
		"desc": "Nhanh, quét rộng, linh hoạt.",
	},
	"spear": {
		"name": "Giáo", "dmg": 24.0, "reach": 4.2, "half_arc": 20.0, "cd": 0.5,
		"combo": 2, "knock": 3.0, "heavy": "Đâm xuyên",
		"skills": {
			"E": {"name": "Lao giáo", "cd": 5.0, "mult": 2.0, "radius": 7.0},
			"R": {"name": "Ném giáo", "cd": 9.0, "mult": 2.8, "radius": 16.0},
			"Q": {"name": "Mưa giáo", "cd": 22.0, "mult": 0.85, "radius": 4.2},
		},
		"desc": "Tầm xa, đánh từ khoảng cách an toàn.",
	},
	"hammer": {
		"name": "Búa", "dmg": 42.0, "reach": 3.0, "half_arc": 55.0, "cd": 0.95,
		"combo": 1, "knock": 7.0, "heavy": "Nện trời",
		"skills": {
			"E": {"name": "Giáng búa", "cd": 8.0, "mult": 2.2, "radius": 4.8},
			"R": {"name": "Sóng chấn", "cd": 10.0, "mult": 1.8, "radius": 12.0},
			"Q": {"name": "Địa chấn", "cd": 24.0, "mult": 1.4, "radius": 6.0},
		},
		"desc": "Chậm nhưng rất mạnh, hất tung đối thủ.",
	},
}

static func wname(id: String) -> String:
	return String(DATA[id]["name"])

static func heavy_name(id: String) -> String:
	return String(DATA[id]["heavy"])

static func skill(id: String, slot: String) -> Dictionary:
	return DATA[id]["skills"][slot]

static func skill_name(id: String, slot: String) -> String:
	return String(skill(id, slot)["name"])

static func unlocked(slot: String, lvl: int) -> bool:
	return lvl >= int(UNLOCK[slot])

static func dmg(id: String, lvl: int) -> float:
	return float(DATA[id]["dmg"]) * (1.0 + 0.3 * float(lvl - 1))

static func reach(id: String) -> float:
	return float(DATA[id]["reach"])

static func half_arc(id: String) -> float:
	return float(DATA[id]["half_arc"])

static func knock(id: String) -> float:
	return float(DATA[id]["knock"])

static func attack_cd(id: String, lvl: int) -> float:
	return float(DATA[id]["cd"]) * (1.0 - 0.05 * float(lvl - 1))

static func combo_len(id: String, lvl: int) -> int:
	var c: int = int(DATA[id]["combo"])
	return c + 1 if lvl >= 2 else c

static func skill_cd(id: String, slot: String, lvl: int) -> float:
	return float(skill(id, slot)["cd"]) * (1.0 - 0.06 * float(lvl - 1))

static func skill_mult(id: String, slot: String) -> float:
	return float(skill(id, slot)["mult"])

static func skill_radius(id: String, slot: String, lvl: int) -> float:
	var r: float = float(skill(id, slot)["radius"])
	if slot == "E" and lvl >= 5:
		r *= 1.25
	return r

static func upgrade_cost(lvl: int) -> int:
	return 40 * lvl

# Điều bạn nhận được khi nâng vũ khí lên cấp `to_lvl`.
static func perk_text(id: String, to_lvl: int) -> String:
	match to_lvl:
		2: return "+30% sát thương, thêm một đòn liên hoàn"
		3: return "+30%% sát thương, MỞ chiêu R: %s" % skill_name(id, "R")
		4: return "+30% sát thương, đánh nhanh và hồi chiêu nhanh hơn"
		5: return "+30%% sát thương, MỞ chiêu Q: %s, chiêu E rộng hơn" % skill_name(id, "Q")
	return ""
