// src/components/dashboard/FolderCard.tsx
import { LucideProps } from 'lucide-react';

type FolderCardProps = {
  name: string;
  files: number;
  Icon: React.ElementType<LucideProps>;
  color: string;
};

export const FolderCard = ({ name, files, Icon, color }: FolderCardProps) => (
  <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
    <div className={`p-3 rounded-lg ${color}`}>
      <Icon size={28} />
    </div>
    <div>
      <h4 className="font-bold text-slate-800">{name}</h4>
      <p className="text-sm text-slate-500">{files} Files</p>
    </div>
  </div>
);