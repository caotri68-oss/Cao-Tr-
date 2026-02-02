import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, CheckCircle, RefreshCw } from 'lucide-react';

export const WritingAssistant: React.FC = () => {
  const [text, setText] = useState('');
  const [correction, setCorrection] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const checkWriting = async () => {
    if (!text.trim() || !process.env.API_KEY) return;
    
    setLoading(true);
    setCorrection(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        Act as a strict Czech grammar teacher. 
        Analyze the following text written by an A1 level student. 
        Text: "${text}"
        
        Provide the response in Vietnamese with the following structure:
        1. Corrected version (in Czech).
        2. Explanation of mistakes (in Vietnamese).
        3. Translated meaning of the corrected text (in Vietnamese).
        
        Keep it simple and encouraging.
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });

      setCorrection(response.text || "Không có phản hồi.");
    } catch (error) {
      console.error(error);
      setCorrection("Có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Luyện Viết (Psaní)</h3>
        <p className="text-blue-700">
          Hãy viết một đoạn văn ngắn về bản thân, gia đình hoặc công việc. 
          AI sẽ giúp bạn sửa lỗi ngữ pháp và chính tả.
        </p>
      </div>

      <div className="space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Viết tiếng Séc vào đây... Ví dụ: Jmenuji se Nam a jsem z Vietnamu."
          className="w-full h-40 p-4 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 resize-none transition-colors"
        />
        
        <div className="flex justify-end">
          <button
            onClick={checkWriting}
            disabled={loading || !text.trim()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <RefreshCw className="animate-spin w-5 h-5" />
            ) : (
              <Send className="w-5 h-5" />
            )}
            Kiểm tra
          </button>
        </div>
      </div>

      {correction && (
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2 mb-4 text-green-600 font-bold">
            <CheckCircle className="w-6 h-6" />
            <h3>Kết quả sửa lỗi</h3>
          </div>
          <div className="prose prose-blue max-w-none whitespace-pre-wrap text-gray-700">
            {correction}
          </div>
        </div>
      )}
    </div>
  );
};
