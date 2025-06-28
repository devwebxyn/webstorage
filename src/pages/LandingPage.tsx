// src/pages/LandingPage.tsx
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Hero } from '../sections/Hero';
import { Features } from '../sections/Features';
import { Integrations } from '../sections/Integrations';
import { Testimonials } from '../sections/Testimonials';
import { CTA } from '../sections/CTA';

export default function LandingPage() {
  return (
    <div className="bg-gray-950">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Integrations />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}