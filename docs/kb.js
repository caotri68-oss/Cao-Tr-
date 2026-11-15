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
    need:'Không có mức khuyến nghị cho người không tập. Theo ISSN: duy trì 3–5 g mỗi ngày; người to con có thể cần 5–10 g. Nạp nhanh (5 g, 4 lần mỗi ngày, trong 5–7 ngày) là tuỳ chọn, không bắt buộc. Uống 3 g mỗi ngày thì chậm hơn: khoảng 28 ngày. MedlinePlus ghi trong các nghiên cứu ở người lớn: nạp tối đa 20 g mỗi ngày trong tối đa 7 ngày, sau đó duy trì 2,25–10 g mỗi ngày trong tối đa 16 tuần.',
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
      'Trẻ em và thiếu niên: ISSN cho là chấp nhận được trong điều kiện có giám sát, nhưng một tổng quan năm 2018 ghi nghiên cứu ở nhóm này rất hạn chế. Mang thai: chưa có kết luận trên người.',
      'Nếu đang dùng thuốc, MedlinePlus khuyên hỏi nhân viên y tế trước khi dùng.',
      'Lưu ý minh bạch: các tác giả ISSN có liên hệ tài trợ từ ngành creatine, nên cần đọc cùng các nguồn độc lập.'],
    interactions:[
      'Thuốc ảnh hưởng thận (NSAID dùng lâu, một số thuốc lợi tiểu) và caffeine liều cao: kho Obsidian ghi cần đối chiếu đơn thuốc, nhưng ghi chú này trong kho chưa được xác minh bằng nguồn độc lập.'],
    foods:'Thịt đỏ và cá (cá trích, cá hồi).',
    sources:[['ISSN – đồng thuận về creatine','https://pmc.ncbi.nlm.nih.gov/articles/PMC5469049/'],['MedlinePlus – Creatine','https://medlineplus.gov/druginfo/natural/873.html']]},

  cu:{
    name:'Đồng',aka:'Copper, měď',updated:'2026-11-03',
    what:'Khoáng chất vi lượng, thành phần của nhiều enzyme trong cơ thể. Nhu cầu rất nhỏ nên thường đủ từ thức ăn. Chất này quan trọng chủ yếu vì liên quan trực tiếp đến kẽm: dùng kẽm liều cao kéo dài có thể gây thiếu đồng.',
    benefits:[
      ['chac','Cần cho nhiều enzyme (kho Obsidian ghi nhu cầu khoảng 0,9 mg mỗi ngày). Thiếu đồng làm thay đổi mỡ máu; nghiên cứu trên động vật ghi nhận bất thường ở tim do giảm hoạt động các enzyme chứa đồng.','NIH'],
      ['chac','Kẽm liều cao kéo dài (từ khoảng 40–50 mg/ngày) có thể gây thiếu đồng: thiếu máu, giảm bạch cầu trung tính.','Kho Obsidian, NIH'],
      ['chuaro','Alzheimer và tim mạch: một số chuyên gia cho rằng thiếu đồng có liên quan, nhưng bằng chứng chưa kết luận được.','NIH']],
    need:'Khoảng 0,9 mg (900 mcg) mỗi ngày (kho Obsidian; NIH ghi viên chứa 15 mg bằng khoảng 17 lần giá trị tham chiếu trên nhãn). Mức tối đa: EFSA 5 mg, NIH 10 mg mỗi ngày.',
    how:[
      'Thường không cần bổ sung riêng: thức ăn đã đủ.',
      'Nếu thiếu đồng do kẽm liều cao, uống thêm đồng không giải quyết được: phải giảm kẽm (kho Obsidian). Vấn đề nằm ở trong tế bào ruột, nơi kẽm làm protein metallothionein giữ chặt đồng và đem đi.',
      'Nếu vẫn dùng cả hai thì uống cách nhau ít nhất 4 giờ (kho Obsidian).',
      'Hấp thu giảm khi lượng đồng ăn vào tăng: khoảng 75% khi ăn rất ít, chỉ khoảng 12% khi ăn nhiều (NIH).'],
    forms:'Đồng oxit (cupric oxide), đồng sulfat, đồng chelate amino acid, đồng gluconat. Chưa có nghiên cứu so sánh sinh khả dụng giữa các dạng (NIH). Viên bổ sung chứa từ vài microgram đến 15 mg.',
    cautions:[
      'Thừa đồng kéo dài gây tổn thương gan và rối loạn tiêu hoá (đau bụng, buồn nôn, tiêu chảy, nôn). Ngộ độc hiếm ở người khoẻ (NIH).',
      'Người mắc bệnh Wilson (rối loạn di truyền chuyển hoá đồng) có nguy cơ cao: không tự bổ sung đồng (NIH).',
      'Nước uống chảy qua ống đồng, nhất là nước đọng lâu, có thể chứa nhiều đồng (NIH).',
      'Dễ thiếu: người mắc bệnh celiac do kém hấp thu; người dùng kẽm liều cao kéo dài (NIH, kho Obsidian).'],
    interactions:[
      'Kẽm liều cao làm giảm hấp thu đồng (NIH, kho Obsidian).',
      'Sắt, kẽm, đồng cạnh tranh hấp thu khi uống cùng lúc; nên tách giờ (kho Obsidian).'],
    foods:'Hàu và hải sản có vỏ, hạt, nội tạng, cám lúa mì, ngũ cốc nguyên hạt, sô-cô-la đen (NIH).',
    sources:[['NIH ODS – Copper','https://ods.od.nih.gov/factsheets/Copper-HealthProfessional/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  astaxanthin:{
    name:'Astaxanthin',aka:'Astaxanthin tảo, Haematococcus pluvialis',updated:'2026-11-03',
    what:'Carotenoid màu đỏ chiết từ tảo Haematococcus pluvialis, có hoạt tính chống oxy hoá mạnh trong ống nghiệm. Khác beta-caroten, astaxanthin không chuyển thành vitamin A, nên không có nguy cơ ngộ độc vitamin A.',
    benefits:[
      ['cothe','Da: giúp giữ độ ẩm và độ đàn hồi, chống xuống cấp theo mùa chứ không trẻ hoá. Phân tích gộp 11 nghiên cứu (162 người dùng so với 131 giả dược, 2–12 mg/ngày, 4–16 tuần). Nếp nhăn thì KHÔNG cải thiện có ý nghĩa (p = 0,11). Nghiên cứu điển hình do nhân viên hãng AstaReal thực hiện.','Kho Obsidian'],
      ['cothe','Phục hồi sau vận động: giảm creatine kinase (chỉ dấu tổn thương cơ) trong phân tích gộp 24 RCT, độ tin cậy trung bình. Giúp đỡ ê mỏi chứ không tăng thành tích.','Kho Obsidian'],
      ['khong','Thành tích thể thao (VO2max, công suất, thành tích chạy đạp): không thấy cải thiện trong phân tích gộp.','Kho Obsidian'],
      ['chuaro','Chống oxy hoá toàn thân: chỉ đạt ý nghĩa ở liều từ 20 mg/ngày trở lên, mà viên bán ở EU tối đa 8 mg. Chính các tác giả kết luận tác dụng chống oxy hoá ở người còn chưa rõ.','Kho Obsidian'],
      ['chuaro','Trí nhớ: phân tích gộp 11 nghiên cứu cho hiệu ứng rất nhỏ (SMD 0,12).','Kho Obsidian'],
      ['khong','"Lão hoá ngược", telomere: không có thử nghiệm người nào. Tuổi thọ chuột đực tăng 12% trong một thử nghiệm năm 2023 nhưng thử lại năm 2026 không tái lập được.','Kho Obsidian']],
    need:'Không có mức khuyến nghị. Các nghiên cứu dùng 2–12 mg cho da và 4–28 mg cho cơ. EU chỉ cho phép viên bổ sung tối đa 8 mg astaxanthin mỗi ngày. EFSA đặt mức ăn vào chấp nhận được hằng ngày (ADI) là 0,2 mg/kg cân nặng, khoảng 12 mg cho người 60 kg, tính cả lượng từ tôm, cua, cá hồi. Mức này EFSA nâng từ 0,034 mg/kg lên 0,2 mg/kg. Theo đánh giá của EFSA năm 2020, người lớn dùng 8 mg astaxanthin mỗi ngày từ viên bổ sung là an toàn; thiếu niên 14–dưới 18 tuổi chạm mức ADI, trẻ 10–dưới 14 tuổi vượt ADI khoảng 28%, và trẻ nhỏ vượt nhiều hơn nữa.',
    how:[
      'Uống cùng bữa có chất béo vì astaxanthin tan trong dầu (kho Obsidian).',
      'Chọn sản phẩm ghi rõ nguồn Haematococcus pluvialis (tảo). Astaxanthin tổng hợp chưa được phê duyệt cho người ở nhiều nước.',
      'Hiệu ứng đo được nằm ở chỉ số máy đo (độ ẩm da, men cơ), không ở cảm giác. Dùng 3 tháng không cảm nhận gì là bình thường (kho Obsidian).',
      'Đừng kỳ vọng "chống lão hoá": dữ liệu người chỉ ủng hộ da và phục hồi cơ.'],
    forms:'Dạng tự nhiên từ H. pluvialis chủ yếu ở dạng ester, kho Obsidian ghi hấp thu và hoạt tính tốt hơn dạng tự do theo nghiên cứu động vật. Các nguyên liệu có nhiều dữ liệu: AstaReal, BioAstin. Viên thật khi bóp ra có màu đỏ sẫm gần đen, không phải cam sáng.',
    cautions:[
      'Người dưới 14 tuổi: EU loại trừ hoàn toàn vì cộng với hải sản sẽ vượt ADI. Không có dữ liệu nhi khoa, không khuyến nghị cho người dưới 18 tuổi (kho Obsidian).',
      'Tác dụng phụ hay gặp nhất: phân hơi đỏ cam do sắc tố, vô hại (phản hồi người dùng, kho Obsidian).',
      'Hàng "astaxanthin" có thể bị làm giả bằng dầu gấc, beta-caroten hoặc astaxanthin tổng hợp; kiểm tra nhãn, mã lô, mua ở nơi uy tín (kho Obsidian).',
      '"An toàn tuyệt đối" là chữ quảng cáo, không dùng.'],
    interactions:[
      'Thuốc hạ huyết áp (astaxanthin có xu hướng hạ nhẹ), thuốc chống đông và chống tiểu cầu (warfarin, clopidogrel), thuốc hạ đường huyết, thuốc chuyển hoá qua CYP3A4: cần đối chiếu đơn thuốc trước khi dùng (kho Obsidian).',
      'Dùng cùng nhiều chất chống oxy hoá liều cao khác chưa có nghiên cứu về an toàn dài hạn (kho Obsidian).'],
    foods:'Cá hồi, tôm, cua (sắc tố đỏ của astaxanthin).',
    sources:[['EFSA Journal 2020;18(2):e05993 – astaxanthin trong thực phẩm bổ sung','https://pmc.ncbi.nlm.nih.gov/articles/PMC7448075'],['Kho Obsidian: Astaxanthin (phụ lục B, 04/09/2026), dẫn phân tích gộp Nutrients 2021 và 2026, GeroScience 2023 và 2026','']]},

  lutein:{
    name:'Lutein và Zeaxanthin',aka:'Carotenoid của mắt, AREDS2',updated:'2026-11-03',
    what:'Hai carotenoid tích luỹ đặc hiệu ở điểm vàng của võng mạc. Chúng lọc ánh sáng xanh và chống oxy hoá cho mắt. Công thức tham chiếu trong y học là AREDS2 của Viện Mắt Quốc gia Mỹ: 10 mg lutein và 2 mg zeaxanthin mỗi ngày (tỷ lệ 5:1).',
    benefits:[
      ['cothe','Thoái hoá điểm vàng: thử nghiệm AREDS2 (Viện Mắt Quốc gia Mỹ, JAMA Ophthalmology 2013) thêm lutein và zeaxanthin vào công thức AREDS gốc. Kết quả chính không khác có ý nghĩa (tiến triển sau 5 năm khoảng 31% so với 29%). Lợi ích nằm ở phân tích phụ: thay beta-caroten bằng lutein và zeaxanthin giảm nguy cơ 18–26%, rõ nhất ở người ăn rất ít lutein (giảm 26%). Công thức AREDS2 cũng hạ kẽm từ 80 mg xuống 25 mg.','Kho Obsidian, NEI qua EuroTimes'],
      ['chuaro','Nguồn thương hiệu (như FloraGLO) so với nguồn thường: AREDS2 không so sánh, nên mua hàng thương hiệu chỉ là mua khả năng truy xuất nguồn gốc, chưa chứng minh hiệu quả vượt trội.','Kho Obsidian']],
    need:'Công thức tham chiếu: 10 mg lutein cộng 2 mg zeaxanthin mỗi ngày (kho Obsidian). Không có mức tối đa chính thức; an toàn ở liều trong nghiên cứu.',
    how:[
      'Uống cùng bữa có chất béo; dạng viên nang mềm (dầu) hấp thu tốt hơn viên nén khô.',
      'Kiểm tra tỷ lệ lutein và zeaxanthin trên nhãn; tỷ lệ gần 5:1 là sát công thức AREDS2.',
      'Dạng free-form (không ester hoá) được xem là hấp thu trực tiếp hơn, ngược với astaxanthin.'],
    forms:'Lutein và zeaxanthin tự do (free-form) hoặc ester. Một số sản phẩm dùng nguyên liệu thương hiệu.',
    cautions:[
      'Không có ngưỡng tối đa chính thức; an toàn ở liều nghiên cứu (kho Obsidian).',
      'Công thức nhiều thành phần có kẽm liều cao: dùng dài hạn có thể gây thiếu đồng, nên hỏi dược sĩ (kho Obsidian).'],
    interactions:['Không đáng kể (kho Obsidian).'],
    foods:'Rau lá xanh đậm (cải xoăn, rau chân vịt), lòng đỏ trứng, ngô.',
    sources:[['AREDS2 – bản tóm tắt kết quả (EuroTimes)','https://escrs.org/channels/eurotimes-articles/areds2-results'],['NIH ODS – Zinc (nhắc đến công thức AREDS)','https://ods.od.nih.gov/factsheets/Zinc-HealthProfessional/'],['Kho Obsidian: Lutein và Zeaxanthin','']]},

  nmn:{
    name:'NMN',aka:'Nicotinamide mononucleotide, tiền chất NAD+',updated:'2026-11-03',
    what:'Hợp chất tự nhiên, tiền chất trực tiếp của NAD+, một coenzyme cần cho hơn 500 phản ứng trong tế bào. Cơ thể tự tạo NAD+ qua nhiều con đường nên không cần NMN từ ngoài. NAD+ giảm theo tuổi chủ yếu do enzyme CD38 tiêu thụ chứ không phải do thiếu nguyên liệu (kho Obsidian).',
    benefits:[
      ['chac','Uống NMN làm tăng NAD+ trong máu, phụ thuộc liều, bão hoà quanh 600 mg/ngày (RCT: Yi 2023, Igarashi 2022, Fukamizu 2022). Ngưng 4 tuần thì NAD+ về mức nền.','Kho Obsidian'],
      ['chac','An toàn ngắn hạn ở liều đã thử (tới 1250 mg/ngày trong 4 tuần): phân tích gộp 15 RCT, 383 người không thấy tăng biến cố bất lợi.','Kho Obsidian'],
      ['khong','Lực nắm tay và khối cơ: phân tích gộp 10 RCT (người trên 60 tuổi, NMN và NR) không có chỉ số nào đạt ý nghĩa.','Kho Obsidian'],
      ['chuaro','Độ nhạy insulin: một thử nghiệm nhỏ (n=25) có kết quả tốt, nhưng phân tích gộp 8 RCT với 342 người không đạt ý nghĩa (p = 0,06).','Kho Obsidian'],
      ['chuaro','Tốc độ đi bộ, giấc ngủ, sức bền: các nghiên cứu mâu thuẫn nhau; nhiều RCT do nhà sản xuất tài trợ.','Kho Obsidian'],
      ['khong','Kéo dài tuổi thọ ở người, "đảo ngược Alzheimer": chưa có nghiên cứu người nào. Các tác dụng này chỉ có trên chuột và sinh vật mô hình.','Kho Obsidian']],
    need:'Không có nhu cầu khuyến nghị. Liều có bằng chứng làm tăng NAD+ là 250–600 mg mỗi ngày, trên 600 mg không hơn. EFSA ra ý kiến an toàn tích cực (tháng 5/2026) cho NMN tổng hợp của một hãng, tới 300 mg mỗi ngày ở người lớn, loại trừ phụ nữ mang thai và cho con bú. 300 mg NMN tương đương khoảng 109,7 mg nicotinamide, thấp hơn mức tối đa 900 mg mỗi ngày của nicotinamide. Đây là ý kiến an toàn cho một hồ sơ, không phải giấy phép bán và không phải mức tối đa chính thức. Úc (TGA) cấp phép tối đa 500 mg mỗi ngày, chỉ người lớn.',
    how:[
      'NMN tan trong nước, không cần uống cùng chất béo; lời đồn "phải uống cùng dầu" là vô căn cứ (kho Obsidian).',
      'Uống một lần mỗi ngày. Sáng hay chiều: chưa ai biết chắc. Một RCT cho thấy nhóm uống buổi chiều ít buồn ngủ ban ngày hơn; chọn chiều nếu khó ngủ.',
      'Giữ dưới 600 mg mỗi ngày: trên mức này chỉ tăng gánh nặng chuyển hoá, không tăng hiệu quả.',
      'Nếu muốn thử, làm có kế hoạch: đặt mục tiêu đo được và dừng nếu không thấy lợi.',
      'Tình trạng pháp lý EU: NMN chưa được cấp phép như thực phẩm mới, và chưa có công bố sức khoẻ nào được duyệt. Nicotinamide riboside (NR), họ hàng gần, đã được EU cấp phép từ 2019 với bằng chứng lâm sàng tương đương (cùng âm tính trong phân tích gộp).'],
    forms:'Viên nang, bột, dạng liposome và dạng ngậm dưới lưỡi. Tuyên bố liposome hay ngậm dưới lưỡi hấp thu tốt hơn chưa có bằng chứng độc lập (kho Obsidian).',
    cautions:[
      'Người có tiền sử ung thư hoặc đang điều trị ung thư: không dùng. Mức bằng chứng chỉ ở tiền lâm sàng, nhưng hậu quả không thể đảo ngược nên áp dụng nguyên tắc phòng ngừa (kho Obsidian).',
      'Phụ nữ mang thai, cho con bú: loại trừ khỏi đánh giá của EFSA. Người dưới 18 tuổi: không khuyến nghị, chưa có RCT nào ở người dưới 20 tuổi (kho Obsidian).',
      'Trong thử nghiệm 90 ngày ở chuột, EFSA ghi nhận ảnh hưởng lên cơ quan sinh sản ở liều cao; EFSA vẫn kết luận an toàn ở liều 300 mg với biên an toàn 93, và loại trừ phụ nữ mang thai, cho con bú.',
      'Tim mạch: chất chuyển hoá cuối của niacin (2PY, 4PY) cao trong máu liên quan biến cố tim mạch trong một nghiên cứu Nature Medicine 2024; mới là quan sát và chuột, chưa chứng minh nhân quả. Vì vậy không nên dùng nhiều năm mà không theo dõi (kho Obsidian).',
      'Giả thuyết dùng lâu dài liều cao có thể làm cạn nhóm methyl của tế bào (cơ chế, chưa có dữ liệu người) (kho Obsidian).',
      'Người trên 65 tuổi hoặc có bệnh nền: hỏi bác sĩ, vì chưa có nghiên cứu tương tác thuốc ở người.'],
    interactions:[
      'Chưa có nghiên cứu tương tác thuốc trên người với NMN. Các ý dưới đây là ngoại suy từ nicotinamide hoặc cơ chế (kho Obsidian):',
      'Hoá trị và điều trị đích: có thể đối kháng, tránh trong chu kỳ hoá trị.',
      'Thuốc tiểu đường (metformin, insulin, sulfonylurea): có thể cộng thêm nguy cơ hạ đường huyết.',
      'Thuốc hạ huyết áp: có thể cộng dồn tác dụng hạ áp.',
      'Thuốc chống lao (isoniazid, pyrazinamide): theo dõi nguy cơ thiếu niacin.',
      'Chống đông, chống tiểu cầu: nicotinamide 3000 mg/ngày có thể gây giảm tiểu cầu; ở 250–600 mg thì chưa có dữ liệu.'],
    foods:'Không cần nạp từ thức ăn: cơ thể tự tạo NAD+ từ nhiều nguyên liệu (kho Obsidian).',
    sources:[['NutraIngredients – EFSA ý kiến an toàn NMN (tin chuyên ngành, một số bài trên trang này là nội dung tài trợ của hãng)','https://www.nutraingredients.com/Article/2026/05/13/efsa-gives-positive-safety-opinion-on-nmn/'],['Kho Obsidian: NMN (gộp hai bản tra cứu, 05/09/2026), dẫn Prokopidis 2025, Yi 2023, Kim 2022, Ferrell 2024','']]},

  pqq:{
    name:'PQQ',aka:'Pyrroloquinoline quinone',updated:'2026-11-03',
    what:'Hợp chất chống oxy hoá được nghiên cứu về khả năng kích thích tạo ty thể mới và hỗ trợ nhận thức. Không phải vi chất thiết yếu. EFSA cấp phép là thực phẩm mới năm 2017–2018.',
    benefits:[
      ['chuaro','Trí nhớ: một RCT (n=70, 20 mg/ngày, 12 tuần) cải thiện trí nhớ tổng hợp và trí nhớ ngôn từ. Nhưng RCT này do chính hãng sản xuất nguyên liệu BioPQQ tài trợ 100%.','Kho Obsidian'],
      ['chuaro','Người có suy giảm nhận thức nhẹ (n=34, 6 tuần): một số chỉ số cải thiện nhưng thang MMSE (chỉ số chuẩn) không khác biệt có ý nghĩa; tác giả có liên hệ tài chính với nhà cung cấp.','Kho Obsidian'],
      ['chuaro','Chưa tìm được RCT độc lập hoàn toàn không do ngành tài trợ. Độ tin cậy tổng thể: trung bình đến thấp.','Kho Obsidian']],
    need:'Không có nhu cầu khuyến nghị. Liều trong thử nghiệm: 20 mg mỗi ngày, cũng là mức tối đa EU cho phép với thực phẩm mới. Ý kiến của EFSA năm 2017 dựa trên mức không gây hại quan sát được (NOAEL) 100 mg/kg ở chuột trong thử nghiệm 90 ngày, với biên an toàn 344 so với liều 20 mg mỗi ngày. EFSA cũng ghi dữ liệu về hấp thu và chuyển hoá của PQQ ở người còn hạn chế.',
    how:[
      'Dạng muối disodium tan trong nước. Các thương hiệu (BioPQQ, MGCPQQ, PureQQ) cùng một dạng hoá học, không có dữ liệu cho thấy công nghệ hấp thu khác nhau có ưu thế.',
      'Không có dữ liệu về chất đi kèm bắt buộc.'],
    forms:'PQQ disodium salt, nhiều thương hiệu cùng dạng này.',
    cautions:[
      'Phụ nữ mang thai và cho con bú: không dùng (điều kiện cấp phép của EFSA).',
      'Thử nghiệm trên động vật ở liều rất cao ghi nhận độc tính thận và kết tinh trong nước tiểu (kho Obsidian).'],
    interactions:['Chưa tìm thấy dữ liệu tương tác thuốc cụ thể.'],
    foods:'Có lượng rất nhỏ trong một số thực phẩm; cơ thể không cần nạp từ ngoài.',
    sources:[['EFSA 2017 – an toàn của PQQ disodium salt','https://efsa.europa.eu/en/efsajournal/pub/5058'],['Kho Obsidian: PQQ (24/08/2026), dẫn RCT Food & Function 2023','']]},

  blackgarlic:{
    name:'Tỏi đen',aka:'Black garlic, aged garlic extract, S-allyl cysteine (SAC)',updated:'2026-11-03',
    what:'Tỏi trắng ủ nhiệt ở 60–80 °C, độ ẩm cao, 1–4 tuần. Allicin bị phá huỷ, tạo ra S-allyl-L-cysteine (SAC), chất tan trong nước, hấp thu tốt, và là chất duy nhất có bằng chứng lâm sàng. Hàm lượng SAC chênh nhau hai bậc độ lớn giữa các quy trình.',
    benefits:[
      ['cothe','Hạ huyết áp ở người đã tăng huyết áp. Thử nghiệm Ried 2013 (79 người) thấy huyết áp tâm thu giảm 11,8 mmHg ở liều 1,2 mg SAC. Phân tích gộp 10 RCT năm 2025 cho kết quả nhỏ hơn: giảm 4,2 mmHg (tâm thu) và 3,1 mmHg (tâm trương). Các tác giả tự nhận tác động có thể hạn chế.','Kho Obsidian'],
      ['cothe','Tăng nhẹ HDL (cholesterol tốt).','Kho Obsidian'],
      ['chuaro','NCCIH (về tỏi nói chung): bằng chứng hạn chế cho thấy viên tỏi có thể giảm huyết áp chút ít ở người đã tăng huyết áp. Một tổng quan năm 2022 chỉ tìm được hai nghiên cứu, cả hai nhỏ và có hạn chế.','NCCIH'],
      ['chuaro','Miễn dịch, chức năng gan, "tinh thần thoải mái": chưa có bằng chứng độc lập.','Kho Obsidian'],
      ['khong','Chống ung thư, thải độc: chưa có bằng chứng lâm sàng đủ mạnh ở người.','Kho Obsidian']],
    need:'Liều SAC có hiệu quả chi phí theo kho Obsidian: khoảng 1,2–1,25 mg SAC mỗi ngày, tương đương 480–500 mg chiết xuất chuẩn hoá. Liều cao hơn (2,4 mg) cho kết quả mâu thuẫn và tăng tác dụng phụ tiêu hoá. Không có mức tối đa chính thức.',
    how:[
      'Uống sau ăn để bớt khó chịu dạ dày.',
      'Chọn sản phẩm công bố rõ hàm lượng SAC. Sản phẩm không ghi SAC thì không so sánh và không đánh giá được.',
      'Cẩn thận hàng giả: thị trường chiết xuất tỏi ủ có biến thiên lớn, có gian lận (chất tổng hợp rẻ hơn, khai sai hàm lượng). Nhãn ghi SAC không bảo đảm có SAC thật trong viên.',
      'Nếu uống để hạ huyết áp, hãy đo huyết áp trước để biết có cần hay không.'],
    forms:'Tỏi đen nguyên tép, bột và chiết xuất tỏi ủ chuẩn hoá theo SAC (ví dụ Kyolic). Tép thật dẻo, đen đồng nhất đến lõi.',
    cautions:[
      'EFSA chưa phê duyệt bất kỳ công bố sức khoẻ nào cho tỏi. Các câu in trên hộp bán ở Séc nằm trong danh sách chờ xử lý. "Được phép in" khác với "đã chứng minh".',
      'Tác dụng phụ tiêu hoá phụ thuộc liều (táo bón, đầy hơi, trào ngược): khoảng 15% ở liều thấp, 32% ở liều 4 viên.',
      'Dị ứng tỏi. Không dùng cho trẻ dưới 3 tuổi theo nhãn các sản phẩm bán ở Séc.',
      'Mang thai, cho con bú: tỏi dạng viên với lượng nhiều hơn trong thức ăn có thể không an toàn (NCCIH).',
      'Ngừng 7–10 ngày trước mọi phẫu thuật, kể cả nhổ răng: có báo cáo chảy máu sau mổ.',
      'An toàn dài hạn của chiết xuất cô đặc trên 24 tuần: chưa có dữ liệu.'],
    interactions:[
      'Thuốc chống đông và chống tiểu cầu (warfarin, acenocoumarol, aspirin, clopidogrel): tăng nguy cơ chảy máu. Một nghiên cứu nhỏ cho thấy chiết xuất tỏi ủ có thể an toàn với người dùng warfarin, nhưng một nghiên cứu nhỏ chưa đủ để bỏ qua cảnh báo.',
      'Thuốc hạ đường huyết (metformin, sulfonylurea): có thể tăng tác dụng, nguy cơ hạ đường huyết.',
      'Thuốc ức chế protease (điều trị HIV): có thể giảm nồng độ thuốc.',
      'Thuốc tiêu sợi huyết: tăng nguy cơ xuất huyết (kho Obsidian).'],
    foods:'Tỏi đen (tỏi ủ nhiệt), tỏi trắng. Tỏi đen gần như không có mùi hăng của tỏi thường.',
    sources:[['NCCIH – Tỏi','https://nccih.nih.gov/health/garlic'],['Kho Obsidian: Tỏi đen (02/09/2026), dẫn Ried 2013, phân tích gộp Front Nutr 2025, NutraIngredients 12/2024','']]},

  boswellia:{
    name:'AKBA Boswellia',aka:'Boswellia serrata, nhũ hương Ấn Độ',updated:'2026-11-03',
    what:'Chiết xuất nhựa cây trầm hương Ấn Độ, chuẩn hoá theo hàm lượng boswellic acid, trong đó AKBA là hoạt chất mạnh nhất. Cơ chế: ức chế enzyme 5-LOX (tham gia tạo chất gây viêm), khác với thuốc NSAID vốn ức chế COX nên ít ảnh hưởng dạ dày hơn.',
    benefits:[
      ['chuaro','Thoái hoá khớp: kho Obsidian ghi các thử nghiệm trên người cho thấy giảm đau và cải thiện vận động sau 4–8 tuần, hiệu quả khiêm tốn. NCCIH đánh giá thận trọng hơn: nghiên cứu phần lớn nhỏ và chất lượng thấp, chưa đủ bằng chứng để kết luận nhựa trầm hương hiệu quả. Một tổng quan hệ thống năm 2008 gọi bằng chứng là "khuyến khích nhưng chưa thuyết phục".','Kho Obsidian, NCCIH'],
      ['chuaro','Các công dụng khác như tiêu hoá, hen suyễn: chưa có bằng chứng độc lập ở liều thực phẩm chức năng thông thường.','Kho Obsidian (ghi chú chưa rà)']],
    need:'Theo nhãn: chiết xuất chuẩn hoá khoảng 85% boswellic acid, 20% AKBA (ví dụ 400 mg chiết xuất chứa khoảng 80 mg AKBA). Dùng cùng bữa ăn có chất béo.',
    how:[
      'Uống cùng bữa ăn có chất béo để hấp thu.',
      'Đánh giá sau 8 tuần: nếu không đỡ đau khớp thì nên ngừng, đừng dùng kéo dài không cần thiết.',
      'Lưu ý: phần liều và cơ chế lấy từ ghi chú thô chưa rà của kho Obsidian. Phần hiệu quả và an toàn đã đối chiếu với NCCIH.'],
    forms:'Chiết xuất chuẩn hoá theo boswellic acid và AKBA; một số sản phẩm dùng nguyên liệu thương hiệu (ví dụ AprèsFlex).',
    cautions:[
      'NCCIH: dùng đường uống có vẻ an toàn ở các liều đã nghiên cứu, tới 1000 mg mỗi ngày trong các thử nghiệm kéo dài tới 6 tháng. Chưa ghi nhận chống chỉ định nghiêm trọng ở liều thông thường (kho Obsidian).'],
    interactions:[
      'Kho Obsidian không ghi tương tác đáng kể với thuốc tim mạch, tuyến giáp hay statin.',
      'Curcumin, omega-3 và boswellia đều có tác dụng chống kết tập tiểu cầu nhẹ; dùng cả ba cùng lúc, hoặc cùng thuốc chống đông, là tổ hợp cần rà soát (kho Obsidian).'],
    foods:'Không có trong thức ăn thông thường.',
    sources:[['NCCIH – Boswellia','https://www.nccih.nih.gov/health/boswellia'],['Kho Obsidian: AKBA Boswellia (22/08/2026, ghi chú chưa rà)','']]},

  collagen:{
    name:'Collagen',aka:'Collagen thuỷ phân (peptide), collagen typ II không biến tính (UC-II)',updated:'2026-11-03',
    what:'Protein cấu trúc của da, gân, sụn, xương. "Collagen" trên nhãn là hai nhóm rất khác nhau: collagen thuỷ phân (peptide) làm nguyên liệu cho sụn và gân, cần liều tính bằng gam; collagen typ II không biến tính tác động qua dung nạp miễn dịch đường ruột, theo lý thuyết chỉ cần microgram đến chục miligam.',
    benefits:[
      ['cothe','Collagen peptide cho khớp và gân: có thử nghiệm với liều 5–10 gam mỗi ngày (Clark 2008, Zdzieblik 2017). Một phân tích gộp các RCT năm 2023 ghi giảm đau có ý nghĩa so với giả dược nhưng dị biệt giữa các nghiên cứu cao (I² 68%); một phân tích gộp 11 RCT với 870 người năm 2024 cũng được công bố. Tôi không tìm thấy tổng quan Cochrane về collagen.','Kho Obsidian, kết quả tìm kiếm tài liệu 03/11/2026'],
      ['cothe','Da: các tổng quan ghi collagen uống cải thiện nhẹ độ ẩm và độ đàn hồi, không ngăn được nếp nhăn. Nhiều nghiên cứu trước đây do ngành tài trợ.','Kết quả tìm kiếm tài liệu 03/11/2026, chưa kiểm chứng tạp chí gốc'],
      ['chuaro','Collagen typ II không biến tính cho thoái hoá khớp gối: thử nghiệm Lugo 2016 dùng 40 mg sản phẩm, trong đó collagen typ II thật chỉ khoảng 1,2 mg (đã đính chính từ con số ~10 mg).','Kho Obsidian'],
      ['chuaro','Collagen typ II ở liều microgram (20–2500 µg) được thử trong viêm khớp dạng thấp (Barnett 1998, liều 20 µg đáp ứng tốt nhất). Áp dụng sang thoái hoá khớp là suy đoán.','Kho Obsidian'],
      ['chuaro','Hướng dẫn của ACR và Arthritis Foundation về thoái hoá khớp không nhắc đến collagen ở mức khuyến cáo nào: không bị bác bỏ mà chưa đủ dữ liệu để được xét.','Kho Obsidian']],
    need:'Không có nhu cầu khuyến nghị. Liều trong các thử nghiệm: 5–10 g collagen peptide mỗi ngày. Một số sản phẩm bán ở Séc chỉ chứa vài chục miligam collagen, thấp hơn liều thử nghiệm hàng trăm lần.',
    how:[
      'Đọc dòng "mg collagen" trên nhãn, không đọc tên công thức hay số "gấp đôi". "2x mạnh hơn" có thể chỉ là so với bản cũ của chính sản phẩm.',
      'Vitamin C cần cho tổng hợp collagen; nhiều viên chỉ chứa 20 mg (25% giá trị tham chiếu).',
      'Cần dùng tối thiểu khoảng 2 tháng mới đánh giá được.',
      'Điểm số "NutraRating" trên một số trang bán hàng là điểm nội bộ của cửa hàng, không phải kiểm nghiệm độc lập.'],
    forms:'Collagen biển (từ cá), collagen động vật (gelatin), collagen thuỷ phân (Verisol, Peptan), UC-II và collagen typ II không biến tính. Không có thử nghiệm độc lập trực tiếp cho từng sản phẩm liều thấp trên thị trường.',
    cautions:[
      'Nguồn cá hoặc gelatin động vật: không hợp với người ăn chay, người dị ứng cá; một số viên có dầu đậu nành (kho Obsidian).',
      'Phụ nữ mang thai, cho con bú: tránh.',
      'Hướng dẫn ACR và Arthritis Foundation khuyến cáo MẠNH không dùng glucosamin cho thoái hoá khớp; hãy tách bạch collagen với glucosamin (kho Obsidian).'],
    interactions:['Ở liều thấp không ghi nhận tương tác thuốc đáng kể. Một số viên có kẽm vài mg: nhớ cộng vào tổng kẽm mỗi ngày (kho Obsidian).'],
    foods:'Collagen có trong da, sụn, xương động vật; cơ thể tự tổng hợp từ protein và vitamin C.',
    sources:[['Kho Obsidian: Collagen nativní liều thấp (31/08 và 02/09/2026), dẫn Lugo 2016, Barnett 1998, Clark 2008, Zdzieblik 2017','']]},

  folic:{
    name:'Axit folic',aka:'Folate (vitamin B9), folic acid, 5-MTHF',updated:'2026-11-03',
    what:'Vitamin nhóm B, cần để tạo DNA và hồng cầu và tham gia chuyển hoá homocysteine. "Folate" là dạng tự nhiên trong thức ăn; "axit folic" là dạng tổng hợp trong viên và thực phẩm tăng cường. Nhãn thường ghi theo DFE (đương lượng folate trong thức ăn).',
    benefits:[
      ['chac','Phòng dị tật ống thần kinh ở thai nhi khi bổ sung trước và trong thai kỳ (các dị tật cột sống, hộp sọ và não hình thành ở ngày 21–28 sau thụ thai). Nhu cầu tăng từ 400 lên 600 mcg DFE khi mang thai.','NIH'],
      ['chuaro','Tim mạch và đột quỵ: homocysteine cao liên quan tăng nguy cơ tim mạch, và các vitamin B trong đó có folate tham gia chuyển hoá homocysteine, nên được giả thuyết là giảm nguy cơ. Kết quả các nghiên cứu về tác dụng của việc bổ sung chưa kết luận được.','NIH'],
      ['chuaro','Sa sút trí tuệ và trí nhớ: các nghiên cứu quan sát thấy homocysteine cao liên quan, hiệu quả của việc bổ sung chưa rõ.','NIH'],
      ['chuaro','Trầm cảm: folate thấp liên quan đến trầm cảm và đáp ứng kém với thuốc chống trầm cảm ở một số nghiên cứu, không phải tất cả.','NIH'],
      ['chuaro','Ung thư: nhiều nghiên cứu quan sát thấy ăn nhiều folate đi cùng nguy cơ thấp hơn, nhưng bản chất tác dụng chưa được xác lập.','NIH']],
    need:'Theo NIH: 400 mcg DFE mỗi ngày cho người lớn, 600 mcg DFE khi mang thai. Viên bổ sung thường 400–800 mcg axit folic (tương đương 680–1360 mcg DFE). Mức tối đa cho axit folic từ viên: 1000 mcg mỗi ngày (EFSA và NIH).',
    how:[
      'Axit folic uống cùng bữa ăn hấp thu khoảng 85%; uống lúc đói gần như 100% (NIH).',
      'Dạng 5-MTHF (đã hoạt hoá) có sinh khả dụng bằng hoặc cao hơn axit folic. NIH ghi một số người có biến thể gen MTHFR có thể hợp với 5-MTHF hơn, nhưng chưa có hệ số quy đổi DFE chính thức cho 5-MTHF.',
      'Nếu cần liều cao hơn mức thường dùng, hỏi bác sĩ, nhất là khi định mang thai.',
      'Đọc nhãn: "mcg DFE" khác "mcg axit folic". 400 mcg axit folic ghi là 680 mcg DFE.'],
    forms:'Axit folic (tổng hợp), 5-methyltetrahydrofolate (5-MTHF), folinic acid. Folate tự nhiên có trong thức ăn nhưng dễ mất khi nấu.',
    cautions:[
      'Lượng lớn axit folic có thể che giấu thiếu vitamin B12: chữa được thiếu máu nhưng không chữa được tổn thương thần kinh. NIH ghi mối lo đã chuyển sang khả năng lượng lớn làm nặng thêm thiếu máu và triệu chứng nhận thức khi thiếu B12 (NIH).',
      'Có lo ngại liều axit folic cao có thể làm tiến triển nhanh hơn các tổn thương tiền ung thư ở một số người (NIH). Vì vậy giữ dưới mức tối đa 1000 mcg.',
      'Rượu cản hấp thu folate và làm tăng thải folate; người nghiện rượu thường thiếu (NIH).'],
    interactions:[
      'Methotrexate (thuốc ung thư và tự miễn) là chất đối kháng folate. Bệnh nhân dùng methotrexate trị ung thư phải hỏi bác sĩ ung thư trước khi dùng folate. Với liều thấp trị viêm khớp dạng thấp hoặc vảy nến, folate có thể giảm tác dụng phụ tiêu hoá, nhưng vẫn cần bác sĩ hướng dẫn (NIH).',
      'Thuốc chống động kinh (phenytoin, carbamazepine, valproate): có tương tác với folate, hãy hỏi bác sĩ (NIH).'],
    foods:'Rau lá xanh đậm (rau chân vịt), gan, măng tây, cải Brussels, đậu, trái cây, ngũ cốc tăng cường axit folic (NIH).',
    sources:[['NIH ODS – Folate','https://ods.od.nih.gov/factsheets/Folate-HealthProfessional/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  niacin:{
    name:'Niacin (B3)',aka:'Nicotinic acid, nicotinamide (niacinamide), inositol hexanicotinate',updated:'2026-11-03',
    what:'Vitamin B3, cần để tạo NAD và NADP, hai coenzyme trong chuyển hoá năng lượng. Có hai dạng chính trong viên là nicotinic acid và nicotinamide; hai dạng này có độc tính khác nhau.',
    benefits:[
      ['chac','Phòng và chữa thiếu niacin (bệnh pellagra). Thiếu hay gặp ở người suy dinh dưỡng, nghiện rượu, bệnh viêm ruột.','NIH'],
      ['cothe','Liều rất cao nicotinic acid (hơn 100 lần nhu cầu, dùng nhiều tháng đến nhiều năm) là một điều trị rối loạn mỡ máu. Nicotinamide không có tác dụng này. Đây là việc của bác sĩ kê đơn, không tự dùng.','NIH']],
    need:'Thức ăn thường đủ. Một số viên chỉ có niacin chứa từ 500 mg trở lên, cao hơn nhu cầu rất nhiều (NIH). Mức tối đa từ viên: NIH 35 mg (nicotinic acid); EFSA 10 mg nicotinic acid và 900 mg nicotinamide mỗi ngày.',
    how:[
      'Đọc nhãn xem là nicotinic acid hay nicotinamide. Nicotinamide không gây đỏ bừng da; nicotinic acid thì có.',
      'Dạng phóng thích kéo dài giảm đỏ bừng. Viên "flush free" (inositol hexanicotinate) cũng không gây đỏ bừng (NIH).',
      'Niacin ghi theo đơn vị NE (đương lượng niacin). Cộng tổng từ đa vitamin, B-complex và viên niacin riêng.'],
    forms:'Nicotinic acid, nicotinamide, inositol hexanicotinate. Một số sản phẩm niacin liều cao dạng phóng thích kéo dài.',
    cautions:[
      'Nicotinic acid từ 30–50 mg trở lên thường gây đỏ bừng mặt, tay, ngực kèm bỏng rát, ngứa, châm chích. Thường thoáng qua và là khó chịu hơn là độc, nhưng có thể kèm đau đầu, phát ban, chóng mặt, tụt huyết áp (NIH).',
      'Nicotinic acid liều từ khoảng 1,5 g mỗi ngày trở lên có thể làm tăng đường huyết ở cả người có và không có tiểu đường (NIH).',
      'Niacin trong thức ăn không gây tác dụng phụ (NIH).',
      'Dễ thiếu: người suy dinh dưỡng, nghiện rượu, bệnh viêm ruột, xơ gan, thiếu riboflavin, B6 hoặc sắt (vì chuyển tryptophan thành niacin kém) (NIH).'],
    interactions:[
      'Thuốc lao isoniazid và pyrazinamide: cản trở tạo niacin, có thể gây pellagra, phòng được bằng tăng niacin (NIH).',
      'Thuốc hạ đường huyết: nicotinic acid liều lớn làm tăng đường huyết, đối kháng với thuốc (NIH).',
      'Statin và nicotinic acid liều cao: nguy cơ bệnh cơ gắn với nicotinic acid liều cao, không phải nicotinamide (kho Obsidian dẫn NIH).'],
    foods:'Gia cầm, thịt bò, cá (khoảng 5–10 mg mỗi khẩu phần); hạt, đậu, ngũ cốc (2–5 mg, một số dạng chỉ hấp thu khoảng 30%); thực phẩm tăng cường niacin (NIH).',
    sources:[['NIH ODS – Niacin','https://ods.od.nih.gov/factsheets/Niacin-HealthProfessional/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  probiotic:{
    name:'Men vi sinh',aka:'Probiotics, Lactobacillus, Bifidobacterium, Saccharomyces boulardii',updated:'2026-11-03',
    what:'Vi sinh vật sống có chủ đích mang lại lợi ích sức khoẻ khi dùng. Phổ biến nhất là các nhóm vi khuẩn Lactobacillus và Bifidobacterium; còn có nấm men Saccharomyces boulardii. Có trong sữa chua, thực phẩm lên men và viên bổ sung. Các chủng khác nhau có thể có tác dụng khác nhau.',
    benefits:[
      ['cothe','Tiêu chảy cấp, tiêu chảy do kháng sinh và chàm thể tạng (atopic eczema): có một số bằng chứng cho thấy men vi sinh có thể giúp.','NCCIH'],
      ['chuaro','Táo bón: một tổng quan thấy có lợi ở người lớn, một tổng quan khác không thấy chủng nào giúp được trẻ em.','NCCIH'],
      ['chuaro','Hầu hết các tình trạng còn lại: thiếu bằng chứng khoa học mạnh.','NCCIH']],
    need:'Không có nhu cầu khuyến nghị. Hiệu quả phụ thuộc chủng cụ thể và liều đã được thử nghiệm cho đúng mục đích, nên không thể suy từ chủng này sang chủng khác.',
    how:[
      'Chọn sản phẩm ghi rõ tên chủng đầy đủ (loài và mã chủng) và lượng vi sinh vật sống (CFU) đến hạn dùng. Đây là lời khuyên chung chứ không phải khuyến nghị riêng của NCCIH.',
      'Dùng cho một mục đích rõ ràng (ví dụ phòng tiêu chảy khi dùng kháng sinh) và đánh giá sau một thời gian; không đạt thì ngừng.',
      'Thực phẩm lên men như sữa chua cũng cung cấp vi sinh vật sống.'],
    forms:'Viên nang, bột, dạng nước và thực phẩm lên men. Nhiều sản phẩm bán như thực phẩm chức năng, không phải duyệt trước như thuốc.',
    cautions:[
      'Đã có báo cáo nhiễm trùng nặng hoặc tử vong ở trẻ sinh non được cho dùng men vi sinh; FDA đã cảnh báo nhân viên y tế về nguy cơ này (NCCIH).',
      'Tác dụng phụ thường ít, nhưng dữ liệu an toàn, nhất là lâu dài, còn hạn chế. Biến cố nặng có khả năng xảy ra hơn ở người có bệnh nền (NCCIH).',
      'Người suy giảm miễn dịch, có bệnh nặng hoặc đặt ống thông: hỏi bác sĩ trước khi dùng.',
      'FDA chưa duyệt công bố sức khoẻ nào cho men vi sinh (NCCIH).'],
    interactions:['Trang NCCIH tôi đọc không nêu tương tác thuốc cụ thể. Người dùng thuốc ức chế miễn dịch cần hỏi bác sĩ.'],
    foods:'Sữa chua, kefir, thực phẩm lên men.',
    sources:[['NCCIH – Men vi sinh','https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety']]},

  gluco:{
    name:'Glucosamin và chondroitin',aka:'Glucosamine, chondroitin sulfate',updated:'2026-11-03',
    what:'Hai chất liên quan đến sụn khớp, thường bán cùng nhau để dùng cho thoái hoá khớp. Bán rất phổ biến, nhưng bằng chứng khá yếu.',
    benefits:[
      ['chuaro','Đau thoái hoá khớp gối: các nghiên cứu cho kết quả mâu thuẫn. Một số thử nghiệm ủng hộ chondroitin hoặc phối hợp, nhưng mức cải thiện ở phần lớn nghiên cứu có thể quá nhỏ để người bệnh cảm nhận được.','NCCIH'],
      ['chuaro','Cấu trúc khớp: chưa rõ có làm chậm tổn thương khớp hay không.','NCCIH'],
      ['khong','Hướng dẫn của Hội Thấp khớp Mỹ (ACR) và Arthritis Foundation năm 2019 khuyến cáo MẠNH không dùng glucosamin cho thoái hoá khớp háng, gối, bàn tay. Chondroitin chỉ được khuyến cáo có điều kiện cho thoái hoá khớp bàn tay.','NCCIH, kho Obsidian']],
    need:'Không có liều khuyến nghị chính thức. NCCIH không nêu một liều cụ thể; liều trên nhãn khác nhau giữa các sản phẩm.',
    how:[
      'Nếu muốn thử, hãy đặt mục tiêu rõ (giảm đau khớp) và đánh giá sau 2–3 tháng. Không thấy lợi thì ngừng.',
      'Các sản phẩm phối hợp hay kèm thêm thành phần; hãy đọc từng dòng trên nhãn.',
      'Hỏi bác sĩ về các lựa chọn điều trị thoái hoá khớp có bằng chứng tốt hơn.'],
    forms:'Glucosamin (sulfat hoặc hydrochloride), chondroitin sulfat, thường bán phối hợp, đôi khi kèm collagen, MSM hoặc nghệ.',
    cautions:[
      'Các nghiên cứu lớn không thấy vấn đề an toàn lớn với glucosamin và chondroitin (NCCIH).',
      'Glucosamin có thể làm tăng đường huyết ở một số người; người bị tiểu đường theo dõi đường huyết (NCCIH).',
      'Thông tin về an toàn khi mang thai và cho con bú còn ít (NCCIH).'],
    interactions:[
      'Warfarin: glucosamin và chondroitin liên quan tăng nguy cơ chảy máu ở người dùng thuốc chống đông này (NCCIH).',
      'Thuốc hạ đường huyết: glucosamin có thể làm tăng đường huyết (NCCIH).'],
    foods:'Không có hướng dẫn về nguồn thực phẩm.',
    sources:[['NCCIH – Glucosamin và chondroitin','https://www.nccih.nih.gov/health/chondroitin']]},

  coq10:{
    name:'CoQ10',aka:'Coenzyme Q10, ubiquinone, ubiquinol',updated:'2026-11-03',
    what:'Chất tan trong dầu cơ thể tự tạo, tham gia tạo năng lượng trong ty thể và có tác dụng chống oxy hoá. Có hai dạng trong viên: ubiquinone và ubiquinol (dạng khử, đã sẵn hoạt hoá).',
    benefits:[
      ['khong','Đau cơ do statin: bằng chứng tổng thể không ủng hộ việc CoQ10 làm giảm đau cơ do thuốc hạ mỡ máu nhóm statin, dù các nghiên cứu riêng lẻ có kết quả khác nhau.','NCCIH'],
      ['chuaro','Các công dụng khác: bài này chưa đối chiếu được nguồn độc lập nên không nêu mức bằng chứng. Hãy hỏi bác sĩ nếu định dùng cho bệnh tim hoặc đau nửa đầu.','Chưa có nguồn đã đọc']],
    need:'Không có nhu cầu khuyến nghị. Trong các thử nghiệm với statin, liều dùng 100–200 mg mỗi ngày, mẫu nhỏ, khoảng 12 tuần. Đây là liều nghiên cứu, không phải khuyến nghị.',
    how:[
      'CoQ10 tan trong dầu: uống cùng bữa ăn có chất béo hấp thu tốt hơn (lời khuyên chung).',
      'Ubiquinol là dạng không cần cơ thể khử thêm so với ubiquinone (kho Obsidian).'],
    forms:'Ubiquinone và ubiquinol, dạng viên nang mềm trong dầu. Một số viên dùng nguyên liệu thương hiệu (ví dụ Kaneka).',
    cautions:[
      'Chưa có tác dụng phụ nghiêm trọng được báo cáo. Có thể gặp nhẹ: mất ngủ, khó chịu tiêu hoá (NCCIH).',
      'Có thể không tương thích với một số điều trị ung thư; hỏi bác sĩ ung thư (NCCIH).'],
    interactions:[
      'Warfarin: NCCIH ghi CoQ10 có thể tương tác. Bằng chứng không nhất quán: ca bệnh và nghiên cứu trên chuột gợi ý làm giảm tác dụng thuốc, nhưng một thử nghiệm mù đôi 100 mg/ngày trong 4 tuần ở 21 người dùng warfarin dài hạn không thấy đổi INR. Nếu bắt đầu hoặc ngừng CoQ10, nên kiểm tra INR thường hơn.',
      'Insulin: có thể tương tác (NCCIH).'],
    foods:'Thịt, cá béo, hạt (lượng nhỏ).',
    sources:[['NCCIH – Coenzyme Q10','https://www.nccih.nih.gov/health/coenzyme-q10']]},

  protein:{
    name:'Đạm (Protein)',aka:'Protein, bílkoviny',updated:'2026-11-03',
    what:'Chất dinh dưỡng đa lượng, cung cấp acid amin để xây cơ, gân, da, xương và enzyme. Đạm hoàn chỉnh (thịt, cá, trứng, sữa, đậu nành) chứa đủ 9 acid amin thiết yếu. Collagen không hoàn chỉnh vì thiếu tryptophan, nên không thay được đạm thường.',
    benefits:[
      ['chac','Cần cho duy trì cơ và các mô. Ăn đạm cao hơn mức tối thiểu giúp giữ khối cơ ở người trên 40 tuổi (kho Obsidian xếp ở mức bằng chứng cao).','Kho Obsidian'],
      ['chuaro','Mức cụ thể 1,4–1,6 g/kg cho người lao động nặng là đồng thuận chuyên môn ngoại suy, chưa có thử nghiệm riêng cho nhóm này.','Kho Obsidian']],
    need:'Mức tham chiếu EFSA (2012): 0,83 g đạm cho mỗi kg cân nặng mỗi ngày với người lớn, kể cả người lớn tuổi; tính cả đạm động vật và thực vật, dựa trên cân bằng nitơ. Kho Obsidian dẫn nhóm PROT-AGE: người lớn tuổi nên 1,0–1,2 g/kg, và 1,2–1,5 g/kg nếu vận động nhiều hoặc có bệnh. Ví dụ người 70 kg theo mức EFSA cần khoảng 58 g mỗi ngày.',
    how:[
      'Phân bố đều giữa các bữa: tổng hợp protein cơ hoạt động theo đợt, cần khoảng 25–30 g đạm chất lượng mỗi bữa; dưới khoảng 20 g thì phần lớn bị đốt làm năng lượng (kho Obsidian).',
      'Whey tiêu hoá nhanh (hợp sau tập), casein (sữa, tvaroh) giải phóng chậm 3–5 giờ (hợp ca dài hoặc trước ngủ) (kho Obsidian).',
      'Cần đủ năng lượng tổng và kích thích cơ học: nếu ăn thiếu calo, đạm bị đốt làm nhiên liệu; đạm chỉ vào cơ nếu cơ được dùng (kho Obsidian).',
      'Cân thịt sống hay chín làm lệch kết quả tới khoảng 30%: 100 g thịt sống khoảng 20 g đạm, 100 g sau khi nấu khoảng 27 g (kho Obsidian).',
      'So giá theo gam đạm, không so giá theo gói.'],
    forms:'Thức ăn (trứng, thịt, cá, sữa, đậu), bột whey, casein, đạm thực vật. Thức ăn thật thường rẻ hơn và đủ chất hơn bột đạm.',
    cautions:[
      'Bệnh thận mạn: phải theo chỉ định của bác sĩ, không tự tăng đạm (kho Obsidian).',
      'Kho Obsidian ghi chưa có bằng chứng độc lập cho thấy đạm cao gây hại thận ở người có thận khoẻ ở mức 1,4–1,6 g/kg, nhưng đây là điểm cần hỏi bác sĩ nếu có bệnh thận hay đang dùng thuốc ảnh hưởng thận.'],
    interactions:['Không có tương tác thuốc đáng kể với đạm trong thức ăn. Với bệnh thận hoặc chế độ ăn theo chỉ định, hãy hỏi bác sĩ.'],
    foods:'Trứng, thịt, cá, sữa và chế phẩm (kefir, tvaroh, skyr), đậu phụ, sữa đậu nành, đậu lăng.',
    sources:[['EFSA – mức tham chiếu protein 2012','https://www.efsa.europa.eu/en/press/news/120209'],['Kho Obsidian: Đạm (Protein), dẫn PROT-AGE','']]},

  bcomplex:{
    name:'Vitamin B-Complex',aka:'Vitamin nhóm B, B1, B2, B3, B5, B6, B7 (biotin), B9, B12',updated:'2026-11-03',
    what:'Nhóm 8 vitamin tan trong nước (B1, B2, B3, B5, B6, B7 là biotin, B9 là folate, B12). Chúng là đồng yếu tố trong chuyển hoá năng lượng, nhưng bản thân KHÔNG cung cấp calo. Viên B-complex gộp cả tám chất, thường kèm vài chất như cholin hay inositol.',
    benefits:[
      ['chac','Có ý nghĩa khi thật sự thiếu hụt: ăn chay trường lâu năm thiếu B12, ăn kém kéo dài thiếu B1.','Kho Obsidian'],
      ['khong','"Uống liều cao cho khoẻ nhanh": liều vượt khoảng 200–500% giá trị tham chiếu không mang thêm lợi ích, chỉ tăng nguy cơ tác dụng phụ.','Kho Obsidian'],
      ['khong','B12 không giúp tăng năng lượng hay sức bền ở người đã đủ B12.','NIH']],
    need:'Liều thông thường, khoảng 100–500% giá trị tham chiếu mỗi chất, là đủ cho phần lớn người lớn cần bù nền; không cần liều "mega" (kho Obsidian). Mỗi vitamin có mức tối đa riêng, xem bài từng chất: B6 (EFSA 12 mg, NIH 100 mg), niacin, axit folic (1000 mcg). B12 và biotin không đặt được mức tối đa vì không thấy độc tính ở liều cao (NIH).',
    how:[
      'Cộng tổng B6, niacin và axit folic từ mọi viên (đa vitamin, B-complex, viên ZMA) rồi so với mức tối đa riêng của từng chất.',
      'Chọn viên thuần B-complex, không kèm khoáng chất, nếu có bệnh tuyến giáp: một số viên tổng hợp có i-ốt (kho Obsidian).',
      'Dạng "hoạt tính" như P5P cho B6, methylcobalamin cho B12, L-5-MTHF cho folate được quảng cáo hấp thu tốt hơn. NIH ghi hấp thu B6 từ viên không khác đáng kể giữa các dạng, và ưu thế của methylcobalamin so với dạng thường chưa được chứng minh (kho Obsidian). 5-MTHF thì có sinh khả dụng bằng hoặc cao hơn axit folic (NIH).',
      'Vitamin B tan trong nước nên không cần uống cùng chất béo (kho Obsidian).'],
    forms:'B-complex thuần, B-complex kèm cholin hoặc inositol, đa vitamin tổng hợp. Dạng liều "megadose" (ví dụ B6 100 mg, B5 500 mg) khác hẳn dạng liều gần nhu cầu.',
    cautions:[
      'B6 liều cao dùng dài hạn có thể gây tổn thương thần kinh ngoại biên (tê bì, châm chích tay chân), đặc biệt đáng lo ở người lớn tuổi. Xem bài Vitamin B6.',
      'Niacin dạng nicotinic acid từ 30–50 mg trở lên gây đỏ bừng da, nóng rát; nicotinamide thì không (NIH). Xem bài Niacin.',
      'Axit folic liều lớn có thể che giấu thiếu B12 (NIH). Xem bài Axit folic.',
      'Biotin liều cao gây kết quả xét nghiệm sai, có thể sai cao hoặc sai thấp tuỳ loại xét nghiệm (NIH). Kho Obsidian ghi với xét nghiệm tuyến giáp (TSH, FT4) thì phải ngừng 5–7 ngày trước khi xét nghiệm. Hãy báo bác sĩ và phòng xét nghiệm là bạn đang dùng biotin.'],
    interactions:[
      'Biotin và xét nghiệm miễn dịch: xem trên.',
      'Thuốc chống động kinh (carbamazepine, phenytoin, primidone, phenobarbital) làm giảm nồng độ biotin trong máu; cũng có tương tác với folate và B6 (NIH).',
      'Thuốc lao isoniazid, pyrazinamide làm giảm niacin; methotrexate là chất đối kháng folate (NIH).'],
    foods:'Chế độ ăn đa dạng gồm thịt, cá, trứng, sữa, đậu, rau lá xanh và ngũ cốc.',
    sources:[['NIH ODS – Biotin','https://ods.od.nih.gov/factsheets/Biotin-HealthProfessional/'],['NIH ODS – Vitamin B6','https://ods.od.nih.gov/factsheets/VitaminB6-HealthProfessional/'],['NIH ODS – Vitamin B12','https://ods.od.nih.gov/factsheets/VitaminB12-HealthProfessional/'],['Kho Obsidian: Vitamin B-Complex (ghi chú thô, chưa rà)','']]},

  probstrain:{
    name:'Men vi sinh theo chủng',aka:'Lactobacillus rhamnosus GG, Saccharomyces boulardii, Bifidobacterium',updated:'2026-11-03',
    what:'Tác dụng của men vi sinh gắn với CHỦNG cụ thể, không phải với cả nhóm. Tổ chức Tiêu hoá Thế giới (WGO, bản cập nhật 2023) yêu cầu khuyến nghị theo chủng và liều đã được thử trên người. ESPGHAN (nhi khoa tiêu hoá châu Âu) chỉ khuyến cáo một chủng khi có ít nhất hai thử nghiệm ngẫu nhiên cho đúng chủng đó.',
    benefits:[
      ['cothe','Lactobacillus rhamnosus GG (LGG): ESPGHAN 2016 khuyến cáo MẠNH (bằng chứng trung bình) để phòng tiêu chảy do kháng sinh ở trẻ em khi có yếu tố nguy cơ (loại kháng sinh, thời gian điều trị, tuổi, nằm viện, bệnh kèm).','ESPGHAN 2016'],
      ['cothe','Saccharomyces boulardii (nấm men): cũng được ESPGHAN 2016 khuyến cáo mạnh với mức bằng chứng trung bình để phòng tiêu chảy do kháng sinh ở trẻ em. Để phòng tiêu chảy do Clostridioides difficile, ESPGHAN chỉ "gợi ý" có điều kiện, bằng chứng thấp.','ESPGHAN 2016'],
      ['cothe','Mức chung của NCCIH: tiêu chảy cấp, tiêu chảy do kháng sinh và chàm thể tạng có một số bằng chứng; hầu hết các công dụng khác thiếu bằng chứng mạnh.','NCCIH'],
      ['chuaro','Các chủng và hỗn hợp chủng khác đã được thử nghiệm nhưng ESPGHAN ghi chưa đủ bằng chứng để khuyến cáo.','ESPGHAN 2016'],
      ['chuaro','Bifidobacterium (như B. lactis, B. longum), Lactobacillus reuteri, L. acidophilus và các chủng khác: tôi không đọc được bảng chủng–chỉ định của WGO nên không nêu mức bằng chứng riêng cho từng chủng. Hãy tra bảng WGO trước khi mua cho một mục đích cụ thể.','Chưa đọc được bảng WGO']],
    need:'Không có nhu cầu khuyến nghị. Liều và thời gian phụ thuộc chủng và mục đích, lấy từ các thử nghiệm cho đúng chủng đó.',
    how:[
      'Đọc tên đầy đủ trên nhãn: loài và mã chủng (ví dụ "Lactobacillus rhamnosus GG", "Saccharomyces boulardii CNCM I-745") và lượng CFU đến hết hạn dùng. Nhãn chỉ ghi "Lactobacillus" thì không đủ để biết có bằng chứng hay không.',
      'Chọn chủng theo mục đích. Ví dụ phòng tiêu chảy khi dùng kháng sinh: chủng có khuyến cáo của ESPGHAN (cho trẻ em) là LGG hoặc S. boulardii.',
      'Đánh giá sau một thời gian; không có lợi thì ngừng.'],
    forms:'Viên nang, gói bột, giọt. Hỗn hợp nhiều chủng phổ biến, nhưng ESPGHAN ghi các tổ hợp chưa đủ bằng chứng.',
    cautions:[
      'Khuyến cáo ESPGHAN ở trên là cho trẻ em; không tự động áp dụng cho người lớn.',
      'Đã có báo cáo nhiễm trùng nặng hoặc tử vong ở trẻ sinh non dùng men vi sinh; FDA đã cảnh báo (NCCIH). Biến cố nặng có khả năng hơn ở người có bệnh nền.',
      'Hỏi bác sĩ nếu suy giảm miễn dịch, đang có bệnh nặng hoặc có ống thông tĩnh mạch.'],
    interactions:['Các nguồn tôi đọc không nêu tương tác thuốc cụ thể.'],
    foods:'Sữa chua, kefir, thực phẩm lên men (không phải chủng nào cũng nằm trong số đã được thử nghiệm).',
    sources:[['ESPGHAN 2016 – men vi sinh phòng tiêu chảy do kháng sinh ở trẻ em','https://espghan.org/dam/jcr:bb0de387-55d2-49bd-bb02-40d31b5e7c1e/2016_Probiotics_for_the_Prevention_of_Antibiotic-Associated_Diarrhea_in_Children.pdf'],['WGO – hướng dẫn men vi sinh và prebiotic','https://www.worldgastroenterology.org/guidelines/probiotics-and-prebiotics/probiotics-and-prebiotics-english'],['NCCIH – Men vi sinh','https://www.nccih.nih.gov/health/probiotics-usefulness-and-safety']]},

  kefir:{
    name:'Kefir',aka:'Sữa chua uống lên men, kefir sữa',updated:'2026-11-03',
    what:'Sữa lên men bằng "hạt kefir", là hỗn hợp vi khuẩn và nấm men. Thường được xếp chung với thực phẩm có men vi sinh. Kefir sữa 3,5% béo có khoảng 3,6 g đạm trong 100 ml, nên 250 ml cung cấp khoảng 9 g đạm (kho Obsidian).',
    benefits:[
      ['khong','Huyết áp: phân tích gộp các thử nghiệm ngẫu nhiên (2025) không thấy giảm có ý nghĩa; huyết áp tâm thu giảm khoảng 1,8 mmHg và tâm trương khoảng 1,2 mmHg, khoảng tin cậy bao gồm cả không đổi.','Phân tích gộp 2025'],
      ['chuaro','Chỉ dấu viêm CRP: cùng phân tích gộp gợi ý uống kefir lâu dài có thể cải thiện CRP.','Phân tích gộp 2025'],
      ['chuaro','Sức khoẻ chuyển hoá và các lợi ích khác: một tổng quan hệ thống các thử nghiệm ngẫu nhiên (Nutrition Reviews 2023) kết luận bằng chứng còn hạn chế, cần thử nghiệm người chất lượng cao trước khi đưa khuyến nghị.','Nutrition Reviews 2023'],
      ['chuaro','Dung nạp lactose: trong các nguồn tôi tìm được không có thử nghiệm trực tiếp trên người không dung nạp lactose, nên không kết luận.','Kết quả tìm kiếm 03/11/2026']],
    need:'Không có nhu cầu khuyến nghị. Một cốc 250 ml mỗi ngày là mức thường dùng; hãy tính nó vào tổng lượng đạm, sữa và đường trong ngày.',
    how:[
      'Chọn kefir nguyên chất, không thêm đường; xem nhãn để biết chủng vi sinh vật và hạn dùng.',
      'Kefir là thực phẩm, không phải thuốc: dùng như một phần của bữa ăn, đừng kỳ vọng hạ huyết áp.',
      'Đạm trong kefir là đạm hoàn chỉnh, có thể góp vào mục tiêu đạm hằng ngày (xem bài Đạm).'],
    forms:'Kefir sữa (phổ biến nhất), kefir nước (lên men từ nước đường). Hai loại có thành phần khác nhau.',
    cautions:[
      'Người dị ứng đạm sữa tránh kefir sữa.',
      'Người suy giảm miễn dịch hoặc có bệnh nặng nên hỏi bác sĩ trước khi dùng sản phẩm có vi sinh vật sống nhiều (cùng lưu ý như với men vi sinh, NCCIH).'],
    interactions:['Các nguồn tôi đọc không nêu tương tác thuốc cụ thể. Chứa canxi và đạm sữa như các sản phẩm sữa khác; nếu đang uống thuốc cần tách giờ với canxi (ví dụ levothyroxine, kháng sinh quinolon), hãy xem bài Canxi.'],
    foods:'Sữa kefir, kefir nước, sữa chua.',
    sources:[['Phân tích gộp 2025 – kefir với huyết áp và CRP','https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12554242/'],['Tổng quan hệ thống 2023 (Nutrition Reviews) về kefir','https://researchportal.scu.edu.au/esploro/outputs/journalArticle/The-effects-of-kefir-consumption-on/991013038984202368'],['Kho Obsidian: bảng đạm (kefir 3,5% béo)','']]},

  algae:{
    name:'Tảo (spirulina, chlorella)',aka:'Tảo xoắn, tảo lục, spirulina, chlorella',updated:'2026-11-03',
    what:'Spirulina thực chất là vi khuẩn lam (cyanobacteria); chlorella là tảo lục. Cả hai bán dạng bột và viên. Cần phân biệt với các sản phẩm từ Aphanizomenon flos-aquae (AFA), một loại vi khuẩn lam khác.',
    benefits:[
      ['chuaro','Các công dụng được quảng cáo (miễn dịch, chuyển hoá, giải độc): trong lượt tìm này, NIH, EFSA và MedlinePlus không trả về trang tổng quan nào, nên bài này không nêu mức bằng chứng cho từng công dụng.','Chưa có nguồn đã đọc']],
    need:'Không có nhu cầu khuyến nghị. Liều trên nhãn khác nhau nhiều giữa các sản phẩm.',
    how:[
      'Ưu tiên sản phẩm có kết quả kiểm nghiệm bên thứ ba cho từng lô, đặc biệt về độc tố tảo (microcystin). Đây là điểm các nguồn trên cùng nhấn mạnh.',
      'Tránh các sản phẩm AFA (Aphanizomenon flos-aquae).'],
    forms:'Bột, viên nén, viên nang. Một số sản phẩm phối hợp spirulina với chlorella.',
    cautions:[
      'Nguy cơ ô nhiễm độc tố: một nghiên cứu ở Đức trên 13 sản phẩm tảo cho thấy chỉ các sản phẩm từ Aphanizomenon flos-aquae có microcystin, và chiết xuất của mọi sản phẩm đều độc với tế bào trong ống nghiệm; các tác giả nhận định bán sản phẩm AFA cho người là rất đáng ngờ.',
      'Một nghiên cứu khác thấy khoảng 30% mẫu dương tính với microcystin hoặc nodularin, trong đó có một sản phẩm chlorella. Mức microcystin an toàn hằng ngày theo WHO được dẫn là 0,04 mcg/kg cân nặng.',
      'USP đánh giá chưa thấy nguy cơ sức khoẻ nghiêm trọng khi spirulina được xác định đúng, bào chế đúng và dùng đúng (theo trang NutritionFacts dẫn lại); một số chuyên gia khuyên tránh vì không có kiểm nghiệm từng lô. Hai quan điểm này mâu thuẫn, tôi ghi cả hai.'],
    interactions:['Các nguồn tôi đọc không nêu tương tác thuốc. Nếu có bệnh tự miễn, đang dùng thuốc ức chế miễn dịch hay mang thai, hãy hỏi bác sĩ trước khi dùng.'],
    foods:'Không phải thực phẩm thông thường ở châu Âu và Việt Nam; thường dùng như viên hoặc bột pha.',
    sources:[['NutraIngredients 2013 – nghiên cứu về độc tố trong tảo (Univ. Konstanz)','https://www.nutraingredients.com/Article/2013/01/07/Study-warns-against-sale-of-toxic-algae-supplements/'],['NutritionFacts – spirulina (quan điểm thận trọng, có dẫn USP)','https://nutritionfacts.org/topics/spirulina/']]},

  honey:{
    name:'Mật ong',aka:'Honey, med',updated:'2026-11-03',
    what:'Chất ngọt tự nhiên do ong làm, chủ yếu là đường, có lượng nhỏ các chất khác. Ở đây xét mật ong như một biện pháp hỗ trợ khi ho cấp ở trẻ lớn và người lớn, không phải thực phẩm chức năng thay thuốc.',
    benefits:[
      ['cothe','Ho cấp ở trẻ từ 12 tháng tuổi: tổng quan Cochrane (Oduwole, cập nhật 2018) kết luận mật ong có lẽ làm giảm ho nhiều hơn không điều trị, giả dược và diphenhydramine, và có lẽ không khác nhiều so với dextromethorphan. Dựa trên 6 thử nghiệm nhỏ với 899 trẻ từ 12 tháng đến 18 tuổi.','Cochrane'],
      ['chuaro','Mức độ chắc chắn của bằng chứng thấp đến trung bình: phần lớn trẻ chỉ dùng mật ong trong một đêm.','Cochrane']],
    need:'Không có liều chính thức trong nguồn tôi đọc. Theo các thử nghiệm, mật ong dùng trong thời gian ngắn cho ho cấp.',
    how:[
      'Dùng ngắn ngày cho ho cấp ở trẻ từ 12 tháng trở lên và người lớn; nếu ho kéo dài hoặc kèm sốt, khó thở thì đi khám.',
      'Mật ong chủ yếu là đường: tính vào lượng đường trong ngày (lời khuyên chung).'],
    forms:'Mật ong nguyên chất. Bài này chỉ dựa trên các thử nghiệm với mật ong thông thường, không đánh giá các loại mật ong đặc biệt.',
    cautions:[
      'KHÔNG cho trẻ dưới 12 tháng tuổi ăn mật ong: hệ miễn dịch chưa đủ chống lại vi khuẩn có thể có trong mật ong và có thể gây liệt (ngộ độc botulinum ở trẻ nhỏ) (tài liệu Cochrane cho người dùng).',
      'Trong các thử nghiệm Cochrane, tác dụng phụ giữa nhóm mật ong và nhóm đối chứng không khác nhau.'],
    interactions:['Các nguồn tôi đọc không nêu tương tác thuốc.'],
    foods:'Mật ong tự nhiên; có thể thay thế đường trong một số món (vẫn là đường).',
    sources:[['Cochrane – Mật ong cho ho cấp ở trẻ em','https://www.cochrane.org/evidence/CD007094/honey-acute-cough-children'],['AAFP – tóm tắt Cochrane về mật ong và ho ở trẻ em','https://www.aafp.org/pubs/afp/issues/2016/0701/p20.html']]},

  ginger:{
    name:'Gừng',aka:'Ginger, zázvor, Zingiber officinale',updated:'2026-11-03',
    what:'Thân rễ cây gừng, dùng trong nấu ăn và làm thuốc truyền thống cho buồn nôn, khó tiêu, đau khớp. Có nhiều nghiên cứu trên người, nhưng một số chất lượng không cao (NCCIH).',
    benefits:[
      ['cothe','Buồn nôn và nôn khi mang thai: nghiên cứu cho thấy gừng có thể giúp. Phần lớn các nghiên cứu thử viên bổ sung, không phải gừng trong thức ăn.','NCCIH'],
      ['cothe','Đau bụng kinh: viên gừng có thể giúp giảm mức độ.','NCCIH'],
      ['chuaro','Thoái hoá khớp gối: viên gừng có thể giúp triệu chứng, nhưng nhiều nghiên cứu chất lượng kém. Gừng bôi ngoài da không thấy có ích.','NCCIH'],
      ['khong','Say tàu xe: phần lớn nghiên cứu không thấy gừng giúp.','NCCIH'],
      ['chuaro','Buồn nôn do hoá trị và sau phẫu thuật: chưa rõ gừng có giúp thêm cho điều trị chuẩn hay không.','NCCIH']],
    need:'Không có liều chính thức trong nguồn tôi đọc; liều trên nhãn khác nhau.',
    how:['Nếu dùng cho buồn nôn thai kỳ, hãy hỏi bác sĩ sản khoa trước.','Dạng viên cho kết quả thử nghiệm; gừng trong thức ăn thì chưa có đủ nghiên cứu tương đương.'],
    forms:'Gừng tươi, bột, trà, viên chiết xuất, kẹo gừng.',
    cautions:[
      'Tác dụng phụ khi uống: khó chịu bụng, ợ nóng, tiêu chảy, kích ứng miệng họng (NCCIH).',
      'Viên gừng trong thai kỳ có thể an toàn, nhưng cần hỏi bác sĩ; thông tin an toàn khi cho con bú còn ít (NCCIH).'],
    interactions:['NCCIH khuyên hỏi nhân viên y tế trước khi dùng nếu đang dùng bất kỳ thuốc nào, vì một số thảo dược có thể tương tác theo cách có hại.'],
    foods:'Gừng tươi, bột gừng, trà gừng.',
    sources:[['NCCIH – Gừng','https://www.nccih.nih.gov/health/ginger']]},

  greentea:{
    name:'Trà xanh (chiết xuất)',aka:'Green tea, Camellia sinensis, EGCG, catechin',updated:'2026-11-03',
    what:'Lá trà xanh hấp, rang và sấy, không lên men. Có caffeine và catechin. Uống trà xanh khác hẳn viên chiết xuất cô đặc: viên có rủi ro riêng, nhất là với gan.',
    benefits:[
      ['cothe','Cân nặng: catechin và caffeine có thể tác động khiêm tốn; hiệu quả thay đổi theo thành phần sản phẩm và mức vận động.','NCCIH'],
      ['cothe','Cholesterol: viên chiết xuất làm giảm một ít cholesterol toàn phần và LDL, không ảnh hưởng HDL và triglycerid.','NCCIH'],
      ['chuaro','Ung thư: kết quả các nghiên cứu không nhất quán.','NCCIH'],
      ['chuaro','Bệnh mạch vành: uống trà xanh liên quan giảm nguy cơ ở người châu Á, không thấy ở người phương Tây.','NCCIH']],
    need:'NCCIH kết luận chưa thể đưa ra kết luận chắc về hiệu quả của trà xanh cho phần lớn mục đích dùng. Không có liều khuyến nghị.',
    how:['Ưu tiên uống trà thay vì viên chiết xuất cô đặc.','Cộng caffeine từ trà xanh vào tổng caffeine trong ngày.'],
    forms:'Trà lá, bột matcha, viên chiết xuất (thường chứa EGCG), thuốc mỡ kê đơn trị mụn cóc sinh dục (FDA đã duyệt, không phải TPCN).',
    cautions:[
      'Trà xanh dạng đồ uống không ghi nhận vấn đề an toàn ở người lớn, nhưng có caffeine (NCCIH).',
      'Viên chiết xuất có thể gây buồn nôn, táo bón, khó chịu bụng, tăng huyết áp (NCCIH).',
      'Tổn thương gan hiếm gặp nhưng đã được báo cáo, chủ yếu với viên chiết xuất. Người có một biến thể gen liên quan miễn dịch (5–15% người Mỹ) dường như dễ bị hơn (NCCIH).',
      'Khi mang thai, tổng caffeine không nên vượt mức vừa phải (NCCIH).'],
    interactions:[
      'Trà xanh liều cao làm giảm nồng độ nadolol (thuốc chẹn beta) trong máu (NCCIH).',
      'Viên chiết xuất làm giảm nồng độ atorvastatin (thuốc hạ mỡ máu) trong máu (NCCIH).',
      'Tương tác với raloxifene (thuốc loãng xương) và có thể với thuốc khác (NCCIH).'],
    foods:'Trà xanh, matcha.',
    sources:[['NCCIH – Trà xanh','https://www.nccih.nih.gov/health/green-tea']]},

  ginseng:{
    name:'Nhân sâm',aka:'Asian ginseng, Panax ginseng, sâm Hàn Quốc',updated:'2026-11-03',
    what:'Rễ của cây Panax ginseng, dùng trong y học cổ truyền như chất "thích nghi" giúp cơ thể chống stress. Hoạt chất quan trọng là ginsenoside. Sâm đỏ và sâm trắng là cùng một loại nhưng chế biến khác nhau. Phần lớn thử nghiệm nhỏ (dưới 200 người) và ngắn (dưới 3 tháng).',
    benefits:[
      ['cothe','Mệt mỏi chung: một tổng quan năm 2023 gồm 19 nghiên cứu (2413 người) gợi ý nhân sâm đơn thuần có tác dụng nhỏ với mệt mỏi chung; các công thức thảo dược phối hợp có thể giúp mệt mỏi mạn, nhưng không phải nhân sâm đơn thuần. Không phải nghiên cứu nào cũng đồng ý.','NCCIH'],
      ['chuaro','Nhận thức: nghiên cứu nhỏ gợi ý cải thiện suy nghĩ trừu tượng, chú ý, tính toán ở người trung niên, không phải người trẻ. Lợi ích với trí nhớ có vẻ phụ thuộc vào việc phối hợp với ginkgo.','NCCIH'],
      ['chuaro','Cúm: nghiên cứu sơ bộ rất ít gợi ý chiết xuất nhân sâm có thể giảm nguy cơ mắc, không giảm mức độ hay thời gian bệnh.','NCCIH'],
      ['chuaro','Tiền tiểu đường và tiểu đường: tổng quan năm 2022 gồm 20 nghiên cứu (1295 người) thấy cải thiện đường huyết đói, cholesterol toàn phần và một số chỉ dấu viêm, nhưng tác dụng lên kiểm soát đường huyết nhìn chung chưa kết luận được.','NCCIH']],
    need:'Không có liều khuyến nghị trong nguồn tôi đọc. NCCIH nói cần nghiên cứu lớn hơn, dài hơn 3 tháng.',
    how:['Dùng ngắn ngày, theo nhãn; theo dõi giấc ngủ vì mất ngủ là tác dụng phụ hay gặp nhất.','Nếu bị tiểu đường, hỏi bác sĩ trước khi dùng vì có thể làm giảm đường huyết.'],
    forms:'Rễ sâm đỏ, sâm trắng, chiết xuất chuẩn hoá theo ginsenoside, các công thức phối hợp.',
    cautions:[
      'Dùng đường uống tới 6 tháng với lượng khuyến nghị có vẻ an toàn cho phần lớn người; còn câu hỏi về an toàn dài hạn. Một số chuyên gia khuyên tránh cho trẻ em, phụ nữ có thai và cho con bú (NCCIH).',
      'Tác dụng phụ hay gặp nhất là mất ngủ. Hiếm gặp: phát ban nặng, tổn thương gan, dị ứng nặng (NCCIH).',
      'Có thể làm nặng thêm bệnh tự miễn và ảnh hưởng đến đông máu (NCCIH).',
      'Một số bằng chứng cho thấy nhân sâm có thể làm giảm đường huyết (NCCIH). Một chất trong nhân sâm đã gây dị tật ở động vật, nên có thể không an toàn khi mang thai (NCCIH).'],
    interactions:['Có thể tương tác với một số thuốc; hãy hỏi nhân viên y tế nếu đang dùng thuốc thường xuyên, nhất là thuốc chống đông và thuốc hạ đường huyết (NCCIH).'],
    foods:'Nhân sâm là rễ thảo dược, không phải thực phẩm thông thường.',
    sources:[['NCCIH – Nhân sâm châu Á','https://www.nccih.nih.gov/health/asian-ginseng']]},

  ginkgo:{
    name:'Ginkgo',aka:'Ginkgo biloba, bạch quả',updated:'2026-11-03',
    what:'Chiết xuất từ lá cây bạch quả, thường quảng cáo cho trí nhớ, tập trung, lo âu, ù tai. Đã có rất nhiều nghiên cứu, nhưng NCCIH kết luận ginkgo chưa được chứng minh hiệu quả cho bất kỳ bệnh lý nào đã nghiên cứu.',
    benefits:[
      ['khong','Phòng hoặc làm chậm sa sút trí tuệ: ba nghiên cứu lớn ở người lớn tuổi không giảm nguy cơ sa sút trí tuệ. Nghiên cứu GEM (hơn 3000 người từ 75 tuổi, theo dõi trung vị 6 năm, do NIH tài trợ) không khác nhóm giả dược về tỷ lệ mắc sa sút trí tuệ hay Alzheimer.','NCCIH'],
      ['chuaro','Triệu chứng của sa sút trí tuệ: chiết xuất có thể có lợi ích vừa phải, nhất là ở liều tương đối cao, nhưng bằng chứng không nhất quán.','NCCIH'],
      ['chuaro','Nhận thức ở người khoẻ: chưa rõ có tác dụng hay không; phần lớn nghiên cứu chất lượng thấp.','NCCIH'],
      ['chuaro','Lo âu, hội chứng tiền kinh nguyệt, tâm thần phân liệt, chóng mặt: một ít bằng chứng gợi ý có lợi, nhưng chưa kết luận được.','NCCIH']],
    need:'Không có liều khuyến nghị trong nguồn tôi đọc.',
    how:['Chỉ dùng chiết xuất lá chuẩn hoá. Không dùng hạt ginkgo.','Nếu định dùng cho trí nhớ, hãy biết rằng bằng chứng lớn nhất cho thấy không có tác dụng phòng sa sút trí tuệ.'],
    forms:'Chiết xuất lá ginkgo (dạng viên, giọt). Hạt ginkgo tươi và hạt rang thì độc.',
    cautions:[
      'Chiết xuất lá thường an toàn với phần lớn người lớn ở lượng vừa phải, đã dùng an toàn trong nghiên cứu kéo dài tới 6 năm. Tác dụng phụ hay gặp: chóng mặt, rối loạn tiêu hoá, đau đầu (NCCIH).',
      'Hạt ginkgo tươi độc khi ăn; đã có tác dụng phụ nặng khi ăn hạt rang hoặc cây thô (NCCIH).',
      'Có thể không an toàn khi mang thai: có thể gây chuyển dạ sớm hoặc chảy máu nhiều khi sinh (NCCIH).'],
    interactions:['Ginkgo có thể tăng nguy cơ chảy máu ở người dùng thuốc chống đông như warfarin, và có thể tương tác với các thuốc khác (NCCIH).'],
    foods:'Không dùng như thực phẩm.',
    sources:[['NCCIH – Ginkgo','https://www.nccih.nih.gov/health/ginkgo']]},

  stjohn:{
    name:'Cỏ St. John (St. John’s wort)',aka:'Hypericum perforatum, ban',updated:'2026-11-03',
    what:'Thảo dược hoa vàng, thường dùng cho triệu chứng trầm cảm. Điểm quan trọng nhất của nó không phải tác dụng mà là tương tác thuốc: có thể làm yếu tác dụng của rất nhiều loại thuốc, kể cả thuốc sống còn.',
    benefits:[
      ['cothe','Trầm cảm nhẹ đến vừa: có vẻ hiệu quả hơn giả dược và ngang các thuốc chống trầm cảm chuẩn. Chưa rõ với trầm cảm nặng hoặc dùng trên 12 tuần.','NCCIH'],
      ['chuaro','Bốc hoả mãn kinh và rối loạn triệu chứng cơ thể: một ít nghiên cứu gợi ý có lợi.','NCCIH'],
      ['chuaro','ADHD, hội chứng ruột kích thích, ám ảnh cưỡng chế, tiền kinh nguyệt, bỏ thuốc lá, vết thương: nghiên cứu ít, chưa rõ có ích.','NCCIH']],
    need:'Không có liều khuyến nghị trong nguồn tôi đọc.',
    how:['Không tự dùng nếu đang dùng bất kỳ thuốc kê đơn nào: xem phần tương tác.','Trầm cảm cần được bác sĩ đánh giá; đừng thay thuốc đang dùng bằng thảo dược.'],
    forms:'Viên chiết xuất chuẩn hoá, trà, giọt, dạng bôi ngoài da.',
    cautions:[
      'Với người lớn không dùng thuốc nào, có vẻ an toàn tới 12 tuần, và một số nghiên cứu cho thấy dùng an toàn một năm hoặc hơn (NCCIH).',
      'Liều lớn hoặc bôi ngoài da có thể gây phản ứng da nặng khi ra nắng. Tác dụng phụ khác: tiêu chảy, chóng mặt, khó ngủ, bồn chồn, tê châm chích da (NCCIH).',
      'Có thể không an toàn khi mang thai (NCCIH).'],
    interactions:[
      'Làm yếu tác dụng của nhiều thuốc quan trọng, trong đó NCCIH liệt kê: một số thuốc chống trầm cảm (amitriptyline, bupropion), thuốc tránh thai, cyclosporine (chống thải ghép), thuốc chống động kinh (phenytoin, carbamazepine), thuốc tim (digoxin, ivabradine), một số thuốc HIV (indinavir, nevirapine), một số thuốc ung thư (irinotecan, imatinib, docetaxel), warfarin, và một số statin như simvastatin.',
      'Dùng cùng thuốc chống trầm cảm hoặc thuốc khác tác động serotonin có thể tăng tác dụng phụ liên quan serotonin, có thể nghiêm trọng (NCCIH).'],
    foods:'Không dùng như thực phẩm.',
    sources:[['NCCIH – St. John’s wort','https://www.nccih.nih.gov/health/st-johns-wort']]},

  ashwagandha:{
    name:'Ashwagandha',aka:'Withania somnifera, sâm Ấn Độ',updated:'2026-11-03',
    what:'Cây bụi dùng lâu đời trong y học Ayurveda, chứa các hợp chất withanolide. Bán để giảm stress, lo âu, cải thiện giấc ngủ, vô sinh nam và thể thao. Nhiều thử nghiệm có cỡ mẫu nhỏ và dùng các chế phẩm khác nhau (NCCIH).',
    benefits:[
      ['cothe','Mất ngủ và stress: một số chế phẩm có thể có hiệu quả.','NCCIH'],
      ['chuaro','Lo âu: bằng chứng chưa rõ.','NCCIH'],
      ['chuaro','Testosterone và chất lượng tinh trùng: có bằng chứng hạn chế rằng dùng 2–4 tháng có thể làm tăng.','NCCIH'],
      ['chuaro','Hen, thể thao, nhận thức, tiểu đường, mãn kinh, vô sinh nữ, COVID-19: chưa đủ bằng chứng chất lượng cao.','NCCIH']],
    need:'Không có liều khuyến nghị trong nguồn tôi đọc.',
    how:['Nếu dùng, chỉ dùng ngắn hạn (tới 3 tháng) và theo dõi buồn ngủ, đau bụng.','Dừng và hỏi bác sĩ nếu mệt, vàng da, nước tiểu sẫm màu (dấu hiệu gan).'],
    forms:'Viên chứa rễ, lá hoặc chiết xuất rễ và lá; liều và thành phần thay đổi nhiều.',
    cautions:[
      'Có thể an toàn trong ngắn hạn (tới 3 tháng); chưa đủ dữ liệu về an toàn dài hạn (NCCIH).',
      'Tác dụng phụ: buồn ngủ, khó chịu dạ dày, tiêu chảy, nôn. Hiếm nhưng đã có nhiều ca tổn thương gan liên quan đến viên ashwagandha (NCCIH).',
      'Tránh khi mang thai; không dùng khi cho con bú (NCCIH).',
      'Không khuyến nghị cho người sắp phẫu thuật, bị bệnh tự miễn hoặc rối loạn tuyến giáp (NCCIH).'],
    interactions:['Có bằng chứng ashwagandha có thể tương tác với thuốc tiểu đường, thuốc huyết áp, thuốc ức chế miễn dịch, thuốc an thần, thuốc chống co giật và một số thuốc khác (NCCIH).'],
    foods:'Không dùng như thực phẩm.',
    sources:[['NCCIH – Ashwagandha','https://www.nccih.nih.gov/health/ashwagandha']]},

  echinacea:{
    name:'Echinacea',aka:'Cúc nhím, Echinacea purpurea',updated:'2026-11-03',
    what:'Thảo dược có nguồn gốc Bắc Mỹ, bán chủ yếu để phòng và trị cảm lạnh và nhiễm trùng hô hấp, dựa trên ý tưởng là kích thích miễn dịch. Hoạt tính của chiết xuất chịu ảnh hưởng bởi điều kiện đất trồng (NCCIH).',
    benefits:[
      ['cothe','Phòng cảm lạnh: dùng echinacea có thể làm giảm nhẹ khả năng bị cảm.','NCCIH'],
      ['chuaro','Rút ngắn thời gian cảm: chưa rõ, cần thêm nghiên cứu.','NCCIH'],
      ['chuaro','Trẻ em: một nghiên cứu gần đây gợi ý giảm nguy cơ nhiễm trùng hô hấp, nhưng nhìn chung chưa đủ bằng chứng; hãy hỏi bác sĩ trước khi cho trẻ dùng.','NCCIH'],
      ['chuaro','Chàm và các công dụng khác: chưa rõ.','NCCIH']],
    need:'Không có liều khuyến nghị trong nguồn tôi đọc.',
    how:['Nếu dùng, dùng ngắn ngày.','Chọn sản phẩm ghi rõ loài (Echinacea purpurea) và phần cây dùng.'],
    forms:'Chiết xuất E. purpurea, E. angustifolia, hoặc hỗn hợp; dạng viên, giọt, trà.',
    cautions:[
      'Chiết xuất E. purpurea, và một số hỗn hợp với E. angustifolia, có thể an toàn cho phần lớn người lớn trong thời gian ngắn (NCCIH).',
      'Một số người dị ứng với echinacea, có thể nặng. Tác dụng phụ hay gặp là triệu chứng tiêu hoá: đau bụng, buồn nôn (NCCIH).',
      'Với trẻ em, có thể an toàn trong thời gian ngắn, nhưng có trẻ bị phát ban trong một thử nghiệm, có thể do dị ứng (NCCIH).'],
    interactions:['NCCIH khuyên hỏi nhân viên y tế nếu đang dùng thuốc, vì một số thảo dược tương tác theo cách có hại.'],
    foods:'Không dùng như thực phẩm.',
    sources:[['NCCIH – Echinacea','https://www.nccih.nih.gov/health/echinacea']]},

  valerian:{
    name:'Valerian (nữ lang)',aka:'Valeriana officinalis',updated:'2026-11-03',
    what:'Rễ và thân rễ của cây valerian, dùng từ thời cổ Hy Lạp, La Mã cho mất ngủ, lo âu và stress. Hiểu biết còn hạn chế vì ít nghiên cứu.',
    benefits:[
      ['khong','Mất ngủ mạn ở người lớn: Học viện Y học Giấc ngủ Hoa Kỳ (hướng dẫn 2017) khuyến cáo KHÔNG dùng valerian.','NCCIH'],
      ['chuaro','Giấc ngủ nói chung: bằng chứng không nhất quán.','NCCIH'],
      ['chuaro','Triệu chứng mãn kinh: ba nghiên cứu nhỏ gợi ý có thể có ích, chưa đủ để kết luận.','NCCIH'],
      ['chuaro','Lo âu, trầm cảm, tiền kinh nguyệt, đau bụng kinh, stress: chưa đủ bằng chứng.','NCCIH']],
    need:'Đã dùng với vẻ an toàn ở liều 300–600 mg mỗi ngày trong tối đa 6 tuần (NCCIH). An toàn dài hạn chưa rõ.',
    how:['Nếu dùng, dùng ngắn ngày (tối đa vài tuần).','Không uống cùng rượu hoặc thuốc an thần.','Nếu đã dùng lâu, đừng ngừng đột ngột: có thể có triệu chứng cai.'],
    forms:'Chiết xuất rễ dạng viên, giọt, trà. Thường phối hợp với các thảo dược khác.',
    cautions:[
      'Tác dụng phụ: đau đầu, khó chịu dạ dày, mơ màng, kích động, bồn chồn, mơ rõ (NCCIH).',
      'Ngừng đột ngột sau khi dùng lâu có thể gây lo âu, cáu gắt, rối loạn tim, mất ngủ, hiếm khi ảo giác (NCCIH).',
      'Hiếm: tổn thương gan, thường khi dùng cùng các thảo dược khác (NCCIH).',
      'An toàn khi mang thai và cho con bú chưa rõ (NCCIH).'],
    interactions:['Không uống cùng rượu hoặc thuốc an thần, vì valerian có thể có tác dụng gây buồn ngủ (NCCIH).'],
    foods:'Không dùng như thực phẩm.',
    sources:[['NCCIH – Valerian','https://www.nccih.nih.gov/health/valerian']]},

  mn:{
    name:'Mangan',aka:'Manganese',updated:'2026-11-03',
    what:'Khoáng chất vi lượng, đồng yếu tố của nhiều enzyme tham gia tạo xương, chuyển hoá đường, chất béo và carbohydrate. Không nhóm người nào được biết là dễ thiếu mangan, nên hầu như không cần bổ sung riêng (NIH).',
    benefits:[
      ['chuaro','Xương: mangan là đồng yếu tố của enzyme tạo xương; ở động vật, thiếu mangan làm giảm tạo xương và mật độ xương. Bổ sung mangan ở người cho loãng xương: chưa có kết luận.','NIH'],
      ['chuaro','Tiểu đường: mangan tham gia chuyển hoá đường nên thiếu có thể ảnh hưởng dung nạp glucose; liên quan với nguy cơ tiểu đường chưa kết luận được.','NIH']],
    need:'Không có nhóm nào được biết thiếu mangan (NIH). Mức tối đa: EFSA 2023 không đặt được mức tối đa chính thức, chỉ đặt "mức an toàn" 8 mg mỗi ngày tính cả thức ăn; NIH 11 mg mỗi ngày.',
    how:[
      'Đọc dòng mangan nguyên tố trên nhãn, không đọc khối lượng muối (NIH).',
      'Nhiều viên đa vitamin khoáng chứa 1,0–4,5 mg mangan; viên riêng từ 5 mg trở lên. Cộng tổng từ các viên bạn dùng (NIH).',
      'Không có dữ liệu so sánh sinh khả dụng giữa các dạng mangan trong viên (NIH).'],
    forms:'Mangan chelate amino acid (bisglycinate, glycinate, aspartate), gluconat, picolinat, sulfat, citrat, clorua (NIH).',
    cautions:[
      'Không có bằng chứng ngộ độc mangan từ lượng ăn trong thức ăn. Ngộ độc xảy ra ở người làm nghề hàn, khai thác mỏ hít bụi mangan, và người uống nước chứa mangan rất cao (NIH).',
      'Ngộ độc ảnh hưởng chủ yếu thần kinh trung ương: run, co thắt cơ, ù tai, giảm thính lực, đi loạng choạng; cùng các triệu chứng khác như mất ngủ, trầm cảm, dễ cáu gắt, giảm trí nhớ ngắn hạn (NIH).'],
    interactions:['Mangan không được biết là có tương tác thuốc quan trọng về lâm sàng (NIH).'],
    foods:'Ngũ cốc nguyên hạt, nghêu, hàu, trai, hạt, đậu nành và các loại đậu, gạo, rau lá xanh, cà phê, trà, và nhiều gia vị như tiêu đen (NIH).',
    sources:[['NIH ODS – Manganese','https://ods.od.nih.gov/factsheets/Manganese-HealthProfessional/'],['EFSA – mangan 2023','https://efsa.onlinelibrary.wiley.com/doi/full/10.2903/j.efsa.2023.8413']]},

  boron:{
    name:'Boron',aka:'Bo, boron citrate, boron glycinate, calcium fructoborate',updated:'2026-11-03',
    what:'Khoáng chất có trong nhiều thực phẩm thực vật. Các nhà khoa học chưa chắc boron có vai trò gì trong cơ thể nên NIH không coi boron là chất dinh dưỡng thiết yếu. Chưa có mức khuyến nghị cần bao nhiêu (NIH).',
    benefits:[
      ['chuaro','Viêm xương khớp và sức khoẻ xương: một số nghiên cứu xem boron có giảm triệu chứng thoái hoá khớp (có thể qua giảm viêm) và giữ xương khoẻ hay không. NIH ghi cần thêm nghiên cứu.','NIH'],
      ['chuaro','Tỉnh táo và tập trung: một số nghiên cứu gợi ý người ăn rất ít boron khó tỉnh táo hơn; ăn ít boron cũng có thể làm xương yếu hơn. Chưa kết luận được.','NIH'],
      ['chuaro','Ung thư: đang được nghiên cứu, chưa có kết luận.','NIH']],
    need:'Không có mức khuyến nghị. Người lớn ở Mỹ ăn khoảng 1 mg boron mỗi ngày từ thức ăn (NIH). Mức tối đa tính cả thức ăn, đồ uống và viên: EFSA 10 mg mỗi ngày cho người lớn (áp dụng cho dạng axit boric và borat, dựa trên dữ liệu động vật; có ý kiến đề nghị EFSA xem lại), NIH 20 mg mỗi ngày cho người lớn.',
    how:[
      'Viên boron thường chứa vài mg; hãy cộng boron từ mọi viên. Ví dụ Life Extension Two-Per-Day đã có sẵn 3 mg boron mỗi 2 viên, nên nếu uống thêm viên boron riêng thì bị trùng.',
      'Chưa biết dạng nào tốt hơn: boron aspartate, citrate, gluconate, glycinate, calcium fructoborate (NIH).'],
    forms:'Boron aspartate, citrate, gluconate, glycinate, calcium fructoborate. Không có bằng chứng dạng nào hơn dạng nào (NIH).',
    cautions:[
      'Boron trong thức ăn và đồ uống không gây hại. Nuốt nhầm sản phẩm tẩy rửa hoặc thuốc trừ sâu chứa borax hoặc axit boric thì gây hại: buồn nôn, nôn, tiêu chảy, phát ban, đau đầu, co giật; liều rất cao có thể tử vong (NIH).',
      'Mức tối đa cho trẻ em thấp hơn nhiều (ví dụ 3 mg cho trẻ 1–3 tuổi theo NIH); không tự cho trẻ dùng viên boron.'],
    interactions:['Trang NIH tôi đọc có mục tương tác nhưng không trích được nội dung; nếu đang dùng thuốc thường xuyên, hãy hỏi dược sĩ.'],
    foods:'Trái cây và nước ép (nho khô, đào, nước ép mận, nho), bơ, khoai tây, đậu phộng, đậu, đậu Hà Lan, cà phê, sữa, rượu táo, rượu vang, bia (NIH).',
    sources:[['NIH ODS – Boron (cho người dùng)','https://ods.od.nih.gov/factsheets/Boron-Consumer/'],['EFSA – mức tối đa','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  gsh:{
    name:'Glutathione',aka:'GSH, glutathione khử, glutathione liposome',updated:'2026-11-03',
    what:'Chất chống oxy hoá cơ thể tự tạo từ ba acid amin (cysteine, glycine, glutamate). Bán nhiều dạng viên, bột, ngậm dưới lưỡi và liposome với lời quảng cáo chống oxy hoá, thải độc, làm sáng da.',
    benefits:[
      ['chuaro','Uống có làm tăng glutathione trong cơ thể không: một phân tích gộp các thử nghiệm ngẫu nhiên (2025) tìm câu trả lời cho câu hỏi này vì sinh khả dụng đường uống thấp. Tôi không đọc được phần kết quả gộp của nó.','Phân tích gộp 2025 (chưa đọc kết quả)'],
      ['chuaro','Một tổng quan lâm sàng (2022) ghi hấp thu glutathione qua đường tiêu hoá kém, và một số thử nghiệm dùng liều uống cao để đạt tác dụng.','Tổng quan 2022'],
      ['chuaro','Các lời quảng cáo như thải độc, làm sáng da, chống lão hoá: bài này không tìm được nguồn độc lập đáng tin nên không nêu mức bằng chứng.','Chưa có nguồn đã đọc']],
    need:'Không có nhu cầu khuyến nghị. Một thử nghiệm ngẫu nhiên (Richie 2015) được dẫn dùng 250 hoặc 1000 mg mỗi ngày trong 6 tháng; tôi chưa kiểm chứng chi tiết này từ bài gốc.',
    how:['Nếu muốn thử, chọn sản phẩm ghi rõ lượng glutathione khử và có kiểm nghiệm. Các tuyên bố "liposome hấp thu mạnh hơn" chỉ thấy ở các trang bán hàng.','Có thể thay vì uống glutathione, ăn đủ protein và thực phẩm giàu cysteine để cơ thể tự tạo (suy luận chung từ cách cơ thể tạo glutathione, không phải khuyến nghị của nguồn).'],
    forms:'Glutathione khử, S-acetyl glutathione, dạng liposome, dạng ngậm dưới lưỡi, bột. Không có so sánh độc lập về hấp thu giữa các dạng trong nguồn tôi đọc.',
    cautions:['Tôi không tìm được tổng quan hệ thống đáng tin về an toàn của glutathione dạng uống. Nhiều trang bán hàng nêu các khẳng định cụ thể mà tôi không kiểm chứng được.'],
    interactions:['Không có nguồn đã đọc về tương tác thuốc. Hãy hỏi dược sĩ nếu đang dùng thuốc hoá trị, thuốc hen hoặc thuốc khác.'],
    foods:'Rau họ cải, tỏi, hành, thịt và cá có chứa glutathione hoặc tiền chất của nó; lượng thay đổi.',
    sources:[['Tổng quan hệ thống và phân tích gộp 2025 – glutathione dạng uống','https://ph04.tci-thaijo.org/index.php/JCST/article/view/6734'],['Clin Cosmet Investig Dermatol 2022 – tổng quan glutathione (DOAJ)','https://doaj.org/article/4df985fad1494f098a0c86e7ce1b9199']]},

  ala:{
    name:'Axit alpha-lipoic',aka:'ALA, lipoic acid',updated:'2026-11-03',
    what:'Chất chống oxy hoá cơ thể tự tạo, tan được cả trong nước và dầu. Bán nhiều để hỗ trợ thần kinh và đường huyết. Lưu ý không nhầm với ALA là alpha-linolenic acid của omega-3.',
    benefits:[
      ['cothe','Bệnh thần kinh do tiểu đường có triệu chứng: một phân tích gộp ghi ALA đường uống 600–1800 mg có thể giúp giảm triệu chứng.','Phân tích gộp'],
      ['chuaro','Các công dụng khác (chống lão hoá, đường huyết ở người khoẻ): trong nguồn tôi đọc không có dữ liệu đủ để kết luận.','Chưa có nguồn đã đọc']],
    need:'Thử nghiệm có đối chứng ở 181 người tiểu đường type 2 thử 600, 1200 và 1800 mg mỗi ngày; liều 600 mg một lần mỗi ngày cho cân bằng lợi ích và rủi ro tốt nhất. Viên đa vitamin thường chỉ chứa vài chục mg (Two-Per-Day có 25 mg).',
    how:['Nếu bị tiểu đường, hãy hỏi bác sĩ trước khi dùng ALA vì có thể ảnh hưởng đường huyết.','Liều nhỏ trong viên đa vitamin khác xa liều đã thử nghiệm: đừng coi đó là liều điều trị.'],
    forms:'ALA dạng racemic (R/S) và dạng R-ALA. Nguồn tôi đọc không so sánh hai dạng.',
    cautions:['Tác dụng phụ tăng theo liều: buồn nôn, nôn, chóng mặt (thử nghiệm 181 người).'],
    interactions:['Người dùng thuốc tiểu đường nên hỏi bác sĩ; các nguồn tôi đọc không nêu danh sách tương tác cụ thể.'],
    foods:'Có lượng nhỏ trong thịt đỏ, nội tạng và một số rau.',
    sources:[['PubMed – ALA trong bệnh thần kinh do tiểu đường (thử nghiệm 181 người)','https://pubmed.ncbi.nlm.nih.gov/17272797/']]},

  quercetin:{
    name:'Quercetin',aka:'Flavonoid quercetin, Bio-Quercetin Phytosome',updated:'2026-11-03',
    what:'Flavonoid có trong nhiều rau quả (hành, táo, quả mọng), được bán dạng viên để chống oxy hoá, hỗ trợ phục hồi sau tập và miễn dịch.',
    benefits:[
      ['chuaro','Phục hồi sau vận động cường độ cao: một tổng quan hệ thống năm 2023 ở nam trẻ ghi 1000 mg mỗi ngày, hơn 7 ngày và tới 12 tuần, có vẻ an toàn và hiệu quả; các tác giả lưu ý còn lo ngại về sai lệch nghiên cứu.','Tổng quan 2023'],
      ['chuaro','Các công dụng khác: trong nguồn tôi đọc không có tổng quan đủ để nêu mức bằng chứng.','Chưa có nguồn đã đọc']],
    need:'Không có nhu cầu khuyến nghị. Ủy ban rủi ro Na Uy (VKM) dựa trên 23 thử nghiệm ngẫu nhiên kết luận 500 mg quercetin dihydrate mỗi ngày ở người lớn trong ít nhất ba tháng là chấp nhận được trong thực phẩm bổ sung. Viên đa vitamin thường chứa ít hơn nhiều.',
    how:['Cộng quercetin từ mọi viên. Dùng quá ba tháng ở liều cao (từ 1000 mg) chưa có đủ dữ liệu an toàn.'],
    forms:'Quercetin dihydrate, quercetin phytosome (kết hợp phospholipid), chiết xuất từ Sophora japonica. Rutin là dạng liên quan, có giới hạn riêng.',
    cautions:[
      'Tác dụng phụ hiếm và nhẹ ở các nghiên cứu đã có; chưa có đủ dữ liệu an toàn dài hạn (hơn 12 tuần) ở liều cao từ 1000 mg.',
      'VKM nêu người bị bệnh thận mạn hoặc ung thư phụ thuộc estrogen có thể dễ chịu tác hại hơn.'],
    interactions:['Quercetin có thể ảnh hưởng đến hấp thu một số thuốc và các enzyme chuyển hoá thuốc (VKM). Nếu đang dùng thuốc thường xuyên, hãy hỏi dược sĩ.'],
    foods:'Hành tây, táo, quả mọng, rau lá xanh, trà.',
    sources:[['VKM Na Uy – đánh giá rủi ro rutin và quercetin','https://vkm.no/english/riskassessments/allpublications/rutinandquercetinhealthrisksofintakeoffoodsupplements.4.7cc8817a18c33cc0df9bd9bb.html'],['PubMed – tổng quan hệ thống quercetin và phục hồi tập luyện','https://pubmed.ncbi.nlm.nih.gov/37398956/']]},

  lycopene:{
    name:'Lycopene',aka:'Carotenoid cà chua, LycoBeads',updated:'2026-11-03',
    what:'Carotenoid màu đỏ có nhiều trong cà chua và trái cây đỏ, có hoạt tính chống oxy hoá. Không chuyển thành vitamin A.',
    benefits:[
      ['khong','Phòng ung thư tuyến tiền liệt: một phân tích gộp các thử nghiệm ngẫu nhiên kết luận không đủ bằng chứng để ủng hộ dùng lycopene dạng viên để phòng bệnh này.','Poison Control, dẫn phân tích gộp'],
      ['chuaro','Tim mạch và các triệu chứng chuyển hoá (huyết áp, cholesterol): bằng chứng sơ bộ, cần thêm nghiên cứu lâm sàng.','EBSCO'],
      ['chuaro','Các công dụng khác: chưa có nguồn đã đọc đủ để nêu mức bằng chứng.','Chưa có nguồn đã đọc']],
    need:'Không có nhu cầu khuyến nghị. Natural Medicines ghi lycopene dạng viên đã dùng an toàn ở 15–45 mg mỗi ngày trong 4–6 tháng; một ít dữ liệu hạn chế cho thấy 120 mg mỗi ngày có thể an toàn tới một năm. Viên đa vitamin thường chỉ chứa 1–2 mg.',
    how:['Ăn cà chua nấu chín với dầu là cách đơn giản để có lycopene; viên chỉ cần nếu có lý do cụ thể.'],
    forms:'Chiết xuất cà chua, lycopene tinh thể; LycoBeads là tên thương hiệu một dạng bào chế.',
    cautions:[
      'Tác dụng phụ đã báo cáo: tiêu chảy, đầy hơi, buồn nôn, nôn, khó tiêu, chán ăn; một số ca dị ứng da trong thử nghiệm.',
      'Phụ nữ mang thai và cho con bú: nên tránh lycopene ngoài lượng có trong thức ăn (Poison Control). Một nghiên cứu về một sản phẩm cụ thể ghi 2 mg mỗi ngày có thể liên quan đến tăng sinh non và nhẹ cân.',
      'Trẻ em: chưa biết liều an toàn và hiệu quả.'],
    interactions:['Trong nguồn tôi đọc không có thông tin về tương tác thuốc.'],
    foods:'Cà chua, cà chua nấu chín và sốt cà chua, dưa hấu, ổi hồng, bưởi hồng.',
    sources:[['Poison Control – Lycopene','https://poison.org/articles/lycopene-171'],['EBSCO – Lycopene dạng bổ sung','https://www.ebsco.com/research-starters/health-and-medicine/lycopene-dietary-supplement']]},

  inositol:{
    name:'Inositol',aka:'Myo-inositol, vitamin B8 (cách gọi cũ)',updated:'2026-11-03',
    what:'Chất giống đường mà cơ thể tự tạo và có trong thực phẩm, tham gia tín hiệu insulin. Thường nằm trong B-complex và đa vitamin ở liều nhỏ, và được dùng liều gam trong một số nghiên cứu về hội chứng buồng trứng đa nang và đái tháo đường thai kỳ.',
    benefits:[
      ['chuaro','Phòng đái tháo đường thai kỳ ở phụ nữ mang thai thừa cân hoặc béo phì: myo-inositol 4 g mỗi ngày có thể giảm nguy cơ so với chỉ dùng vitamin (RR 0,54), nhưng độ chắc chắn của bằng chứng thấp đến rất thấp; với liều thấp thì chưa kết luận được.','Phân tích gộp 6 RCT (2023)'],
      ['chuaro','Hội chứng buồng trứng đa nang và các tình trạng kháng insulin: đã dùng liều từ 200 mg đến 4 g mỗi ngày; cần xác định liều phù hợp.','Bình luận Diabetes Care 2013']],
    need:'Không có nhu cầu khuyến nghị. Trong các thử nghiệm: từ 200 mg đến 4 g mỗi ngày. Viên đa vitamin hay B-complex thường chứa 50–100 mg, thấp hơn nhiều so với liều thử nghiệm.',
    how:['Liều nhỏ trong B-complex hay đa vitamin không phải liều như các thử nghiệm.','Nếu đang mang thai hoặc có hội chứng buồng trứng đa nang, hãy để bác sĩ quyết định có dùng liều gam hay không.'],
    forms:'Myo-inositol (phổ biến nhất), kết hợp với D-chiro-inositol.',
    cautions:['Trong các thử nghiệm đã tổng hợp không ghi nhận tác dụng bất lợi; tác dụng phụ tiêu hoá nhẹ chỉ thấy ở liều khoảng 12 g mỗi ngày (tổng quan 12 thử nghiệm).'],
    interactions:['Trong nguồn tôi đọc không có thông tin về tương tác thuốc.'],
    foods:'Ngũ cốc nguyên hạt, đậu, trái cây họ cam quýt, hạt.',
    sources:[['Phân tích gộp 2023 – inositol phòng đái tháo đường thai kỳ (PMC)','https://pmc.ncbi.nlm.nih.gov/articles/PMC9318937'],['Cochrane – myo-inositol phòng đái tháo đường thai kỳ (đề cương)','https://cochranelibrary.com/cdsr/doi/10.1002/14651858.CD011507']]},

  b1:{
    name:'Vitamin B1',aka:'Thiamin, thiamine, benfotiamine',updated:'2026-11-03',
    what:'Vitamin tan trong nước, cần cho chuyển hoá năng lượng từ carbohydrate và cho thần kinh. Cơ thể thải phần thừa qua nước tiểu.',
    benefits:[
      ['chac','Phòng và chữa thiếu thiamin (bệnh beriberi). Rượu cản hấp thu thiamin; tới 80% người nghiện rượu mạn bị thiếu.','NIH'],
      ['chuaro','Tiểu đường: nồng độ thiamin trong máu thấp hơn ở người tiểu đường (17–79% có tình trạng thiamin kém trong các nghiên cứu), nhưng việc bổ sung có cải thiện bệnh hay không chưa được xác định ở nguồn tôi đọc.','NIH']],
    need:'Viên đa vitamin thường có khoảng 1,5 mg thiamin (NIH). Viên B-complex liều cao chứa 75–100 mg. Không có mức tối đa: NIH không đặt vì chưa có báo cáo tác hại khi dùng từ 50 mg mỗi ngày trở lên, có thể do hấp thu giảm nhanh khi vượt khoảng 5 mg, nhưng NIH nhắc dùng quá nhiều vẫn có thể có tác hại.',
    how:['Cơ thể hấp thu giảm nhanh khi uống trên khoảng 5 mg, nên liều rất cao không mang thêm lợi ích.'],
    forms:'Thiamin mononitrat và thiamin hydrochloride (ổn định, tan trong nước), benfotiamine (dẫn xuất tổng hợp, không tan trong nước, được chuyển thành thiamin trong cơ thể) (NIH).',
    cautions:['Dễ thiếu: người nghiện rượu, người lớn tuổi (tới 20–30% có chỉ dấu thiếu ở mức nào đó), người tiểu đường (NIH).'],
    interactions:['Thiamin không có tương tác thuốc đã biết. Thuốc lợi tiểu furosemide làm giảm thiamin do mất qua nước tiểu (NIH).'],
    foods:'Ngũ cốc nguyên hạt, thịt, cá, thịt lợn; bánh mì và ngũ cốc thường được bổ sung; sữa và trái cây chứa ít (NIH).',
    sources:[['NIH ODS – Thiamin','https://ods.od.nih.gov/factsheets/Thiamin-HealthProfessional/']]},

  b2:{
    name:'Vitamin B2',aka:'Riboflavin, riboflavin 5-phosphate',updated:'2026-11-03',
    what:'Vitamin tan trong nước, cần cho chuyển hoá năng lượng và nhiều enzyme. Có nhiều trong sữa, trứng, nội tạng.',
    benefits:[
      ['chac','Phòng và chữa thiếu riboflavin.','NIH'],
      ['chuaro','Đau nửa đầu: NIH có mục riêng về riboflavin và đau nửa đầu (giả thuyết rối loạn ty thể); trang tôi đọc bị cắt nên tôi không nêu kết quả.','NIH'],
      ['chuaro','Ung thư: dữ liệu về mối liên quan giữa riboflavin và phòng hay điều trị ung thư còn hạn chế.','NIH']],
    need:'Viên đa vitamin thường chứa 1,3 mg (100% giá trị tham chiếu). Viên B-complex liều cao chứa 50–75 mg. Không có mức tối đa: không có báo cáo tác hại ở 400 mg mỗi ngày trong ít nhất 3 tháng, nhưng NIH khuyên thận trọng với liều rất cao.',
    how:['Phần lớn riboflavin trong viên ở dạng tự do; một số có riboflavin 5-phosphate (NIH).'],
    forms:'Riboflavin tự do, riboflavin 5-phosphate.',
    cautions:['Dễ thiếu: vận động viên ăn chay, vì tập luyện làm tăng nhu cầu và người ăn chay có thể loại bỏ sữa trứng (NIH).'],
    interactions:['Riboflavin không có tương tác thuốc quan trọng về lâm sàng (NIH).'],
    foods:'Trứng, nội tạng (thận, gan), thịt nạc, sữa; ngũ cốc tăng cường (NIH).',
    sources:[['NIH ODS – Riboflavin','https://ods.od.nih.gov/factsheets/Riboflavin-HealthProfessional/']]},

  b5:{
    name:'Vitamin B5',aka:'Axit pantothenic, calcium pantothenate, pantethine',updated:'2026-11-03',
    what:'Vitamin tan trong nước, cần để tạo coenzyme A. Có trong hầu hết thực phẩm; thiếu rất hiếm.',
    benefits:[
      ['chuaro','Mỡ máu cao: vì vai trò trong tổng hợp triglycerid và chuyển hoá lipoprotein, đã có giả thuyết bổ sung có thể giảm mỡ máu; một số thử nghiệm đã thử, trang tôi đọc bị cắt nên không nêu kết quả.','NIH']],
    need:'Viên đa vitamin thường chứa khoảng 10 mg; B-complex hoặc viên riêng có thể tới 1000 mg (NIH). Không có mức tối đa: không có báo cáo độc tính; một số người dùng liều lớn (ví dụ 10 g mỗi ngày) bị tiêu chảy nhẹ và khó chịu tiêu hoá.',
    how:['Cơ thể hấp thu trung bình khoảng một nửa (40–61%) từ thức ăn. Liều rất cao không có lý do.'],
    forms:'Calcium pantothenate (phổ biến) và pantethine. Chưa có nghiên cứu so sánh sinh khả dụng giữa các dạng (NIH).',
    cautions:['Nhóm duy nhất dễ thiếu là người có đột biến gen PANK2 (bệnh thoái hoá thần kinh liên quan pantothenate kinase), rất hiếm (NIH).'],
    interactions:['Axit pantothenic không có tương tác thuốc quan trọng về lâm sàng (NIH).'],
    foods:'Thịt bò, thịt gà, nội tạng, ngũ cốc nguyên hạt, một số rau; một số ngũ cốc ăn sáng và nước tăng lực được bổ sung. Chế biến có thể làm mất 20% đến gần 80% (NIH).',
    sources:[['NIH ODS – Pantothenic acid','https://ods.od.nih.gov/factsheets/PantothenicAcid-HealthProfessional/']]},

  biotin:{
    name:'Biotin',aka:'Vitamin B7, vitamin H',updated:'2026-11-03',
    what:'Vitamin tan trong nước, cần cho chuyển hoá chất béo, carbohydrate và protein. Thiếu rất hiếm. Điều quan trọng nhất cần biết về viên biotin liều cao không phải là tác dụng mà là nó làm sai kết quả xét nghiệm.',
    benefits:[
      ['chac','Cần cho những người có thiếu hụt biotinidase (rối loạn di truyền hiếm): điều trị biotin đường uống suốt đời ngăn được triệu chứng thần kinh và da. Trẻ sơ sinh ở Mỹ được sàng lọc.','NIH'],
      ['chuaro','Tóc, da, móng (lý do bán nhiều nhất): bài này không đọc được tổng quan nào nên không nêu mức bằng chứng.','Chưa có nguồn đã đọc']],
    need:'Không có mức tối đa: không có bằng chứng ở người cho thấy biotin độc ở liều cao; các nghiên cứu không thấy tác hại ở 10–50 mg mỗi ngày, và tới 200 mg mỗi ngày ở người thiếu biotinidase (NIH). Viên B-complex thường chứa 300–1000 mcg.',
    how:['Báo cho bác sĩ và phòng xét nghiệm là bạn đang dùng biotin trước khi xét nghiệm máu. Kho Obsidian của bạn ghi với xét nghiệm tuyến giáp (TSH, FT4, FT3) thì phải ngừng 5–7 ngày trước.'],
    forms:'Biotin (D-biotin). Dạng liều cao 5–10 mg bán cho tóc và móng.',
    cautions:[
      'Biotin liều vượt khuyến nghị, kể cả không quá nhiều, có thể làm kết quả xét nghiệm sai cao hoặc sai thấp tuỳ loại xét nghiệm, dẫn đến xử trí hoặc chẩn đoán sai (NIH).',
      'Dễ thiếu: người có thiếu hụt biotinidase (NIH).'],
    interactions:['Thuốc chống động kinh (carbamazepine, primidone, phenytoin, phenobarbital) dùng ít nhất một năm liên quan nồng độ biotin trong máu thấp hơn (NIH).'],
    foods:'Trứng (lòng đỏ), nội tạng, cá, thịt, hạt, một số rau.',
    sources:[['NIH ODS – Biotin','https://ods.od.nih.gov/factsheets/Biotin-HealthProfessional/']]},

  choline:{
    name:'Cholin',aka:'Choline, phosphatidylcholine, lecithin, choline bitartrate',updated:'2026-11-03',
    what:'Chất dinh dưỡng cần cho màng tế bào, dẫn truyền thần kinh và chuyển hoá chất béo. Cơ thể tự tạo một phần, nhưng phần lớn người cần nhận từ thức ăn.',
    benefits:[
      ['chuaro','Tim mạch: có giả thuyết cholin bảo vệ tim (giảm huyết áp, đổi mỡ máu, giảm homocysteine) nhưng cũng có nghiên cứu cho rằng cholin cao trong khẩu phần có thể làm tăng nguy cơ tim mạch.','NIH'],
      ['chuaro','Gan nhiễm mỡ không do rượu: NIH có mục riêng; trang tôi đọc bị cắt nên không nêu kết quả.','NIH']],
    need:'NIH đặt mức đủ (AI) và mức tối đa (UL) theo tuổi và giới, tôi không trích được con số. Viên chứa cholin thường 10–250 mg (NIH). Mức tối đa dựa trên hạ huyết áp và mùi cơ thể giống cá.',
    how:['Phần lớn cholin nên từ thức ăn: thịt, cá, trứng, sữa, rau họ cải, đậu.','Chưa có nghiên cứu so sánh sinh khả dụng giữa các dạng cholin trong viên (NIH).'],
    forms:'Choline bitartrate, phosphatidylcholine, lecithin (NIH).',
    cautions:[
      'Lượng cao liên quan mùi cơ thể giống cá, nôn, ra nhiều mồ hôi và nước bọt, hạ huyết áp, độc gan (NIH).',
      'Cholin làm tăng chất TMAO theo liều, chất này liên quan nguy cơ tim mạch cao hơn (NIH).',
      'Phụ nữ mang thai: khoảng 90–95% ăn ít cholin hơn mức đủ; viên vitamin tiền sản thường chứa rất ít cholin (NIH).'],
    interactions:['Cholin không có tương tác thuốc quan trọng về lâm sàng (NIH).'],
    foods:'Thịt, gia cầm, cá, sữa, trứng, rau họ cải, đậu, hạt, ngũ cốc nguyên hạt. Khoảng một nửa cholin trong khẩu phần Mỹ là phosphatidylcholine (NIH).',
    sources:[['NIH ODS – Choline','https://ods.od.nih.gov/factsheets/Choline-HealthProfessional/']]},

  mgcitrat:{
    name:'Magie citrat',aka:'Magnesium citrate',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Magie gắn với axit citric. Tan tốt trong nước.',
    benefits:[['chac','Thuộc nhóm tan tốt (cùng aspartat, lactat, clorua) có sinh khả dụng cao hơn oxit và sunfat.','NIH ODS – Magnesium'],['cothe','Một thử nghiệm ngẫu nhiên mù đôi ghi magie citrat hấp thu tốt hơn các chế phẩm magie khác, và hấp thu tốt hơn oxit trong các nghiên cứu so sánh.','NIH ODS – Magnesium (tài liệu dẫn)']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Tan tốt, hấp thu tốt hơn oxit.','Liều cao dễ gây phân lỏng; hay dùng khi táo bón.'],
    forms:'Magie citrat. Đọc dòng magie nguyên chất trên nhãn.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mglactat:{
    name:'Magie lactat',aka:'Magnesium lactate',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Magie gắn với axit lactic.',
    benefits:[['chac','Thuộc nhóm tan tốt như citrat, aspartat, clorua; sinh khả dụng cao hơn oxit và sunfat.','NIH ODS – Magnesium']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Cùng nhóm tan tốt như citrat theo NIH.','Không có dữ liệu so sánh riêng với các dạng tan tốt khác trong nguồn đã đọc.'],
    forms:'Magie lactat. Đọc dòng magie nguyên chất trên nhãn.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mgclorua:{
    name:'Magie clorua',aka:'Magnesium chloride',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Muối magie với clorua; còn dùng dạng dầu hoặc muối ngâm tắm (không bàn ở đây).',
    benefits:[['chac','Thuộc nhóm tan tốt như citrat, aspartat, lactat; sinh khả dụng cao hơn oxit và sunfat.','NIH ODS – Magnesium']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Cùng nhóm tan tốt theo NIH.','Không có dữ liệu so sánh riêng với các dạng tan tốt khác trong nguồn đã đọc.'],
    forms:'Magie clorua. Đọc dòng magie nguyên chất trên nhãn.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mgaspartat:{
    name:'Magie aspartat',aka:'Magnesium aspartate',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Magie gắn với axit aspartic.',
    benefits:[['chac','Thuộc nhóm tan tốt (aspartat, citrat, lactat, clorua); sinh khả dụng cao hơn oxit và sunfat.','NIH ODS – Magnesium']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Cùng nhóm tan tốt theo NIH.','Không có dữ liệu so sánh riêng với các dạng tan tốt khác trong nguồn đã đọc.'],
    forms:'Magie aspartat. Đọc dòng magie nguyên chất trên nhãn.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mgoxit:{
    name:'Magie oxit',aka:'Magnesium oxide',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Hàm lượng magie nguyên chất cao nhưng hấp thu kém.',
    benefits:[['chac','Sinh khả dụng thấp hơn các dạng tan tốt như citrat, aspartat, lactat, clorua.','NIH ODS – Magnesium']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Hấp thu kém; phần không hấp thu giữ nước trong ruột nên hay gây tiêu chảy.','Thường dùng làm thuốc nhuận tràng.'],
    forms:'Magie oxit. Viên có thể ghi nhiều magie nhưng cơ thể nhận được ít hơn.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mgsunfat:{
    name:'Magie sunfat',aka:'Magnesium sulfate, muối Epsom',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Muối Epsom.',
    benefits:[['chac','Hấp thu kém như oxit, thấp hơn nhóm tan tốt.','NIH ODS – Magnesium']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Dùng uống chủ yếu là nhuận tràng.','Muối Epsom còn dùng ngâm tắm; bài này chỉ nói về dạng uống.'],
    forms:'Magie sunfat (muối Epsom).',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mgglycinat:{
    name:'Magie glycinat / bisglycinat',aka:'Magnesium glycinate, bisglycinate',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Magie gắn với glycin (một axit amin).',
    benefits:[['chuaro','Thường được quảng cáo là dịu với dạ dày. Các nguồn tôi đọc là bài tổng quan cho người dùng, chưa có thử nghiệm so sánh trực tiếp giữa các dạng ở người.','Bài tổng quan tiêu dùng (chưa phải nghiên cứu gốc)']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Thường được mô tả là dịu với đường tiêu hoá.','Chưa có thử nghiệm trực tiếp ở người trong nguồn đã đọc.','Nếu nhãn ghi magie bisglycinate mà không ghi lượng, cần tra lại lượng magie nguyên chất.'],
    forms:'Magie glycinat hoặc bisglycinat.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mgmalat:{
    name:'Magie malat',aka:'Magnesium malate',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Magie gắn với axit malic.',
    benefits:[['chuaro','Bán cho mệt mỏi và đau cơ, bằng chứng chưa rõ. Chưa có thử nghiệm so sánh trực tiếp trong nguồn đã đọc.','Bài tổng quan tiêu dùng (chưa phải nghiên cứu gốc)']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Bán cho mệt mỏi và đau cơ; bằng chứng chưa rõ.'],
    forms:'Magie malat.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mgtaurat:{
    name:'Magie taurat',aka:'Magnesium taurate',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Magie gắn với taurin.',
    benefits:[['chuaro','Bán cho tim mạch và huyết áp, bằng chứng chưa rõ. Chưa có thử nghiệm so sánh trực tiếp trong nguồn đã đọc.','Bài tổng quan tiêu dùng (chưa phải nghiên cứu gốc)']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Bán cho tim mạch và huyết áp; bằng chứng chưa rõ.','Taurin cũng là chất riêng; nếu dùng thêm taurin thì cộng cả hai.'],
    forms:'Magie taurat.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mgthreonat:{
    name:'Magie L-threonat',aka:'Magnesium L-threonate',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Magie gắn với threonat, một dạng được nghiên cứu về não.',
    benefits:[['chuaro','Bán cho trí nhớ và nhận thức; có dữ liệu động vật và sơ bộ ở người, chưa đủ để kết luận.','Bài tổng quan tiêu dùng (chưa phải nghiên cứu gốc)']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Bán cho trí nhớ và nhận thức.','Dữ liệu ở người còn sơ bộ; không nên coi là bằng chứng chắc.'],
    forms:'Magie L-threonat.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mgorotat:{
    name:'Magie orotat',aka:'Magnesium orotate',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Magie gắn với axit orotic.',
    benefits:[['chuaro','Ít có dữ liệu trong nguồn đã đọc; không nêu mức bằng chứng.','Chưa có nguồn đã đọc']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Ít có dữ liệu trong nguồn đã đọc.'],
    forms:'Magie orotat.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mgcarbonat:{
    name:'Magie carbonat',aka:'Magnesium carbonate',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Muối carbonat; cũng có trong thuốc kháng acid.',
    benefits:[['chuaro','Ít có dữ liệu hấp thu riêng trong nguồn đã đọc; không nêu mức bằng chứng.','Chưa có nguồn đã đọc']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Có trong thuốc kháng acid, cộng vào tổng lượng magie trong ngày.','Ít có dữ liệu trong nguồn đã đọc.'],
    forms:'Magie carbonat.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  mghydroxit:{
    name:'Magie hydroxit',aka:'Magnesium hydroxide, sữa magie',updated:'2026-11-03',
    what:'Magie bán dưới nhiều muối khác nhau, mỗi muối chứa lượng magie nguyên chất khác nhau. Điều cần nhìn trên nhãn là lượng magie nguyên chất (elemental), không phải khối lượng cả viên. Muối hydroxit; có trong thuốc kháng acid và nhuận tràng.',
    benefits:[['chuaro','Ít có dữ liệu hấp thu riêng trong nguồn đã đọc; không nêu mức bằng chứng.','Chưa có nguồn đã đọc']],
    need:'Nhu cầu và mức tối đa theo từng người: xem bài Magie. NIH ghi mức tối đa cho magie bổ sung (không tính thức ăn) là 350 mg mỗi ngày với người lớn; EFSA đặt thấp hơn (250 mg). Khi đọc nhãn, cộng lượng magie nguyên chất từ mọi sản phẩm.',
    how:['Có trong thuốc kháng acid và nhuận tràng, cộng vào tổng lượng magie trong ngày.','Ít có dữ liệu trong nguồn đã đọc.'],
    forms:'Magie hydroxit.',
    cautions:['Liều cao từ thực phẩm bổ sung hoặc thuốc có thể gây tiêu chảy, buồn nôn, đau quặn bụng. Liều rất cao có thể gây ngộ độc magie (hạ huyết áp, nôn, khó thở, loạn nhịp tim); đã có vài ca tử vong được báo cáo (NIH).','Thận là cơ quan thải magie chính. Người bệnh thận cần hỏi bác sĩ trước khi dùng magie bổ sung (suy luận từ vai trò của thận, không phải câu NIH trích).'],
    interactions:['Magie có thể tương tác với bisphosphonate đường uống, kháng sinh tetracyclin và nhóm quinolon. Thuốc lợi tiểu và thuốc ức chế bơm proton có thể làm thay đổi tình trạng magie (NIH).'],
    foods:'Rau lá xanh, hạt, đậu, ngũ cốc nguyên hạt; nước khoáng cũng có magie.',
    sources:[['NIH ODS – Magnesium (Health Professional)','https://ods.od.nih.gov/factsheets/Magnesium-HealthProfessional/'],['EFSA – mức tối đa (bảng tổng hợp)','https://www.efsa.europa.eu/sites/default/files/2024-05/ul-summary-report.pdf']]},

  cacarbonat:{
    name:'Canxi carbonat',aka:'Calcium carbonate',updated:'2026-11-03',
    what:'Canxi bán dưới nhiều muối. Nhãn ghi lượng canxi nguyên chất (elemental calcium); đó mới là con số cần cộng, không phải khối lượng cả viên. Một trong hai dạng chính trong thực phẩm bổ sung; cũng có trong thuốc kháng acid.',
    benefits:[['chac','Hấp thu tốt nhất khi uống cùng bữa ăn.','NIH ODS – Calcium (cho người dùng)'],['chac','Người ít acid dạ dày (thường gặp ở người lớn tuổi) hấp thu citrat dễ hơn carbonat.','NIH ODS – Calcium (cho người dùng)'],['cothe','Chứa khoảng 40% canxi nguyên chất (Mayo Clinic), nhiều nhất trong các muối, nên ít viên hơn.','Mayo Clinic']],
    need:'Nhu cầu và mức tối đa theo tuổi: xem bài Canxi. Hấp thu cao nhất khi mỗi lần uống từ 500 mg canxi nguyên chất trở xuống, nên chia liều nếu uống nhiều hơn (NIH, Mayo Clinic).',
    how:['Nhiều canxi nhất mỗi viên (40%), rẻ.','Uống cùng bữa ăn.','Có thể gây đầy hơi và táo bón.'],
    forms:'Canxi carbonat (calcium carbonate).',
    cautions:['Canxi bổ sung quá nhiều có thể gây táo bón và cản hấp thu sắt và kẽm. Người có bệnh thận, sỏi thận hoặc thận có vôi hoá nên hỏi bác sĩ trước khi dùng canxi bổ sung (tổng quan chung, hãy xác nhận với bác sĩ).','Không chỉ uống canxi; đủ vitamin D và vitamin K2 cũng được đề cập trong các bài riêng.'],
    interactions:['Canxi có thể làm giảm hấp thu một số thuốc: thuốc tuyến giáp levothyroxine, kháng sinh tetracyclin và quinolon, bisphosphonate. Nên uống cách xa nhau vài giờ; hỏi dược sĩ giờ uống phù hợp cho từng thuốc.','Canxi cũng làm giảm hấp thu sắt và kẽm khi uống cùng lúc (NIH).'],
    foods:'Sữa, sữa chua, phô mai, cá nhỏ ăn cả xương, rau họ cải, đậu phụ có canxi, đồ uống thực vật tăng cường canxi.',
    sources:[['NIH ODS – Calcium (cho người dùng)','https://ods.od.nih.gov/factsheets/Calcium-Consumer/'],['NIH ODS – Calcium (Health Professional)','https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/'],['Mayo Clinic – Calcium supplements','https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/calcium-supplements/art-20047097']]},

  cacitrat:{
    name:'Canxi citrat',aka:'Calcium citrate',updated:'2026-11-03',
    what:'Canxi bán dưới nhiều muối. Nhãn ghi lượng canxi nguyên chất (elemental calcium); đó mới là con số cần cộng, không phải khối lượng cả viên. Một trong hai dạng chính trong thực phẩm bổ sung.',
    benefits:[['chac','Hấp thu tốt cả lúc đói lẫn lúc no.','NIH ODS – Calcium (cho người dùng)'],['chac','Người ít acid dạ dày hấp thu citrat dễ hơn carbonat.','NIH ODS – Calcium (cho người dùng)'],['cothe','Chứa khoảng 21% canxi nguyên chất (Mayo Clinic), ít hơn carbonat nên có thể phải uống nhiều viên hơn.','Mayo Clinic']],
    need:'Nhu cầu và mức tối đa theo tuổi: xem bài Canxi. Hấp thu cao nhất khi mỗi lần uống từ 500 mg canxi nguyên chất trở xuống, nên chia liều nếu uống nhiều hơn (NIH, Mayo Clinic).',
    how:['Ít canxi hơn mỗi viên (21%) nhưng uống lúc nào cũng được.','Dễ hấp thu hơn khi ít acid dạ dày.'],
    forms:'Canxi citrat (calcium citrate).',
    cautions:['Canxi bổ sung quá nhiều có thể gây táo bón và cản hấp thu sắt và kẽm. Người có bệnh thận, sỏi thận hoặc thận có vôi hoá nên hỏi bác sĩ trước khi dùng canxi bổ sung (tổng quan chung, hãy xác nhận với bác sĩ).','Không chỉ uống canxi; đủ vitamin D và vitamin K2 cũng được đề cập trong các bài riêng.'],
    interactions:['Canxi có thể làm giảm hấp thu một số thuốc: thuốc tuyến giáp levothyroxine, kháng sinh tetracyclin và quinolon, bisphosphonate. Nên uống cách xa nhau vài giờ; hỏi dược sĩ giờ uống phù hợp cho từng thuốc.','Canxi cũng làm giảm hấp thu sắt và kẽm khi uống cùng lúc (NIH).'],
    foods:'Sữa, sữa chua, phô mai, cá nhỏ ăn cả xương, rau họ cải, đậu phụ có canxi, đồ uống thực vật tăng cường canxi.',
    sources:[['NIH ODS – Calcium (cho người dùng)','https://ods.od.nih.gov/factsheets/Calcium-Consumer/'],['NIH ODS – Calcium (Health Professional)','https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/'],['Mayo Clinic – Calcium supplements','https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/calcium-supplements/art-20047097']]},

  calactat:{
    name:'Canxi lactat',aka:'Calcium lactate',updated:'2026-11-03',
    what:'Canxi bán dưới nhiều muối. Nhãn ghi lượng canxi nguyên chất (elemental calcium); đó mới là con số cần cộng, không phải khối lượng cả viên. Muối canxi của axit lactic.',
    benefits:[['cothe','Chứa khoảng 13% canxi nguyên chất (Mayo Clinic); viên nhỏ nên thường phải uống nhiều viên.','Mayo Clinic']],
    need:'Nhu cầu và mức tối đa theo tuổi: xem bài Canxi. Hấp thu cao nhất khi mỗi lần uống từ 500 mg canxi nguyên chất trở xuống, nên chia liều nếu uống nhiều hơn (NIH, Mayo Clinic).',
    how:['Khoảng 13% canxi nguyên chất.','Ít canxi mỗi viên nên thường phải uống nhiều viên.','Nếu bạn đang dùng canxi lactat theo toa, đừng tự thêm dạng khác; hỏi bác sĩ.'],
    forms:'Canxi lactat (calcium lactate).',
    cautions:['Canxi bổ sung quá nhiều có thể gây táo bón và cản hấp thu sắt và kẽm. Người có bệnh thận, sỏi thận hoặc thận có vôi hoá nên hỏi bác sĩ trước khi dùng canxi bổ sung (tổng quan chung, hãy xác nhận với bác sĩ).','Không chỉ uống canxi; đủ vitamin D và vitamin K2 cũng được đề cập trong các bài riêng.'],
    interactions:['Canxi có thể làm giảm hấp thu một số thuốc: thuốc tuyến giáp levothyroxine, kháng sinh tetracyclin và quinolon, bisphosphonate. Nên uống cách xa nhau vài giờ; hỏi dược sĩ giờ uống phù hợp cho từng thuốc.','Canxi cũng làm giảm hấp thu sắt và kẽm khi uống cùng lúc (NIH).'],
    foods:'Sữa, sữa chua, phô mai, cá nhỏ ăn cả xương, rau họ cải, đậu phụ có canxi, đồ uống thực vật tăng cường canxi.',
    sources:[['NIH ODS – Calcium (cho người dùng)','https://ods.od.nih.gov/factsheets/Calcium-Consumer/'],['NIH ODS – Calcium (Health Professional)','https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/'],['Mayo Clinic – Calcium supplements','https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/calcium-supplements/art-20047097']]},

  cagluconat:{
    name:'Canxi gluconat',aka:'Calcium gluconate',updated:'2026-11-03',
    what:'Canxi bán dưới nhiều muối. Nhãn ghi lượng canxi nguyên chất (elemental calcium); đó mới là con số cần cộng, không phải khối lượng cả viên. Muối canxi của axit gluconic.',
    benefits:[['cothe','Chứa khoảng 9% canxi nguyên chất (Mayo Clinic), ít nhất trong các muối thông dụng.','Mayo Clinic']],
    need:'Nhu cầu và mức tối đa theo tuổi: xem bài Canxi. Hấp thu cao nhất khi mỗi lần uống từ 500 mg canxi nguyên chất trở xuống, nên chia liều nếu uống nhiều hơn (NIH, Mayo Clinic).',
    how:['Khoảng 9% canxi nguyên chất, rất ít mỗi viên.','Phải uống nhiều viên mới đủ lượng canxi nguyên chất.'],
    forms:'Canxi gluconat (calcium gluconate).',
    cautions:['Canxi bổ sung quá nhiều có thể gây táo bón và cản hấp thu sắt và kẽm. Người có bệnh thận, sỏi thận hoặc thận có vôi hoá nên hỏi bác sĩ trước khi dùng canxi bổ sung (tổng quan chung, hãy xác nhận với bác sĩ).','Không chỉ uống canxi; đủ vitamin D và vitamin K2 cũng được đề cập trong các bài riêng.'],
    interactions:['Canxi có thể làm giảm hấp thu một số thuốc: thuốc tuyến giáp levothyroxine, kháng sinh tetracyclin và quinolon, bisphosphonate. Nên uống cách xa nhau vài giờ; hỏi dược sĩ giờ uống phù hợp cho từng thuốc.','Canxi cũng làm giảm hấp thu sắt và kẽm khi uống cùng lúc (NIH).'],
    foods:'Sữa, sữa chua, phô mai, cá nhỏ ăn cả xương, rau họ cải, đậu phụ có canxi, đồ uống thực vật tăng cường canxi.',
    sources:[['NIH ODS – Calcium (cho người dùng)','https://ods.od.nih.gov/factsheets/Calcium-Consumer/'],['NIH ODS – Calcium (Health Professional)','https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/'],['Mayo Clinic – Calcium supplements','https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/calcium-supplements/art-20047097']]},

  caphosphat:{
    name:'Canxi phosphat',aka:'Tricalcium phosphate, calcium phosphate',updated:'2026-11-03',
    what:'Canxi bán dưới nhiều muối. Nhãn ghi lượng canxi nguyên chất (elemental calcium); đó mới là con số cần cộng, không phải khối lượng cả viên. Muối canxi với phosphat; có trong một số thực phẩm bổ sung và thực phẩm tăng cường.',
    benefits:[['chuaro','Có trong thực phẩm bổ sung nhưng ít dữ liệu so sánh trong nguồn đã đọc.','Chưa có nguồn đã đọc']],
    need:'Nhu cầu và mức tối đa theo tuổi: xem bài Canxi. Hấp thu cao nhất khi mỗi lần uống từ 500 mg canxi nguyên chất trở xuống, nên chia liều nếu uống nhiều hơn (NIH, Mayo Clinic).',
    how:['Ít dữ liệu so sánh hấp thu trong nguồn đã đọc.'],
    forms:'Canxi phosphat (tricalcium phosphate).',
    cautions:['Canxi bổ sung quá nhiều có thể gây táo bón và cản hấp thu sắt và kẽm. Người có bệnh thận, sỏi thận hoặc thận có vôi hoá nên hỏi bác sĩ trước khi dùng canxi bổ sung (tổng quan chung, hãy xác nhận với bác sĩ).','Không chỉ uống canxi; đủ vitamin D và vitamin K2 cũng được đề cập trong các bài riêng.'],
    interactions:['Canxi có thể làm giảm hấp thu một số thuốc: thuốc tuyến giáp levothyroxine, kháng sinh tetracyclin và quinolon, bisphosphonate. Nên uống cách xa nhau vài giờ; hỏi dược sĩ giờ uống phù hợp cho từng thuốc.','Canxi cũng làm giảm hấp thu sắt và kẽm khi uống cùng lúc (NIH).'],
    foods:'Sữa, sữa chua, phô mai, cá nhỏ ăn cả xương, rau họ cải, đậu phụ có canxi, đồ uống thực vật tăng cường canxi.',
    sources:[['NIH ODS – Calcium (cho người dùng)','https://ods.od.nih.gov/factsheets/Calcium-Consumer/'],['NIH ODS – Calcium (Health Professional)','https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/'],['Mayo Clinic – Calcium supplements','https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/calcium-supplements/art-20047097']]},

  casunfat:{
    name:'Canxi sunfat',aka:'Calcium sulfate',updated:'2026-11-03',
    what:'Canxi bán dưới nhiều muối. Nhãn ghi lượng canxi nguyên chất (elemental calcium); đó mới là con số cần cộng, không phải khối lượng cả viên. Muối canxi với sunfat.',
    benefits:[['chuaro','Có trong thực phẩm bổ sung nhưng ít dữ liệu so sánh trong nguồn đã đọc.','Chưa có nguồn đã đọc']],
    need:'Nhu cầu và mức tối đa theo tuổi: xem bài Canxi. Hấp thu cao nhất khi mỗi lần uống từ 500 mg canxi nguyên chất trở xuống, nên chia liều nếu uống nhiều hơn (NIH, Mayo Clinic).',
    how:['Ít dữ liệu so sánh hấp thu trong nguồn đã đọc.'],
    forms:'Canxi sunfat (calcium sulfate).',
    cautions:['Canxi bổ sung quá nhiều có thể gây táo bón và cản hấp thu sắt và kẽm. Người có bệnh thận, sỏi thận hoặc thận có vôi hoá nên hỏi bác sĩ trước khi dùng canxi bổ sung (tổng quan chung, hãy xác nhận với bác sĩ).','Không chỉ uống canxi; đủ vitamin D và vitamin K2 cũng được đề cập trong các bài riêng.'],
    interactions:['Canxi có thể làm giảm hấp thu một số thuốc: thuốc tuyến giáp levothyroxine, kháng sinh tetracyclin và quinolon, bisphosphonate. Nên uống cách xa nhau vài giờ; hỏi dược sĩ giờ uống phù hợp cho từng thuốc.','Canxi cũng làm giảm hấp thu sắt và kẽm khi uống cùng lúc (NIH).'],
    foods:'Sữa, sữa chua, phô mai, cá nhỏ ăn cả xương, rau họ cải, đậu phụ có canxi, đồ uống thực vật tăng cường canxi.',
    sources:[['NIH ODS – Calcium (cho người dùng)','https://ods.od.nih.gov/factsheets/Calcium-Consumer/'],['NIH ODS – Calcium (Health Professional)','https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/'],['Mayo Clinic – Calcium supplements','https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/calcium-supplements/art-20047097']]},

  caascorbat:{
    name:'Canxi ascorbat',aka:'Calcium ascorbate',updated:'2026-11-03',
    what:'Canxi bán dưới nhiều muối. Nhãn ghi lượng canxi nguyên chất (elemental calcium); đó mới là con số cần cộng, không phải khối lượng cả viên. Muối canxi của vitamin C (dạng vitamin C đệm, ít chua).',
    benefits:[['chuaro','Có trong thực phẩm bổ sung nhưng ít dữ liệu so sánh trong nguồn đã đọc.','Chưa có nguồn đã đọc']],
    need:'Nhu cầu và mức tối đa theo tuổi: xem bài Canxi. Hấp thu cao nhất khi mỗi lần uống từ 500 mg canxi nguyên chất trở xuống, nên chia liều nếu uống nhiều hơn (NIH, Mayo Clinic).',
    how:['Vừa có canxi vừa có vitamin C; khi đọc nhãn cộng cả hai vào tổng của từng chất.','Ít dữ liệu so sánh hấp thu trong nguồn đã đọc.'],
    forms:'Canxi ascorbat (calcium ascorbate).',
    cautions:['Canxi bổ sung quá nhiều có thể gây táo bón và cản hấp thu sắt và kẽm. Người có bệnh thận, sỏi thận hoặc thận có vôi hoá nên hỏi bác sĩ trước khi dùng canxi bổ sung (tổng quan chung, hãy xác nhận với bác sĩ).','Không chỉ uống canxi; đủ vitamin D và vitamin K2 cũng được đề cập trong các bài riêng.'],
    interactions:['Canxi có thể làm giảm hấp thu một số thuốc: thuốc tuyến giáp levothyroxine, kháng sinh tetracyclin và quinolon, bisphosphonate. Nên uống cách xa nhau vài giờ; hỏi dược sĩ giờ uống phù hợp cho từng thuốc.','Canxi cũng làm giảm hấp thu sắt và kẽm khi uống cùng lúc (NIH).'],
    foods:'Sữa, sữa chua, phô mai, cá nhỏ ăn cả xương, rau họ cải, đậu phụ có canxi, đồ uống thực vật tăng cường canxi.',
    sources:[['NIH ODS – Calcium (cho người dùng)','https://ods.od.nih.gov/factsheets/Calcium-Consumer/'],['NIH ODS – Calcium (Health Professional)','https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/'],['Mayo Clinic – Calcium supplements','https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/calcium-supplements/art-20047097']]},

  cahydroxyapatit:{
    name:'Canxi hydroxyapatit (MCHC)',aka:'Microcrystalline hydroxyapatite, MCHC',updated:'2026-11-03',
    what:'Canxi bán dưới nhiều muối. Nhãn ghi lượng canxi nguyên chất (elemental calcium); đó mới là con số cần cộng, không phải khối lượng cả viên. Dạng canxi vi tinh thể lấy từ xương, chứa cả phosphat và một ít protein.',
    benefits:[['chuaro','Được quảng cáo là hấp thu tốt cho xương; các nguồn tôi đọc không có thử nghiệm so sánh trực tiếp ở người.','Chưa có nguồn đã đọc']],
    need:'Nhu cầu và mức tối đa theo tuổi: xem bài Canxi. Hấp thu cao nhất khi mỗi lần uống từ 500 mg canxi nguyên chất trở xuống, nên chia liều nếu uống nhiều hơn (NIH, Mayo Clinic).',
    how:['Ít dữ liệu so sánh trong nguồn đã đọc.'],
    forms:'Canxi hydroxyapatit vi tinh thể (MCHC).',
    cautions:['Canxi bổ sung quá nhiều có thể gây táo bón và cản hấp thu sắt và kẽm. Người có bệnh thận, sỏi thận hoặc thận có vôi hoá nên hỏi bác sĩ trước khi dùng canxi bổ sung (tổng quan chung, hãy xác nhận với bác sĩ).','Không chỉ uống canxi; đủ vitamin D và vitamin K2 cũng được đề cập trong các bài riêng.'],
    interactions:['Canxi có thể làm giảm hấp thu một số thuốc: thuốc tuyến giáp levothyroxine, kháng sinh tetracyclin và quinolon, bisphosphonate. Nên uống cách xa nhau vài giờ; hỏi dược sĩ giờ uống phù hợp cho từng thuốc.','Canxi cũng làm giảm hấp thu sắt và kẽm khi uống cùng lúc (NIH).'],
    foods:'Sữa, sữa chua, phô mai, cá nhỏ ăn cả xương, rau họ cải, đậu phụ có canxi, đồ uống thực vật tăng cường canxi.',
    sources:[['NIH ODS – Calcium (cho người dùng)','https://ods.od.nih.gov/factsheets/Calcium-Consumer/'],['NIH ODS – Calcium (Health Professional)','https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/'],['Mayo Clinic – Calcium supplements','https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/calcium-supplements/art-20047097']]},

  cabisglycinat:{
    name:'Canxi bisglycinat',aka:'Calcium bisglycinate, calcium glycinate (chelat)',updated:'2026-11-03',
    what:'Canxi bán dưới nhiều muối. Nhãn ghi lượng canxi nguyên chất (elemental calcium); đó mới là con số cần cộng, không phải khối lượng cả viên. Canxi gắn với glycin (một dạng chelat).',
    benefits:[['chuaro','Được quảng cáo là dịu với dạ dày; chưa có so sánh trực tiếp ở người trong nguồn đã đọc.','Chưa có nguồn đã đọc']],
    need:'Nhu cầu và mức tối đa theo tuổi: xem bài Canxi. Hấp thu cao nhất khi mỗi lần uống từ 500 mg canxi nguyên chất trở xuống, nên chia liều nếu uống nhiều hơn (NIH, Mayo Clinic).',
    how:['Được quảng cáo là dịu với dạ dày.','Chưa có so sánh trực tiếp ở người trong nguồn đã đọc.'],
    forms:'Canxi bisglycinat (chelat).',
    cautions:['Canxi bổ sung quá nhiều có thể gây táo bón và cản hấp thu sắt và kẽm. Người có bệnh thận, sỏi thận hoặc thận có vôi hoá nên hỏi bác sĩ trước khi dùng canxi bổ sung (tổng quan chung, hãy xác nhận với bác sĩ).','Không chỉ uống canxi; đủ vitamin D và vitamin K2 cũng được đề cập trong các bài riêng.'],
    interactions:['Canxi có thể làm giảm hấp thu một số thuốc: thuốc tuyến giáp levothyroxine, kháng sinh tetracyclin và quinolon, bisphosphonate. Nên uống cách xa nhau vài giờ; hỏi dược sĩ giờ uống phù hợp cho từng thuốc.','Canxi cũng làm giảm hấp thu sắt và kẽm khi uống cùng lúc (NIH).'],
    foods:'Sữa, sữa chua, phô mai, cá nhỏ ăn cả xương, rau họ cải, đậu phụ có canxi, đồ uống thực vật tăng cường canxi.',
    sources:[['NIH ODS – Calcium (cho người dùng)','https://ods.od.nih.gov/factsheets/Calcium-Consumer/'],['NIH ODS – Calcium (Health Professional)','https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/'],['Mayo Clinic – Calcium supplements','https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/calcium-supplements/art-20047097']]},

  cacitratmalat:{
    name:'Canxi citrat-malat',aka:'Calcium citrate malate',updated:'2026-11-03',
    what:'Canxi bán dưới nhiều muối. Nhãn ghi lượng canxi nguyên chất (elemental calcium); đó mới là con số cần cộng, không phải khối lượng cả viên. Muối canxi kép của citrat và malat; thường có trong nước ép tăng cường canxi.',
    benefits:[['chuaro','Bằng chứng riêng chưa đọc; không nêu mức bằng chứng.','Chưa có nguồn đã đọc']],
    need:'Nhu cầu và mức tối đa theo tuổi: xem bài Canxi. Hấp thu cao nhất khi mỗi lần uống từ 500 mg canxi nguyên chất trở xuống, nên chia liều nếu uống nhiều hơn (NIH, Mayo Clinic).',
    how:['Có trong một số thực phẩm tăng cường như nước ép.','Bằng chứng riêng chưa đọc.'],
    forms:'Canxi citrat-malat (calcium citrate malate).',
    cautions:['Canxi bổ sung quá nhiều có thể gây táo bón và cản hấp thu sắt và kẽm. Người có bệnh thận, sỏi thận hoặc thận có vôi hoá nên hỏi bác sĩ trước khi dùng canxi bổ sung (tổng quan chung, hãy xác nhận với bác sĩ).','Không chỉ uống canxi; đủ vitamin D và vitamin K2 cũng được đề cập trong các bài riêng.'],
    interactions:['Canxi có thể làm giảm hấp thu một số thuốc: thuốc tuyến giáp levothyroxine, kháng sinh tetracyclin và quinolon, bisphosphonate. Nên uống cách xa nhau vài giờ; hỏi dược sĩ giờ uống phù hợp cho từng thuốc.','Canxi cũng làm giảm hấp thu sắt và kẽm khi uống cùng lúc (NIH).'],
    foods:'Sữa, sữa chua, phô mai, cá nhỏ ăn cả xương, rau họ cải, đậu phụ có canxi, đồ uống thực vật tăng cường canxi.',
    sources:[['NIH ODS – Calcium (cho người dùng)','https://ods.od.nih.gov/factsheets/Calcium-Consumer/'],['NIH ODS – Calcium (Health Professional)','https://ods.od.nih.gov/factsheets/Calcium-HealthProfessional/'],['Mayo Clinic – Calcium supplements','https://www.mayoclinic.org/healthy-lifestyle/nutrition-and-healthy-eating/in-depth/calcium-supplements/art-20047097']]},
};

/* Nhóm danh mục: thứ tự hiển thị và các chất trong từng nhóm (khoá của KB) */
window.KB_CATS=[
  {n:'Vitamin',keys:['vitA','b1','b2','niacin','b5','b6','biotin','folic','b12','bcomplex','choline','vitC','vitD','vitE','vitK']},
  {n:'Khoáng chất',keys:['ca','cacarbonat','cacitrat','calactat','cagluconat','caphosphat','casunfat','caascorbat','cahydroxyapatit','cabisglycinat','cacitratmalat','mg','mgcitrat','mglactat','mgclorua','mgaspartat','mgoxit','mgsunfat','mgglycinat','mgmalat','mgtaurat','mgthreonat','mgorotat','mgcarbonat','mghydroxit','fe','zn','cu','mn','se','io','boron']},
  {n:'Chống oxy hoá và hợp chất khác',keys:['gsh','ala','quercetin','lycopene','inositol']},
  {n:'Đạm, omega-3 và năng lượng',keys:['protein','om3','creatine','coq10','nmn','pqq']},
  {n:'Khớp, da và mắt',keys:['collagen','gluco','boswellia','curc','astaxanthin','lutein']},
  {n:'Tiêu hoá và men vi sinh',keys:['probiotic','probstrain','kefir']},
  {n:'Thảo dược và thực phẩm tự nhiên',keys:['blackgarlic','honey','algae','ginger','greentea','ginseng','ginkgo','stjohn','ashwagandha','echinacea','valerian']}
];

/* Bản đồ chủ đề sức khoẻ. Sinh ra từ chính mục benefits trong KB ở trên và đã soát tay từng liên kết.
   Mức: chac = đã chứng minh, cothe = có thể có lợi, chuaro = chưa rõ, khong = đã thử, không thấy tác dụng.
   Mỗi chất lấy mức bằng chứng TỐT NHẤT mà nó có cho chủ đề đó. Không tự thêm công dụng nào ngoài KB. */
window.KB_TOPICS=[
  {id:'xuong',e:'🦴',n:'Xương và răng',re:"xương|răng|còi xương|nhuyễn xương|loãng xương",subs:[['ca','chac'],['mg','chac'],['vitD','chac'],['vitK','chac'],['boron','chuaro'],['mn','chuaro']]},
  {id:'mau',e:'🩸',n:'Máu và thiếu máu',re:"thiếu máu|hồng cầu|huyết sắc tố|đông máu|hemoglobin",subs:[['ca','chac'],['cu','chac'],['fe','chac'],['b12','chac'],['vitK','chac']]},
  {id:'mien',e:'🛡️',n:'Miễn dịch và đề kháng',re:"miễn dịch|đề kháng|cảm lạnh|nhiễm trùng|nhiễm khuẩn",subs:[['zn','chac'],['echinacea','cothe'],['vitC','cothe'],['algae','chuaro'],['blackgarlic','chuaro']]},
  {id:'tim',e:'❤️',n:'Tim mạch và huyết áp',re:"tim mạch|huyết áp|triglycerid|cholesterol|mạch máu|tuần hoàn",subs:[['om3','chac'],['mg','cothe'],['blackgarlic','cothe'],['greentea','cothe'],['probiotic','khong'],['se','khong'],['b12','khong'],['vitC','khong'],['vitD','khong'],['folic','chuaro'],['choline','chuaro'],['cu','chuaro'],['lycopene','chuaro'],['ginseng','chuaro'],['b5','chuaro'],['b6','chuaro'],['vitE','chuaro']]},
  {id:'nao',e:'🧠',n:'Não, trí nhớ, thần kinh',re:"não|nhận thức|trí nhớ|thần kinh|tập trung|sa sút trí tuệ",subs:[['folic','chac'],['biotin','chac'],['ca','chac'],['zn','chac'],['mg','chac'],['om3','chac'],['b12','chac'],['ala','cothe'],['ginkgo','khong'],['ashwagandha','chuaro'],['astaxanthin','chuaro'],['boron','chuaro'],['creatine','chuaro'],['ginseng','chuaro'],['pqq','chuaro'],['se','chuaro'],['b6','chuaro'],['vitE','chuaro']]},
  {id:'ngu',e:'😴',n:'Giấc ngủ và căng thẳng',re:"giấc ngủ|mất ngủ|dễ ngủ|lo âu|căng thẳng|thư giãn|stress",subs:[['ashwagandha','cothe'],['valerian','khong'],['creatine','chuaro'],['ginkgo','chuaro'],['nmn','chuaro']]},
  {id:'tieuhoa',e:'🍽️',n:'Tiêu hoá và đường ruột',re:"tiêu hoá|tiêu hóa|đường ruột|hệ vi sinh|táo bón|tiêu chảy|dạ dày|ruột",subs:[['ca','chac'],['niacin','chac'],['zn','cothe'],['probiotic','cothe'],['boswellia','chuaro'],['stjohn','chuaro'],['gsh','chuaro'],['mg','chuaro']]},
  {id:'co',e:'💪',n:'Cơ bắp và vận động',re:"khối lượng cơ|chức năng cơ|khối cơ|sức mạnh|gắng sức|tập kháng lực|thể lực|vận động|đau cơ",subs:[['ca','chac'],['creatine','chac'],['protein','chac'],['mg','chac'],['astaxanthin','cothe'],['greentea','cothe'],['coq10','khong'],['nmn','khong'],['boswellia','chuaro'],['quercetin','chuaro']]},
  {id:'khop',e:'🦵',n:'Khớp và sụn',re:"khớp|sụn|thoái hoá khớp|viêm khớp",subs:[['collagen','cothe'],['curc','cothe'],['om3','cothe'],['gluco','khong'],['boswellia','chuaro'],['boron','chuaro'],['ginger','chuaro']]},
  {id:'mat',e:'👁️',n:'Mắt và thị lực',re:"thị lực|thị giác|võng mạc|điểm vàng|mắt",subs:[['zn','chac'],['om3','chac'],['vitA','chac'],['lutein','cothe'],['vitC','cothe'],['vitE','cothe']]},
  {id:'da',e:'✨',n:'Da, tóc và móng',re:"\\bda\\b|tóc|móng|nếp nhăn|biểu mô",subs:[['biotin','chac'],['zn','chac'],['vitA','chac'],['astaxanthin','cothe'],['collagen','cothe'],['gsh','chuaro']]},
  {id:'thai',e:'🤰',n:'Thai kỳ và sinh sản',re:"thai|mang thai|ống thần kinh|sinh sản|bà bầu",subs:[['folic','chac'],['io','chac'],['zn','chac'],['fe','chac'],['ca','cothe'],['ginger','cothe'],['inositol','chuaro'],['se','chuaro'],['b6','chuaro']]},
  {id:'giap',e:'🦋',n:'Tuyến giáp',re:"tuyến giáp|i-ốt|iod",subs:[['io','chac'],['se','chac']]},
  {id:'metmoi',e:'⚡',n:'Mệt mỏi và năng lượng',re:"mệt mỏi|uể oải|năng lượng|chuyển hoá năng lượng",subs:[['mg','chac'],['ginseng','cothe'],['bcomplex','khong'],['b12','khong']]},
  {id:'thieu',e:'🧪',n:'Bù thiếu hụt vi chất',re:"phòng và chữa thiếu|thiếu hụt|bệnh pellagra|beriberi|scorbut|còi xương",subs:[['biotin','chac'],['niacin','chac'],['fe','chac'],['bcomplex','chac'],['b1','chac'],['b2','chac'],['vitD','chac'],['vitE','chac']]},
  {id:'tamtrang',e:'🙂',n:'Tâm trạng và lo âu',re:"trầm cảm|lo âu|tâm trạng|tiền kinh nguyệt",subs:[['stjohn','cothe'],['b6','cothe'],['vitD','khong'],['ashwagandha','chuaro'],['folic','chuaro'],['ginkgo','chuaro'],['om3','chuaro'],['valerian','chuaro']]},
  {id:'gan',e:'🫀',n:'Gan',re:"gan nhiễm mỡ|chức năng gan|\\bgan\\b",subs:[['choline','chuaro'],['curc','chuaro'],['blackgarlic','chuaro']]},
  {id:'duong',e:'🍬',n:'Đường huyết và tiểu đường',re:"đường huyết|tiểu đường|insulin|chuyển hoá đường",subs:[['ala','cothe'],['vitD','khong'],['ashwagandha','chuaro'],['inositol','chuaro'],['zn','chuaro'],['mg','chuaro'],['mn','chuaro'],['ginseng','chuaro'],['nmn','chuaro'],['b1','chuaro']]},
  {id:'ho',e:'🤧',n:'Ho, họng và cảm lạnh',re:"ho cấp|cơn ho|trị ho|viêm họng|đau họng|cảm lạnh",subs:[['echinacea','cothe'],['zn','cothe'],['honey','cothe'],['vitC','cothe']]},
];
/* Các dạng muối gom về chất mẹ, để Thư viện không đổ 13 chip magie ra màn hình. */
window.KB_FAMILY={
  mg:{n:'Magie',forms:['mgcitrat','mglactat','mgclorua','mgaspartat','mgoxit','mgsunfat','mgglycinat','mgmalat','mgtaurat','mgthreonat','mgorotat','mgcarbonat','mghydroxit']},
  ca:{n:'Canxi',forms:['cacarbonat','cacitrat','calactat','cagluconat','caphosphat','casunfat','caascorbat','cahydroxyapatit','cabisglycinat','cacitratmalat']},
  probiotic:{n:'Men vi sinh',forms:['probstrain','kefir']},
};

/* Tên gọi khác trên nhãn sản phẩm -> khoá chất trong KB, cho các chất chưa có trong bảng cảnh báo (NUTR).
   Mỗi mẫu là biểu thức chính quy (không phân biệt hoa thường). Chỉ dùng khi NUTR không khớp.
   Cố ý KHÔNG gộp những tên mơ hồ: "ALA" trơn (vừa là alpha-lipoic vừa là alpha-linolenic), "med", "sâm" trơn, "lecithin" (phụ liệu). */
window.KB_ALIAS={
  b1:'vitamin\\s*b-?1\\b|thiamin|benfotiamin',
  b2:'vitamin\\s*b-?2\\b|riboflavin',
  b5:'vitamin\\s*b-?5\\b|pantothen|pantethin',
  b12:'vitamin\\s*b-?12\\b|cobalamin',
  biotin:'biotin|vitamin\\s*b-?7\\b|vitamin\\s*h\\b',
  bcomplex:'b-?complex|vitamin\\s*b\\s*complex',
  choline:'cholin(?!esterase)|phosphatidylcholin',
  creatine:'creatin|creapure',
  astaxanthin:'astaxanthin|haematococcus',
  lutein:'lutein|zeaxanthin|marigold|tagetes',
  lycopene:'lycopen',
  nmn:'\\bnmn\\b|nicotinamide mononucleotide',
  pqq:'\\bpqq\\b|pyrroloquinoline',
  coq10:'coenzyme\\s*q-?10|ubiquino[nl]|\\bcoq-?10\\b',
  ala:'alpha[\\s-]*lipoic|lipoic acid|α-?lipoic',
  gsh:'glutathion|\\bgsh\\b',
  quercetin:'quercetin',
  inositol:'inositol',
  protein:'\\bprotein\\b|\\bwhey\\b|bílkovin',
  collagen:'collagen|\\buc-?ii\\b',
  gluco:'glucosamin|chondroitin',
  boswellia:'boswellia|\\bakba\\b|nhũ hương',
  blackgarlic:'black garlic|aged garlic|tỏi đen|s-allyl',
  probiotic:'probiotic|lactobacill|bifidobacter|saccharomyces|men vi sinh',
  algae:'spirulin|chlorell|\\balgae\\b|tảo',
  honey:'\\bhoney\\b|mật ong',
  ginger:'ginger|zingiber|zázvor|gừng',
  greentea:'green tea|camellia sinensis|egcg|catechin|trà xanh',
  ginseng:'ginseng|panax|nhân sâm',
  ginkgo:'ginkgo|bạch quả',
  stjohn:'st\\.? john|hypericum|cỏ st',
  ashwagandha:'ashwagandha|withania',
  echinacea:'echinacea|cúc nhím',
  valerian:'valerian|nữ lang'
};
/* Bổ sung cho các chất ĐÃ có trong NUTR nhưng tên đầy đủ trên nhãn không khớp mẫu hiện tại.
   Áp dụng thẳng vào mẫu của NUTR để tổng liều và cảnh báo cũng tính đúng. */
window.NUTR_EXTRA={
  om3:'docosahexaen|eicosapentaen',
  cu:'(^|[^a-zà-ỹ])đồng($|[^a-zà-ỹ])'
};
