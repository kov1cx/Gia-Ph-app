
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
  const isMale = member.gender === 'Nam';

  return (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-6 duration-700">
      <div 
        onClick={() => onSelect(member)}
        className={`tree-node min-w-[180px] md:min-w-[220px] glass p-7 rounded-[2.5rem] border-2 cursor-pointer flex flex-col items-center gap-1 shadow-2xl relative z-10 transition-all active:scale-95 ${isMale ? 'border-blue-600/30 dark:border-blue-500/30 bloom-blue bg-blue-500/5' : 'border-pink-600/30 dark:border-pink-500/30 bloom-pink bg-pink-500/5'}`}
      >
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-white/10 dark:from-white/5 to-transparent pointer-events-none"></div>
        
        <span className="text-[8px] text-slate-600 dark:text-slate-400 font-black uppercase tracking-[0.2em] mb-4 px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5">
          {member.rank || 'Tiếp nối'}
        </span>
        
        <span className="text-sm md:text-base font-bold text-center tracking-tight leading-tight text-slate-950 dark:text-white drop-shadow-sm">
          {member.name}
        </span>
        
        <div className="flex flex-col items-center mt-3 opacity-90">
          <span className="text-[10px] font-mono text-slate-700 dark:text-slate-300 font-bold">{member.birthYear ? `S: ${member.birthYear}` : ''}</span>
          {member.deathDate && <span className="text-[9px] font-mono text-amber-700 dark:text-amber-400 font-black">{member.deathDate}</span>}
        </div>
        
        {member.spouse && (
          <div className="mt-5 pt-4 border-t border-black/10 dark:border-white/10 w-full text-center">
            <span className="text-[10px] text-slate-600 dark:text-slate-400 italic block overflow-hidden text-ellipsis whitespace-nowrap px-1 font-medium">
               {isMale ? 'Vợ: ' : 'Chồng: '}{member.spouse}
            </span>
          </div>
        )}
      </div>

      {children.length > 0 && (
        <>
          <div className="h-14 w-[3px] bg-gradient-to-b from-blue-600/40 dark:from-blue-500/40 via-blue-600/20 to-transparent mt-0 shadow-[0_0_10px_rgba(59,130,246,0.3)]"></div>
          <div className="flex flex-row gap-10 md:gap-16 relative pt-10">
            {children.length > 1 && (
              <div className="absolute top-0 left-[25%] right-[25%] h-[3px] bg-black/10 dark:bg-slate-400/20 rounded-full"></div>
            )}
            {children.map(child => (
              <div key={child.id} className="relative">
                <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 h-10 w-[3px] bg-black/10 dark:bg-slate-400/20"></div>
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
    <div className="space-y-32">
      <div className="overflow-x-auto p-12 md:p-28 min-h-[70vh] flex justify-center items-start rounded-[4rem] bg-slate-200/50 dark:bg-slate-950/40 border border-black/5 dark:border-white/5 transition-all scroll-smooth shadow-[inset_0_0_100px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_0_100px_rgba(0,0,0,0.5)] bloom-soft">
        <div className="flex flex-col items-center gap-28 md:gap-40 w-max">
          {roots.length === 0 ? (
            <div className="flex flex-col items-center gap-8 text-slate-500 py-40 text-center opacity-60">
              <div className="p-10 rounded-full glass bloom-soft border-dashed border-2 border-slate-300 dark:border-slate-700">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <p className="italic font-bold tracking-widest uppercase text-xs text-slate-600 dark:text-slate-400">Dữ liệu phả hệ trống</p>
            </div>
          ) : (
            roots.map(root => (
              <TreeNode key={root.id} member={root} members={members} onSelect={onSelect} />
            ))
          )}
        </div>
      </div>

      {orphans.length > 0 && (
        <div className="mt-32 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="flex items-center gap-6 px-10 py-7 glass border-l-8 border-amber-600/60 dark:border-amber-500/40 rounded-3xl bg-amber-500/5 bloom-soft">
            <svg className="w-12 h-12 text-amber-700 dark:text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <div>
              <h3 className="text-2xl font-black text-amber-800 dark:text-amber-200 tracking-tight">Cần kiểm tra liên kết ({orphans.length})</h3>
              <p className="text-sm text-slate-700 dark:text-slate-400 font-bold">Thành viên có mã cha/mẹ không tồn tại trong hệ thống.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {orphans.map(orphan => (
              <div key={orphan.id} onClick={() => onSelect(orphan)} className="glass p-9 rounded-[2.5rem] border border-black/10 dark:border-white/10 hover:border-amber-600 transition-all cursor-pointer group bg-white dark:bg-slate-900/60 shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black font-mono text-slate-500 dark:text-slate-400 px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5">ID: {orphan.id}</span>
                  <span className="text-[10px] bg-amber-100 dark:bg-amber-500/10 text-amber-800 dark:text-amber-500 px-3 py-1 rounded-full uppercase font-black border border-amber-600/20">Cha: {orphan.parentId}</span>
                </div>
                <h4 className="font-black text-slate-950 dark:text-slate-100 group-hover:text-amber-700 dark:group-hover:text-amber-300 text-xl leading-tight transition-colors">{orphan.name}</h4>
                <p className="text-[10px] text-slate-600 dark:text-slate-500 italic mt-4 uppercase tracking-[0.2em] font-black">{orphan.rank || 'Thành viên'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TreeView;
