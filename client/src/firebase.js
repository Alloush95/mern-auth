// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY, // VITE_FIREBASE_API_KEY is an environment variable
  authDomain: "mern-auth-2abd1.firebaseapp.com",
  projectId: "mern-auth-2abd1",
  storageBucket: "mern-auth-2abd1.appspot.com",
  messagingSenderId: "564628846018",
  appId: "1:564628846018:web:a7683503532cfd9439525b"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);