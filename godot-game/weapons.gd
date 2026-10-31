extends RefCounted
# Dữ liệu vũ khí, chiêu thức và công thức nâng cấp.

const IDS: Array[String] = ["sword", "spear", "hammer"]
const MAX_LEVEL: int = 5

const DATA: Dictionary = {
	"sword": {
		"name": "Kiếm", "dmg": 18.0, "reach": 2.9, "half_arc": 70.0, "cd": 0.36,
		"combo": 2, "skill": "Xoáy kiếm", "skill_cd": 6.0, "skill_mult": 1.7,
		"skill_radius": 3.8, "knock": 3.5,
		"desc": "Nhanh, quét rộng. Liên hoàn 2 đòn.",
	},
	"spear": {
		"name": "Giáo", "dmg": 24.0, "reach": 4.2, "half_arc": 20.0, "cd": 0.5,
		"combo": 2, "skill": "Lao giáo", "skill_cd": 5.0, "skill_mult": 2.0,
		"skill_radius": 7.0, "knock": 3.0,
		"desc": "Tầm xa, đâm thẳng. Chiêu lao xuyên qua đàn quái.",
	},
	"hammer": {
		"name": "Búa", "dmg": 42.0, "reach": 3.0, "half_arc": 55.0, "cd": 0.95,
		"combo": 1, "skill": "Giáng búa", "skill_cd": 8.0, "skill_mult": 2.2,
		"skill_radius": 4.8, "knock": 7.0,
		"desc": "Chậm, rất mạnh. Chiêu giáng búa choáng cả vùng.",
	},
}

static func wname(id: String) -> String:
	return String(DATA[id]["name"])

static func skill_name(id: String) -> String:
	return String(DATA[id]["skill"])

static func dmg(id: String, lvl: int) -> float:
	return float(DATA[id]["dmg"]) * (1.0 + 0.3 * (lvl - 1))

static func reach(id: String) -> float:
	return float(DATA[id]["reach"])

static func half_arc(id: String) -> float:
	return float(DATA[id]["half_arc"])

static func knock(id: String) -> float:
	return float(DATA[id]["knock"])

static func attack_cd(id: String, lvl: int) -> float:
	return float(DATA[id]["cd"]) * (1.0 - 0.05 * (lvl - 1))

static func combo_len(id: String, lvl: int) -> int:
	var c: int = int(DATA[id]["combo"])
	return c + 1 if lvl >= 3 else c

static func skill_cd(id: String, lvl: int) -> float:
	return float(DATA[id]["skill_cd"]) * (1.0 - 0.06 * (lvl - 1))

static func skill_mult(id: String) -> float:
	return float(DATA[id]["skill_mult"])

static func skill_radius(id: String, lvl: int) -> float:
	return float(DATA[id]["skill_radius"]) * (1.25 if lvl >= 5 else 1.0)

static func upgrade_cost(lvl: int) -> int:
	return 40 * lvl

# Mô tả điều bạn nhận được khi nâng lên cấp `to_lvl`.
static func perk_text(id: String, to_lvl: int) -> String:
	match to_lvl:
		2: return "+30% sát thương"
		3: return "+30% sát thương, thêm đòn liên hoàn mới"
		4: return "+30% sát thương, đánh nhanh hơn, chiêu hồi nhanh hơn"
		5: return "+30% sát thương, chiêu đặc biệt rộng hơn 25%"
	return ""
