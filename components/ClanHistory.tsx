
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
    <div className="max-w-4xl mx-auto glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 bg-slate-900/30">
      <div className="absolute top-0 right-0 p-8">
        <svg className="w-24 h-24 text-blue-500/10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
            Tiểu sử Dòng họ
          </h2>
          {!isEditing && (
            <button 
              onClick={() => setIsEditing(true)}
              className="p-2.5 glass rounded-xl border border-white/10 hover:border-blue-500/50 transition-all text-slate-400 hover:text-blue-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
            </button>
          )}
        </div>

        {isEditing ? (
          <div className="space-y-6">
            <textarea 
              className="w-full min-h-[400px] bg-slate-900/50 border border-white/10 rounded-2xl p-6 text-slate-200 focus:outline-none focus:border-blue-500/50 transition-all leading-relaxed"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Nhập tiểu sử dòng họ tại đây..."
            />
            <div className="flex gap-4">
              <button 
                onClick={handleSave}
                className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
              >
                Lưu Tiểu sử
              </button>
              <button 
                onClick={() => { setText(biography); setIsEditing(false); }}
                className="px-8 py-3 glass border border-white/10 text-slate-300 rounded-xl active:scale-95 transition-all"
              >
                Hủy
              </button>
            </div>
          </div>
        ) : (
          <div className="prose prose-invert max-w-none">
            <p className="text-lg text-slate-300 leading-relaxed whitespace-pre-wrap italic opacity-90 border-l-2 border-blue-500/30 pl-6">
              {biography}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClanHistory;
