
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
  isSaved?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, onTabChange, onUpload, onExport, onDownloadSample, isDarkMode, toggleTheme, isSaved = true
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const normalizeKey = (key: string) => {
    return String(key)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "")
      .replace(/[^a-z0-9]/g, "");
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const XLSX = (window as any).XLSX;
        const wb = XLSX.read(evt.target?.result, { type: 'array' });
        const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
        
        const mapped = data.map((item: any, idx: number) => {
          const row: any = {};
          Object.keys(item).forEach(k => row[normalizeKey(k)] = item[k]);
          
          return {
            id: String(row.id || row.maso || idx + 1),
            parentId: row.parentid || row.idchame || row.macha || null,
            name: row.hoten || row.ten || 'Chưa rõ',
            birthYear: String(row.namsinh || ''),
            deathDate: row.ngaymat || row.giomat || '',
            gender: (String(row.gioitinh || '')).toLowerCase().includes('nu') ? 'Nữ' : 'Nam',
            spouse: row.vochong || '',
            rank: row.thubac || '',
            description: row.ghichu || ''
          };
        });
        onUpload(mapped);
      } catch (err) { alert("Lỗi đọc file!"); }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <nav className="no-print sticky top-0 z-50 glass border-b border-black/5 dark:border-white/10 px-6 py-4">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div>
            <h1 className="text-xl font-black font-display tracking-tight uppercase">Gia Phả Số</h1>
            <div className="flex items-center gap-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${isSaved ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`}></div>
              <span className="text-[8px] font-black uppercase tracking-widest opacity-40">{isSaved ? 'Đã lưu cục bộ' : 'Đang thay đổi...'}</span>
            </div>
          </div>
        </div>

        <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl">
          {(['tree', 'list', 'history'] as TabType[]).map(tab => (
            <button key={tab} onClick={() => onTabChange(tab)} className={`px-6 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500'}`}>
              {tab === 'tree' ? 'Cây' : tab === 'list' ? 'Danh sách' : 'Tiểu sử'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2.5 glass rounded-xl border border-black/10 dark:border-white/10 hover:scale-110 transition-transform">{isDarkMode ? '🌙' : '☀️'}</button>
          <input type="file" ref={fileInputRef} onChange={handleFile} className="hidden" accept=".xlsx,.xls" />
          <button onClick={onDownloadSample} className="px-4 py-2.5 glass border border-black/10 dark:border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-amber-500/10 transition-all">Mẫu Excel</button>
          <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2.5 glass border border-black/10 dark:border-white/10 text-[10px] font-black uppercase tracking-widest hover:bg-blue-600/10 transition-all">Nhập File</button>
          <button onClick={onExport} className="px-5 py-2.5 bg-blue-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Xuất PDF</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
