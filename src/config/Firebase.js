import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR API COMES HERE",
  authDomain: "YOUR AUTH DOMAIN COMES HERE",
  projectId: "YOUR PROJECT ID COMES HERE",
  storageBucket: "YOUR STORAGE BUCKET COMES HERE",
  messagingSenderId: "YOUR MESSAGING SENDER ID COMES HERE",
  appId: "YOUR APP ID COMES HERE",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
