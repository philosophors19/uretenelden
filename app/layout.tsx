import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "./context/CartContext";
import CartModal from "./modal/CartModal";
import SubscriptionManagerModal from "./components/SubscriptionManagerModal";
import Header from "./components/Header";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Üretenelden | Doğal Çiftlik & Butik Pastane",
  description: "Doğal ürünler, tarladan kapınıza periyodik abonelikler ve el emeği butik pastane lezzetleri",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
        <CartProvider>
          {/* Her sayfada header görünsün */}
          <Header />

          {/* Sepet Modal (global) */}
          <CartModal />

          {/* Abonelik Yönetim Modalı (global) */}
          <SubscriptionManagerModal />

          {/* Sayfa içerikleri */}
          <main className="pt-20">{children}</main>

          <SpeedInsights />
        </CartProvider>
      </body>
    </html>
  );
}
