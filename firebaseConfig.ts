import firebase from "firebase/app";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyAX0IXkCf1rm5Rj2PrbTFm8ZHBU43Cp6Hg",
  authDomain: "fiance-react.firebaseapp.com",
  projectId: "fiance-react",
  storageBucket: "fiance-react.appspot.com",
  messagingSenderId: "566701837142",
  appId: "1:566701837142:web:1e31baadfdfee066dae4f7",
  measurementId: "G-XRXNM8DYBN"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
export const db = firebase.firestore();
