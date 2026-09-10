"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { 
  Sparkles, 
  ArrowRight, 
  Truck, 
  RefreshCw, 
  HeartHandshake, 
  Cake, 
  Wheat, 
  CheckCircle2, 
  Award 
} from "lucide-react";

export default function SplitHeroSection() {
  return (
    <section className="relative w-full py-16 px-4 sm:px-6 lg:px-12 bg-[#0c0c0c] overflow-hidden">
      {/* Arka plan dekoratif ambient ışıklar */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Üst Karşılama Başlığı */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#FFA45B] text-xs font-bold uppercase tracking-wider mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>İki Eşsiz Konsept • Tek Çatı Altında</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight"
          >
            Doğanın Saflığı & Pastacılık Sanatı
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-gray-300 mt-3"
          >
            Aracısız taze çiftlik mahsulleri ve usta şeflerimizin elinden çıkan butik pasta tasarımları arasından dilediğiniz lezzet dünyasını seçin.
          </motion.p>
        </div>

        {/* İkili Bölünmüş Kartlar (Split Showcase) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8 items-stretch">
          {/* SOL TARAF: DOĞAL ÇİFTLİK & TARLADAN SOFRAYA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative rounded-3xl overflow-hidden border border-amber-500/20 bg-gradient-to-b from-[#1b1712] to-[#12110e] flex flex-col justify-between shadow-2xl hover:border-amber-500/50 transition-all duration-500"
          >
            {/* Arka Plan Görseli & Gradyan */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <Image
                src="/farm2.jpg"
                alt="Doğal Çiftlik ve Tarladan Sofraya"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1b1712] via-[#1b1712]/50 to-transparent" />
              
              {/* Sol Üst Rozet */}
              <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-500/30 text-amber-300 text-xs font-bold">
                <Wheat className="w-4 h-4 text-[#FFA45B]" />
                <span>Tarladan Sofraya</span>
              </div>

              {/* İndirim Rozeti */}
              <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-emerald-600/90 text-white text-xs font-extrabold shadow-lg">
                Abonelikte %10 İndirim
              </div>
            </div>

            {/* İçerik Alanı */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-[#FFA45B] transition-colors">
                  Tarladan Kapınıza Doğallık
                </h3>
                <p className="text-sm text-gray-300 mt-2.5 leading-relaxed">
                  Giresun fındık bahçelerinden taze kavrulmuş fındıklar, günlük sağılan saf süt, serbest gezen tavuk yumurtaları ve taze meyveler; aracısız doğrudan üreticiden kapınıza gelir.
                </p>

                {/* Öne Çıkan Özellikler */}
                <div className="grid grid-cols-2 gap-3 mt-6 text-xs text-gray-300">
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Günlük Taze Süt & Yumurta</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <Truck className="w-4 h-4 text-[#FFA45B] flex-shrink-0" />
                    <span>Soğuk Zincir Kurye</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <RefreshCw className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Haftalık / Aylık Abonelik</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <HeartHandshake className="w-4 h-4 text-[#FFA45B] flex-shrink-0" />
                    <span>%100 Yerel Üretici</span>
                  </div>
                </div>
              </div>

              {/* Butonlar */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="#subscription-section"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#FFA45B] hover:bg-[#ff9447] text-black font-extrabold text-sm text-center shadow-lg shadow-amber-900/30 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Çiftlik & Abonelik Ürünleri</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/page/flowers"
                  className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs text-center border border-white/10 transition"
                >
                  Kataloğu Gez
                </Link>
              </div>
            </div>
          </motion.div>

          {/* SAĞ TARAF: BUTİK PASTANE & LEZZET ATÖLYESİ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative rounded-3xl overflow-hidden border border-rose-500/20 bg-gradient-to-b from-[#1c1417] to-[#120d10] flex flex-col justify-between shadow-2xl hover:border-rose-400/50 transition-all duration-500"
          >
            {/* Arka Plan Görseli & Gradyan */}
            <div className="relative h-64 sm:h-80 w-full overflow-hidden">
              <Image
                src="/flower-garden.jpg"
                alt="Butik Pastane ve Pasta Koleksiyonu"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1c1417] via-[#1c1417]/50 to-transparent" />
              
              {/* Sağ Üst Rozet */}
              <div className="absolute top-5 left-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-rose-500/30 text-rose-300 text-xs font-bold">
                <Cake className="w-4 h-4 text-rose-400" />
                <span>Butik Pastane & Atölye</span>
              </div>

              {/* Kişiye Özel Rozet */}
              <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-rose-600/90 text-white text-xs font-extrabold shadow-lg">
                Kişiye Özel Tasarım
              </div>
            </div>

            {/* İçerik Alanı */}
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white group-hover:text-rose-300 transition-colors">
                  Ustalık ve Zarafetin Buluşması
                </h3>
                <p className="text-sm text-gray-300 mt-2.5 leading-relaxed">
                  Pavlova, Rose Aura, San Sebastian ve özel tasarım kutlama pastaları. En seçkin Belçika çikolataları ve taze meyvelerle günlük olarak el emeğiyle üretilir.
                </p>

                {/* Öne Çıkan Özellikler */}
                <div className="grid grid-cols-2 gap-3 mt-6 text-xs text-gray-300">
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <Award className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>14 Özel Şef İmzalı Pasta</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>4&apos;lü/6&apos;lı Mix Lezzet Kutuları</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <Cake className="w-4 h-4 text-rose-400 flex-shrink-0" />
                    <span>Kişi Sayısı & Ebat Seçenekleri</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>Özel Gün & Doğum Günü Formu</span>
                  </div>
                </div>
              </div>

              {/* Butonlar */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="#patisserie-section"
                  className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-extrabold text-sm text-center shadow-lg shadow-rose-950/40 transition-transform active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <span>Pasta Koleksiyonlarını İncele</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/page/patisserie"
                  className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs text-center border border-white/10 transition"
                >
                  Özel Sipariş Formu
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
