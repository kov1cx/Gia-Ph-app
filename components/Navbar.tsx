import React, { useRef } from 'react';
import { TabType, FamilyMember } from '../types';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onUpload: (data: FamilyMember[]) => void;
  onExport: () => void;
  onDownloadSample: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, onTabChange, onUpload, onExport, onDownloadSample, isDarkMode, toggleTheme 
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const normalizeKey = (key: string) => {
    return key.toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const dataBuffer = evt.target?.result;
        const XLSX = (window as any).XLSX;
        if (!XLSX) return;

        const wb = XLSX.read(dataBuffer, { type: 'array' });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const rawData = XLSX.utils.sheet_to_json(ws, { defval: "" });
        
        const members: FamilyMember[] = rawData.map((item: any, index: number) => {
          const normalizedItem: any = {};
          Object.keys(item).forEach(k => { normalizedItem[normalizeKey(String(k))] = item[k]; });

          const id = String(normalizedItem.id || normalizedItem.maso || (index + 1));
          const name = String(normalizedItem.hoten || normalizedItem.ten || 'Chưa rõ');
          const birthYear = String(normalizedItem.namsinh || '');
          const deathDate = String(normalizedItem.ngaymat || normalizedItem.giomat || normalizedItem.gio || '');
          
          let parentId = normalizedItem.idchame || normalizedItem.parentid || normalizedItem.macha;
          parentId = (parentId !== undefined && parentId !== "" && parentId !== null) ? String(parentId) : null;

          const genderRaw = String(normalizedItem.gioitinh || 'Nam').toLowerCase();
          const gender = (genderRaw.includes('nu') || genderRaw.includes('female')) ? 'Nữ' : 'Nam';

          return {
            id, name, birthYear, deathDate, parentId,
            spouse: String(normalizedItem.vochong || ''),
            gender: gender as 'Nam' | 'Nữ',
            description: String(normalizedItem.ghichu || ''),
            rank: String(normalizedItem.thubac || '')
          };
        });

        onUpload(members);
      } catch (err) {
        alert("Có lỗi khi đọc file Excel.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <nav className="no-print sticky top-0 z-50 w-full glass px-6 py-4 transition-all border-b border-black/5 dark:border-white/10 shadow-xl bg-white/10 dark:bg-black/10">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center border-2 border-blue-500/40 text-blue-600 dark:text-blue-400 shadow-xl bg-blue-500/5">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-black font-display tracking-tight uppercase text-slate-900 dark:text-white leading-tight">Gia Phả Số</h2>
            <p className="text-[8px] uppercase tracking-[0.3em] font-black text-blue-600/60 dark:text-blue-400/60">Heritage Records</p>
          </div>
        </div>

        <div className="flex items-center glass p-1.5 rounded-2xl border border-black/10 dark:border-white/10 w-full md:w-auto bg-slate-200/50 dark:bg-slate-900/40">
          <button onClick={() => onTabChange('tree')} className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all tracking-widest ${activeTab === 'tree' ? 'bg-blue-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Cây</button>
          <button onClick={() => onTabChange('list')} className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all tracking-widest ${activeTab === 'list' ? 'bg-blue-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Danh sách</button>
          <button onClick={() => onTabChange('history')} className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all tracking-widest ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'}`}>Tiểu sử</button>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button onClick={toggleTheme} className="p-3 glass rounded-2xl border border-black/10 dark:border-white/10 bg-white/10 dark:bg-black/20 hover:scale-110 transition-transform">{isDarkMode ? '🌙' : '☀️'}</button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".xlsx, .xls" />
          
          <button onClick={onDownloadSample} className="px-5 py-3 glass rounded-2xl border border-black/10 dark:border-white/10 text-[10px] font-black uppercase tracking-widest bg-white/20 dark:bg-black/20 hover:bg-amber-500/10 hover:border-amber-500/30 transition-all">Tải Mẫu</button>
          
          <button onClick={() => fileInputRef.current?.click()} className="px-5 py-3 glass rounded-2xl border border-black/10 dark:border-white/10 text-[10px] font-black uppercase tracking-widest bg-white/20 dark:bg-black/20 hover:bg-blue-600/10 hover:border-blue-600 transition-all">Nhập Excel</button>
          
          <button onClick={onExport} className="px-6 py-3 bg-gradient-to-r from-blue-700 to-indigo-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all">Xuất PDF</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;