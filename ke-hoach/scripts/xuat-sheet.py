#!/usr/bin/env python3
"""Xuất Bảng Ý TPCN ra xlsx để tải lên Google Drive/Sheets.

Chạy:  python3 ke-hoach/scripts/xuat-sheet.py [thư_mục_dữ_liệu] [file_xlsx_ra]
Chỉ đọc CSV, không sửa CSV. Cần openpyxl.
"""
import csv
import os
import sys

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "..", "du-lieu")
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(DATA, "bang-y-tpcn-v2.xlsx")

# Thứ tự áp mức chấm: file sau ghi đè file trước theo ma_y.
CHAM = ["cham-muc", "cham-muc-tai-lieu", "cham-muc-lai", "cham-muc-lai-2a", "cham-muc-lai-2b"]

MINUS = {"−", "–", "—", "‐", "‑"}  # các dấu trừ/gạch Unicode


def doc(name):
    p = os.path.join(DATA, name + ".csv")
    if not os.path.exists(p):
        return None
    with open(p, encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
    # Mọi "R−" (dấu trừ Unicode) trong dữ liệu đổi thành "R-" (gạch ASCII).
    for r in rows:
        for k, v in r.items():
            if v and "R\u2212" in v:
                r[k] = v.replace("R\u2212", "R-")
    return rows


def chuan_muc(v):
    """Chuẩn hoá mức: 'R−', '−', 'R-' -> 'R-' (gạch ASCII). Mức khác giữ nguyên."""
    v = (v or "").strip()
    for m in MINUS:
        v = v.replace(m, "-")
    if v == "-":
        v = "R-"
    return v


def ap_cham(y):
    cham = {}
    dung = []
    for n in CHAM:
        rows = doc(n)
        if rows is None:
            continue
        dung.append((n, len(rows)))
        for r in rows:
            if r.get("ma_y") and (r.get("muc_ncuu") or "").strip():
                cham[r["ma_y"]] = r
    for r in y:
        r["muc_ncuu"] = chuan_muc(r.get("muc_ncuu"))
        c = cham.get(r["ma_y"])
        r["do_chac"] = ""
        r["ly_do_cham"] = ""
        if c:
            r["muc_ncuu"] = chuan_muc(c["muc_ncuu"])
            r["do_chac"] = c.get("do_chac", "")
            r["ly_do_cham"] = c.get("ly_do", "")
    return dung


HEAD_FILL = PatternFill("solid", fgColor="D9D9D9")
NEN = {"da_duyet": "E2F0D9", "cho_duyet": "FFF2CC", "bo": "EDEDED"}
DAI = {"noi_dung", "trich_dan", "ly_do_cham", "ghi_chu", "giai_thich", "co_che", "khuyen_nghi",
       "can_kham_truoc", "ghi_chu_an_toan", "ten_khac", "ma_y_lien_quan", "lieu", "link_goc",
       "ten", "dua_vao", "nguon_1", "nguon_2", "y_nghia", "gia_tri"}


def them_tab(wb, ten, cols, rows, nen_theo=None):
    ws = wb.create_sheet(ten)
    ws.append(cols)
    for c in ws[1]:
        c.font = Font(bold=True)
        c.fill = HEAD_FILL
        c.alignment = Alignment(vertical="center", wrap_text=True)
    for r in rows:
        ws.append([r.get(c, "") for c in cols])
    # Mọi ô là văn bản để Sheet không tự hiểu "R-", "-", "0", ngày... sai.
    for row in ws.iter_rows(min_row=1):
        for c in row:
            c.number_format = "@"
            if c.row > 1:
                c.alignment = Alignment(vertical="top", wrap_text=(cols[c.column - 1] in DAI))
    for i, col in enumerate(cols, 1):
        if col in DAI:
            w = 60 if col in ("noi_dung", "trich_dan", "ly_do_cham", "co_che", "khuyen_nghi",
                              "giai_thich", "can_kham_truoc", "ghi_chu_an_toan", "ten_khac") else 32
        else:
            w = min(max([len(str(col))] + [len(str(r.get(col, ""))) for r in rows[:200]]) + 3, 24)
            w = max(w, 8)
        ws.column_dimensions[get_column_letter(i)].width = w
    ws.freeze_panes = "A2"
    if rows:
        ws.auto_filter.ref = ws.dimensions
    if nen_theo:
        k = cols.index(nen_theo)
        for row in ws.iter_rows(min_row=2):
            m = NEN.get(row[k].value)
            if m:
                for c in row:
                    c.fill = PatternFill("solid", fgColor=m)
    return ws


def huong_dan(wb):
    ws = wb.create_sheet("HuongDan")
    L = [
        ("PHẦN", "NỘI DUNG", "Ý NGHĨA"),
        ("Tab", "Y", "Bảng Ý chính: mỗi dòng một nguồn nói một điều về một chất cho một mục tiêu. App chỉ dùng dòng trang_thai = da_duyet."),
        ("Tab", "Tang", "Tầng tin cậy tính sẵn cho từng cặp (chất, mục tiêu). che_do = da_duyet (chỉ Ý đã duyệt, app dùng) hoặc xem_truoc (cả Ý chờ duyệt, chỉ để xem)."),
        ("Tab", "TuongTac", "Tương tác giữa nhóm thuốc và chất."),
        ("Tab", "Nguon / Chat / MucTieu", "Danh mục nguồn, từ điển chất, bệnh và mục tiêu. Các mã ở tab Y lấy từ đây."),
        ("Cột Y", "ma_y", "Mã duy nhất, không đổi."),
        ("Cột Y", "chat, muc_tieu, nguon", "Mã lấy từ tab Chat, MucTieu, Nguon."),
        ("Cột Y", "huong", "loi = có lợi; khong = không tác dụng; hai = có hại hoặc cần tránh."),
        ("Cột Y", "muc_ncuu", "Mức bằng chứng nghiên cứu (xem mã mức bên dưới). Ghi dạng văn bản."),
        ("Cột Y", "do_chac", "Độ chắc của việc chấm mức: cao, vua (vừa), thap (thấp)."),
        ("Cột Y", "ly_do_cham", "Lý do chấm mức."),
        ("Cột Y", "trang_thai", "cho_duyet = chờ duyệt (nền vàng); da_duyet = đã duyệt (nền xanh); bo = bỏ (nền xám). Sửa cột này để duyệt."),
        ("Cột Tang", "tang", "Mã tầng, xem bên dưới."),
        ("Cột Tang", "canh_bao", "Số dòng có huong = hai (cảnh báo đỏ)."),
        ("Cột Tang", "so_dong, so_nguon_doc_lap", "Số Ý và số nguồn độc lập của cặp."),
        ("Cột Tang", "muc_tot_nhat", "Mức bằng chứng tốt nhất trong cặp."),
        ("Cột Tang", "ma_y_lien_quan", "Các Ý làm nên tầng này."),
        ("Mã tầng", "a", "Mức bằng chứng tốt nhất là R1 (nghiên cứu mạnh), từ nguồn chính thức hoặc chuyên gia."),
        ("Mã tầng", "b", "Mức R2 (khá). Nếu chưa có chuyên gia nào đồng ý thì ghi 'chưa có chuyên gia xác nhận'."),
        ("Mã tầng", "c", "Mức R3 (yếu), hoặc R0 nhưng có từ 2 nguồn độc lập nói có lợi."),
        ("Mã tầng", "d", "Chỉ có một nguồn độc lập, chưa có nghiên cứu được chấm."),
        ("Mã tầng", "k", "Chưa có nguồn nào nói có lợi; các nguồn hiện có nói không có tác dụng."),
        ("Mã tầng", "x", "Mâu thuẫn: nguồn chính thức kết luận R- (không tác dụng) nhưng nguồn khác nói có lợi; hiện cả hai bên."),
        ("Mã tầng", "ghi chú", "Trong file dữ liệu mã tầng viết hoa (A, B, C, D, K, X); ở đây giải thích bằng chữ thường. Cột canh_bao > 0 nghĩa là có Ý huong = hai (cảnh báo đỏ), bất kể tầng."),
        ("Mã mức", "r1", "Bằng chứng mạnh: thử nghiệm lớn, phân tích gộp, hoặc khuyến cáo chính thức."),
        ("Mã mức", "r2", "Bằng chứng khá nhưng chưa nhất quán."),
        ("Mã mức", "r3", "Bằng chứng yếu: thử nghiệm nhỏ, chưa lặp lại."),
        ("Mã mức", "r0", "Chưa có bằng chứng nghiên cứu (chỉ truyền miệng, lý thuyết)."),
        ("Mã mức", "r-", "Bằng chứng cho thấy không có tác dụng hoặc có hại. Ghi bằng gạch ngang ASCII trong ô văn bản, không dùng dấu trừ Unicode."),
        ("Lưu ý", "Dấu trừ", "Không gõ R- vào ô khác định dạng Tự động; giữ ô định dạng Văn bản để Sheet không hiểu thành số hay công thức."),
    ]
    for r in L:
        ws.append(list(r))
    for c in ws[1]:
        c.font = Font(bold=True)
        c.fill = HEAD_FILL
    for row in ws.iter_rows():
        for c in row:
            c.number_format = "@"
            c.alignment = Alignment(vertical="top", wrap_text=True)
    ws.column_dimensions["A"].width = 12
    ws.column_dimensions["B"].width = 28
    ws.column_dimensions["C"].width = 100
    ws.freeze_panes = "A2"
    return ws


def main():
    y = doc("bang-y")
    ycols = list(y[0].keys()) + ["do_chac", "ly_do_cham"]
    dung = ap_cham(y)
    tang_all = doc("tang")
    tcols = list(tang_all[0].keys())
    wb = Workbook()
    wb.remove(wb.active)
    them_tab(wb, "Y", ycols, y, nen_theo="trang_thai")
    them_tab(wb, "Tang", tcols, tang_all)
    tt = doc("tuong-tac")
    them_tab(wb, "TuongTac", list(tt[0].keys()), tt)
    for ten, f in (("Nguon", "nguon"), ("Chat", "chat"), ("MucTieu", "muc-tieu")):
        d = doc(f)
        them_tab(wb, ten, list(d[0].keys()), d)
    huong_dan(wb)
    wb.save(OUT)
    print("Đã ghi", os.path.abspath(OUT))
    print("File chấm đã áp:", ", ".join("%s (%d)" % x for x in dung))


if __name__ == "__main__":
    main()
