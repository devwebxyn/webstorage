// src/components/dashboard/ProjectCard.tsx
import { MoreHorizontal } from 'lucide-react';

type ProjectCardProps = {
  name: string;
  size: string;
  userCount: number;
  bgColor: string;
  avatarOffset: number;
};

export const ProjectCard = ({ name, size, userCount, bgColor, avatarOffset }: ProjectCardProps) => {
    const avatars = Array(4).fill(0).map((_, i) => `https://i.pravatar.cc/40?img=${i + avatarOffset}`);

    return (
        <div className={`p-4 rounded-xl flex items-center justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer ${bgColor}`}>
            <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                    {avatars.map((avatar, i) => <img key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={avatar} alt={`User ${i}`} />)}
                    {userCount > 4 && <div className="h-10 w-10 rounded-full bg-black/10 flex items-center justify-center text-black/50 font-semibold ring-2 ring-white">+{userCount - 4}</div>}
                </div>
                <div>
                    <h3 className="font-bold text-slate-800">{name}</h3>
                    <p className="text-sm text-slate-600">{size}</p>
                </div>
            </div>
            <button className="text-slate-500 hover:text-slate-800">
                <MoreHorizontal />
            </button>
        </div>
    );
};