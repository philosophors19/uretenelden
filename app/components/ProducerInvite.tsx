"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Store, PackagePlus, TrendingUp } from "lucide-react";

export default function ProducerInvite() {
  return (
    <section
      id="producer"
      className="relative py-32 px-6 lg:px-20 bg-gradient-to-b from-[#1a1a1a] to-[#0d0d0d] text-white text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 p-12 shadow-2xl"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-[#FFA45B]">
          Üretici Ol, Kendi Ürünlerini Sat!
        </h2>

        <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-10 leading-relaxed">
          Kendi el emeğin, doğal ürünlerin ya da taze mahsullerin mi var?  
          <span className="text-[#FFA45B] font-semibold"> Fındık Diyarı </span> ailesine katılarak
          ürünlerini binlerce kişiye ulaştır. Stok, fiyat ve görselleri kolayca yönet.
        </p>

        {/* Avantajlar kutuları */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/40 border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <Store className="text-[#FFA45B] w-10 h-10 mb-3" />
            <h4 className="font-semibold text-lg mb-1">Kolay Yönetim</h4>
            <p className="text-gray-400 text-sm">Stok ve fiyatlarını anında düzenle.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/40 border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <PackagePlus className="text-[#FFA45B] w-10 h-10 mb-3" />
            <h4 className="font-semibold text-lg mb-1">Yeni Ürün Ekle</h4>
            <p className="text-gray-400 text-sm">Fotoğraf yükle, kategori seç ve satışa başla.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/40 border border-white/20 rounded-2xl p-6 flex flex-col items-center text-center"
          >
            <TrendingUp className="text-[#FFA45B] w-10 h-10 mb-3" />
            <h4 className="font-semibold text-lg mb-1">Kazancını Artır</h4>
            <p className="text-gray-400 text-sm">Satışlarını takip et, gelirini yönet.</p>
          </motion.div>
        </div>

        {/* CTA Butonu */}
        <motion.div whileHover={{ scale: 1.05 }}>
          <Link
            href="/admin"
            className="inline-block bg-[#FFA45B] text-black font-semibold text-lg px-8 py-3 rounded-xl shadow-md hover:bg-[#ff9447] transition-all"
          >
            Admin Paneline Git
          </Link>
        </motion.div>

        <p className="text-gray-500 text-sm mt-8">
          Sadece kayıtlı üreticiler ürün ekleyebilir.  
          Kayıt olmak için bizimle <a href="#contact" className="text-[#FFA45B] hover:underline">iletişime geçin</a>.
        </p>
      </motion.div>
    </section>
  );
}
