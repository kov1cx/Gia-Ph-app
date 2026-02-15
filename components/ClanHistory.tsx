
import React, { useState } from 'react';

interface ClanHistoryProps {
  biography: string;
  onUpdate: (bio: string) => void;
}

const ClanHistory: React.FC<ClanHistoryProps> = ({ biography, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(biography);

  const handleSave = () => {
    onUpdate(text);
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto glass p-10 md:p-16 rounded-[3rem] border border-black/10 dark:border-white/10 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 bg-white/40 dark:bg-slate-900/30">
      <div className="absolute top-0 right-0 p-10">
        <svg className="w-24 h-24 text-blue-600/10 dark:text-blue-500/10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 dark:from-blue-400 to-indigo-700 dark:to-indigo-400">
            Tiểu sử Dòng họ
          </h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="p-3 glass rounded-2xl border border-black/10 dark:border-white/10 hover:border-blue-600 transition-all text-slate-500 dark:text-slate-400 hover:text-blue-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-8">
            <textarea 
              className="w-full min-h-[450px] bg-slate-100 dark:bg-slate-900/50 border border-black/10 dark:border-white/10 rounded-3xl p-8 text-slate-950 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all leading-relaxed text-lg"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ghi lại lịch sử, công trạng và lời răn dạy của tổ tiên..."
            />
            <div className="flex gap-4">
              <button 
                onClick={handleSave}
                className="px-10 py-4 bg-blue-700 text-white rounded-2xl font-bold shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
              >
                Lưu Tiểu sử
              </button>
              <button 
                onClick={() => { setText(biography); setIsEditing(false); }}
                className="px-10 py-4 glass border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-300 rounded-2xl active:scale-95 transition-all font-bold"
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap italic opacity-95 border-l-4 border-blue-600/40 pl-8 font-medium">
              {biography}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClanHistory;
