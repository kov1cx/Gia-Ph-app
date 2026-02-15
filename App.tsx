
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
      body.className = 'bg-slate-950 text-slate-100 transition-colors duration-500';
    } else {
      body.className = 'light-mode bg-slate-50 text-slate-900 transition-colors duration-500';
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
    <div className={`min-h-screen flex flex-col relative overflow-x-hidden`}>
      {/* Background Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onUpload={handleExcelUpload} 
        onExport={handleExportPDF}
        isDarkMode={isDarkMode}
        toggleTheme={() => setIsDarkMode(!isDarkMode)}
      />

      <main className="flex-grow container mx-auto px-4 py-6 md:py-10 relative z-10">
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

      <footer className="no-print p-6 text-center border-t border-white/5 glass bg-transparent mt-auto">
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-500 text-xs tracking-widest uppercase">
            © 2024 Gia Phả Dòng Họ • created by kov1cx
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
