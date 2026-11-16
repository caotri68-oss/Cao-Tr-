# Chấm mức lại – đợt 2B (nửa sau)

Phạm vi: 40 dòng cuối, sắp theo ma_y, trong số các dòng `cham-muc-lai.csv` còn ghi "chưa tra được nguồn riêng" (từ T-om3-mien-5345c3 đến Y-stjohn-tieuhoa-1b15e1).
Kết quả nằm ở `du-lieu/cham-muc-lai-2b.csv`. File này không sửa file có sẵn nào. Cột do_chac chỉ dùng ba giá trị cao / vua / thap.

## Tổng quan
- Đã tra web: 39/40 dòng. Riêng Y-b6-tim chỉ đối chiếu với nguồn RCT đã biết (HOPE-2, NORVIT), không tra web.
- Đổi mức: 20 dòng.
- Độ chắc: cao 3, vua 25, thap 12.

## Thay đổi mức
| ma_y | Cũ → Mới | Nguồn chính |
|---|---|---|
| T-vitC-ho-e1be16 | R2 → R1 | Cochrane CD000980 (2013) |
| T-vitC-mien-dbe98b | R2 → R1 | Cochrane CD000980 (2013) |
| Y-creatine-co-d72a68 (trí nhớ) | R2 → R1 | Xu, Front Nutr 2024; Prokopidis 2024 |
| Y-lycopene-tim-092c76 (huyết áp) | R2 → R1 | Cheng, Atherosclerosis 2017; các phân tích gộp 2022 và 2026 |
| Y-se-thai-63cd48 | R3 → R2 | Salas-Huetos, Adv Nutr 2018 |
| T-zn-tim-29dd62 (huyết áp) | R3 → R2 | Mousavi, Eur J Nutr 2020 |
| T-om3-ngu-049960, T-om3-ngu-20cad4 | R3 → R2 | Dai & Liu 2021; Shimizu 2024 |
| T-probiotic-tieuhoa-2a8a75 | R3 → R2 | Front Immunol 2023 (26 RCT); có phân tích gộp âm tính |
| T-probiotic-tieuhoa-5bb97a | R3 → R2 | Gut Microbes 2022 (BS50) |
| T-silic-da-4d1ef2 | R3 → R2 | Barel, Arch Dermatol Res 2005 |
| T-sucralose-gan-492c72 | R3 → R2 | Suez, Cell 2022 (chỉ phần vi khuẩn ruột và dung nạp glucose; chưa có bằng chứng về gan) |
| T-zn-ngu-201a75, T-zn-ngu-452748 | R3 → R2 | Health Sci Rep 2024 (8 RCT, chưa gộp) |
| Y-gsh-x-dff20b | R3 → R2 | Richie, Eur J Nutr 2015 |
| T-vitE-ngu-7e9677 | R0 → R2 | 1 RCT, 160 phụ nữ sau mãn kinh (2023) |
| Y-echinacea-x-81fc5b | R0 → R2 | Cochrane CD000530 (2014) |
| Y-stjohn-tieuhoa-1b15e1 (IBS) | R3 → R− | Saito, Am J Gastroenterol 2010 |
| T-zn-nao-f6f910 | R3 → R− | Warthon-Medina, Eur J Clin Nutr 2015 |

## Ghi chú an toàn
- Y-b6-tim: giữ R−, độ chắc cao. B6/folat/B12 không giảm biến cố tim mạch.
- T-vitD-gout: không có RCT. Không nên trình bày là biện pháp điều trị gout.
- T-zn-than: chỉ có dữ liệu quan sát, kết quả hai chiều.
- T-om3-tieuhoa: theo Cochrane, omega-3 có lẽ không hiệu quả để duy trì lui bệnh viêm ruột và có thể gây tiêu chảy.
- Y-curc-x: NCCIH cảnh báo curcumin dạng sinh khả dụng cao có thể gây hại gan.
- Y-ashwagandha-duong: thận trọng khi dùng cùng thuốc hạ đường huyết.
- T-tudca: cần bác sĩ chỉ định.
- Y-fe-mau: với bệnh thận mạn, theo hướng dẫn KDIGO 2026.

## Còn tồn
- Y-stjohn-tamtrang-c4937a: chưa tra được kết quả cho phần ADHD.
- Y-probiotic-x-9177f6: câu gộp nên không chấm được một mức chung.
