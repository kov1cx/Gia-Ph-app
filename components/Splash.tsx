
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
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${isExiting ? 'opacity-0 scale-110 blur-2xl pointer-events-none' : 'opacity-100 bg-slate-950/80 backdrop-blur-xl'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
      
      <div className="relative z-10 text-center flex flex-col items-center px-6 max-w-4xl animate-in fade-in zoom-in duration-1000">
        <div className="w-20 h-20 md:w-28 md:h-28 mb-8 glass rounded-3xl flex items-center justify-center border-2 border-blue-500/30 shadow-2xl shadow-blue-500/10">
          <svg className="w-10 h-10 md:w-14 md:h-14 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
          </svg>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-7xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 leading-tight">
            GIA PHẢ DÒNG HỌ
          </h1>
          <p className="text-blue-400 text-sm md:text-lg font-light tracking-[0.3em] uppercase opacity-80">
            Lưu giữ cội nguồn - Nối bước tương lai
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <button 
            onClick={handleEnter}
            className="group relative px-10 py-4 overflow-hidden rounded-2xl glass border border-white/10 hover:border-blue-500/50 transition-all duration-500 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <span className="relative text-lg font-medium tracking-widest uppercase group-hover:text-blue-200 transition-colors">
              Khám Phá Gia Tộc
            </span>
          </button>
          
          <p className="text-slate-500 text-[10px] uppercase tracking-widest animate-pulse">
            created by kov1cx
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center text-slate-600 text-[10px] tracking-[0.5em] uppercase">
        Hệ thống quản lý phả hệ kỹ thuật số
      </div>
    </div>
  );
};

export default Splash;
