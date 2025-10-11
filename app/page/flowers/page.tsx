"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

interface Item {
  name: string;
  image: string;
  info: string;
  price: string;
  stock: number; // ✅ string değil
}

const allItems: Item[] = [
  { name: "Kavrulmuş Fındık", image: "/hazelnut-main.jpg", info: "Doğal ve çıtır kavrulmuş fındık.", price: "₺180/kg", category: "Fındık Ürünleri", stock: 10 },
  { name: "Çiğ Fındık", image: "/hazelnut-main.jpg", info: "Katkısız ve doğal çiğ fındık.", price: "₺170/kg", category: "Fındık Ürünleri", stock: 5 },
  { name: "Tuzlu Fındık", image: "/hazelnut-main.jpg", info: "Hafif tuzlanmış kavrulmuş fındık.", price: "₺190/kg", category: "Fındık Ürünleri", stock: 8 },
  { name: "250gr Fındık", image: "/hazelnut-paste-main.jpg", info: "Doğal fındık ezmesi.", price: "₺90/300g", category: "Hediyelik Ürünler", stock: 12 },
  { name: "200gr Bal", image: "/hazelnut-paste-main.jpg", info: "Şeker ilavesiz fındık ezmesi.", price: "₺100/300g", category: "Hediyelik Ürünler", stock: 7 },
  { name: "Kakaolu Fındık Ezmesi", image: "/hazelnut-paste-main.jpg", info: "Fındık ve kakao karışımı.", price: "₺110/300g", category: "Hediyelik Ürünler", stock: 6 },
  { name: "Fındıklı Bar", image: "/hazelnut-snacks-main.jpg", info: "Enerji dolu fındıklı tahıl barı.", price: "₺25/adet", category: "Fındıklı Atıştırmalıklar", stock: 15 },
  { name: "Çikolatalı Fındık Draje", image: "/hazelnut-snacks-main.jpg", info: "Fındık ve çikolata uyumu.", price: "₺150/500g", category: "Fındıklı Atıştırmalıklar", stock: 4 },
  { name: "Ballı Kavrulmuş Fındık", image: "/hazelnut-snacks-main.jpg", info: "Bal ile tatlandırılmış kavrulmuş fındık.", price: "₺200/kg", category: "Fındıklı Atıştırmalıklar", stock: 9 },
  { name: "Ev Yapımı Pekmez", image: "/natural-products-main.jpg", info: "Doğal üzüm pekmezi.", price: "₺80/500g", category: "Doğal Tarım Ürünleri", stock: 10 },
  { name: "Köy Balı", image: "/natural-products-main.jpg", info: "Katkısız yayla balı.", price: "₺180/850g", category: "Doğal Tarım Ürünleri", stock: 5 },
  { name: "Ceviz İçi", image: "/natural-products-main.jpg", info: "Kabuksuz doğal ceviz içi.", price: "₺200/kg", category: "Doğal Tarım Ürünleri", stock: 7 },
];

const categories = ["Fındık Ürünleri", "Hediyelik Ürünler", "Fındıklı Atıştırmalıklar", "Doğal Tarım Ürünleri"];

export default function ProductsPage() {
  const { cart, addToCart, showCart, setShowCart } = useCart();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredItems =
    selectedCategories.length === 0
      ? allItems
      : allItems.filter(item => selectedCategories.includes(item.category));

  return (
    <div className="bg-[#F8F1E5] min-h-screen relative font-sans text-gray-900">
      {/* Background video */}
      <video autoPlay loop muted playsInline className="fixed top-0 left-0 w-full h-full object-cover z-0 blur-lg">
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full flex justify-between items-center p-6 text-white bg-black/30 backdrop-blur-lg z-50 transition-all">
          <Link href="/" className="text-2xl font-bold hover:text-[#FFA45B]">
            Ana Sayfa
          </Link>
          <h1 className="text-3xl font-extrabold">Fındık Ve Kuruyemiş</h1>
          <button
            onClick={() => setShowCart(true)}
            className="relative px-4 py-2 bg-[#FFA45B] text-white rounded-lg font-semibold"
          >
            Sepetim ({cart.length})
          </button>
        </header>

        {/* Main Content */}
        <div className="pt-40 flex gap-8 max-w-7xl mx-auto px-6 lg:px-0">
          {/* Sidebar filtre */}
          <aside className="w-64 flex-shrink-0 bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg mt-10">
            <h3 className="text-xl font-semibold mb-4 text-white">Kategoriler</h3>
            {categories.map((cat, idx) => (
              <label key={idx} className="flex items-center gap-2 text-white mb-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="accent-[#FFA45B]"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => toggleCategory(cat)}
                />
                {cat}
              </label>
            ))}
          </aside>

          {/* Product Grid */}
          <main className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 flex flex-col items-center overflow-hidden transition-transform duration-300 hover:scale-105 relative"
              >
                <div className="relative w-full h-60 rounded-t-xl overflow-hidden shadow-lg border-b border-white/20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-opacity duration-500 hover:opacity-100"
                    unoptimized
                  />
                </div>
                <div className="text-center p-4 flex flex-col items-center">
                  <h3 className="text-2xl font-semibold text-white">{item.name}</h3>
                  <p className="mt-2 text-gray-300 text-sm">{item.info}</p>
                  <p className="mt-2 text-lg font-bold text-[#FFA45B]">{item.price}</p>
                  <p className="text-gray-400 text-sm mt-1">Stok: {item.stock}</p>
                  <button
                    disabled={item.stock <= 0}
                    onClick={() => addToCart({ ...item, quantity: 1 })}
                    className={`mt-4 px-6 py-2 font-semibold rounded-xl shadow-md text-white transition-all duration-300 ${
                      item.stock > 0 ? "bg-[#26cc3c] hover:bg-[#20a330]" : "bg-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {item.stock > 0 ? "Sepete Ekle" : "Stokta Yok"}
                  </button>
                </div>
              </div>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
}
