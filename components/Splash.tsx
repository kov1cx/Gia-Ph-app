
import React, { useState } from 'react';

interface SplashProps {
  onEnter: () => void;
}

const Splash: React.FC<SplashProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 1000);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isExiting ? 'opacity-0 scale-110 blur-3xl pointer-events-none' : 'opacity-100 bg-[#020617]'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent opacity-60"></div>
      
      {/* Bloom background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="relative z-10 text-center flex flex-col items-center px-6 max-w-4xl animate-in fade-in zoom-in duration-1000">
        <div className="w-24 h-24 md:w-32 md:h-32 mb-10 glass rounded-[2.5rem] flex items-center justify-center border-2 border-blue-500/40 shadow-[0_0_50px_-10px_rgba(59,130,246,0.5)] bloom-blue">
          <svg className="w-12 h-12 md:w-16 md:h-16 text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        
        <div className="space-y-6">
          <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-slate-500 leading-[1.1] pb-2">
            GIA PHẢ DÒNG HỌ
          </h1>
          <div className="h-px w-32 mx-auto bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
          <p className="text-blue-400 text-sm md:text-xl font-light tracking-[0.4em] uppercase opacity-90 drop-shadow-[0_0_10px_rgba(96,165,250,0.3)]">
            Lưu giữ cội nguồn • Nối bước tương lai
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-8">
          <button 
            onClick={handleEnter}
            className="group relative px-12 py-5 overflow-hidden rounded-[2rem] glass border border-white/20 hover:border-blue-400/50 transition-all duration-700 shadow-2xl active:scale-95"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <span className="relative text-xl font-medium tracking-[0.2em] uppercase text-white group-hover:text-blue-50 transition-colors">
              Khám Phá Gia Tộc
            </span>
          </button>
          
          <div className="flex flex-col items-center gap-1 opacity-40">
            <p className="text-slate-500 text-[9px] uppercase tracking-[0.5em] animate-pulse">
              Digital Heritage Management System
            </p>
            <p className="text-slate-600 text-[8px] uppercase tracking-widest mt-1">
              Created by kov1cx
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center text-slate-700 text-[10px] tracking-[0.8em] uppercase font-bold opacity-30">
        Authentic Family Records
      </div>
    </div>
  );
};

export default Splash;
