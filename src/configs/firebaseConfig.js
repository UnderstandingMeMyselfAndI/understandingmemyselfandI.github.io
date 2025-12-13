// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXErkUs7aUFgDxM7LOWDQOZCULI57nnVc",
  authDomain: "ummi2025.firebaseapp.com",
  projectId: "ummi2025",
  storageBucket: "ummi2025.firebasestorage.app",
  messagingSenderId: "699664105913",
  appId: "1:699664105913:web:6c7f89a2b8fa9e8f783668",
  measurementId: "G-YWBEQ7E972"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);