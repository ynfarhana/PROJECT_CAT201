// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANI53OGHLl3VTdQY4J-N6U_fA-ZAS0Xcc",
  authDomain: "projectcat201.firebaseapp.com",
  projectId: "projectcat201",
  storageBucket: "projectcat201.firebasestorage.app",
  messagingSenderId: "381998740376",
  appId: "1:381998740376:web:b3d2e79efdd9df02b2f1ed",
  measurementId: "G-BCZ119831S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and export it so AdminDashboard can use it
export const storage = getStorage(app); 