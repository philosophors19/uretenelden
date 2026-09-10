"use client";

import HeroSection from "./components/HeroSection";
import SplitHeroSection from "./components/SplitHeroSection";
import FarmSubscriptionSection from "./components/FarmSubscriptionSection";
import PatisserieSection from "./components/PatisserieSection";
import AboutSection from "./components/AboutSection";
import ServicesSection from "./components/ServicesSection";
import CatalogSection from "./components/CatalogSection";
import ContactSection from "./components/ContactSection";
import ProducerInvite from "./components/ProducerInvite";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <div className="bg-[#0e0e0e] text-gray-900 font-sans">
      {/* 1. Hero / Karşılama Bölümü */}
      <HeroSection />

      {/* 2. İkili Konsept Ayrımı (Split-Hero Gateway) */}
      <SplitHeroSection />

      {/* 3. Tarladan Sofraya Abonelik Modeli & Mix & Match Kutu */}
      <FarmSubscriptionSection />

      {/* 4. Butik Pastane & Lezzet Atölyesi (4 Hiyerarşi) */}
      <PatisserieSection />

      {/* 5. Ürünlerimiz / Genel Katalog */}
      <CatalogSection />

      {/* 6. Hakkımızda */}
      <AboutSection />
      
      {/* 7. Hizmetlerimiz */}
      <ServicesSection />

      {/* 8. İletişim */}
      <ContactSection />

      {/* 9. Üretici Davet Bölümü */}
      <ProducerInvite />

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
