"use client";

import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CartModal() {
  const { cart, removeFromCart, updateQuantity, totalPrice, showCart, setShowCart } = useCart();

  if (!showCart) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="relative w-[90%] max-w-xl bg-black/60 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 text-white shadow-lg"
      >
        {/* Kapat Butonu */}
        <button
          onClick={() => setShowCart(false)}
          className="absolute top-4 right-4 text-gray-300 hover:text-white text-2xl font-bold"
          aria-label="Kapat"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#FFA45B] text-center">
          Sepetim ({cart.length})
        </h2>

        {cart.length === 0 ? (
          <p className="text-center text-gray-300">Sepetiniz boş.</p>
        ) : (
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-900">
            {cart.map((it, idx) => {
              // Price string'ini integer yap ve quantity ile çarp
              const priceNum = parseInt(it.price.replace(/[^\d]/g, "")) || 0;
              const totalItemPrice = priceNum * it.quantity;

              return (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-black/40 border border-white/10 rounded-xl p-3"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold">{it.name}</span>
                    <span className="text-sm text-gray-400">
                      ₺{totalItemPrice.toLocaleString()}
                    </span>
                  </div>

                  {/* Miktar Butonları */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(it.name, -1)}
                      className="w-8 h-8 bg-white/10 text-white rounded hover:bg-white/20 transition font-bold"
                      disabled={it.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-6 text-center">{it.quantity}</span>
                    <button
                      onClick={() => updateQuantity(it.name, 1)}
                      className="w-8 h-8 bg-white/10 text-white rounded hover:bg-white/20 transition font-bold"
                      disabled={it.quantity >= it.stock}
                    >
                      +
                    </button>
                    <span className="text-gray-400 text-sm">/ {it.stock}</span>
                    <button
                      onClick={() => removeFromCart(it.name)}
                      className="ml-3 text-sm text-red-400 hover:text-red-500 font-semibold"
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="border-t border-white/20 pt-4 mt-2 flex justify-between font-bold text-white">
              <span>Toplam</span>
              <span className="text-[#FFA45B]">
                ₺{totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* Butonlar */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => setShowCart(false)}
            className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white hover:bg-white/20 transition font-semibold"
          >
            Kapat
          </button>
          <button className="flex-1 px-4 py-2 bg-[#26cc3c] rounded-xl text-white font-semibold hover:bg-[#20a330] transition">
            Satın Al
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
