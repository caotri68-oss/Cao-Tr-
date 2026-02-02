import React from 'react';
import { GrammarRule } from '../types';
import { Volume2 } from 'lucide-react';

const GRAMMAR_DATA: GrammarRule[] = [
  {
    title: '1. Động từ "Být" (To be)',
    description: 'Động từ quan trọng nhất trong tiếng Séc. Dùng để giới thiệu bản thân, mô tả tính chất.',
    examples: [
      { cz: 'Já jsem student.', vn: 'Tôi là sinh viên.' },
      { cz: 'Ty jsi doma?', vn: 'Bạn có ở nhà không?' },
      { cz: 'On je v práci.', vn: 'Anh ấy ở chỗ làm.' },
      { cz: 'My jsme Češi.', vn: 'Chúng tôi là người Séc.' }
    ]
  },
  {
    title: '2. Giống của danh từ (Rod podstatných jmen)',
    description: 'Tiếng Séc chia danh từ thành 3 giống: Nam (Mužský), Nữ (Ženský), và Trung (Střední). Việc xác định giống rất quan trọng để chia tính từ và động từ.',
    examples: [
      { cz: 'Ten muž je vysoký.', vn: 'Người đàn ông đó cao. (Giống đực - kết thúc phụ âm)' },
      { cz: 'Ta žena je hezká.', vn: 'Người phụ nữ đó đẹp. (Giống cái - kết thúc "a")' },
      { cz: 'To město je staré.', vn: 'Thành phố đó cổ kính. (Giống trung - kết thúc "o")' }
    ]
  },
  {
    title: '3. Phủ định (Negace)',
    description: 'Để tạo câu phủ định, thêm tiền tố "ne-" vào trước động từ. (Viết liền, không có dấu cách).',
    examples: [
      { cz: 'Mám čas.', vn: 'Tôi có thời gian.' },
      { cz: 'Nemám čas.', vn: 'Tôi không có thời gian.' },
      { cz: 'Jsem unavený.', vn: 'Tôi mệt.' },
      { cz: 'Nejsem unavený.', vn: 'Tôi không mệt.' }
    ]
  },
  {
    title: '4. Cách 4: Đối cách (Akuzativ)',
    description: 'Dùng cho tân ngữ trực tiếp (Tôi thấy ai/cái gì?). Danh từ giống cái đổi đuôi "a" thành "u". Danh từ giống đực (người/động vật) thường thêm đuôi.',
    examples: [
      { cz: 'Mám rád kávu.', vn: 'Tôi thích cà phê. (Káva -> Kávu)' },
      { cz: 'Hledám školu.', vn: 'Tôi đang tìm trường học. (Škola -> Školu)' },
      { cz: 'Vidím Petra.', vn: 'Tôi thấy Petr. (Petr -> Petra)' },
      { cz: 'Mám auto.', vn: 'Tôi có xe hơi. (Giống trung thường giữ nguyên)' }
    ]
  },
  {
    title: '5. Động từ khuyết thiếu (Modální slovesa)',
    description: 'Các động từ diễn tả khả năng, sự bắt buộc hay mong muốn: Chtít (muốn), Moci (có thể), Muset (phải). Động từ chính đi sau để ở dạng nguyên thể.',
    examples: [
      { cz: 'Chci pít vodu.', vn: 'Tôi muốn uống nước.' },
      { cz: 'Musím pracovat.', vn: 'Tôi phải làm việc.' },
      { cz: 'Nemůžu spát.', vn: 'Tôi không thể ngủ.' },
      { cz: 'Umím plavat.', vn: 'Tôi biết bơi (kỹ năng).' }
    ]
  },
  {
    title: '6. Thì quá khứ (Minulý čas)',
    description: 'Được tạo thành bằng động từ "být" (chia) + động từ chính thêm đuôi "l/la/lo". Ngôi thứ 3 (On/Ona) không cần "být".',
    examples: [
      { cz: 'Byl jsem doma.', vn: 'Tôi đã ở nhà. (Nam nói)' },
      { cz: 'Byla jsem v práci.', vn: 'Tôi đã ở chỗ làm. (Nữ nói)' },
      { cz: 'Dělali jsme úkol.', vn: 'Chúng tôi đã làm bài tập.' },
      { cz: 'Petr koupil auto.', vn: 'Petr đã mua xe.' }
    ]
  },
  {
    title: '7. Thì tương lai (Budoucí čas)',
    description: 'Với động từ "Být": Budu, budeš, bude... Với động từ thường (chưa hoàn thành): Budu + Nguyên thể.',
    examples: [
      { cz: 'Zítra budu doma.', vn: 'Ngày mai tôi sẽ ở nhà.' },
      { cz: 'Budeme cestovat.', vn: 'Chúng tôi sẽ đi du lịch.' },
      { cz: 'Nebude to fungovat.', vn: 'Nó sẽ không hoạt động đâu.' }
    ]
  }
];

export const Grammar: React.FC = () => {
  const speak = (text: string) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'cs-CZ'; 
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h2 className="text-2xl font-bold text-blue-900 mb-2">Ngữ pháp A1-A2</h2>
        <p className="text-blue-700">
          Các quy tắc ngữ pháp nền tảng để bạn đặt câu chính xác. Bấm vào biểu tượng loa để nghe ví dụ.
        </p>
      </div>

      {GRAMMAR_DATA.map((rule, idx) => (
        <div key={idx} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2 border-gray-100 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold">
              {idx + 1}
            </span>
            {rule.title.replace(/^\d+\.\s/, '')}
          </h3>
          <p className="text-gray-700 mb-6 leading-relaxed pl-10">{rule.description}</p>
          
          <div className="bg-gray-50 rounded-lg p-4 ml-0 md:ml-10">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Ví dụ minh họa</h4>
            <div className="space-y-3">
              {rule.examples.map((ex, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => speak(ex.cz)}
                      className="p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex-shrink-0"
                      title="Nghe"
                    >
                      <Volume2 size={16} />
                    </button>
                    <span className="font-semibold text-gray-900 text-lg">{ex.cz}</span>
                  </div>
                  <div className="flex items-center gap-2 pl-11 sm:pl-0">
                     <span className="text-gray-300 hidden sm:block">→</span>
                     <span className="text-gray-600 italic">{ex.vn}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
