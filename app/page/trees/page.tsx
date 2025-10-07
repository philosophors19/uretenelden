"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Item {
  name: string;
  image: string;
  info: string;
  price: string;
  latinName?: string;
}

interface Category {
  category: string;
  image: string;
  description: string;
  items: Item[];
}

const fruits: Category[] = [
  {
    category: "Süt Ürünleri",
    image: "/service-sut.jpg",
    description: "Taze ve sağlıklı süt ürünleri. Kahvaltılarınız veya yemekleriniz için farklı süt ürünleri seçenekleri sunuyoruz.",
    items: [
      { name: "Tam Yağlı Süt", image: "/service-sut.jpg", info: "Günlük taze tam yağlı süt. Kahvaltılarda ve yemek tariflerinde kullanılabilir.", price: "₺20/litre" },
      { name: "Yoğurt", image: "/service-sut.jpg", info: "Ev yapımı lezzetinde yoğurt. Probiyotik açısından zengindir.", price: "₺35/kg" },
      { name: "Beyaz Peynir", image: "/service-sut.jpg", info: "Tuzlu ve kremamsı dokusuyla kahvaltıların vazgeçilmezi beyaz peynir.", price: "₺60/kg" }
    ]
  },
  {
    category: "Yumurta Ürünleri",
    image: "/service-yumurta.jpg",
    description: "Taze ve doğal yumurtalar. Günlük tüketim veya tarifler için çeşitli yumurta seçenekleri sunuyoruz.",
    items: [
      { name: "Tavuk Yumurtası", image: "/service-yumurta.jpg", info: "Organik tavuk yumurtası. Taze ve doğal.", price: "₺3/adet" },
      { name: "Ördek Yumurtası", image: "/service-yumurta.jpg", info: "Daha yoğun ve lezzetli ördek yumurtası. Tariflerde farklılık sağlar.", price: "₺5/adet" },
      { name: "Bıldırcın Yumurtası", image: "/service-yumurta.jpg", info: "Küçük ve besleyici bıldırcın yumurtası. Kahvaltılara renk katar.", price: "₺1.5/adet" }
    ]
  }
];

export default function TreesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleCategoryClick = (categoryName: string) => {
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
      <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover z-0  blur-lg">
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
          <h2 className="relative text-5xl font-bold text-center mb-16 bg-cover bg-center py-24 text-white rounded-2xl overflow-hidden" style={{ backgroundImage: `url('/service-sut.jpg')` }}>
            <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
            <span className="relative z-2">Süt Ve Yumurta Ürünleri</span>
          </h2>

          <div className="relative z-10 max-w-6xl mx-auto space-y-24">
            {fruits.map((category, index) => (
              <div key={index}  className="mb-24">
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
                    {category.items.map((item, idx) => (
                      <div key={idx} className="relative w-full h-96 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl p-4 flex flex-col items-center overflow-hidden transition-transform duration-500 hover:scale-105">
                        <div className="relative w-full h-60 rounded-t-xl overflow-hidden shadow-lg border-b-4 border-white/30">
                          <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" className="transition-opacity duration-500 hover:opacity-100" unoptimized />
                        </div>
                        <div className="relative w-full flex flex-col items-center text-center p-4 bg-black/50 backdrop-blur-lg rounded-b-xl mt-4 shadow-lg">
                          <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
                          {item.latinName && <p className="mt-2 text-gray-300 text-sm">{item.latinName}</p>}
                          <p className="mt-2 text-gray-300 text-sm">{item.info}</p>
                          <p className="mt-2 text-lg font-bold text-[#FFA45B]">{item.price}</p>
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

      <footer className="py-10 bg-[#333] text-white text-center relative z-10">
        <p className="text-lg opacity-80">© 2025 Karcebal Peyzaj Mimarlık | Tüm Hakları Saklıdır</p>
      </footer>
    </div>
  );
}
