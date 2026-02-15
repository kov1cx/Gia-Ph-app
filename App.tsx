
import React, { useState, useEffect } from 'react';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import ListView from './components/ListView';
import TreeView from './components/TreeView';
import DetailsModal from './components/DetailsModal';
import ClanHistory from './components/ClanHistory';
import { FamilyMember, TabType } from './types';

const MOCK_DATA: FamilyMember[] = [
  { id: '1', name: 'Ông Tổ Dòng Họ', birthYear: '1850', deathDate: '15/03 âm lịch', parentId: null, spouse: 'Bà Tổ', gender: 'Nam', description: 'Người khai sáng dòng họ.', rank: 'Đời thứ 1' },
  { id: '2', name: 'Nguyễn Văn A', birthYear: '1880', deathDate: '10/10 âm lịch', parentId: '1', spouse: 'Lê Thị B', gender: 'Nam', rank: 'Trưởng chi' },
  { id: '3', name: 'Nguyễn Thị C', birthYear: '1885', deathDate: '', parentId: '1', spouse: 'Trần Văn D', gender: 'Nữ', rank: 'Thứ chi' }
];

const App: React.FC = () => {
  const [isIntro, setIsIntro] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('tree');
  const [members, setMembers] = useState<FamilyMember[]>(MOCK_DATA);
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [clanBio, setClanBio] = useState<string>("Dòng họ chúng ta có truyền thống lâu đời, khởi nguồn từ vùng đất địa linh nhân kiệt. Trải qua nhiều thế hệ, con cháu luôn giữ gìn nền nếp gia phong, hiếu học và thành đạt...");

  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.style.backgroundColor = '#020617';
      body.classList.remove('light-mode', 'text-slate-900');
      body.classList.add('text-slate-100');
    } else {
      body.style.backgroundColor = '#f8fafc';
      body.classList.add('light-mode', 'text-slate-900');
      body.classList.remove('text-slate-100');
    }
  }, [isDarkMode]);

  const handleExcelUpload = (data: FamilyMember[]) => {
    if (data && data.length > 0) {
      setMembers(data);
    }
  };

  const updateMember = (updatedMember: FamilyMember) => {
    setMembers(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
    setSelectedMember(updatedMember);
  };

  const handleExportPDF = () => {
    window.print();
  };

  if (isIntro) {
    return <Splash onEnter={() => setIsIntro(false)} />;
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-x-hidden">
      {/* Dynamic Background Bloom Orbs */}
      <div className="fixed top-[-15%] left-[-10%] w-[60%] h-[60%] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none float-anim" />
      <div className="fixed bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-indigo-800/15 rounded-full blur-[140px] pointer-events-none float-anim" style={{ animationDelay: '-3s' }} />
      <div className="fixed top-[20%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none float-anim" style={{ animationDelay: '-1.5s' }} />

      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onUpload={handleExcelUpload} 
        onExport={handleExportPDF}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 relative z-10">
        <div className="no-print">
          {activeTab === 'list' && <ListView members={members} onSelect={setSelectedMember} />}
          {activeTab === 'tree' && <TreeView members={members} onSelect={setSelectedMember} />}
          {activeTab === 'history' && <ClanHistory biography={clanBio} onUpdate={setClanBio} />}
        </div>

        <div className="hidden print-only">
          <div className="text-center mb-10 border-b-2 border-black pb-4">
            <h1 className="text-4xl font-display font-bold text-black uppercase">Gia Phả Dòng Họ</h1>
            <p className="text-black/60 mt-2 italic">Tài liệu lưu trữ nội bộ gia tộc</p>
          </div>
          <div className="mb-10 p-6 border border-black/10">
            <h2 className="text-xl font-bold mb-4">Tiểu sử dòng họ</h2>
            <p className="text-sm whitespace-pre-wrap">{clanBio}</p>
          </div>
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

      <footer className="no-print p-8 text-center border-t border-white/5 glass bg-transparent mt-auto">
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-500 text-[10px] tracking-[0.4em] uppercase font-medium opacity-60">
            GenHeritage System • Digital Clan Records
          </p>
          <p className="text-slate-600 text-[9px] uppercase tracking-widest mt-1">
            Created by kov1cx
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
