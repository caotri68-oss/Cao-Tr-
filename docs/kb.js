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
    sources:[['NIH ODS – Magnesium','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['Examine – Magnesium','https://examine.com/supplements/magnesium/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  zn:{
    name:'Kẽm',aka:'Zinc',updated:'2026-11-03',
    what:'Khoáng chất vi lượng cần cho hơn 300 enzyme: miễn dịch, lành vết thương, tổng hợp protein, da, vị giác, thị lực. Cơ thể không có kho dự trữ kẽm, nên phải nạp đều mỗi ngày.',
    benefits:[
      ['chac','Các chức năng EFSA công nhận (miễn dịch, da, tóc, móng, thị lực, nhận thức, sinh sản) đều là "duy trì mức bình thường", không phải tăng cường vượt mức.','Kho Obsidian'],
      ['cothe','Cảm lạnh: viên ngậm hoặc siro kẽm dùng sớm có thể rút ngắn thời gian bị cảm. Kết quả các thử nghiệm không đồng đều.','NIH'],
      ['cothe','Thoái hoá điểm vàng: công thức AREDS (có kẽm, đồng và chất chống oxy hoá) làm chậm tiến triển ở người đã mắc.','NIH'],
      ['cothe','Tiêu chảy cấp ở trẻ em ở nước thu nhập thấp: WHO và UNICEF khuyên bổ sung kẽm 10–20 mg/ngày trong 10–14 ngày. Không áp dụng cho tự dùng ở người lớn.','NIH'],
      ['chuaro','Tiểu đường type 2, HIV: kết quả hỗn hợp.','NIH'],
      ['khong','Ở người không thiếu kẽm, bằng chứng bổ sung để tăng testosterone, miễn dịch hay trí nhớ gần như không có, dù quảng cáo rất nhiều.','Kho Obsidian']],
    need:'Theo NIH: nam 11 mg, nữ 8 mg mỗi ngày (khoảng 8–12 mg tuỳ tuổi và giai đoạn). Viên bổ sung thường 5–45 mg kẽm nguyên tố (Examine). Mức tối đa: EFSA 25 mg, NIH 40 mg mỗi ngày.',
    how:[
      'Đọc dòng kẽm nguyên tố trên nhãn (ví dụ "kẽm 15 mg"), không đọc khối lượng muối.',
      'Cơ thể tự điều chỉnh cửa hấp thu kẽm: uống 50 mg không hấp thu gấp 5 lần 10 mg. Liều vừa phải, đều mỗi ngày, hợp lý hơn liều lớn (kho Obsidian).',
      'Nếu buồn nôn khi uống lúc đói thì uống cùng bữa ăn nhẹ (NIH ghi buồn nôn là tác dụng phụ thường gặp khi dùng nhiều).',
      'Uống cách canxi, sắt khoảng 2 giờ: canxi chen cửa hấp thu, và sắt từ 25 mg trở lên uống cùng làm giảm hấp thu kẽm (NIH, kho Obsidian).',
      'Bữa ăn nhiều gạo, đậu (phytate) làm giảm hấp thu kẽm.'],
    forms:'Phổ biến: sulfat, gluconat, acetat (NIH), cũng có citrat, picolinat (Examine) và bisglycinat. Mỗi muối cho lượng kẽm nguyên tố khác nhau. Kho Obsidian ghi kẽm glycinat hấp thu cao hơn sulfat khoảng 16% (49% so với 42%); con số "80% so với 4%" trên nhãn một số hãng là so với kẽm oxit, nên chênh lệch thật nhỏ hơn nhiều.',
    cautions:[
      'Từ 50 mg trở lên trong vài tuần có thể cản hấp thu đồng, giảm miễn dịch và giảm cholesterol HDL (NIH).',
      'Kẽm liều cao kéo dài có thể gây thiếu đồng (thiếu máu, giảm bạch cầu). Uống thêm đồng không bù được, phải giảm kẽm (kho Obsidian).',
      'Dấu hiệu quá liều: buồn nôn, chóng mặt, nhức đầu, khó chịu dạ dày, nôn, mất cảm giác ngon miệng (NIH).',
      'Dễ thiếu: người ăn chay, bệnh tiêu hoá, sau phẫu thuật giảm cân, mang thai và cho con bú, nghiện rượu (NIH).'],
    interactions:[
      'Kháng sinh quinolon và tetracyclin: kẽm gắn với thuốc và làm giảm tác dụng, cần uống cách xa (NIH).',
      'Penicillamin (NIH).',
      'Một số thuốc lợi tiểu làm tăng thải kẽm qua nước tiểu (NIH).',
      'Canxi, sắt, magie liều cao cạnh tranh hấp thu: uống cách nhau (kho Obsidian).'],
    foods:'Hàu và hải sản, thịt đỏ, gia cầm, các loại đậu, hạt.',
    sources:[['NIH ODS – Zinc','https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/'],['Examine – Zinc','https://examine.com/supplements/zinc/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  ca:{
    name:'Canxi',aka:'Calcium, vápník',updated:'2026-11-03',
    what:'Khoáng chất nhiều nhất trong cơ thể, 99% nằm ở xương và răng. Cũng cần cho co cơ, dẫn truyền thần kinh và đông máu.',
    benefits:[
      ['chac','Cần cho xương và răng bình thường, chức năng cơ, dẫn truyền thần kinh, đông máu (công bố được EFSA chấp thuận).','Kho Obsidian'],
      ['cothe','Canxi kèm vitamin D ở người lớn tuổi: FDA cho phép công bố giúp giảm nguy cơ loãng xương, nhưng không phải thử nghiệm nào cũng thấy giảm gãy xương.','NIH'],
      ['cothe','Mang thai: có thể giảm nguy cơ tiền sản giật ở người ăn thiếu canxi.','NIH'],
      ['chuaro','Ung thư đại trực tràng, cân nặng: bằng chứng chưa rõ.','NIH'],
      ['chuaro','Ở nam giới không thiếu canxi, bằng chứng canxi viên giảm gãy xương là yếu (kho Obsidian). Thứ tự hợp lý: kiểm tra vitamin D, tính canxi ăn vào, chỉ bù phần thiếu.','Kho Obsidian']],
    need:'Theo NIH: 1000–1200 mg mỗi ngày cho người lớn, tính cả thức ăn. Phần lớn nên đến từ thức ăn, viên chỉ bù phần thiếu, thường khoảng 500 mg/ngày (kho Obsidian). Mức tối đa: 2000–2500 mg/ngày tuỳ tuổi (NIH), EFSA 2500 mg, tính cả thức ăn.',
    how:[
      'Cân theo canxi nguyên tố, không cân theo khối lượng muối. Ví dụ canxi bisglycinat chỉ chứa khoảng 21% canxi (kho Obsidian).',
      'Mỗi lần uống không quá khoảng 500 mg canxi nguyên tố; nếu cần nhiều hơn thì chia nhiều lần trong ngày (Examine, kho Obsidian).',
      'Uống cùng bữa ăn giúp hấp thu (Examine). Canxi cacbonat cần acid dạ dày, nên phải uống cùng bữa; canxi citrat uống lúc nào cũng được.',
      'Canxi hấp thu chủ động chỉ khi có vitamin D, nên cần đủ vitamin D (kho Obsidian).',
      'Uống cách kẽm, sắt, magie ít nhất 2 giờ. Nghiên cứu cũ ghi 300 mg canxi uống cùng bữa làm giảm hấp thu sắt tới khoảng 60% (Hallberg 1991, kho Obsidian).'],
    forms:'Phổ biến nhất là cacbonat và citrat (NIH). Citrat hấp thu hơn cacbonat khoảng 22–27% ở người (kho Obsidian). Bisglycinat được quảng cáo hấp thu tốt, nhưng chưa có thử nghiệm độc lập trên người chứng minh hơn citrat (kho Obsidian). Nhãn ghi "buffered" nghĩa là có trộn cacbonat hoặc oxit.',
    cautions:[
      'Canxi viên liều cao có thể tăng nguy cơ sỏi thận (NIH).',
      'Một số nghiên cứu thấy canxi viên có thể tăng nguy cơ tim mạch, chưa ngã ngũ; không nên lạm dụng liều cao (NIH, kho Obsidian).',
      'Có thể tăng nguy cơ ung thư tuyến tiền liệt khi lượng canxi cao (NIH).',
      'Tránh tự bổ sung nếu có tiền sử sỏi thận canxi oxalat, tăng canxi máu, suy thận mạn, cường cận giáp, sarcoidosis (kho Obsidian).',
      'Dễ thiếu: phụ nữ sau mãn kinh, người không dùng sữa và chế phẩm sữa (NIH).'],
    interactions:[
      'Levothyroxine (thuốc tuyến giáp): canxi làm giảm hấp thu, cần uống cách xa nhiều giờ theo chỉ dẫn của bác sĩ (NIH).',
      'Kháng sinh quinolon: canxi làm giảm hấp thu thuốc (NIH).',
      'Dolutegravir và lithium (NIH).',
      'Sắt, kẽm, magie: cạnh tranh hấp thu, uống cách nhau (kho Obsidian).'],
    foods:'Sữa và chế phẩm sữa, cá nhỏ ăn cả xương, rau lá xanh đậm, đậu phụ và thực phẩm được bổ sung canxi.',
    sources:[['NIH ODS – Calcium','https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/'],['Examine – Calcium','https://examine.com/supplements/calcium/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  vitK:{
    name:'Vitamin K',aka:'K1 (phylloquinone), K2 (MK-4, MK-7)',updated:'2026-11-03',
    what:'Vitamin tan trong dầu, cần cho đông máu và cho các protein giữ canxi ở đúng chỗ (osteocalcin trong xương, MGP ở thành mạch). K1 có nhiều trong rau lá xanh. K2 có trong thực phẩm lên men như natto và trong sản phẩm bổ sung.',
    benefits:[
      ['chac','Cần cho đông máu bình thường và duy trì xương bình thường (công bố được EFSA chấp thuận).','Kho Obsidian'],
      ['chuaro','Loãng xương: vitamin K tham gia hoạt hoá osteocalcin trong xương, nhưng chưa rõ bổ sung có giảm nguy cơ loãng xương hay không. Một số thử nghiệm ở phụ nữ sau mãn kinh có cải thiện chỉ số xương.','NIH'],
      ['chuaro','Giảm vôi hoá động mạch ở người khoẻ: cơ chế qua MGP có thật, nhưng kết quả lâm sàng hỗn hợp và nhiều thử nghiệm trung tính. Đây là phần yếu nhất của lập luận "D3 cộng K2".','Kho Obsidian']],
    need:'Theo NIH: nữ 90 mcg, nam 120 mcg mỗi ngày (mức đủ). Liều K2 MK-7 trong các thử nghiệm: 45–200 mcg/ngày; 100 mcg là mức phổ biến khi đi kèm vitamin D3 (kho Obsidian). Chưa có mức tối đa chính thức: NIH và EFSA đều không đặt vì độc tính thấp.',
    how:[
      'Uống cùng bữa có chất béo, vì vitamin K tan trong dầu (kho Obsidian).',
      'MK-7 ở lại trong máu rất lâu: bán thải khoảng 72 giờ, trong khi MK-4 chỉ khoảng 1 giờ. Vì vậy MK-7 dùng liều microgram, uống cách ngày vẫn giữ được nồng độ (kho Obsidian).',
      'Chọn sản phẩm ghi rõ all-trans MK-7: đồng phân cis không có hoạt tính, mà nhiều nhãn không ghi tỷ lệ (kho Obsidian).',
      'Muốn uống cùng vitamin D thì viên kết hợp D3 cộng K2 tiện, nhưng K2 mới quyết định tần suất uống chứ không phải D3 (kho Obsidian).'],
    forms:'K1 (phylloquinone), K2 dạng MK-4 và MK-7. Dữ liệu so sánh sinh khả dụng giữa các dạng còn hạn chế (NIH). MK-7 từ natto là dạng phổ biến trong viên.',
    cautions:[
      'Gần như không có độc tính ở liều bổ sung thông thường (NIH).',
      'Dễ thiếu: trẻ sơ sinh không được tiêm vitamin K, người kém hấp thu, người sau phẫu thuật giảm cân (NIH).'],
    interactions:[
      'Warfarin và thuốc chống đông kháng vitamin K (acenocoumarol): vitamin K đối kháng trực tiếp tác dụng của thuốc và làm nhiễu INR. Lượng vitamin K phải được giữ ổn định, không tự thêm hay bớt (NIH, kho Obsidian).',
      'Thuốc chống đông mới (apixaban, rivaroxaban, dabigatran) không hoạt động qua vitamin K nên không có tương tác kiểu này, nhưng vẫn cần hỏi bác sĩ (kho Obsidian).',
      'Một số kháng sinh, thuốc gắn acid mật (cholestyramin), orlistat: làm giảm vitamin K trong cơ thể; nên uống vitamin K cách xa orlistat và cholestyramin ít nhất 2 giờ (NIH, kho Obsidian).'],
    foods:'Rau lá xanh (cải xoăn, rau chân vịt, bông cải xanh) cho K1; natto và thực phẩm lên men cho K2.',
    sources:[['NIH ODS – Vitamin K','https://ods.od.nih.gov/factsheets/VitaminK-HealthProfessional/']]},

  b12:{
    name:'Vitamin B12',aka:'Cobalamin, methylcobalamin, cyanocobalamin',updated:'2026-11-03',
    what:'Vitamin tan trong nước duy nhất chứa kim loại (cobalt). Cần để tạo hồng cầu và giữ vỏ myelin của dây thần kinh. Chỉ vi khuẩn tổng hợp B12; con người lấy qua thịt, cá, trứng, sữa. Thực vật thuần không có B12 hoạt tính.',
    benefits:[
      ['chac','Chữa và phòng thiếu B12 (thiếu máu, tổn thương thần kinh). Người ăn chay trường bắt buộc phải bổ sung.','Kho Obsidian, NIH'],
      ['khong','Không giúp tăng năng lượng hay sức bền ở người đã đủ B12.','NIH'],
      ['khong','Không thấy liên quan giữa bổ sung B12 và nguy cơ bệnh tim mạch.','NIH'],
      ['chuaro','Trí nhớ và sa sút trí tuệ, ung thư: dữ liệu không thống nhất.','NIH']],
    need:'Theo NIH: 2,4 mcg mỗi ngày cho người lớn, 2,6–2,8 mcg khi mang thai hoặc cho con bú. Thức ăn thường đã đủ. Chưa có mức tối đa vì B12 an toàn kể cả liều cao (NIH).',
    how:[
      'Hấp thu B12 có "cửa hẹp": nhờ protein yếu tố nội tại, mỗi lần chỉ qua được khoảng 1,5–2 mcg. Ngoài ra khoảng 1% liều uống thấm qua theo cách thụ động. Vì vậy viên 1000 mcg không vào máu gấp 500 lần viên 2 mcg (kho Obsidian).',
      'Ví dụ tính của kho Obsidian: uống 300 mcg thì hấp thu thật khoảng 4,5–5,5 mcg. Liều cao chỉ cần thiết khi cửa hẹp bị hỏng.',
      'Gan dự trữ 2–5 mg B12, đủ 3–5 năm, nên thiếu B12 diễn ra rất chậm và âm thầm (kho Obsidian).',
      'Uống lúc nào cũng được.'],
    forms:'Cyanocobalamin phổ biến nhất trong viên; còn có methylcobalamin, adenosylcobalamin (NIH). Lời quảng cáo "methyl tốt hơn cyano" chưa được chứng minh trên người (kho Obsidian).',
    cautions:[
      'B12 dư thải qua nước tiểu và không nguy hiểm. Rủi ro thường nằm ở các chất đi cùng trong viên B-complex, nhất là vitamin B6 liều cao (kho Obsidian).',
      'Dễ thiếu: người lớn tuổi, thiếu máu ác tính, bệnh tiêu hoá hoặc đã phẫu thuật tiêu hoá, người ăn chay, trẻ bú mẹ của người ăn chay trường (NIH).'],
    interactions:[
      'Thuốc giảm acid dạ dày (PPI, thuốc kháng H2) và metformin làm giảm hấp thu B12; người dùng lâu dài nên kiểm tra B12 (NIH).'],
    foods:'Thịt, cá, trứng, sữa; một số thực phẩm được bổ sung B12.',
    sources:[['NIH ODS – Vitamin B12','https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/']]},

  b6:{
    name:'Vitamin B6',aka:'Pyridoxine, pyridoxal 5-phosphate (P5P, PLP)',updated:'2026-11-03',
    what:'Vitamin tan trong nước, tham gia chuyển hoá protein và chất dẫn truyền thần kinh, tạo hồng cầu. Phần lớn người ăn uống bình thường đã đủ B6, thiếu rõ rệt khá hiếm.',
    benefits:[
      ['cothe','Hội chứng tiền kinh nguyệt: có thể giảm một số triệu chứng, nhưng phần lớn nghiên cứu chất lượng thấp.','NIH'],
      ['chuaro','Tim mạch, trí nhớ ở người lớn tuổi, ung thư: dữ liệu quan sát có liên quan, thử nghiệm chưa chứng minh rõ lợi ích của việc bổ sung.','NIH'],
      ['chuaro','Buồn nôn khi mang thai: có dùng trong thực hành, cần bác sĩ hướng dẫn.','NIH']],
    need:'Theo NIH: 1,3 mg mỗi ngày cho người 19–50 tuổi; từ 51 tuổi nam 1,7 mg, nữ 1,5 mg. Mang thai 1,9 mg, cho con bú 2,0 mg. Mức tối đa khác nhau nhiều: EFSA 12 mg, NIH 100 mg mỗi ngày. Nhiều viên đa vitamin và B-complex chứa 25–100 mg, cao gấp hàng chục lần nhu cầu.',
    how:[
      'Đọc dòng B6 trên nhãn và cộng tổng nếu dùng nhiều viên cùng lúc: đa vitamin, B-complex, viên ZMA đều có B6 (kho Obsidian).',
      'Không cần liều "mega". Liều bình thường (100–500% giá trị khuyến nghị) đủ cho phần lớn người lớn tuổi cần bù nền (kho Obsidian).',
      'Cơ thể thải nhanh phần B6 thừa qua nước tiểu, nhưng dùng lâu liều cao vẫn gây hại thần kinh (NIH).',
      'Dùng dài hạn thì ưu tiên mức thấp hơn, theo chuẩn châu Âu 12 mg.'],
    forms:'Pyridoxine hydrochloride là dạng phổ biến nhất; còn có P5P (pyridoxal 5-phosphate). NIH ghi hấp thu giữa các dạng không khác biệt đáng kể.',
    cautions:[
      'Dùng 1–6 g pyridoxine mỗi ngày trong 12–40 tháng gây bệnh thần kinh cảm giác nặng và tiến triển: loạng choạng, mất cảm giác. Thường hết khi ngừng sớm (NIH).',
      'Tác dụng phụ khác: tổn thương da, nhạy cảm ánh sáng, buồn nôn, ợ nóng (NIH).',
      'Có báo cáo tổn thương thần kinh ở liều dưới 500 mg/ngày. NIH đặt mức tối đa 100 mg/ngày (một nửa liều 200 mg trong các nghiên cứu theo dõi tới 5 năm không thấy tác hại), còn EFSA đặt thấp hơn nhiều là 12 mg. Examine không khuyên dùng trên 100 mg/ngày nếu không có bác sĩ theo dõi.',
      'Dấu hiệu cần dừng và hỏi bác sĩ: tê bì, châm chích bàn tay, bàn chân, loạng choạng.',
      'Dễ thiếu: người suy thận, bệnh tự miễn như viêm khớp dạng thấp, người nghiện rượu (NIH).'],
    interactions:[
      'Cycloserin (thuốc lao): làm tăng thải B6 qua nước tiểu (NIH).',
      'Một số thuốc chống động kinh làm giảm B6 trong máu (NIH).',
      'Danh sách trên chưa đầy đủ; nếu dùng thuốc thường xuyên, hãy hỏi bác sĩ hoặc dược sĩ về tình trạng B6.'],
    foods:'Cá, gan bò và nội tạng, khoai tây và rau củ nhiều tinh bột, trái cây (trừ cam quýt), ngũ cốc tăng cường. Khoảng 75% B6 trong bữa ăn hỗn hợp được hấp thu (NIH).',
    sources:[['NIH ODS – Vitamin B6','https://ods.od.nih.gov/factsheets/VitaminB6-HealthProfessional/'],['Examine – Vitamin B6','https://examine.com/supplements/vitamin-b6/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  vitE:{
    name:'Vitamin E',aka:'Tocopherol, tocotrienol',updated:'2026-11-03',
    what:'Nhóm vitamin tan trong dầu, là chất chống oxy hoá bảo vệ màng tế bào. Dạng hoạt động chính ở người là alpha-tocopherol.',
    benefits:[
      ['chac','Phòng và chữa thiếu vitamin E (hiếm; gặp ở trẻ sinh non nhẹ cân và người kém hấp thu chất béo).','NIH'],
      ['cothe','Thoái hoá điểm vàng: công thức AREDS (có vitamin E, vitamin C, kẽm, đồng) làm chậm tiến triển ở người đã mắc.','NIH'],
      ['khong','Phòng ung thư: bằng chứng không ủng hộ. Một thử nghiệm lớn gợi ý liều cao dùng đều đặn có thể còn có hại.','NIH'],
      ['chuaro','Tim mạch: có cơ chế hợp lý (chống oxy hoá LDL, chống đông) nhưng kết quả thử nghiệm không thống nhất.','NIH'],
      ['chuaro','Trí nhớ, sa sút trí tuệ: phần lớn nghiên cứu không thấy lợi ích rõ.','NIH']],
    need:'Theo NIH: 15 mg alpha-tocopherol mỗi ngày cho người lớn, 19 mg khi cho con bú. Mức tối đa từ viên bổ sung: NIH 1000 mg, EFSA 300 mg mỗi ngày. Ăn đủ hạt, dầu thực vật thường đã đủ.',
    how:[
      'Uống cùng bữa có chất béo vì vitamin E tan trong dầu (Examine).',
      'Chú ý đơn vị: nhãn có thể ghi IU hoặc mg. 1 mg vitamin E tự nhiên (RRR) bằng 1 mg alpha-tocopherol; dạng tổng hợp (all-rac, dl) cần 2 mg để bằng 1 mg tự nhiên (Examine).',
      'Phần lớn người không cần bổ sung riêng.'],
    forms:'Dạng tự nhiên ghi RRR hoặc d-alpha; dạng tổng hợp ghi all-rac hoặc dl, hoạt tính chỉ khoảng một nửa (NIH). Một số sản phẩm có thêm các dạng tocopherol khác hoặc tocotrienol.',
    cautions:[
      'Thử nghiệm ghi nhận tăng nguy cơ đột quỵ xuất huyết ở liều cao dùng dưới dạng viên (NIH).',
      'Thức ăn không gây tác dụng phụ ở lượng lớn (NIH).',
      'Dễ thiếu: trẻ sinh non nhẹ cân, người kém hấp thu chất béo (NIH).'],
    interactions:[
      'Thuốc chống đông và chống tiểu cầu: cộng thêm nguy cơ chảy máu (NIH).',
      'Simvastatin và niacin: NIH ghi có tương tác, nên hỏi bác sĩ nếu đang dùng.',
      'Hoá trị và xạ trị: có thể ảnh hưởng điều trị, phải hỏi bác sĩ (NIH).'],
    foods:'Dầu mầm lúa mì, hạt hướng dương, hạnh nhân, dầu thực vật, rau lá xanh.',
    sources:[['NIH ODS – Vitamin E','https://ods.od.nih.gov/factsheets/VitaminE-HealthProfessional/'],['Examine – Vitamin E','https://examine.com/supplements/vitamin-e/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  fe:{
    name:'Sắt',aka:'Iron, železo',updated:'2026-11-03',
    what:'Khoáng chất cần để tạo hemoglobin (mang oxy trong máu), tạo năng lượng trong tế bào và cho hệ miễn dịch. Có hai loại trong thức ăn: sắt heme (từ thịt, hấp thu tốt) và sắt không heme (từ thực vật, hấp thu kém hơn).',
    benefits:[
      ['chac','Phòng và chữa thiếu máu thiếu sắt. Ở phụ nữ mang thai, bổ sung sắt giảm nguy cơ thiếu máu và một số bất lợi cho trẻ sơ sinh.','NIH'],
      ['cothe','Một số hội chuyên môn khuyên sàng lọc thiếu máu và bổ sung sắt cho phụ nữ mang thai.','NIH'],
      ['chuaro','Thiếu máu do bệnh mạn tính: chủ yếu điều trị bệnh nền, bổ sung sắt chỉ có ích trong một số trường hợp.','NIH']],
    need:'Theo NIH: 8–27 mg mỗi ngày tuỳ giới, tuổi và thai kỳ; phụ nữ còn kinh nguyệt và phụ nữ mang thai cần nhiều hơn nam giới. Người ăn chay cần nhiều hơn vì sắt thực vật hấp thu kém hơn. Mức tối đa: NIH 45 mg; EFSA 40 mg (đây là "mức an toàn", EFSA không đặt được mức tối đa chính thức).',
    how:[
      'Chỉ bổ sung khi có lý do, ví dụ thiếu sắt đã được xét nghiệm hoặc nhu cầu cao (mang thai, mất máu).',
      'Uống cùng vitamin C giúp hấp thu tốt hơn. Kho Obsidian ghi vitamin C tăng hấp thu sắt khoảng 67%.',
      'Uống lúc bụng đói hấp thu tốt nhất, nhưng dễ khó chịu dạ dày. NIH ghi một số dạng dễ gây khó chịu tiêu hoá hơn ở liều cao.',
      'Uống cách canxi: NIH khuyên uống canxi và sắt vào các thời điểm khác nhau; nghiên cứu cũ ghi 300 mg canxi uống cùng bữa làm giảm hấp thu sắt tới khoảng 60% (kho Obsidian).',
      'Trà, cà phê (tannin) và thuốc giảm acid dạ dày cản hấp thu sắt (kho Obsidian, NIH).',
      'Đang viêm nhiễm hoặc đang ốm thì cơ thể tự đóng cửa hấp thu sắt (qua hormone hepcidin), uống lúc đó gần như vô ích (kho Obsidian).'],
    forms:'Phổ biến là các muối sắt II (ferrous) và sắt III (ferric). Mỗi dạng chứa lượng sắt nguyên tố khác nhau, nên đọc dòng sắt nguyên tố trên nhãn (NIH).',
    cautions:[
      'Ở người lớn có ruột bình thường, nguy cơ thừa sắt từ thức ăn thấp, nhưng viên sắt liều cao gây rối loạn tiêu hoá (NIH).',
      'Liều cực cao có thể gây hoại tử ruột, suy đa cơ quan và tử vong; phải để xa tầm tay trẻ em (NIH).',
      'Dễ thiếu: phụ nữ mang thai, trẻ nhỏ, phụ nữ kinh nguyệt nhiều, người hiến máu thường xuyên, người có bệnh tiêu hoá hoặc suy tim (NIH).'],
    interactions:[
      'Levodopa và levothyroxine: sắt làm giảm hấp thu thuốc, cần uống cách xa (NIH).',
      'Thuốc giảm acid dạ dày (PPI) làm giảm hấp thu sắt (NIH).',
      'Canxi cản hấp thu sắt; sắt từ 25 mg trở lên uống cùng làm giảm hấp thu kẽm (NIH).'],
    foods:'Thịt đỏ, gan, hải sản, đậu, rau lá xanh đậm, ngũ cốc tăng cường sắt.',
    sources:[['NIH ODS – Iron','https://ods.od.nih.gov/factsheets/Iron-HealthProfessional/'],['EFSA – sắt 2024','https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11167337/']]},

  se:{
    name:'Selen',aka:'Selenium, selen',updated:'2026-11-03',
    what:'Khoáng chất vi lượng, thành phần của các protein chống oxy hoá (selenoprotein) và cần cho việc tạo và chuyển hoá hormone tuyến giáp. Lượng selen trong thức ăn phụ thuộc vào đất trồng, nên khác nhau nhiều giữa các vùng.',
    benefits:[
      ['chac','Cần cho chức năng tuyến giáp và chống oxy hoá. Thiếu selen không phổ biến ở Mỹ.','NIH'],
      ['chuaro','Bệnh tuyến giáp: thiếu selen gắn với bệnh tuyến giáp ở phụ nữ (không thấy ở nam); thử nghiệm cho thấy bổ sung ảnh hưởng một số chỉ số tuyến giáp, ý nghĩa lâm sàng chưa rõ.','NIH'],
      ['chuaro','Ung thư: kết quả thử nghiệm không thống nhất.','NIH'],
      ['khong','Bổ sung selen không được ủng hộ để phòng bệnh tim mạch, nhất là ở người không thiếu.','NIH'],
      ['chuaro','Khả năng sinh sản nam và trí nhớ: dữ liệu chưa đủ để kết luận.','NIH']],
    need:'Theo NIH: 55 mcg mỗi ngày cho người lớn (55–70 mcg tuỳ thai kỳ và cho con bú). Mức tối đa: EFSA 255 mcg (hạ từ 300 mcg năm 2023), NIH 400 mcg mỗi ngày.',
    how:[
      'Cộng tổng selen từ mọi viên (có viên đa vitamin chứa tới 200 mcg) và thức ăn giàu selen như hạt Brazil. EFSA ghi người dùng viên selen liều cao hoặc ăn thường xuyên hạt Brazil có nguy cơ vượt mức tối đa.',
      'Phần lớn người ăn đủ thịt, cá, trứng, ngũ cốc không cần bổ sung riêng.'],
    forms:'Selenomethionin, men giàu selen, natri selenit, natri selenat; cơ thể hấp thu tới khoảng 90% các dạng này (NIH).',
    cautions:[
      'Ngộ độc selen mạn tính (selenosis): rụng tóc, móng giòn hoặc rụng, hơi thở mùi tỏi, vị kim loại trong miệng, phát ban, buồn nôn, tiêu chảy, mệt mỏi, cáu gắt và bất thường thần kinh (NIH).',
      'Dễ thiếu: người sống ở vùng đất thiếu selen, người chạy thận nhân tạo, người nhiễm HIV (NIH).'],
    interactions:[
      'Cisplatin (thuốc hoá trị) ảnh hưởng nồng độ selen trong cơ thể; viên selen cũng có thể tương tác với thuốc, hãy hỏi bác sĩ nếu đang điều trị (NIH).'],
    foods:'Hạt Brazil (rất nhiều), hải sản, thịt, trứng, ngũ cốc.',
    sources:[['NIH ODS – Selenium','https://ods.od.nih.gov/factsheets/Selenium-HealthProfessional/'],['EFSA – selen 2023','https://efsa.onlinelibrary.wiley.com/doi/10.2903/j.efsa.2023.7704']]},

  io:{
    name:'I-ốt',aka:'Iodine, jód',updated:'2026-11-03',
    what:'Khoáng chất vi lượng là thành phần của hormone tuyến giáp. Rất quan trọng cho sự phát triển não của thai nhi và trẻ nhỏ. Vừa thiếu vừa thừa i-ốt đều có thể làm rối loạn tuyến giáp.',
    benefits:[
      ['chac','Cần để tạo hormone tuyến giáp và cho sự phát triển của thai nhi. Thiếu i-ốt mạn tính ở trẻ em làm giảm chỉ số thông minh khoảng 12–13,5 điểm.','NIH'],
      ['chac','Muối i-ốt là biện pháp chính để phòng thiếu i-ốt trên thế giới.','NIH']],
    need:'Theo NIH: 150 mcg mỗi ngày cho người lớn, 220 mcg khi mang thai. Nhiều viên đa vitamin chứa 150 mcg. Mức tối đa: EFSA 600 mcg, NIH 1100 mcg mỗi ngày.',
    how:[
      'Nếu đã dùng muối i-ốt, ăn cá và sữa thì thường đã đủ; người không dùng muối i-ốt có nguy cơ thiếu (NIH).',
      'Cẩn thận với viên chỉ chứa i-ốt hoặc rong biển (kelp): một số viên chứa liều rất cao, có khi vượt mức tối đa (NIH).',
      'Cộng tổng i-ốt từ đa vitamin, viên rong biển và thực phẩm.'],
    forms:'Kali iodua và natri iodua; kali iodua hấp thu gần như hoàn toàn (96,4%). Viên rong biển (kelp) có lượng i-ốt thay đổi (NIH).',
    cautions:[
      'Thừa i-ốt có thể gây bướu cổ, tăng TSH, suy giáp, cường giáp, viêm tuyến giáp và ung thư tuyến giáp thể nhú. Phản ứng khác nhau giữa từng người (NIH).',
      'Người đã có bệnh tuyến giáp hoặc có nhân giáp tự chủ: i-ốt dư có thể làm bùng phát cường giáp (hiện tượng Jod-Basedow). Phải hỏi bác sĩ trước khi dùng i-ốt, kể cả trong đa vitamin (kho Obsidian).',
      'Ngộ độc cấp hiếm, thường do dùng nhiều gam (NIH).'],
    interactions:[
      'Thuốc kháng giáp (như methimazole, tên Tapazole): i-ốt liều cao cộng thêm tác dụng và có thể gây suy giáp (NIH). Kho Obsidian ghi thêm là i-ốt làm giảm hiệu quả của thuốc.',
      'Thuốc ức chế men chuyển (như lisinopril, benazepril): dùng cùng kali iodua tăng nguy cơ kali máu cao (NIH).'],
    foods:'Muối i-ốt, cá và hải sản, sữa và chế phẩm sữa, rong biển (lượng thay đổi nhiều).',
    sources:[['NIH ODS – Iodine','https://ods.od.nih.gov/factsheets/Iodine-HealthProfessional/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  vitA:{
    name:'Vitamin A',aka:'Retinol, retinyl acetate/palmitate, beta-carotene',updated:'2026-11-03',
    what:'Vitamin tan trong dầu, cần cho thị giác (nhìn trong bóng tối), da và niêm mạc, và hệ miễn dịch. Có hai nhóm: vitamin A tạo sẵn (retinol, từ thức ăn động vật và viên bổ sung) và tiền vitamin A như beta-carotene (từ rau củ màu cam, đỏ, xanh đậm).',
    benefits:[
      ['chac','Cần cho thị giác và sức khoẻ biểu mô. Thiếu vitamin A là yếu tố nguy cơ làm sởi nặng ở trẻ em tại các nước thu nhập thấp.','NIH'],
      ['cothe','Khô mắt, rối loạn tuyến lệ: vitamin A đường uống dùng đợt ngắn theo chỉ định của bác sĩ. Không phải để tự dùng dài hạn.','Kho Obsidian'],
      ['chuaro','Ung thư: mối liên quan giữa vitamin A và nguy cơ ung thư chưa rõ.','NIH']],
    need:'Giá trị tham chiếu trên nhãn (DV) là 900 mcg RAE mỗi ngày. Đa vitamin thường có 750–1050 mcg RAE; viên vitamin A riêng thường có tới 3000 mcg RAE (NIH). Mức tối đa cho vitamin A tạo sẵn: 3000 mcg RAE mỗi ngày (EFSA và NIH).',
    how:[
      'Uống cùng bữa ăn có chất béo (kho Obsidian).',
      'Cộng tổng: đa vitamin, viên vitamin A riêng, dầu gan cá, và nhất là gan động vật. Gan lợn có khoảng 6000 mcg trong 100 g, một bữa có thể vượt mức tối đa cả ngày (kho Obsidian).',
      'Người ăn nhiều rau củ nhiều beta-carotene thường không thiếu vitamin A; bổ sung thêm liều cao không mang lại lợi ích tương xứng với rủi ro (kho Obsidian).'],
    forms:'Retinyl acetat và retinyl palmitat (hấp thu 70–90%), beta-carotene (hấp thu từ 8,7 đến 65%) hoặc phối hợp (NIH). Cần lưu ý beta-carotene không tính vào mức tối đa của vitamin A tạo sẵn.',
    cautions:[
      'Vitamin A tích luỹ trong gan, khác với vitamin tan trong nước. Ngộ độc cấp (thường từ hơn 100 lần nhu cầu): đau đầu nặng, mờ mắt, buồn nôn, chóng mặt, đau cơ, mất phối hợp. Ngộ độc mạn: khô da, đau cơ khớp, mệt mỏi, trầm cảm, men gan bất thường (NIH).',
      'Phụ nữ có thai hoặc có thể mang thai: liều cao tăng nguy cơ dị tật thai nhi; phải hỏi bác sĩ (kho Obsidian).',
      'Dùng dài hạn liều cao làm giảm mật độ xương, đáng lo ở người sau mãn kinh hoặc đã có nguy cơ loãng xương (kho Obsidian).',
      'Bệnh gan: thận trọng; chỉ dùng đúng số ngày bác sĩ kê (kho Obsidian).',
      'Dễ thiếu: trẻ sinh non, người kém hấp thu, trẻ em và phụ nữ ở nước thu nhập thấp (NIH).'],
    interactions:[
      'Orlistat làm giảm hấp thu vitamin A và các vitamin tan trong dầu khác (NIH).',
      'Thuốc retinoid uống (như acitretin trị vảy nến, bexarotene): không tự uống thêm vitamin A, hãy hỏi bác sĩ (NIH).',
      'Dùng nhiều thuốc chuyển hoá qua gan (statin, thuốc kháng giáp): vitamin A liều cao thêm gánh nặng cho gan, nên thận trọng (kho Obsidian).'],
    foods:'Gan, cá béo, trứng, sữa (vitamin A tạo sẵn); cà rốt, khoai lang, bí đỏ, rau lá xanh đậm (beta-carotene).',
    sources:[['NIH ODS – Vitamin A','https://ods.od.nih.gov/factsheets/VitaminA-HealthProfessional/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  curc:{
    name:'Curcumin',aka:'Nghệ, turmeric, curcuminoid',updated:'2026-11-03',
    what:'Hoạt chất chính trong củ nghệ (Curcuma longa), có tác dụng chống viêm và chống oxy hoá trong thí nghiệm. Curcumin thô hấp thu rất kém qua ruột, nên gần như mọi sản phẩm tốt đều dùng công nghệ để tăng hấp thu.',
    benefits:[
      ['cothe','Triệu chứng thoái hoá khớp (đau, cứng khớp): kho Obsidian ghi nhiều thử nghiệm nhỏ đến vừa cho thấy có lợi ở mức nhẹ đến vừa. NCCIH đánh giá chung là chưa đủ bằng chứng để khẳng định.','Kho Obsidian, NCCIH'],
      ['chuaro','Gan nhiễm mỡ, mỡ máu cao: NCCIH ghi chưa đủ dữ liệu để kết luận.','NCCIH'],
      ['chuaro','Phòng ung thư, thay thế thuốc kháng viêm mạnh: chưa có bằng chứng lâm sàng đủ mạnh ở người.','Kho Obsidian'],
      ['chuaro','NCCIH kết luận chưa đủ bằng chứng để khẳng định nghệ hay curcumin hữu ích cho bất kỳ mục đích sức khoẻ nào.','NCCIH']],
    need:'Không có mức khuyến nghị chính thức. Các nghiên cứu dùng 50–4000 mg mỗi ngày, liều thực tế phụ thuộc dạng bào chế (Examine): curcumin kèm piperin khoảng 500 mg với 5–6,7 mg piperin, 3 lần mỗi ngày; BCM-95 khoảng 500 mg, 2 lần mỗi ngày; nano curcumin 80–240 mg mỗi ngày.',
    how:[
      'Đọc dòng "curcuminoid" hoặc "curcumin" trên nhãn, không đọc "bột nghệ 1000 mg": lượng curcumin thật khác nhau nhiều giữa các sản phẩm (NCCIH).',
      'Uống cùng bữa ăn có chất béo vì curcumin tan trong dầu (kho Obsidian).',
      'Hấp thu rất kém nếu không có công nghệ hỗ trợ. Kho Obsidian ghi piperin tăng hấp thu khoảng 2–20 lần, Meriva (phytosome) khoảng 29 lần, BCM-95 khoảng 7 lần. Các tuyên bố "65 lần" hay "45 lần" của một số hãng chưa có bằng chứng độc lập.'],
    forms:'Curcumin thô, curcumin kèm piperin (tiêu đen), BCM-95, Meriva (phytosome), Theracurmin, nano và liposome (Examine). NCCIH: dạng thô được cho là an toàn trong 2–3 tháng khi dùng đúng liều.',
    cautions:[
      'Tác dụng phụ thường gặp: buồn nôn, nôn, trào ngược, khó chịu dạ dày, tiêu chảy hoặc táo bón (NCCIH).',
      'Đã có báo cáo tổn thương gan ở một số người dùng các dạng tăng hấp thu. Dừng ngay và gặp bác sĩ nếu mệt mỏi, buồn nôn, chán ăn, nước tiểu sẫm màu hoặc vàng da (NCCIH).',
      'Mang thai: có thể không an toàn (NCCIH).',
      'Sỏi mật hoặc tắc nghẽn đường mật: tránh, vì curcumin kích thích co bóp túi mật (kho Obsidian).',
      'Trước phẫu thuật: hỏi bác sĩ, kho Obsidian ghi nên ngừng khoảng 2 tuần.'],
    interactions:[
      'Thuốc chống đông và chống tiểu cầu (warfarin, aspirin, clopidogrel): cộng thêm nguy cơ chảy máu (kho Obsidian).',
      'Piperin ức chế mạnh men CYP3A4, curcumin cũng ức chế nhiều men CYP: có thể ảnh hưởng một số thuốc tim mạch như statin và một số thuốc chẹn kênh canxi (kho Obsidian).',
      'Dùng cùng omega-3 liều cao cộng thêm nguy cơ chảy máu (kho Obsidian).'],
    foods:'Củ nghệ, bột nghệ, cà ri. Lượng curcumin trong thức ăn thấp hơn nhiều so với viên bổ sung.',
    sources:[['NCCIH – Nghệ','https://www.nccih.nih.gov/health/turmeric'],['Examine – Curcumin','https://examine.com/supplements/curcumin/']]},

  creatine:{
    name:'Creatine',aka:'Creatine monohydrate, Creapure',updated:'2026-11-03',
    what:'Hợp chất cơ thể tự tạo ở gan và thận, cũng có trong thịt và cá. Phần lớn nằm trong cơ dưới dạng phosphocreatine, nguồn năng lượng nhanh cho các gắng sức ngắn. Creapure là tên thương hiệu của một nguyên liệu creatine monohydrate (Đức), không phải hoạt chất khác.',
    benefits:[
      ['chac','Tăng công suất ở các gắng sức ngắn, cường độ cao và tăng khối lượng cơ khi tập kháng lực. Sau giai đoạn nạp, hiệu suất tập thường tăng khoảng 10–20%.','ISSN'],
      ['cothe','Người lớn tuổi: các phân tích gộp ghi có thêm cơ và sức mạnh khi kết hợp tập luyện.','ISSN'],
      ['chuaro','Trí nhớ, giấc ngủ, sức bền dài: chưa chắc chắn.','Kho Obsidian']],
    need:'Không có mức khuyến nghị cho người không tập. Theo ISSN: duy trì 3–5 g mỗi ngày; người to con có thể cần 5–10 g. Nạp nhanh (5 g, 4 lần mỗi ngày, trong 5–7 ngày) là tuỳ chọn, không bắt buộc. Uống 3 g mỗi ngày thì chậm hơn: khoảng 28 ngày.',
    how:[
      'Chọn creatine monohydrate. ISSN kết luận chưa có bằng chứng các dạng khác (HCl, ethyl ester, buffered) tốt hơn.',
      'ISSN không đưa hướng dẫn về giờ uống. Uống cùng carbohydrate, hoặc carbohydrate với protein, có vẻ tăng lượng creatine vào cơ nhưng không cần thiết.',
      'Kiểm tra chứng nhận của bên thứ ba, ví dụ NSF Certified for Sport (kho Obsidian).'],
    forms:'Monohydrate là dạng được nghiên cứu nhiều nhất. Creapure là thương hiệu monohydrate. Các dạng khác chưa cho thấy ưu thế rõ ràng.',
    cautions:[
      'Tác dụng phụ duy nhất ghi nhận ổn định là tăng cân, thường 1–2 kg đầu do giữ nước, không phải tăng mỡ (ISSN, kho Obsidian).',
      'Thận: ISSN không thấy bằng chứng thuyết phục là creatine gây hại cho chức năng thận ở người khoẻ hay người có bệnh. Tuy vậy người đã có bệnh thận được khuyên hỏi bác sĩ trước khi dùng.',
      'Creatine có thể làm creatinine huyết thanh tăng nhẹ mà không phản ánh tổn thương thận, nên hãy báo cho bác sĩ khi xét nghiệm (kho Obsidian). ISSN ghi 5–10 g/ngày trong 21 tháng ở cầu thủ bóng bầu dục không làm đổi đáng kể creatinine.',
      'Không gây mất nước hay chuột rút; một số nghiên cứu còn thấy giảm chuột rút (ISSN).',
      'Trẻ em và thiếu niên: ISSN cho là chấp nhận được trong điều kiện có giám sát; mang thai: chưa có kết luận trên người.',
      'Lưu ý minh bạch: các tác giả ISSN có liên hệ tài trợ từ ngành creatine, nên cần đọc cùng các nguồn độc lập.'],
    interactions:[
      'Thuốc ảnh hưởng thận (NSAID dùng lâu, một số thuốc lợi tiểu) và caffeine liều cao: kho Obsidian ghi cần đối chiếu đơn thuốc, nhưng ghi chú này trong kho chưa được xác minh bằng nguồn độc lập.'],
    foods:'Thịt đỏ và cá (cá trích, cá hồi).',
    sources:[['ISSN – đồng thuận về creatine','https://pmc.ncbi.nlm.nih.gov/articles/PMC5469049/']]}
};
