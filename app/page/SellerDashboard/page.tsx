"use client";

import { useState } from "react";
import { db, storage } from "../../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function SellerDashboard() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!name || !price || !category || !image) return;

    setLoading(true);
    const imageRef = ref(storage, `products/${Date.now()}-${image.name}`);
    await uploadBytes(imageRef, image);
    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(collection(db, "products"), {
      name,
      price,
      category,
      image: imageUrl,
      createdAt: serverTimestamp(),
      stock: 10 // default
    });

    setName("");
    setPrice("");
    setCategory("");
    setImage(null);
    setLoading(false);
    alert("Ürün eklendi!");
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl mt-20">
      <h2 className="text-2xl font-bold mb-4">Ürün Ekle</h2>
      <input
        type="text"
        placeholder="Ürün Adı"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Fiyat (₺)"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Kategori"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />
      <input
        type="file"
        onChange={(e) => e.target.files && setImage(e.target.files[0])}
        className="mb-3"
      />
      <button
        onClick={handleAddProduct}
        disabled={loading}
        className="w-full bg-[#26cc3c] text-white p-2 rounded hover:bg-[#20a330]"
      >
        {loading ? "Yükleniyor..." : "Ürünü Ekle"}
      </button>
    </div>
  );
}
