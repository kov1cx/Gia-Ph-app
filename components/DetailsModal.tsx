
import React, { useState, useEffect } from 'react';
import { FamilyMember } from '../types';

interface DetailsModalProps {
  member: FamilyMember;
  members: FamilyMember[];
  onClose: () => void;
  onSave: (member: FamilyMember) => void;
  onDelete?: (id: string) => void;
  isNew?: boolean;
}

const DetailsModal: React.FC<DetailsModalProps> = ({ member, members, onClose, onSave, onDelete, isNew = false }) => {
  const [editMode, setEditMode] = useState(isNew);
  const [formData, setFormData] = useState<FamilyMember>({ ...member });

  useEffect(() => {
    setFormData({ ...member });
  }, [member]);

  const parent = members.find(m => String(m.id) === String(member.parentId));
  const children = members.filter(m => String(m.parentId) === String(member.id));

  const handleSave = () => {
    if (!formData.name) {
      alert("Vui lòng nhập tên thành viên!");
      return;
    }
    onSave(formData);
    setEditMode(false);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-colors duration-500" onClick={onClose}></div>
      <div className="relative w-full max-w-lg glass rounded-[3rem] overflow-hidden border border-amber-500/20 animate-in fade-in zoom-in duration-300 shadow-2xl bg-[#0a0a0c]/90">
        
        {/* Header Section */}
        <div className={`p-10 text-center bg-gradient-to-b ${formData.gender === 'Nam' ? 'from-amber-600/20' : 'from-orange-600/20'} to-transparent`}>
          {!isNew && !editMode && onDelete && (
            <button 
              onClick={() => onDelete(member.id)}
              className="absolute top-6 right-6 p-2 text-red-500/40 hover:text-red-500 transition-colors"
              title="Xóa thành viên"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          )}

          <div className={`w-24 h-24 mx-auto rounded-full glass border-2 mb-6 flex items-center justify-center shadow-2xl ${formData.gender === 'Nam' ? 'border-amber-500/40 text-amber-500' : 'border-orange-500/40 text-orange-500'}`}>
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>

          {editMode ? (
            <div className="space-y-4 max-w-sm mx-auto">
              <input 
                autoFocus
                className="bg-black/40 border border-amber-500/30 rounded-2xl px-5 py-3 text-lg w-full text-center text-white focus:outline-none focus:border-amber-500 shadow-inner placeholder:text-amber-900/20"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Họ và Tên"
              />
              <div className="flex bg-black/40 p-1 rounded-xl border border-amber-500/10">
                <button onClick={() => setFormData({...formData, gender: 'Nam'})} className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${formData.gender === 'Nam' ? 'bg-amber-600 text-white' : 'text-amber-900'}`}>Nam</button>
                <button onClick={() => setFormData({...formData, gender: 'Nữ'})} className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${formData.gender === 'Nữ' ? 'bg-orange-600 text-white' : 'text-amber-900'}`}>Nữ</button>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-3xl font-bold text-white tracking-tight">{member.name}</h3>
              <p className="text-amber-600/60 text-[10px] uppercase tracking-[0.3em] font-black mt-3">{member.rank || 'Di sản vĩnh hằng'}</p>
            </>
          )}
        </div>

        {/* Form Content */}
        <div className="px-10 pb-12 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-5 rounded-2xl border border-amber-500/10">
              <p className="text-[9px] uppercase font-black text-amber-900 mb-2 tracking-widest">Năm sinh</p>
              {editMode ? (
                <input 
                  className="bg-transparent border-b border-amber-500/20 w-full text-white text-lg focus:outline-none"
                  value={formData.birthYear}
                  onChange={e => setFormData({...formData, birthYear: e.target.value})}
                  placeholder="Ví dụ: 1990"
                />
              ) : (
                <p className="text-xl font-bold text-white">{member.birthYear || '—'}</p>
              )}
            </div>
            <div className="glass p-5 rounded-2xl border border-amber-500/10">
              <p className="text-[9px] uppercase font-black text-amber-900 mb-2 tracking-widest">Ngày mất / Giỗ</p>
              {editMode ? (
                <input 
                  className="bg-transparent border-b border-amber-500/20 w-full text-amber-500 text-lg focus:outline-none"
                  value={formData.deathDate}
                  onChange={e => setFormData({...formData, deathDate: e.target.value})}
                  placeholder="Ngày/tháng âm"
                />
              ) : (
                <p className="text-xl font-bold text-amber-500">{member.deathDate || '—'}</p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col gap-2">
              <p className="text-[9px] uppercase font-black text-amber-900 tracking-widest">Vợ / Chồng</p>
              {editMode ? (
                <input 
                  className="bg-black/20 border border-amber-500/10 rounded-xl px-4 py-3 text-sm w-full text-white focus:outline-none focus:border-amber-500/40"
                  value={formData.spouse}
                  onChange={e => setFormData({...formData, spouse: e.target.value})}
                  placeholder="Họ tên bạn đời"
                />
              ) : (
                <p className="text-amber-200 italic text-lg">{member.spouse || 'Đang cập nhật'}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[9px] uppercase font-black text-amber-900 tracking-widest">Thứ bậc / Ghi chú</p>
              {editMode ? (
                <input 
                  className="bg-black/20 border border-amber-500/10 rounded-xl px-4 py-3 text-sm w-full text-white focus:outline-none focus:border-amber-500/40"
                  value={formData.rank}
                  onChange={e => setFormData({...formData, rank: e.target.value})}
                  placeholder="Ví dụ: Con cả, Đời thứ 3..."
                />
              ) : (
                <p className="text-slate-300 text-sm leading-relaxed">{member.description || 'Không có ghi chú thêm.'}</p>
              )}
            </div>
            
            {!editMode && (
              <div className="flex flex-col gap-2">
                <p className="text-[9px] uppercase font-black text-amber-900 tracking-widest">Con cái ({children.length})</p>
                <div className="flex flex-wrap gap-2">
                  {children.length > 0 ? children.map(child => (
                    <span key={child.id} className="px-4 py-1.5 glass bg-amber-500/5 border border-amber-500/10 rounded-full text-[10px] text-amber-200 font-bold uppercase tracking-wider">
                      {child.name}
                    </span>
                  )) : <span className="text-amber-900 text-xs italic">Chưa ghi nhận hậu duệ.</span>}
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6">
            {editMode ? (
              <>
                <button onClick={handleSave} className="flex-1 py-4 bg-amber-700 hover:bg-amber-600 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-amber-900/20 active:scale-95 transition-all">Lưu thông tin</button>
                <button onClick={() => isNew ? onClose() : setEditMode(false)} className="px-8 py-4 glass border border-amber-500/20 text-amber-500 rounded-2xl text-xs uppercase font-black tracking-widest active:scale-95 transition-all">Hủy</button>
              </>
            ) : (
              <>
                <button onClick={onClose} className="flex-1 py-4 glass border border-amber-500/20 text-amber-500 hover:bg-amber-500/5 rounded-2xl text-xs uppercase font-black tracking-widest transition-all">Đóng</button>
                <button onClick={() => setEditMode(true)} className="px-10 py-4 bg-amber-900/40 text-amber-500 border border-amber-500/20 rounded-2xl text-xs uppercase font-black tracking-widest active:scale-95 transition-all">Sửa</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
