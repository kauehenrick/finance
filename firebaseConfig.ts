import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_FIREBASE_API_KEY}`,
  authDomain: "fiance-react.firebaseapp.com",
  projectId: "fiance-react",
  storageBucket: "fiance-react.appspot.com",
  messagingSenderId: "566701837142",
  appId: `${import.meta.env.VITE_FIREBASE_ID}`,
  measurementId: "G-XRXNM8DYBN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
