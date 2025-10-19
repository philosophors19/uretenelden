"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageSquare } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    alert("Mesajınız başarıyla gönderildi 💌");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section
      id="contact"
      className="relative py-32 px-6 lg:px-20 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] text-white"
    >
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-5xl font-bold text-center mb-16 text-[#FFA45B]"
      >
        İletişim
      </motion.h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* 🔹 Sol taraf: İletişim Bilgileri */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-lg"
        >
          <h3 className="text-2xl font-semibold text-[#FFA45B] mb-6">
            Bizimle İletişime Geçin
          </h3>

          <div className="flex flex-col gap-5 text-gray-300">
            <div className="flex items-center gap-3">
              <Phone className="text-[#FFA45B]" />
              <span>+90 555 123 45 67</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="text-[#FFA45B]" />
              <span>info@findikdiyari.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="text-[#FFA45B]" />
              <span>Giresun, Türkiye</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-400 text-sm mb-2">
              Hızlıca iletişime geçmek ister misiniz?
            </p>
            <a
              href="https://wa.me/905551234567?text=Merhaba!%20Ürünleriniz%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5C] text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <MessageSquare size={18} /> WhatsApp ile Ulaş
            </a>
          </div>
        </motion.div>

        {/* 🔹 Sağ taraf: İletişim Formu */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-lg flex flex-col gap-5"
        >
          <h3 className="text-2xl font-semibold text-[#FFA45B] mb-2">
            Mesaj Gönder
          </h3>

          <input
            type="text"
            placeholder="Adınız"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:border-[#FFA45B]"
          />
          <input
            type="email"
            placeholder="E-posta Adresiniz"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:border-[#FFA45B]"
          />
          <textarea
            placeholder="Mesajınız..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={5}
            className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-400 text-white focus:outline-none focus:border-[#FFA45B]"
          />

          <button
            type="submit"
            className="mt-4 bg-[#FFA45B] hover:bg-[#ff9447] text-black py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
          >
            <Send size={18} /> Gönder
          </button>
        </motion.form>
      </div>

      {/* 🔹 Alt bilgi */}
      <div className="text-center text-gray-500 text-sm mt-16">
        © {new Date().getFullYear()} Fındık Diyarı – Tüm Hakları Saklıdır.
      </div>
    </section>
  );
}
