import React, { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import ListView from './components/ListView';
import TreeView from './components/TreeView';
import DetailsModal from './components/DetailsModal';
import ClanHistory from './components/ClanHistory';
import { FamilyMember, TabType } from './types';

const MOCK_DATA: FamilyMember[] = [
  { id: '1', name: 'Nguyễn Văn Tổ', birthYear: '1850', deathDate: '15/03 âm lịch', parentId: null, spouse: 'Lê Thị Tổ', gender: 'Nam', description: 'Người khai sáng dòng họ.', rank: 'Đời thứ 1' },
  { id: '2', name: 'Nguyễn Văn A', birthYear: '1880', deathDate: '10/10 âm lịch', parentId: '1', spouse: 'Lê Thị B', gender: 'Nam', rank: 'Đời thứ 2' },
  { id: '3', name: 'Nguyễn Thị C', birthYear: '1885', deathDate: '', parentId: '1', spouse: 'Trần Văn D', gender: 'Nữ', rank: 'Đời thứ 2' },
  { id: '4', name: 'Nguyễn Văn E', birthYear: '1910', deathDate: '', parentId: '2', spouse: 'Phạm Thị F', gender: 'Nam', rank: 'Đời thứ 3' }
];

const App: React.FC = () => {
  const [isIntro, setIsIntro] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('tree');
  const [members, setMembers] = useState<FamilyMember[]>(MOCK_DATA);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [clanBio, setClanBio] = useState<string>("Dòng họ chúng ta có truyền thống lâu đời, khởi nguồn từ vùng đất địa linh nhân kiệt. Trải qua nhiều thế hệ, con cháu luôn giữ gìn nền nếp gia phong, hiếu học và thành đạt. Bản gia phả số này nhằm ghi chép và lưu truyền công đức của tổ tiên cho muôn đời sau.");

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.style.backgroundColor = '#020617';
      body.classList.remove('light-mode');
      body.classList.add('dark');
    } else {
      body.style.backgroundColor = '#f1f5f9';
      body.classList.add('light-mode');
      body.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleExcelUpload = (data: FamilyMember[]) => {
    if (data && data.length > 0) {
      setMembers(data);
    }
  };

  const handleDownloadSample = () => {
    try {
      const XLSX = (window as any).XLSX;
      if (!XLSX) return;
      
      const sampleData = [
        ["ID", "Parent_ID", "HoTen", "NamSinh", "NgayMat", "GioiTinh", "ThuBac", "VoChong", "GhiChu"],
        ["1", "", "Nguyễn Văn Tổ", "1850", "15/03 âm lịch", "Nam", "Đời 1", "Lê Thị Tổ", "Người khai sáng"],
        ["2", "1", "Nguyễn Văn A", "1880", "10/10 âm lịch", "Nam", "Đời 2", "Trần Thị B", "Trưởng chi"],
        ["3", "1", "Nguyễn Thị C", "1885", "", "Nữ", "Đời 2", "Lý Văn D", "Thứ chi"],
        ["4", "2", "Nguyễn Văn E", "1910", "", "Nam", "Đời 3", "", "Cháu đích tôn"]
      ];

      const ws = XLSX.utils.aoa_to_sheet(sampleData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "GiaPhaMau");
      XLSX.writeFile(wb, "GiaPha_Mau_Release.xlsx");
    } catch (err) {
      console.error("Lỗi khi tạo file mẫu:", err);
    }
  };

  const updateMember = (updatedMember: FamilyMember) => {
    setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
    setSelectedMember(updatedMember);
  };

  if (isIntro) {
    return <Splash onEnter={() => setIsIntro(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none float-anim" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-800/10 rounded-full blur-[120px] pointer-events-none float-anim" style={{ animationDelay: '-4s' }} />

      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onUpload={handleExcelUpload} 
        onExport={() => window.print()}
        onDownloadSample={handleDownloadSample}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="no-print">
          {activeTab === 'list' && <ListView members={members} onSelect={setSelectedMember} />}
          {activeTab === 'tree' && <TreeView members={members} onSelect={setSelectedMember} />}
          {activeTab === 'history' && <ClanHistory biography={clanBio} onUpdate={setClanBio} />}
        </div>

        {/* Print Layout */}
        <div className="hidden print-only">
          <div className="text-center mb-12 border-b-4 border-black pb-6">
            <h1 className="text-5xl font-display font-bold text-black uppercase tracking-tight">Gia Phả Dòng Họ</h1>
            <p className="text-black/60 mt-3 italic text-lg">Tài liệu lưu trữ nội bộ gia tộc - Phiên bản in ấn</p>
          </div>
          <div className="mb-12 p-10 border-2 border-black/20 rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 border-b border-black/10 pb-2">Tiểu sử dòng họ</h2>
            <p className="text-base leading-relaxed whitespace-pre-wrap text-black">{clanBio}</p>
          </div>
          <h2 className="text-2xl font-bold mb-6">Danh sách thành viên</h2>
          <ListView members={members} onSelect={() => {}} />
        </div>
      </main>

      {selectedMember && (
        <DetailsModal 
          member={selectedMember} 
          members={members}
          onClose={() => setSelectedMember(null)} 
          onSave={updateMember}
        />
      )}

      <footer className="no-print p-10 text-center border-t border-black/5 dark:border-white/5 glass bg-transparent mt-auto">
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-500 dark:text-slate-400 text-[10px] tracking-[0.5em] uppercase font-black opacity-80">
            GenHeritage v1.0 • Release Version
          </p>
          <div className="flex items-center gap-3 mt-1">
            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
            <p className="text-slate-600 dark:text-slate-500 text-[9px] uppercase tracking-widest">
              Digital Clan Records • Proudly built by kov1cx
            </p>
            <span className="w-1 h-1 rounded-full bg-blue-500"></span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;