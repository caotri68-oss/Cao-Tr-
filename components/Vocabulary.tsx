import React, { useState, useMemo, useEffect, useRef } from 'react';
import { VocabItem } from '../types';
import { Volume2, VolumeX, Search, RotateCw, ArrowLeft, ArrowRight, Layers, List, Brain, Settings2, Sparkles, ChevronDown, Play, Pause, Square, Timer, SkipBack, SkipForward, BookOpen, Wand2, RefreshCw } from 'lucide-react';
import { GoogleGenAI, Modality } from '@google/genai';
import { base64ToUint8Array, decodeAudioData } from '../services/audioUtils';

const VOCAB_DATA: VocabItem[] = [
  // --- 50 ĐỘNG TỪ (SLOVESA) ---
  { czech: 'Být', vietnamese: 'Thì, là, ở', exampleCz: 'Jsem doma.', exampleVn: 'Tôi đang ở nhà.', exampleEn: 'I am at home.', category: 'Động từ' },
  { czech: 'Mít', vietnamese: 'Có', exampleCz: 'Mám auto.', exampleVn: 'Tôi có xe hơi.', exampleEn: 'I have a car.', category: 'Động từ' },
  { czech: 'Dělat', vietnamese: 'Làm', exampleCz: 'Co děláš?', exampleVn: 'Bạn đang làm gì?', exampleEn: 'What are you doing?', category: 'Động từ' },
  { czech: 'Jít', vietnamese: 'Đi (bộ)', exampleCz: 'Jdu do práce.', exampleVn: 'Tôi đi bộ đi làm.', exampleEn: 'I am walking to work.', category: 'Động từ' },
  { czech: 'Jet', vietnamese: 'Đi (xe/tàu)', exampleCz: 'Jedu do Prahy.', exampleVn: 'Tôi đi xe đến Praha.', exampleEn: 'I am going to Prague.', category: 'Động từ' },
  { czech: 'Chtít', vietnamese: 'Muốn', exampleCz: 'Chci spát.', exampleVn: 'Tôi muốn ngủ.', exampleEn: 'I want to sleep.', category: 'Động từ' },
  { czech: 'Muset', vietnamese: 'Phải', exampleCz: 'Musím se učit.', exampleVn: 'Tôi phải học.', exampleEn: 'I have to study.', category: 'Động từ' },
  { czech: 'Moci', vietnamese: 'Có thể', exampleCz: 'Můžeš mi pomoct?', exampleVn: 'Bạn có thể giúp tôi không?', exampleEn: 'Can you help me?', category: 'Động từ' },
  { czech: 'Umět', vietnamese: 'Biết (kỹ năng)', exampleCz: 'Umím plavat.', exampleVn: 'Tôi biết bơi.', exampleEn: 'I know how to swim.', category: 'Động từ' },
  { czech: 'Vědět', vietnamese: 'Biết (thông tin)', exampleCz: 'Nevím, kde to je.', exampleVn: 'Tôi không biết nó ở đâu.', exampleEn: 'I do not know where it is.', category: 'Động từ' },
  { czech: 'Znát', vietnamese: 'Quen biết', exampleCz: 'Znáš ho?', exampleVn: 'Bạn có quen anh ấy không?', exampleEn: 'Do you know him?', category: 'Động từ' },
  { czech: 'Rozumět', vietnamese: 'Hiểu', exampleCz: 'Nerozumím česky.', exampleVn: 'Tôi không hiểu tiếng Séc.', exampleEn: 'I do not understand Czech.', category: 'Động từ' },
  { czech: 'Mluvit', vietnamese: 'Nói', exampleCz: 'Mluvíte anglicky?', exampleVn: 'Bạn nói tiếng Anh không?', exampleEn: 'Do you speak English?', category: 'Động từ' },
  { czech: 'Číst', vietnamese: 'Đọc', exampleCz: 'Rád čtu knihy.', exampleVn: 'Tôi thích đọc sách.', exampleEn: 'I like reading books.', category: 'Động từ' },
  { czech: 'Psát', vietnamese: 'Viết', exampleCz: 'Píšu dopis.', exampleVn: 'Tôi đang viết thư.', exampleEn: 'I am writing a letter.', category: 'Động từ' },
  { czech: 'Poslouchat', vietnamese: 'Nghe', exampleCz: 'Poslouchám hudbu.', exampleVn: 'Tôi đang nghe nhạc.', exampleEn: 'I am listening to music.', category: 'Động từ' },
  { czech: 'Vidět', vietnamese: 'Nhìn thấy', exampleCz: 'Vidím tě.', exampleVn: 'Tôi thấy bạn.', exampleEn: 'I see you.', category: 'Động từ' },
  { czech: 'Slyšet', vietnamese: 'Nghe thấy', exampleCz: 'Slyšíš to?', exampleVn: 'Bạn có nghe thấy cái đó không?', exampleEn: 'Do you hear that?', category: 'Động từ' },
  { czech: 'Jíst', vietnamese: 'Ăn', exampleCz: 'Jím oběd.', exampleVn: 'Tôi đang ăn trưa.', exampleEn: 'I am eating lunch.', category: 'Động từ' },
  { czech: 'Pít', vietnamese: 'Uống', exampleCz: 'Piju kávu.', exampleVn: 'Tôi uống cà phê.', exampleEn: 'I am drinking coffee.', category: 'Động từ' },
  { czech: 'Spát', vietnamese: 'Ngủ', exampleCz: 'Dítě spí.', exampleVn: 'Đứa trẻ đang ngủ.', exampleEn: 'The child is sleeping.', category: 'Động từ' },
  { czech: 'Vstávat', vietnamese: 'Thức dậy', exampleCz: 'Vstávám v šest.', exampleVn: 'Tôi dậy lúc 6 giờ.', exampleEn: 'I get up at six.', category: 'Động từ' },
  { czech: 'Bydlet', vietnamese: 'Cư trú/Sống', exampleCz: 'Kde bydlíš?', exampleVn: 'Bạn sống ở đâu?', exampleEn: 'Where do you live?', category: 'Động từ' },
  { czech: 'Žít', vietnamese: 'Sống (tồn tại)', exampleCz: 'Chci žít v Česku.', exampleVn: 'Tôi muốn sống ở Séc.', exampleEn: 'I want to live in Czechia.', category: 'Động từ' },
  { czech: 'Pracovat', vietnamese: 'Làm việc', exampleCz: 'Pracuji v kanceláři.', exampleVn: 'Tôi làm việc ở văn phòng.', exampleEn: 'I work in an office.', category: 'Động từ' },
  { czech: 'Studovat', vietnamese: 'Học (đại học/nghiên cứu)', exampleCz: 'Studuji medicínu.', exampleVn: 'Tôi học y.', exampleEn: 'I study medicine.', category: 'Động từ' },
  { czech: 'Učit se', vietnamese: 'Học (kỹ năng/bài)', exampleCz: 'Učím se česky.', exampleVn: 'Tôi đang học tiếng Séc.', exampleEn: 'I am learning Czech.', category: 'Động từ' },
  { czech: 'Nakupovat', vietnamese: 'Mua sắm', exampleCz: 'Jdu nakupovat.', exampleVn: 'Tôi đi mua sắm.', exampleEn: 'I am going shopping.', category: 'Động từ' },
  { czech: 'Platit', vietnamese: 'Thanh toán', exampleCz: 'Zaplatím to.', exampleVn: 'Tôi sẽ trả tiền cái này.', exampleEn: 'I will pay for it.', category: 'Động từ' },
  { czech: 'Stát', vietnamese: 'Đứng / Có giá', exampleCz: 'Kolik to stojí?', exampleVn: 'Cái này giá bao nhiêu?', exampleEn: 'How much does it cost?', category: 'Động từ' },
  { czech: 'Čekat', vietnamese: 'Chờ đợi', exampleCz: 'Čekám na tebe.', exampleVn: 'Tôi đang đợi bạn.', exampleEn: 'I am waiting for you.', category: 'Động từ' },
  { czech: 'Hledat', vietnamese: 'Tìm kiếm', exampleCz: 'Hledám klíče.', exampleVn: 'Tôi đang tìm chìa khóa.', exampleEn: 'I am looking for keys.', category: 'Động từ' },
  { czech: 'Najít', vietnamese: 'Tìm thấy', exampleCz: 'Našel jsem to.', exampleVn: 'Tôi đã tìm thấy nó.', exampleEn: 'I found it.', category: 'Động từ' },
  { czech: 'Ztratit', vietnamese: 'Làm mất', exampleCz: 'Ztratil jsem telefon.', exampleVn: 'Tôi bị mất điện thoại.', exampleEn: 'I lost my phone.', category: 'Động từ' },
  { czech: 'Dostat', vietnamese: 'Nhận được', exampleCz: 'Dostal jsem dárek.', exampleVn: 'Tôi đã nhận được quà.', exampleEn: 'I received a gift.', category: 'Động từ' },
  { czech: 'Koupit', vietnamese: 'Mua (hoàn thành)', exampleCz: 'Koupím chleba.', exampleVn: 'Tôi sẽ mua bánh mì.', exampleEn: 'I will buy bread.', category: 'Động từ' },
  { czech: 'Prodat', vietnamese: 'Bán', exampleCz: 'Prodám auto.', exampleVn: 'Tôi sẽ bán xe.', exampleEn: 'I will sell the car.', category: 'Động từ' },
  { czech: 'Otevřít', vietnamese: 'Mở', exampleCz: 'Otevři okno.', exampleVn: 'Hãy mở cửa sổ ra.', exampleEn: 'Open the window.', category: 'Động từ' },
  { czech: 'Zavřít', vietnamese: 'Đóng', exampleCz: 'Zavři dveře.', exampleVn: 'Hãy đóng cửa lại.', exampleEn: 'Close the door.', category: 'Động từ' },
  { czech: 'Začít', vietnamese: 'Bắt đầu', exampleCz: 'Film začíná.', exampleVn: 'Phim đang bắt đầu.', exampleEn: 'The movie is starting.', category: 'Động từ' },
  { czech: 'Skončit', vietnamese: 'Kết thúc', exampleCz: 'Kdy končíš?', exampleVn: 'Khi nào bạn xong việc?', exampleEn: 'When do you finish?', category: 'Động từ' },
  { czech: 'Milovat', vietnamese: 'Yêu', exampleCz: 'Miluji tě.', exampleVn: 'Anh yêu em.', exampleEn: 'I love you.', category: 'Động từ' },
  { czech: 'Cestovat', vietnamese: 'Du lịch', exampleCz: 'Rád cestuji.', exampleVn: 'Tôi thích đi du lịch.', exampleEn: 'I like traveling.', category: 'Động từ' },
  { czech: 'Vařit', vietnamese: 'Nấu ăn', exampleCz: 'Maminka vaří.', exampleVn: 'Mẹ đang nấu ăn.', exampleEn: 'Mom is cooking.', category: 'Động từ' },
  { czech: 'Uklízet', vietnamese: 'Dọn dẹp', exampleCz: 'Musím uklízet.', exampleVn: 'Tôi phải dọn dẹp.', exampleEn: 'I have to clean up.', category: 'Động từ' },
  { czech: 'Prát', vietnamese: 'Giặt', exampleCz: 'Prát prádlo.', exampleVn: 'Giặt quần áo.', exampleEn: 'To wash laundry.', category: 'Động từ' },
  { czech: 'Mýt', vietnamese: 'Rửa', exampleCz: 'Mýt nádobí.', exampleVn: 'Rửa bát.', exampleEn: 'To wash dishes.', category: 'Động từ' },
  { czech: 'Volat', vietnamese: 'Gọi điện', exampleCz: 'Zavolám ti.', exampleVn: 'Tôi sẽ gọi cho bạn.', exampleEn: 'I will call you.', category: 'Động từ' },
  { czech: 'Ptát se', vietnamese: 'Hỏi', exampleCz: 'Můžu se zeptat?', exampleVn: 'Tôi có thể hỏi không?', exampleEn: 'Can I ask?', category: 'Động từ' },
  { czech: 'Odpovídat', vietnamese: 'Trả lời', exampleCz: 'Odpověz mi.', exampleVn: 'Trả lời tôi đi.', exampleEn: 'Answer me.', category: 'Động từ' },

  // --- 50 DANH TỪ ---
  { czech: 'Pán', vietnamese: 'Quý ông', exampleCz: 'Dobrý den, pane.', exampleVn: 'Chào ông.', exampleEn: 'Good day, sir.', category: 'Danh từ' },
  { czech: 'Paní', vietnamese: 'Quý bà', exampleCz: 'To je paní Nováková.', exampleVn: 'Đó là bà Nováková.', exampleEn: 'That is Mrs. Novakova.', category: 'Danh từ' },
  { czech: 'Muž', vietnamese: 'Đàn ông', exampleCz: 'Ten muž je vysoký.', exampleVn: 'Người đàn ông đó cao.', exampleEn: 'That man is tall.', category: 'Danh từ' },
  { czech: 'Žena', vietnamese: 'Phụ nữ / Vợ', exampleCz: 'To je moje žena.', exampleVn: 'Đó là vợ tôi.', exampleEn: 'That is my wife.', category: 'Danh từ' },
  { czech: 'Dítě', vietnamese: 'Đứa trẻ', exampleCz: 'Máme jedno dítě.', exampleVn: 'Chúng tôi có một đứa con.', exampleEn: 'We have one child.', category: 'Danh từ' },
  { czech: 'Rodina', vietnamese: 'Gia đình', exampleCz: 'Velká rodina.', exampleVn: 'Gia đình lớn.', exampleEn: 'Big family.', category: 'Danh từ' },
  { czech: 'Otec', vietnamese: 'Cha', exampleCz: 'Můj otec pracuje.', exampleVn: 'Cha tôi đang làm việc.', exampleEn: 'My father is working.', category: 'Danh từ' },
  { czech: 'Matka', vietnamese: 'Mẹ', exampleCz: 'Moje matka je doma.', exampleVn: 'Mẹ tôi ở nhà.', exampleEn: 'My mother is at home.', category: 'Danh từ' },
  { czech: 'Syn', vietnamese: 'Con trai', exampleCz: 'Můj syn hraje fotbal.', exampleVn: 'Con trai tôi chơi bóng đá.', exampleEn: 'My son plays football.', category: 'Danh từ' },
  { czech: 'Dcera', vietnamese: 'Con gái', exampleCz: 'Moje dcera studuje.', exampleVn: 'Con gái tôi đang đi học.', exampleEn: 'My daughter is studying.', category: 'Danh từ' },
  { czech: 'Bratr', vietnamese: 'Anh/Em trai', exampleCz: 'Mám bratra.', exampleVn: 'Tôi có anh trai.', exampleEn: 'I have a brother.', category: 'Danh từ' },
  { czech: 'Sestra', vietnamese: 'Chị/Em gái', exampleCz: 'To je moje sestra.', exampleVn: 'Đó là chị gái tôi.', exampleEn: 'That is my sister.', category: 'Danh từ' },
  { czech: 'Kamarád', vietnamese: 'Bạn bè (nam)', exampleCz: 'Jdu ven s kamarádem.', exampleVn: 'Tôi đi chơi với bạn.', exampleEn: 'I am going out with a friend.', category: 'Danh từ' },
  { czech: 'Přítel', vietnamese: 'Bạn trai / Bạn thân', exampleCz: 'Můj přítel je Čech.', exampleVn: 'Bạn trai tôi là người Séc.', exampleEn: 'My boyfriend is Czech.', category: 'Danh từ' },
  { czech: 'Dům', vietnamese: 'Ngôi nhà', exampleCz: 'Náš dům je nový.', exampleVn: 'Nhà của chúng tôi mới.', exampleEn: 'Our house is new.', category: 'Danh từ' },
  { czech: 'Byt', vietnamese: 'Căn hộ', exampleCz: 'Hledám podnájem bytu.', exampleVn: 'Tôi tìm thuê căn hộ.', exampleEn: 'I am looking to rent an apartment.', category: 'Danh từ' },
  { czech: 'Město', vietnamese: 'Thành phố', exampleCz: 'Žiji ve městě.', exampleVn: 'Tôi sống ở thành phố.', exampleEn: 'I live in a city.', category: 'Danh từ' },
  { czech: 'Ulice', vietnamese: 'Đường phố', exampleCz: 'Bydlím na této ulici.', exampleVn: 'Tôi sống ở phố này.', exampleEn: 'I live on this street.', category: 'Danh từ' },
  { czech: 'Škola', vietnamese: 'Trường học', exampleCz: 'Jdu do školy.', exampleVn: 'Tôi đến trường.', exampleEn: 'I am going to school.', category: 'Danh từ' },
  { czech: 'Práce', vietnamese: 'Công việc', exampleCz: 'Jsem v práci.', exampleVn: 'Tôi đang ở chỗ làm.', exampleEn: 'I am at work.', category: 'Danh từ' },
  { czech: 'Kancelář', vietnamese: 'Văn phòng', exampleCz: 'Sedím v kanceláři.', exampleVn: 'Tôi ngồi trong văn phòng.', exampleEn: 'I am sitting in the office.', category: 'Danh từ' },
  { czech: 'Obchod', vietnamese: 'Cửa hàng', exampleCz: 'Obchod je otevřený.', exampleVn: 'Cửa hàng đang mở.', exampleEn: 'The shop is open.', category: 'Danh từ' },
  { czech: 'Restaurace', vietnamese: 'Nhà hàng', exampleCz: 'Jdeme do restaurace.', exampleVn: 'Chúng tôi đi nhà hàng.', exampleEn: 'We are going to a restaurant.', category: 'Danh từ' },
  { czech: 'Nemocnice', vietnamese: 'Bệnh viện', exampleCz: 'Musím do nemocnice.', exampleVn: 'Tôi phải đến bệnh viện.', exampleEn: 'I have to go to the hospital.', category: 'Danh từ' },
  { czech: 'Nádraží', vietnamese: 'Nhà ga', exampleCz: 'Vlakové nádraží.', exampleVn: 'Ga tàu hỏa.', exampleEn: 'Train station.', category: 'Danh từ' },
  { czech: 'Letiště', vietnamese: 'Sân bay', exampleCz: 'Cesta na letiště.', exampleVn: 'Đường ra sân bay.', exampleEn: 'Way to the airport.', category: 'Danh từ' },
  { czech: 'Auto', vietnamese: 'Ô tô', exampleCz: 'Řídím auto.', exampleVn: 'Tôi lái xe.', exampleEn: 'I drive a car.', category: 'Danh từ' },
  { czech: 'Vlak', vietnamese: 'Tàu hỏa', exampleCz: 'Vlak jede včas.', exampleVn: 'Tàu chạy đúng giờ.', exampleEn: 'The train is on time.', category: 'Danh từ' },
  { czech: 'Autobus', vietnamese: 'Xe buýt', exampleCz: 'Jedu autobusem.', exampleVn: 'Tôi đi bằng xe buýt.', exampleEn: 'I go by bus.', category: 'Danh từ' },
  { czech: 'Tramvaj', vietnamese: 'Tàu điện', exampleCz: 'Čekám na tramvaj.', exampleVn: 'Tôi đang đợi tàu điện.', exampleEn: 'I am waiting for the tram.', category: 'Danh từ' },
  { czech: 'Kolo', vietnamese: 'Xe đạp', exampleCz: 'Jezdím na kole.', exampleVn: 'Tôi đi xe đạp.', exampleEn: 'I ride a bike.', category: 'Danh từ' },
  { czech: 'Stůl', vietnamese: 'Cái bàn', exampleCz: 'Jídlo je na stole.', exampleVn: 'Đồ ăn trên bàn.', exampleEn: 'Food is on the table.', category: 'Danh từ' },
  { czech: 'Židle', vietnamese: 'Cái ghế', exampleCz: 'Volná židle.', exampleVn: 'Ghế trống.', exampleEn: 'Free chair.', category: 'Danh từ' },
  { czech: 'Postel', vietnamese: 'Giường', exampleCz: 'Jdu do postele.', exampleVn: 'Tôi đi ngủ (lên giường).', exampleEn: 'I am going to bed.', category: 'Danh từ' },
  { czech: 'Skříň', vietnamese: 'Tủ', exampleCz: 'Oblečení je ve skříni.', exampleVn: 'Quần áo ở trong tủ.', exampleEn: 'Clothes are in the closet.', category: 'Danh từ' },
  { czech: 'Okno', vietnamese: 'Cửa sổ', exampleCz: 'Zavři okno.', exampleVn: 'Đóng cửa sổ lại.', exampleEn: 'Close the window.', category: 'Danh từ' },
  { czech: 'Dveře', vietnamese: 'Cửa ra vào', exampleCz: 'Otevři dveře.', exampleVn: 'Mở cửa ra.', exampleEn: 'Open the door.', category: 'Danh từ' },
  { czech: 'Počítač', vietnamese: 'Máy tính', exampleCz: 'Pracuji na počítači.', exampleVn: 'Tôi làm việc trên máy tính.', exampleEn: 'I work on the computer.', category: 'Danh từ' },
  { czech: 'Telefon', vietnamese: 'Điện thoại', exampleCz: 'Můj telefon zvoní.', exampleVn: 'Điện thoại tôi đang reo.', exampleEn: 'My phone is ringing.', category: 'Danh từ' },
  { czech: 'Kniha', vietnamese: 'Sách', exampleCz: 'Čtu knihu.', exampleVn: 'Tôi đọc sách.', exampleEn: 'I read a book.', category: 'Danh từ' },
  { czech: 'Sešit', vietnamese: 'Vở', exampleCz: 'Píšu do sešitu.', exampleVn: 'Tôi viết vào vở.', exampleEn: 'I write in the notebook.', category: 'Danh từ' },
  { czech: 'Tužka', vietnamese: 'Bút chì', exampleCz: 'Máš tužku?', exampleVn: 'Bạn có bút chì không?', exampleEn: 'Do you have a pencil?', category: 'Danh từ' },
  { czech: 'Voda', vietnamese: 'Nước', exampleCz: 'Piji vodu.', exampleVn: 'Tôi uống nước.', exampleEn: 'I drink water.', category: 'Danh từ' },
  { czech: 'Pivo', vietnamese: 'Bia', exampleCz: 'České pivo.', exampleVn: 'Bia Séc.', exampleEn: 'Czech beer.', category: 'Danh từ' },
  { czech: 'Káva', vietnamese: 'Cà phê', exampleCz: 'Horká káva.', exampleVn: 'Cà phê nóng.', exampleEn: 'Hot coffee.', category: 'Danh từ' },
  { czech: 'Čaj', vietnamese: 'Trà', exampleCz: 'Černý čaj.', exampleVn: 'Trà đen.', exampleEn: 'Black tea.', category: 'Danh từ' },
  { czech: 'Jídlo', vietnamese: 'Thức ăn', exampleCz: 'Dobré jídlo.', exampleVn: 'Đồ ăn ngon.', exampleEn: 'Good food.', category: 'Danh từ' },
  { czech: 'Chléb', vietnamese: 'Bánh mì', exampleCz: 'Čerstvý chléb.', exampleVn: 'Bánh mì tươi.', exampleEn: 'Fresh bread.', category: 'Danh từ' },
  { czech: 'Maso', vietnamese: 'Thịt', exampleCz: 'Jím maso.', exampleVn: 'Tôi ăn thịt.', exampleEn: 'I eat meat.', category: 'Danh từ' },
  { czech: 'Peníze', vietnamese: 'Tiền', exampleCz: 'Nemám peníze.', exampleVn: 'Tôi không có tiền.', exampleEn: 'I have no money.', category: 'Danh từ' },

  // --- 50 TÍNH TỪ ---
  { czech: 'Dobrý', vietnamese: 'Tốt', exampleCz: 'Dobrý nápad.', exampleVn: 'Ý tưởng tốt.', exampleEn: 'Good idea.', category: 'Tính từ' },
  { czech: 'Špatný', vietnamese: 'Xấu / Tệ', exampleCz: 'Špatné počasí.', exampleVn: 'Thời tiết xấu.', exampleEn: 'Bad weather.', category: 'Tính từ' },
  { czech: 'Velký', vietnamese: 'Lớn', exampleCz: 'Velký dům.', exampleVn: 'Ngôi nhà lớn.', exampleEn: 'Big house.', category: 'Tính từ' },
  { czech: 'Malý', vietnamese: 'Nhỏ', exampleCz: 'Malý pes.', exampleVn: 'Con chó nhỏ.', exampleEn: 'Small dog.', category: 'Tính từ' },
  { czech: 'Nový', vietnamese: 'Mới', exampleCz: 'Nové auto.', exampleVn: 'Xe mới.', exampleEn: 'New car.', category: 'Tính từ' },
  { czech: 'Starý', vietnamese: 'Cũ / Già', exampleCz: 'Starý muž.', exampleVn: 'Người đàn ông già.', exampleEn: 'Old man.', category: 'Tính từ' },
  { czech: 'Mladý', vietnamese: 'Trẻ', exampleCz: 'Mladá žena.', exampleVn: 'Người phụ nữ trẻ.', exampleEn: 'Young woman.', category: 'Tính từ' },
  { czech: 'Hezký', vietnamese: 'Đẹp', exampleCz: 'Hezký den.', exampleVn: 'Ngày đẹp trời.', exampleEn: 'Nice day.', category: 'Tính từ' },
  { czech: 'Ošklivý', vietnamese: 'Xấu xí', exampleCz: 'Ošklivá budova.', exampleVn: 'Tòa nhà xấu xí.', exampleEn: 'Ugly building.', category: 'Tính từ' },
  { czech: 'Vysoký', vietnamese: 'Cao', exampleCz: 'Vysoký strom.', exampleVn: 'Cây cao.', exampleEn: 'Tall tree.', category: 'Tính từ' },
  { czech: 'Nízký', vietnamese: 'Thấp', exampleCz: 'Nízký stůl.', exampleVn: 'Cái bàn thấp.', exampleEn: 'Low table.', category: 'Tính từ' },
  { czech: 'Dlouhý', vietnamese: 'Dài', exampleCz: 'Dlouhá cesta.', exampleVn: 'Chặng đường dài.', exampleEn: 'Long journey.', category: 'Tính từ' },
  { czech: 'Krátký', vietnamese: 'Ngắn', exampleCz: 'Krátký film.', exampleVn: 'Phim ngắn.', exampleEn: 'Short film.', category: 'Tính từ' },
  { czech: 'Těžký', vietnamese: 'Nặng / Khó', exampleCz: 'Těžká taška.', exampleVn: 'Cái túi nặng.', exampleEn: 'Heavy bag.', category: 'Tính từ' },
  { czech: 'Lehký', vietnamese: 'Nhẹ / Dễ', exampleCz: 'Lehký úkol.', exampleVn: 'Bài tập dễ.', exampleEn: 'Easy task.', category: 'Tính từ' },
  { czech: 'Drahý', vietnamese: 'Đắt', exampleCz: 'Drahé hodinky.', exampleVn: 'Đồng hồ đắt tiền.', exampleEn: 'Expensive watch.', category: 'Tính từ' },
  { czech: 'Levný', vietnamese: 'Rẻ', exampleCz: 'Levné jídlo.', exampleVn: 'Đồ ăn rẻ.', exampleEn: 'Cheap food.', category: 'Tính từ' },
  { czech: 'Rychlý', vietnamese: 'Nhanh', exampleCz: 'Rychlý vlak.', exampleVn: 'Tàu nhanh.', exampleEn: 'Fast train.', category: 'Tính từ' },
  { czech: 'Pomalý', vietnamese: 'Chậm', exampleCz: 'Pomalý internet.', exampleVn: 'Internet chậm.', exampleEn: 'Slow internet.', category: 'Tính từ' },
  { czech: 'Teplý', vietnamese: 'Ấm / Nóng', exampleCz: 'Teplá voda.', exampleVn: 'Nước ấm.', exampleEn: 'Warm water.', category: 'Tính từ' },
  { czech: 'Studený', vietnamese: 'Lạnh', exampleCz: 'Studené pivo.', exampleVn: 'Bia lạnh.', exampleEn: 'Cold beer.', category: 'Tính từ' },
  { czech: 'Horký', vietnamese: 'Rất nóng', exampleCz: 'Horký čaj.', exampleVn: 'Trà rất nóng.', exampleEn: 'Hot tea.', category: 'Tính từ' },
  { czech: 'Čistý', vietnamese: 'Sạch', exampleCz: 'Čisté ruce.', exampleVn: 'Tay sạch.', exampleEn: 'Clean hands.', category: 'Tính từ' },
  { czech: 'Špinavý', vietnamese: 'Bẩn', exampleCz: 'Špinavé boty.', exampleVn: 'Giày bẩn.', exampleEn: 'Dirty shoes.', category: 'Tính từ' },
  { czech: 'Plný', vietnamese: 'Đầy', exampleCz: 'Plná sklenice.', exampleVn: 'Cốc đầy.', exampleEn: 'Full glass.', category: 'Tính từ' },
  { czech: 'Prázdný', vietnamese: 'Rỗng', exampleCz: 'Prázdná lahev.', exampleVn: 'Chai rỗng.', exampleEn: 'Empty bottle.', category: 'Tính từ' },
  { czech: 'Otevřený', vietnamese: 'Mở', exampleCz: 'Otevřený obchod.', exampleVn: 'Cửa hàng đang mở.', exampleEn: 'Open shop.', category: 'Tính từ' },
  { czech: 'Zavřený', vietnamese: 'Đóng', exampleCz: 'Zavřené dveře.', exampleVn: 'Cửa đóng.', exampleEn: 'Closed doors.', category: 'Tính từ' },
  { czech: 'Nemocný', vietnamese: 'Ốm', exampleCz: 'Jsem nemocný.', exampleVn: 'Tôi bị ốm.', exampleEn: 'I am sick.', category: 'Tính từ' },
  { czech: 'Zdravý', vietnamese: 'Khỏe mạnh', exampleCz: 'Zdravé jídlo.', exampleVn: 'Đồ ăn lành mạnh.', exampleEn: 'Healthy food.', category: 'Tính từ' },
  { czech: 'Unavený', vietnamese: 'Mệt', exampleCz: 'Jsem unavený.', exampleVn: 'Tôi mệt.', exampleEn: 'I am tired.', category: 'Tính từ' },
  { czech: 'Šťastný', vietnamese: 'Hạnh phúc', exampleCz: 'Šťastná rodina.', exampleVn: 'Gia đình hạnh phúc.', exampleEn: 'Happy family.', category: 'Tính từ' },
  { czech: 'Smutný', vietnamese: 'Buồn', exampleCz: 'Smutný film.', exampleVn: 'Phim buồn.', exampleEn: 'Sad movie.', category: 'Tính từ' },
  { czech: 'Chytrý', vietnamese: 'Thông minh', exampleCz: 'Chytrý student.', exampleVn: 'Sinh viên thông minh.', exampleEn: 'Smart student.', category: 'Tính từ' },
  { czech: 'Hloupý', vietnamese: 'Ngốc nghếch', exampleCz: 'Hloupá ошибка.', exampleVn: 'Lỗi ngớ ngẩn.', exampleEn: 'Stupid mistake.', category: 'Tính từ' },
  { czech: 'Zajímavý', vietnamese: 'Thú vị', exampleCz: 'Zajímavá kniha.', exampleVn: 'Quyển sách thú vị.', exampleEn: 'Interesting book.', category: 'Tính từ' },
  { czech: 'Nudný', vietnamese: 'Nhàm chán', exampleCz: 'Nudná lekce.', exampleVn: 'Bài học nhàm chán.', exampleEn: 'Boring lesson.', category: 'Tính từ' },
  { czech: 'Důležitý', vietnamese: 'Quan trọng', exampleCz: 'Důležitá schůzka.', exampleVn: 'Cuộc họp quan trọng.', exampleEn: 'Important meeting.', category: 'Tính từ' },
  { czech: 'Možný', vietnamese: 'Có thể (khả thi)', exampleCz: 'To je možné.', exampleVn: 'Điều đó là có thể.', exampleEn: 'That is possible.', category: 'Tính từ' },
  { czech: 'Červený', vietnamese: 'Đỏ', exampleCz: 'Červené jablko.', exampleVn: 'Táo đỏ.', exampleEn: 'Red apple.', category: 'Tính từ' },
  { czech: 'Modrý', vietnamese: 'Xanh dương', exampleCz: 'Modré nebe.', exampleVn: 'Bầu trời xanh.', exampleEn: 'Blue sky.', category: 'Tính từ' },
  { czech: 'Zelený', vietnamese: 'Xanh lá', exampleCz: 'Zelený strom.', exampleVn: 'Cây xanh.', exampleEn: 'Green tree.', category: 'Tính từ' },
  { czech: 'Žlutý', vietnamese: 'Vàng', exampleCz: 'Žluté slunce.', exampleVn: 'Mặt trời vàng.', exampleEn: 'Yellow sun.', category: 'Tính từ' },
  { czech: 'Černý', vietnamese: 'Đen', exampleCz: 'Černá káva.', exampleVn: 'Cà phê đen.', exampleEn: 'Black coffee.', category: 'Tính từ' },
  { czech: 'Bílý', vietnamese: 'Trắng', exampleCz: 'Bílý sníh.', exampleVn: 'Tuyết trắng.', exampleEn: 'White snow.', category: 'Tính từ' },
  { czech: 'Český', vietnamese: 'Thuộc về Séc', exampleCz: 'České pivo.', exampleVn: 'Bia Séc.', exampleEn: 'Czech beer.', category: 'Tính từ' },
  { czech: 'Vietnamský', vietnamese: 'Thuộc về VN', exampleCz: 'Vietnamské jídlo.', exampleVn: 'Đồ ăn Việt Nam.', exampleEn: 'Vietnamese food.', category: 'Tính từ' },
  { czech: 'Levý', vietnamese: 'Trái', exampleCz: 'Levá ruka.', exampleVn: 'Tay trái.', exampleEn: 'Left hand.', category: 'Tính từ' },
  { czech: 'Pravý', vietnamese: 'Phải / Đúng', exampleCz: 'Pravá strana.', exampleVn: 'Bên phải.', exampleEn: 'Right side.', category: 'Tính từ' },
  { czech: 'Hotový', vietnamese: 'Xong / Hoàn thành', exampleCz: 'Jsem hotový.', exampleVn: 'Tôi xong rồi.', exampleEn: 'I am finished.', category: 'Tính từ' }
];

interface VoiceOption {
  id: string;
  name: string;
  isAI: boolean;
  lang: 'cs' | 'vi';
  nativeVoice?: SpeechSynthesisVoice;
  aiVoiceName?: string;
}

interface StoryLine {
  cs: string;
  vi: string;
}

export const Vocabulary: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  
  // View Modes
  const [viewMode, setViewMode] = useState<'list' | 'flashcard' | 'story'>('list');
  
  // Flashcard States
  const [flashcardMode, setFlashcardMode] = useState<'guess_cz' | 'guess_vn'>('guess_cz');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  // Auto-Review States
  const [isAutoReviewing, setIsAutoReviewing] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [countdown, setCountdown] = useState(5); 
  const reviewTimeoutRef = useRef<any>(null);
  const countdownIntervalRef = useRef<any>(null);
  
  // Voice States
  const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('native_default');
  const [selectedViVoiceId, setSelectedViVoiceId] = useState<string>('native_vi_default');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // AI Story States
  const [aiStory, setAiStory] = useState<StoryLine[]>([]);
  const [isGeneratingStory, setIsGeneratingStory] = useState(false);

  // Gemini AI Ref
  const aiRef = useRef<GoogleGenAI | null>(null);

  // Initialize Voices
  useEffect(() => {
    const loadVoices = () => {
      const systemVoices = window.speechSynthesis.getVoices();
      const options: VoiceOption[] = [];

      options.push({ id: 'ai_fenrir_cs', name: 'AI Fenrir (Mạnh mẽ)', isAI: true, lang: 'cs', aiVoiceName: 'Fenrir' });
      options.push({ id: 'ai_kore_cs', name: 'AI Kore (Dịu dàng)', isAI: true, lang: 'cs', aiVoiceName: 'Kore' });
      options.push({ id: 'ai_zephyr_cs', name: 'AI Zephyr (Thanh thoát)', isAI: true, lang: 'cs', aiVoiceName: 'Zephyr' });
      
      options.push({ id: 'ai_fenrir_vi', name: 'AI Fenrir (Việt)', isAI: true, lang: 'vi', aiVoiceName: 'Fenrir' });
      options.push({ id: 'ai_kore_vi', name: 'AI Kore (Việt)', isAI: true, lang: 'vi', aiVoiceName: 'Kore' });
      options.push({ id: 'ai_zephyr_vi', name: 'AI Zephyr (Việt)', isAI: true, lang: 'vi', aiVoiceName: 'Zephyr' });

      const czVoices = systemVoices.filter(v => v.lang.startsWith('cs'));
      if (czVoices.length > 0) {
        czVoices.forEach((v, idx) => {
          options.push({ id: `native_${v.voiceURI}`, name: v.name.includes('Google') ? `Google Séc (${idx + 1})` : `Hệ thống Séc (${v.name})`, isAI: false, lang: 'cs', nativeVoice: v });
        });
      } else {
        options.push({ id: 'native_default', name: 'Mặc định Séc (Trình duyệt)', isAI: false, lang: 'cs' });
      }

      const viVoices = systemVoices.filter(v => v.lang.startsWith('vi'));
      if (viVoices.length > 0) {
        viVoices.forEach((v, idx) => {
          options.push({ id: `native_vi_${v.voiceURI}`, name: v.name.includes('Google') ? `Google Việt (${idx + 1})` : `Hệ thống Việt (${v.name})`, isAI: false, lang: 'vi', nativeVoice: v });
        });
      } else {
        options.push({ id: 'native_vi_default', name: 'Mặc định Việt (Trình duyệt)', isAI: false, lang: 'vi' });
      }

      setAvailableVoices(options);
      const czPref = options.find(v => v.lang === 'cs' && v.name.includes('Google'));
      if (czPref) setSelectedVoiceId(czPref.id);
      const viPref = options.find(v => v.lang === 'vi' && v.name.includes('Google'));
      if (viPref) setSelectedViVoiceId(viPref.id);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = async (text: string, lang: 'cs' | 'vi' = 'cs') => {
    return new Promise<void>(async (resolve) => {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      }
      setIsSpeaking(true);
      
      const targetVoiceId = lang === 'cs' ? selectedVoiceId : selectedViVoiceId;
      const voice = availableVoices.find(v => v.id === targetVoiceId) || availableVoices.find(v => v.lang === lang);
      
      try {
        if (voice?.isAI) {
          if (!aiRef.current) aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
          if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
          
          const response = await aiRef.current.models.generateContent({
            model: "gemini-2.5-flash-preview-tts",
            contents: [{ parts: [{ text }] }],
            config: {
              responseModalities: [Modality.AUDIO],
              speechConfig: {
                voiceConfig: { prebuiltVoiceConfig: { voiceName: voice.aiVoiceName } },
              },
            },
          });

          const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (base64Audio) {
            const audioBuffer = await decodeAudioData(base64ToUint8Array(base64Audio), audioContextRef.current, 24000, 1);
            const source = audioContextRef.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContextRef.current.destination);
            source.onended = () => { setIsSpeaking(false); resolve(); };
            source.start();
          } else { setIsSpeaking(false); resolve(); }
        } else {
          window.speechSynthesis.cancel();
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = lang === 'cs' ? 'cs-CZ' : 'vi-VN';
          if (voice?.nativeVoice) utterance.voice = voice.nativeVoice;
          utterance.rate = 0.9;
          utterance.onend = () => { setIsSpeaking(false); resolve(); };
          utterance.onerror = () => { setIsSpeaking(false); resolve(); };
          window.speechSynthesis.speak(utterance);
        }
      } catch (err) {
        console.error("Speech error:", err);
        setIsSpeaking(false);
        resolve();
      }
    });
  };

  const speakFullStory = async () => {
    for (const line of aiStory) {
      await speak(line.cs, 'cs');
      await new Promise(r => setTimeout(r, 400));
      await speak(line.vi, 'vi');
      await new Promise(r => setTimeout(r, 800));
    }
  };

  // --- AI STORY GENERATION ---
  const generateStory = async () => {
    if (filter === 'All') {
      alert("Vui lòng chọn một bộ cụ thể (Động từ, Danh từ, hoặc Tính từ) để tạo truyện.");
      return;
    }

    setIsGeneratingStory(true);
    setAiStory([]);
    
    try {
      if (!aiRef.current) aiRef.current = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const currentVocab = VOCAB_DATA.filter(v => v.category === filter);
      const examplesList = currentVocab.map(v => `${v.czech}: ${v.exampleCz}`).join('\n');
      
      const prompt = `
        Bạn là giáo viên dạy tiếng Séc chuyên nghiệp. 
        Nhiệm vụ: Viết một câu chuyện ngắn, mạch lạc và thú vị (trình độ A1-A2) sử dụng ít nhất 15-20 ví dụ từ danh sách bên dưới.
        Chủ đề truyện nên xoay quanh các từ trong bộ "${filter}".
        Định dạng đầu ra PHẢI là một mảng JSON các đối tượng, mỗi đối tượng có thuộc tính "cs" (tiếng Séc) và "vi" (nghĩa tiếng Việt tương ứng).
        Mỗi dòng phải là một câu hoàn chỉnh.
        
        Danh sách ví dụ:
        ${examplesList}
        
        Output format example:
        [
          {"cs": "Ahoj, jsem Petr.", "vi": "Chào, tôi là Petr."},
          {"cs": "Dnes jdu do práce.", "vi": "Hôm nay tôi đi làm."}
        ]
      `;

      const response = await aiRef.current.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
           responseMimeType: "application/json"
        }
      });

      const storyData = JSON.parse(response.text || '[]');
      setAiStory(storyData);
    } catch (error) {
      console.error("Story gen error:", error);
      alert("Không thể tạo truyện. Vui lòng thử lại.");
    } finally {
      setIsGeneratingStory(false);
    }
  };

  // --- AUTO REVIEW LOGIC ---
  const stopAutoReview = () => {
    setIsAutoReviewing(false);
    setIsPaused(false);
    if (reviewTimeoutRef.current) clearTimeout(reviewTimeoutRef.current);
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    window.speechSynthesis.cancel();
  };

  const startAutoReview = (startIndex = 0) => {
    stopAutoReview();
    setIsAutoReviewing(true);
    setIsPaused(false);
    setReviewIndex(startIndex);
    setCountdown(5);
  };
  
  const togglePause = () => {
    if (isPaused) {
      setIsPaused(false);
    } else {
      setIsPaused(true);
      if (reviewTimeoutRef.current) clearTimeout(reviewTimeoutRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    if (!isAutoReviewing || isPaused || filteredData.length === 0) return;

    const playCurrentItem = async () => {
      const item = filteredData[reviewIndex];
      if (!item) { stopAutoReview(); return; }

      await speak(item.czech, 'cs');
      if (!isPaused && isAutoReviewing) {
        await new Promise(r => setTimeout(r, 500));
        await speak(item.exampleCz, 'cs');
      }

      if (!isPaused && isAutoReviewing) {
        setCountdown(5);
        countdownIntervalRef.current = setInterval(() => {
          setCountdown(prev => {
            if (prev <= 1) {
               if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
               return 0;
            }
            return prev - 1;
          });
        }, 1000);

        reviewTimeoutRef.current = setTimeout(() => {
          if (reviewIndex + 1 < filteredData.length) {
            setReviewIndex(prev => prev + 1);
          } else { stopAutoReview(); }
        }, 5000);
      }
    };

    playCurrentItem();

    return () => {
      if (reviewTimeoutRef.current) clearTimeout(reviewTimeoutRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [reviewIndex, isAutoReviewing, isPaused]);

  const filteredData = useMemo(() => {
    return VOCAB_DATA.filter(item => {
      const matchesFilter = filter === 'All' || item.category === filter;
      const matchesSearch = 
        item.czech.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.vietnamese.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchTerm]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(VOCAB_DATA.map(item => item.category)));
    return ['All', ...cats].sort();
  }, []);

  const nextCard = () => { setIsFlipped(false); setCurrentCardIndex((prev) => (prev + 1) % filteredData.length); };
  const prevCard = () => { setIsFlipped(false); setCurrentCardIndex((prev) => (prev - 1 + filteredData.length) % filteredData.length); };

  useEffect(() => {
    if (viewMode === 'flashcard' && autoPlay && filteredData.length > 0 && !isAutoReviewing) {
      const item = filteredData[currentCardIndex];
      if (item && !isFlipped) speak(item.exampleCz, 'cs');
    }
  }, [currentCardIndex, viewMode, isFlipped, autoPlay, filteredData]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-32">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border border-blue-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-blue-900 mb-2 flex items-center gap-2">
            Học Tiếng Séc A1-A2
            <Sparkles className="w-5 h-5 text-amber-500" />
          </h2>
          <p className="text-blue-700 text-sm md:text-base">
            Khám phá 150 từ vựng cốt lõi qua danh sách, flashcards và câu chuyện AI.
          </p>
        </div>
        
        <div className="bg-white p-1 rounded-xl border border-gray-200 flex shadow-sm overflow-hidden">
          <button 
            onClick={() => { setViewMode('list'); stopAutoReview(); }} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === 'list' ? 'bg-blue-100 text-blue-700 shadow-inner' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <List size={18} /> Danh sách
          </button>
          <button 
            onClick={() => { setViewMode('flashcard'); stopAutoReview(); }} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === 'flashcard' ? 'bg-blue-100 text-blue-700 shadow-inner' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Layers size={18} /> Thẻ
          </button>
          <button 
            onClick={() => { setViewMode('story'); stopAutoReview(); }} 
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === 'story' ? 'bg-indigo-100 text-indigo-700 shadow-inner' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <BookOpen size={18} /> AI Story
          </button>
        </div>
      </div>

      {/* Auto Review Dashboard (Only in List Mode) */}
      {viewMode === 'list' && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
             <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Play size={20} /></div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Bảng Ôn Tập Tự Động</h3>
                  <p className="text-sm text-gray-500">Nghe toàn bộ từ vựng, nghỉ 5 giây để nhớ.</p>
                </div>
             </div>
             {!isAutoReviewing ? (
               <div className="flex flex-wrap gap-2">
                 {['Động từ', 'Danh từ', 'Tính từ'].map(cat => (
                   <button key={cat} onClick={() => { setFilter(cat); startAutoReview(); }} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold hover:bg-indigo-700 shadow-md transition-all active:scale-95"><Play size={14} fill="currentColor" /> Ôn {cat}</button>
                 ))}
               </div>
             ) : (
               <div className="flex items-center gap-2">
                 <button onClick={() => setReviewIndex(Math.max(0, reviewIndex - 1))} className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"><SkipBack size={20} fill="currentColor" /></button>
                 <button onClick={togglePause} className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all ${isPaused ? 'bg-indigo-600 text-white' : 'bg-amber-500 text-white'}`}>
                   {isPaused ? <Play size={18} fill="currentColor" /> : <Pause size={18} fill="currentColor" />} {isPaused ? "Tiếp tục" : "Tạm dừng"}
                 </button>
                 <button onClick={() => setReviewIndex(Math.min(filteredData.length - 1, reviewIndex + 1))} className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700"><SkipForward size={20} fill="currentColor" /></button>
                 <div className="w-px h-8 bg-gray-200 mx-2"></div>
                 <button onClick={stopAutoReview} className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-100"><Square size={20} fill="currentColor" /></button>
               </div>
             )}
          </div>

          {isAutoReviewing && filteredData[reviewIndex] && (
            <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-4">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full text-center md:text-left">
                  <p className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-1">Đang ôn {reviewIndex + 1}/{filteredData.length}</p>
                  <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 mb-4">
                     <h4 className="text-3xl font-black text-indigo-900">{filteredData[reviewIndex].czech}</h4>
                     <div className="hidden md:block w-px h-8 bg-indigo-200"></div>
                     <div className="flex flex-col items-center md:items-start">
                        <p className="text-indigo-700 font-medium italic text-lg">"{filteredData[reviewIndex].exampleCz}"</p>
                        <p className="text-gray-500 text-sm font-medium">{filteredData[reviewIndex].exampleVn}</p>
                     </div>
                  </div>
                  <input type="range" min="0" max={filteredData.length - 1} value={reviewIndex} onChange={(e) => setReviewIndex(Number(e.target.value))} className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"/>
                </div>
                <div className="flex flex-col items-center border-t md:border-t-0 md:border-l border-indigo-100 pt-4 md:pt-0 md:pl-6">
                   <div className="relative w-12 h-12 flex items-center justify-center">
                      <svg className="absolute w-full h-full transform -rotate-90">
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-indigo-100"/>
                        <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray={126} strokeDashoffset={126 - (126 * countdown) / 5} className="text-indigo-600 transition-all duration-1000"/>
                      </svg>
                      <span className="text-lg font-black text-indigo-700">{isPaused ? <Pause size={16} /> : countdown}</span>
                   </div>
                   <span className="text-[10px] font-bold text-indigo-400 mt-1 uppercase tracking-widest">{isPaused ? 'DỪNG' : 'NGHỈ'}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sticky Controls */}
      <div className="sticky top-0 bg-gray-50/95 backdrop-blur-sm pt-2 pb-4 z-20 space-y-3 border-b border-gray-200">
        <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="Tìm kiếm từ vựng..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"/>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative">
              <button onClick={() => setIsSettingsOpen(!isSettingsOpen)} className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${isSettingsOpen ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-200'}`}><Settings2 size={20} /><ChevronDown size={14} /></button>
              {isSettingsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 z-30 py-4 overflow-hidden">
                   <div className="px-4 pb-2"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Giọng Tiếng Séc</p></div>
                   <div className="max-h-48 overflow-y-auto mb-4 border-b border-gray-50">
                     {availableVoices.filter(v => v.lang === 'cs').map(voice => (
                       <button key={voice.id} onClick={() => { setSelectedVoiceId(voice.id); }} className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-blue-50 ${selectedVoiceId === voice.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600'}`}>
                         <span className="flex items-center gap-2">{voice.isAI ? <Sparkles size={14} className="text-amber-500" /> : <Volume2 size={14} className="text-blue-400" />}{voice.name}</span>
                       </button>
                     ))}
                   </div>
                   <div className="px-4 pb-2"><p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Giọng Tiếng Việt</p></div>
                   <div className="max-h-48 overflow-y-auto">
                     {availableVoices.filter(v => v.lang === 'vi').map(voice => (
                       <button key={voice.id} onClick={() => { setSelectedViVoiceId(voice.id); }} className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between hover:bg-green-50 ${selectedViVoiceId === voice.id ? 'bg-green-50 text-green-700 font-bold' : 'text-gray-600'}`}>
                         <span className="flex items-center gap-2">{voice.isAI ? <Sparkles size={14} className="text-amber-500" /> : <Volume2 size={14} className="text-green-400" />}{voice.name}</span>
                       </button>
                     ))}
                   </div>
                </div>
              )}
            </div>
            {viewMode !== 'story' && (
              <button onClick={() => setAutoPlay(!autoPlay)} className={`p-2 rounded-lg border transition-all ${autoPlay ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white text-gray-400 border-gray-200'}`}>{autoPlay ? <Volume2 size={20} /> : <VolumeX size={20} />}</button>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button key={cat} onClick={() => { setFilter(cat); stopAutoReview(); }} className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === cat ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'}`}>{cat}</button>
          ))}
        </div>
      </div>

      {/* LIST VIEW */}
      {viewMode === 'list' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
          {filteredData.map((item, index) => (
            <div key={index} className={`bg-white p-5 rounded-xl border transition-all group ${isAutoReviewing && reviewIndex === index ? 'border-indigo-500 ring-4 ring-indigo-50' : 'border-gray-200 shadow-sm hover:shadow-md'}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 group-hover:text-blue-700">
                    {item.czech}
                    <button onClick={() => speak(item.czech, 'cs')} className="p-1.5 rounded-full text-gray-400 hover:text-blue-600 hover:bg-blue-50"><Volume2 size={16}/></button>
                  </h3>
                  <div className="flex items-center gap-2">
                    <p className="text-blue-600 font-medium text-sm">{item.vietnamese}</p>
                    <button onClick={() => speak(item.vietnamese, 'vi')} className="p-1 rounded-full text-gray-400 hover:text-green-600 hover:bg-green-50" title="Nghe nghĩa Việt"><Volume2 size={12}/></button>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded bg-gray-100 text-gray-500">{item.category}</span>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 space-y-2">
                <div className="p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50/50">
                  <div className="flex items-start gap-2">
                    <button onClick={() => speak(item.exampleCz, 'cs')} className="mt-1 p-1 rounded-full text-gray-400 hover:text-blue-600"><Volume2 size={14}/></button>
                    <p className="text-gray-800 text-sm font-medium italic">"{item.exampleCz}"</p>
                  </div>
                  <div className="flex items-start gap-2 mt-1">
                    <button onClick={() => speak(item.exampleVn, 'vi')} className="mt-1 p-1 rounded-full text-gray-400 hover:text-green-600"><Volume2 size={10}/></button>
                    <p className="text-gray-500 text-xs">{item.exampleVn}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* FLASHCARD VIEW */}
      {viewMode === 'flashcard' && filteredData.length > 0 && (
        <div className="flex flex-col items-center py-4">
          <div className="w-full max-w-xl">
            <div onClick={() => setIsFlipped(!isFlipped)} className="relative w-full bg-white rounded-3xl shadow-xl border border-gray-200 cursor-pointer min-h-[420px] flex flex-col p-8 transition-transform hover:scale-[1.01]">
              <div className="absolute top-4 right-4 text-gray-400 text-xs font-bold uppercase tracking-widest bg-gray-100 px-2 py-1 rounded">{filteredData[currentCardIndex]?.category}</div>
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                {!isFlipped ? (
                  <div className="space-y-6 animate-fade-in w-full">
                    <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">{flashcardMode === 'guess_cz' ? 'Từ này nghĩa là gì?' : 'Dịch sang tiếng Việt?'}</h3>
                    {flashcardMode === 'guess_cz' ? (
                      <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-gray-800">{filteredData[currentCardIndex]?.vietnamese}</h2>
                        <button onClick={(e) => { e.stopPropagation(); speak(filteredData[currentCardIndex].vietnamese, 'vi'); }} className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-all"><Volume2 size={20}/></button>
                        <p className="text-gray-500 italic text-sm">"{filteredData[currentCardIndex]?.exampleVn}"</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h2 className="text-3xl font-bold text-gray-800">{filteredData[currentCardIndex]?.czech}</h2>
                        <button onClick={(e) => { e.stopPropagation(); speak(filteredData[currentCardIndex].czech, 'cs'); }} className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all"><Volume2 size={20}/></button>
                        <p className="text-gray-500 italic text-sm">"{filteredData[currentCardIndex]?.exampleCz}"</p>
                      </div>
                    )}
                    <p className="text-gray-400 text-xs mt-10 animate-pulse">Chạm để xem đáp án</p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-fade-in w-full">
                     <div className="flex flex-col items-center gap-2">
                        <h2 className="text-4xl font-extrabold text-blue-600">{filteredData[currentCardIndex]?.czech}</h2>
                        <div className="flex gap-2">
                          <button onClick={(e) => { e.stopPropagation(); speak(filteredData[currentCardIndex].czech, 'cs'); }} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold"><Volume2 size={14}/> Séc</button>
                          <button onClick={(e) => { e.stopPropagation(); speak(filteredData[currentCardIndex].vietnamese, 'vi'); }} className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold"><Volume2 size={14}/> Việt</button>
                        </div>
                     </div>
                     <h3 className="text-2xl font-bold text-gray-800">{filteredData[currentCardIndex]?.vietnamese}</h3>
                     <div className="bg-gray-50 p-5 rounded-2xl text-left border border-gray-100 space-y-4">
                        <div>
                          <p className="text-lg font-bold text-gray-900 italic">"{filteredData[currentCardIndex]?.exampleCz}"</p>
                          <button onClick={(e) => { e.stopPropagation(); speak(filteredData[currentCardIndex].exampleCz, 'cs'); }} className="text-xs text-blue-500 hover:underline mt-1 flex items-center gap-1"><Volume2 size={12}/> Nghe ví dụ Séc</button>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 font-medium">"{filteredData[currentCardIndex]?.exampleVn}"</p>
                          <button onClick={(e) => { e.stopPropagation(); speak(filteredData[currentCardIndex].exampleVn, 'vi'); }} className="text-xs text-green-500 hover:underline mt-1 flex items-center gap-1"><Volume2 size={12}/> Nghe ví dụ Việt</button>
                        </div>
                     </div>
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center mt-8">
               <button onClick={prevCard} className="p-4 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50"><ArrowLeft size={24} /></button>
               <button onClick={() => setIsFlipped(!isFlipped)} className="flex items-center gap-3 px-8 py-3 bg-blue-600 text-white rounded-full font-bold"><RotateCw size={20} /> Lật thẻ</button>
               <button onClick={nextCard} className="p-4 bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50"><ArrowRight size={24} /></button>
            </div>
          </div>
        </div>
      )}

      {/* STORY VIEW */}
      {viewMode === 'story' && (
        <div className="max-w-4xl mx-auto space-y-6">
           <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-xl min-h-[500px] flex flex-col">
              <div className="flex justify-between items-center mb-8">
                 <div>
                    <h3 className="text-2xl font-black text-indigo-900 flex items-center gap-2">
                       <Wand2 className="text-indigo-500" />
                       Học Qua Truyện AI
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Kết nối ví dụ thành một đoạn văn sống động.</p>
                 </div>
                 <div className="flex gap-2">
                    {aiStory.length > 0 && (
                      <button 
                        onClick={speakFullStory}
                        disabled={isSpeaking}
                        className={`flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-bold shadow-md hover:bg-green-600 transition-all ${isSpeaking ? 'opacity-50' : ''}`}
                      >
                        <Volume2 size={20} /> Nghe cả truyện
                      </button>
                    )}
                    <button 
                      onClick={generateStory}
                      disabled={isGeneratingStory || filter === 'All'}
                      className={`flex items-center gap-2 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-md hover:bg-indigo-700 transition-all disabled:opacity-50 active:scale-95`}
                    >
                      {isGeneratingStory ? <RefreshCw className="animate-spin" size={20} /> : <Sparkles size={20} />}
                      {aiStory.length > 0 ? "Tạo truyện mới" : "Tạo truyện bằng AI"}
                    </button>
                 </div>
              </div>

              {isGeneratingStory ? (
                 <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                    <div className="relative w-20 h-20">
                       <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
                       <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
                    </div>
                    <p className="text-indigo-600 font-bold animate-pulse">Đang dệt nên câu chuyện từ bộ {filter}...</p>
                 </div>
              ) : aiStory.length > 0 ? (
                 <div className="flex-1 space-y-8 animate-in fade-in duration-700">
                    <div className="grid gap-6">
                       {aiStory.map((line, i) => (
                          <div key={i} className="group relative bg-indigo-50/30 p-4 rounded-2xl border border-indigo-100/50 hover:bg-indigo-50 transition-colors">
                             <div className="flex items-start gap-4">
                                <button 
                                  onClick={() => speak(line.cs, 'cs')}
                                  className="mt-1 p-2 bg-white rounded-full text-indigo-400 hover:text-indigo-600 shadow-sm transition-all"
                                >
                                  <Volume2 size={16} />
                                </button>
                                <div className="space-y-2">
                                   <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed">{line.cs}</p>
                                   <div className="flex items-center gap-2">
                                      <button 
                                        onClick={() => speak(line.vi, 'vi')}
                                        className="p-1 text-gray-400 hover:text-green-500"
                                      >
                                        <Volume2 size={12} />
                                      </button>
                                      <p className="text-sm md:text-base text-gray-500 italic">({line.vi})</p>
                                   </div>
                                </div>
                             </div>
                          </div>
                       ))}
                    </div>
                    <div className="mt-8 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                       <p className="text-sm text-amber-800 flex items-center gap-2">
                          <Timer size={16} />
                          <strong>Mẹo học:</strong> Hãy thử chép lại câu chuyện này hoặc tự kể lại theo giọng điệu của mình để tăng khả năng phản xạ.
                       </p>
                    </div>
                 </div>
              ) : (
                 <div className="flex-1 flex flex-col items-center justify-center text-center p-12 space-y-6">
                    <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center">
                       <BookOpen className="w-16 h-16 text-indigo-200" />
                    </div>
                    <div>
                       <h4 className="text-xl font-bold text-gray-800">Chọn một bộ từ vựng và bắt đầu</h4>
                       <p className="text-gray-500 max-w-sm mt-2">AI sẽ sử dụng các ví dụ bạn đang học để tạo thành một ngữ cảnh có ý nghĩa, giúp bạn dễ thuộc bài hơn.</p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3">
                       {['Động từ', 'Danh từ', 'Tính từ'].map(cat => (
                         <button 
                           key={cat} 
                           onClick={() => { setFilter(cat); }}
                           className={`px-6 py-3 rounded-2xl font-bold border-2 transition-all ${filter === cat ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' : 'bg-white border-gray-100 text-gray-400 hover:border-indigo-200 hover:text-indigo-500'}`}
                         >
                           Chọn {cat}
                         </button>
                       ))}
                    </div>
                 </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};
