// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Configuração DIRETA
const firebaseConfig = {
  apiKey: "AIzaSyCqggmax8W7e85BSfeK0C2Tspokh9K4GZQ",
  authDomain: "lembreime-6df58.firebaseapp.com",
  projectId: "lembreime-6df58",
  storageBucket: "lembreime-6df58.firebasestorage.app",
  messagingSenderId: "684975032955",
  appId: "1:684975032955:web:a142503ad20c00d66730de"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

console.log('✅ Firebase conectado ao projeto:', firebaseConfig.projectId);