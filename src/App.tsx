// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignIn, SignUp } from '@clerk/clerk-react';
import ScrollToTop from './components/utils/ScrollToTop';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ManageFilesPage from './pages/ManageFilesPage';
// Impor halaman baru
import PrivateFilesPage from './pages/PrivateFilesPage';
import SharedFilesPage from './pages/SharedFilesPage';


export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/*" element={<div className="flex justify-center items-center min-h-screen bg-slate-100"><SignIn routing="path" path="/login" /></div>} />
        <Route path="/register/*" element={<div className="flex justify-center items-center min-h-screen bg-slate-100"><SignUp routing="path" path="/register" /></div>} />
        
        {/* Rute Privat yang Dilindungi */}
        <Route path="/dashboard" element={<SignedIn><DashboardPage /></SignedIn>} />
        <Route path="/dashboard/manage-files" element={<SignedIn><ManageFilesPage /></SignedIn>} />
        
        {/* RUTE BARU UNTUK PRIVATE DAN SHARED */}
        <Route path="/dashboard/private-files" element={<SignedIn><PrivateFilesPage /></SignedIn>} />
        <Route path="/dashboard/shared-files" element={<SignedIn><SharedFilesPage /></SignedIn>} />

      </Routes>
    </BrowserRouter>
  );
}