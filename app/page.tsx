"use client";

import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import CatalogSection from "./components/CatalogSection";
import ContactSection from "./components/ContactSection";
import ProducerInvite from "./components/ProducerInvite";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="bg-[#F8F1E5] text-gray-900 font-sans">

      {/* Hero / Ana bölüm */}
      <HeroSection />

      {/* Hakkımızda */}
      <AboutSection />

      {/* Ürünlerimiz / Katalog */}
      <CatalogSection />
      
      {/* Hizmetlerimiz */}
      <ServicesSection />

      {/* İletişim */}
      <ContactSection />

      {/* Üretici davet bölümü */}
      <ProducerInvite />

      {/* Footer */}
      <Footer />
    </div>
  );
}
