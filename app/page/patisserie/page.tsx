"use client";

import PatisserieSection from "../../components/PatisserieSection";
import Footer from "../../components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PatisseriePage() {
  return (
    <div className="min-h-screen bg-[#110d10] text-white">
      {/* Üst Dönüş Butonu */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-gray-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Ana Sayfaya Dön</span>
        </Link>
      </div>

      <PatisserieSection />
      <Footer />
    </div>
  );
}
