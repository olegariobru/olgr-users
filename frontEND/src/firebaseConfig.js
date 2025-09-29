import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBnon8iwZvX_-IlWQTTl6mdSRBPcwDUPY8",
  authDomain: "olguser.firebaseapp.com",
  projectId: "olguser",
  storageBucket: "olguser.firebasestorage.app",
  messagingSenderId: "503514402619",
  appId: "1:503514402619:web:c0fe05a1cb6e321bcc711e",
  measurementId: "G-XWJ663V23M"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);