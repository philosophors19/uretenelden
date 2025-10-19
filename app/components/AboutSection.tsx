"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative text-white py-40 px-6 lg:px-24 bg-gradient-to-b from-green-900/70 to-black/30 overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-5xl font-bold text-center mb-24 text-[#FFA45B]"
      >
        Biz Kimiz
      </motion.h2>

      <div className="max-w-6xl mx-auto space-y-32">
        {/* 🔹 BLOK 1: Tarladan Sofranıza */}
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative h-72 w-full"
          >
            <Image
              src="/farm1.jpg"
              alt="Doğal ürünler"
              fill
              className="rounded-2xl object-cover shadow-xl border border-white/20"
              unoptimized
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed opacity-90"
          >
            <h3 className="text-3xl font-semibold mb-6 text-[#FFA45B]">
              Tarladan Sofranıza
            </h3>
            <p>
              Üretenelden olarak yerel üreticilerle el ele veriyor,{" "}
              <strong>fındık, süt, yumurta, taze sebze ve meyveler</strong> gibi
              tamamen doğal ürünleri doğrudan tarladan sizlere ulaştırıyoruz.  
              Aracısız ve şeffaf üretim sürecimizle hem üreticiyi hem tüketiciyi koruyor,  
              sofralarınıza <span className="text-[#FF6F61] font-bold">güven ve lezzet</span> katıyoruz.
            </p>
          </motion.div>
        </div>

        {/* 🔹 BLOK 2: Doğallık ve Tazelik */}
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed opacity-90 order-2 md:order-1"
          >
            <h3 className="text-3xl font-semibold mb-6 text-[#FFA45B]">
              Doğallık ve Tazelik
            </h3>
            <p>
              Ürünlerimiz mevsiminde, katkısız ve taze olarak toplanır.  
              Güne yeni toplanmış sebzeler, dalından koparılmış meyveler ve  
              köy yumurtaları ile başlamanın keyfini sizlere sunuyoruz.  
              <strong> Tarıma saygı, doğaya sevgi</strong> anlayışımızla  
              sağlıklı beslenmenin en güvenilir adresiyiz.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative h-72 w-full order-1 md:order-2"
          >
            <Image
              src="/farm2.jpg"
              alt="Taze Ürünler"
              fill
              className="rounded-2xl object-cover shadow-xl border border-white/20"
              unoptimized
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
