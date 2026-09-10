"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { 
  Cake, 
  Sparkles, 
  ShoppingCart, 
  Check, 
  Calendar, 
  Users, 
  FileText, 
  Upload, 
  MessageCircle, 
  Phone, 
  Heart,
  ChevronRight,
  Layers,
  Award,
  Star
} from "lucide-react";

// 1. LEZZET KUTULARI LİSTESİ
interface TreatBoxItem {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
}

const treatBoxItems: TreatBoxItem[] = [
  {
    id: "tiramisu",
    name: "Tiramisu",
    price: 180,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=600&q=80",
    desc: "İtalyan mascarpone kreması ve taze demlenmiş espresso aromasıyla.",
  },
  {
    id: "profiterol",
    name: "Profiterol",
    price: 170,
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?auto=format&fit=crop&w=600&q=80",
    desc: "Özel pastacı kreması dolgulu şu hamurları ve akışkan Belçika çikolatası sosu.",
  },
  {
    id: "fistik-cheesecake",
    name: "Fıstıklı Cheesecake",
    price: 220,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    desc: "Yoğun Antep fıstığı ezmesi ve kadifemsi peynir dolgulu imza lezzet.",
  },
  {
    id: "cilek-magnolia",
    name: "Çilekli Magnolia",
    price: 160,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80",
    desc: "Hafif vanilyalı ipeksi krema, bisküvi kırıntıları ve taze çilek dilimleri.",
  },
  {
    id: "mousse-choco",
    name: "Mousse Chocolate",
    price: 190,
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80",
    desc: "%70 bitter Belçika çikolatasıyla hazırlanan havadar yoğun mus.",
  },
  {
    id: "orman-cheesecake",
    name: "Orman Meyveli Cheesecake",
    price: 210,
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=600&q=80",
    desc: "Frambuaz, böğürtlen ve yaban mersini soslu fırınlanmış New York usulü.",
  },
];

// 2. PASTA KOLEKSİYONU LİSTESİ (14 ÖZEL PASTA)
interface SignatureCake {
  id: string;
  name: string;
  basePrice: number; // 4-6 kişilik
  image: string;
  desc: string;
}

const signatureCakes: SignatureCake[] = [
  {
    id: "pavlova",
    name: "Pavlova",
    basePrice: 650,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
    desc: "Antep fıstığı ile zenginleştirilmiş hafif ve çıtır beze, seçkin orman meyveleri.",
  },
  {
    id: "rose-aura",
    name: "Rose Aura",
    basePrice: 700,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    desc: "Yumuşacık böğürtlen ve frambuazlı sponge kekin, yoğun çikolatalı mousse ile buluşması.",
  },
  {
    id: "prenses",
    name: "Prenses",
    basePrice: 680,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80",
    desc: "Çilek, frambuaz, yaban mersini aromasıyla harmanlaşmış hindistan cevizli kek, prenses kremasının buluşması.",
  },
  {
    id: "bianca",
    name: "Bianca",
    basePrice: 690,
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80",
    desc: "Bademin lezzetiyle zenginleşen beyaz sponge kek, prenses ve pastacı kreması, frambuaz.",
  },
  {
    id: "festival",
    name: "Festival",
    basePrice: 720,
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80",
    desc: "Karamel sosla kaplanan böğürtlen ve frambuazlı sponge kek, çikolatalı mousse ve krep kırığı.",
  },
  {
    id: "lotus-pasta",
    name: "Lotus",
    basePrice: 700,
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=600&q=80",
    desc: "Lotusun karamelize lezzetiyle buluşan beyaz sponge kek, çilek ve lotus kırıntıları.",
  },
  {
    id: "raffaello",
    name: "Raffaello",
    basePrice: 750,
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80",
    desc: "Frambuaz sorbenin meyvemsi notalarıyla fıstıklı parfe, hindistan cevizli parfe, magnolia kreması ve çikolatalı mousse.",
  },
  {
    id: "perla",
    name: "Perla",
    basePrice: 760,
    image: "https://images.unsplash.com/photo-1542826438-bd32f43d626f?auto=format&fit=crop&w=600&q=80",
    desc: "Beyaz çikolatanın zarif dokunuşuyla hindistan cevizli parfe, magnolia kreması, çikolatalı mousse, sponge kek ve Antep fıstığı.",
  },
  {
    id: "nirvana",
    name: "Nirvana",
    basePrice: 740,
    image: "https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80",
    desc: "Yoğun çikolata katmanlarıyla hazırlanan profiterol sos, çikolatalı mousse, sponge kek ve çikolatalı fıstık.",
  },
  {
    id: "ferrero",
    name: "Ferrero",
    basePrice: 780,
    image: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80",
    desc: "Fındıklı krokanın çıtırlığıyla zenginleşen truffle cream, çikolatalı mousse, sponge kek ve profiterol sos.",
  },
  {
    id: "vanity-lime",
    name: "Vanity Lime",
    basePrice: 710,
    image: "https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&w=600&q=80",
    desc: "Tropikal lezzetlerden ilham alan hindistan cevizli sponge, ananas parfe, egzotik mousse ve limon kreması.",
  },
  {
    id: "visneli-browni",
    name: "Vişneli Browni",
    basePrice: 620,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    desc: "Vişnenin meyvemsi notalarıyla zenginleşen nemli ve yoğun çikolatalı fırın browni.",
  },
  {
    id: "mango-pasta",
    name: "Mango Pasta",
    basePrice: 730,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80",
    desc: "Egzotik aromalarıyla mango mousse ve ananas sorbenin harika uyumu, mango parçacıkları ve lime.",
  },
  {
    id: "rubaz",
    name: "Rubaz",
    basePrice: 720,
    image: "https://images.unsplash.com/photo-1514517521153-1be72277b32f?auto=format&fit=crop&w=600&q=80",
    desc: "Frambuazın eşsiz lezzetiyle hazırlanmış sorbe, vanilyalı mousse ve sponge kek.",
  },
];

// 3. CHEESECAKE KOLEKSİYONU
interface CheesecakeItem {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
}

const cheesecakes: CheesecakeItem[] = [
  {
    id: "lotus-cheese",
    name: "Lotuslu Cheesecake",
    price: 650,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    desc: "Biscoff Lotus bisküvi tabanı, fırınlanmış kadifemsi peynir ve akışkan Lotus kreması.",
  },
  {
    id: "limon-cheese",
    name: "Limonlu Cheesecake",
    price: 620,
    image: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?auto=format&fit=crop&w=600&q=80",
    desc: "Taze sıkılmış limon suyu ve kabuğuyla hazırlanan ferahlatıcı lemon curd soslu.",
  },
  {
    id: "san-sebastian",
    name: "San Sebastian Cheesecake",
    price: 640,
    image: "https://images.unsplash.com/photo-1567327613485-fbc7bf196198?auto=format&fit=crop&w=600&q=80",
    desc: "Karamelize yanık üst kabuk ve ortası kremsi akışkan orijinal Bask lezzeti.",
  },
  {
    id: "fistik-frambuaz-cheese",
    name: "Fıstıklı & Frambuazlı Cheesecake",
    price: 720,
    image: "https://images.unsplash.com/photo-1508737027454-e6454ef45afd?auto=format&fit=crop&w=600&q=80",
    desc: "Antep fıstıklı taban, krem peynir dolgusu ve mayhoş taze frambuaz jölesi uyumu.",
  },
];

export default function PatisserieSection() {
  const { addToCart, setShowCart } = useCart();

  // Aktif Sekme (Vitrin Gezinimi)
  const [activeTab, setActiveTab] = useState<"boxes" | "cakes" | "cheesecake" | "custom">("cakes");

  // Kişi Sayısı Varyant Seçimi: { [cakeId]: "4-6" | "8-10" | "12-15" }
  const [cakeVariants, setCakeVariants] = useState<Record<string, "4-6" | "8-10" | "12-15">>({});

  // Kendi Kutunu Oluştur (Mix & Match) State
  const [boxSize, setBoxSize] = useState<4 | 6>(4);
  const [selectedBoxTreats, setSelectedBoxTreats] = useState<string[]>(["tiramisu", "profiterol", "cilek-magnolia", "mousse-choco"]);

  // Özel Sipariş Form State
  const [customForm, setCustomForm] = useState({
    category: "Doğum Günü Pastası",
    date: "",
    time: "14:00",
    guestCount: "15-20 Kişilik",
    note: "",
    specialRequests: "",
    fileName: "",
  });

  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Varyant fiyat çarpanı hesaplayıcı
  const getCakeVariantPrice = (basePrice: number, variant: "4-6" | "8-10" | "12-15" = "4-6") => {
    if (variant === "8-10") return Math.round(basePrice * 1.35);
    if (variant === "12-15") return Math.round(basePrice * 1.7);
    return basePrice;
  };

  const handleAddSingleCake = (cake: SignatureCake) => {
    const variant = cakeVariants[cake.id] || "4-6";
    const finalPrice = getCakeVariantPrice(cake.basePrice, variant);
    const variantLabel = variant === "4-6" ? "4-6 Kişilik (Standart)" : variant === "8-10" ? "8-10 Kişilik (Büyük)" : "12-15 Kişilik (Parti)";

    addToCart({
      name: cake.name,
      image: cake.image,
      info: cake.desc,
      price: `₺${finalPrice}`,
      stock: 20,
      variant: variantLabel,
      coldChainRequired: true,
    });

    setAddedItem(cake.id);
    setTimeout(() => setAddedItem(null), 1200);
    setShowCart(true);
  };

  const handleAddSingleCheesecake = (item: CheesecakeItem) => {
    addToCart({
      name: item.name,
      image: item.image,
      info: item.desc,
      price: `₺${item.price}`,
      stock: 15,
      coldChainRequired: true,
    });

    setAddedItem(item.id);
    setTimeout(() => setAddedItem(null), 1200);
    setShowCart(true);
  };

  const handleAddSingleTreat = (treat: TreatBoxItem) => {
    addToCart({
      name: treat.name,
      image: treat.image,
      info: treat.desc,
      price: `₺${treat.price}`,
      stock: 30,
      coldChainRequired: true,
    });

    setAddedItem(treat.id);
    setTimeout(() => setAddedItem(null), 1200);
    setShowCart(true);
  };

  // Mix & Match Kutu Ekleme
  const toggleTreatInBox = (id: string) => {
    if (selectedBoxTreats.includes(id)) {
      if (selectedBoxTreats.length > 1) {
        setSelectedBoxTreats((prev) => prev.filter((x) => x !== id));
      }
    } else {
      if (selectedBoxTreats.length < boxSize) {
        setSelectedBoxTreats((prev) => [...prev, id]);
      } else {
        // En eskiyi çıkarıp yeniyi ekle
        setSelectedBoxTreats((prev) => [...prev.slice(1), id]);
      }
    }
  };

  const handleAddCustomBox = () => {
    const boxPrice = boxSize === 4 ? 680 : 980;
    const names = selectedBoxTreats.map((id) => treatBoxItems.find((t) => t.id === id)?.name || id);

    addToCart({
      name: `${boxSize}'lü Kişisel Lezzet Kutusu`,
      image: treatBoxItems[0].image,
      info: "Özel tasarım lüks hediye kutusunda tatlı seçkisi",
      price: `₺${boxPrice}`,
      stock: 25,
      variant: `${boxSize}'lü Özel Kutu`,
      customBoxItems: names,
      coldChainRequired: true,
    });

    setAddedItem("custom-treat-box");
    setTimeout(() => setAddedItem(null), 1200);
    setShowCart(true);
  };

  // Özel Pasta Formu Gönderme (WhatsApp Entegrasyonu)
  const handleCustomOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phone = "905319412442";
    let msg = `🎂 *ÖZEL PASTA SİPARİŞ TALEBİ*%0A%0A`;
    msg += `*Kategori:* ${customForm.category}%0A`;
    msg += `*Kişi Sayısı:* ${customForm.guestCount}%0A`;
    msg += `*Teslim Tarihi:* ${customForm.date || "Görüşülecek"} (Saat: ${customForm.time})%0A`;
    if (customForm.note) {
      msg += `*Pasta Üzeri Yazısı:* "${customForm.note}"%0A`;
    }
    if (customForm.specialRequests) {
      msg += `*Özel Not/Alerjen:* ${customForm.specialRequests}%0A`;
    }
    if (customForm.fileName) {
      msg += `*Görsel/Taslak:* ${customForm.fileName} (WhatsApp üzerinden fotoğrafı gönderiyorum)%0A`;
    }
    msg += `%0AÖzel tasarım pasta için fiyat ve onayınızı rica ederim.`;

    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
  };

  return (
    <section
      id="patisserie-section"
      className="relative py-24 px-4 sm:px-6 lg:px-16 bg-[#110d10] text-white overflow-hidden"
    >
      {/* Dekoratif Arka Plan Parıltıları */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Üst Karşılama Başlığı */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Cake className="w-3.5 h-3.5 text-rose-400" />
            <span>Butik Pastane & Lezzet Atölyesi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Zarafet & Ustalığın Buluşması
          </h2>
          <p className="text-sm sm:text-base text-gray-300 mt-3 leading-relaxed">
            Seçkin pastacılığın inceliklerini taze meyveler, doğal Giresun fındığı ve %100 Belçika çikolatasıyla sanat eserine dönüştürüyoruz.
          </p>
        </div>

        {/* Sekmeli Gezinme Çubuğu (4 Ana Hiyerarşi) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-14">
          <button
            onClick={() => setActiveTab("cakes")}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 shadow-lg ${
              activeTab === "cakes"
                ? "bg-rose-500 text-white shadow-rose-900/40 scale-105"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            <Cake className="w-4 h-4" />
            <span>Pasta Koleksiyonu (14 Çeşit)</span>
          </button>

          <button
            onClick={() => setActiveTab("boxes")}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 shadow-lg ${
              activeTab === "boxes"
                ? "bg-rose-500 text-white shadow-rose-900/40 scale-105"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Lezzet Kutuları & Mix-Match</span>
          </button>

          <button
            onClick={() => setActiveTab("cheesecake")}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 shadow-lg ${
              activeTab === "cheesecake"
                ? "bg-rose-500 text-white shadow-rose-900/40 scale-105"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            <Star className="w-4 h-4" />
            <span>Cheesecake Koleksiyonu</span>
          </button>

          <button
            onClick={() => setActiveTab("custom")}
            className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-extrabold transition-all duration-300 flex items-center gap-2 shadow-lg ${
              activeTab === "custom"
                ? "bg-[#FFA45B] text-black shadow-amber-900/40 scale-105"
                : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Özel Pasta Siparişi (Form)</span>
          </button>
        </div>

        {/* İÇERİK: TAB B - PASTA KOLEKSİYONU (14 ÇEŞİT + EBAT SEÇENEĞİ) */}
        {activeTab === "cakes" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="text-center max-w-xl mx-auto mb-10">
              <p className="text-rose-300 text-sm font-medium italic">
                &ldquo;Taze meyvelerin ferah dokunuşuyla hazırlanan zarif lezzetler.&rdquo;
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Tüm pastalarımızda kişi sayısına göre ebat seçimi yapabilirsiniz.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {signatureCakes.map((cake) => {
                const currentVariant = cakeVariants[cake.id] || "4-6";
                const price = getCakeVariantPrice(cake.basePrice, currentVariant);
                const isJustAdded = addedItem === cake.id;

                return (
                  <div
                    key={cake.id}
                    className="group relative bg-white/[0.03] border border-white/10 hover:border-rose-500/40 rounded-3xl p-4 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-rose-950/20"
                  >
                    <div>
                      {/* Görsel */}
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-3.5 bg-black/40">
                        <img
                          src={cake.image}
                          alt={cake.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
                        <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                          Şef İmzalı
                        </span>
                      </div>

                      {/* Başlık ve Açıklama */}
                      <h4 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                        {cake.name}
                      </h4>
                      <p className="text-xs text-gray-300 mt-1.5 line-clamp-3 leading-relaxed">
                        {cake.desc}
                      </p>

                      {/* Kişi Sayısı / Ebat Varyant Seçici */}
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <span className="text-[11px] font-semibold text-gray-400 block mb-1.5">
                          Kişi Sayısı / Ebat:
                        </span>
                        <div className="grid grid-cols-3 gap-1">
                          {(["4-6", "8-10", "12-15"] as const).map((v) => (
                            <button
                              key={v}
                              type="button"
                              onClick={() =>
                                setCakeVariants((prev) => ({ ...prev, [cake.id]: v }))
                              }
                              className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition text-center ${
                                currentVariant === v
                                  ? "bg-rose-500 text-white shadow"
                                  : "bg-white/5 text-gray-300 hover:bg-white/10"
                              }`}
                            >
                              {v} Kişi
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Fiyat ve Sepete Ekle */}
                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] text-gray-400 block">Fiyat</span>
                        <span className="text-xl font-black text-[#FFA45B]">
                          ₺{price}
                        </span>
                      </div>

                      <button
                        onClick={() => handleAddSingleCake(cake)}
                        className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 ${
                          isJustAdded
                            ? "bg-emerald-500 text-white"
                            : "bg-rose-500 hover:bg-rose-600 text-white"
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
          </motion.div>
        )}

        {/* İÇERİK: TAB A - LEZZET KUTULARI & KENDİ KUTUNU OLUŞTUR */}
        {activeTab === "boxes" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            <div className="text-center max-w-xl mx-auto">
              <p className="text-rose-300 text-sm font-medium italic">
                &ldquo;Her pasta; lezzet, estetik ve ustalığın bir araya geldiği özel bir tasarım olarak hazırlanır.&rdquo;
              </p>
            </div>

            {/* Kendi Kutunu Oluştur (Mix & Match) Vurgulu Alanı */}
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-rose-950/40 via-[#181115] to-amber-950/40 border border-rose-500/30 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold mb-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Özel Lüks Hediye Kutusu</span>
                  </div>
                  <h3 className="text-2xl font-black text-white">
                    Kendi Lezzet Kutunu Oluştur (4&apos;lü veya 6&apos;lı)
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-300 mt-1">
                    Favori lezzetlerinizi kutu boyutunuza göre seçin, tek tıkla sepete ekleyin.
                  </p>
                </div>

                {/* Kutu Ebat Seçici */}
                <div className="flex items-center gap-2 bg-black/50 p-1.5 rounded-2xl border border-white/10">
                  <button
                    onClick={() => {
                      setBoxSize(4);
                      if (selectedBoxTreats.length > 4) setSelectedBoxTreats((prev) => prev.slice(0, 4));
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                      boxSize === 4 ? "bg-rose-500 text-white shadow" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    4&apos;lü Kutu (₺680)
                  </button>
                  <button
                    onClick={() => setBoxSize(6)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition ${
                      boxSize === 6 ? "bg-rose-500 text-white shadow" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    6&apos;lı Kutu (₺980)
                  </button>
                </div>
              </div>

              {/* Tatlı Seçim Grid'i */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                {treatBoxItems.map((treat) => {
                  const isSelected = selectedBoxTreats.includes(treat.id);
                  return (
                    <button
                      key={treat.id}
                      type="button"
                      onClick={() => toggleTreatInBox(treat.id)}
                      className={`relative p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-rose-500/20 border-rose-400 text-white shadow-lg"
                          : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                      }`}
                    >
                      <div className="relative w-full h-24 rounded-xl overflow-hidden mb-2 bg-black/40">
                        <img
                          src={treat.image}
                          alt={treat.name}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        {isSelected && (
                          <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-black flex items-center justify-center shadow">
                            ✓
                          </div>
                        )}
                      </div>
                      <span className="text-xs font-bold block">{treat.name}</span>
                      <span className="text-[11px] text-[#FFA45B] font-semibold mt-0.5">
                        ₺{treat.price}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Kutu Ekle Butonu */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-xs text-gray-300">
                  <span className="font-bold text-white">Seçilen Tatlılar ({selectedBoxTreats.length}/{boxSize}):</span>{" "}
                  {selectedBoxTreats.map((id) => treatBoxItems.find((t) => t.id === id)?.name).join(", ")}
                </div>

                <button
                  onClick={handleAddCustomBox}
                  className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
                    addedItem === "custom-treat-box"
                      ? "bg-emerald-500 text-white"
                      : "bg-[#FFA45B] hover:bg-[#ff9447] text-black"
                  }`}
                >
                  {addedItem === "custom-treat-box" ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Kutu Sepete Eklendi!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>{boxSize}&apos;lü Kutuyu Sepete Ekle (₺{boxSize === 4 ? 680 : 980})</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tekli Alım Listesi */}
            <div>
              <h4 className="text-lg font-bold text-white mb-4">Tekli Lezzet Kutusu Siparişi</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {treatBoxItems.map((treat) => {
                  const isJustAdded = addedItem === treat.id;
                  return (
                    <div
                      key={treat.id}
                      className="group bg-white/[0.03] border border-white/10 hover:border-rose-500/40 rounded-3xl p-4 flex flex-col justify-between transition-all"
                    >
                      <div>
                        <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-3 bg-black/40">
                          <img
                            src={treat.image}
                            alt={treat.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                        </div>
                        <h5 className="text-base font-bold text-white">{treat.name}</h5>
                        <p className="text-xs text-gray-300 mt-1 leading-relaxed">{treat.desc}</p>
                      </div>

                      <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                        <span className="text-lg font-black text-[#FFA45B]">₺{treat.price}</span>
                        <button
                          onClick={() => handleAddSingleTreat(treat)}
                          className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                            isJustAdded
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 hover:bg-rose-600 text-white"
                          }`}
                        >
                          {isJustAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                          <span>{isJustAdded ? "Eklendi" : "Sepete Ekle"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* İÇERİK: TAB C - CHEESECAKE KOLEKSİYONU */}
        {activeTab === "cheesecake" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="text-center max-w-xl mx-auto mb-8">
              <p className="text-rose-300 text-sm font-medium italic">
                &ldquo;Seçkin pastacılığın inceliklerini zarafet anlayışıyla buluşturur.&rdquo;
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {cheesecakes.map((item) => {
                const isJustAdded = addedItem === item.id;
                return (
                  <div
                    key={item.id}
                    className="group bg-white/[0.03] border border-white/10 hover:border-rose-500/40 rounded-3xl p-4 flex flex-col justify-between transition-all hover:shadow-xl"
                  >
                    <div>
                      <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-3.5 bg-black/40">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <h4 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between">
                      <span className="text-xl font-black text-[#FFA45B]">₺{item.price}</span>
                      <button
                        onClick={() => handleAddSingleCheesecake(item)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          isJustAdded
                            ? "bg-emerald-500 text-white"
                            : "bg-rose-500 hover:bg-rose-600 text-white"
                        }`}
                      >
                        {isJustAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                        <span>{isJustAdded ? "Eklendi" : "Sepete Ekle"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* İÇERİK: TAB D - ÖZEL PASTA SİPARİŞLERİ (CUSTOM ORDER FLOW) */}
        {activeTab === "custom" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl mx-auto"
          >
            <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-b from-[#1c1417] to-[#140e11] border border-rose-500/30 shadow-2xl">
              <div className="text-center mb-8">
                <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-500/20 text-rose-300 flex items-center justify-center mb-3">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  Özel Tasarım Pasta Talep Formu
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-2">
                  Doğum günü, nişan veya kutlamanız için hayalinizdeki pastayı bize iletin, şeflerimiz size özel hazırlasın.
                </p>
              </div>

              <form onSubmit={handleCustomOrderSubmit} className="space-y-5">
                {/* Kategori Seçimi */}
                <div>
                  <label className="text-xs font-bold text-gray-300 uppercase block mb-2">
                    Kutlama Türü:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {["Doğum Günü Pastası", "Nişan Pastası", "Özel Gün Pastası", "Kutlama Pastası"].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCustomForm((prev) => ({ ...prev, category: cat }))}
                        className={`py-2 px-2.5 rounded-xl text-xs font-bold transition text-center ${
                          customForm.category === cat
                            ? "bg-rose-500 text-white shadow"
                            : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tarih ve Kişi Sayısı */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1.5">
                      Teslim Tarihi:
                    </label>
                    <input
                      type="date"
                      required
                      value={customForm.date}
                      onChange={(e) => setCustomForm((prev) => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1.5">
                      Teslim Saati:
                    </label>
                    <input
                      type="time"
                      value={customForm.time}
                      onChange={(e) => setCustomForm((prev) => ({ ...prev, time: e.target.value }))}
                      className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 block mb-1.5">
                      Kişi Sayısı:
                    </label>
                    <select
                      value={customForm.guestCount}
                      onChange={(e) => setCustomForm((prev) => ({ ...prev, guestCount: e.target.value }))}
                      className="w-full bg-[#181115] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-rose-400"
                    >
                      <option value="10-15 Kişilik">10-15 Kişilik</option>
                      <option value="15-20 Kişilik">15-20 Kişilik</option>
                      <option value="25-30 Kişilik">25-30 Kişilik</option>
                      <option value="40+ Kişilik (Büyük Etkinlik)">40+ Kişilik (Büyük Etkinlik)</option>
                    </select>
                  </div>
                </div>

                {/* Pasta Üzeri Yazı Notu */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1.5">
                    Pasta Üzeri Yazı Notu (Opsiyonel):
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: İyi ki doğdun Canan! & 30th Anniversary"
                    value={customForm.note}
                    onChange={(e) => setCustomForm((prev) => ({ ...prev, note: e.target.value }))}
                    className="w-full bg-black/50 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-400"
                  />
                </div>

                {/* Görsel / Taslak Referans Yükleme Alanı */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1.5">
                    Örnek Taslak / Görsel Yükleme:
                  </label>
                  <div className="relative border-2 border-dashed border-white/20 hover:border-rose-400/60 rounded-2xl p-5 text-center transition bg-white/[0.02]">
                    <Upload className="w-7 h-7 mx-auto mb-2 text-rose-400" />
                    <p className="text-xs text-gray-300">
                      {customForm.fileName ? (
                        <span className="text-emerald-400 font-bold">✓ {customForm.fileName} yüklendi</span>
                      ) : (
                        "Hayalinizdeki pasta fotoğrafını seçin veya sürükleyin"
                      )}
                    </p>
                    <p className="text-[10px] text-gray-500 mt-1">PNG, JPG, WebP desteklenir</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) setCustomForm((prev) => ({ ...prev, fileName: file.name }));
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Özel İstekler ve Alerjen Notu */}
                <div>
                  <label className="text-xs font-bold text-gray-300 block mb-1.5">
                    Özel Talepler & Alerjen Notları:
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Örn: Glutensiz sponge kek tercihi, çikolata yoğunluğu, süsleme renkleri vb."
                    value={customForm.specialRequests}
                    onChange={(e) => setCustomForm((prev) => ({ ...prev, specialRequests: e.target.value }))}
                    className="w-full bg-black/50 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-rose-400"
                  />
                </div>

                {/* Butonlar */}
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    type="submit"
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-2xl bg-[#26cc3c] hover:bg-[#20a330] text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 transition active:scale-98"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>WhatsApp ile Talebi Gönder</span>
                  </button>

                  <a
                    href="tel:05319412442"
                    className="w-full sm:w-auto py-3.5 px-5 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs text-center border border-white/10 transition flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#FFA45B]" />
                    <span>Telefonla Danış</span>
                  </a>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
