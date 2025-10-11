// app/context/CartContext.tsx
"use client";

import React, { createContext, useContext, useMemo, useState } from "react";

export type CartItem = {
  name: string;
  image: string;
  info?: string;
  price: string;
  quantity: number;
  stock: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (name: string) => void;
  updateQuantity: (name: string, delta: number) => void;
  totalPrice: number;
  showCart: boolean;
  setShowCart: (v: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        const newQty = Math.min(existing.quantity + 1, existing.stock);
        return prev.map((i) =>
          i.name === item.name ? { ...i, quantity: newQty } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (name: string) =>
    setCart((prev) => prev.filter((i) => i.name !== name));

  const updateQuantity = (name: string, delta: number) =>
    setCart((prev) =>
      prev.map((i) =>
        i.name === name
          ? { ...i, quantity: Math.min(Math.max(i.quantity + delta, 1), i.stock) }
          : i
      )
    );

  const totalPrice = useMemo(
    () =>
      cart.reduce((acc, item) => {
        const num = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
        return acc + num * item.quantity;
      }, 0),
    [cart]
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, totalPrice, showCart, setShowCart }}
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
