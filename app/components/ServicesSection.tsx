"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Service {
  title: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    title: "Taze Fındık ve Kuruyemiş",
    description:
      "Karadeniz’in en kaliteli fındıklarını ve doğal kuruyemişleri doğrudan üreticiden sofranıza getiriyoruz.",
    image: "/arkaplan.jpg",
  },
  {
    title: "Günlük Süt ve Süt Ürünleri",
    description:
      "Katkısız, taptaze köy sütü, peynir ve yoğurdu hijyenik koşullarda size ulaştırıyoruz.",
    image: "/service-sut.jpg",
  },
  {
    title: "Doğal Sebze ve Meyve",
    description:
      "Mevsiminde toplanan, pestisitsiz ve doğal sebze meyvelerle sofralarınıza tazelik katın.",
    image: "/service-sebzemeyve.jpg",
  },
  {
    title: "Organik Yumurta",
    description:
      "Serbest gezen tavuklarımızdan her sabah toplanan doğal ve besleyici yumurtalar.",
    image: "/service-yumurta.jpg",
  },
  {
    title: "Haftalık Abonelik Kutusu",
    description:
      "Sebze, meyve ve süt ürünlerinden oluşan haftalık taze kutularla sağlıklı yaşamınıza katkı sağlıyoruz.",
    image: "/service-kutu.jpg",
  },
  {
    title: "Yerel Üretici İşbirliği",
    description:
      "Bölgedeki üreticilerle iş birliği yaparak tarladan sofraya aracısız tedarik sağlıyoruz.",
    image: "/service-ureticiler.jpg",
  },
  {
    title: "Çiftlik Ziyaret & Deneyim",
    description:
      "Ailenizle birlikte çiftliğimizi ziyaret ederek ürünlerimizi kaynağında deneyimleyin.",
    image: "/service-ciftlik.jpg",
  },
  {
    title: "Doğal Reçel & Katkısız Ürünler",
    description:
      "Kendi üretimimiz olan reçel, bal, zeytinyağı ve benzeri katkısız ürünleri güvenle tüketin.",
    image: "/service-recel.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-32 text-white px-6 lg:px-20 bg-gradient-to-b from-black/40 to-green-900/40 overflow-hidden"
    >
      {/* 🔹 Başlık */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-5xl font-bold text-center mb-20 text-[#FFA45B]"
      >
        Hizmetlerimiz
      </motion.h2>

      {/* 🔹 Hizmet Kartları Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="relative h-96 bg-white/10 backdrop-blur-md border border-white/20 
                       rounded-2xl shadow-lg overflow-hidden transition-all duration-300
                       hover:bg-white/20 hover:shadow-2xl"
          >
            {/* Arka Plan Görseli */}
            <div className="absolute inset-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover opacity-90"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* İçerik */}
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#FFA45B] mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-gray-300">{service.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
