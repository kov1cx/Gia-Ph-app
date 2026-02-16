
import React, { useRef } from 'react';
import { TabType, FamilyMember } from '../types';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onUpload: (data: FamilyMember[]) => void;
  onAddMember: () => void;
  onExport: () => void;
  onDownloadSample: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
  isSaved?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ 
  activeTab, onTabChange, onUpload, onAddMember, onExport, onDownloadSample, isDarkMode, toggleTheme, isSaved = true
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const normalizeKey = (key: string) => {
    return String(key).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "").replace(/[^a-z0-9]/g, "");
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
    <nav className="no-print sticky top-0 z-50 glass border-b border-amber-500/10 px-6 py-4 shadow-xl shadow-black/40">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(245,158,11,0.3)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div>
            <h1 className="text-xl font-black font-display tracking-tight uppercase text-amber-500">Gia Phả Số</h1>
            <div className="flex items-center gap-1.5">
              <div className={`w-1 h-1 rounded-full ${isSaved ? 'bg-amber-400' : 'bg-red-500 animate-pulse'}`}></div>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] opacity-40">{isSaved ? 'Hệ thống đã lưu' : 'Đang cập nhật...'}</span>
            </div>
          </div>
        </div>

        <div className="flex bg-black/40 p-1 rounded-xl border border-amber-500/5">
          {(['tree', 'list', 'history'] as TabType[]).map(tab => (
            <button key={tab} onClick={() => onTabChange(tab)} className={`px-6 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-amber-600 text-white shadow-lg' : 'text-amber-900/60 hover:text-amber-500'}`}>
              {tab === 'tree' ? 'Phả hệ' : tab === 'list' ? 'Danh sách' : 'Tiểu sử'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button onClick={onAddMember} className="w-10 h-10 flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-black rounded-xl shadow-lg shadow-amber-500/20 transition-all active:scale-95" title="Thêm thành viên gốc">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
          </button>
          
          <div className="h-8 w-px bg-amber-500/10 mx-1"></div>

          <button onClick={toggleTheme} className="p-2.5 glass rounded-xl border border-amber-500/10 text-amber-500">{isDarkMode ? '🌙' : '☀️'}</button>
          
          <input type="file" ref={fileInputRef} onChange={handleFile} className="hidden" accept=".xlsx,.xls" />
          <div className="flex items-center gap-0.5">
            <button onClick={() => fileInputRef.current?.click()} className="px-5 py-2.5 glass border border-amber-500/20 text-[10px] font-black uppercase tracking-widest text-amber-500 hover:bg-amber-600/10 transition-all rounded-l-xl">Nhập Excel</button>
            <button onClick={onDownloadSample} className="px-3 py-2.5 glass border border-amber-500/20 text-amber-500 hover:bg-amber-600/10 transition-all rounded-r-xl border-l-0" title="Tải file mẫu">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
            </button>
          </div>
          
          <button onClick={onExport} className="px-6 py-2.5 bg-amber-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-amber-900/20 active:scale-95 transition-all">Xuất PDF</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
