import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoT4qz6qNuCBlUVJGx9p0_Ko1tW-NDY_c",
  authDomain: "blood-donation-app-71b4c.firebaseapp.com",
  projectId: "blood-donation-app-71b4c",
  storageBucket: "blood-donation-app-71b4c.appspot.com", // ✅ FIXED
  messagingSenderId: "358851618555",
  appId: "1:358851618555:web:1eaa45632233890d4c325e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);






