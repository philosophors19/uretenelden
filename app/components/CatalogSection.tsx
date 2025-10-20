"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CatalogSection() {
  const { addToCart } = useCart();

  const categories = [
    {
      category: "Fındık Ürünleri",
      description: "Doğal köy fındıklarımızdan üretilmiş çeşitli lezzetler.",
      link: "/page/flowers",
      items: [
        {
          name: "Kavrulmuş Fındık",
          image: "/hazelnut-main.jpg",
          info: "Doğal ve çıtır kavrulmuş fındık.",
          price: "₺180/kg",
          stock: 10,
        },
        {
          name: "Çiğ Fındık",
          image: "/hazelnut-main.jpg",
          info: "Katkısız ve doğal çiğ fındık.",
          price: "₺170/kg",
          stock: 5,
        },
        {
          name: "Tuzlu Fındık",
          image: "/hazelnut-main.jpg",
          info: "Hafif tuzlanmış kavrulmuş fındık.",
          price: "₺190/kg",
          stock: 8,
        },
        {
          name: "Ballı Kavrulmuş Fındık",
          image: "/hazelnut-snacks-main.jpg",
          info: "Bal ile tatlandırılmış kavrulmuş fındık.",
          price: "₺200/kg",
          stock: 9,
        },
      ],
    },
    {
      category: "Hediyelik Ürünler",
      description: "Sevdiklerinize doğal ve lezzetli hediyeler.",
      link: "/page/flowers",
      items: [
        {
          name: "250gr Fındık Ezmesi",
          image: "/hazelnut-paste-main.jpg",
          info: "Doğal fındık ezmesi.",
          price: "₺90/300g",
          stock: 12,
        },
        {
          name: "200gr Bal",
          image: "/hazelnut-paste-main.jpg",
          info: "Şeker ilavesiz fındık ezmesi.",
          price: "₺100/300g",
          stock: 7,
        },
        {
          name: "Kakaolu Fındık Ezmesi",
          image: "/hazelnut-paste-main.jpg",
          info: "Fındık ve kakao karışımı.",
          price: "₺110/300g",
          stock: 6,
        },
      ],
    },
  ];

  return (
     <section
      id="catalog"
      className="relative py-32 text-white px-6 lg:px-24 overflow-hidden bg-[#0f0f0f]"
    >
      <h2
        className="relative text-5xl font-bold text-center mb-24 bg-cover bg-center py-24 text-white rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundImage: `url('/catalog-sebzemeyve.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60 rounded-2xl" />
        <span className="relative z-10">Ürünlerimiz</span>
      </h2>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        {categories.map((cat: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Başlık */}
            <div className="text-center">
              <h3 className="text-4xl font-semibold mb-2 text-[#FFA45B]">{cat.category}</h3>
              <p className="text-gray-300 max-w-3xl mx-auto">{cat.description}</p>
            </div>

            {/* Ürün Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
              {cat.items.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg overflow-hidden transition-transform"
                >
                  <div className="relative w-full h-56">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-t-2xl"
                      unoptimized
                    />
                  </div>

                  <div className="p-4 text-center bg-black/40 rounded-b-2xl">
                    <h4 className="text-xl font-semibold">{item.name}</h4>
                    <p className="text-sm text-gray-300 mt-2">{item.info}</p>
                    <p className="text-[#FFA45B] font-bold mt-2">{item.price}</p>
                    <p className="text-gray-400 text-sm mt-1">Stok: {item.stock}</p>

                    <button
                      onClick={() =>
                        addToCart({
                          name: item.name,
                          image: item.image,
                          price: item.price,
                          stock: item.stock,
                          
                        })
                      }
                      className={`mt-4 px-6 py-2 font-semibold rounded-xl shadow-md transition-all duration-300 ${
                        item.stock > 0
                          ? "bg-[#26cc3c] hover:bg-[#20a330] text-white"
                          : "bg-gray-600 text-gray-300 cursor-not-allowed"
                      }`}
                      disabled={item.stock === 0}
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </motion.div>
              ))}

              {/* Tüm Ürünler Kartı */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col justify-center items-center text-center bg-[#FFA45B]/10 border border-[#FFA45B]/30 rounded-2xl backdrop-blur-lg shadow-lg hover:bg-[#FFA45B]/20 transition-all"
              >
                <Link
                  href={cat.link}
                  className="p-8 w-full h-full flex flex-col justify-center items-center"
                >
                  <h4 className="text-2xl font-semibold text-[#FFA45B] mb-2">
                    Tüm Ürünleri Gör
                  </h4>
                  <p className="text-gray-200 text-sm">Kategori sayfasına git →</p>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
