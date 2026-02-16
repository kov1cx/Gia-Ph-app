
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
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [addingParentId, setAddingParentId] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [clanBio, setClanBio] = useState<string>("");
  const [isSaved, setIsSaved] = useState(true);

  useEffect(() => {
    const savedMembers = localStorage.getItem(STORAGE_KEY);
    const savedBio = localStorage.getItem(BIO_KEY);
    
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers));
    } else {
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
      body.style.backgroundColor = '#050505';
    } else {
      body.classList.add('light-mode');
      body.style.backgroundColor = '#fdfbf7';
    }
  }, [isDarkMode]);

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
    XLSX.writeFile(wb, "Mau_Gia_Pha_So.xlsx");
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden bg-[#050505]">
      {isIntro && <Splash onEnter={() => setIsIntro(false)} />}

      <div className={`flex flex-col min-h-screen transition-all duration-1000 ${isIntro ? 'opacity-0 scale-95 blur-xl' : 'opacity-100 scale-100 blur-0'}`}>
        <div className="glow-orb top-[-10%] left-[-5%] w-[60%] h-[60%] bg-amber-600/10 animate-float" />
        <div className="glow-orb bottom-[-10%] right-[-5%] w-[60%] h-[60%] bg-orange-900/10 animate-float" style={{ animationDelay: '-7s' }} />

        <Navbar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
          onUpload={setMembers} 
          onAddMember={() => handleAddMember(null)}
          onExport={() => window.print()}
          onDownloadSample={handleDownloadSample}
          isDarkMode={isDarkMode}
          toggleTheme={() => setIsDarkMode(!isDarkMode)}
          isSaved={isSaved}
        />

        <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
          <div className="no-print">
            {activeTab === 'list' && <ListView members={members} onSelect={setSelectedMember} />}
            {activeTab === 'tree' && <TreeView members={members} onSelect={setSelectedMember} onAddChild={handleAddMember} />}
            {activeTab === 'history' && <ClanHistory biography={clanBio} onUpdate={setClanBio} />}
          </div>

          <div className="hidden print-only">
            <div className="text-center mb-16 border-b-8 border-double border-black pb-8">
              <h1 className="text-6xl font-display font-bold uppercase">Gia Phả Dòng Họ</h1>
            </div>
            <ClanHistory biography={clanBio} onUpdate={() => {}} />
            <ListView members={members} onSelect={() => {}} />
          </div>
        </main>

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

        <footer className="no-print py-10 text-center opacity-30 text-[9px] uppercase tracking-[0.6em] font-black">
          GenHeritage • Royal Legacy Edition • v1.4
        </footer>
      </div>
    </div>
  );
};

export default App;
