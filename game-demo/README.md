# Đảo hình que – demo cây rung & nước

Bản thử nghiệm hiệu ứng 3D chạy ngay trên trình duyệt (Three.js), chưa dùng Unity/Godot.

**Xem demo:** mở file `stick-island.html` bằng Chrome/Edge/Safari (nhấp đúp là chạy, không cần cài gì).
Trên điện thoại: chép file sang máy rồi mở bằng trình duyệt.

Có gì trong demo:
- Cây thông, cây tròn và ~2600 ngọn cỏ rung theo gió (vertex shader, bóng đổ cũng rung theo).
- Nước: sóng, độ sâu đổi màu, bọt và sóng vỗ vào bờ, phản chiếu trời, điểm sáng mặt trời.
- Người que thở, vẫy tay, khăn đỏ bay theo gió; lá bay trong gió.
- Thanh trượt **Gió** và **Hoàng hôn**; kéo chuột/ngón tay để xoay, cuộn/chụm để zoom.

## Sửa code và build lại
```
cd game-demo
npm install
npm run build     # tạo lại stick-island.html từ src/main.js
```
Mã nguồn chính: `src/main.js`. Shader nước và hàm sway (rung) nằm trong file này, có thể chuyển
gần như nguyên xi sang Godot (shader language) hoặc Unity (HLSL/Shader Graph) sau này.
