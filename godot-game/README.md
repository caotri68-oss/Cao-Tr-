# Đảo Hình Que – bản Godot 4

Người que 3D giữ đảo trước thủy triều quái vật, tìm lại Tâm Biển, hạ Hải Vương.
Mặc định chạy ở **đồ họa THẤP** (renderer Compatibility) để chạy được trên máy yếu.

## Mở project
1. Mở Godot 4 → **Import** → chọn `godot-game/project.godot` → **Import & Edit**.
2. Bấm ▶ hoặc **F5**.

## Điều khiển
| Phím | Việc |
|---|---|
| WASD / Mũi tên | Di chuyển |
| Space hoặc J | Đánh nhẹ, bấm liên tục để ra đòn liên hoàn |
| K | Đòn nặng: hất tung, làm quái choáng |
| E / R / Q | Chiêu đặc biệt (R mở ở Lv3, Q mở ở Lv5) |
| Giữ F | Đỡ đòn. Đỡ ĐÚNG LÚC quái ra đòn = phản đòn hoàn hảo |
| Shift hoặc L | Lăn né (bất tử trong lúc lăn) |
| 1 / 2 / 3 hoặc Tab | Kiếm / Giáo / Búa |
| Enter | Tiếp tục hội thoại / bắt đầu đợt tiếp |
| F2 | Đồ họa THẤP ↔ VỪA |
| F3 | Tắt/bật rung màn hình |

## Vũ khí và chiêu (mỗi vũ khí 3 chiêu + đòn nặng)
- **Kiếm**: Xoáy kiếm (E), Chém sóng (R, bay xa xuyên quái), Kiếm vũ (Q, chém liên tục quanh người).
- **Giáo**: Lao giáo (E), Ném giáo (R), Mưa giáo (Q, mưa giáo xuống vùng đích).
- **Búa**: Giáng búa (E), Sóng chấn (R, sóng đất bay thẳng), Địa chấn (Q, ba cú nện liên tiếp).
- Nâng cấp: Lv2 thêm đòn liên hoàn, Lv3 mở R, Lv4 đánh/hồi chiêu nhanh hơn, Lv5 mở Q.
- Thụ động mua ở cửa hàng: tốc độ chạy, hút máu khi hạ quái.

## Quái
- **Cua đá**, **Ngư nhân**, **Sứa điện** (bắn cầu điện từ xa, đỡ hoặc lăn né), **Hải quái Kraken** (trùm, đợt 5).
- **Hải Vương** (trùm cuối đợt 10): khi còn nửa máu sẽ triệu hồi thêm quái.
- Quái nháy đỏ trước khi ra đòn: lúc đó hãy lăn né hoặc đỡ đòn.
- Sau đợt 10 có thể chơi tiếp thủy triều vô tận.

## Cốt truyện
Sửa chữ trong `story.gd`: mở đầu, lời thoại trước mỗi đợt, phần thưởng sau trùm, kết thúc.

## Cấu trúc code
- `main.gd`: trời, đảo, biển, rừng, camera, các đợt, cốt truyện, cửa hàng, mức đồ họa.
- `player.gd`: người que, vũ khí, đòn, chiêu, đỡ đòn, lăn, hoạt họa viết bằng code.
- `monster.gd`: 4 loại quái và AI. `projectile.gd`: đạn (sóng kiếm, giáo ném, cầu điện).
- `weapons.gd`: số liệu vũ khí, chiêu và nâng cấp (sửa số ở đây để cân bằng game).
- `story.gd`: cốt truyện. `hud.gd`: giao diện. `fx.gd`: hiệu ứng. `terrain.gd`: công thức địa hình.
- Shader: `water.gdshader`, `foliage.gdshader`, `sky.gdshader`.

## Kiểm tra tự động (không cần bấm)
Từ thư mục này: `godot --headless --fixed-fps 60 --quit-after 40000 -- --demo --god`
cho AI tự chơi qua các đợt. Thêm `--startwave=N` để bắt đầu từ đợt N.
Cờ xem thử hình: `-- --showcase [--story] [--shop] --cam=x,y,z,lx,ly,lz`.
