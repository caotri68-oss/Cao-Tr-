extends CanvasLayer
# Giao diện: máu, vàng, đợt quái, vũ khí + 4 kỹ năng, hộp hội thoại cốt truyện,
# cửa hàng nâng cấp, màn bắt đầu / thua / thắng. Dựng hoàn toàn bằng code.

const Weapons = preload("res://weapons.gd")
const Story = preload("res://story.gd")

signal start_wave
signal upgrade_weapon(id: String)
signal buy_heal
signal buy_max_hp
signal buy_passive(id: String)
signal restart
signal continue_endless

var root: Control
var hp_bar: ProgressBar
var hp_label: Label
var gold_label: Label
var wave_label: Label
var left_label: Label
var cards: Dictionary = {}
var skill_boxes: Dictionary = {}
var menu: PanelContainer
var menu_box: VBoxContainer
var damage_rect: ColorRect
var toast: Label

var story_box: PanelContainer
var story_speaker: Label
var story_text: Label
var story_hint: Label
var story_pages: Array = []
var story_idx: int = 0
var story_cb: Callable = Callable()
var story_tw: Tween

func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS
	layer = 10
	root = Control.new()
	root.set_anchors_preset(Control.PRESET_FULL_RECT)
	root.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(root)
	_build_vignette()
	_build_top_left()
	_build_top_center()
	_build_bottom()
	_build_story()
	_build_menu()
	_build_toast()

# ------------------------------------------------------------------ kiểu dáng

func _style(bg: Color, border: Color = Color(1, 1, 1, 0.12), radius: int = 10, pad: int = 12) -> StyleBoxFlat:
	var s := StyleBoxFlat.new()
	s.bg_color = bg
	s.border_color = border
	s.set_border_width_all(1)
	s.set_corner_radius_all(radius)
	s.content_margin_left = pad
	s.content_margin_right = pad
	s.content_margin_top = pad - 4
	s.content_margin_bottom = pad - 4
	return s

func _label(text: String, size: int = 18, color: Color = Color(0.95, 0.93, 0.88)) -> Label:
	var l := Label.new()
	l.text = text
	l.add_theme_font_size_override("font_size", size)
	l.add_theme_color_override("font_color", color)
	l.add_theme_color_override("font_outline_color", Color(0, 0, 0, 0.8))
	l.add_theme_constant_override("outline_size", 4)
	return l

func _bar(w: float, h: float, fill: Color) -> ProgressBar:
	var b := ProgressBar.new()
	b.custom_minimum_size = Vector2(w, h)
	b.show_percentage = false
	b.add_theme_stylebox_override("background", _style(Color(0, 0, 0, 0.55), Color(1, 1, 1, 0.15), 4, 2))
	b.add_theme_stylebox_override("fill", _style(fill, Color(0, 0, 0, 0), 4, 2))
	return b

func _build_vignette() -> void:
	var v := TextureRect.new()
	v.set_anchors_preset(Control.PRESET_FULL_RECT)
	v.mouse_filter = Control.MOUSE_FILTER_IGNORE
	v.stretch_mode = TextureRect.STRETCH_SCALE
	var g := Gradient.new()
	g.set_color(0, Color(0.02, 0.01, 0.03, 0.0))
	g.set_color(1, Color(0.02, 0.01, 0.03, 0.55))
	g.set_offset(0, 0.55)
	var gt := GradientTexture2D.new()
	gt.gradient = g
	gt.fill = GradientTexture2D.FILL_RADIAL
	gt.fill_from = Vector2(0.5, 0.5)
	gt.fill_to = Vector2(1.0, 0.5)
	gt.width = 128
	gt.height = 128
	v.texture = gt
	root.add_child(v)
	damage_rect = ColorRect.new()
	damage_rect.set_anchors_preset(Control.PRESET_FULL_RECT)
	damage_rect.mouse_filter = Control.MOUSE_FILTER_IGNORE
	damage_rect.color = Color(0.8, 0.0, 0.0, 0.0)
	root.add_child(damage_rect)

func _build_top_left() -> void:
	var p := PanelContainer.new()
	p.add_theme_stylebox_override("panel", _style(Color(0.05, 0.06, 0.08, 0.6)))
	p.position = Vector2(16, 16)
	root.add_child(p)
	var v := VBoxContainer.new()
	v.add_theme_constant_override("separation", 4)
	p.add_child(v)
	hp_label = _label("HP 100 / 100", 16)
	v.add_child(hp_label)
	hp_bar = _bar(260, 16, Color(0.78, 0.14, 0.14))
	hp_bar.max_value = 100
	hp_bar.value = 100
	v.add_child(hp_bar)
	gold_label = _label("Vàng: 0", 18, Color(1.0, 0.82, 0.3))
	v.add_child(gold_label)

func _build_top_center() -> void:
	var c := VBoxContainer.new()
	c.set_anchors_preset(Control.PRESET_CENTER_TOP)
	c.grow_horizontal = Control.GROW_DIRECTION_BOTH
	c.position = Vector2(0, 14)
	c.alignment = BoxContainer.ALIGNMENT_CENTER
	root.add_child(c)
	wave_label = _label("", 28, Color(1.0, 0.9, 0.7))
	wave_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	c.add_child(wave_label)
	left_label = _label("", 17, Color(0.85, 0.9, 0.95))
	left_label.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	c.add_child(left_label)

func _build_bottom() -> void:
	var c := VBoxContainer.new()
	c.set_anchors_preset(Control.PRESET_CENTER_BOTTOM)
	c.grow_horizontal = Control.GROW_DIRECTION_BOTH
	c.grow_vertical = Control.GROW_DIRECTION_BEGIN
	c.position = Vector2(0, -12)
	c.alignment = BoxContainer.ALIGNMENT_CENTER
	c.add_theme_constant_override("separation", 6)
	root.add_child(c)
	var row := HBoxContainer.new()
	row.alignment = BoxContainer.ALIGNMENT_CENTER
	row.add_theme_constant_override("separation", 8)
	c.add_child(row)
	var keys: Array[String] = ["1", "2", "3"]
	for i in Weapons.IDS.size():
		var id: String = Weapons.IDS[i]
		var card := PanelContainer.new()
		card.custom_minimum_size = Vector2(104, 0)
		var v := VBoxContainer.new()
		v.alignment = BoxContainer.ALIGNMENT_CENTER
		card.add_child(v)
		var n := _label("%s  %s" % [keys[i], Weapons.wname(id)], 17)
		n.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		v.add_child(n)
		var lv := _label("Lv 1", 14, Color(0.8, 0.85, 0.9))
		lv.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		v.add_child(lv)
		row.add_child(card)
		cards[id] = {"panel": card, "level": lv}
	var srow := HBoxContainer.new()
	srow.alignment = BoxContainer.ALIGNMENT_CENTER
	srow.add_theme_constant_override("separation", 8)
	c.add_child(srow)
	for slot in ["K", "E", "R", "Q"]:
		var panel := PanelContainer.new()
		panel.add_theme_stylebox_override("panel", _style(Color(0.05, 0.06, 0.08, 0.6), Color(1, 1, 1, 0.12), 8, 8))
		panel.custom_minimum_size = Vector2(140, 0)
		var v2 := VBoxContainer.new()
		v2.add_theme_constant_override("separation", 2)
		panel.add_child(v2)
		var lab := _label("%s" % slot, 14)
		v2.add_child(lab)
		var bar := _bar(124, 8, Color(0.25, 0.65, 0.95))
		bar.max_value = 1.0
		bar.value = 1.0
		v2.add_child(bar)
		srow.add_child(panel)
		skill_boxes[slot] = {"panel": panel, "label": lab, "bar": bar}
	var hint := _label("WASD đi · Space/J đánh · K đòn nặng · E/R/Q chiêu · F đỡ đòn · Shift lăn · 1-2-3/Tab đổi vũ khí · F2 đồ họa · F3 giảm rung", 12, Color(0.8, 0.82, 0.86, 0.85))
	hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	c.add_child(hint)

func _build_story() -> void:
	story_box = PanelContainer.new()
	story_box.add_theme_stylebox_override("panel", _style(Color(0.03, 0.04, 0.06, 0.9), Color(1, 0.85, 0.5, 0.45), 12, 18))
	story_box.anchor_left = 0.5
	story_box.anchor_right = 0.5
	story_box.anchor_top = 1.0
	story_box.anchor_bottom = 1.0
	story_box.offset_left = -400
	story_box.offset_right = 400
	story_box.offset_top = -300
	story_box.offset_bottom = -150
	story_box.visible = false
	root.add_child(story_box)
	var v := VBoxContainer.new()
	v.add_theme_constant_override("separation", 6)
	story_box.add_child(v)
	story_speaker = _label("", 20, Color(1.0, 0.85, 0.45))
	v.add_child(story_speaker)
	story_text = _label("", 19)
	story_text.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	story_text.custom_minimum_size = Vector2(760, 60)
	v.add_child(story_text)
	story_hint = _label("Enter / Space / bấm chuột để tiếp  ▸", 13, Color(0.75, 0.78, 0.82))
	story_hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_RIGHT
	v.add_child(story_hint)

func _build_menu() -> void:
	menu = PanelContainer.new()
	menu.add_theme_stylebox_override("panel", _style(Color(0.04, 0.05, 0.07, 0.9), Color(1, 0.85, 0.5, 0.35), 14, 20))
	menu.set_anchors_preset(Control.PRESET_CENTER)
	menu.grow_horizontal = Control.GROW_DIRECTION_BOTH
	menu.grow_vertical = Control.GROW_DIRECTION_BOTH
	menu.custom_minimum_size = Vector2(620, 0)
	root.add_child(menu)
	menu_box = VBoxContainer.new()
	menu_box.add_theme_constant_override("separation", 8)
	menu.add_child(menu_box)
	menu.visible = false

func _build_toast() -> void:
	toast = _label("", 26, Color(1.0, 0.95, 0.75))
	toast.set_anchors_preset(Control.PRESET_CENTER)
	toast.grow_horizontal = Control.GROW_DIRECTION_BOTH
	toast.position = Vector2(0, -170)
	toast.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	toast.modulate.a = 0.0
	root.add_child(toast)

# -------------------------------------------------------------------- cập nhật

func set_hp(hp: float, max_hp: float) -> void:
	hp_bar.max_value = max_hp
	hp_bar.value = hp
	hp_label.text = "HP %d / %d" % [int(ceil(hp)), int(max_hp)]

func set_gold(g: int) -> void:
	gold_label.text = "Vàng: %d" % g

func set_wave(w: int, remaining: int, title: String = "") -> void:
	if w <= 0:
		wave_label.text = ""
	else:
		wave_label.text = "Đợt %d  —  %s" % [w, title] if title != "" else "Đợt %d" % w
	left_label.text = "Quái còn lại: %d" % remaining if w > 0 and remaining > 0 else ""

func set_weapon(id: String, levels: Dictionary) -> void:
	for wid in cards:
		var lvl: int = int(levels[wid])
		var panel: PanelContainer = cards[wid]["panel"]
		(cards[wid]["level"] as Label).text = "Lv %d" % lvl
		var on: bool = wid == id
		panel.add_theme_stylebox_override("panel", _style(
			Color(0.55, 0.38, 0.1, 0.8) if on else Color(0.05, 0.06, 0.08, 0.6),
			Color(1, 0.85, 0.4, 0.9) if on else Color(1, 1, 1, 0.12)))
	var lv: int = int(levels[id])
	(skill_boxes["K"]["label"] as Label).text = "K  %s" % Weapons.heavy_name(id)
	for slot in Weapons.SLOTS:
		var ok: bool = Weapons.unlocked(slot, lv)
		var lab: Label = skill_boxes[slot]["label"]
		lab.text = "%s  %s" % [slot, Weapons.skill_name(id, slot)] if ok else "%s  (mở ở Lv%d)" % [slot, int(Weapons.UNLOCK[slot])]
		(skill_boxes[slot]["panel"] as PanelContainer).modulate = Color(1, 1, 1, 1.0 if ok else 0.45)

func set_skill_ratio(slot: String, ratio_ready: float) -> void:
	(skill_boxes[slot]["bar"] as ProgressBar).value = ratio_ready

func flash_damage() -> void:
	damage_rect.color.a = 0.3
	var tw := create_tween()
	tw.tween_property(damage_rect, "color:a", 0.0, 0.4)

func show_toast(text: String) -> void:
	toast.text = text
	toast.modulate.a = 1.0
	var tw := create_tween()
	tw.tween_interval(1.6)
	tw.tween_property(toast, "modulate:a", 0.0, 0.6)

# -------------------------------------------------------------------- cốt truyện

func show_story(pages: Array, on_done: Callable) -> void:
	if pages.is_empty():
		on_done.call()
		return
	story_pages = pages
	story_idx = 0
	story_cb = on_done
	menu.visible = false
	story_box.visible = true
	_show_page()

func _speaker_color(name: String) -> Color:
	match name:
		Story.HERO: return Color(1.0, 0.85, 0.4)
		Story.OLD: return Color(0.6, 0.9, 0.6)
		Story.KING: return Color(1.0, 0.4, 0.4)
	return Color(0.75, 0.8, 0.9)

func _show_page() -> void:
	var page: Array = story_pages[story_idx]
	story_speaker.text = String(page[0])
	story_speaker.add_theme_color_override("font_color", _speaker_color(String(page[0])))
	story_text.text = String(page[1])
	story_text.visible_ratio = 0.0
	if story_tw != null and story_tw.is_valid():
		story_tw.kill()
	story_tw = create_tween()
	story_tw.set_pause_mode(Tween.TWEEN_PAUSE_PROCESS)
	story_tw.tween_property(story_text, "visible_ratio", 1.0, maxf(0.4, float(story_text.text.length()) * 0.018))

func _advance_story() -> void:
	if story_text.visible_ratio < 1.0:
		if story_tw != null and story_tw.is_valid():
			story_tw.kill()
		story_text.visible_ratio = 1.0
		return
	story_idx += 1
	if story_idx >= story_pages.size():
		story_box.visible = false
		var cb: Callable = story_cb
		story_cb = Callable()
		if cb.is_valid():
			cb.call()
	else:
		_show_page()

func _input(event: InputEvent) -> void:
	if not story_box.visible:
		return
	var adv: bool = event.is_action_pressed("confirm") or event.is_action_pressed("attack")
	if event is InputEventMouseButton and event.pressed and event.button_index == MOUSE_BUTTON_LEFT:
		adv = true
	if adv:
		get_viewport().set_input_as_handled()
		_advance_story()

# ---------------------------------------------------------------------- menu

func _clear_menu() -> void:
	for c in menu_box.get_children():
		c.queue_free()

func _button(text: String, cb: Callable, enabled: bool = true) -> Button:
	var b := Button.new()
	b.text = text
	b.disabled = not enabled
	b.focus_mode = Control.FOCUS_NONE
	b.add_theme_font_size_override("font_size", 16)
	b.custom_minimum_size = Vector2(0, 40)
	b.add_theme_stylebox_override("normal", _style(Color(0.18, 0.2, 0.26, 0.95), Color(1, 1, 1, 0.2), 8, 12))
	b.add_theme_stylebox_override("hover", _style(Color(0.3, 0.3, 0.38, 1.0), Color(1, 0.85, 0.5, 0.8), 8, 12))
	b.add_theme_stylebox_override("pressed", _style(Color(0.45, 0.32, 0.12, 1.0), Color(1, 0.85, 0.5, 1.0), 8, 12))
	b.add_theme_stylebox_override("disabled", _style(Color(0.1, 0.1, 0.12, 0.8), Color(1, 1, 1, 0.08), 8, 12))
	b.pressed.connect(cb)
	return b

func hide_menu() -> void:
	menu.visible = false

func show_start() -> void:
	_clear_menu()
	var t := _label("ĐẢO HÌNH QUE", 38, Color(1.0, 0.88, 0.6))
	t.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(t)
	var d := _label("Giữ đảo trước thủy triều quái vật, tìm lại Tâm Biển, hạ Hải Vương.", 17)
	d.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	d.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(d)
	var c := _label("WASD / Mũi tên: di chuyển\nSpace hoặc J: đánh liên hoàn   ·   K: đòn nặng (hất, làm choáng)\nE / R / Q: chiêu đặc biệt (R mở ở Lv3, Q mở ở Lv5)\nGiữ F: đỡ đòn. Đỡ ĐÚNG LÚC quái ra đòn = phản đòn hoàn hảo\nShift hoặc L: lăn né (bất tử trong lúc lăn)\n1 / 2 / 3 hoặc Tab: đổi Kiếm / Giáo / Búa", 15, Color(0.85, 0.88, 0.92))
	menu_box.add_child(c)
	menu_box.add_child(_button("Bắt đầu  (Enter)", func(): start_wave.emit()))
	menu.visible = true

func show_shop(wave_done: int, gold: int, levels: Dictionary, hp: float, max_hp: float, passives: Dictionary) -> void:
	_clear_menu()
	var t := _label("Đợt %d đã sạch bóng quái!" % wave_done, 26, Color(1.0, 0.88, 0.6))
	t.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(t)
	var g := _label("Vàng: %d" % gold, 19, Color(1.0, 0.82, 0.3))
	g.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(g)
	for id in Weapons.IDS:
		var lvl: int = int(levels[id])
		var line: String
		var enabled: bool
		if lvl >= Weapons.MAX_LEVEL:
			line = "%s  Lv %d (TỐI ĐA)" % [Weapons.wname(id), lvl]
			enabled = false
		else:
			var cost: int = Weapons.upgrade_cost(lvl)
			line = "Nâng %s Lv %d → %d  (%d vàng)\n%s" % [Weapons.wname(id), lvl, lvl + 1, cost, Weapons.perk_text(id, lvl + 1)]
			enabled = gold >= cost
		var wid: String = id
		menu_box.add_child(_button(line, func(): upgrade_weapon.emit(wid), enabled))
	var grid := GridContainer.new()
	grid.columns = 2
	grid.add_theme_constant_override("h_separation", 8)
	grid.add_theme_constant_override("v_separation", 8)
	menu_box.add_child(grid)
	var sp: int = int(passives["speed"])
	var vp: int = int(passives["vamp"])
	var sp_cost: int = 50 * (sp + 1)
	var vp_cost: int = 60 * (vp + 1)
	var b1 := _button("Tốc độ chạy +8%%  Lv%d/5  (%d)" % [sp, sp_cost] if sp < 5 else "Tốc độ chạy TỐI ĐA", func(): buy_passive.emit("speed"), sp < 5 and gold >= sp_cost)
	var b2 := _button("Hút máu: +3 máu/quái  Lv%d/5  (%d)" % [vp, vp_cost] if vp < 5 else "Hút máu TỐI ĐA", func(): buy_passive.emit("vamp"), vp < 5 and gold >= vp_cost)
	var b3 := _button("Hồi 50 máu  (30)", func(): buy_heal.emit(), gold >= 30 and hp < max_hp)
	var b4 := _button("+20 máu tối đa  (60)", func(): buy_max_hp.emit(), gold >= 60)
	for b in [b1, b2, b3, b4]:
		(b as Button).size_flags_horizontal = Control.SIZE_EXPAND_FILL
		grid.add_child(b)
	menu_box.add_child(_button("Bắt đầu đợt %d  (Enter)" % (wave_done + 1), func(): start_wave.emit()))
	menu.visible = true

func show_game_over(waves: int) -> void:
	_clear_menu()
	var t := _label("BẠN ĐÃ GỤC NGÃ", 38, Color(1.0, 0.45, 0.4))
	t.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(t)
	var d := _label("Sống sót qua %d đợt. Biển vẫn đang dâng..." % waves, 20)
	d.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(d)
	menu_box.add_child(_button("Chơi lại  (Enter)", func(): restart.emit()))
	menu.visible = true

func show_victory() -> void:
	_clear_menu()
	var t := _label("TÂM BIỂN ĐÃ TRỞ VỀ", 36, Color(0.6, 0.95, 1.0))
	t.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(t)
	var d := _label("Bạn đã đánh bại Hải Vương và giữ vững Đảo Que.\nNhưng thủy triều chưa bao giờ thật sự dừng lại...", 18)
	d.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(d)
	menu_box.add_child(_button("Tiếp tục thủy triều vô tận  (Enter)", func(): continue_endless.emit()))
	menu_box.add_child(_button("Chơi lại từ đầu", func(): restart.emit()))
	menu.visible = true
