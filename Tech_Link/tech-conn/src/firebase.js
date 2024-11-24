// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fs-blog-d3dbd.firebaseapp.com",
  projectId: "fs-blog-d3dbd",
  storageBucket: "fs-blog-d3dbd.appspot.com",
  messagingSenderId: "600078232550",
  appId: "1:600078232550:web:a228c1088ce05c18140427",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
