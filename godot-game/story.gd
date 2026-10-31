extends RefCounted
# Cốt truyện: mở đầu, lời thoại trước mỗi đợt, phần thưởng sau trùm, kết thúc.
# Mỗi trang là [người nói, nội dung]. Sửa chữ ở đây để đổi truyện.

const NARR: String = "Người kể chuyện"
const OLD: String = "Ông Tám Hải Đăng"
const HERO: String = "Que"
const KING: String = "Hải Vương"

const INTRO: Array = [
	[NARR, "Đảo Que, đêm đầu tiên của mùa thủy triều đỏ. Biển rút xa bờ... rồi dâng lên cùng những bóng đen."],
	[OLD, "Que! Dậy đi con. Tâm Biển, viên ngọc giữ yên đại dương, đã bị Hải Vương cướp khỏi ngọn hải đăng."],
	[OLD, "Mất nó, thủy triều sẽ đưa quái lên bờ mỗi đêm. Cầm lấy kiếm, giáo và búa của làng. Giữ bờ cho tới khi Hải Vương lộ mặt."],
	[HERO, "Cháu sẽ giữ đảo này. Đến cùng."],
]

const WAVES: Dictionary = {
	1: {"title": "Thủy triều đầu tiên", "pages": [
		[OLD, "Lũ cua đá! Yếu thôi, nhưng đông. Dùng đòn nặng (K) để hất chúng, lăn né (Shift) khi chúng nháy đỏ."],
	]},
	2: {"title": "Tiếng gọi từ vực sâu", "pages": [
		[OLD, "Ngư nhân... chúng nghe lệnh Hải Vương. Đỡ đòn (giữ F) đúng lúc chúng vồ xuống sẽ làm chúng choáng."],
	]},
	3: {"title": "Máu và muối", "pages": [
		[OLD, "Con khá lắm. Nâng vũ khí lên Lv3 để mở chiêu R, một thế võ hoàn toàn mới."],
	]},
	4: {"title": "Sứa điện", "pages": [
		[OLD, "Sứa biển! Chúng bắn cầu điện từ xa. Lăn né, hoặc đỡ đòn đúng khoảnh khắc để chặn lại."],
	]},
	5: {"title": "Kẻ Gác Vực", "pages": [
		[OLD, "Hải quái Kraken, kẻ canh cổng vực sâu. Hạ được nó, con sẽ lấy được mảnh Tâm Biển đầu tiên."],
		[HERO, "Cháu sẵn sàng."],
	]},
	6: {"title": "Biển đỏ như máu", "pages": [
		[OLD, "Tâm Biển vỡ làm nhiều mảnh, mỗi mảnh làm quái mạnh lên. Mảnh đầu đã về tay con, hãy giữ nó."],
	]},
	7: {"title": "Sương mù dày đặc", "pages": [
		[NARR, "Sương phủ kín đảo. Trong tiếng sóng có tiếng gì đó đang ra lệnh, và lũ quái hành động như một đội quân."],
	]},
	8: {"title": "Trăng đỏ", "pages": [
		[OLD, "Chúng không còn tấn công bừa nữa. Hải Vương đang thử sức con. Đừng để đồng bọn bao vây."],
	]},
	9: {"title": "Trước cơn bão", "pages": [
		[OLD, "Biển lặng bất thường... Con thấy không? Hắn đang tới. Hãy nâng hết vũ khí và chiêu cuối đi."],
	]},
	10: {"title": "Hải Vương", "pages": [
		[KING, "Một que gỗ nhỏ bé dám giữ bờ của ta? Ta sẽ nhổ ngọn hải đăng của ngươi lên cùng cả hòn đảo!"],
		[HERO, "Hãy thử xem."],
	]},
}

const CLEAR: Dictionary = {
	5: [
		[NARR, "Kraken tan vào biển, để lại một mảnh Tâm Biển sáng rực. Que cảm thấy sức mạnh tràn khắp cơ thể."],
		[OLD, "Mảnh Tâm Biển chọn con. Máu con đã đầy, sát thương con cũng mạnh hơn. Còn nhiều mảnh nữa phải lấy lại."],
	],
	10: [
		[KING, "Không thể... Tâm Biển... sao lại nghe lời một que gỗ..."],
		[NARR, "Hải Vương vỡ tan thành bọt sóng. Tâm Biển bay về ngọn hải đăng, tỏa sáng cả đại dương."],
	],
}

const ENDING: Array = [
	[OLD, "Con đã làm được rồi, Que. Biển lặng, thủy triều trở lại nhịp cũ."],
	[HERO, "Cháu chỉ làm điều phải làm thôi."],
	[NARR, "Nhưng ở nơi xa nhất của chân trời, một con sóng khác đang dâng lên, lớn hơn bất cứ con sóng nào trước đó..."],
]

static func title(w: int) -> String:
	if WAVES.has(w):
		return String(WAVES[w]["title"])
	return "Thủy triều vô tận"

static func wave_pages(w: int) -> Array:
	if WAVES.has(w):
		return WAVES[w]["pages"]
	return []

static func clear_pages(w: int) -> Array:
	if CLEAR.has(w):
		return CLEAR[w]
	return []
