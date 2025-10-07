"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

const fruits = [
  {
    "category": "Meyveler",
    "image": "/catalog-sebzemeyve.jpg",
    "description": "Taze ve lezzetli meyveler. Kahvaltılar, tatlılar ve atıştırmalıklar için ideal seçenekler sunuyoruz.",
    "items": [
      { "name": "Elma", "image": "/catalog-sebzemeyve.jpg", "info": "Tatlı ve sulu elma çeşidi. Günlük tüketim için uygundur.", "price": "₺15/kg" },
      { "name": "Armut", "image": "/catalog-sebzemeyve.jpg", "info": "Yumuşak dokulu ve tatlı armut. Atıştırmalık veya tatlı yapımında idealdir.", "price": "₺18/kg" },
      { "name": "Muz", "image": "/catalog-sebzemeyve.jpg", "info": "Tropikal lezzetiyle vitamin deposu muz. Enerji verici bir meyvedir.", "price": "₺20/kg" },
      { "name": "Çilek", "image": "/catalog-sebzemeyve.jpg", "info": "Taze ve kırmızı çilekler. Smoothie ve tatlılar için mükemmel.", "price": "₺25/kg" },
      { "name": "Üzüm", "image": "/catalog-sebzemeyve.jpg", "info": "Sulu ve tatlı üzüm. Kahvaltı ve atıştırmalık olarak tüketilebilir.", "price": "₺22/kg" }
    ]
  },
  {
    "category": "Sebzeler",
    "image": "/catalog-sebzemeyve.jpg",
    "description": "Taze ve doğal sebzeler. Salatalar, yemekler ve sağlıklı tarifler için geniş seçenekler sunuyoruz.",
    "items": [
      { "name": "Domates", "image": "/catalog-sebzemeyve.jpg", "info": "Olgun ve sulu domatesler. Salata ve yemeklerde kullanılabilir.", "price": "₺12/kg" },
      { "name": "Salatalık", "image": "/catalog-sebzemeyve.jpg", "info": "Taze ve çıtır salatalık. Salatalar ve mezeler için idealdir.", "price": "₺10/kg" },
      { "name": "Biber", "image": "/catalog-sebzemeyve.jpg", "info": "Tatlı ve renkli biber çeşitleri. Yemek ve dolmalık olarak uygundur.", "price": "₺15/kg" },
      { "name": "Havuç", "image": "/catalog-sebzemeyve.jpg", "info": "Tatlı ve sağlıklı havuç. Atıştırmalık ve yemeklerde kullanılabilir.", "price": "₺8/kg" },
      { "name": "Patlıcan", "image": "/catalog-sebzemeyve.jpg", "info": "Lezzetli ve taze patlıcan. Kızartma ve yemeklerde mükemmeldir.", "price": "₺14/kg" }
    ]
  }
]

export default function FruitsPage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const categoryRefs = useRef({});

  const handleCategoryClick = (categoryName) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
    
    setTimeout(() => {
      categoryRefs.current[categoryName]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  return (
    <div className="bg-[#F8F1E5] text-gray-900 font-sans relative min-h-screen">
      <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover z-0 blur-lg">
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10">
        <header className="fixed top-0 left-0 w-full flex justify-center items-center p-6 text-white bg-black/30 backdrop-blur-lg z-50 transition-all">
          <nav>
            <ul className="flex gap-12 text-lg font-medium">
              <li><Link href="/" className="hover:text-[#FFA45B] transition">Ana Sayfa</Link></li>
              {fruits.map((category, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleCategoryClick(category.category)}
                    className="hover:text-[#FFA45B] transition"
                  >
                    {category.category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <section id="catalog" className="relative text-white py-40 px-6 lg:px-24">
          <h2 className="relative text-5xl font-bold text-center mb-16 bg-cover bg-center py-24 text-white rounded-2xl overflow-hidden" style={{ backgroundImage: `url('/catalog-sebzemeyve.jpg')` }}>
            <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
            <span className="relative z-2">Sebze Ve Meyveler</span>
          </h2>

          <div className="relative z-10 max-w-6xl mx-auto space-y-24">
            {fruits.map((category, index) => (
              <div key={index} ref={(el) => (categoryRefs.current[category.category] = el)} className="mb-24">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="cursor-pointer" onClick={() => handleCategoryClick(category.category)}>
                  <div className="grid md:grid-cols-2 gap-20 items-center mb-8">
                    <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.4 }} className="w-full h-[400px] relative">
                      <Image src={category.image} alt={category.category} layout="fill" objectFit="cover" className="rounded-lg shadow-xl w-full h-full object-cover border border-white/20" unoptimized />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="text-lg opacity-80 leading-relaxed">
                      <h3 className="text-5xl font-semibold mb-6">{category.category}</h3>
                      <p>{category.description}</p>
                    </motion.div>
                  </div>
                </motion.div>

                {activeCategory === category.category && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {category.items.map((fruit, idx) => (
                      <div key={idx} className="relative w-full h-96 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl p-4 flex flex-col items-center overflow-hidden transition-transform duration-500 hover:scale-105">
                        <div className="relative w-full h-60 rounded-t-xl overflow-hidden shadow-lg border-b-4 border-white/30">
                          <Image src={fruit.image} alt={fruit.name} layout="fill" objectFit="cover" className="transition-opacity duration-500 hover:opacity-100" unoptimized />
                        </div>
                        <div className="relative w-full flex flex-col items-center text-center p-4 bg-black/50 backdrop-blur-lg rounded-b-xl mt-4 shadow-lg">
                          <h3 className="text-2xl font-semibold text-white">{fruit.name}</h3>
                          <p className="mt-2 text-gray-300 text-sm">{fruit.latinName}</p>
                          <p className="mt-2 text-gray-300 text-sm">{fruit.info}</p>
                          <p className="mt-2 text-lg font-bold text-[#FFA45B]">{fruit.price}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        </section>


      </div>

      {/* Footer */}
      <footer className="py-10 bg-[#333] text-white text-center relative z-10">
        <p className="text-lg opacity-80">© 2025 Karcebal Peyzaj Mimarlık | Tüm Hakları Saklıdır</p>
      </footer>
    </div>
  );
}