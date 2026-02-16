
import React, { useState, useEffect } from 'react';

interface SplashProps {
  onEnter: () => void;
}

const CornerDecoration: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute w-32 h-32 md:w-48 md:h-48 pointer-events-none opacity-20 ${className}`}>
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-amber-500">
      <path d="M20 20H60M20 20V60M20 20L80 80" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="4" fill="currentColor"/>
      <path d="M40 20C40 40 20 40 20 40" stroke="currentColor" strokeWidth="1"/>
      <path d="M100 20C80 20 70 30 70 50" stroke="currentColor" strokeWidth="0.5"/>
      <path d="M20 100C20 80 30 70 50 70" stroke="currentColor" strokeWidth="0.5"/>
    </svg>
  </div>
);

const Splash: React.FC<SplashProps> = ({ onEnter }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    setTimeout(onEnter, 1200);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-[1200ms] cubic-bezier(0.4, 0, 0.2, 1) ${isExiting ? 'opacity-0 scale-[1.5] blur-[50px] pointer-events-none' : 'opacity-100 bg-[#050505]'}`}>
      
      {/* Decorative Ornaments */}
      <CornerDecoration className="top-8 left-8" />
      <CornerDecoration className="top-8 right-8 rotate-90" />
      <CornerDecoration className="bottom-8 left-8 -rotate-90" />
      <CornerDecoration className="bottom-8 right-8 rotate-180" />

      {/* Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(245,158,11,0.12)_0%,_transparent_65%)] animate-breathe"></div>
      
      <div className={`relative z-10 text-center flex flex-col items-center px-6 max-w-5xl transition-all duration-1000 transform ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Logo Icon */}
        <div className="group relative mb-12">
          <div className="absolute inset-0 bg-amber-500/20 blur-3xl rounded-full scale-150 group-hover:bg-amber-500/30 transition-all duration-1000"></div>
          <div className="w-24 h-24 md:w-32 md:h-32 glass rounded-[2.5rem] flex items-center justify-center border-t border-l border-amber-500/30 shadow-2xl relative">
            <svg className="w-12 h-12 md:w-16 md:h-16 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
        </div>
        
        {/* Main Titles */}
        <div className="space-y-8">
          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-none">
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-amber-100 via-amber-400 to-amber-700 pb-2">
                Gia Phả Số
              </span>
            </h1>
          </div>
          
          <div className="flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-amber-500/50"></div>
            <p className="text-amber-500/80 text-xs md:text-sm font-light tracking-[0.8em] uppercase whitespace-nowrap">
              Di Sản & Cội Nguồn
            </p>
            <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-amber-500/50"></div>
          </div>
        </div>

        {/* Action Section */}
        <div className="mt-20 flex flex-col items-center gap-12">
          <button 
            onClick={handleEnter}
            className="group relative px-16 py-6 overflow-hidden rounded-full transition-all duration-500 active:scale-95"
          >
            {/* Button Background Layers */}
            <div className="absolute inset-0 bg-amber-600 opacity-10 group-hover:opacity-20 transition-opacity"></div>
            <div className="absolute inset-0 border border-amber-500/30 group-hover:border-amber-500/60 rounded-full transition-all"></div>
            <div className="absolute inset-0 border-t border-l border-white/10 rounded-full"></div>
            
            <span className="relative z-10 text-lg md:text-xl font-medium tracking-[0.4em] uppercase text-amber-200 group-hover:text-white transition-all flex items-center gap-4">
              Khám Phá Gia Tộc
              <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
              </svg>
            </span>
          </button>
          
          {/* Slogan */}
          <div className="max-w-md">
            <p className="text-amber-900/40 text-[10px] uppercase tracking-[0.5em] leading-loose font-bold">
              Hệ thống lưu trữ số hóa dòng họ chuyên nghiệp <br/>
              Bảo tồn bản sắc Việt qua các thế hệ
            </p>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="absolute bottom-12 left-0 right-0 text-center flex flex-col gap-2 opacity-20 hover:opacity-40 transition-opacity cursor-default">
        <p className="text-amber-500 text-[9px] tracking-[1.2em] uppercase font-black">
          Vietnamese Heritage System
        </p>
        <p className="text-amber-900 text-[8px] tracking-[0.4em] uppercase">
          EST. 2024 • Phiên Bản Di Sản
        </p>
      </div>
    </div>
  );
};

export default Splash;
