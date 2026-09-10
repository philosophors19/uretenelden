"use client";

import { ShoppingCart, Menu, X, RefreshCw, Cake } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { setShowCart, cart, setShowSubscriptionModal, subscriptions } = useCart();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: "Hakkında", href: "/#about" },
    { name: "Çiftlik & Abonelik", href: "/#subscription-section" },
    { name: "Butik Pastane", href: "/page/patisserie" },
    { name: "Tüm Ürünler", href: "/page/flowers" },
    { name: "İletişim", href: "/#contact" },
    { name: "Üretici Girişi", href: "/admin" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 
        ${isScrolled ? "backdrop-blur-xl bg-black/75 shadow-lg border-b border-white/10" : "bg-transparent"}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
        {/* 🔹 Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Logo"
            width={44}
            height={44}
            className="rounded-full object-cover border border-white/20"
          />
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-black text-white tracking-wide hover:text-[#FFA45B] transition leading-none">
              Üretenelden
            </span>
            <span className="text-[10px] text-gray-400 font-medium tracking-wider">
              Çiftlik & Butik Pastane
            </span>
          </div>
        </Link>

        {/* 🔹 Masaüstü Navigasyon */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[#FFA45B] transition py-1"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 🔹 Sağ Taraf - Abonelik Butonu + Sepet + Menü */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* 🔄 Aboneliklerim Butonu */}
          <button
            onClick={() => setShowSubscriptionModal(true)}
            className="relative bg-white/10 hover:bg-white/15 border border-white/15 text-white px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition shadow"
            title="Abonelik Yönetim Paneli"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#FFA45B]" />
            <span className="hidden sm:inline">Aboneliklerim</span>
            {subscriptions.length > 0 && (
              <span className="bg-emerald-500 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {subscriptions.length}
              </span>
            )}
          </button>

          {/* 🛒 Sepet Butonu */}
          <button
            onClick={() => setShowCart(true)}
            className="relative bg-[#FFA45B]/20 hover:bg-[#FFA45B]/30 text-white p-2.5 rounded-xl transition border border-[#FFA45B]/30"
            aria-label="Sepetim"
          >
            <ShoppingCart className="w-5 h-5 text-white" />
            {cart.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#26cc3c] text-white text-xs font-black rounded-full w-5 h-5 flex items-center justify-center shadow">
                {cart.length}
              </span>
            )}
          </button>

          {/* 🔹 Mobil Menü Butonu */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-white p-2 rounded-xl hover:bg-white/10 transition border border-white/10"
            aria-label="Menü"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobil Menü Açılır */}
      {menuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10 px-6 py-5">
          <nav className="flex flex-col space-y-3.5 text-base text-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="hover:text-[#FFA45B] transition py-1 border-b border-white/5 pb-2"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setMenuOpen(false);
                setShowSubscriptionModal(true);
              }}
              className="w-full text-left py-2 text-emerald-400 font-bold flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Abonelik Yönetim Paneli ({subscriptions.length})</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
