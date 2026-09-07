"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { db } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { Sparkles, ShoppingCart, Check, Tag } from "lucide-react";

interface CatalogItem {
  name: string;
  image: string;
  info: string;
  price: string;
  stock: number;
  category?: string;
  discountNote?: string;
}

const officialCategories = [
  {
    category: "Kavrulmuş Fındık Çeşitleri",
    description: "Taze ve çıtır kavrulmuş, eşsiz lezzette doğal Giresun fındığı.",
    link: "/page/flowers",
    items: [
      {
        name: "250g Kavrulmuş Fındık",
        image: "/hazelnut-main.jpg",
        info: "Giresun yöresine ait taze ve çıtır kavrulmuş 250 gram paket fındık.",
        price: "₺300",
        stock: 10,
      },
      {
        name: "500g Kavrulmuş Fındık",
        image: "/hazelnut-main.jpg",
        info: "Özel kavrulmuş, çıtır ve lezzetli 500 gram doğal fındık.",
        price: "₺550",
        stock: 10,
      },
      {
        name: "1 kg Kavrulmuş Fındık",
        image: "/hazelnut-main.jpg",
        info: "1 kg taze kavrulmuş doğal fındık. 1 kg ve üzeri alımlarda kilo fiyatı ₺950'dir.",
        price: "₺1.000",
        discountNote: "1 kg ve üzeri: ₺950/kg",
        stock: 10,
      },
    ],
  },
  {
    category: "Çiğ İç ve Kabuklu Fındık",
    description: "Katkısız, saf ve doğal besin deposu çiğ ve kabuklu fındık çeşitleri.",
    link: "/page/flowers",
    items: [
      {
        name: "250g Çiğ İç Fındık",
        image: "/hazelnut-main.jpg",
        info: "Doğal, katkısız ve taptaze 250 gram çiğ iç fındık.",
        price: "₺300",
        stock: 10,
      },
      {
        name: "500g Çiğ İç Fındık",
        image: "/hazelnut-main.jpg",
        info: "Giresun bahçelerinden özenle seçilmiş 500 gram doğal çiğ iç fındık.",
        price: "₺550",
        stock: 10,
      },
      {
        name: "1 kg Çiğ İç Fındık",
        image: "/hazelnut-main.jpg",
        info: "Katkısız, taze ve besleyici 1 kg doğal çiğ iç fındık.",
        price: "₺1.000",
        stock: 10,
      },
      {
        name: "1 kg Kabuklu Fındık",
        image: "/hazelnut-main.jpg",
        info: "Dalından taze toplanmış doğal ve iri taneli 1 kg kabuklu fındık.",
        price: "₺375",
        stock: 10,
      },
    ],
  },
  {
    category: "Doğal Fındık Ezmesi",
    description: "Yoğun fındık lezzeti, şekerli ve %100 şekersiz saf seçenekleriyle.",
    link: "/page/flowers",
    items: [
      {
        name: "325g Fındık Ezmesi (Şekerli)",
        image: "/hazelnut-paste-main.jpg",
        info: "Yoğun fındık oranıyla hazırlanan 325 gram tatlı ve lezzetli fındık ezmesi.",
        price: "₺400",
        stock: 10,
      },
      {
        name: "325g Fındık Ezmesi (Şekersiz)",
        image: "/hazelnut-paste-main.jpg",
        info: "Şeker ilavesiz, %100 saf ve katkısız 325 gram doğal fındık ezmesi.",
        price: "₺400",
        stock: 10,
      },
    ],
  },
];

export default function CatalogSection() {
  const { addToCart } = useCart();
  const [firestoreProducts, setFirestoreProducts] = useState<CatalogItem[]>([]);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  // 🔹 Firebase Firestore'dan yeni eklenen ürünleri gerçek zamanlı çek
  useEffect(() => {
    let unsubscribe = () => {};
    try {
      unsubscribe = onSnapshot(
        collection(db, "products"),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: CatalogItem[] = snapshot.docs.map((doc) => {
              const d = doc.data();
              return {
                name: d.name,
                image: d.image || "/hazelnut-main.jpg",
                info: d.info || "",
                price: d.price,
                stock: Number(d.stock) || 0,
                category: d.category,
              };
            });
            setFirestoreProducts(list);
          }
        },
        (err) => {
          console.warn("Catalog Firestore:", err.message);
        }
      );
    } catch (e) {}

    return () => unsubscribe();
  }, []);

  const handleAdd = (item: CatalogItem) => {
    addToCart({
      name: item.name,
      image: item.image,
      info: item.info,
      price: item.price,
      stock: item.stock,
    });
    setAddedItemName(item.name);
    setTimeout(() => {
      setAddedItemName((curr) => (curr === item.name ? null : curr));
    }, 1200);
  };

  return (
    <section
      id="catalog"
      className="relative py-28 text-white px-4 sm:px-6 lg:px-24 overflow-hidden bg-[#0f0f0f]"
    >
      <h2
        className="relative text-3xl sm:text-5xl font-bold text-center mb-16 sm:mb-24 bg-cover bg-center py-16 sm:py-24 text-white rounded-2xl overflow-hidden shadow-2xl"
        style={{ backgroundImage: `url('/catalog-sebzemeyve.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/60 rounded-2xl" />
        <span className="relative z-10">Ürünlerimiz & Fiyat Listesi</span>
      </h2>

      <div className="max-w-7xl mx-auto space-y-20 relative z-10">
        {/* 🔹 Özel Fırsat Duyurusu */}
        <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-[#FFA45B]/15 via-black/40 to-[#26cc3c]/15 border border-[#FFA45B]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFA45B]/20 flex items-center justify-center text-[#FFA45B] flex-shrink-0">
              <Tag className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">Toplu Alım İndirimi</h4>
              <p className="text-xs text-gray-300 mt-0.5">
                1 kg ve üzeri kavrulmuş fındık alımlarında özel indirimli fiyat: <strong className="text-[#FFA45B]">₺950/kg</strong>
              </p>
            </div>
          </div>
          <Link
            href="/page/flowers"
            className="px-5 py-2.5 rounded-xl bg-[#FFA45B] text-black text-xs font-bold hover:bg-[#ff9447] transition-all flex-shrink-0 shadow-lg"
          >
            Tüm Kataloğu İncele →
          </Link>
        </div>

        {/* 🔹 Üreticiden Eklenen Yeni Ürünler (Varsa) */}
        {firestoreProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="text-center">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFA45B]/15 border border-[#FFA45B]/30 text-[#FFA45B] text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Üreticilerden Yeni Mahsuller</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                Yeni Eklenen Ürünler
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {firestoreProducts.slice(0, 4).map((item, idx) => {
                const isJustAdded = addedItemName === item.name;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-[#FFA45B]/40 shadow-lg overflow-hidden transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full h-48 bg-black/40">
                        <img
                          src={item.image || "/hazelnut-main.jpg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                        {item.category && (
                          <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-[#FFA45B] text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
                            {item.category}
                          </span>
                        )}
                      </div>

                      <div className="p-4">
                        <h4 className="text-base sm:text-lg font-bold text-white">{item.name}</h4>
                        <p className="text-xs text-gray-300 mt-1 line-clamp-2">{item.info}</p>
                        <p className="text-[#FFA45B] font-extrabold text-lg mt-2">{item.price}</p>
                        <p className="text-gray-400 text-xs mt-0.5">Stok: {item.stock}</p>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        onClick={() => handleAdd(item)}
                        disabled={item.stock === 0}
                        className={`w-full py-2.5 px-3 font-semibold rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-1.5 ${
                          item.stock === 0
                            ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                            : isJustAdded
                            ? "bg-emerald-500 text-white"
                            : "bg-[#26cc3c] hover:bg-[#20a330] text-white"
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Eklendi ✓</span>
                          </>
                        ) : item.stock > 0 ? (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Sepete Ekle</span>
                          </>
                        ) : (
                          <span>Tükendi</span>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* 🔹 Resmi İşletme Kategorileri */}
        {officialCategories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Başlık */}
            <div className="text-center">
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-[#FFA45B]">
                {cat.category}
              </h3>
              <p className="text-gray-300 text-xs sm:text-sm max-w-2xl mx-auto">
                {cat.description}
              </p>
            </div>

            {/* Ürün Kartları */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cat.items.map((item: any, idx) => {
                const isJustAdded = addedItemName === item.name;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    className="relative bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-[#FFA45B]/40 shadow-lg overflow-hidden transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full h-48 bg-black/40">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover rounded-t-2xl"
                          unoptimized
                        />
                        <span className="absolute top-2.5 right-2.5 bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                          Stok: {item.stock}
                        </span>
                      </div>

                      <div className="p-4">
                        <h4 className="text-base sm:text-lg font-bold text-white">{item.name}</h4>
                        <p className="text-xs text-gray-300 mt-1 line-clamp-2">{item.info}</p>
                        
                        <div className="mt-2.5">
                          <p className="text-[#FFA45B] font-black text-xl">{item.price}</p>
                          {item.discountNote && (
                            <span className="inline-block text-[11px] text-emerald-400 font-semibold mt-0.5">
                              ✨ {item.discountNote}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0">
                      <button
                        onClick={() => handleAdd(item)}
                        disabled={item.stock === 0}
                        className={`w-full py-2.5 px-3 font-semibold rounded-xl text-xs transition-all duration-200 flex items-center justify-center gap-1.5 ${
                          item.stock === 0
                            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                            : isJustAdded
                            ? "bg-emerald-500 text-white"
                            : "bg-[#26cc3c] hover:bg-[#20a330] text-white shadow-lg"
                        }`}
                      >
                        {isJustAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                            <span>Eklendi ✓</span>
                          </>
                        ) : item.stock > 0 ? (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5" />
                            <span>Sepete Ekle</span>
                          </>
                        ) : (
                          <span>Stokta Yok</span>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Tüm Ürünler Kartı */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex flex-col justify-center items-center text-center bg-[#FFA45B]/10 border border-[#FFA45B]/30 rounded-2xl backdrop-blur-lg shadow-lg hover:bg-[#FFA45B]/20 transition-all p-6 min-h-[260px]"
              >
                <Link
                  href={cat.link}
                  className="w-full h-full flex flex-col justify-center items-center"
                >
                  <h4 className="text-lg sm:text-xl font-bold text-[#FFA45B] mb-2">
                    Tüm Ürünleri Gör
                  </h4>
                  <p className="text-gray-200 text-xs sm:text-sm">Kategori sayfasına git →</p>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
