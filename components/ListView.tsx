
import React from 'react';
import { FamilyMember } from '../types';

interface ListViewProps {
  members: FamilyMember[];
  onSelect: (member: FamilyMember) => void;
}

const ListView: React.FC<ListViewProps> = ({ members, onSelect }) => {
  return (
    <div className="overflow-x-auto glass rounded-3xl border border-white/10 shadow-2xl">
      <table className="w-full text-left border-collapse min-w-[900px]">
        <thead>
          <tr className="border-b border-white/10 bg-blue-600/5">
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Mã Số</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Họ và Tên</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Sinh / Mất</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Giới tính</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Thứ bậc</th>
            <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-slate-500">Vợ/Chồng</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {members.length === 0 ? (
            <tr><td colSpan={6} className="px-6 py-20 text-center text-slate-500 italic">Chưa có dữ liệu.</td></tr>
          ) : (
            members.map((member) => (
              <tr key={member.id} onClick={() => onSelect(member)} className="hover:bg-blue-600/5 cursor-pointer transition-all group">
                <td className="px-6 py-4 text-xs font-mono opacity-40">{member.id}</td>
                <td className="px-6 py-4"><span className="text-sm font-bold group-hover:text-blue-500 transition-colors dark:text-white text-slate-900">{member.name}</span></td>
                <td className="px-6 py-4 text-xs font-medium">
                  <div>{member.birthYear || '?'}</div>
                  <div className="text-amber-500 opacity-80">{member.deathDate ? `Giỗ: ${member.deathDate}` : ''}</div>
                </td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-3 py-1 rounded-lg text-[9px] uppercase font-black tracking-widest border ${member.gender === 'Nam' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-pink-500/10 text-pink-500 border-pink-500/20'}`}>{member.gender}</span>
                </td>
                <td className="px-6 py-4 text-sm opacity-80 dark:text-slate-300 text-slate-700">{member.rank || '—'}</td>
                <td className="px-6 py-4 text-sm opacity-60 italic dark:text-slate-400 text-slate-500">{member.spouse || '—'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
