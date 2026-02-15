
import React from 'react';
import { FamilyMember } from '../types';

interface TreeViewProps {
  members: FamilyMember[];
  onSelect: (member: FamilyMember) => void;
}

const TreeNode: React.FC<{ 
  member: FamilyMember; 
  members: FamilyMember[]; 
  onSelect: (member: FamilyMember) => void;
}> = ({ member, members, onSelect }) => {
  const children = members.filter(m => m.parentId && String(m.parentId) === String(member.id));

  return (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-700">
      <div 
        onClick={() => onSelect(member)}
        className={`tree-node min-w-[170px] md:min-w-[210px] glass p-6 rounded-[2rem] border-2 cursor-pointer flex flex-col items-center gap-1 shadow-2xl relative z-10 transition-all active:scale-90 bg-slate-900/60 ${member.gender === 'Nam' ? 'border-blue-500/40 shadow-blue-500/10' : 'border-pink-500/40 shadow-pink-500/10'}`}
      >
        <span className="text-[9px] dark:text-slate-400 text-slate-500 font-black uppercase tracking-widest mb-2 px-3 py-1 bg-white/5 rounded-full">{member.rank || 'Đời tiếp nối'}</span>
        <span className="text-sm md:text-base font-bold text-center tracking-tight leading-tight dark:text-white text-slate-100">{member.name}</span>
        <div className="flex flex-col items-center mt-2 opacity-80">
          <span className="text-[10px] font-mono text-slate-300">{member.birthYear ? `S: ${member.birthYear}` : ''}</span>
          {member.deathDate && <span className="text-[9px] font-mono text-amber-500">G: {member.deathDate}</span>}
        </div>
        {member.spouse && (
          <div className="mt-4 pt-3 border-t border-white/10 w-full text-center">
            <span className="text-[10px] dark:text-slate-300 text-slate-400 italic block overflow-hidden text-ellipsis whitespace-nowrap px-1">
               {member.gender === 'Nam' ? 'Vợ: ' : 'Chồng: '}{member.spouse}
            </span>
          </div>
        )}
      </div>

      {children.length > 0 && (
        <>
          <div className="h-12 w-[3px] bg-gradient-to-b from-blue-500/40 to-slate-400/20 mt-0"></div>
          <div className="flex flex-row gap-8 md:gap-14 relative pt-8">
            {children.length > 1 && (
              <div className="absolute top-0 left-[20%] right-[20%] h-[3px] bg-slate-400/20 rounded-full"></div>
            )}
            {children.map(child => (
              <div key={child.id} className="relative">
                <div className="absolute top-[-32px] left-1/2 -translate-x-1/2 h-8 w-[3px] bg-slate-400/20"></div>
                <TreeNode member={child} members={members} onSelect={onSelect} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const TreeView: React.FC<TreeViewProps> = ({ members, onSelect }) => {
  const memberIds = new Set(members.map(m => String(m.id)));
  const roots = members.filter(m => !m.parentId || m.parentId === "null" || m.parentId === "0" || m.parentId === "");
  
  const orphans = members.filter(m => {
    const hasParentId = m.parentId && m.parentId !== "null" && m.parentId !== "0" && m.parentId !== "";
    return hasParentId && !memberIds.has(String(m.parentId));
  });

  return (
    <div className="space-y-24">
      <div className="overflow-x-auto p-8 md:p-16 min-h-[60vh] flex justify-center items-start rounded-[3rem] bg-slate-900/20 border border-white/10 transition-all scroll-smooth shadow-inner">
        <div className="flex flex-col items-center gap-20 md:gap-32 w-max">
          {roots.length === 0 ? (
            <div className="flex flex-col items-center gap-6 text-slate-500 py-32 text-center opacity-40">
              <svg className="w-20 h-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              <p className="italic font-light">Chưa có dữ liệu gốc. Hãy nhập file Excel hoặc thêm thành viên đầu tiên.</p>
            </div>
          ) : (
            roots.map(root => (
              <TreeNode key={root.id} member={root} members={members} onSelect={onSelect} />
            ))
          )}
        </div>
      </div>

      {orphans.length > 0 && (
        <div className="mt-20 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-center gap-5 px-8 py-5 glass border-l-8 border-amber-500/50 rounded-2xl bg-amber-500/5">
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <div>
              <h3 className="text-xl font-bold text-amber-200">⚠️ Dữ liệu chưa liên kết được ({orphans.length})</h3>
              <p className="text-sm text-slate-400">Vui lòng kiểm tra lại liên kết ID Cha/Mẹ của những thành viên sau trong file Excel.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {orphans.map(orphan => (
              <div key={orphan.id} onClick={() => onSelect(orphan)} className="glass p-6 rounded-3xl border border-white/10 hover:border-amber-500/50 transition-all cursor-pointer group bg-slate-900/40">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[10px] font-mono text-slate-500 px-2 py-1 bg-white/5 rounded">ID: {orphan.id}</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2 py-1 rounded uppercase font-bold border border-amber-500/20">Cha ID: {orphan.parentId}</span>
                </div>
                <h4 className="font-bold dark:text-slate-100 text-slate-200 group-hover:text-amber-200 text-lg leading-tight">{orphan.name}</h4>
                <p className="text-xs text-slate-500 italic mt-2 uppercase tracking-widest">{orphan.rank || 'Thành viên'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeView;
