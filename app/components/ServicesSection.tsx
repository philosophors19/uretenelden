"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Service {
  title: string;
  description: string;
  details: string;
  image: string;
}

const services: Service[] = [
  {
    title: "Taze Fındık ve Kuruyemiş",
    description:
      "Karadeniz’in en kaliteli fındıklarını ve doğal kuruyemişleri doğrudan üreticiden sofranıza getiriyoruz.",
    details:
      "Fındıklarımız ve diğer kuruyemişlerimiz, bölgedeki üreticilerden mevsiminde toplanarak doğal yöntemlerle kurutulur. Katkı maddesi, tuz veya kavurma yağı içermez. Enerji ve vitamin açısından zengindir. Özellikle kış aylarında bağışıklık sisteminizi güçlendirmek için idealdir.",
    image: "/arkaplan.jpg",
  },
  {
    title: "Günlük Süt ve Süt Ürünleri",
    description:
      "Katkısız, taptaze köy sütü, peynir ve yoğurdu hijyenik koşullarda size ulaştırıyoruz.",
    details:
      "Sabah erken saatlerde sağılan sütlerimiz aynı gün içinde şişelenir ve soğuk zincirle size ulaşır. Ürünlerimizde hiçbir koruyucu veya katkı maddesi kullanılmaz. Ayrıca tam yağlı köy peyniri, yoğurt ve tereyağı çeşitlerimiz de tamamen doğal yöntemlerle hazırlanır.",
    image: "/service-sut.jpg",
  },
  {
    title: "Doğal Sebze ve Meyve",
    description:
      "Mevsiminde toplanan, pestisitsiz ve doğal sebze meyvelerle sofralarınıza tazelik katın.",
    details:
      "Sebze ve meyvelerimiz tamamen doğal tarım uygulamalarıyla yetiştirilir. Her ürün mevsiminde, güneşin ve toprağın doğal döngüsüne uygun biçimde toplanır. Kimyasal gübre veya zirai ilaç kullanılmaz. Her lokmada doğanın saf tadını hissedeceksiniz.",
    image: "/service-sebzemeyve.jpg",
  },
  {
    title: "Organik Yumurta",
    description:
      "Serbest gezen tavuklarımızdan her sabah toplanan doğal ve besleyici yumurtalar.",
    details:
      "Tavuklarımız gün boyunca açık alanda gezer, doğal yemlerle beslenir. Yumurtalar sabah erken saatlerde toplanır ve aynı gün içinde paketlenir. Doğal beslenme sonucu, sarısı koyu ve lezzetlidir. Yüksek protein oranı sayesinde çocuklar için mükemmel bir besin kaynağıdır.",
    image: "/service-yumurta.jpg",
  },
  {
    title: "Haftalık Abonelik Kutusu",
    description:
      "Sebze, meyve ve süt ürünlerinden oluşan haftalık taze kutularla sağlıklı yaşamınıza katkı sağlıyoruz.",
    details:
      "Her hafta mevsimsel olarak değişen içerikte sebze, meyve, süt, yumurta ve peynir ürünlerinden oluşan özel kutular hazırlarız. İsterseniz yalnızca meyve, yalnızca sebze veya karışık kutu tercih edebilirsiniz. Her hafta kapınıza kadar teslim edilir.",
    image: "/service-kutu.jpg",
  },
  {
    title: "Yerel Üretici İşbirliği",
    description:
      "Bölgedeki üreticilerle iş birliği yaparak tarladan sofraya aracısız tedarik sağlıyoruz.",
    details:
      "ÜretenElden olarak, yöresel üreticilerle doğrudan çalışıyoruz. Böylece aracı maliyetleri ortadan kaldırarak hem üreticiyi destekliyor hem de tüketiciye uygun fiyatlı, doğal ürün sunuyoruz. Her üretici, kalite ve hijyen standartlarına göre özenle seçilir.",
    image: "/service-ureticiler.jpg",
  },
  {
    title: "Çiftlik Ziyaret & Deneyim",
    description:
      "Ailenizle birlikte çiftliğimizi ziyaret ederek ürünlerimizi kaynağında deneyimleyin.",
    details:
      "Ziyaretçilerimiz için özel çiftlik gezileri düzenliyoruz. Süt sağımını, yumurta toplama sürecini, sebze-meyve hasadını deneyimleyebilir ve doğal yaşamı yerinde gözlemleyebilirsiniz. Özellikle çocuklar için doğayla tanışma açısından unutulmaz bir deneyim sunuyoruz.",
    image: "/service-ciftlik.jpg",
  },
  {
    title: "Doğal Reçel & Katkısız Ürünler",
    description:
      "Kendi üretimimiz olan reçel, bal, zeytinyağı ve benzeri katkısız ürünleri güvenle tüketin.",
    details:
      "Ev yapımı reçellerimiz mevsim meyveleriyle, geleneksel yöntemlerle hazırlanır. Balımız doğal kovanlardan, zeytinyağımız soğuk sıkım yöntemle elde edilir. Hiçbir katkı maddesi veya rafine şeker içermez. Geleneksel lezzeti sofralarınıza taşır.",
    image: "/service-recel.jpg",
  },
];

export default function ServicesSection() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section
      id="services"
      className="relative py-32 text-white px-6 lg:px-20 bg-gradient-to-b from-black/40 to-green-900/40 overflow-hidden"
    >
      {/* 🔸 Başlık */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-5xl font-bold text-center mb-20 text-[#FFA45B]"
      >
        Hizmetlerimiz
      </motion.h2>

      {/* 🔸 Hizmet Kartları */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.button
            key={index}
            onClick={() => setSelectedService(service)}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="relative h-96 cursor-pointer bg-white/10 backdrop-blur-md border border-white/20 
                       rounded-2xl shadow-lg overflow-hidden transition-all duration-300
                       hover:bg-white/20 hover:shadow-2xl group"
          >
            <div className="absolute inset-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover opacity-90 group-hover:scale-110 transition-transform duration-500"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-end p-6 text-center">
              <h3 className="text-2xl font-semibold text-[#FFA45B] mb-3">
                {service.title}
              </h3>
              <p className="text-sm text-gray-300">{service.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* 🔸 Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-white/10 border border-white/20 backdrop-blur-2xl 
                         rounded-2xl p-8 w-[90%] max-w-2xl shadow-2xl text-center"
            >
              {/* Kapat Butonu */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-3 right-3 text-white/80 hover:text-[#FFA45B] transition text-2xl"
              >
                ✕
              </button>

              <Image
                src={selectedService.image}
                alt={selectedService.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover rounded-xl mb-6"
                unoptimized
              />

              <h3 className="text-3xl font-bold text-[#FFA45B] mb-3">
                {selectedService.title}
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                {selectedService.description}
              </p>
              <p className="text-gray-200 text-base leading-relaxed">
                {selectedService.details}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
