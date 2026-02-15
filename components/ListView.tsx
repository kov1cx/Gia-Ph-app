
import React from 'react';
import { FamilyMember } from '../types';

interface ListViewProps {
  members: FamilyMember[];
  onSelect: (member: FamilyMember) => void;
}

const ListView: React.FC<ListViewProps> = ({ members, onSelect }) => {
  return (
    <div className="overflow-x-auto glass rounded-3xl border border-black/10 dark:border-white/10 shadow-2xl">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="border-b border-black/10 dark:border-white/10 bg-blue-500/5">
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Mã Số</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-800 dark:text-slate-200">Họ và Tên</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Sinh / Mất</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Giới tính</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Thứ bậc</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400">Vợ/Chồng</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-black/5 dark:divide-white/5">
          {members.length === 0 ? (
            <tr><td colSpan={6} className="px-6 py-20 text-center text-slate-500 italic">Chưa có dữ liệu.</td></tr>
          ) : (
            members.map((member) => (
              <tr key={member.id} onClick={() => onSelect(member)} className="hover:bg-blue-600/5 cursor-pointer transition-all group">
                <td className="px-6 py-4 text-xs font-mono opacity-50 dark:opacity-40">{member.id}</td>
                <td className="px-6 py-4"><span className="text-sm font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-slate-900 dark:text-white">{member.name}</span></td>
                <td className="px-6 py-4 text-xs font-medium">
                  <div className="text-slate-700 dark:text-slate-300 opacity-90">{member.birthYear || '?'}</div>
                  <div className="text-amber-700 dark:text-amber-500 font-bold">{member.deathDate ? `Giỗ: ${member.deathDate}` : ''}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-lg text-[9px] uppercase font-black tracking-widest border ${member.gender === 'Nam' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-500 border-blue-500/20' : 'bg-pink-500/10 text-pink-600 dark:text-pink-500 border-pink-500/20'}`}>{member.gender}</span>
                </td>
                <td className="px-6 py-4 text-sm opacity-90 text-slate-700 dark:text-slate-300">{member.rank || '—'}</td>
                <td className="px-6 py-4 text-sm opacity-80 italic text-slate-600 dark:text-slate-400">{member.spouse || '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
