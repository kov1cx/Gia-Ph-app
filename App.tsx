
import React, { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import ListView from './components/ListView';
import TreeView from './components/TreeView';
import DetailsModal from './components/DetailsModal';
import ClanHistory from './components/ClanHistory';
import { FamilyMember, TabType } from './types';

const STORAGE_KEY = 'gen_heritage_data';
const BIO_KEY = 'gen_heritage_bio';

const App: React.FC = () => {
  const [isIntro, setIsIntro] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('tree');
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [clanBio, setClanBio] = useState<string>("");
  const [isSaved, setIsSaved] = useState(true);

  // Load data from LocalStorage on startup (Desktop/Offline behavior)
  useEffect(() => {
    const savedMembers = localStorage.getItem(STORAGE_KEY);
    const savedBio = localStorage.getItem(BIO_KEY);
    
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    } else {
      // Default demo data if empty
      setMembers([
        { id: '1', name: 'Nguyễn Văn Tổ', birthYear: '1850', deathDate: '15/03 âm lịch', parentId: null, spouse: 'Lê Thị Tổ', gender: 'Nam', rank: 'Đời thứ 1' },
        { id: '2', name: 'Nguyễn Văn A', birthYear: '1880', deathDate: '10/10 âm lịch', parentId: '1', spouse: 'Trần Thị B', gender: 'Nam', rank: 'Đời thứ 2' }
      ]);
    }
    
    if (savedBio) {
      setClanBio(savedBio);
    } else {
      setClanBio("Bản gia phả này là tâm huyết của con cháu nhằm lưu giữ cội nguồn dòng họ. Xin hãy trân trọng và bổ sung định kỳ.");
    }
  }, []);

  // Sync to LocalStorage whenever data changes
  useEffect(() => {
    if (members.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(members));
      setIsSaved(true);
    }
  }, [members]);

  useEffect(() => {
    if (clanBio) {
      localStorage.setItem(BIO_KEY, clanBio);
      setIsSaved(true);
    }
  }, [clanBio]);

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.remove('light-mode');
      body.style.backgroundColor = '#020617';
    } else {
      body.classList.add('light-mode');
      body.style.backgroundColor = '#f8fafc';
    }
  }, [isDarkMode]);

  const handleExcelUpload = (data: FamilyMember[]) => {
    setMembers(data);
    setIsSaved(false);
  };

  const handleUpdateBio = (newBio: string) => {
    setClanBio(newBio);
    setIsSaved(false);
  };

  const handleDownloadSample = () => {
    const XLSX = (window as any).XLSX;
    if (!XLSX) return;
    const data = [
      ["ID", "Parent_ID", "HoTen", "NamSinh", "NgayMat", "GioiTinh", "ThuBac", "VoChong", "GhiChu"],
      ["1", "", "Nguyễn Văn Tổ", "1850", "15/03 âm lịch", "Nam", "Đời 1", "Lê Thị Tổ", "Cụ tổ khai sáng"],
      ["2", "1", "Nguyễn Văn A", "1880", "10/10 âm lịch", "Nam", "Đời 2", "Trần Thị B", "Trưởng chi"]
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GiaPha");
    XLSX.writeFile(wb, "Mau_Gia_Pha_Desktop.xlsx");
  };

  if (isIntro) return <Splash onEnter={() => setIsIntro(false)} />;

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="fixed top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none animate-float" />
      <div className="fixed bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-indigo-600/5 rounded-full blur-[150px] pointer-events-none animate-float" style={{ animationDelay: '-5s' }} />

      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onUpload={handleExcelUpload} 
        onExport={() => window.print()}
        onDownloadSample={handleDownloadSample}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
        isSaved={isSaved}
      />

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <div className="no-print">
          {activeTab === 'list' && <ListView members={members} onSelect={setSelectedMember} />}
          {activeTab === 'tree' && <TreeView members={members} onSelect={setSelectedMember} />}
          {activeTab === 'history' && <ClanHistory biography={clanBio} onUpdate={handleUpdateBio} />}
        </div>

        <div className="hidden print-only">
          <div className="text-center mb-16 border-b-8 border-double border-black pb-8">
            <h1 className="text-6xl font-display font-bold uppercase">Gia Phả Dòng Họ</h1>
            <p className="text-xl mt-4 italic">Tài liệu lưu trữ nội bộ</p>
          </div>
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">I. Tiểu sử dòng họ</h2>
            <p className="text-lg leading-relaxed whitespace-pre-wrap">{clanBio}</p>
          </div>
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">II. Danh sách thành viên</h2>
            <ListView members={members} onSelect={() => {}} />
          </div>
        </div>
      </main>

      {selectedMember && (
        <DetailsModal 
          member={selectedMember} 
          members={members} 
          onClose={() => setSelectedMember(null)} 
          onSave={(updated) => {
            setMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
            setIsSaved(false);
          }}
        />
      )}

      <footer className="no-print py-10 text-center opacity-50 text-[10px] uppercase tracking-[0.4em] font-black">
        GenHeritage Offline Mode • Release v1.1
      </footer>
    </div>
  );
};

export default App;
