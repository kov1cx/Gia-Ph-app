
import React from 'react';
import { FamilyMember } from '../types';

interface ListViewProps {
  members: FamilyMember[];
  onSelect: (member: FamilyMember) => void;
  isDarkMode: boolean;
}

const ListView: React.FC<ListViewProps> = ({ members, onSelect, isDarkMode }) => {
  return (
    <div className={`overflow-x-auto glass rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl transition-all duration-500`}>
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className={`border-b border-black/10 dark:border-white/10 ${isDarkMode ? 'bg-blue-500/5' : 'bg-amber-900/10'}`}>
            <th className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-amber-950/60'}`}>Mã Số</th>
            <th className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-200' : 'text-amber-950'}`}>Họ và Tên</th>
            <th className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-amber-950/60'}`}>Sinh / Mất</th>
            <th className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-amber-950/60'}`}>Giới tính</th>
            <th className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-amber-950/60'}`}>Thứ bậc</th>
            <th className={`px-6 py-5 text-[10px] font-black uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-amber-950/60'}`}>Vợ/Chồng</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5 dark:divide-white/5">
          {members.length === 0 ? (
            <tr><td colSpan={6} className="px-6 py-20 text-center text-slate-500 italic">Chưa có dữ liệu.</td></tr>
          ) : (
            members.map((member) => (
              <tr 
                key={member.id} 
                onClick={() => onSelect(member)} 
                className={`cursor-pointer transition-all group ${isDarkMode ? 'hover:bg-amber-500/5' : 'hover:bg-amber-900/10'}`}
              >
                <td className={`px-6 py-4 text-xs font-mono opacity-50 dark:opacity-40`}>{member.id}</td>
                <td className="px-6 py-4">
                  <span className={`text-base font-bold transition-colors ${isDarkMode ? 'text-white group-hover:text-amber-400' : 'text-[#0f172a] group-hover:text-red-800'}`}>
                    {member.name}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs font-medium">
                  <div className={`${isDarkMode ? 'text-slate-300' : 'text-[#1e293b]'} opacity-90 font-bold`}>{member.birthYear || '?'}</div>
                  <div className={`${isDarkMode ? 'text-amber-500' : 'text-[#991b1b]'} font-black`}>{member.deathDate ? `Giỗ: ${member.deathDate}` : ''}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-lg text-[9px] uppercase font-black tracking-widest border ${member.gender === 'Nam' ? 'bg-blue-500/10 text-blue-700 dark:text-blue-500 border-blue-500/30' : 'bg-pink-500/10 text-pink-700 dark:text-pink-500 border-pink-500/30'}`}>{member.gender}</span>
                </td>
                <td className={`px-6 py-4 text-sm font-semibold ${isDarkMode ? 'text-slate-300' : 'text-[#334155]'}`}>{member.rank || '—'}</td>
                <td className={`px-6 py-4 text-sm opacity-80 italic font-medium ${isDarkMode ? 'text-slate-400' : 'text-[#475569]'}`}>{member.spouse || '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
