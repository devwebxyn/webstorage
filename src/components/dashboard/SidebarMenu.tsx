// src/components/dashboard/SidebarMenu.tsx
import { LayoutDashboard, FileText, Users, Star, Trash2, Settings, LogOut, Share2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';

// Ubah `navItems` untuk menyertakan Shared Files
const navItems = [
  { to: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/dashboard/private-files", icon: FileText, label: "Private Files" },
  { to: "/dashboard/shared-files", icon: Share2, label: "Shared Files" }, // <-- Tautan baru
  { to: "/dashboard/members", icon: Users, label: "Members" },
  { to: "/dashboard/favorite", icon: Star, label: "Favorite" },
  { to: "/dashboard/deleted-files", icon: Trash2, label: "Deleted Files" },
];

export const SidebarMenu = () => {
  const getNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors text-slate-600 hover:bg-slate-100 ${
      isActive ? 'bg-slate-100 text-slate-900 font-semibold' : ''
    }`;

  // ... (sisa kode komponen tetap sama) ...
  // ... (return statement dengan <aside>, <nav>, dll.) ...
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center gap-3 px-2 py-2 mb-6">
        <div className="bg-slate-900 text-white font-bold text-2xl rounded-lg h-12 w-12 flex items-center justify-center">C</div>
        <span className="text-slate-800 font-bold text-xl">CloudNest</span>
      </div>

      <nav className="flex flex-col gap-2 flex-grow">
        {navItems.map(item => (
          <NavLink key={item.label} to={item.to} className={getNavLinkClass}>
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="flex flex-col gap-2 border-t pt-4 border-gray-200">
         <NavLink to="/dashboard/settings" className={getNavLinkClass({ isActive: false })}>
            <Settings size={20} />
            <span>Settings</span>
        </NavLink>
        <button className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100">
            <LogOut size={20} />
            <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
};