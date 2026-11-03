// Kiến thức chung về từng hoạt chất, viết lại bằng lời của app.
// Nguồn: NIH Office of Dietary Supplements, EFSA, Examine.com (phần miễn phí) và phần kiến thức chung trong kho Obsidian của gia đình.
// Không chứa thông tin riêng của người dùng. Khoá trùng với khoá trong bảng NUTR của app.
// Mức bằng chứng: chac = đã chứng minh, cothe = có thể có lợi, chuaro = chưa rõ, khong = thử nghiệm không thấy tác dụng.
window.KB={
  vitD:{
    name:'Vitamin D',aka:'D3 (cholecalciferol), D2 (ergocalciferol)',updated:'2026-11-03',
    what:'Vitamin tan trong dầu, hoạt động gần giống một hormone. Giúp ruột hấp thu canxi và phốt pho, cần cho xương, cơ và hệ miễn dịch. Da tự tạo vitamin D dưới nắng, nhưng ở Séc (khoảng vĩ độ 50) từ tháng 10 đến tháng 3 da gần như không tạo được. Người làm việc trong nhà thiếu gần như quanh năm.',
    benefits:[
      ['chac','Phòng và chữa thiếu vitamin D (còi xương, nhuyễn xương).','NIH'],
      ['chac','Nâng nồng độ vitamin D trong máu (25(OH)D) một cách dự đoán được ở liều 1000–4000 IU/ngày.','Kho Obsidian'],
      ['cothe','Dùng cùng canxi có thể tăng mật độ xương ở phụ nữ mãn kinh và nam lớn tuổi. Chưa rõ có giảm té ngã và gãy xương hay không.','NIH'],
      ['khong','Các thử nghiệm lớn không thấy bổ sung vitamin D phòng được ung thư, bệnh tim mạch, tiểu đường type 2 hay trầm cảm, kể cả ở người có nồng độ thấp.','NIH']],
    need:'Theo NIH: 15 µg (600 IU) mỗi ngày cho người 19–70 tuổi, 20 µg (800 IU) trên 70 tuổi. Liều bổ sung thường dùng là 800–2000 IU (20–50 µg) mỗi ngày (Examine). Kho của bạn ghi liều duy trì 2000–2500 IU/ngày cho người ít ra nắng ở Séc.',
    how:[
      'Uống cùng bữa ăn có chất béo, tốt nhất là bữa chính, để hấp thu tốt hơn (Examine, kho Obsidian).',
      'Chọn D3 thay vì D2: D3 nâng nồng độ trong máu mạnh hơn và lâu hơn (NIH, Examine).',
      'Vitamin D dự trữ lâu trong cơ thể (15–25 ngày), nên tổng liều cả tuần mới quan trọng; quên một ngày không sao (kho Obsidian).',
      'Muốn biết có thiếu hay không thì xét nghiệm 25(OH)D trong máu.'],
    forms:'D3 (cholecalciferol) được ưu tiên. Có dạng viên, viên nang mềm và giọt. Dạng giọt dễ chỉnh liều nhỏ.',
    cautions:[
      'Ngộ độc vitamin D (tăng canxi máu, sỏi thận, loạn nhịp tim) gần như luôn do uống TPCN quá nhiều (NIH).',
      'Liều cực lớn cách quãng (ví dụ 500 000 IU một lần mỗi năm) cho kết quả xấu hơn giả dược ở người cao tuổi, tăng té ngã và gãy xương. Chia nhỏ luôn tốt hơn (kho Obsidian).',
      'Dùng kèm canxi liều cao làm tăng một số rủi ro (NIH).',
      'Thận trọng khi đã có tăng canxi máu, sarcoidosis, sỏi thận canxi tái phát, suy thận nặng (kho Obsidian).',
      'Dễ thiếu: người lớn tuổi, ít ra nắng, da sẫm màu, béo phì, bệnh kém hấp thu chất béo (NIH).'],
    interactions:[
      'Lợi tiểu thiazid: cộng thêm nguy cơ tăng canxi máu khi dùng vitamin D liều cao.',
      'Orlistat, cholestyramin, dầu khoáng nhuận tràng: giảm hấp thu vitamin D, nên uống cách nhau ít nhất 2 giờ.',
      'Corticoid dài ngày, thuốc chống co giật (phenytoin, phenobarbital), rifampicin: làm giảm vitamin D.',
      'Statin, digoxin: cần hỏi bác sĩ (NIH, kho Obsidian).'],
    foods:'Cá béo, dầu gan cá, gan bò, lòng đỏ trứng, phô mai, thực phẩm được bổ sung vitamin D (NIH).',
    sources:[['NIH ODS – Vitamin D','https://ods.od.nih.gov/factsheets/VitaminD-HealthProfessional/'],['Examine – Vitamin D','https://examine.com/supplements/vitamin-d/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  vitC:{
    name:'Vitamin C',aka:'Ascorbic acid, ascorbate',updated:'2026-11-03',
    what:'Vitamin tan trong nước, là chất chống oxy hoá. Cần để tạo collagen (da, mạch máu, sụn), giúp hấp thu sắt từ thực vật và tham gia hệ miễn dịch. Cơ thể không tự tạo được, phải lấy từ thức ăn.',
    benefits:[
      ['cothe','Cảm lạnh: uống đều mỗi ngày từ 200 mg trở lên giúp rút ngắn nhẹ thời gian bị cảm và giảm triệu chứng. Chỉ giảm số lần bị cảm ở người tập luyện nặng hoặc ở nơi rất lạnh. Đợi bị cảm rồi mới uống thì không thấy tác dụng.','NIH'],
      ['cothe','Người đã bị thoái hoá điểm vàng: hỗn hợp chống oxy hoá có vitamin C giảm nguy cơ chuyển sang giai đoạn nặng.','NIH'],
      ['khong','Phòng ung thư và bệnh tim mạch: phần lớn thử nghiệm không thấy tác dụng.','NIH'],
      ['khong','Phòng đục thuỷ tinh thể, thoái hoá điểm vàng ở người chưa mắc: chưa có bằng chứng.','NIH']],
    need:'Theo NIH: 75 mg/ngày cho nữ, 90 mg/ngày cho nam. Theo EU: 95 mg cho nữ, 110 mg cho nam (Examine dẫn lại). Người hút thuốc cần thêm 35 mg/ngày. Ăn đủ rau quả thường đã đạt mức này.',
    how:[
      'Liều càng cao thì phần được hấp thu càng thấp; trên 1 g mỗi ngày, cơ thể hấp thu chưa đến một nửa (NIH). Nếu dùng liều cao thì chia làm vài lần.',
      'Uống lúc nào cũng được. Nếu khó chịu dạ dày thì uống cùng bữa ăn.',
      'Dạng ascorbic acid trong viên được hấp thu tương đương vitamin C trong thức ăn (NIH). Không cần mua dạng đắt tiền.'],
    forms:'Thường là L-ascorbic acid. Dạng muối (canxi ascorbate, magie ascorbate) mang thêm khoáng chất, nhớ cộng phần canxi, magie đó vào tổng. Ascorbyl palmitate thường chỉ là chất bảo quản trong viên, lượng rất nhỏ.',
    cautions:[
      'Liều cao có thể gây tiêu chảy, buồn nôn, đau quặn bụng (NIH).',
      'Có lo ngại về sỏi thận và hấp thu sắt quá mức; người bị sỏi thận hoặc bệnh ứ sắt nên hỏi bác sĩ trước khi dùng liều cao (NIH).',
      'Mức tối đa theo NIH: 2000 mg/ngày, dựa trên tác dụng tiêu chảy. EFSA chưa đặt mức tối đa.',
      'Dễ thiếu: người hút thuốc hoặc hít khói thuốc, người ăn ít rau quả, người kém hấp thu (NIH).'],
    interactions:[
      'Hoá trị và xạ trị: có thể ảnh hưởng tới điều trị, phải hỏi bác sĩ điều trị ung thư (NIH).',
      'Statin dùng cùng niacin: vitamin C (cùng các chất chống oxy hoá khác) có thể làm giảm tác dụng tăng HDL (NIH).'],
    foods:'Cam, quýt, bưởi, ớt chuông, kiwi, bông cải xanh, dâu tây, cải Brussels. Vitamin C bị mất khi nấu lâu (NIH).',
    sources:[['NIH ODS – Vitamin C','https://ods.od.nih.gov/factsheets/VitaminC-HealthProfessional/'],['Examine – Vitamin C','https://examine.com/supplements/vitamin-c/']]},

  om3:{
    name:'Omega-3',aka:'EPA, DHA, ALA, dầu cá',updated:'2026-11-03',
    what:'Nhóm chất béo thiết yếu. EPA và DHA (chuỗi dài) có nhiều trong cá biển và dầu tảo; ALA có trong thực vật như hạt lanh, óc chó. Cơ thể chỉ chuyển được rất ít ALA thành EPA và DHA. DHA là thành phần của màng tế bào não và võng mạc.',
    benefits:[
      ['chac','Liều từ 2 g EPA+DHA mỗi ngày giúp giảm triglycerid máu (công bố được EFSA chấp thuận).','Kho Obsidian'],
      ['chac','DHA 250 mg/ngày góp phần duy trì chức năng não và thị lực bình thường (công bố của EU).','Kho Obsidian'],
      ['cothe','Viêm khớp dạng thấp: giúp người bệnh dùng ít thuốc kháng viêm hơn, nhưng không chắc giảm đau và sưng khớp.','NIH'],
      ['chuaro','Tim mạch ở người khoẻ dùng khoảng 1 g/ngày: các thử nghiệm lớn (VITAL, ASCEND) phần lớn không đạt mục tiêu chính. Thử nghiệm REDUCE-IT (4 g EPA tinh khiết) có lợi, nhưng làm trên người triglycerid cao đang dùng statin.','Kho Obsidian'],
      ['chuaro','Trầm cảm, trí nhớ, khô mắt: kết quả không thống nhất, tác dụng nếu có thì nhỏ.','NIH']],
    need:'Chưa có mức khuyến nghị chính thức của Mỹ cho EPA và DHA. EFSA đề xuất 250 mg EPA+DHA mỗi ngày cho người lớn, thêm 100–200 mg DHA khi mang thai và cho con bú (Examine dẫn lại). Mức an toàn theo EFSA: tới 5 g EPA+DHA mỗi ngày không đáng lo ở người lớn khoẻ.',
    how:[
      'Đọc dòng EPA và DHA trên nhãn, không đọc "dầu cá 1000 mg". Một viên dầu cá thường 1000 mg chỉ có khoảng 180 mg EPA và 120 mg DHA (NIH).',
      'Uống cùng bữa ăn có chất béo: hấp thu tốt hơn và bớt ợ mùi cá (Examine, kho Obsidian).',
      'Dạng triglycerid (TG, rTG) hấp thu tốt hơn dạng ethyl ester (EE) khi uống lúc đói; uống cùng bữa ăn bù được phần lớn chênh lệch (kho Obsidian).',
      'Dầu có mùi tanh nặng hoặc mùi ôi là dấu hiệu dầu đã bị oxy hoá.'],
    forms:'Dầu cá (TG, rTG, EE), dầu nhuyễn thể (krill), dầu gan cá, dầu tảo (cho người ăn chay). Dầu gan cá có thêm vitamin A và D, phải cộng vào tổng hai chất đó. Chứng nhận IFOS công bố kết quả kiểm nghiệm theo từng lô (kho Obsidian).',
    cautions:[
      'Thuỷ ngân gần như không có trong dầu cá TPCN, vì đã được loại khi tinh chế (NIH).',
      'Dioxin và PCB tan trong dầu, EU có giới hạn bắt buộc; dầu cô đặc thường sạch hơn (kho Obsidian).',
      'Trước phẫu thuật hoặc nhổ răng, hỏi bác sĩ có cần ngừng hay không (kho Obsidian ghi ngừng 5–7 ngày).'],
    interactions:[
      'Warfarin và thuốc chống đông, chống tiểu cầu: liều cao có tác dụng chống kết tập tiểu cầu. Phần lớn nghiên cứu cho thấy 3–6 g/ngày không làm thay đổi đáng kể INR, nhưng vẫn cần bác sĩ theo dõi (NIH).',
      'Dùng cùng curcumin (nghệ) liều cao có thể cộng thêm nguy cơ chảy máu (kho Obsidian).'],
    foods:'Cá hồi, cá thu, cá trích, cá mòi, cá ngừ. ALA: hạt lanh, hạt chia, óc chó, dầu cải, dầu đậu nành (NIH).',
    sources:[['NIH ODS – Omega-3','https://ods.od.nih.gov/factsheets/Omega3FattyAcids-HealthProfessional/'],['Examine – Fish oil','https://examine.com/supplements/fish-oil/']]},

  mg:{
    name:'Magie',aka:'Magnesium, hořčík',updated:'2026-11-03',
    what:'Khoáng chất tham gia hơn 300 phản ứng enzyme trong cơ thể: tạo năng lượng, co cơ, dẫn truyền thần kinh, xương, điều hoà đường huyết và huyết áp. Cơ thể chỉ hấp thu khoảng 30–40% magie từ thức ăn (NIH).',
    benefits:[
      ['chac','Các công bố được EFSA chấp thuận: giảm mệt mỏi, duy trì chức năng cơ, thần kinh, xương và răng bình thường. Áp dụng cho mọi dạng magie.','Kho Obsidian'],
      ['cothe','Phòng đau nửa đầu: Học viện Thần kinh Mỹ và Hội Đau đầu Mỹ đánh giá magie "có lẽ hiệu quả".','NIH'],
      ['cothe','Huyết áp: chỉ giảm rất ít.','NIH'],
      ['chuaro','Tiểu đường type 2 và loãng xương: chưa đủ bằng chứng để khuyên dùng.','NIH'],
      ['chuaro','Lời quảng cáo "magie malát cho năng lượng", "malát hấp thu tốt nhất" chỉ có dữ liệu trên chuột.','Kho Obsidian']],
    need:'Theo NIH: nam 400–420 mg/ngày, nữ 310–320 mg/ngày (tính cả thức ăn). Mức tối đa chỉ tính phần magie bổ sung: EFSA 250 mg/ngày, NIH 350 mg/ngày.',
    how:[
      'Luôn đọc dòng magie nguyên tố trên nhãn (ví dụ "hořčík 120 mg"), không đọc khối lượng muối. "Magie malát 1000 mg" có thể chỉ chứa 97–200 mg magie thật (kho Obsidian).',
      'Chọn dạng tan tốt: citrat, glycinat (bisglycinat), clorua, lactat, aspartat. Tránh oxit và cacbonat nếu mục tiêu là bổ sung magie, vì hấp thu kém và dễ gây tiêu chảy (NIH, Examine).',
      'Chia 2–3 lần mỗi ngày, uống cùng bữa ăn. Uống dồn một lần dễ gây tiêu chảy (kho Obsidian).',
      'Chỉ dùng một sản phẩm magie một lúc, hoặc cộng tổng các sản phẩm, để không vượt mức tối đa (kho Obsidian).'],
    forms:'Citrat (nghiên cứu nhiều, hấp thu tốt), bisglycinat (chelate thật, dễ chịu cho dạ dày), malát (muối, không phải chelate dù nhãn hay ghi vậy), clorua, L-threonate. Oxit rẻ nhưng hấp thu kém.',
    cautions:[
      'Liều cao gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao gây tụt huyết áp, loạn nhịp tim (NIH).',
      'Suy thận: thận là nơi duy nhất thải magie thừa, phải hỏi bác sĩ trước khi dùng (kho Obsidian).',
      'Dễ thiếu: người có bệnh tiêu hoá, tiểu đường type 2, nghiện rượu, người lớn tuổi (NIH).'],
    interactions:[
      'Kháng sinh tetracyclin và quinolon (ví dụ ciprofloxacin): magie làm giảm hấp thu thuốc, uống cách nhau ít nhất 2 giờ (NIH, kho Obsidian).',
      'Thuốc loãng xương nhóm bisphosphonat: magie làm giảm hấp thu thuốc (NIH).',
      'Lợi tiểu và thuốc giảm axit dạ dày (PPI) dùng lâu ngày có thể làm thiếu magie (NIH).',
      'Thuốc hạ huyết áp: magie liều cao có thể cộng thêm tác dụng hạ áp (kho Obsidian).',
      'Kẽm và canxi liều cao cạnh tranh hấp thu, nên uống cách nhau khoảng 2 giờ (kho Obsidian).'],
    foods:'Rau lá xanh, các loại đậu, hạt, ngũ cốc nguyên hạt (NIH).',
    sources:[['NIH ODS – Magnesium','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['Examine – Magnesium','https://examine.com/supplements/magnesium/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]}
};
