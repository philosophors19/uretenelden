import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import {CartButton} from "./components/CartButton"; // CartButton import edildi
import CartModal from "./modal/CartModal";   // Modal import edildi

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Üretenelden",
  description: "Doğal ürünler ve el emeği lezzetler",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        <CartProvider>
          {/* Sepet Butonu */}
          <CartButton />

          {/* Modal */}
          <CartModal />

          {/* Sayfa içerikleri */}
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
