
import React from 'react';
import { FamilyMember } from '../types';

interface PrintTemplateProps {
  members: FamilyMember[];
  biography: string;
  customTitle: string;
}

const PrintTemplate: React.FC<PrintTemplateProps> = ({ members, biography, customTitle }) => {
  // Tìm các gia đình (những người có con)
  const familyHeads = members.filter(m => members.some(child => String(child.parentId) === String(m.id)));

  const getChildren = (id: string) => members.filter(m => String(m.parentId) === String(id));
  const getParent = (parentId: string | null) => members.find(m => String(m.id) === String(parentId));

  return (
    <div className="print-only print-container text-black bg-white">
      {/* TRANG 1: TRANG BÌA */}
      <div className="page-break flex flex-col items-center justify-center min-h-screen text-center border-[16px] border-double border-slate-200 m-4 p-20">
        <div className="mb-10 text-slate-400 font-bold tracking-[0.5em] uppercase text-sm">Cội Nguồn & Di Sản</div>
        <h1 className="text-6xl md:text-7xl font-display font-black uppercase mb-4 text-slate-900 leading-tight">
          {customTitle.split(' ').slice(0, 2).join(' ')} <br/>
          {customTitle.split(' ').slice(2).join(' ')}
        </h1>
        <div className="h-1 w-40 bg-slate-900 mb-8"></div>
        <h2 className="text-3xl font-display italic text-slate-700">Tài Liệu Hậu Duệ & Phả Hệ Chi Tiết</h2>
        <div className="mt-40 opacity-50 text-xs tracking-widest uppercase">
          Tài liệu lưu hành nội bộ <br/> Xuất bản năm {new Date().getFullYear()}
        </div>
      </div>

      {/* TRANG 2: TIỂU SỬ */}
      <div className="page-break p-10">
        <h2 className="text-3xl font-display font-bold border-b-2 border-slate-900 pb-4 mb-8 uppercase">I. Lời Tựa & Tiểu Sử</h2>
        <div className="text-lg leading-relaxed text-justify whitespace-pre-wrap font-serif italic">
          {biography || "Chưa có thông tin tiểu sử."}
        </div>
      </div>

      {/* TRANG 3: SƠ ĐỒ TỔNG QUÁT */}
      <div className="page-break p-10">
        <h2 className="text-3xl font-display font-bold border-b-2 border-slate-900 pb-4 mb-8 uppercase">II. Phả Đồ Tổng Quát</h2>
        <p className="text-sm text-slate-500 mb-10 italic">Dưới đây là danh sách toàn bộ thành viên được ghi nhận trong hệ thống.</p>
        <div className="grid grid-cols-2 gap-4">
          {members.map(m => (
            <div key={m.id} className="border-l-2 border-slate-200 pl-4 py-1">
              <span className="font-bold text-slate-900">{m.name}</span>
              <span className="text-xs text-slate-500 ml-2">({m.birthYear || '?'})</span>
              <div className="text-[10px] text-slate-400 uppercase tracking-tighter">
                {m.rank || 'Thành viên'} {m.spouse ? `• Bạn đời: ${m.spouse}` : ''}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* TRANG 4+: CHI TIẾT CÁC CHI TỘC / GIA ĐÌNH */}
      <div className="p-10">
        <h2 className="text-3xl font-display font-bold border-b-2 border-slate-900 pb-4 mb-10 uppercase">III. Chi Tiết Phả Hệ</h2>
        
        {familyHeads.map((head, idx) => {
          const children = getChildren(head.id);
          const parent = getParent(head.parentId);

          return (
            <div key={head.id} className="family-box bg-slate-50/50">
              <div className="flex justify-between items-start border-b border-slate-300 pb-4 mb-6">
                <div>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Đứng đầu chi gia đình</div>
                  <h3 className="text-2xl font-display font-bold text-slate-900">{head.name}</h3>
                  <p className="text-sm text-slate-600">{head.birthYear} {head.deathDate ? `(Mất: ${head.deathDate})` : ''}</p>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Đời thứ / Thứ bậc</div>
                  <div className="text-xl font-bold">{head.rank || '—'}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-[9px] font-black uppercase text-slate-500 mb-3 tracking-wider">Thông tin phối ngẫu</h4>
                  <p className="text-lg italic text-slate-800">{head.spouse || "—"}</p>
                  {parent && (
                    <div className="mt-4">
                      <h4 className="text-[9px] font-black uppercase text-slate-500 mb-1 tracking-wider">Huyết thống từ</h4>
                      <p className="text-sm font-medium">Con của cụ: {parent.name}</p>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="text-[9px] font-black uppercase text-slate-500 mb-3 tracking-wider">Hậu duệ trực hệ ({children.length})</h4>
                  <ul className="space-y-2">
                    {children.map(child => (
                      <li key={child.id} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-slate-900 rounded-full"></div>
                        <span className="text-sm font-bold">{child.name}</span>
                        <span className="text-[10px] text-slate-400">({child.birthYear || '?'})</span>
                      </li>
                    ))}
                    {children.length === 0 && <li className="text-sm italic text-slate-400">Chưa ghi nhận thông tin con cái.</li>}
                  </ul>
                </div>
              </div>
              
              {head.description && (
                <div className="mt-6 pt-4 border-t border-slate-200">
                  <h4 className="text-[9px] font-black uppercase text-slate-500 mb-2 tracking-wider">Ghi chú bổ sung</h4>
                  <p className="text-sm leading-relaxed text-slate-600">{head.description}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PrintTemplate;
