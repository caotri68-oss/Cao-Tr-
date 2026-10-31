# Đảo Hình Que – bản Godot 4

Người que 3D chiến đấu với quái biển bò lên đảo. Hoàng hôn, biển, rừng, 3 vũ khí, nâng cấp.

## Mở project
1. Mở Godot 4 → **Import** → chọn `godot-game/project.godot` → **Import & Edit**.
2. Bấm ▶ hoặc **F5**.

## Điều khiển
| Phím | Việc |
|---|---|
| WASD / Mũi tên | Di chuyển |
| Space hoặc J | Đánh (bấm liên tục để ra đòn liên hoàn) |
| E hoặc K | Chiêu đặc biệt của vũ khí đang cầm |
| Shift hoặc L | Lăn né (bất tử trong lúc lăn) |
| 1 / 2 / 3 hoặc Q | Kiếm / Giáo / Búa |
| Enter | Bắt đầu đợt tiếp theo (khi đang ở cửa hàng) |
| F2 | Đồ họa thấp/cao (nếu máy giật lag) |

## Vũ khí và chiêu
- **Kiếm**: nhanh, quét rộng. Chiêu *Xoáy kiếm* chém vòng quanh người.
- **Giáo**: tầm xa. Chiêu *Lao giáo* lao xuyên qua đàn quái.
- **Búa**: chậm, rất mạnh. Chiêu *Giáng búa* nện đất, đẩy lùi cả vùng.
- Mỗi vũ khí nâng tới Lv 5: +30% sát thương mỗi cấp, Lv3 thêm đòn liên hoàn, Lv4 đánh/hồi chiêu nhanh hơn, Lv5 chiêu rộng hơn.

## Quái
- **Cua đá** (nhanh, yếu), **Ngư nhân** (trung bình), **Hải quái** (trùm, xuất hiện mỗi 5 đợt).
- Quái trồi lên từ biển, bơi vào bờ, bò lên cạn rồi đánh. Quái nháy đỏ trước khi ra đòn: lúc đó hãy lăn né.

## Cấu trúc code
- `main.gd`: trời, đảo, biển, rừng, camera, các đợt quái, cửa hàng.
- `player.gd`: người que, vũ khí, đòn liên hoàn, chiêu, lăn né, hoạt họa viết bằng code.
- `monster.gd`: 3 loại quái và AI (trồi lên → bơi → bò lên bờ → đánh).
- `weapons.gd`: số liệu vũ khí và công thức nâng cấp (sửa số ở đây để cân bằng game).
- `hud.gd`: giao diện. `fx.gd`: hiệu ứng nhỏ. `terrain.gd`: công thức địa hình.
- Shader: `water.gdshader` (nước), `foliage.gdshader` (cây/cỏ lắc theo gió), `sky.gdshader` (trời + mây).

## Kiểm tra tự động (không cần bấm)
Chạy từ thư mục này: `godot --headless --fixed-fps 60 --quit-after 6000 -- --demo`
sẽ cho AI tự chơi và in trạng thái mỗi 5 giây.
