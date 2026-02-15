
export interface FamilyMember {
  id: string;
  name: string;
  birthYear: string;
  deathDate?: string; // Ngày mất / Giỗ
  parentId: string | null;
  spouse?: string;
  childrenIds?: string[];
  description?: string;
  gender: 'Nam' | 'Nữ';
  rank?: string; // Ví dụ: Con cả, Con thứ 2...
}

export type TabType = 'list' | 'tree' | 'history';
