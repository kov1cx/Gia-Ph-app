
import React, { useState } from 'react';

interface ClanHistoryProps {
  biography: string;
  onUpdate: (bio: string) => void;
  isDarkMode: boolean;
}

const ClanHistory: React.FC<ClanHistoryProps> = ({ biography, onUpdate, isDarkMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(biography);

  const handleSave = () => {
    onUpdate(text);
    setIsEditing(false);
  };

  return (
    <div className={`max-w-4xl mx-auto glass p-10 md:p-20 rounded-[3rem] border border-amber-500/10 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-1000 ${isDarkMode ? 'bg-black/40' : 'bg-white/50'}`}>
      
      {/* Heritage Watermark */}
      <div className={`absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none`}>
        <span className="text-[15rem] font-display font-black rotate-12 whitespace-nowrap">DI SẢN</span>
      </div>

      <div className="absolute top-0 right-0 p-10 md:p-16">
        <svg className={`w-24 h-24 md:w-32 md:h-32 ${isDarkMode ? 'text-amber-500/5' : 'text-amber-900/5'}`} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className={`text-4xl md:text-5xl font-display font-bold tracking-tight bg-clip-text text-transparent ${isDarkMode ? 'bg-gradient-to-r from-amber-200 via-amber-500 to-amber-800' : 'bg-gradient-to-r from-red-900 via-amber-900 to-black'}`}>
              Tiểu sử Dòng họ
            </h2>
            <div className={`h-[2px] w-16 ${isDarkMode ? 'bg-amber-600/30' : 'bg-red-900/20'} mt-4`}></div>
          </div>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className={`p-4 glass rounded-[1.5rem] border border-amber-500/10 hover:border-amber-500/40 transition-all ${isDarkMode ? 'text-amber-500/50' : 'text-amber-900/60'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-8">
            <textarea 
              className={`w-full min-h-[500px] border border-amber-500/10 rounded-[2rem] p-8 focus:outline-none transition-all leading-relaxed text-lg font-light ${isDarkMode ? 'bg-black/40 text-slate-100 focus:border-amber-500/30' : 'bg-white/60 text-amber-950 focus:border-red-900/20'}`}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ghi lại lịch sử, công trạng và lời răn dạy của tổ tiên..."
            />
            <div className="flex gap-4">
              <button 
                onClick={handleSave}
                className="px-12 py-5 bg-amber-700 text-white rounded-2xl font-black uppercase text-xs tracking-widest shadow-2xl shadow-amber-900/20 active:scale-95 transition-all"
              >
                Lưu Tiểu sử
              </button>
              <button 
                onClick={() => { setText(biography); setIsEditing(false); }}
                className={`px-10 py-5 glass border border-amber-500/10 rounded-2xl active:scale-95 transition-all font-black uppercase text-xs tracking-widest ${isDarkMode ? 'text-amber-500/60' : 'text-amber-900/60'}`}
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className={`text-xl md:text-2xl leading-[1.8] whitespace-pre-wrap italic opacity-95 border-l-8 pl-10 font-medium tracking-tight ${isDarkMode ? 'text-slate-200 border-amber-600/20' : 'text-[#2c1b0e] border-red-900/30 font-serif'}`}>
              {biography}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClanHistory;
