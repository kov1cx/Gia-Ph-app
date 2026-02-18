
import React, { useState } from 'react';

interface PrintModalProps {
  onClose: () => void;
  onConfirm: (title: string) => void;
}

const PrintModal: React.FC<PrintModalProps> = ({ onClose, onConfirm }) => {
  const [title, setTitle] = useState('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 no-print">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl transition-colors duration-500" onClick={onClose}></div>
      <div className="relative w-full max-w-md glass rounded-[2.5rem] border border-amber-500/20 p-10 shadow-2xl animate-in fade-in zoom-in duration-300">
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-16 h-16 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 mb-4 border border-amber-500/20">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
          </div>
          <h3 className="text-2xl font-display font-bold text-white uppercase tracking-tight">Cấu hình bản in</h3>
          <p className="text-amber-500/50 text-[10px] uppercase tracking-[0.2em] mt-2 font-black">Thiết lập trang bìa di sản</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-amber-900 ml-2">Tên tiêu đề trang bìa</label>
            <input 
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ví dụ: Gia Phả Dòng Họ Nguyễn"
              className="w-full bg-black/40 border border-amber-500/20 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-amber-500 transition-all placeholder:text-amber-900/30"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              onClick={onClose}
              className="flex-1 py-4 glass border border-amber-500/10 text-amber-500/60 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/5 transition-all"
            >
              Hủy bỏ
            </button>
            <button 
              onClick={() => onConfirm(title || "Gia Phả Dòng Họ")}
              className="flex-1 py-4 bg-amber-700 hover:bg-amber-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-amber-900/20 active:scale-95 transition-all"
            >
              Xác nhận & In
            </button>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[9px] text-amber-900/40 leading-relaxed uppercase tracking-tighter font-bold">
            Lưu ý: Hệ thống sẽ tự động tối ưu hóa <br/> cho cả hai khổ giấy A4 và A5.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrintModal;
