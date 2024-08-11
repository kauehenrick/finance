import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAX0IXkCf1rm5Rj2PrbTFm8ZHBU43Cp6Hg",
  authDomain: "fiance-react.firebaseapp.com",
  projectId: "fiance-react",
  storageBucket: "fiance-react.appspot.com",
  messagingSenderId: "566701837142",
  appId: "1:566701837142:web:1e31baadfdfee066dae4f7",
  measurementId: "G-XRXNM8DYBN"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
