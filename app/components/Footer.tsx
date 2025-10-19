"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black/40 backdrop-blur-xl border-t border-white/10 text-white pt-16 pb-8">
      {/* Üst kısım */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Logo ve açıklama */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center md:items-start text-center md:text-left"
        >
          <Image
            src="/logo.png"
            alt="Üretenelden Logo"
            width={70}
            height={70}
            className="mb-4 rounded-full"
            unoptimized
          />
          <h3 className="text-2xl font-bold text-[#FFA45B] mb-2">Üretenelden</h3>
          <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
            Yerel üreticilerden doğal, taze ve katkısız ürünleri doğrudan sofranıza getiriyoruz.
          </p>
        </motion.div>

        {/* Hızlı bağlantılar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h4 className="text-xl font-semibold mb-4 text-[#FFA45B]">Hızlı Bağlantılar</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="#about" className="hover:text-white transition">Hakkında</Link></li>
            <li><Link href="#services" className="hover:text-white transition">Hizmetler</Link></li>
            <li><Link href="#catalog" className="hover:text-white transition">Ürünlerimiz</Link></li>
            <li><Link href="#contact" className="hover:text-white transition">İletişim</Link></li>
            <li><Link href="/admin" className="hover:text-white transition">Üretici Paneli</Link></li>
          </ul>
        </motion.div>

        {/* İletişim */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h4 className="text-xl font-semibold mb-4 text-[#FFA45B]">İletişim</h4>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Phone size={18} /> +90 555 555 5555
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <Mail size={18} /> üretenelden@gmail.com
            </li>
            <li className="flex items-center justify-center md:justify-start gap-3">
              <MapPin size={18} /> Ordu, Türkiye
            </li>
          </ul>

          {/* Sosyal medya */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <Link href="https://instagram.com/uretenelden" target="_blank" className="hover:scale-110 transition">
              <Instagram size={22} className="text-[#FFA45B]" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Alt çizgi */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="border-t border-white/10 pt-6 text-center text-gray-400 text-sm"
      >
        © {new Date().getFullYear()} Üretenelden | Tüm Hakları Saklıdır
      </motion.div>
    </footer>
  );
}
