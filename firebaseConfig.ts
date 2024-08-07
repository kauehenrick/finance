import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyAX0IXkCf1rm5Rj2PrbTFm8ZHBU43Cp6Hg",
  authDomain: "fiance-react.firebaseapp.com",
  projectId: "fiance-react",
  storageBucket: "fiance-react.appspot.com",
  messagingSenderId: "566701837142",
  appId: "1:566701837142:web:1e31baadfdfee066dae4f7",
  measurementId: "G-XRXNM8DYBN"
};

firebase.initializeApp(firebaseConfig);

export const storage = firebase.storage();

export const db = firebase.firestore();
