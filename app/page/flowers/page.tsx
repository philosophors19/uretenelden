"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { 
  ShoppingCart, 
  Check, 
  SlidersHorizontal, 
  X, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Layers
} from "lucide-react";

interface Item {
  name: string;
  image: string;
  info: string;
  price: string;
  category: string;
  stock: number;
  quantity?: number;
}

const allItems: Item[] = [
  { 
    name: "250g Kavrulmuş Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Giresun yöresine ait taze ve çıtır kavrulmuş 250 gram paket fındık.", 
    price: "₺300", 
    category: "Kavrulmuş Fındık", 
    stock: 10 
  },
  { 
    name: "500g Kavrulmuş Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Özel kavrulmuş, çıtır ve lezzetli 500 gram doğal fındık.", 
    price: "₺550", 
    category: "Kavrulmuş Fındık", 
    stock: 10 
  },
  { 
    name: "1 kg Kavrulmuş Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "1 kg taze kavrulmuş doğal fındık. (1 kilo ve üzeri alımlarda kilo fiyatı ₺950'dir).", 
    price: "₺1.000", 
    category: "Kavrulmuş Fındık", 
    stock: 10 
  },
  { 
    name: "250g Çiğ İç Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Doğal, katkısız ve taptaze 250 gram çiğ iç fındık.", 
    price: "₺300", 
    category: "Çiğ İç Fındık", 
    stock: 10 
  },
  { 
    name: "500g Çiğ İç Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Giresun bahçelerinden özenle seçilmiş 500 gram doğal çiğ iç fındık.", 
    price: "₺500", 
    category: "Çiğ İç Fındık", 
    stock: 10 
  },
  { 
    name: "1 kg Çiğ İç Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Katkısız, taze ve besleyici 1 kg doğal çiğ iç fındık.", 
    price: "₺1.000", 
    category: "Çiğ İç Fındık", 
    stock: 10 
  },
  { 
    name: "1 kg Kabuklu Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Dalından taze toplanmış doğal ve iri taneli 1 kg kabuklu fındık.", 
    price: "₺375", 
    category: "Kabuklu Fındık", 
    stock: 10 
  },
  { 
    name: "325g Fındık Ezmesi (Şekerli)", 
    image: "/hazelnut-paste-main.jpg", 
    info: "Yoğun fındık oranıyla hazırlanan 325 gram tatlı ve lezzetli fındık ezmesi.", 
    price: "₺400", 
    category: "Fındık Ezmesi", 
    stock: 10 
  },
  { 
    name: "325g Fındık Ezmesi (Şekersiz)", 
    image: "/hazelnut-paste-main.jpg", 
    info: "Şeker ilavesiz, %100 saf ve katkısız 325 gram doğal fındık ezmesi.", 
    price: "₺400", 
    category: "Fındık Ezmesi", 
    stock: 10 
  },
];

const defaultCategories = [
  "Kavrulmuş Fındık", 
  "Çiğ İç Fındık", 
  "Kabuklu Fındık", 
  "Fındık Ezmesi"
];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [localProducts, setLocalProducts] = useState<Item[]>([]);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  // 🔹 Firestore ve localStorage'dan ürünleri al
  useEffect(() => {
    // 1. LocalStorage yedeğinden hızlı yükleme
    const saved = localStorage.getItem("products");
    if (saved) {
      try {
        setLocalProducts(JSON.parse(saved));
      } catch (error) {
        console.error("Ürün verisi çözümlenemedi:", error);
      }
    }

    // 2. Firebase Firestore gerçek zamanlı senkronizasyon (Tüm ziyaretçilere anında aktar)
    let unsubscribe = () => {};
    try {
      unsubscribe = onSnapshot(
        collection(db, "products"),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: Item[] = snapshot.docs.map((doc) => {
              const data = doc.data();
              return {
                name: data.name,
                image: data.image || "/hazelnut-main.jpg",
                info: data.info || "",
                price: data.price,
                category: data.category || "Fındık Ürünleri",
                stock: Number(data.stock) || 0,
              };
            });
            setLocalProducts(list);
            localStorage.setItem("products", JSON.stringify(list));
          }
        },
        (err) => {
          console.warn("Firestore dinleme uyarısı:", err.message);
        }
      );
    } catch (e) {
      console.warn("Firestore bağlantı hatası:", e);
    }

    return () => unsubscribe();
  }, []);

  // 🔹 admin panelinden gelen + statik ürünler birleştiriliyor
  const combinedItems = useMemo(() => {
    return [...allItems, ...localProducts];
  }, [localProducts]);

  // Dinamik kategoriler listesi
  const availableCategories = useMemo(() => {
    const cats = new Set<string>(defaultCategories);
    combinedItems.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, [combinedItems]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const clearCategories = () => {
    setSelectedCategories([]);
  };

  const filteredItems = useMemo(() => {
    if (selectedCategories.length === 0) return combinedItems;
    return combinedItems.filter((item) => selectedCategories.includes(item.category));
  }, [combinedItems, selectedCategories]);

  const handleAddToCart = (item: Item) => {
    addToCart({
      name: item.name,
      image: item.image,
      info: item.info,
      price: item.price,
      stock: item.stock,
    });

    // Anlık geri bildirim
    setAddedItemName(item.name);
    setTimeout(() => {
      setAddedItemName((current) => (current === item.name ? null : current));
    }, 1200);
  };

  return (
    <div className="bg-[#121212] min-h-screen relative font-sans text-white selection:bg-[#FFA45B]/30 selection:text-[#FFA45B]">
      {/* Arka plan video & overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-full object-cover z-0 blur-md opacity-40 pointer-events-none"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="fixed inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* 🔹 Breadcrumb Navigasyonu */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-[#FFA45B] transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <Link href="/#catalog" className="hover:text-[#FFA45B] transition-colors">
            Katalog
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-[#FFA45B] font-medium">Fındık ve Kuruyemiş</span>
        </nav>

        {/* 🔹 Hero / Başlık Bölümü */}
        <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-10 mb-8 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-[#FFA45B]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFA45B]/15 border border-[#FFA45B]/30 text-[#FFA45B] text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>%100 Doğal & Yöresel</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Fındık ve Kuruyemiş
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                Karadeniz'in bereketli topraklarından toplanan, taze kavrulmuş ve el emeğiyle hazırlanan doğal lezzetler.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-gray-200">
                <strong className="text-[#FFA45B] font-bold">{filteredItems.length}</strong> ürün listeleniyor
              </span>
            </div>
          </div>

          {/* 🔹 Mobil Kategori Butonları (Hızlı Kaydırılabilir Hap Menü) */}
          <div className="mt-6 pt-5 border-t border-white/10 lg:hidden">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#FFA45B]" />
                Kategoriler
              </span>
              {selectedCategories.length > 0 && (
                <button
                  onClick={clearCategories}
                  className="text-xs text-[#FFA45B] hover:underline flex items-center gap-1"
                >
                  <X className="w-3 h-3" /> Filtreyi Temizle
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none -mx-2 px-2">
              <button
                onClick={clearCategories}
                className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategories.length === 0
                    ? "bg-[#FFA45B] text-black font-semibold shadow-md shadow-[#FFA45B]/30"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
                }`}
              >
                Tümü ({combinedItems.length})
              </button>
              {availableCategories.map((cat, idx) => {
                const count = combinedItems.filter((i) => i.category === cat).length;
                const isSelected = selectedCategories.includes(cat);
                return (
                  <button
                    key={idx}
                    onClick={() => toggleCategory(cat)}
                    className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-[#FFA45B] text-black font-semibold shadow-md shadow-[#FFA45B]/30"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                        isSelected ? "bg-black/20 text-black" : "bg-white/10 text-gray-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 🔹 Ana Gövde (Sidebar & Ürün Izgarası) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* 🔹 Masaüstü Sidebar Filtre */}
          <aside className="hidden lg:block w-72 flex-shrink-0 bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-xl sticky top-24">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-white/10">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#FFA45B]" />
                Kategoriler
              </h3>
              {selectedCategories.length > 0 && (
                <button
                  onClick={clearCategories}
                  className="text-xs text-[#FFA45B] hover:underline"
                >
                  Sıfırla
                </button>
              )}
            </div>

            <div className="space-y-2">
              <label
                onClick={clearCategories}
                className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                  selectedCategories.length === 0
                    ? "bg-[#FFA45B]/15 text-[#FFA45B] font-semibold border border-[#FFA45B]/30"
                    : "hover:bg-white/5 text-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                      selectedCategories.length === 0
                        ? "bg-[#FFA45B] border-[#FFA45B] text-black"
                        : "border-white/30"
                    }`}
                  >
                    {selectedCategories.length === 0 && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                  <span className="text-sm">Tüm Ürünler</span>
                </div>
                <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                  {combinedItems.length}
                </span>
              </label>

              {availableCategories.map((cat, idx) => {
                const isSelected = selectedCategories.includes(cat);
                const count = combinedItems.filter((i) => i.category === cat).length;

                return (
                  <label
                    key={idx}
                    onClick={() => toggleCategory(cat)}
                    className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#FFA45B]/15 text-[#FFA45B] font-semibold border border-[#FFA45B]/30"
                        : "hover:bg-white/5 text-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center border text-[10px] ${
                          isSelected
                            ? "bg-[#FFA45B] border-[#FFA45B] text-black"
                            : "border-white/30"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <span className="text-sm">{cat}</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>

            {/* Yan Bilgi Kartları */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
              <div className="flex items-start gap-3 text-xs text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <Truck className="w-5 h-5 text-[#FFA45B] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Hızlı & Güvenli Teslimat</p>
                  <p className="text-gray-400 mt-0.5">Tazeliği bozulmadan kapınıza kadar ulaştırıyoruz.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-xs text-gray-300 bg-white/5 p-3 rounded-xl border border-white/5">
                <ShieldCheck className="w-5 h-5 text-[#26cc3c] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Doğallık Garantisi</p>
                  <p className="text-gray-400 mt-0.5">%100 katkısız ve yerli üretim fındık çeşitleri.</p>
                </div>
              </div>
            </div>
          </aside>

          {/* 🔹 Ürünler Izgarası */}
          <main className="flex-1 w-full">
            {filteredItems.length === 0 ? (
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FFA45B]/10 flex items-center justify-center mb-4 text-[#FFA45B]">
                  <SlidersHorizontal className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Ürün Bulunamadı</h3>
                <p className="text-gray-400 text-sm max-w-md mb-6">
                  Seçtiğiniz filtreleme kriterlerine uygun ürün bulunamadı. Lütfen filtrelerinizi sıfırlamayı deneyin.
                </p>
                <button
                  onClick={clearCategories}
                  className="px-6 py-2.5 bg-[#FFA45B] text-black font-semibold rounded-xl hover:bg-[#ff9542] transition-colors"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {filteredItems.map((item, idx) => {
                  const isJustAdded = addedItemName === item.name;

                  return (
                    <div
                      key={idx}
                      className="group bg-white/5 hover:bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-[#FFA45B]/40 p-4 flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1 relative"
                    >
                      <div>
                        {/* Ürün Görseli */}
                        <div className="relative w-full h-52 sm:h-56 rounded-xl overflow-hidden shadow-md bg-black/40">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                          {/* Kategori Etiketi */}
                          {item.category && (
                            <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 text-[#FFA45B] text-[11px] font-semibold px-2.5 py-1 rounded-full">
                              {item.category}
                            </span>
                          )}

                          {/* Stok Durumu Rozeti */}
                          <span
                            className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-md ${
                              item.stock > 5
                                ? "bg-emerald-500/80 text-white"
                                : item.stock > 0
                                ? "bg-amber-500/80 text-white"
                                : "bg-rose-500/80 text-white"
                            }`}
                          >
                            {item.stock > 5
                              ? "Stokta Var"
                              : item.stock > 0
                              ? `Son ${item.stock} Adet`
                              : "Tükendi"}
                          </span>
                        </div>

                        {/* Ürün Bilgileri */}
                        <div className="pt-4 px-1">
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-[#FFA45B] transition-colors leading-snug">
                            {item.name}
                          </h3>
                          <p className="mt-1.5 text-xs sm:text-sm text-gray-300 line-clamp-2 min-h-[36px]">
                            {item.info}
                          </p>
                        </div>
                      </div>

                      {/* Fiyat & Satın Al Butonu */}
                      <div className="pt-4 mt-3 border-t border-white/10 px-1">
                        <div className="flex items-baseline justify-between mb-3">
                          <span className="text-xs text-gray-400">Fiyat:</span>
                          <span className="text-xl sm:text-2xl font-black text-[#FFA45B]">
                            {item.price}
                          </span>
                        </div>

                        <button
                          disabled={item.stock <= 0}
                          onClick={() => handleAddToCart(item)}
                          className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
                            item.stock <= 0
                              ? "bg-white/10 text-gray-400 cursor-not-allowed border border-white/5"
                              : isJustAdded
                              ? "bg-emerald-500 text-white shadow-emerald-500/30 scale-[0.98]"
                              : "bg-[#26cc3c] hover:bg-[#20a330] text-white shadow-green-900/30 active:scale-[0.98]"
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-4 h-4 stroke-[3]" />
                              <span>Sepete Eklendi!</span>
                            </>
                          ) : item.stock > 0 ? (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              <span>Sepete Ekle</span>
                            </>
                          ) : (
                            <span>Stokta Yok</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
