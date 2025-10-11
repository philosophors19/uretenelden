"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";  // ✅ Image bileşenini import ettik
import Link from "next/link";
//import { BrowserRouter as Router, Routes, Route } from "react-router"
//import Fruits from "./page/fruits/page";

import { useCart } from "./context/CartContext"; // 📌 ekle
import { createContext, useContext, ReactNode } from "react";

interface Item {
  name: string;
  image: string;
  info: string;
  price: string;
  stock: number; // ✅ string değil
}

interface Category {
  category: string;
  image: string;
  description: string;
  link: string; // her kategoriye kendi sayfa linki
  items: Item[];
}

export default function Home() {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };
  
 const { addToCart } = useCart(); // ✅ sepete ürün ekleme fonksiyonu

  const categories = [
    {
      category: "Fındık & Kuruyemiş",
      description:
        "Karadeniz’in taze ve aromatik fındıkları ile katkısız doğal kuruyemişleri, üreticiden sofranıza en kısa yoldan ulaştırıyoruz.",
      link: "/page/flowers",
      items: [
        {
          name: "Kavrulmuş Fındık",
          image: "/hazelnut-main.jpg",
          info: "Doğal ve çıtır kavrulmuş fındık.",
          price: "₺180/kg",
          stock: "0"
        },
        {
          name: "Çiğ Fındık",
          image: "/hazelnut-main.jpg",
          info: "Katkısız ve doğal çiğ fındık.",
          price: "₺190/kg",
           stock: "5"
        },
        {
          name: "Tuzlu Fındık",
          image: "/hazelnut-main.jpg",
          info: "Hafif tuzlanmış kavrulmuş fındık.",
          price: "₺190/kg",
           stock: "5"
        },
        {
          name: "Karışık Kuruyemiş",
          image: "/hazelnut-main.jpg",
          info: "Enerji dolu özel karışım.",
          price: "₺160/kg",
           stock: "5"
        },
      ],
    },
    {
      category: "Taze Sebze & Meyve",
      description:
        "Mevsiminde toplanmış, pestisitsiz ve katkısız sebze–meyveler ile sofralarınıza doğallık ve tazelik getiriyoruz.",
      link: "/page/fruits",
      items: [
        {
          name: "Domates",
          image: "/catalog-sebzemeyve.jpg",
          info: "Taze ve sulu domates.",
          price: "₺12/kg",
           stock: "5"
        },
        {
          name: "Salatalık",
          image: "/catalog-sebzemeyve.jpg",
          info: "Köy bahçesinden taze salatalık.",
          price: "₺10/kg",
           stock: "5"
        },
        {
          name: "Elma",
          image: "/catalog-sebzemeyve.jpg",
          info: "Tatlı ve sulu kırmızı elma.",
          price: "₺15/kg",
           stock: "5"
        },
        {
          name: "Armut",
          image: "/catalog-sebzemeyve.jpg",
          info: "Doğal ve aromatik armut.",
          price: "₺18/kg",
           stock: "5"
        },
      ],
    },
    {
      category: "Süt & Yumurta Ürünleri",
      description:
        "Günlük köy sütü, taze peynir çeşitleri ve serbest gezen tavuk yumurtaları ile sağlıklı ve besleyici seçenekler sunuyoruz.",
      link: "/page/trees",
      items: [
        {
          name: "Taze Süt",
          image: "/catalog-sut.jpg",
          info: "Günlük sağımdan sofranıza.",
          price: "₺25/L",
           stock: "5"
        },
        {
          name: "Beyaz Peynir",
          image: "/catalog-sut.jpg",
          info: "Doğal ve katkısız köy peyniri.",
          price: "₺140/kg",
           stock: "5"
        },
        {
          name: "Tereyağı",
          image: "/catalog-sut.jpg",
          info: "Tamamen doğal yayık tereyağı.",
          price: "₺220/kg",
           stock: "5"
        },
        {
          name: "Köy Yumurtası",
          image: "/catalog-sut.jpg",
          info: "Serbest gezen tavuk yumurtası.",
          price: "₺55/10'lu",
           stock: "5"
        },
      ],
    },
  ];

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  
  return (
    <div className="bg-[#F8F1E5] text-gray-900 font-sans relative">
      {/* Arka Plandaki Hareketli Çizgiler */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0) 70%)",
          transform: `translateY(${offsetY * 0.2}px)`,
        }}
      />

      {/* Header bg-black/30 backdrop-blur-lg */}
 <header className="fixed top-0 left-0 w-full z-40 bg-black/30 backdrop-blur-lg shadow-md px-6 lg:px-12 py-4 flex items-center justify-between">
  {/* Logo Sol */}
  <div className="flex items-center gap-3">
    <Image src="/logo.png" alt="Logo" width={50} height={50} className="object-contain" />
    <span className="text-2xl font-bold text-white tracking-wide">Üretenelden</span>
  </div>

  {/* Navigasyon Ortada */}
  <nav className="hidden lg:flex gap-12 text-white font-medium text-lg mx-auto">
    <a href="#about" className="relative group">
      Hakkında
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#FFA45B] group-hover:w-full transition-all duration-300"></span>
    </a>
    <a href="#services" className="relative group">
      Hizmetler
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#FFA45B] group-hover:w-full transition-all duration-300"></span>
    </a>
    <a href="#catalog" className="relative group">
      Ürünlerimiz
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#FFA45B] group-hover:w-full transition-all duration-300"></span>
    </a>
    <a href="#contact" className="relative group">
      İletişim
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#FFA45B] group-hover:w-full transition-all duration-300"></span>
    </a>
  </nav>

  {/* Sepet Sağ */}
  <div className="ml-auto">
    <button className="relative px-4 py-2 bg-[#FFA45B] text-white rounded-lg font-semibold shadow-md hover:bg-[#FFB75B] transition">
      Sepetim (3)
    </button>
  </div>

  {/* Hamburger (Mobil) */}
  <div className="lg:hidden absolute right-6">
    <button className="text-white text-3xl">☰</button>
  </div>
</header>

      <div className="relative w-full min-h-screen overflow-hidden">
  {/* Arka Plan Videosu */}
  <video 
    autoPlay 
    loop 
    muted 
    playsInline
    className="fixed top-0 left-0 w-full h-full object-cover z-0 " 
    //blur-md
  >
    <source src="/bg.mp4" type="video/mp4" />
  </video>
<section
  className="h-screen flex flex-col items-center justify-center relative bg-cover bg-center bg-fixed z-10"
  style={{ backgroundImage: "url('/arkaplan.jpg')" }}
>
  {/* Koyu Overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-transparent z-0"></div>

  {/* İçerik */}
  <div className="text-center text-white relative z-10 space-y-8 px-6">
    
    {/* ✅ LOGO */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="flex justify-center"
    >
      <Image
        src="/logo.png"      // <-- Turuncu logonuzun dosya adı
        alt="Üretenelden Logo"
        width={140}                 // Boyutu ihtiyaca göre ayarlayın
        height={140}
        className="mx-auto rounded-full shadow-lg"
        unoptimized
      />
    </motion.div>

    {/* Marka Adı */}
    <motion.h1
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="text-5xl md:text-6xl font-extrabold tracking-wide drop-shadow-lg"
    >
      Üretenelden
    </motion.h1>

    {/* Kısa Slogan */}
<motion.p
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.4 }}
  className="max-w-2xl mx-auto text-lg md:text-2xl text-white font-bold leading-relaxed text-center"
>
  Organik olarak ürettiğimiz ürünleri tarladan sofranıza direkt ulaştırıyoruz.
</motion.p>

    {/* Buton */}
    <motion.a
      href="#contact"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="inline-block px-10 py-4 text-lg font-medium rounded-full shadow-lg 
                 bg-gradient-to-r from-[#FFA45B] to-[#FF6F61] text-white 
                 hover:scale-105 hover:shadow-2xl transition-all duration-300"
    >
      İletişime Geç
    </motion.a>

    {/* Küçük Animasyonlu Dekoratif Noktalar */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2, duration: 1 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex space-x-2"
    >
      <div className="w-2 h-2 rounded-full bg-[#FFA45B] animate-bounce"></div>
      <div className="w-2 h-2 rounded-full bg-[#FF6F61] animate-bounce delay-200"></div>
      <div className="w-2 h-2 rounded-full bg-white animate-bounce delay-400"></div>
    </motion.div>
  </div>
</section>



  {/* Opaklık için Karanlık Katman */}
  <div className="absolute inset-0 bg-black/50"></div>

  {/* İçerik */}
  <div className="relative z-10">
    
   {/* Hakkında Bölümü */}
<section id="about" className="relative text-white py-40 px-6 lg:px-24 bg-gradient-to-b from-green-900/60 to-transparent">
  <h2 className="relative text-5xl font-bold text-center mb-16">
    Biz Kimiz
  </h2>

  <div className="relative z-10 max-w-6xl mx-auto space-y-24">
    {/* İlk Blok */}
    <div className="grid md:grid-cols-2 gap-20 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full h-72 relative"
      >
        <Image 
          src="/farm1.jpg"       // ✅ Tarlayı veya doğal ürünleri gösteren yeni bir görsel ekleyin
          alt="Doğal Ürünler"
          width={500} 
          height={300} 
          className="rounded-lg shadow-xl w-full h-full object-cover border border-white/20" 
          unoptimized
        />
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-lg opacity-90 leading-relaxed"
      >
        <h3 className="text-4xl font-semibold mb-6 text-[#FFA45B]">Tarladan Sofranıza</h3>
        <p>
          Üretenelden olarak yerel üreticilerle el ele veriyor,
          <strong> fındık, süt, yumurta, taze sebze ve meyveler</strong> gibi 
          tamamen doğal ürünleri doğrudan tarladan sizlere ulaştırıyoruz.
          Aracısız ve şeffaf üretim sürecimizle hem üreticiyi hem tüketiciyi koruyor,
          sofralarınıza <span className="text-[#FF6F61] font-bold">güven ve lezzet</span> katıyoruz.
        </p>
      </motion.div>
    </div>

    {/* İkinci Blok */}
    <div className="grid md:grid-cols-2 gap-20 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="text-lg opacity-90 leading-relaxed"
      >
        <h3 className="text-4xl font-semibold mb-6 text-[#FFA45B]">Doğallık ve Tazelik</h3>
        <p>
          Ürünlerimiz mevsiminde, katkısız ve taze olarak toplanır.
          Güne yeni toplanmış sebzeler, dalından koparılmış meyveler ve
          köy yumurtaları ile başlamanın keyfini sizlere sunuyoruz.
          <strong> Tarıma saygı, doğaya sevgi</strong> anlayışımızla,
          sağlıklı beslenmenin en güvenilir adresiyiz.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="w-full h-72 relative"
      >
        <Image 
          src="/farm2.jpg"      // ✅ Yeni tarımsal bir görsel ekleyin (hayvanlar, meyve kasaları vb.)
          alt="Taze Ürünler"
          width={500} 
          height={300} 
          className="rounded-lg shadow-xl w-full h-full object-cover border border-white/20" 
          unoptimized
        />
      </motion.div>
    </div>
  </div>
</section>

    <section id="services" className="relative py-32 text-white overflow-hidden">
  <h2 className="relative text-5xl font-bold text-center mb-16">Hizmetlerimiz</h2>

  <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-8 lg:px-20">
 {[
      {
        title: "Taze Fındık ve Kuruyemiş",
        image: "/arkaplan.jpg", // ✅ fındık fotoğrafı ekleyin
        description: "Karadeniz’in en kaliteli fındıklarını ve doğal kuruyemişleri doğrudan üreticiden sofranıza getiriyoruz."
      },
      {
        title: "Günlük Süt ve Süt Ürünleri",
        image: "/service-sut.jpg", // ✅ süt şişeleri, peynir görseli
        description: "Katkısız, taptaze köy sütü, peynir ve yoğurdu hijyenik koşullarda size ulaştırıyoruz."
      },
      {
        title: "Doğal Sebze ve Meyve",
        image: "/service-sebzemeyve.jpg", // ✅ bahçe sebze-meyve fotoğrafı
        description: "Mevsiminde toplanan, pestisitsiz ve doğal sebze meyvelerle sofralarınıza tazelik katın."
      },
      {
        title: "Organik Yumurta",
        image: "/service-yumurta.jpg", // ✅ köy yumurtası görseli
        description: "Serbest gezen tavuklarımızdan her sabah toplanan doğal ve besleyici yumurtalar."
      },
      {
        title: "Haftalık Abonelik Kutusu",
        image: "/service-kutu.jpg", // ✅ taze ürün kutusu görseli
        description: "Haftalık seçili ürün paketleri ile sebze, meyve ve süt ürünlerini düzenli olarak evinize ulaştırıyoruz."
      },
      {
        title: "Yerel Üretici İşbirliği",
        image: "/service-ureticiler.jpg", // ✅ çiftçi/üretici görseli
        description: "Bölgedeki üreticilerle iş birliği yaparak tarladan sofraya aracısız tedarik sağlıyoruz."
      },
      {
        title: "Çiftlik Ziyaret & Deneyim",
        image: "/service-ciftlik.jpg", // ✅ çiftlik turu fotoğrafı
        description: "Ailenizle birlikte çiftliğimizi ziyaret ederek ürünlerimizi kaynağında deneyimleyin."
      },
      {
        title: "Doğal Reçel & Katkısız Ürünler",
        image: "/service-recel.jpg", // ✅ reçel/konserve görseli
        description: "Kendi üretimimiz olan reçel, bal, zeytinyağı ve benzeri katkısız ürünleri güvenle tüketin."
      }
    ].map((service, index) => (
      <motion.div 
        key={index} 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: index * 0.1, ease: "easeInOut" }}
        viewport={{ once: false, amount: 0.2 }}
        className="relative w-full lg:w-72 xl:w-80 h-96 bg-white/10 backdrop-blur-lg shadow-lg border border-white/20 rounded-2xl overflow-hidden transition-transform duration-500 hover:scale-105 hover:bg-white/20"
      >
        <div className="absolute inset-0">
          <Image 
            src={service.image} 
            alt={service.title} 
            layout="fill" 
            objectFit="cover" 
            className="opacity-100 transition-opacity duration-500 hover:opacity-90"
            unoptimized
          />
        </div>
        <div className="relative z-10 w-full py-6 px-4 bg-black/60 backdrop-blur-lg rounded-b-2xl text-center">
          <h3 className="text-xl font-semibold text-white">{service.title}</h3>
          <p className="mt-2 text-gray-300 text-sm">{service.description}</p>
        </div>
      </motion.div>
    ))}
  </div>
</section>

{/*

<section id="catalog" className="relative py-40 text-white px-6 lg:px-24 overflow-hidden">
  <h2 className="relative text-5xl font-bold text-center mb-16">Ürünlerimiz</h2>

  <div className="relative z-10 max-w-7xl mx-auto space-y-16">
    {[
  { 
    title: "Fındık & Kuruyemiş", 
    desc: "Karadeniz’in taze ve aromatik fındıkları ile katkısız doğal kuruyemişleri, üreticiden sofranıza en kısa yoldan ulaştırıyoruz.", 
    img: "/arkaplan.jpg",        // ✅ fındık fotoğrafı ekleyin
    link: "/page/flowers"               // ✅ kendi sayfa yolunuza göre güncelleyin
  },
  { 
    title: "Taze Sebze & Meyve", 
    desc: "Mevsiminde toplanmış, pestisitsiz ve katkısız sebze–meyveler ile sofralarınıza doğallık ve tazelik getiriyoruz.", 
    img: "/catalog-sebzemeyve.jpg",    // ✅ sebze/meyve fotoğrafı ekleyin
    link: "/page/fruits"           // ✅ kendi sayfa yolunuza göre güncelleyin
  },
  { 
    title: "Süt & Yumurta Ürünleri", 
    desc: "Günlük köy sütü, taze peynir çeşitleri ve serbest gezen tavuk yumurtaları ile sağlıklı ve besleyici seçenekler sunuyoruz.", 
    img: "/catalog-sut.jpg",           // ✅ süt/peynir/yumurta fotoğrafı ekleyin
    link: "/page/trees"         // ✅ kendi sayfa yolunuza göre güncelleyin
  }
]

.map((item, index) => (
      <div key={index} className="grid md:grid-cols-2 gap-10 items-center">
        {index % 2 === 0 ? (
          <>
            {/* Resim 
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full h-52 md:h-64 lg:h-72 relative overflow-hidden rounded-xl shadow-lg border border-white/20 transition-transform duration-500 hover:scale-105"
            >
              <Image 
                src={item.img} 
                alt={item.title} 
                layout="fill" 
                objectFit="cover" 
                className="opacity-90 transition-opacity duration-500 hover:opacity-100"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 rounded-xl" />
              <div className="absolute bottom-4 left-6 text-white z-10">
                <h3 className="text-3xl font-bold">{item.title}</h3>
              </div>
              <Link href={item.link} className="absolute inset-0 z-20" />
            </motion.div>

            {/* Açıklama 
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg opacity-80 leading-relaxed"
            >
              {item.desc}
            </motion.div>
          </>
        ) : (
          <>
            {/* Açıklama 
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="text-lg opacity-80 leading-relaxed"
            >
              {item.desc}
            </motion.div>

            {/* Resim 
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full h-52 md:h-64 lg:h-72 relative overflow-hidden rounded-xl shadow-lg border border-white/20 transition-transform duration-500 hover:scale-105"
            >
              <Image 
                src={item.img} 
                alt={item.title} 
                layout="fill" 
                objectFit="cover" 
                className="opacity-90 transition-opacity duration-500 hover:opacity-100"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/40 rounded-xl" />
              <div className="absolute bottom-4 left-6 text-white z-10">
                <h3 className="text-3xl font-bold">{item.title}</h3>
              </div>
              <Link href={item.link} className="absolute inset-0 z-20" />
            </motion.div>
          </>
        )}
      </div>
    ))}
  </div>
</section>

*/}

    <section id="catalog" className="relative py-32 text-white px-6 lg:px-24 overflow-hidden">
      <h2
        className="relative text-5xl font-bold text-center mb-24 bg-cover bg-center py-24 text-white rounded-2xl overflow-hidden"
        style={{ backgroundImage: `url('/catalog-sebzemeyve.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/50 rounded-2xl" />
        <span className="relative z-10">Ürünlerimiz</span>
      </h2>

      <div className="max-w-7xl mx-auto space-y-24 relative z-10">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Başlık */}
            <div className="text-center">
              <h3 className="text-4xl font-semibold mb-2">{cat.category}</h3>
              <p className="text-gray-300 max-w-3xl mx-auto">{cat.description}</p>
            </div>

            {/* Ürün Kartları */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
  {cat.items.map((item, idx) => (
    <motion.div
      key={idx}
      whileHover={{ scale: 1.05 }}
      className="relative bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl overflow-hidden transition-transform"
    >
      <div className="relative w-full h-56">
        <Image
          src={item.image}
          alt={item.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-2xl"
          unoptimized
        />
      </div>

      <div className="p-4 text-center bg-black/50 rounded-b-2xl">
        <h4 className="text-xl font-semibold">{item.name}</h4>
        <p className="text-sm text-gray-300 mt-2">{item.info}</p>
        <p className="text-[#FFA45B] font-bold mt-2">{item.price}</p>
        {/* Stok Gösterimi */}
        <p className="text-gray-300 text-sm mt-1">Stok: {item.stock}</p>

        {/* Sepete Ekle Butonu */}
        <button
          onClick={() =>
            addToCart({
              name: item.name,
              image: item.image,
              price: item.price,
              stock: item.stock,
              quantity: 1, // başlangıç miktarı
            })
          }
          className="mt-4 px-6 py-2 bg-[#26cc3c] text-white font-semibold rounded-xl shadow-md hover:bg-[#20a330] transition-all duration-300"
          disabled={item.stock === 0} // stok 0 ise pasif
        >
          Sepete Ekle
        </button>
      </div>
    </motion.div>
  ))}
             

              {/* ✅ Tüm Ürünler Kartı */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex flex-col justify-center items-center text-center bg-[#FFA45B]/20 border border-[#FFA45B]/30 rounded-2xl backdrop-blur-lg shadow-xl hover:bg-[#FFA45B]/30 transition-all"
              >
                <Link
                  href={cat.link}
                  className="p-8 w-full h-full flex flex-col justify-center items-center"
                >
                  <h4 className="text-2xl font-semibold text-[#FFA45B] mb-2">
                    Tüm Ürünleri Gör
                  </h4>
                  <p className="text-gray-200 text-sm">Kategori sayfasına git →</p>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    {/* İletişim Bölümü */}
    <section id="contact" className="relative py-40 text-white text-center overflow-hidden">
  {/* Başlık ve Logo */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: false }}
    className="mb-8 flex justify-center"
  >
    <Image 
      src="/logo.jpg" 
      alt="Şirket Logosu" 
      width={120} 
      height={120} 
      className="opacity-100 rounded-full shadow-lg" 
      unoptimized 
    />
  </motion.div>

  <motion.h2
    initial={{ x: -100, opacity: 0 }}
    whileInView={{ x: 0, opacity: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: false }}
    className="text-5xl font-bold mb-12 text-[#F8B400]"
  >
    İletişim
  </motion.h2>

  {/* 🔹 Tek Birleştirilmiş Cam Panel */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1 }}
    viewport={{ once: false }}
    className="relative bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-xl border border-white/20 flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto space-y-8 md:space-y-0 md:space-x-12"
  >
    {/* 📌 Sol Kısım: İletişim Bilgileri */}
    <div className="flex flex-col items-start space-y-6 text-left w-full md:w-1/2">
      <h3 className="text-2xl font-semibold text-white mb-4">Bize Ulaşın</h3>

      <div className="flex items-center gap-4">
        <Image src="/phone-icon.png" alt="Telefon" width={28} height={28} unoptimized />
        <a href="tel:+905555555555" className="text-lg text-gray-300 hover:text-white transition">+90 555 555 5555</a>
      </div>
      <div className="flex items-center gap-4">
        <Image src="/phone-icon.png" alt="Telefon" width={28} height={28} unoptimized />
        <a href="tel:+905555555555" className="text-lg text-gray-300 hover:text-white transition">+90 555 555 5555</a>
      </div>

      <div className="flex items-center gap-4">
        <Image src="/mail-icon.png" alt="E-posta" width={28} height={28} unoptimized />
        <a href="mailto:üretenelden@gmail.com" className="text-lg text-gray-300 hover:text-white transition">üretenelden@gmail.com</a>
      </div>

      <div className="flex items-center gap-4">
        <Image src="/instagram-icon.png" alt="Instagram" width={28} height={28} unoptimized />
        <a href="https://instagram.com/üretenelden" target="_blank" className="text-lg text-gray-300 hover:text-white transition">@üretenelden</a>
      </div>

      <div className="flex items-center gap-4">
        <Image src="/location-icon.png" alt="Adres" width={28} height={28} unoptimized />
        <p className="text-lg text-gray-300">lorem İpsum sasasasa</p>
      </div>
    </div>

    {/* 📌 Sağ Kısım: Konum Haritası */}
    <div className="w-full md:w-1/2 flex justify-center">
      <Image 
        src="/map.jpg" 
        alt="Konum Haritası" 
        width={500} 
        height={350} 
        className="rounded-xl shadow-lg"
        unoptimized
      />
    </div>
  </motion.div>
</section>
<footer className="py-10 bg-[#333] text-white text-center">
        <p className="text-lg opacity-80">© 2025 Üretenelden | Tüm Hakları Saklıdır</p>
      </footer>
  </div>
</div>
  </div>
  );
}
