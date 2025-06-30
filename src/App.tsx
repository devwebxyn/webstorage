// src/App.tsx
import { useEffect } from 'react'; // 1. Impor useEffect
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignIn, SignUp, useAuth } from '@clerk/clerk-react';
import ScrollToTop from './components/utils/ScrollToTop';
import { setAuthTokenFunction } from './services/apiClient'; // 3. Impor fungsi dari apiClient

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import ManageFilesPage from './pages/ManageFilesPage';
import PrivateFilesPage from './pages/PrivateFilesPage';
import SharedFilesPage from './pages/SharedFilesPage';

export default function App() {
  // 4. Dapatkan fungsi getToken dari hook useAuth
  const { getToken } = useAuth();

  // 5. Gunakan useEffect untuk "memberikan" fungsi getToken ke apiClient
  // Ini akan berjalan sekali saat aplikasi dimuat dan memastikan
  // semua panggilan API setelah ini akan memiliki token autentikasi.
  useEffect(() => {
    if (getToken) {
      setAuthTokenFunction(getToken);
    }
  }, [getToken]);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Rute Publik (Tidak ada yang diubah di sini) */}
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login/*"
          element={
            <div className="flex justify-center items-center min-h-screen bg-slate-100">
              <SignIn routing="path" path="/login" />
            </div>
          }
        />
        <Route
          path="/register/*"
          element={
            <div className="flex justify-center items-center min-h-screen bg-slate-100">
              <SignUp routing="path" path="/register" />
            </div>
          }
        />

        {/* Rute Privat yang Dilindungi (Tidak ada yang diubah di sini) */}
        <Route path="/dashboard" element={<SignedIn><DashboardPage /></SignedIn>} />
        <Route path="/dashboard/manage-files" element={<SignedIn><ManageFilesPage /></SignedIn>} />
        
        {/* RUTE BARU UNTUK PRIVATE DAN SHARED (Tidak ada yang diubah di sini) */}
        <Route path="/dashboard/private-files" element={<SignedIn><PrivateFilesPage /></SignedIn>} />
        <Route path="/dashboard/shared-files" element={<SignedIn><SharedFilesPage /></SignedIn>} />
      </Routes>
    </BrowserRouter>
  );
}