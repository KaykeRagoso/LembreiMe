// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCqggmax8W7e85BSfeK0C2Tspokh9K4GZQ",
  authDomain: "lembreime-6df58.firebaseapp.com",
  projectId: "lembreime-6df58",
  storageBucket: "lembreime-6df58.firebasestorage.app",
  messagingSenderId: "684975032955",
  appId: "1:684975032955:web:a142503ad20c00d66730de",
  measurementId: "G-6341SQ0M29"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);