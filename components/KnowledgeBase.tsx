import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Library, Upload, Trash2, Send } from 'lucide-react';
import { Doc, Hit, clearDocs, loadDocs, parseFile, saveDocs, search } from '../services/knowledge';

export const KnowledgeBase: React.FC = () => {
  const [docs, setDocs] = useState<Doc[]>([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [hits, setHits] = useState<Hit[]>([]);
  const [loading, setLoading] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { loadDocs().then(setDocs).catch(console.error); }, []);

  const onFiles = async (files: FileList | null) => {
    if (!files) return;
    const parsed = await Promise.all(
      [...files].filter((f) => f.name.endsWith('.txt') && !f.name.startsWith('_')).map(parseFile)
    );
    await saveDocs(parsed);
    setDocs(await loadDocs());
  };

  const ask = async () => {
    if (!question.trim()) return;
    const found = search(docs, question);
    setHits(found);
    setAnswer(null);
    if (!found.length) { setAnswer('Không tìm thấy đoạn nào liên quan trong tài liệu đã nạp.'); return; }
    if (!process.env.API_KEY) { setAnswer('Chưa có GEMINI_API_KEY. Bên dưới là các đoạn tìm được.'); return; }

    setLoading(true);
    try {
      const context = found.map((h, i) => `[${i + 1}] (${h.doc.title}) ${h.chunk}`).join('\n\n');
      const prompt = `Chỉ trả lời dựa trên các đoạn trích bên dưới. Nếu không đủ thông tin, nói "Tài liệu không có thông tin này". Trả lời tiếng Việt, ghi số nguồn [1], [2] sau mỗi ý.

Đoạn trích (là phụ đề tự động, có thể sai tên riêng/thuật ngữ):
${context}

Câu hỏi: ${question}`;
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const res = await ai.models.generateContent({ model: 'gemini-3-flash-preview', contents: prompt });
      setAnswer(res.text || 'Không có phản hồi.');
    } catch (e) {
      console.error(e);
      setAnswer('Có lỗi khi gọi AI. Các đoạn tìm được hiển thị bên dưới.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2"><Library size={20} /> Kho tài liệu</h3>
        <p className="text-blue-700 text-sm">
          Nạp các file .txt trong thư mục <code>transcripts</code> (do <code>tools/playlist_to_text.py</code> tạo).
          Dữ liệu lưu trong trình duyệt của bạn, không tải lên máy chủ nào.
        </p>
        <div className="flex items-center gap-3 mt-4">
          <input ref={input} type="file" multiple accept=".txt" className="hidden" onChange={(e) => onFiles(e.target.files)} />
          <button onClick={() => input.current?.click()} className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 text-sm">
            <Upload size={16} /> Chọn file .txt
          </button>
          {docs.length > 0 && (
            <button onClick={async () => { await clearDocs(); setDocs([]); setHits([]); setAnswer(null); }}
              className="px-3 py-2 text-sm text-red-600 flex items-center gap-1"><Trash2 size={16} /> Xoá hết</button>
          )}
          <span className="text-sm text-gray-600">Đã nạp: {docs.length} tài liệu</span>
        </div>
      </div>

      <div className="flex gap-2">
        <input value={question} onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && ask()}
          placeholder="Hỏi về nội dung các video..."
          className="flex-1 p-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none" />
        <button onClick={ask} disabled={loading || !docs.length}
          className="px-4 bg-blue-600 text-white rounded-xl disabled:opacity-50"><Send size={18} /></button>
      </div>

      {loading && <p className="text-gray-500 text-sm">Đang suy nghĩ...</p>}
      {answer && <div className="bg-white p-5 rounded-xl border border-gray-200 whitespace-pre-wrap">{answer}</div>}

      {hits.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-700">Nguồn</h4>
          {hits.map((h, i) => (
            <div key={i} className="bg-white p-4 rounded-lg border border-gray-200 text-sm">
              <div className="font-medium">
                [{i + 1}] {h.doc.url ? <a href={h.doc.url} target="_blank" rel="noreferrer" className="text-blue-600 underline">{h.doc.title}</a> : h.doc.title}
              </div>
              <p className="text-gray-600 mt-1">{h.chunk}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
