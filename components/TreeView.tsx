
import React from 'react';
import { FamilyMember } from '../types';

interface TreeViewProps {
  members: FamilyMember[];
  onSelect: (member: FamilyMember) => void;
  onAddChild?: (parentId: string) => void;
}

const TreeNode: React.FC<{ 
  member: FamilyMember; 
  members: FamilyMember[]; 
  onSelect: (member: FamilyMember) => void;
  onAddChild?: (parentId: string) => void;
}> = ({ member, members, onSelect, onAddChild }) => {
  const children = members.filter(m => m.parentId && String(m.parentId) === String(member.id));
  const isMale = member.gender === 'Nam';

  return (
    <div className="flex flex-col items-center animate-in fade-in slide-in-from-top-6 duration-1000">
      <div 
        className={`tree-node min-w-[190px] md:min-w-[240px] glass p-8 rounded-[2.5rem] border-2 flex flex-col items-center gap-1 shadow-2xl relative z-10 ${isMale ? 'border-amber-500/20' : 'border-orange-400/20'} bg-black/40`}
      >
        <div onClick={() => onSelect(member)} className="absolute inset-0 rounded-[2.5rem] cursor-pointer"></div>
        
        <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${isMale ? 'from-amber-500/5' : 'from-orange-500/5'} to-transparent pointer-events-none`}></div>
        
        <span className="text-[8px] text-amber-600/70 dark:text-amber-500/50 font-black uppercase tracking-[0.3em] mb-4 px-3 py-1 bg-amber-500/5 rounded-full border border-amber-500/10 relative z-20">
          {member.rank || 'Tiếp nối'}
        </span>
        
        <span className="text-base md:text-lg font-bold text-center tracking-tight leading-tight text-slate-100 drop-shadow-md relative z-20">
          {member.name}
        </span>
        
        <div className="flex flex-col items-center mt-3 opacity-80 relative z-20">
          <span className="text-[10px] font-mono text-amber-200/60 font-bold">{member.birthYear ? `S: ${member.birthYear}` : ''}</span>
          {member.deathDate && <span className="text-[9px] font-mono text-amber-500 font-black tracking-tighter uppercase">{member.deathDate}</span>}
        </div>
        
        {member.spouse && (
          <div className="mt-5 pt-4 border-t border-amber-500/10 w-full text-center relative z-20">
            <span className="text-[10px] text-amber-600/60 italic block overflow-hidden text-ellipsis whitespace-nowrap px-1 font-medium">
               {isMale ? 'Vợ: ' : 'Chồng: '}{member.spouse}
            </span>
          </div>
        )}

        {/* Nút thêm con cái */}
        <button 
          onClick={(e) => { e.stopPropagation(); onAddChild?.(member.id); }}
          className="absolute bottom-[-15px] bg-amber-600 hover:bg-amber-500 text-black p-1.5 rounded-full shadow-lg border-2 border-black z-30 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 active:scale-95"
          title="Thêm con cái"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
        </button>
      </div>

      {children.length > 0 && (
        <>
          <div className="h-14 w-[2px] bg-gradient-to-b from-amber-600/50 via-amber-600/10 to-transparent shadow-[0_0_15px_rgba(245,158,11,0.3)]"></div>
          <div className="flex flex-row gap-12 md:gap-20 relative pt-10">
            {children.length > 1 && (
              <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-amber-500/20 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.2)]"></div>
            )}
            {children.map(child => (
              <div key={child.id} className="relative group">
                <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 h-10 w-[1px] bg-amber-500/20"></div>
                <TreeNode member={child} members={members} onSelect={onSelect} onAddChild={onAddChild} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const TreeView: React.FC<TreeViewProps> = ({ members, onSelect, onAddChild }) => {
  const roots = members.filter(m => !m.parentId || m.parentId === "null" || m.parentId === "0" || m.parentId === "");
  
  return (
    <div className="space-y-32">
      <div className="overflow-x-auto p-12 md:p-32 min-h-[75vh] flex justify-center items-start rounded-[4rem] bg-black/40 border border-amber-500/5 transition-all scroll-smooth shadow-[inset_0_0_150px_rgba(245,158,11,0.03)]">
        <div className="flex flex-col items-center gap-32 md:gap-48 w-max">
          {roots.length === 0 ? (
            <div className="flex flex-col items-center gap-8 text-amber-900/40 py-40 text-center">
              <div className="p-12 rounded-full glass border-dashed border border-amber-500/20">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
              </div>
              <p className="font-black tracking-[0.5em] uppercase text-[10px]">Phả hệ chưa được khởi tạo</p>
            </div>
          ) : (
            roots.map(root => (
              <div key={root.id} className="group">
                <TreeNode member={root} members={members} onSelect={onSelect} onAddChild={onAddChild} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TreeView;
