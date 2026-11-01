import React, { useState } from 'react';
import { BookOpen, Mic, PenTool, Home, Languages, Library, Menu, X } from 'lucide-react';
import { Module } from './types';
import { Vocabulary } from './components/Vocabulary';
import { Grammar } from './components/Grammar';
import { WritingAssistant } from './components/WritingAssistant';
import { LiveTutor } from './components/LiveTutor';
import { KnowledgeBase } from './components/KnowledgeBase';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<Module>(Module.HOME);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: Module.HOME, label: 'Trang chủ', icon: Home },
    { id: Module.VOCABULARY, label: 'Từ vựng', icon: BookOpen },
    { id: Module.GRAMMAR, label: 'Ngữ pháp', icon: Languages },
    { id: Module.WRITING, label: 'Luyện viết', icon: PenTool },
    { id: Module.LIVE_TUTOR, label: 'Gia sư AI', icon: Mic },
    { id: Module.KNOWLEDGE, label: 'Kho tài liệu', icon: Library },
  ];

  const renderContent = () => {
    switch (currentModule) {
      case Module.VOCABULARY: return <Vocabulary />;
      case Module.GRAMMAR: return <Grammar />;
      case Module.WRITING: return <WritingAssistant />;
      case Module.LIVE_TUTOR: return <LiveTutor />;
      case Module.KNOWLEDGE: return <KnowledgeBase />;
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center space-y-8 py-12">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">🇨🇿</span>
            </div>
            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
              Học Tiếng Séc <span className="text-blue-600">Dễ Dàng</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl">
              Chào mừng bạn đến với CzechMate AI. Ứng dụng hỗ trợ học tiếng Séc từ trình độ A1 đến A2. 
              Sử dụng công nghệ AI mới nhất để luyện nghe, nói, đọc và viết.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mt-8">
              <button 
                onClick={() => setCurrentModule(Module.VOCABULARY)}
                className="p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg transition-all group text-left"
              >
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mb-3 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <BookOpen size={20} />
                </div>
                <h3 className="font-bold text-gray-900">Từ vựng cơ bản</h3>
                <p className="text-sm text-gray-500 mt-1">Học từ mới theo chủ đề kèm phát âm.</p>
              </button>
              
              <button 
                onClick={() => setCurrentModule(Module.LIVE_TUTOR)}
                className="p-6 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl hover:shadow-lg transition-all text-left text-white"
              >
                 <div className="w-10 h-10 bg-white/20 text-white rounded-lg flex items-center justify-center mb-3">
                  <Mic size={20} />
                </div>
                <h3 className="font-bold">Hội thoại Live</h3>
                <p className="text-sm text-blue-100 mt-1">Nói chuyện trực tiếp với AI giáo viên bản xứ.</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200 sticky top-0 z-20">
        <span className="font-bold text-xl text-blue-700">CzechMate AI</span>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-gray-600">
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className={`
          fixed lg:static inset-y-0 left-0 z-10 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="p-6 flex items-center gap-2 border-b border-gray-100">
             <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
             <span className="text-xl font-bold text-gray-800">CzechMate AI</span>
          </div>

          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentModule(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-medium ${
                  currentModule === item.id 
                    ? 'bg-blue-50 text-blue-700 shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-0 w-full p-4 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-center text-gray-500">
              Powered by Gemini 2.5 Flash
            </p>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8 relative">
           {renderContent()}
        </main>

        {/* Overlay for mobile menu */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-0 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          ></div>
        )}
      </div>
    </div>
  );
};

export default App;
