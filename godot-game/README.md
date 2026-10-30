# Đảo Hình Que – bản Godot

## Mở project
1. Mở Godot 4 → bấm **Import**.
2. Chọn file `godot-game/project.godot` → bấm **Import & Edit**.
3. Bấm nút ▶ (hoặc phím **F5**) để chạy.

## Điều khiển
- Phím mũi tên: di chuyển người que (không đi xuống nước).

## Cấu trúc
- `project.godot`: cấu hình project.
- `main.tscn`: scene chính (chỉ là một node gắn script).
- `main.gd`: địa hình đảo, cây rung, người que, camera bám theo.
- `water.gdshader`: shader nước (sóng, bọt bờ, phản chiếu). Công thức địa hình trùng với `main.gd`.
