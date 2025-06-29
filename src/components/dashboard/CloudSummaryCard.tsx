// src/components/dashboard/CloudSummaryCard.tsx
import { MoreHorizontal } from 'lucide-react';

type CloudSummaryCardProps = {
  name: string;
  files: number;
  usedGB: number;
  totalGB: number;
  logo: React.ReactNode;
  color: string;
};

export const CloudSummaryCard = ({ name, files, usedGB, totalGB, logo, color }: CloudSummaryCardProps) => {
    const percentage = (usedGB / totalGB) * 100;

    return (
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
                <div className="h-8 w-8">{logo}</div>
                <MoreHorizontal className="text-slate-400 cursor-pointer" />
            </div>
            <h4 className="font-semibold text-slate-800">{name}</h4>
            <p className="text-sm text-slate-500 mb-4">{files} Files</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2">
                <div className="h-1.5 rounded-full" style={{ width: `${percentage}%`, backgroundColor: color }}></div>
            </div>
            <p className="text-xs text-slate-500">{usedGB} GB / {totalGB} GB</p>
        </div>
    );
};