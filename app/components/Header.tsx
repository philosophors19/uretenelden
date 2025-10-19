"use client";

import { ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setShowCart, cart } = useCart(); // 🛒 Sepet modal kontrolü

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: "Hakkında", href: "#about" },
    { name: "Hizmetler", href: "#services" },
    { name: "Ürünler", href: "#catalog" },
    { name: "İletişim", href: "#contact" },
    { name: "Üretici Girişi", href: "/admin" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 
        ${isScrolled ? "backdrop-blur-xl bg-black/60 shadow-lg" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* 🔹 Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <span className="text-2xl font-bold text-white tracking-wide hover:text-[#FFA45B] transition">
            Üretenelden
          </span>
        </Link>

        {/* 🔹 Masaüstü Navigasyon */}
        <nav className="hidden md:flex items-center gap-10 text-lg font-medium text-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[#FFA45B] transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 🔹 Sağ Taraf - Sepet + Menü */}
        <div className="flex items-center gap-4">
          {/* 🛒 Sepet Butonu (Modal açıyor, görünüm aynı kaldı) */}
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-[#FFA45B]/20 hover:bg-[#FFA45B]/30 text-white p-3 rounded-full transition"
          >
            <ShoppingCart className="w-6 h-6" />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#26cc3c] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>

          {/* 🔹 Mobil Menü Butonu */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
          >
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobil Menü Açılır */}
      {menuOpen && (
        <div className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10">
          <nav className="flex flex-col items-center p-6 space-y-4 text-lg text-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#FFA45B] transition"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
