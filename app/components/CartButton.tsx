// app/components/CartButton.tsx
"use client";

import React from "react";
import { useCart } from "../context/CartContext";

export  function CartButton() {
  const { cart, setShowCart } = useCart();

  return (
    <button
      onClick={() => setShowCart(true)}
      className="fixed top-6 right-6 z-50 flex items-center gap-3 px-4 py-2 bg-[#FFA45B] text-white rounded-2xl shadow-lg hover:scale-105 transition-transform"
      aria-label="Sepetim"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
        <path d="M6 6h15l-1.5 9h-12L6 6z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="10" cy="20" r="1" fill="currentColor" />
        <circle cx="18" cy="20" r="1" fill="currentColor" />
      </svg>
      <span className="font-semibold">Sepetim ({cart.length})</span>
    </button>
  );
}
