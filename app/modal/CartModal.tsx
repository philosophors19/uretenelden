"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { 
  X, 
  Trash2, 
  RefreshCw, 
  Truck, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  ShoppingBag,
  MapPin,
  ShieldCheck,
  MessageCircle
} from "lucide-react";

export default function CartModal() {
  const { cart, removeFromCart, updateQuantity, totalPrice, showCart, setShowCart, setShowSubscriptionModal } = useCart();
  const [district, setDistrict] = useState("");
  const [coldChainStatus, setColdChainStatus] = useState<"ready" | "standard" | null>(null);

  // Soğuk zincir kurye bölgeleri kontrolü
  const checkColdChain = (val: string) => {
    setDistrict(val);
    const localDistricts = [
      "kadıköy", "beşiktaş", "üsküdar", "şişli", "sarıyer", "bakırköy", 
      "ataşehir", "maltepe", "beyoğlu", "giresun", "trabzon", "ordu", 
      "çankaya", "nilüfer", "karşıyaka", "bornova"
    ];
    const clean = val.trim().toLowerCase();
    if (clean.length < 3) {
      setColdChainStatus(null);
      return;
    }
    const isLocal = localDistricts.some((d) => clean.includes(d));
    setColdChainStatus(isLocal ? "ready" : "standard");
  };

  const hasSubscriptionItem = cart.some((i) => i.isSubscription);
  const hasColdChainItem = cart.some((i) => i.coldChainRequired || i.isSubscription || i.name.toLowerCase().includes("süt") || i.name.toLowerCase().includes("pasta"));

  const handleWhatsAppCheckout = () => {
    if (cart.length === 0) return;

    const phoneNumber = "905319412442";
    let message = "Merhaba 👋 Üretenelden üzerinden sipariş vermek istiyorum:%0A%0A";

    cart.forEach((item, index) => {
      message += `*${index + 1}. ${item.name}*`;
      if (item.variant) {
        message += ` (${item.variant})`;
      }
      if (item.isSubscription) {
        message += ` [DÜZENLİ ABONELİK - ${item.frequency || "Haftalık"} / %10 İndirimli]`;
      }
      message += `%0AAdet: ${item.quantity} | Birim Fiyat: ${item.price}%0A`;

      if (item.customBoxItems && item.customBoxItems.length > 0) {
        message += `↳ Kutu İçeriği: ${item.customBoxItems.join(", ")}%0A`;
      }
      if (item.cakeNote) {
        message += `↳ Pasta Notu: "${item.cakeNote}"%0A`;
      }
      message += `%0A`;
    });

    message += `*Genel Toplam: ₺${totalPrice.toLocaleString()}*%0A`;

    if (district) {
      message += `Teslimat Bölgesi: ${district} (${coldChainStatus === "ready" ? "Soğuk Zincir Kurye" : "Yalıtımlı Kargo"})%0A`;
    }

    message += `%0AAdres ve teslimat detaylarımı paylaşmak istiyorum. Teşekkürler!`;

    const whatsappLink = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappLink, "_blank");
  };

  if (!showCart) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-[#141414]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 sm:p-7 text-white shadow-2xl max-h-[92vh] flex flex-col"
        >
          {/* Kapat Butonu */}
          <button
            onClick={() => setShowCart(false)}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white flex items-center justify-center text-lg font-bold transition"
            aria-label="Kapat"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Başlık */}
          <div className="pb-3 border-b border-white/10">
            <h2 className="text-2xl font-black text-[#FFA45B] flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              <span>Sepetim ({cart.length})</span>
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              Doğal çiftlik mahsulleri ve taze butik pastane siparişleriniz
            </p>
          </div>

          {/* İçerik */}
          <div className="flex-1 overflow-y-auto my-4 pr-1 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <p className="text-base font-bold text-gray-300">Sepetinizde ürün bulunmuyor.</p>
                <p className="text-xs text-gray-500 mt-1">
                  Doğal ürünlerimizi veya butik pastane koleksiyonumuzu inceleyebilirsiniz.
                </p>
              </div>
            ) : (
              cart.map((it, idx) => {
                const itemKey = it.cartItemId || `${it.name}-${it.variant || ""}-${it.frequency || ""}`;
                const priceNum = parseInt(it.price.replace(/[^\d]/g, "")) || 0;
                const totalItemPrice = priceNum * it.quantity;

                return (
                  <div
                    key={idx}
                    className="p-3.5 bg-white/[0.04] border border-white/10 hover:border-white/20 rounded-2xl transition flex flex-col gap-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {it.image && (
                          <img
                            src={it.image}
                            alt={it.name}
                            className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                          />
                        )}
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-bold text-sm text-white">{it.name}</span>
                            {it.variant && (
                              <span className="text-[10px] font-semibold bg-[#FFA45B]/20 text-[#FFA45B] px-2 py-0.5 rounded-full border border-[#FFA45B]/30">
                                {it.variant}
                              </span>
                            )}
                            {it.isSubscription && (
                              <span className="text-[10px] font-black bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                                <RefreshCw className="w-2.5 h-2.5 animate-spin" />
                                {it.frequency || "Haftalık"} Abonelik (%10 İndirimli)
                              </span>
                            )}
                          </div>

                          {it.customBoxItems && it.customBoxItems.length > 0 && (
                            <p className="text-[11px] text-gray-400 mt-1 line-clamp-1">
                              İçerik: {it.customBoxItems.join(", ")}
                            </p>
                          )}

                          {it.cakeNote && (
                            <p className="text-[11px] text-amber-300/90 mt-0.5 italic">
                              Not: &ldquo;{it.cakeNote}&rdquo;
                            </p>
                          )}

                          <div className="text-xs text-gray-400 mt-1">
                            Birim: <span className="text-gray-300 font-medium">{it.price}</span>
                          </div>
                        </div>
                      </div>

                      {/* Silme Butonu */}
                      <button
                        onClick={() => removeFromCart(itemKey)}
                        className="text-gray-500 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/5 transition"
                        title="Ürünü Kaldır"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Alt Kısım: Miktar ve Toplam Tutar */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(itemKey, -1)}
                          className="w-7 h-7 bg-white/10 text-white rounded-lg hover:bg-white/20 transition font-bold text-sm flex items-center justify-center disabled:opacity-30"
                          disabled={it.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-bold text-sm text-white">
                          {it.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(itemKey, 1)}
                          className="w-7 h-7 bg-white/10 text-white rounded-lg hover:bg-white/20 transition font-bold text-sm flex items-center justify-center disabled:opacity-30"
                          disabled={it.quantity >= (it.stock || 99)}
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-extrabold text-[#FFA45B]">
                          ₺{totalItemPrice.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Soğuk Zincir & Lojistik Bölge Sorgulama */}
            {hasColdChainItem && cart.length > 0 && (
              <div className="p-3.5 bg-black/40 border border-white/15 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-white">
                  <Truck className="w-4 h-4 text-[#FFA45B]" />
                  <span>Hassas Ürün Soğuk Zincir Teslimat Kontrolü</span>
                </div>
                <p className="text-[11px] text-gray-400">
                  Günlük süt, taze pastane ve hassas ürünler için teslimat bölgenizi yazarak kurye uygunluğunu kontrol edin:
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="İlçe veya İl yazın (örn: Kadıköy, Beşiktaş, Giresun...)"
                      value={district}
                      onChange={(e) => checkColdChain(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#FFA45B]"
                    />
                  </div>
                </div>

                {coldChainStatus === "ready" && (
                  <div className="p-2 bg-emerald-500/15 border border-emerald-500/30 rounded-xl flex items-center gap-2 text-[11px] text-emerald-300 font-semibold">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>Harika! Bu bölgeye günlük soğuk zincir özel kurye teslimatımız mevcuttur.</span>
                  </div>
                )}

                {coldChainStatus === "standard" && (
                  <div className="p-2 bg-amber-500/15 border border-amber-500/30 rounded-xl flex items-center gap-2 text-[11px] text-amber-300 font-semibold">
                    <ShieldCheck className="w-4 h-4 flex-shrink-0 text-amber-400" />
                    <span>Özel ısı yalıtımlı buz akülü kutularımızla 24 saatte güvenle kargolanacaktır.</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Alt Kısım - Toplam & Butonlar */}
          {cart.length > 0 && (
            <div className="pt-3 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-gray-300">Ödenecek Tutar</span>
                  {hasSubscriptionItem && (
                    <span className="block text-[10px] text-emerald-400">
                      *Abonelik indirimleri fiyata dahildir
                    </span>
                  )}
                </div>
                <span className="text-2xl font-black text-[#FFA45B]">
                  ₺{totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowCart(false)}
                  className="px-4 py-3 bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl text-xs text-white font-bold transition"
                >
                  Alışverişe Devam
                </button>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="flex-1 py-3 px-4 bg-[#26cc3c] hover:bg-[#20a330] text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 transition active:scale-[0.98]"
                >
                  <MessageCircle className="w-5 h-5 fill-current" />
                  <span>WhatsApp ile Siparişi Tamamla</span>
                </button>
              </div>

              {hasSubscriptionItem && (
                <button
                  onClick={() => {
                    setShowCart(false);
                    setShowSubscriptionModal(true);
                  }}
                  className="w-full text-center text-xs text-gray-400 hover:text-[#FFA45B] transition py-1 underline font-medium"
                >
                  Aboneliklerimi Yönetmek İstiyorum →
                </button>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
