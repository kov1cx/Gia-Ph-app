
import React, { useState, useEffect } from 'react';
import { FamilyMember } from '../types';

interface DetailsModalProps {
  member: FamilyMember;
  members: FamilyMember[];
  onClose: () => void;
  onSave: (member: FamilyMember) => void;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ member, members, onClose, onSave }) => {
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<FamilyMember>({ ...member });

  useEffect(() => {
    setFormData({ ...member });
  }, [member]);

  const parent = members.find(m => m.id === member.parentId);
  const children = members.filter(m => String(m.parentId) === String(member.id));

  const handleSave = () => {
    onSave(formData);
    setEditMode(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative w-full max-w-lg glass rounded-3xl overflow-hidden border border-black/10 dark:border-white/20 animate-in fade-in zoom-in duration-300 shadow-2xl bg-white/90 dark:bg-slate-900/40">
        <div className={`p-8 text-center bg-gradient-to-b ${member.gender === 'Nam' ? 'from-blue-600/20' : 'from-pink-600/20'} to-transparent`}>
          <div className={`w-20 h-20 mx-auto rounded-full glass border-2 mb-4 flex items-center justify-center ${member.gender === 'Nam' ? 'border-blue-500/40 text-blue-500' : 'border-pink-500/40 text-pink-500'}`}>
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
          <h3 className="text-2xl font-bold text-inherit">{member.name}</h3>
          <div className="mt-2">
            {editMode ? (
              <input 
                className="bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded px-2 py-1 text-xs w-full text-center focus:outline-none"
                value={formData.rank}
                onChange={e => setFormData({...formData, rank: e.target.value})}
                placeholder="Nhập thứ bậc..."
              />
            ) : (
              <p className="text-slate-500 dark:text-slate-400 text-sm uppercase tracking-widest font-bold">{member.rank || 'Thành viên gia tộc'}</p>
            )}
          </div>
        </div>

        <div className="px-8 pb-10 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-4 rounded-xl border border-black/5 dark:border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Năm sinh</p>
              <p className="text-lg font-semibold text-inherit">{member.birthYear || '—'}</p>
            </div>
            <div className="glass p-4 rounded-xl border border-black/5 dark:border-white/10">
              <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Ngày mất / Giỗ</p>
              {editMode ? (
                <input 
                  className="bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded px-2 py-1 text-sm w-full text-amber-600 dark:text-amber-200 focus:outline-none"
                  value={formData.deathDate}
                  onChange={e => setFormData({...formData, deathDate: e.target.value})}
                />
              ) : (
                <p className="text-lg font-semibold text-amber-600 dark:text-amber-500">{member.deathDate || '—'}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Vợ / Chồng</p>
              {editMode ? (
                <input 
                  className="bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/20 rounded px-3 py-2 text-sm w-full focus:outline-none"
                  value={formData.spouse}
                  onChange={e => setFormData({...formData, spouse: e.target.value})}
                />
              ) : (
                <p className="dark:text-slate-200 text-slate-700 italic">{member.spouse || 'Chưa cập nhật'}</p>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Cha / Mẹ</p>
              <p className="dark:text-slate-300 text-slate-600 font-medium">{parent ? parent.name : 'Ông Tổ / Không rõ'}</p>
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Con cái ({children.length})</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {children.map(child => (
                  <span key={child.id} className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 rounded-full text-[10px] dark:text-slate-300 text-slate-600 font-medium">
                    {child.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            {editMode ? (
              <>
                <button onClick={handleSave} className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-95 transition-all">Lưu thay đổi</button>
                <button onClick={() => setEditMode(false)} className="px-6 py-3 glass border border-black/10 dark:border-white/10 dark:text-white text-slate-700 rounded-xl active:scale-95 transition-all">Hủy</button>
              </>
            ) : (
              <>
                <button onClick={onClose} className="flex-1 py-3 glass border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl font-semibold text-inherit transition-all">Đóng</button>
                <button onClick={() => setEditMode(true)} className="px-6 py-3 bg-slate-800 dark:bg-slate-700 text-white rounded-xl font-bold active:scale-95 transition-all">Sửa</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
