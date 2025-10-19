/*

"use client";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  price: string;
  stock: number;
  category: string;
  subcategory: string;
  image: string;
  info: string;
}

// ✅ Tip güvenli kategori nesnesi
const categories = {
  "Kuruyemiş": ["Fındık", "Ceviz", "Badem"],
  "Sebze & Meyve": ["Domates", "Patates", "Elma"],
  "El İşi Ürünler": ["Sabun", "Örgü", "Aksesuar"],
} as const;

type CategoryKey = keyof typeof categories;

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    price: "",
    stock: 0,
    category: "" as CategoryKey | "",
    subcategory: "",
    image: "",
    info: "",
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  // ✅ localStorage'dan ürünleri yükle
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) setProducts(JSON.parse(saved));
  }, []);

  // ✅ Görsel yükleme (şu anlık aktif ama zorunlu değil)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (isEdit && editProduct) {
        setEditProduct({ ...editProduct, image: reader.result as string });
      } else {
        setFormData({ ...formData, image: reader.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  // ✅ Ürün kaydet
  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem("products", JSON.stringify(updated));
  };

  // ✅ Ürün ekle
  const handleAddProduct = () => {
    if (!formData.name || !formData.price || !formData.category) {
      alert("Lütfen gerekli alanları doldurun.");
      return;
    }
    const newProduct = { ...formData, id: Date.now() };
    const updatedProducts = [...products, newProduct];
    saveProducts(updatedProducts);
    setFormData({
      id: Date.now(),
      name: "",
      price: "",
      stock: 0,
      category: "" as CategoryKey | "",
      subcategory: "",
      image: "",
      info: "",
    });
    setShowAddModal(false);
  };

  // ✅ Ürün sil
  const handleDelete = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  // ✅ Ürün düzenle
  const handleSaveEdit = () => {
    if (editProduct) {
      const updated = products.map((p) => (p.id === editProduct.id ? editProduct : p));
      saveProducts(updated);
      setEditProduct(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white p-10">
      <h1 className="text-4xl font-bold mb-8 text-[#FFA45B]">Üretici Paneli</h1>

      {/* Ürün Ekleme Butonu 
      <button
        onClick={() => setShowAddModal(true)}
        className="mb-8 px-6 py-3 bg-[#26cc3c] hover:bg-[#20a330] rounded-lg font-semibold transition"
      >
        Yeni Ürün Ekle
      </button>

      {/* Ürün Listesi 
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 relative shadow-lg border border-white/10"
          >
            {p.image && (
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-40 object-cover rounded-xl mb-3"
              />
            )}
            <h3 className="text-xl font-bold">{p.name}</h3>
            <p className="text-gray-300">
              {p.category} / {p.subcategory}
            </p>
            <p className="text-[#FFA45B] font-semibold mt-1">₺{p.price}</p>
            <p className="text-gray-400 text-sm">Stok: {p.stock}</p>
            <div className="flex gap-2 mt-4">
              <button
                className="px-4 py-1 bg-blue-500 rounded hover:bg-blue-600"
                onClick={() => setEditProduct(p)}
              >
                Düzenle
              </button>
              <button
                className="px-4 py-1 bg-red-500 rounded hover:bg-red-600"
                onClick={() => handleDelete(p.id)}
              >
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Ürün Ekleme Modal 
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#1a1a1a]/90 backdrop-blur-xl p-6 rounded-2xl w-96 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-center">Yeni Ürün Ekle</h2>
            <div className="grid grid-cols-1 gap-3">
              <input
                type="text"
                placeholder="Ürün Adı"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-2 rounded bg-black/30 border border-white/10 text-white"
              />
              <input
                type="text"
                placeholder="Fiyat"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="p-2 rounded bg-black/30 border border-white/10 text-white"
              />
              <input
                type="number"
                placeholder="Stok"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                className="p-2 rounded bg-black/30 border border-white/10 text-white"
              />
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as CategoryKey,
                    subcategory: "",
                  })
                }
                className="p-2 rounded bg-black/30 border border-white/10 text-white"
              >
                <option value="">Kategori Seç</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {formData.category && (
                <select
                  value={formData.subcategory}
                  onChange={(e) =>
                    setFormData({ ...formData, subcategory: e.target.value })
                  }
                  className="p-2 rounded bg-black/30 border border-white/10 text-white"
                >
                  <option value="">Alt Kategori Seç</option>
                  {categories[formData.category]?.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="text-gray-300 text-sm"
              />
              {formData.image && (
                <img
                  src={formData.image}
                  alt="Önizleme"
                  className="w-40 h-40 object-cover rounded-lg mt-2 mx-auto"
                />
              )}
              <textarea
                placeholder="Ürün Bilgisi"
                value={formData.info}
                onChange={(e) => setFormData({ ...formData, info: e.target.value })}
                className="p-2 rounded bg-black/30 border border-white/10 text-white"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
                >
                  İptal
                </button>
                <button
                  onClick={handleAddProduct}
                  className="px-4 py-2 rounded bg-green-500 hover:bg-green-600"
                >
                  Ekle
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ürün Düzenleme Modal 
      {editProduct && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-[#1a1a1a]/90 backdrop-blur-xl p-6 rounded-2xl w-96 border border-white/10">
            <h2 className="text-2xl font-bold mb-4 text-center">Ürünü Düzenle</h2>
            <div className="grid grid-cols-1 gap-3">
              <input
                type="text"
                value={editProduct.name}
                onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                className="p-2 rounded bg-black/30 border border-white/10 text-white"
              />
              <input
                type="text"
                value={editProduct.price}
                onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                className="p-2 rounded bg-black/30 border border-white/10 text-white"
              />
              <input
                type="number"
                value={editProduct.stock}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, stock: Number(e.target.value) })
                }
                className="p-2 rounded bg-black/30 border border-white/10 text-white"
              />
              <select
                value={editProduct.category}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    category: e.target.value as CategoryKey,
                    subcategory: "",
                  })
                }
                className="p-2 rounded bg-black/30 border border-white/10 text-white"
              >
                <option value="">Kategori Seç</option>
                {Object.keys(categories).map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>

              {editProduct.category && (
                <select
                  value={editProduct.subcategory}
                  onChange={(e) =>
                    setEditProduct({ ...editProduct, subcategory: e.target.value })
                  }
                  className="p-2 rounded bg-black/30 border border-white/10 text-white"
                >
                  <option value="">Alt Kategori Seç</option>
                  {categories[editProduct.category]?.map((sub) => (
                    <option key={sub} value={sub}>
                      {sub}
                    </option>
                  ))}
                </select>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, true)}
                className="text-gray-300 text-sm"
              />
              {editProduct.image && (
                <img
                  src={editProduct.image}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg mt-2 mx-auto"
                />
              )}
              <textarea
                value={editProduct.info}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, info: e.target.value })
                }
                className="p-2 rounded bg-black/30 border border-white/10 text-white"
              />
              <div className="flex justify-end gap-2 mt-3">
                <button
                  onClick={() => setEditProduct(null)}
                  className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500"
                >
                  İptal
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600"
                >
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
*/