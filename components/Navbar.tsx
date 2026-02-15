
import React, { useRef } from 'react';
import { TabType, FamilyMember } from '../types';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  onUpload: (data: FamilyMember[]) => void;
  onExport: () => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange, onUpload, onExport, isDarkMode, toggleTheme }) => {
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
        alert(`Đã nhập thành công ${members.length} thành viên.`);
      } catch (err) {
        alert("Có lỗi khi đọc file Excel.");
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <nav className="no-print sticky top-0 z-50 w-full glass px-4 py-3 transition-all border-b border-white/10 shadow-lg">
      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 self-start lg:self-center">
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center border border-blue-500/30 text-blue-500 shadow-lg bg-blue-500/5">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold font-display tracking-wide uppercase">Gia Phả Dòng Họ</h2>
          </div>
        </div>

        <div className="flex items-center glass p-1 rounded-2xl border border-white/10 w-full md:w-auto overflow-hidden bg-slate-900/20">
          <button onClick={() => onTabChange('tree')} className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${activeTab === 'tree' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500'}`}>Cây</button>
          <button onClick={() => onTabChange('list')} className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${activeTab === 'list' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500'}`}>Danh sách</button>
          <button onClick={() => onTabChange('history')} className={`flex-1 md:flex-none px-4 py-2 rounded-xl text-[10px] font-bold uppercase transition-all ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500'}`}>Tiểu sử</button>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button onClick={toggleTheme} className="p-2.5 glass rounded-xl border border-white/10 bg-white/5">{isDarkMode ? '🌙' : '☀️'}</button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept=".xlsx, .xls" />
          <button onClick={() => fileInputRef.current?.click()} className="px-4 py-2 glass rounded-xl border border-white/10 text-[10px] font-bold uppercase bg-white/5">Nhập Excel</button>
          <button onClick={onExport} className="px-4 py-2 bg-blue-600 text-white rounded-xl text-[10px] font-bold uppercase">Xuất PDF</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
