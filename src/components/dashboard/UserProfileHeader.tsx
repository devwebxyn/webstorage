// src/components/dashboard/UserProfileHeader.tsx
import { UserButton } from '@clerk/clerk-react';

export const UserProfileHeader = () => (
  <div className="flex items-center gap-4">
    <div className="hidden sm:block text-right">
      <p className="font-semibold text-slate-700 text-sm">Sabtu</p>
      <p className="text-xs text-gray-500">21 Agustus 2023</p>
    </div>
    <div className="h-10 w-px bg-gray-200"></div>
    <UserButton />
  </div>
);