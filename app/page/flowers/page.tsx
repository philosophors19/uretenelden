"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";
import { db } from "../../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { 
  ShoppingCart, 
  Check, 
  SlidersHorizontal, 
  X, 
  ChevronRight, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Layers,
  Cake,
  Wheat,
  RefreshCw
} from "lucide-react";

interface Item {
  name: string;
  image: string;
  info: string;
  price: string;
  category: string;
  concept?: "farm" | "bakery" | "subscription";
  stock: number;
  quantity?: number;
}

const allItems: Item[] = [
  // --- DOĞAL ÇİFTLİK VE FINDIK ÜRÜNLERİ ---
  { 
    name: "250g Kavrulmuş Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Giresun yöresine ait taze ve çıtır kavrulmuş 250 gram paket fındık.", 
    price: "₺300", 
    category: "Kavrulmuş Fındık",
    concept: "farm",
    stock: 10 
  },
  { 
    name: "500g Kavrulmuş Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Özel kavrulmuş, çıtır ve lezzetli 500 gram doğal fındık.", 
    price: "₺550", 
    category: "Kavrulmuş Fındık",
    concept: "farm",
    stock: 10 
  },
  { 
    name: "1 kg Kavrulmuş Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "1 kg taze kavrulmuş doğal fındık. (1 kilo ve üzeri alımlarda kilo fiyatı ₺950'dir).", 
    price: "₺1.000", 
    category: "Kavrulmuş Fındık",
    concept: "farm",
    stock: 10 
  },
  { 
    name: "250g Çiğ İç Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Doğal, katkısız ve taptaze 250 gram çiğ iç fındık.", 
    price: "₺300", 
    category: "Çiğ İç Fındık",
    concept: "farm",
    stock: 10 
  },
  { 
    name: "500g Çiğ İç Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Giresun bahçelerinden özenle seçilmiş 500 gram doğal çiğ iç fındık.", 
    price: "₺500", 
    category: "Çiğ İç Fındık",
    concept: "farm",
    stock: 10 
  },
  { 
    name: "1 kg Çiğ İç Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Katkısız, taze ve besleyici 1 kg doğal çiğ iç fındık.", 
    price: "₺1.000", 
    category: "Çiğ İç Fındık",
    concept: "farm",
    stock: 10 
  },
  { 
    name: "1 kg Kabuklu Fındık", 
    image: "/hazelnut-main.jpg", 
    info: "Dalından taze toplanmış doğal ve iri taneli 1 kg kabuklu fındık.", 
    price: "₺375", 
    category: "Kabuklu Fındık",
    concept: "farm",
    stock: 10 
  },
  { 
    name: "325g Fındık Ezmesi (Şekerli)", 
    image: "/hazelnut-paste-main.jpg", 
    info: "Yoğun fındık oranıyla hazırlanan 325 gram tatlı ve lezzetli fındık ezmesi.", 
    price: "₺400", 
    category: "Fındık Ezmesi",
    concept: "farm",
    stock: 10 
  },
  { 
    name: "325g Fındık Ezmesi (Şekersiz)", 
    image: "/hazelnut-paste-main.jpg", 
    info: "Şeker ilavesiz, %100 saf ve katkısız 325 gram doğal fındık ezmesi.", 
    price: "₺400", 
    category: "Fındık Ezmesi",
    concept: "farm",
    stock: 10 
  },

  // --- ABONELİK KUTULARI ---
  {
    name: "Haftalık Temel Çiftlik Sepeti",
    image: "/service-sut.jpg",
    info: "3 Litre Günlük Çiftlik Sütü + 15'li Serbest Gezen Yumurta. Soğuk zincir teslimat.",
    price: "₺250",
    category: "Abonelik Paketleri",
    concept: "subscription",
    stock: 30,
  },
  {
    name: "Büyük Aile Kahvaltı & Meyve Kutusu",
    image: "/service-kutu.jpg",
    info: "5L Günlük Süt, 30'lu Yumurta, 2.5kg Taze Meyve, 500g Köy Peyniri.",
    price: "₺550",
    category: "Abonelik Paketleri",
    concept: "subscription",
    stock: 20,
  },
  {
    name: "Enerji & Fındık Destek Paketi",
    image: "/hazelnut-main.jpg",
    info: "500g Kavrulmuş Fındık, 325g Fındık Ezmesi, 2L Günlük Süt, 15'li Yumurta.",
    price: "₺675",
    category: "Abonelik Paketleri",
    concept: "subscription",
    stock: 20,
  },

  // --- BUTİK PASTANE - LEZZET KUTULARI ---
  {
    name: "Tiramisu",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
    info: "İtalyan mascarpone kreması ve taze demlenmiş espresso aromasıyla.",
    price: "₺180",
    category: "Lezzet Kutuları",
    concept: "bakery",
    stock: 25,
  },
  {
    name: "Profiterol",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
    info: "Özel pastacı kreması dolgulu şu hamurları ve akışkan Belçika çikolatası sosu.",
    price: "₺170",
    category: "Lezzet Kutuları",
    concept: "bakery",
    stock: 25,
  },
  {
    name: "Fıstıklı Cheesecake",
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    info: "Yoğun Antep fıstığı ezmesi ve kadifemsi peynir dolgulu imza lezzet.",
    price: "₺220",
    category: "Lezzet Kutuları",
    concept: "bakery",
    stock: 20,
  },
  {
    name: "Çilekli Magnolia",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    info: "Hafif vanilyalı ipeksi krema, bisküvi kırıntıları ve taze çilek dilimleri.",
    price: "₺160",
    category: "Lezzet Kutuları",
    concept: "bakery",
    stock: 25,
  },
  {
    name: "Mousse Chocolate",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    info: "%70 bitter Belçika çikolatasıyla hazırlanan havadar yoğun mus.",
    price: "₺190",
    category: "Lezzet Kutuları",
    concept: "bakery",
    stock: 20,
  },
  {
    name: "Orman Meyveli Cheesecake",
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=600&q=80",
    info: "Frambuaz, böğürtlen ve yaban mersini soslu fırınlanmış New York usulü.",
    price: "₺210",
    category: "Lezzet Kutuları",
    concept: "bakery",
    stock: 20,
  },

  // --- BUTİK PASTANE - 14 ÖZEL PASTA ---
  {
    name: "Pavlova",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
    info: "Antep fıstığı ile zenginleştirilmiş hafif ve çıtır beze, seçkin orman meyveleri.",
    price: "₺650",
    category: "Pasta Koleksiyonu",
    concept: "bakery",
    stock: 15,
  },
  {
    name: "Rose Aura",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    info: "Yumuşacık böğürtlen ve frambuazlı sponge kekin, yoğun çikolatalı mousse ile buluşması.",
    price: "₺700",
    category: "Pasta Koleksiyonu",
    concept: "bakery",
    stock: 15,
  },
  {
    name: "Prenses",
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80",
    info: "Çilek, frambuaz, yaban mersini aromasıyla harmanlaşmış hindistan cevizli kek, prenses kreması.",
    price: "₺680",
    category: "Pasta Koleksiyonu",
    concept: "bakery",
    stock: 15,
  },
  {
    name: "Bianca",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80",
    info: "Bademin lezzetiyle zenginleşen beyaz sponge kek, prenses ve pastacı kreması, frambuaz.",
    price: "₺690",
    category: "Pasta Koleksiyonu",
    concept: "bakery",
    stock: 15,
  },
  {
    name: "Festival",
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80",
    info: "Karamel sosla kaplanan böğürtlen ve frambuazlı sponge kek, çikolatalı mousse ve krep kırığı.",
    price: "₺720",
    category: "Pasta Koleksiyonu",
    concept: "bakery",
    stock: 15,
  },
  {
    name: "Lotus",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
    info: "Lotusun karamelize lezzetiyle buluşan beyaz sponge kek, çilek ve lotus kırıntıları.",
    price: "₺700",
    category: "Pasta Koleksiyonu",
    concept: "bakery",
    stock: 15,
  },
  {
    name: "San Sebastian",
    image: "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?auto=format&fit=crop&w=600&q=80",
    info: "Karamelize yanık üst kabuk ve ortası kremsi akışkan orijinal Bask lezzeti.",
    price: "₺640",
    category: "Cheesecake Koleksiyonu",
    concept: "bakery",
    stock: 15,
  },
];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [selectedConcept, setSelectedConcept] = useState<"all" | "farm" | "bakery" | "subscription">("all");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [localProducts, setLocalProducts] = useState<Item[]>([]);
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  // Firestore ve localStorage senkronizasyonu
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      try {
        setLocalProducts(JSON.parse(saved));
      } catch (error) {
        console.error("Ürün verisi çözümlenemedi:", error);
      }
    }

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
                concept: "farm",
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

  const combinedItems = useMemo(() => {
    return [...allItems, ...localProducts];
  }, [localProducts]);

  // Konsepte göre filtrelenmiş ürün havuzu
  const conceptItems = useMemo(() => {
    if (selectedConcept === "all") return combinedItems;
    return combinedItems.filter((i) => i.concept === selectedConcept);
  }, [combinedItems, selectedConcept]);

  // Dinamik kategoriler listesi
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    conceptItems.forEach((item) => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, [conceptItems]);

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
    if (selectedCategories.length === 0) return conceptItems;
    return conceptItems.filter((item) => selectedCategories.includes(item.category));
  }, [conceptItems, selectedCategories]);

  const handleAddToCart = (item: Item) => {
    addToCart({
      name: item.name,
      image: item.image,
      info: item.info,
      price: item.price,
      stock: item.stock,
      coldChainRequired: item.concept === "bakery" || item.concept === "subscription",
    });

    setAddedItemName(item.name);
    setTimeout(() => {
      setAddedItemName((current) => (current === item.name ? null : current));
    }, 1200);
  };

  return (
    <div className="bg-[#0e0e0e] min-h-screen relative font-sans text-white selection:bg-[#FFA45B]/30 selection:text-[#FFA45B]">
      {/* Arka plan parlama efektleri */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* 🔹 Breadcrumb Navigasyonu */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-[#FFA45B] transition-colors">
            Ana Sayfa
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-[#FFA45B] font-medium">Tüm Ürünler Kataloğu</span>
        </nav>

        {/* 🔹 Hero / Başlık Bölümü */}
        <div className="relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 p-6 sm:p-10 mb-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFA45B]/15 border border-[#FFA45B]/30 text-[#FFA45B] text-xs font-semibold mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Üretenelden Lezzet Kataloğu</span>
              </div>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
                Ürünlerimiz & Koleksiyonlar
              </h1>
              <p className="mt-2 text-sm sm:text-base text-gray-300 max-w-2xl leading-relaxed">
                Tarladan sofraya taze çiftlik mahsulleri, periyodik abonelik kutuları ve usta şeflerimizin butik pasta tasarımları.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-xs sm:text-sm font-medium text-gray-200">
                <strong className="text-[#FFA45B] font-bold">{filteredItems.length}</strong> ürün listeleniyor
              </span>
            </div>
          </div>

          {/* 🔹 ÜST KONSEPT SEKMELERİ (TABS) */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                setSelectedConcept("all");
                clearCategories();
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                selectedConcept === "all"
                  ? "bg-white text-black shadow-lg"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Tüm Ürünler ({combinedItems.length})</span>
            </button>

            <button
              onClick={() => {
                setSelectedConcept("farm");
                clearCategories();
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                selectedConcept === "farm"
                  ? "bg-[#FFA45B] text-black shadow-lg"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              <Wheat className="w-4 h-4 text-amber-300" />
              <span>🌾 Tarladan Doğal & Çiftlik</span>
            </button>

            <button
              onClick={() => {
                setSelectedConcept("bakery");
                clearCategories();
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                selectedConcept === "bakery"
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-950/40"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              <Cake className="w-4 h-4 text-rose-300" />
              <span>🍰 Pastane & Butik Tatlı</span>
            </button>

            <button
              onClick={() => {
                setSelectedConcept("subscription");
                clearCategories();
              }}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold transition-all flex items-center gap-1.5 ${
                selectedConcept === "subscription"
                  ? "bg-emerald-600 text-white shadow-lg shadow-emerald-950/40"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              <RefreshCw className="w-4 h-4 text-emerald-300" />
              <span>📦 Abonelik Paketleri</span>
            </button>
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
                        ? "bg-[#FFA45B] border-[#FFA45B] text-black font-bold"
                        : "border-white/20"
                    }`}
                  >
                    {selectedCategories.length === 0 && "✓"}
                  </span>
                  <span className="text-sm">Tümü</span>
                </div>
                <span className="text-xs opacity-60">({conceptItems.length})</span>
              </label>

              {availableCategories.map((cat, idx) => {
                const isSelected = selectedCategories.includes(cat);
                const count = conceptItems.filter((i) => i.category === cat).length;
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
                            ? "bg-[#FFA45B] border-[#FFA45B] text-black font-bold"
                            : "border-white/20"
                        }`}
                      >
                        {isSelected && "✓"}
                      </span>
                      <span className="text-sm">{cat}</span>
                    </div>
                    <span className="text-xs opacity-60">({count})</span>
                  </label>
                );
              })}
            </div>

            {/* Güvenlik ve Lojistik Rozetleri */}
            <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <Truck className="w-4 h-4 text-[#FFA45B] flex-shrink-0" />
                <span>Soğuk Zincir ve Hızlı Kargo</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>%100 Doğallık & İade Garantisi</span>
              </div>
            </div>
          </aside>

          {/* 🔹 Ürün Listesi Izgarası */}
          <main className="flex-1 w-full">
            {filteredItems.length === 0 ? (
              <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/15 p-8">
                <p className="text-lg font-bold text-gray-300">Bu kategoride ürün bulunamadı.</p>
                <button
                  onClick={clearCategories}
                  className="mt-4 px-5 py-2 bg-[#FFA45B] text-black text-xs font-bold rounded-xl"
                >
                  Filtreleri Temizle
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item, idx) => {
                  const isJustAdded = addedItemName === item.name;

                  return (
                    <div
                      key={idx}
                      className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#FFA45B]/40 rounded-3xl p-4 transition-all duration-300 flex flex-col justify-between shadow-lg"
                    >
                      <div>
                        {/* Ürün Görseli */}
                        <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-3.5 bg-black/40">
                          {item.image.startsWith("http") ? (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          ) : (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                              unoptimized
                            />
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                          {/* Kategori Etiketi */}
                          {item.category && (
                            <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-[#FFA45B] text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                              {item.category}
                            </span>
                          )}

                          {/* Konsept Rozeti */}
                          <span className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
                            {item.concept === "bakery"
                              ? "🍰 Pastane"
                              : item.concept === "subscription"
                              ? "📦 Abonelik"
                              : "🌾 Çiftlik"}
                          </span>
                        </div>

                        {/* Başlık ve Açıklama */}
                        <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFA45B] transition-colors leading-snug">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs text-gray-300 line-clamp-2 min-h-[32px]">
                          {item.info}
                        </p>
                      </div>

                      {/* Fiyat ve Sepete Ekle */}
                      <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between gap-3">
                        <div>
                          <span className="text-[10px] text-gray-400 block">Fiyat</span>
                          <span className="text-xl font-black text-[#FFA45B]">
                            {item.price}
                          </span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(item)}
                          className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                            isJustAdded
                              ? "bg-emerald-500 text-white"
                              : "bg-[#26cc3c] hover:bg-[#20a330] text-white"
                          }`}
                        >
                          {isJustAdded ? (
                            <>
                              <Check className="w-3.5 h-3.5 stroke-[3]" />
                              <span>Eklendi</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-3.5 h-3.5" />
                              <span>Sepete Ekle</span>
                            </>
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
