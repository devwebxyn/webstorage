// src/assets/TechLogos.tsx
import React from 'react';

// SVG untuk GitHub (tetap sama)
export const GithubLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

// SVG SUPER AKURAT untuk Supabase
export const SupabaseLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 12"
      {...props}
    >
      <defs>
        <linearGradient id="supa-grad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#3ECF8E" />
          <stop offset="100%" stopColor="#3ECF8E" stopOpacity={0.6} />
        </linearGradient>
      </defs>
      <path fill="url(#supa-grad)" d="M15.2,1.2L24,6v5l-8.8,5L6.4,11V6l8.8-5Z" />
      <path fill="#3ECF8E" d="M8.8,10.8L0,6v1l8.8,5 8.8-5v-1L8.8,10.8Z" />
    </svg>
);

// SVG SUPER AKURAT untuk Docker
export const DockerLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg 
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 25.4 19.3"
      {...props}
    >
      <path fill="#1D63ED" d="M25.4,9.6c-0.1-2.1-1.9-4.2-4.6-4.2c-1.8,0-3.4,0.7-4.2,1.2V3.8c0-1-0.8-1.7-1.7-1.7c-1,0-1.7,0.8-1.7,1.7v0.9c-0.6-0.2-1.3-0.4-2-0.4c-1.8,0-3.4,0.7-4.2,1.2V3.8c0-1-0.8-1.7-1.7-1.7c-1,0-1.7,0.8-1.7,1.7v0.9c-0.6-0.2-1.3-0.4-2-0.4c-1.8,0-3.4,0.7-4.2,1.2V3.8c0-1-0.8-1.7-1.7-1.7C-0.1,2.1-0.1,3,0,3.9v1.1c0.1,0.2,0.1,0.3,0.2,0.5C0,5.7-0.1,6,0.1,6.2V7v0.9v1.6c0,2.3,4,4.2,8.9,4.2c4.9,0,8.9-1.9,8.9-4.2v-1.1c0-0.4-0.1-0.7-0.3-1c0.1-0.2,0.2-0.5,0.2-0.8v-1c0-0.6-0.5-1-1-1c-0.6,0-1,0.5-1,1v0.7c0,0.4,0.3,0.7,0.7,0.7c0.4,0,0.7-0.3,0.7-0.7v-0.5c-1.6,1-3.6,1.5-5.6,1.5c-4.9,0-8.9-1.9-8.9-4.2V9.6c0.1-1.2,1.2-2.3,3-2.3c0.8,0,1.5,0.3,2,0.7v1c0,0.4,0.3,0.7,0.7,0.7c0.4,0,0.7-0.3,0.7-0.7V8.1c-1.6,1-3.6,1.5-5.6,1.5c-2,0-3.9-0.5-5.6-1.5C3.5,7,5.5,6.5,7.5,6.5c2,0,3.9,0.5,5.6,1.5V7c0-0.6,0.5-1,1-1c0.6,0,1,0.5,1,1v1.1c1.6-1,3.6-1.5,5.6-1.5c2,0,3.9,0.5,5.6,1.5V9.6z" />
      <path fill="#00A0E2" d="M7.5,8.1c-2,0-3.9-0.5-5.6-1.5C3.5,7,5.5,6.5,7.5,6.5c2,0,3.9,0.5,5.6,1.5V7c0-0.6,0.5-1,1-1c0.6,0,1,0.5,1,1v1.1c1.6-1,3.6-1.5,5.6-1.5c2,0,3.9,0.5,5.6,1.5V7c0-0.6,0.5-1,1-1c0.6,0,1,0.5,1,1v2.6c-1.7,1-3.6,1.5-5.6,1.5s-3.9-0.5-5.6-1.5v1c0,0.4,0.3,0.7,0.7,0.7c0.4,0,0.7-0.3,0.7-0.7v-0.5c-1.6,1-3.6,1.5-5.6,1.5c-2,0-3.9-0.5-5.6-1.5v1.1c0,0.4,0.3,0.7,0.7,0.7c0.4,0,0.7-0.3,0.7-0.7v-0.5c-1.6,1-3.6,1.5-5.6,1.5c-2.3,0-4.4-0.6-6-1.7C2,12.3,3.7,13,5.5,13c2.7,0,5-1,6.8-2.1c1.8-1.1,3.2-2.6,3.2-4.3V5.5c0-0.6-0.5-1-1-1c-0.6,0-1,0.5-1,1v1.1C11.4,7.5,9.5,8.1,7.5,8.1z"/>
      <g fill="#1D63ED">
          <path d="M4.3,2.1h1.7v1.7H4.3V2.1z M6.9,2.1h1.7v1.7H6.9V2.1z M9.5,2.1h1.7v1.7H9.5V2.1z M12,2.1h1.7v1.7H12V2.1z M14.6,2.1h1.7v1.7h-1.7V2.1z"/>
          <path d="M4.3,4.7h1.7v1.7H4.3V4.7z M6.9,4.7h1.7v1.7H6.9V4.7z M9.5,4.7h1.7v1.7H9.5V4.7z M12,4.7h1.7v1.7H12V4.7z"/>
      </g>
    </svg>
);


// IKON BARU UNTUK MEGA
export const MegaLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h-3v10h3v-10zm4 0h-3v10h3v-10z" />
  </svg>
);

// IKON BARU UNTUK INTERNXT
export const InternxtLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
     <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4Z" />
  </svg>
);