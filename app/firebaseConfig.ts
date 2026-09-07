// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCHpsrhxwMc8X1g8PrXq0qhy7Uo7ty_icM",
  authDomain: "uretenelden-2f9a0.firebaseapp.com",
  projectId: "uretenelden-2f9a0",
  storageBucket: "uretenelden-2f9a0.firebasestorage.app",
  messagingSenderId: "338656390853",
  appId: "1:338656390853:web:b2058a54b319ed1e078aac",
  measurementId: "G-JY9MQ23P28"
};

// Initialize Firebase safely for Next.js SSR & Fast Refresh
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
