// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/utils/ScrollToTop'; // <-- 1. Impor komponen

import LandingPage from './pages/LandingPage';
import DocumentationPage from './pages/DocumentationPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop /> {/* <-- 2. Letakkan komponen di sini */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/documentation" element={<DocumentationPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;