// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SignedIn, SignIn, SignUp } from '@clerk/clerk-react';
import ScrollToTop from './components/utils/ScrollToTop';

import LandingPage from './pages/LandingPage';
import DocumentationPage from './pages/DocumentationPage';
import DashboardPage from './pages/DashboardPage';
import UploadPage from './pages/UploadPage'; // Halaman upload
import FilesOverviewPage from './pages/FilesOverviewPage'; // <-- Halaman baru

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Rute Publik */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
        
        {/* Rute untuk Autentikasi Clerk */}
        <Route 
          path="/login/*"
          element={
            <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4 py-8">
              <SignIn routing="path" path="/login" signUpUrl="/register" />
            </div>
          } 
        />
        <Route 
          path="/register/*"
          element={
            <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4 py-8">
              <SignUp routing="path" path="/register" signInUrl="/login" />
            </div>
          }
        />
        
        {/* Rute Privat yang Dilindungi */}
        <Route
          path="/dashboard"
          element={
            <SignedIn>
              <DashboardPage />
            </SignedIn>
          }
        />
        <Route
          path="/upload"
          element={
            <SignedIn>
              <UploadPage />
            </SignedIn>
          }
        />
        {/* Rute baru untuk daftar file */}
        <Route
          path="/files" // Anda bisa memilih path lain, misal /dashboard/files
          element={
            <SignedIn>
              <FilesOverviewPage />
            </SignedIn>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}