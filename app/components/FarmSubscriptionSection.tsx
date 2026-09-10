"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { 
  RefreshCw, 
  Check, 
  Plus, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Calendar, 
  CheckCircle2, 
  Settings2, 
  ShoppingCart,
  Percent,
  Milk,
  Egg,
  Apple
} from "lucide-react";

interface SubPlan {
  id: string;
  name: string;
  image: string;
  tagline: string;
  singlePrice: number;
  discountedPrice: number;
  items: string[];
  popular?: boolean;
}

const premadePlans: SubPlan[] = [
  {
    id: "plan-essential",
    name: "Haftalık Temel Çiftlik Sepeti",
    image: "/service-sut.jpg",
    tagline: "En saf haliyle günlük süt ve taze yumurta ihtiyacınız için.",
    singlePrice: 280,
    discountedPrice: 250,
    items: ["3 Litre Günlük Çiftlik Sütü", "15'li Serbest Gezen Tavuk Yumurtası", "Özel Soğuk Zincir Ambalajı"],
    popular: true,
  },
  {
    id: "plan-family",
    name: "Büyük Aile Kahvaltı & Meyve Kutusu",
    image: "/service-kutu.jpg",
    tagline: "Tüm ailenin haftalık doğal besin ve vitamin deposu.",
    singlePrice: 620,
    discountedPrice: 550,
    items: ["5 Litre Günlük Çiftlik Sütü", "30'lu Serbest Gezen Tavuk Yumurtası", "2.5 kg Mevsim Meyveleri", "500g Doğal Köy Peyniri"],
  },
  {
    id: "plan-vitality",
    name: "Enerji & Fındık Destek Paketi",
    image: "/hazelnut-main.jpg",
    tagline: "Giresun fındığı ve saf fındık ezmesiyle zenginleştirilmiş özel kutu.",
    singlePrice: 750,
    discountedPrice: 675,
    items: ["500g Kavrulmuş Giresun Fındığı", "325g Şekersiz Fındık Ezmesi", "2 Litre Günlük Çiftlik Sütü", "15'li Serbest Gezen Yumurta"],
  },
];

interface MixItem {
  id: string;
  name: string;
  price: number;
  icon: string;
}

const extraMixItems: MixItem[] = [
  { id: "fruit", name: "2 kg Taze Mevsim Meyvesi", price: 80, icon: "🍎" },
  { id: "cheese", name: "500g Doğal Köy Peyniri", price: 140, icon: "🧀" },
  { id: "paste", name: "325g Saf Fındık Ezmesi", price: 200, icon: "🌰" },
  { id: "nut", name: "500g Kavrulmuş Fındık", price: 275, icon: "✨" },
  { id: "butter", name: "500g Yayık Köy Tereyağı", price: 160, icon: "🧈" },
];

export default function FarmSubscriptionSection() {
  const { addToCart, setShowCart, setShowSubscriptionModal, subscriptions } = useCart();

  // Her önceden tanımlı plan için mod: 'single' | 'sub' ve frekans
  const [planModes, setPlanModes] = useState<Record<string, { isSub: boolean; freq: "Haftalık" | "2 Haftada Bir" | "Aylık" }>>({
    "plan-essential": { isSub: true, freq: "Haftalık" },
    "plan-family": { isSub: true, freq: "Haftalık" },
    "plan-vitality": { isSub: true, freq: "Haftalık" },
  });

  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Kendi Kutunu Oluştur (Mix & Match) State
  const basePrice = 180; // 2L Süt + 15'li Yumurta
  const [selectedExtras, setSelectedExtras] = useState<string[]>(["fruit"]);
  const [customIsSub, setCustomIsSub] = useState(true);
  const [customFreq, setCustomFreq] = useState<"Haftalık" | "2 Haftada Bir" | "Aylık">("Haftalık");

  // Mix & Match Toplam Fiyat
  const extrasTotal = selectedExtras.reduce((sum, id) => {
    const it = extraMixItems.find((x) => x.id === id);
    return sum + (it ? it.price : 0);
  }, 0);
  const rawCustomTotal = basePrice + extrasTotal;
  const finalCustomPrice = customIsSub ? Math.round(rawCustomTotal * 0.9) : rawCustomTotal;

  const toggleExtra = (id: string) => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleAddPlan = (plan: SubPlan) => {
    const mode = planModes[plan.id] || { isSub: true, freq: "Haftalık" };
    const priceStr = mode.isSub ? `₺${plan.discountedPrice}` : `₺${plan.singlePrice}`;

    addToCart({
      name: plan.name,
      image: plan.image,
      info: plan.tagline,
      price: priceStr,
      stock: 50,
      isSubscription: mode.isSub,
      frequency: mode.isSub ? mode.freq : undefined,
      subscriptionDiscount: mode.isSub ? 10 : 0,
      customBoxItems: plan.items,
      coldChainRequired: true,
    });

    setAddedItem(plan.id);
    setTimeout(() => setAddedItem(null), 1500);
    setShowCart(true);
  };

  const handleAddCustomBox = () => {
    const included = [
      "2L Günlük Süt (Sabit)",
      "15'li Gezen Tavuk Yumurtası (Sabit)",
      ...selectedExtras.map((id) => extraMixItems.find((x) => x.id === id)?.name || ""),
    ];

    addToCart({
      name: "Kişiselleştirilmiş Çiftlik Sepeti (Mix & Match)",
      image: "/service-kutu.jpg",
      info: "Kendi seçtiğiniz taze çiftlik lezzetleri",
      price: `₺${finalCustomPrice}`,
      stock: 50,
      isSubscription: customIsSub,
      frequency: customIsSub ? customFreq : undefined,
      subscriptionDiscount: customIsSub ? 10 : 0,
      customBoxItems: included,
      coldChainRequired: true,
    });

    setAddedItem("custom-box");
    setTimeout(() => setAddedItem(null), 1500);
    setShowCart(true);
  };

  return (
    <section
      id="subscription-section"
      className="relative py-24 px-4 sm:px-6 lg:px-16 bg-[#0f0e0c] text-white overflow-hidden"
    >
      {/* Dekoratif Işıklar */}
      <div className="absolute top-10 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Başlık ve Üst Panel */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Tarladan Sofraya Düzenli Teslimat Modeli</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Taze Çiftlik Aboneliği
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mt-2.5 max-w-xl">
              Her hafta veya 2 haftada bir, sabah sağılan süt ve köy yumurtaları soğuk zincirle doğrudan kapınıza gelsin. Dilediğiniz an duraklatın veya erteleyin.
            </p>
          </div>

          {/* Abonelik Yönetim Butonu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSubscriptionModal(true)}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold flex items-center gap-2 transition shadow-lg"
            >
              <Settings2 className="w-4 h-4 text-[#FFA45B]" />
              <span>Aboneliklerimi Yönet ({subscriptions.length})</span>
            </button>
          </div>
        </div>

        {/* 1. ÖNCEDEN HAZIRLANMIŞ EN POPÜLER ABONELİK KUTULARI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {premadePlans.map((plan) => {
            const currentMode = planModes[plan.id] || { isSub: true, freq: "Haftalık" };
            const isJustAdded = addedItem === plan.id;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border ${
                  plan.popular
                    ? "bg-gradient-to-b from-[#1c1813] to-[#12100d] border-amber-500/40 shadow-xl shadow-amber-950/20"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFA45B] text-black text-[11px] font-black uppercase px-3 py-0.5 rounded-full shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>En Çok Tercih Edilen</span>
                  </div>
                )}

                <div>
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5">
                    <Image
                      src={plan.image}
                      alt={plan.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-[#FFA45B] text-xs font-bold px-2.5 py-1 rounded-lg border border-white/10">
                      Soğuk Zincir Teslimat
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug">{plan.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">{plan.tagline}</p>

                  {/* Kutu İçeriği Maddeleri */}
                  <div className="my-5 space-y-2">
                    {plan.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                        <span>{it}</span>
                      </div>
                    ))}
                  </div>

                  {/* Satın Alma Seçimi: Tek Seferlik vs Düzenli Abonelik */}
                  <div className="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-2.5">
                    <div className="flex rounded-xl p-1 bg-white/5 text-xs font-bold">
                      <button
                        onClick={() =>
                          setPlanModes((prev) => ({
                            ...prev,
                            [plan.id]: { ...currentMode, isSub: false },
                          }))
                        }
                        className={`flex-1 py-1.5 rounded-lg transition ${
                          !currentMode.isSub
                            ? "bg-white/20 text-white shadow"
                            : "text-gray-400 hover:text-white"
                        }`}
                      >
                        Tek Seferlik (₺{plan.singlePrice})
                      </button>

                      <button
                        onClick={() =>
                          setPlanModes((prev) => ({
                            ...prev,
                            [plan.id]: { ...currentMode, isSub: true },
                          }))
                        }
                        className={`flex-1 py-1.5 rounded-lg transition flex items-center justify-center gap-1 ${
                          currentMode.isSub
                            ? "bg-emerald-600 text-white shadow"
                            : "text-emerald-400 hover:text-emerald-300"
                        }`}
                      >
                        <Percent className="w-3 h-3" />
                        <span>Abonelik (₺{plan.discountedPrice})</span>
                      </button>
                    </div>

                    {/* Eğer Abonelik Seçildiyse Frekans Seçici */}
                    {currentMode.isSub && (
                      <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/10 text-gray-300">
                        <span>Teslimat Sıklığı:</span>
                        <div className="flex gap-1">
                          {(["Haftalık", "2 Haftada Bir", "Aylık"] as const).map((freq) => (
                            <button
                              key={freq}
                              onClick={() =>
                                setPlanModes((prev) => ({
                                  ...prev,
                                  [plan.id]: { ...currentMode, freq },
                                }))
                              }
                              className={`px-2 py-0.5 rounded text-[10px] font-bold transition ${
                                currentMode.freq === freq
                                  ? "bg-[#FFA45B] text-black"
                                  : "bg-white/10 text-gray-300 hover:bg-white/20"
                              }`}
                            >
                              {freq}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Alt Kısım - Fiyat & Ekle Butonu */}
                <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase text-gray-400 block font-semibold">
                      {currentMode.isSub ? `${currentMode.freq} Tutar` : "Tek Seferlik"}
                    </span>
                    <span className="text-2xl font-black text-[#FFA45B]">
                      ₺{currentMode.isSub ? plan.discountedPrice : plan.singlePrice}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddPlan(plan)}
                    className={`px-5 py-3 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-lg active:scale-95 ${
                      isJustAdded
                        ? "bg-emerald-500 text-white"
                        : "bg-[#26cc3c] hover:bg-[#20a330] text-white"
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Eklendi</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        <span>{currentMode.isSub ? "Abone Ol" : "Sepete Ekle"}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. KİŞİSELLEŞTİRİLEBİLİR KUTU (MIX & MATCH BOX BUILDER) */}
        <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1a1814] via-[#141210] to-[#0c0b0a] border border-amber-500/30 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFA45B]/15 text-[#FFA45B] text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Esnek Sepet Mimarisi</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-black text-white">
              Kendi Haftalık Çiftlik Sepetini Oluştur
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mt-2">
              Sabit taze süt ve serbest gezen köy yumurtanızın yanına dilediğiniz doğal eklemeleri yaparak kendi sepetinizi oluşturun. Abonelikte anında %10 indirim uygulanır.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sol Sütun: Sabit Temel Ürünler ve Eklenebilir Seçenekler */}
            <div className="lg:col-span-7 space-y-6">
              {/* Sabit Temel Ürünler */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                  Kutunun Temel Bileşenleri (Sabit Dahil)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 bg-black/40 rounded-xl flex items-center gap-3 border border-emerald-500/20">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      🥛
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">2L Günlük Köy Sütü</h5>
                      <p className="text-[10px] text-gray-400">Sabah sağılan saf süt</p>
                    </div>
                  </div>

                  <div className="p-3 bg-black/40 rounded-xl flex items-center gap-3 border border-emerald-500/20">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                      🥚
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">15&apos;li Serbest Gezen Yumurta</h5>
                      <p className="text-[10px] text-gray-400">Doğal beslenen tavuklardan</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dinamik Ekstralar Seçici */}
              <div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
                  Kutuna Eklemek İstediğin Lezzetleri Seç:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {extraMixItems.map((item) => {
                    const isSelected = selectedExtras.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => toggleExtra(item.id)}
                        className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between ${
                          isSelected
                            ? "bg-[#FFA45B]/15 border-[#FFA45B] text-white shadow-md"
                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <span className="text-xs font-bold block">{item.name}</span>
                            <span className="text-[11px] text-[#FFA45B] font-semibold">
                              +₺{item.price}
                            </span>
                          </div>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${
                            isSelected
                              ? "bg-[#FFA45B] text-black border-[#FFA45B] font-bold"
                              : "border-white/20 text-transparent"
                          }`}
                        >
                          ✓
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sağ Sütun: Kutu Özeti & Sipariş Formatı */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-black/60 border border-white/15 space-y-5">
              <h4 className="text-base font-bold text-white pb-3 border-b border-white/10 flex items-center justify-between">
                <span>Kişisel Sepet Özeti</span>
                <span className="text-xs text-gray-400">
                  {selectedExtras.length + 2} Ürün
                </span>
              </h4>

              {/* Seçili İçerik Listesi */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span>Temel Paket (Süt + Yumurta)</span>
                  <span className="font-semibold text-white">₺{basePrice}</span>
                </div>
                {selectedExtras.map((id) => {
                  const it = extraMixItems.find((x) => x.id === id);
                  if (!it) return null;
                  return (
                    <div key={id} className="flex justify-between text-gray-300">
                      <span>↳ {it.name}</span>
                      <span className="font-semibold text-white">₺{it.price}</span>
                    </div>
                  );
                })}
              </div>

              {/* Sipariş Türü: Tek Seferlik vs Düzenli Abonelik */}
              <div className="pt-4 border-t border-white/10 space-y-3">
                <div className="flex rounded-xl p-1 bg-white/5 text-xs font-bold">
                  <button
                    onClick={() => setCustomIsSub(false)}
                    className={`flex-1 py-2 rounded-lg transition ${
                      !customIsSub ? "bg-white/20 text-white" : "text-gray-400"
                    }`}
                  >
                    Tek Seferlik (₺{rawCustomTotal})
                  </button>
                  <button
                    onClick={() => setCustomIsSub(true)}
                    className={`flex-1 py-2 rounded-lg transition flex items-center justify-center gap-1 ${
                      customIsSub ? "bg-emerald-600 text-white" : "text-emerald-400"
                    }`}
                  >
                    <Percent className="w-3.5 h-3.5" />
                    <span>Abonelik (-%10)</span>
                  </button>
                </div>

                {customIsSub && (
                  <div className="flex items-center justify-between text-xs text-gray-300 bg-white/5 p-2 rounded-xl">
                    <span>Teslimat:</span>
                    <div className="flex gap-1">
                      {(["Haftalık", "2 Haftada Bir", "Aylık"] as const).map((freq) => (
                        <button
                          key={freq}
                          onClick={() => setCustomFreq(freq)}
                          className={`px-2 py-1 rounded text-[10px] font-bold ${
                            customFreq === freq
                              ? "bg-[#FFA45B] text-black"
                              : "bg-white/10 text-gray-300"
                          }`}
                        >
                          {freq}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Toplam Fiyat ve Ekle Butonu */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 uppercase block font-semibold">
                    {customIsSub ? `${customFreq} Tutar` : "Tek Seferlik Toplam"}
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-[#FFA45B]">
                      ₺{finalCustomPrice}
                    </span>
                    {customIsSub && (
                      <span className="text-xs text-gray-500 line-through">
                        ₺{rawCustomTotal}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAddCustomBox}
                  className={`py-3 px-6 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
                    addedItem === "custom-box"
                      ? "bg-emerald-500 text-white"
                      : "bg-[#FFA45B] hover:bg-[#ff9447] text-black"
                  }`}
                >
                  {addedItem === "custom-box" ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Sepete Eklendi</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>{customIsSub ? "Kutuyu Abone Yap" : "Sepete Ekle"}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
