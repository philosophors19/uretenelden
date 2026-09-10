"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { 
  Calendar, 
  PauseCircle, 
  PlayCircle, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  RefreshCw, 
  AlertCircle,
  X,
  MessageCircle,
  PackageCheck
} from "lucide-react";

export default function SubscriptionManagerModal() {
  const { 
    subscriptions, 
    pauseSubscription, 
    resumeSubscription, 
    cancelSubscription, 
    postponeSubscriptionDelivery,
    showSubscriptionModal,
    setShowSubscriptionModal 
  } = useCart();

  const [editingDateId, setEditingDateId] = useState<string | null>(null);
  const [newDateVal, setNewDateVal] = useState("");
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!showSubscriptionModal) return null;

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 2500);
  };

  const handlePostpone = (id: string) => {
    if (!newDateVal) return;
    postponeSubscriptionDelivery(id, newDateVal);
    setEditingDateId(null);
    setNewDateVal("");
    showNotification("Teslimat tarihi başarıyla güncellendi!");
  };

  const handleWhatsAppHelp = (subName: string, subId: string) => {
    const phone = "905319412442";
    const msg = `Merhaba, ${subName} (Abonelik Kodu: ${subId}) hakkında teslimat veya içerik değişikliği talebim var.`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#141414] border border-white/15 rounded-3xl p-6 sm:p-8 text-white shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FFA45B]/20 border border-[#FFA45B]/40 flex items-center justify-center text-[#FFA45B]">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  Abonelik Yönetim Paneli
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Tarladan Sofraya düzenli siparişlerinizi buradan kolayca yönetin
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowSubscriptionModal(false)}
              className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center text-gray-400 hover:text-white transition"
              aria-label="Kapat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Toast Notification */}
          {successMsg && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{successMsg}</span>
            </motion.div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto my-5 pr-1 space-y-4">
            {subscriptions.length === 0 ? (
              <div className="text-center py-12 px-4 bg-white/5 rounded-2xl border border-dashed border-white/15">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#FFA45B]/10 flex items-center justify-center text-[#FFA45B]">
                  <PackageCheck className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Henüz Aktif Bir Aboneliğiniz Yok</h4>
                <p className="text-sm text-gray-400 mt-2 max-w-md mx-auto">
                  Günlük taze süt, serbest gezen yumurta ve haftalık meyve sepetlerimizle tarlanın tazeliğini %10 indirimle kapınıza getirebilirsiniz.
                </p>
                <button
                  onClick={() => {
                    setShowSubscriptionModal(false);
                    const el = document.getElementById("subscription-section");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="mt-5 px-6 py-2.5 bg-[#FFA45B] hover:bg-[#ff9447] text-black font-bold text-xs rounded-full transition shadow-lg"
                >
                  Abonelik Paketlerini Keşfet
                </button>
              </div>
            ) : (
              subscriptions.map((sub) => {
                const isActive = sub.status === "active";
                return (
                  <div
                    key={sub.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isActive 
                        ? "bg-white/[0.04] border-white/15 hover:border-[#FFA45B]/40" 
                        : "bg-black/40 border-white/10 opacity-75"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full ${
                              isActive
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                            }`}
                          >
                            {isActive ? "● Aktif Abonelik" : "⏸ Duraklatıldı"}
                          </span>
                          <span className="text-[11px] font-semibold text-[#FFA45B] bg-[#FFA45B]/10 px-2 py-0.5 rounded-md border border-[#FFA45B]/20">
                            {sub.frequency} Teslimat
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white mt-1.5">{sub.name}</h4>
                      </div>

                      <div className="text-left sm:text-right">
                        <span className="text-xl font-extrabold text-[#FFA45B]">{sub.price}</span>
                        <p className="text-[11px] text-gray-400">/ her teslimatta</p>
                      </div>
                    </div>

                    {/* Paket Detayları & Sonraki Teslimat */}
                    <div className="py-3 text-xs space-y-2">
                      {sub.items && sub.items.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 items-center text-gray-300">
                          <span className="text-gray-400 font-medium">Kutu İçeriği:</span>
                          {sub.items.map((it, idx) => (
                            <span key={idx} className="bg-white/10 px-2 py-0.5 rounded-md text-[11px] text-gray-200">
                              {it}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Calendar className="w-4 h-4 text-[#FFA45B]" />
                          <span>Sonraki Teslimat:</span>
                          <span className="font-bold text-white bg-white/10 px-2 py-0.5 rounded">
                            {sub.nextDelivery || "Belirlenmedi"}
                          </span>
                        </div>

                        {/* Erteleme Input Toggle */}
                        {editingDateId === sub.id ? (
                          <div className="flex items-center gap-2 mt-1 sm:mt-0">
                            <input
                              type="date"
                              value={newDateVal}
                              onChange={(e) => setNewDateVal(e.target.value)}
                              className="bg-black/60 border border-white/30 rounded-lg px-2 py-1 text-xs text-white"
                            />
                            <button
                              onClick={() => handlePostpone(sub.id)}
                              className="px-2.5 py-1 bg-[#26cc3c] text-white rounded-lg text-xs font-bold hover:bg-[#20a330]"
                            >
                              Kaydet
                            </button>
                            <button
                              onClick={() => setEditingDateId(null)}
                              className="px-2 py-1 bg-white/10 text-gray-300 rounded-lg text-xs hover:bg-white/20"
                            >
                              İptal
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              setEditingDateId(sub.id);
                              setNewDateVal(sub.nextDelivery || "");
                            }}
                            className="text-xs text-[#FFA45B] hover:underline flex items-center gap-1 font-semibold"
                          >
                            <Clock className="w-3.5 h-3.5" />
                            Tarihi Değiştir
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Eylem Butonları */}
                    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/10">
                      {isActive ? (
                        <button
                          onClick={() => {
                            pauseSubscription(sub.id);
                            showNotification("Abonelik geçici olarak duraklatıldı.");
                          }}
                          className="px-3.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <PauseCircle className="w-4 h-4" />
                          <span>Aboneliği Duraklat</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            resumeSubscription(sub.id);
                            showNotification("Abonelik yeniden aktif edildi!");
                          }}
                          className="px-3.5 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>Devam Ettir</span>
                        </button>
                      )}

                      <button
                        onClick={() => handleWhatsAppHelp(sub.name, sub.id)}
                        className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-gray-300 rounded-xl text-xs font-medium flex items-center gap-1.5 transition"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-[#26cc3c]" />
                        <span>WhatsApp Destek</span>
                      </button>

                      <button
                        onClick={() => {
                          if (confirm("Bu aboneliği kalıcı olarak iptal etmek istediğinize emin misiniz?")) {
                            cancelSubscription(sub.id);
                            showNotification("Abonelik iptal edildi.");
                          }
                        }}
                        className="ml-auto px-3 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-medium flex items-center gap-1.5 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>İptal Et</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Info */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-400">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FFA45B]" />
              <span>Abonelere özel her teslimatta soğuk zincir kurye güvencesi.</span>
            </div>
            <button
              onClick={() => setShowSubscriptionModal(false)}
              className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl font-bold transition w-full sm:w-auto"
            >
              Tamam
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
