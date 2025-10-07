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
}

interface Category {
  category: string;
  image: string;
  description: string;
  items: Item[];
}

const flowers: Category[] = [
  {
    category: "Fındık Ürünleri",
    image: "/hazelnut-main.jpg",
    description: "Taze ve doğal fındık ürünleri. Kahvaltılarda, tatlılarda veya atıştırmalık olarak tüketebilirsiniz.",
    items: [
      { name: "Kavrulmuş Fındık", image: "/hazelnut-main.jpg", info: "Doğal ve çıtır kavrulmuş fındık. Enerji dolu atıştırmalık.", price: "₺180/kg" },
      { name: "Çiğ Fındık", image: "/hazelnut-main.jpg", info: "Katkısız ve doğal çiğ fındık. Sağlıklı beslenme için ideal.", price: "₺170/kg" },
      { name: "Tuzlu Fındık", image: "/hazelnut-main.jpg", info: "Kavrulmuş ve hafif tuzlanmış fındık. Çay ve kahve yanında mükemmel.", price: "₺190/kg" },
    ],
  },
  {
    category: "Hediyelik ürünler",
    image: "/hazelnut-paste-main.jpg",
    description: "Kahvaltılarınız için doğal ve katkısız fındık ezmeleri. Şekerli veya şekersiz seçenekleriyle sofranıza lezzet katar.",
    items: [
      { name: "250gr Fındık", image: "/hazelnut-paste-main.jpg", info: "Kavrulmuş fındıktan elde edilen doğal ezme.", price: "₺90/300g" },
      { name: "200gr Bal", image: "/hazelnut-paste-main.jpg", info: "Şeker ilavesiz, %100 fındık ezmesi. Sporcular için ideal.", price: "₺100/300g" },
      { name: "Kakaolu Fındık Ezmesi", image: "/hazelnut-paste-main.jpg", info: "Fındık ve kakao karışımıyla hazırlanan leziz ezme.", price: "₺110/300g" },
    ],
  },
  {
    category: "Fındıklı Atıştırmalıklar",
    image: "/hazelnut-snacks-main.jpg",
    description: "Fındıkla hazırlanan sağlıklı ve lezzetli atıştırmalık çeşitleri.",
    items: [
      { name: "Fındıklı Bar", image: "/hazelnut-snacks-main.jpg", info: "Enerji dolu fındıklı tahıl barı. Spor sonrası ideal.", price: "₺25/adet" },
      { name: "Çikolatalı Fındık Draje", image: "/hazelnut-snacks-main.jpg", info: "Fındık ve çikolatanın eşsiz uyumu.", price: "₺150/500g" },
      { name: "Ballı Kavrulmuş Fındık", image: "/hazelnut-snacks-main.jpg", info: "Doğal bal ile tatlandırılmış kavrulmuş fındık.", price: "₺200/kg" },
    ],
  },
  {
    category: "Doğal Tarım Ürünleri",
    image: "/natural-products-main.jpg",
    description: "Fındığın yanı sıra sofralık doğal tarım ürünleri.",
    items: [
      { name: "Ev Yapımı Pekmez", image: "/natural-products-main.jpg", info: "Doğal yöntemlerle hazırlanmış üzüm pekmezi.", price: "₺80/500g" },
      { name: "Köy Balı", image: "/natural-products-main.jpg", info: "Yayla çiçeklerinden elde edilen katkısız bal.", price: "₺180/850g" },
      { name: "Ceviz İçi", image: "/natural-products-main.jpg", info: "Kabuksuz doğal ceviz içi. Tatlılarda ve kahvaltıda ideal.", price: "₺200/kg" },
    ],
  },
];

export default function FlowersPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [cart, setCart] = useState<Item[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<string | null>(null);

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
    setTimeout(() => {
      categoryRefs.current[categoryName]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  const addToCart = (item: Item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^\d]/g, ""));
    return acc + price;
  }, 0);

  return (
    <div className="bg-[#F8F1E5] text-gray-900 font-sans relative min-h-screen">
      {/* Background video & overlay */}
      <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover z-0 blur-lg">
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full flex justify-between items-center p-6 text-white bg-black/30 backdrop-blur-lg z-50 transition-all">
          <nav>
            <ul className="flex gap-12 text-lg font-medium">
              <li>
                <Link href="/" className="hover:text-[#FFA45B] transition">
                  Ana Sayfa
                </Link>
              </li>
              {flowers.map((category, index) => (
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

          {/* Cart button */}
          <button
            onClick={() => setShowCart(true)}
            className="relative px-4 py-2 bg-[#FFA45B] text-white rounded-lg font-semibold"
          >
            Sepetim ({cart.length})
          </button>
        </header>

        {/* Catalog Section */}
        <section id="catalog" className="relative text-white py-40 px-6 lg:px-24">
          <h2
            className="relative text-5xl font-bold text-center mb-16 bg-cover bg-center py-24 text-white rounded-2xl overflow-hidden"
            style={{ backgroundImage: `url('/arkaplan.jpg')` }}
          >
            <div className="absolute inset-0 bg-black/50 rounded-2xl"></div>
            <span className="relative z-2">Fındık Ve Kuruyemiş</span>
          </h2>

          <div className="relative z-10 max-w-6xl mx-auto space-y-24">
            {flowers.map((category, index) => (
              <div
                key={index}
                className="mb-24"
              >
                {/* Category Header */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="cursor-pointer"
                  onClick={() => handleCategoryClick(category.category)}
                >
                  <div className="grid md:grid-cols-2 gap-20 items-center mb-8">
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 0.4 }}
                      className="w-full h-[400px] relative"
                    >
                      <Image
                        src={category.image}
                        alt={category.category}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg shadow-xl w-full h-full object-cover border border-white/20"
                        unoptimized
                      />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="text-lg opacity-80 leading-relaxed"
                    >
                      <h3 className="text-5xl font-semibold mb-6">{category.category}</h3>
                      <p>{category.description}</p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Category Items */}
                {activeCategory === category.category && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  >
                    {category.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="relative w-full h-96 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl p-4 flex flex-col items-center overflow-hidden transition-transform duration-500 hover:scale-105"
                      >
                        <div className="relative w-full h-60 rounded-t-xl overflow-hidden shadow-lg border-b-4 border-white/30">
                          <Image
                            src={item.image}
                            alt={item.name}
                            layout="fill"
                            objectFit="cover"
                            className="transition-opacity duration-500 hover:opacity-100"
                            unoptimized
                          />
                        </div>
                        <div className="relative w-full flex flex-col items-center text-center p-4 bg-black/50 backdrop-blur-lg rounded-b-xl mt-4 shadow-lg">
                          <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
                          <p className="mt-2 text-gray-300 text-sm">{item.info}</p>
                          <p className="mt-2 text-lg font-bold text-[#FFA45B]">{item.price}</p>
                          <button
                            onClick={() => addToCart(item)}
                            className="mt-4 px-6 py-2 bg-[#26cc3c] text-white font-semibold rounded-xl shadow-md hover:bg-[#20a330] transition-all duration-300"
                          >
                            Sepete Ekle
                          </button>
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

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 w-[500px] shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Sepetim ({cart.length})
            </h2>

            {cart.length === 0 ? (
              <p className="text-gray-600">Sepetiniz boş.</p>
            ) : (
              <div className="space-y-4">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-gray-100 rounded-lg p-3">
                    <span>{item.name}</span>
                    <span>{item.price}</span>
                    <button
                      onClick={() => removeFromCart(idx)}
                      className="text-red-500 text-sm"
                    >
                      Kaldır
                    </button>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Toplam:</span>
                  <span>₺{totalPrice}</span>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setShowCart(false)}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Kapat
              </button>
              {cart.length > 0 && (
                <button
                  onClick={() => setCheckoutStep("options")}
                  className="px-4 py-2 bg-[#26cc3c] text-white rounded hover:bg-[#20a330]"
                >
                  Satın Al
                </button>
              )}
            </div>

            {checkoutStep === "options" && (
              <div className="mt-6 space-y-4">
                <button className="w-full px-4 py-2 bg-[#FFA45B] text-white rounded-lg">Üye Ol</button>
                <button className="w-full px-4 py-2 bg-[#26cc3c] text-white rounded-lg">Üye Olmadan Devam Et</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-10 bg-[#333] text-white text-center relative z-10">
        <p className="text-lg opacity-80">© 2025 Üretenelden | Tüm Hakları Saklıdır</p>
      </footer>
    </div>
  );
}
