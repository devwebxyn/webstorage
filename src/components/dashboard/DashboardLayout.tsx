// src/components/dashboard/DashboardLayout.tsx
import React from 'react';
import { SidebarMenu } from './SidebarMenu';
import { HeaderActionBar } from './HeaderActionBar';
import { UserProfileHeader } from './UserProfileHeader';

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex h-screen bg-slate-100 font-sans text-slate-800">
      <SidebarMenu />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex items-center justify-between p-6 border-b border-gray-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
          <HeaderActionBar />
          <UserProfileHeader />
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};