extends CanvasLayer
# Giao diện: thanh máu, vàng, đợt quái, ô vũ khí + hồi chiêu, cửa hàng nâng cấp,
# màn bắt đầu, màn thua. Dựng hoàn toàn bằng code.

const Weapons = preload("res://weapons.gd")

signal start_wave
signal upgrade_weapon(id: String)
signal buy_heal
signal buy_max_hp
signal restart

var root: Control
var hp_bar: ProgressBar
var hp_label: Label
var gold_label: Label
var wave_label: Label
var left_label: Label
var skill_bar: ProgressBar
var skill_label: Label
var cards: Dictionary = {}
var menu: PanelContainer
var menu_box: VBoxContainer
var damage_rect: ColorRect
var toast: Label

func _ready() -> void:
	layer = 10
	root = Control.new()
	root.set_anchors_preset(Control.PRESET_FULL_RECT)
	root.mouse_filter = Control.MOUSE_FILTER_IGNORE
	add_child(root)
	_build_vignette()
	_build_top_left()
	_build_top_center()
	_build_bottom()
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
	var v := ColorRect.new()
	v.set_anchors_preset(Control.PRESET_FULL_RECT)
	v.mouse_filter = Control.MOUSE_FILTER_IGNORE
	var sh := Shader.new()
	sh.code = "shader_type canvas_item;\nvoid fragment() {\n\tvec2 uv = UV - 0.5;\n\tfloat v = smoothstep(0.30, 0.95, length(uv * vec2(1.15, 1.0)));\n\tCOLOR = vec4(0.02, 0.01, 0.03, v * 0.6);\n}"
	var m := ShaderMaterial.new()
	m.shader = sh
	v.material = m
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
	wave_label = _label("", 30, Color(1.0, 0.9, 0.7))
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
	c.position = Vector2(0, -16)
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
		card.custom_minimum_size = Vector2(112, 0)
		var v := VBoxContainer.new()
		v.alignment = BoxContainer.ALIGNMENT_CENTER
		card.add_child(v)
		var n := _label("%s  %s" % [keys[i], Weapons.wname(id)], 18)
		n.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		v.add_child(n)
		var lv := _label("Lv 1", 15, Color(0.8, 0.85, 0.9))
		lv.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
		v.add_child(lv)
		row.add_child(card)
		cards[id] = {"panel": card, "level": lv}
	var skill_row := HBoxContainer.new()
	skill_row.alignment = BoxContainer.ALIGNMENT_CENTER
	skill_row.add_theme_constant_override("separation", 10)
	c.add_child(skill_row)
	skill_label = _label("E  Xoáy kiếm", 16)
	skill_row.add_child(skill_label)
	skill_bar = _bar(190, 12, Color(0.25, 0.65, 0.95))
	skill_bar.max_value = 1.0
	skill_bar.value = 1.0
	skill_row.add_child(skill_bar)
	var hint := _label("WASD/Mũi tên: đi · Space/J: đánh · E/K: chiêu · Shift/L: lăn né · 1-2-3 / Q: đổi vũ khí · F2: đồ họa thấp/cao", 13, Color(0.8, 0.82, 0.86, 0.85))
	hint.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	c.add_child(hint)

func _build_menu() -> void:
	menu = PanelContainer.new()
	menu.add_theme_stylebox_override("panel", _style(Color(0.04, 0.05, 0.07, 0.88), Color(1, 0.85, 0.5, 0.35), 14, 22))
	menu.set_anchors_preset(Control.PRESET_CENTER)
	menu.grow_horizontal = Control.GROW_DIRECTION_BOTH
	menu.grow_vertical = Control.GROW_DIRECTION_BOTH
	menu.custom_minimum_size = Vector2(560, 0)
	root.add_child(menu)
	menu_box = VBoxContainer.new()
	menu_box.add_theme_constant_override("separation", 10)
	menu.add_child(menu_box)
	menu.visible = false

func _build_toast() -> void:
	toast = _label("", 24, Color(1.0, 0.95, 0.75))
	toast.set_anchors_preset(Control.PRESET_CENTER)
	toast.grow_horizontal = Control.GROW_DIRECTION_BOTH
	toast.position = Vector2(0, -120)
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

func set_wave(w: int, remaining: int) -> void:
	wave_label.text = "Đợt %d" % w if w > 0 else ""
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
	skill_label.text = "E  %s" % Weapons.skill_name(id)
	skill_bar.max_value = 1.0

func set_skill(ratio_ready: float) -> void:
	skill_bar.value = ratio_ready

func flash_damage() -> void:
	damage_rect.color.a = 0.35
	var tw := create_tween()
	tw.tween_property(damage_rect, "color:a", 0.0, 0.45)

func show_toast(text: String) -> void:
	toast.text = text
	toast.modulate.a = 1.0
	var tw := create_tween()
	tw.tween_interval(1.2)
	tw.tween_property(toast, "modulate:a", 0.0, 0.6)

# ---------------------------------------------------------------------- menu

func _clear_menu() -> void:
	for c in menu_box.get_children():
		c.queue_free()

func _button(text: String, cb: Callable, enabled: bool = true) -> Button:
	var b := Button.new()
	b.text = text
	b.disabled = not enabled
	b.focus_mode = Control.FOCUS_NONE
	b.add_theme_font_size_override("font_size", 17)
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
	var d := _label("Quái vật từ biển đang bò lên đảo. Hạ chúng để lấy vàng, nâng cấp vũ khí và học thêm chiêu.", 17)
	d.autowrap_mode = TextServer.AUTOWRAP_WORD_SMART
	d.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(d)
	var c := _label("WASD / Mũi tên: di chuyển\nSpace hoặc J: đánh (bấm liên tục để ra đòn liên hoàn)\nE hoặc K: chiêu đặc biệt của vũ khí\nShift hoặc L: lăn né (bất tử trong lúc lăn)\n1 / 2 / 3 hoặc Q: đổi Kiếm / Giáo / Búa", 16, Color(0.85, 0.88, 0.92))
	menu_box.add_child(c)
	menu_box.add_child(_button("Bắt đầu đợt 1  (Enter)", func(): start_wave.emit()))
	menu.visible = true

func show_shop(wave_done: int, gold: int, levels: Dictionary, hp: float, max_hp: float) -> void:
	_clear_menu()
	var t := _label("Đợt %d đã sạch bóng quái!" % wave_done, 28, Color(1.0, 0.88, 0.6))
	t.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(t)
	var g := _label("Vàng: %d" % gold, 20, Color(1.0, 0.82, 0.3))
	g.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(g)
	for id in Weapons.IDS:
		var lvl: int = int(levels[id])
		var line: String
		var enabled: bool
		if lvl >= Weapons.MAX_LEVEL:
			line = "%s  Lv %d (TỐI ĐA)  —  chiêu: %s" % [Weapons.wname(id), lvl, Weapons.skill_name(id)]
			enabled = false
		else:
			var cost: int = Weapons.upgrade_cost(lvl)
			line = "Nâng %s Lv %d → %d  (%d vàng)\n%s" % [Weapons.wname(id), lvl, lvl + 1, cost, Weapons.perk_text(id, lvl + 1)]
			enabled = gold >= cost
		var wid: String = id
		menu_box.add_child(_button(line, func(): upgrade_weapon.emit(wid), enabled))
	menu_box.add_child(_button("Hồi 50 máu  (30 vàng)", func(): buy_heal.emit(), gold >= 30 and hp < max_hp))
	menu_box.add_child(_button("+20 máu tối đa  (60 vàng)", func(): buy_max_hp.emit(), gold >= 60))
	menu_box.add_child(_button("Bắt đầu đợt %d  (Enter)" % (wave_done + 1), func(): start_wave.emit()))
	menu.visible = true

func show_game_over(waves: int) -> void:
	_clear_menu()
	var t := _label("BẠN ĐÃ GỤC NGÃ", 38, Color(1.0, 0.45, 0.4))
	t.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(t)
	var d := _label("Sống sót qua %d đợt." % waves, 22)
	d.horizontal_alignment = HORIZONTAL_ALIGNMENT_CENTER
	menu_box.add_child(d)
	menu_box.add_child(_button("Chơi lại  (Enter)", func(): restart.emit()))
	menu.visible = true
