
import React, { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import ListView from './components/ListView';
import TreeView from './components/TreeView';
import DetailsModal from './components/DetailsModal';
import ClanHistory from './components/ClanHistory';
import PrintTemplate from './components/PrintTemplate';
import PrintModal from './components/PrintModal';
import { FamilyMember, TabType } from './types';

const STORAGE_KEY = 'gen_heritage_data_v1.5';
const BIO_KEY = 'gen_heritage_bio_v1.5';

const App: React.FC = () => {
  const [isIntro, setIsIntro] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('tree');
  const [members, setMembers] = useState<FamilyMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [addingParentId, setAddingParentId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [clanBio, setClanBio] = useState<string>("");
  const [isSaved, setIsSaved] = useState(true);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [printTitle, setPrintTitle] = useState("Gia Phả Dòng Họ");

  useEffect(() => {
    const savedMembers = localStorage.getItem(STORAGE_KEY);
    const savedBio = localStorage.getItem(BIO_KEY);
    const savedTheme = localStorage.getItem('gen_heritage_theme');
    
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'dark');
    }

    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    } else {
      setMembers([
        { id: '1', name: 'Nguyễn Văn Tổ', birthYear: '1850', deathDate: '15/03 âm lịch', parentId: null, spouse: 'Lê Thị Tổ', gender: 'Nam', rank: 'Đời thứ 1', description: 'Cụ tổ khai sinh dòng họ.' },
        { id: '2', name: 'Nguyễn Văn A', birthYear: '1880', deathDate: '10/10 âm lịch', parentId: '1', spouse: 'Trần Thị B', gender: 'Nam', rank: 'Đời thứ 2', description: 'Con trưởng chi 1.' }
      ]);
    }
    
    if (savedBio) {
      setClanBio(savedBio);
    } else {
      setClanBio("Bản gia phả này là tâm huyết của con cháu nhằm lưu giữ cội nguồn dòng họ. Xin hãy trân trọng và bổ sung định kỳ.");
    }
  }, []);

  useEffect(() => {
    // Sync theme class with body
    if (isDarkMode) {
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
    }
    localStorage.setItem('gen_heritage_theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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

  const handleAddMember = (parentId: string | null = null) => {
    setAddingParentId(parentId);
    setIsAddingMode(true);
  };

  const handleSaveNewMember = (newMember: FamilyMember) => {
    setMembers(prev => [...prev, { ...newMember, id: Date.now().toString() }]);
    setIsAddingMode(false);
    setIsSaved(false);
  };

  const handleDeleteMember = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa thành viên này và toàn bộ con cháu của họ?")) {
      const idsToDelete = new Set<string>();
      const findChildren = (pid: string) => {
        idsToDelete.add(pid);
        members.filter(m => m.parentId === pid).forEach(child => findChildren(child.id));
      };
      findChildren(id);
      setMembers(prev => prev.filter(m => !idsToDelete.has(m.id)));
      setIsSaved(false);
    }
  };

  const handleResetData = () => {
    if (confirm("CẢNH BÁO: Hành động này sẽ xóa toàn bộ dữ liệu gia phả hiện có. Bạn có chắc chắn muốn làm mới hoàn toàn không?")) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(BIO_KEY);
      window.location.reload();
    }
  };

  const handleDownloadSample = () => {
    const XLSX = (window as any).XLSX;
    if (!XLSX) return;
    const data = [
      ["ID", "Parent_ID", "HoTen", "NamSinh", "NgayMat", "GioiTinh", "ThuBac", "VoChong", "GhiChu"],
      ["1", "", "Nguyễn Văn Tổ", "1850", "15/03 âm lịch", "Nam", "Đời 1", "Lê Thị Tổ", "Cụ tổ"],
      ["2", "1", "Nguyễn Văn A", "1880", "10/10 âm lịch", "Nam", "Đời 2", "Trần Thị B", "Con trưởng"]
    ];
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "GiaPha");
    XLSX.writeFile(wb, "Mau_Gia_Pha_So_v1.5.xlsx");
  };

  const handleExportPDF = () => {
    setIsPrintModalOpen(true);
  };

  const handleConfirmPrint = (title: string) => {
    setPrintTitle(title);
    setIsPrintModalOpen(false);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className={`min-h-screen flex flex-col relative overflow-hidden transition-colors duration-500`}>
      {isIntro && <Splash onEnter={() => setIsIntro(false)} />}

      <div className={`flex flex-col min-h-screen transition-all duration-1000 cubic-bezier(0.4, 0, 0.2, 1) ${isIntro ? 'opacity-0 scale-95 blur-2xl translate-y-20' : 'opacity-100 scale-100 blur-0 translate-y-0'}`}>
        <div className={`glow-orb top-[-10%] left-[-5%] w-[60%] h-[60%] animate-float ${isDarkMode ? 'bg-amber-600/10' : 'bg-[#7c2d12]/15'}`} />
        <div className={`glow-orb bottom-[-10%] right-[-5%] w-[60%] h-[60%] animate-float ${isDarkMode ? 'bg-orange-900/10' : 'bg-amber-100/20'}`} style={{ animationDelay: '-7s' }} />

        <Navbar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onUpload={setMembers} 
          onAddMember={() => handleAddMember(null)}
          onExport={handleExportPDF}
          onDownloadSample={handleDownloadSample}
          onReset={handleResetData}
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
          isSaved={isSaved}
        />

        <main className="flex-grow container mx-auto px-4 py-8 relative z-10 no-print">
          {activeTab === 'list' && <ListView members={members} onSelect={setSelectedMember} isDarkMode={isDarkMode} />}
          {activeTab === 'tree' && <TreeView members={members} onSelect={setSelectedMember} onAddChild={handleAddMember} isDarkMode={isDarkMode} />}
          {activeTab === 'history' && <ClanHistory biography={clanBio} onUpdate={setClanBio} isDarkMode={isDarkMode} />}
        </main>

        <PrintTemplate members={members} biography={clanBio} customTitle={printTitle} />

        {isPrintModalOpen && (
          <PrintModal 
            onClose={() => setIsPrintModalOpen(false)} 
            onConfirm={handleConfirmPrint} 
          />
        )}

        {(selectedMember || isAddingMode) && (
          <DetailsModal 
            member={isAddingMode ? { id: '', name: '', birthYear: '', parentId: addingParentId, gender: 'Nam' } : selectedMember!} 
            members={members} 
            isNew={isAddingMode}
            onClose={() => { setSelectedMember(null); setIsAddingMode(false); }} 
            onSave={(updated) => {
              if (isAddingMode) handleSaveNewMember(updated);
              else {
                setMembers(prev => prev.map(m => m.id === updated.id ? updated : m));
                setIsSaved(false);
              }
              setSelectedMember(null);
              setIsAddingMode(false);
            }}
            onDelete={handleDeleteMember}
          />
        )}

        <footer className="no-print py-12 flex flex-col items-center gap-3 opacity-40">
          <div className="flex items-center gap-4">
             <div className="h-[1px] w-8 bg-amber-500/20"></div>
             <p className="text-[9px] uppercase tracking-[0.6em] font-black text-amber-500">Official Heritage Release • v1.5 Final</p>
             <div className="h-[1px] w-8 bg-amber-500/20"></div>
          </div>
          <p className="text-[7px] uppercase tracking-[0.4em] font-bold">Lưu giữ ngàn đời — Tự hào dòng tộc Việt Nam</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
