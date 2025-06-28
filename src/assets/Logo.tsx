// src/assets/Logo.tsx
import React from 'react';
// Impor path ke file SVG sebagai sebuah string URL
import logoSrc from './logo.svg';

export const Logo: React.FC<{ className?: string }> = ({ className }) => {
  // Gunakan tag <img> biasa dan teruskan className ke sana
  return <img src={logoSrc} alt="CloudNest Logo" className={className} />;
};