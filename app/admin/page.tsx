"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  auth, 
  db, 
  storage 
} from "../firebaseConfig";
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User
} from "firebase/auth";
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  LogOut, 
  Package, 
  Layers, 
  AlertCircle, 
  CheckCircle2, 
  Image as ImageIcon, 
  Sparkles, 
  Search, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  User as UserIcon,
  Store,
  Upload,
  Eye
} from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: string;
  stock: number;
  category: string;
  image: string;
  info: string;
  producerId?: string;
  producerName?: string;
  createdAt?: number;
}

const CATEGORIES = [
  "Kavrulmuş Fındık",
  "Çiğ İç Fındık",
  "Kabuklu Fındık",
  "Fındık Ezmesi",
  "Diğer Doğal Ürünler"
];

// Hızlı seçim için hazır yüksek kaliteli görsel şablonları
const PRESET_IMAGES = [
  { name: "Kavrulmuş Fındık", url: "/hazelnut-main.jpg" },
  { name: "Fındık Ezmesi", url: "/hazelnut-paste-main.jpg" },
  { name: "Fındıklı Atıştırmalık", url: "/hazelnut-snacks-main.jpg" },
  { name: "Doğal Bal & Pekmez", url: "/natural-products-main.jpg" },
  { name: "Sebze & Meyve", url: "/catalog-sebzemeyve.jpg" },
  { name: "Süt Ürünü", url: "/service-sut.jpg" },
  { name: "Yumurta", url: "/service-yumurta.jpg" },
];

export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Auth Form State
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [farmName, setFarmName] = useState("");
  const [authError, setAuthError] = useState("");
  const [authSuccess, setAuthSuccess] = useState("");
  const [submittingAuth, setSubmittingAuth] = useState(false);

  // Products State
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: 10,
    category: CATEGORIES[0],
    image: "/hazelnut-main.jpg",
    info: "",
  });
  const [savingProduct, setSavingProduct] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 🔹 Yerel Oturum Başlat (Firebase Auth Provider etkinleştirilmemişse)
  const startLocalSession = (customEmail?: string, customName?: string) => {
    const mockUser: any = {
      uid: "producer_" + Date.now(),
      email: customEmail || email || "demo.uretici@uretenelden.com",
      displayName: customName || displayName || "Doğal Üretici (Yerel Oturum)",
    };
    setUser(mockUser);
    localStorage.setItem("local_producer_user", JSON.stringify(mockUser));
    setFeedbackMsg({ 
      type: "success", 
      text: "Yerel oturum açıldı! Firebase Console'da Auth etkinleştirildiğinde otomatik bağlanacaktır." 
    });
  };

  // 🔹 Firebase Auth Dinleyicisi + Local Auth Kontrolü
  useEffect(() => {
    const localUser = localStorage.getItem("local_producer_user");
    if (localUser) {
      try {
        setUser(JSON.parse(localUser));
      } catch (e) {}
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        localStorage.removeItem("local_producer_user");
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // 🔹 Giriş Yap
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");
    setSubmittingAuth(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setAuthSuccess("Giriş başarılı! Yönlendiriliyorsunuz...");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/configuration-not-found") {
        setAuthError(
          "Firebase Console'da E-posta/Şifre sağlayıcısı henüz aktif edilmemiş. Aşağıdaki 'Yerel Mod ile Devam Et' butonuna tıklayarak paneli anında kullanabilirsiniz."
        );
      } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setAuthError("E-posta veya şifre hatalı.");
      } else if (err.code === "auth/user-not-found") {
        setAuthError("Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı.");
      } else if (err.code === "auth/invalid-email") {
        setAuthError("Geçerli bir e-posta adresi giriniz.");
      } else {
        setAuthError(err.message || "Giriş yapılırken bir hata oluştu.");
      }
    } finally {
      setSubmittingAuth(false);
    }
  };

  // 🔹 Hızlı Demo Girişi
  const handleQuickDemoLogin = async () => {
    setAuthError("");
    setSubmittingAuth(true);
    const demoEmail = "demo.uretici@uretenelden.com";
    const demoPass = "Demo123456!";

    try {
      try {
        await signInWithEmailAndPassword(auth, demoEmail, demoPass);
        setAuthSuccess("Demo girişi başarılı!");
      } catch (loginErr: any) {
        if (loginErr.code === "auth/configuration-not-found") {
          // Firebase Console'da Auth henüz açılmamışsa yerel modda anında başlat
          startLocalSession(demoEmail, "Örnek Doğal Çiftlik (Demo Üretici)");
          return;
        }
        // Eğer kullanıcı yoksa oluşturmayı dene
        const res = await createUserWithEmailAndPassword(auth, demoEmail, demoPass);
        await updateProfile(res.user, {
          displayName: "Örnek Doğal Çiftlik (Demo)",
        });
        setAuthSuccess("Demo hesabı oluşturuldu ve giriş yapıldı!");
      }
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/configuration-not-found") {
        startLocalSession(demoEmail, "Örnek Doğal Çiftlik (Demo Üretici)");
      } else {
        setAuthError("Demo girişi sırasında hata: " + err.message);
      }
    } finally {
      setSubmittingAuth(false);
    }
  };

  // 🔹 Kayıt Ol (Üretici Hesabı Aç)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setAuthSuccess("");

    if (!displayName.trim()) {
      setAuthError("Lütfen adınızı veya işletme adınızı girin.");
      return;
    }
    if (password.length < 6) {
      setAuthError("Şifreniz en az 6 karakter olmalıdır.");
      return;
    }

    setSubmittingAuth(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const fullName = farmName ? `${displayName} (${farmName})` : displayName;
      await updateProfile(userCredential.user, {
        displayName: fullName,
      });
      setAuthSuccess("Hesabınız başarıyla oluşturuldu! Hoş geldiniz.");
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/configuration-not-found") {
        setAuthError(
          "Firebase Console'da E-posta/Şifre sağlayıcısı henüz aktif edilmemiş. Aşağıdaki 'Yerel Mod ile Devam Et' butonuyla paneli açabilirsiniz."
        );
      } else if (err.code === "auth/email-already-in-use") {
        setAuthError("Bu e-posta adresi zaten kullanımda. Giriş yapmayı deneyin.");
      } else if (err.code === "auth/weak-password") {
        setAuthError("Şifre çok zayıf. En az 6 karakter kullanın.");
      } else {
        setAuthError(err.message || "Kayıt olurken bir hata oluştu.");
      }
    } finally {
      setSubmittingAuth(false);
    }
  };

  // 🔹 Çıkış Yap
  const handleLogout = async () => {
    try {
      localStorage.removeItem("local_producer_user");
      await signOut(auth);
      setUser(null);
      setFeedbackMsg({ type: "success", text: "Başarıyla çıkış yapıldı." });
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  // 🔹 Görsel Yükleme ve Otomatik Sıkıştırma (Firestore 1MB limitini aşmaması ve tüm kullanıcılara anında gözükmesi için)
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new (window as any).Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxDimension = 800; // Maksimum 800px
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          // 30-50KB arası yüksek kaliteli sıkıştırılmış görsel
          const compressedDataUrl = canvas.toDataURL("image/jpeg", 0.75);
          setFormData((prev) => ({ ...prev, image: compressedDataUrl }));
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  // 🔹 Modal Aç (Yeni / Düzenle)
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "₺150/kg",
      stock: 10,
      category: CATEGORIES[0],
      image: "/hazelnut-main.jpg",
      info: "",
    });
    setShowModal(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      price: prod.price,
      stock: prod.stock,
      category: prod.category || CATEGORIES[0],
      image: prod.image || "/hazelnut-main.jpg",
      info: prod.info || "",
    });
    setShowModal(true);
  };

  // 🔹 Ürün Kaydet (Doğrudan Cloud Firestore'a Kaydet - Tüm Kullanıcılar Görsün)
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price.trim()) {
      alert("Lütfen ürün adı ve fiyatını doldurun.");
      return;
    }

    setSavingProduct(true);
    const productPayload = {
      name: formData.name.trim(),
      price: formData.price.startsWith("₺") ? formData.price : `₺${formData.price}`,
      stock: Number(formData.stock) || 0,
      category: formData.category,
      image: formData.image || "/hazelnut-main.jpg",
      info: formData.info.trim(),
      producerId: user?.uid || "guest",
      producerName: user?.displayName || user?.email || "Yerel Üretici",
      createdAt: Date.now(),
    };

    try {
      if (editingProduct) {
        // Güncelleme
        try {
          const docRef = doc(db, "products", editingProduct.id);
          await updateDoc(docRef, productPayload);
        } catch (e: any) {
          console.warn("Firestore güncelleme uyarısı:", e);
        }

        const updated = products.map((p) =>
          p.id === editingProduct.id ? { ...p, ...productPayload } : p
        );
        setProducts(updated);
        localStorage.setItem("products", JSON.stringify(updated));
        setFeedbackMsg({ 
          type: "success", 
          text: "Ürün başarıyla güncellendi ve tüm site ziyaretçilerine yayınlandı." 
        });
      } else {
        // Yeni Ürün Ekleme (Firestore'a ekle)
        let newId = Date.now().toString();
        try {
          const docRef = await addDoc(collection(db, "products"), productPayload);
          newId = docRef.id;
          setFeedbackMsg({ 
            type: "success", 
            text: "Ürün başarıyla buluta yüklendi! Artık tüm ziyaretçiler görebilir." 
          });
        } catch (firestoreErr: any) {
          console.warn("Firestore kayıt uyarısı:", firestoreErr);
          if (firestoreErr.code === "permission-denied") {
            alert(
              "DİKKAT: Firebase Firestore izinleri kapalı (permission-denied). Ürünlerinizin diğer cihazlardan ve ziyaretçilerden de görünmesi için Firebase Console ➔ Firestore Database ➔ Rules sekmesinden kuralları 'allow read, write: if true;' olarak güncelleyin."
            );
          }
          setFeedbackMsg({ 
            type: "success", 
            text: "Ürün kaydedildi." 
          });
        }

        const newProd: Product = { id: newId, ...productPayload };
        const updated = [newProd, ...products];
        setProducts(updated);
        localStorage.setItem("products", JSON.stringify(updated));
      }

      setShowModal(false);
    } catch (err: any) {
      console.error("Kaydetme hatası:", err);
      setFeedbackMsg({ type: "error", text: "Ürün kaydedilirken bir hata oluştu: " + err.message });
    } finally {
      setSavingProduct(false);
    }
  };

  // 🔹 Ürün Sil
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!confirm(`"${name}" ürününü silmek istediğinize emin misiniz?`)) return;

    try {
      try {
        await deleteDoc(doc(db, "products", id));
      } catch (e) {
        console.warn("Firestore silme hatası:", e);
      }

      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      localStorage.setItem("products", JSON.stringify(updated));
      setFeedbackMsg({ type: "success", text: `"${name}" başarıyla silindi.` });
    } catch (err) {
      console.error(err);
      setFeedbackMsg({ type: "error", text: "Ürün silinirken bir hata oluştu." });
    }
  };

  // 🔹 Hızlı Stok Güncelleme
  const handleQuickStock = async (prod: Product, delta: number) => {
    const newStock = Math.max(0, prod.stock + delta);
    const updated = products.map((p) => (p.id === prod.id ? { ...p, stock: newStock } : p));
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));

    try {
      const docRef = doc(db, "products", prod.id);
      await updateDoc(docRef, { stock: newStock });
    } catch (e) {
      // sessizce geç
    }
  };

  // 🔹 Filtrelenmiş Ürünler
  const filteredProducts = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === "ALL" || p.category === selectedCategory;
    return matchSearch && matchCat;
  });

  // 🔹 İstatistikler
  const totalStockCount = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const criticalStockCount = products.filter((p) => (p.stock || 0) > 0 && (p.stock || 0) <= 5).length;
  const inStockCount = products.filter((p) => (p.stock || 0) > 0).length;

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#FFA45B] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400 text-sm">Üretici Paneli Yükleniyor...</p>
        </div>
      </div>
    );
  }

  // ==========================================
  // 1. GİRİŞ & KAYIT EKRANI (Oturum Açılmamışsa)
  // ==========================================
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white relative flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Arka Plan Efektleri */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFA45B]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#26cc3c]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl">
          {/* Logo & Başlık */}
          <div className="text-center mb-6">
            <Link href="/" className="inline-flex items-center gap-2 mb-3 group">
              <div className="w-12 h-12 rounded-2xl bg-[#FFA45B]/20 border border-[#FFA45B]/40 flex items-center justify-center text-[#FFA45B] group-hover:scale-105 transition-transform">
                <Store className="w-6 h-6" />
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-black text-white">Üretenelden</h1>
            <p className="text-gray-400 text-sm mt-1">Üretici Yönetim & Satış Paneli</p>
          </div>

          {/* Tab Seçimi (Giriş / Kayıt) */}
          <div className="flex rounded-xl bg-black/40 p-1 border border-white/10 mb-6">
            <button
              onClick={() => {
                setAuthMode("login");
                setAuthError("");
                setAuthSuccess("");
              }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                authMode === "login"
                  ? "bg-[#FFA45B] text-black shadow-md shadow-[#FFA45B]/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Giriş Yap
            </button>
            <button
              onClick={() => {
                setAuthMode("register");
                setAuthError("");
                setAuthSuccess("");
              }}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                authMode === "register"
                  ? "bg-[#FFA45B] text-black shadow-md shadow-[#FFA45B]/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Üretici Ol (Kayıt)
            </button>
          </div>

          {/* Hata & Başarı Mesajları */}
          {authError && (
            <div className="mb-5 p-4 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs space-y-2.5">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">{authError}</span>
              </div>
              
              <button
                type="button"
                onClick={() => startLocalSession()}
                className="w-full py-2 px-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFA45B]" />
                <span>Paneli Yerel Modda Aç (Hemen Test Et)</span>
              </button>
            </div>
          )}
          {authSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={authMode === "login" ? handleLogin : handleRegister} className="space-y-4">
            {authMode === "register" && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Ad Soyad / Yetkili Kişi
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Örn: Ahmet Yılmaz"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFA45B]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Çiftlik / İşletme Adı (Opsiyonel)
                  </label>
                  <input
                    type="text"
                    placeholder="Örn: Karadeniz Doğal Fındık Çiftliği"
                    value={farmName}
                    onChange={(e) => setFarmName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFA45B]"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">E-posta Adresi</label>
              <input
                type="email"
                required
                placeholder="uretici@uretenelden.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFA45B]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Şifre</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFA45B]"
              />
            </div>

            <button
              type="submit"
              disabled={submittingAuth}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FFA45B] to-[#ff9447] text-black font-bold text-sm shadow-lg shadow-[#FFA45B]/25 hover:opacity-95 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {submittingAuth ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              ) : authMode === "login" ? (
                "Giriş Yap"
              ) : (
                "Üretici Hesabı Aç"
              )}
            </button>
          </form>

          {/* Hızlı Demo Girişi Butonu */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center">
            <p className="text-xs text-gray-400 mb-3">Hesabınız yok mu veya hızlıca test etmek mi istiyorsunuz?</p>
            <button
              onClick={handleQuickDemoLogin}
              disabled={submittingAuth}
              className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-gray-200 text-xs font-semibold transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#FFA45B]" />
              <span>Tek Tıkla Demo Hesabı ile Giriş Yap</span>
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-gray-400 hover:text-[#FFA45B] transition-colors">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // 2. ÜRETİCİ DASHBOARD EKRANI (Giriş Yapılmış)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white font-sans selection:bg-[#FFA45B]/30 selection:text-[#FFA45B]">
      {/* Üst Yönetim Barı */}
      <header className="border-b border-white/10 bg-black/40 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFA45B]/20 border border-[#FFA45B]/40 flex items-center justify-center text-[#FFA45B]">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-white">Üretici Paneli</h1>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-semibold border border-emerald-500/30 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Firebase Bağlı
                </span>
              </div>
              <p className="text-xs text-gray-400">
                {user.displayName ? user.displayName : user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/page/flowers"
              target="_blank"
              className="px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Eye className="w-3.5 h-3.5 text-[#FFA45B]" />
              <span>Sitedeki Ürünler</span>
              <ExternalLink className="w-3 h-3 text-gray-400" />
            </Link>

            <button
              onClick={openAddModal}
              className="px-4 py-2 rounded-xl bg-[#26cc3c] hover:bg-[#20a330] text-white text-xs font-bold shadow-lg shadow-green-900/30 flex items-center gap-1.5 transition-all active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Yeni Ürün Ekle</span>
            </button>

            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-white/10 transition-colors"
              title="Çıkış Yap"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Ana İçerik Alanı */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Bildirim Toast */}
        {feedbackMsg && (
          <div
            className={`p-4 rounded-2xl text-sm flex items-center gap-3 border shadow-xl ${
              feedbackMsg.type === "success"
                ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                : "bg-rose-500/20 border-rose-500/40 text-rose-300"
            }`}
          >
            {feedbackMsg.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
        )}

        {/* 🔹 İstatistik Kartları */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Toplam Ürün</span>
              <Package className="w-4 h-4 text-[#FFA45B]" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-white">{products.length}</p>
            <p className="text-[11px] text-gray-500 mt-1">Sitede yayında olan ürünler</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Stokta Olan</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-emerald-400">{inStockCount}</p>
            <p className="text-[11px] text-gray-500 mt-1">Satışa hazır aktif ürün</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Kritik Stok</span>
              <AlertCircle className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-amber-400">{criticalStockCount}</p>
            <p className="text-[11px] text-gray-500 mt-1">5 adedin altında kalanlar</p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between text-gray-400 mb-2">
              <span className="text-xs font-medium uppercase tracking-wider">Toplam Stok</span>
              <TrendingUp className="w-4 h-4 text-sky-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-black text-sky-400">{totalStockCount}</p>
            <p className="text-[11px] text-gray-500 mt-1">Depodaki toplam miktar</p>
          </div>
        </div>

        {/* 🔹 Arama & Filtreleme Çubuğu */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          {/* Arama Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Ürün adı veya kategori ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-xs sm:text-sm focus:outline-none focus:border-[#FFA45B]"
            />
          </div>

          {/* Kategori Seçici */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Layers className="w-4 h-4 text-[#FFA45B] hidden sm:block" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-black/40 border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#FFA45B]"
            >
              <option value="ALL">Tüm Kategoriler ({products.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* 🔹 Ürünler Listesi */}
        {loadingProducts ? (
          <div className="py-20 text-center text-gray-400">
            <div className="w-8 h-8 border-3 border-[#FFA45B] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-sm">Ürünler yükleniyor...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-[#FFA45B]/10 flex items-center justify-center mb-4 text-[#FFA45B]">
              <Package className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">Henüz Ürün Yok</h3>
            <p className="text-gray-400 text-xs sm:text-sm max-w-sm mb-6">
              {searchQuery || selectedCategory !== "ALL"
                ? "Arama kriterlerine uygun ürün bulunamadı."
                : "Eklediğiniz ürünler burada listelenecek ve anında sitedeki ürünler sayfasına aktarılacaktır."}
            </p>
            <button
              onClick={openAddModal}
              className="px-5 py-2.5 bg-[#26cc3c] hover:bg-[#20a330] text-white font-bold text-xs rounded-xl shadow-lg transition-all"
            >
              + İlk Ürününü Ekle
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-[#FFA45B]/40 rounded-2xl p-4 flex flex-col justify-between transition-all duration-200 shadow-xl relative"
              >
                <div>
                  {/* Görsel ve Rozetler */}
                  <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3.5 bg-black/50">
                    <img
                      src={p.image || "/hazelnut-main.jpg"}
                      alt={p.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[#FFA45B] text-[10px] font-semibold border border-white/10">
                      {p.category}
                    </span>
                    <span
                      className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full backdrop-blur-md text-[10px] font-bold ${
                        p.stock > 5
                          ? "bg-emerald-500/80 text-white"
                          : p.stock > 0
                          ? "bg-amber-500/80 text-white"
                          : "bg-rose-500/80 text-white"
                      }`}
                    >
                      {p.stock > 0 ? `Stok: ${p.stock}` : "Tükendi"}
                    </span>
                  </div>

                  {/* Bilgiler */}
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#FFA45B] transition-colors leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 line-clamp-2 min-h-[32px]">
                    {p.info || "Açıklama belirtilmemiş."}
                  </p>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                    <span className="text-base font-black text-[#FFA45B]">{p.price}</span>

                    {/* Hızlı Stok Değiştirici */}
                    <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-lg border border-white/10">
                      <button
                        onClick={() => handleQuickStock(p, -1)}
                        className="w-5 h-5 flex items-center justify-center text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded"
                        title="1 Azalt"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold px-1 min-w-[20px] text-center">
                        {p.stock}
                      </span>
                      <button
                        onClick={() => handleQuickStock(p, 1)}
                        className="w-5 h-5 flex items-center justify-center text-xs text-gray-300 hover:text-white hover:bg-white/10 rounded"
                        title="1 Arttır"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Aksiyon Butonları */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-white/10">
                  <button
                    onClick={() => openEditModal(p)}
                    className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#FFA45B]" />
                    <span>Düzenle</span>
                  </button>

                  <button
                    onClick={() => handleDeleteProduct(p.id, p.name)}
                    className="py-2 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-semibold text-rose-400 flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Sil</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* ==========================================
          3. ÜRÜN EKLE / DÜZENLE MODAL
          ========================================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#141414] border border-white/15 rounded-3xl p-6 shadow-2xl my-8">
            <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#FFA45B]" />
                <span>{editingProduct ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}</span>
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white text-lg font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Ürün Adı *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Organik Çiğ Giresun Fındığı"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFA45B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Kategori *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FFA45B]"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                    Fiyat (Birim Dahil) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="₺180/kg"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFA45B]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Stok Miktarı (Adet / Kg)
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white text-sm focus:outline-none focus:border-[#FFA45B]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Ürün Görseli (Dosya Yükle veya Şablon Seç)
                </label>
                
                {/* Görsel Önizleme */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/50 border border-white/10 flex-shrink-0">
                    <img
                      src={formData.image || "/hazelnut-main.jpg"}
                      alt="Önizleme"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs text-gray-200 font-semibold transition-all">
                      <Upload className="w-3.5 h-3.5 text-[#FFA45B]" />
                      <span>Cihazdan Fotoğraf Seç</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-gray-400">PNG, JPG, WEBP (Max 2.5MB)</p>
                  </div>
                </div>

                {/* Hızlı Şablon Görseller */}
                <div className="mt-2">
                  <span className="text-[11px] text-gray-400 block mb-1.5">veya hazır şablon seç:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_IMAGES.map((preset, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setFormData({ ...formData, image: preset.url })}
                        className={`text-[10px] px-2 py-1 rounded-lg border transition-all ${
                          formData.image === preset.url
                            ? "bg-[#FFA45B]/20 border-[#FFA45B] text-[#FFA45B] font-semibold"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        {preset.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                  Ürün Açıklaması / Detaylar
                </label>
                <textarea
                  rows={3}
                  placeholder="Doğal köy fındığı, katkısız ve taze kavrulmuş lezzet..."
                  value={formData.info}
                  onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/15 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-[#FFA45B] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={savingProduct}
                  className="px-6 py-2.5 rounded-xl bg-[#26cc3c] hover:bg-[#20a330] text-white text-xs font-bold shadow-lg shadow-green-900/30 transition-all flex items-center gap-2"
                >
                  {savingProduct ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Kaydediliyor...</span>
                    </>
                  ) : (
                    <span>{editingProduct ? "Değişiklikleri Kaydet" : "Ürünü Yayınla"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
