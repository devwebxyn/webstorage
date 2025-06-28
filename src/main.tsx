// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // <--- Tambahkan .tsx di sini
import './index.css';
import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ClerkProvider
      publishableKey={PUBLISHABLE_KEY}
      appearance={{
        baseTheme: dark
      }}
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);