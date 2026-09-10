// app/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

export type CartItem = {
  cartItemId?: string;
  name: string;
  image: string;
  info?: string;
  price: string;
  quantity: number;
  stock: number;
  variant?: string; // E.g., "4-6 Kişilik", "8-10 Kişilik"
  isSubscription?: boolean;
  frequency?: "Haftalık" | "2 Haftada Bir" | "Aylık";
  subscriptionDiscount?: number; // e.g. 10
  customBoxItems?: string[]; // for Mix & Match boxes
  cakeNote?: string; // for custom cakes
  deliveryDate?: string;
  coldChainRequired?: boolean;
};

export interface UserSubscription {
  id: string;
  name: string;
  frequency: "Haftalık" | "2 Haftada Bir" | "Aylık";
  price: string;
  status: "active" | "paused";
  nextDelivery: string;
  items: string[];
  createdDate: string;
}

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (cartItemIdOrName: string) => void;
  updateQuantity: (cartItemIdOrName: string, delta: number) => void;
  clearCart: () => void;
  totalPrice: number;
  showCart: boolean;
  setShowCart: (v: boolean) => void;
  // Abonelik Yönetimi
  subscriptions: UserSubscription[];
  addSubscription: (sub: Omit<UserSubscription, "id" | "createdDate">) => void;
  pauseSubscription: (id: string) => void;
  resumeSubscription: (id: string) => void;
  cancelSubscription: (id: string) => void;
  postponeSubscriptionDelivery: (id: string, newDate: string) => void;
  showSubscriptionModal: boolean;
  setShowSubscriptionModal: (v: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [subscriptions, setSubscriptions] = useState<UserSubscription[]>([]);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);

  // LocalStorage senkronizasyonu
  useEffect(() => {
    try {
      const savedSubs = localStorage.getItem("user_subscriptions");
      if (savedSubs) {
        setSubscriptions(JSON.parse(savedSubs));
      } else {
        // Örnek başlangıç aboneliği (kullanıcı paneli hemen canlı ve dolu görünsün)
        const defaultSub: UserSubscription = {
          id: "SUB-" + Date.now(),
          name: "Haftalık Taze Çiftlik Sepeti (Mix & Match)",
          frequency: "Haftalık",
          price: "₺540",
          status: "active",
          nextDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
          items: ["2L Günlük Köy Sütü", "15'li Gezen Tavuk Yumurtası", "2kg Mevsim Meyvesi"],
          createdDate: new Date().toISOString().split("T")[0],
        };
        setSubscriptions([defaultSub]);
        localStorage.setItem("user_subscriptions", JSON.stringify([defaultSub]));
      }
    } catch (e) {
      console.warn("Subscription load error:", e);
    }
  }, []);

  const saveSubsToStorage = (newSubs: UserSubscription[]) => {
    setSubscriptions(newSubs);
    try {
      localStorage.setItem("user_subscriptions", JSON.stringify(newSubs));
    } catch (e) {
      console.error(e);
    }
  };

  const getItemKey = (item: { name: string; variant?: string; frequency?: string; cartItemId?: string }) => {
    if (item.cartItemId) return item.cartItemId;
    return `${item.name}-${item.variant || ""}-${item.frequency || ""}`;
  };

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const key = getItemKey(item);
    const itemWithKey = { ...item, cartItemId: key };

    setCart((prev) => {
      const existing = prev.find((i) => getItemKey(i) === key);
      const addQty = item.quantity || 1;
      if (existing) {
        const newQty = Math.min(existing.quantity + addQty, existing.stock || 99);
        return prev.map((i) =>
          getItemKey(i) === key ? { ...i, quantity: newQty } : i
        );
      }
      return [...prev, { ...itemWithKey, quantity: addQty }];
    });

    // Eğer bir abonelik ürünü sepete ekleniyorsa, abonelik listesine de ekleyelim
    if (item.isSubscription) {
      const nextDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
      const newSub: UserSubscription = {
        id: "SUB-" + Date.now(),
        name: `${item.name} (${item.frequency || "Haftalık"} Abonelik)`,
        frequency: item.frequency || "Haftalık",
        price: item.price,
        status: "active",
        nextDelivery: nextDate,
        items: item.customBoxItems || [item.name],
        createdDate: new Date().toISOString().split("T")[0],
      };
      saveSubsToStorage([newSub, ...subscriptions]);
    }
  };

  const removeFromCart = (cartItemIdOrName: string) =>
    setCart((prev) => prev.filter((i) => getItemKey(i) !== cartItemIdOrName && i.name !== cartItemIdOrName));

  const updateQuantity = (cartItemIdOrName: string, delta: number) =>
    setCart((prev) =>
      prev.map((i) => {
        if (getItemKey(i) === cartItemIdOrName || i.name === cartItemIdOrName) {
          const maxStock = i.stock || 99;
          return { ...i, quantity: Math.min(Math.max(i.quantity + delta, 1), maxStock) };
        }
        return i;
      })
    );

  const clearCart = () => setCart([]);

  const totalPrice = useMemo(
    () =>
      cart.reduce((acc, item) => {
        const num = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
        return acc + num * item.quantity;
      }, 0),
    [cart]
  );

  // Abonelik Metotları
  const addSubscription = (sub: Omit<UserSubscription, "id" | "createdDate">) => {
    const newSub: UserSubscription = {
      ...sub,
      id: "SUB-" + Date.now(),
      createdDate: new Date().toISOString().split("T")[0],
    };
    saveSubsToStorage([newSub, ...subscriptions]);
  };

  const pauseSubscription = (id: string) => {
    const updated = subscriptions.map((s) => (s.id === id ? { ...s, status: "paused" as const } : s));
    saveSubsToStorage(updated);
  };

  const resumeSubscription = (id: string) => {
    const updated = subscriptions.map((s) => (s.id === id ? { ...s, status: "active" as const } : s));
    saveSubsToStorage(updated);
  };

  const cancelSubscription = (id: string) => {
    const updated = subscriptions.filter((s) => s.id !== id);
    saveSubsToStorage(updated);
  };

  const postponeSubscriptionDelivery = (id: string, newDate: string) => {
    const updated = subscriptions.map((s) => (s.id === id ? { ...s, nextDelivery: newDate } : s));
    saveSubsToStorage(updated);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalPrice,
        showCart,
        setShowCart,
        subscriptions,
        addSubscription,
        pauseSubscription,
        resumeSubscription,
        cancelSubscription,
        postponeSubscriptionDelivery,
        showSubscriptionModal,
        setShowSubscriptionModal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
