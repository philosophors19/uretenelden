"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* 🔹 Arka Plan Video veya Görsel */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* 🔹 İçerik */}
      <motion.div
        className="relative z-10 text-center text-white px-6 max-w-3xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Doğallığın Kalbinden Sofranıza
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          Doğadan gelen katkısız lezzetlerle tanışın.  
          Taze, yerel ve güvenilir üreticilerden sofranıza doğrudan ulaşır.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <Link
            href="#catalog"
            className="px-8 py-4 bg-[#FFA45B] hover:bg-[#ff9447] text-black font-bold rounded-full shadow-xl backdrop-blur-md transition-transform hover:scale-105"
          >
            Ürünlerimizi Keşfet
          </Link>
        </motion.div>
      </motion.div>

      {/* 🔹 Alt Fade Efekti */}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent"></div>
    </section>
  );
}
