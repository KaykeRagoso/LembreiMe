// src/services/firebase.ts (versão atualizada)
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Carregar variáveis de ambiente
// No Expo, variáveis com EXPO_PUBLIC_ são automaticamente disponíveis
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Verificar se as variáveis estão carregadas
if (!firebaseConfig.apiKey) {
  console.warn('⚠️  Firebase API Key não encontrada. Verifique o arquivo .env');
  console.warn('   Usando configuração fallback...');
  
  // Fallback para desenvolvimento
  if (__DEV__) {
    firebaseConfig.apiKey = "AIzaSyCqggmax8W7e85BSfeK0C2Tspokh9K4GZQ";
    firebaseConfig.authDomain = "lembreime-6df58.firebaseapp.com";
    firebaseConfig.projectId = "lembreime-6df58";
    firebaseConfig.storageBucket = "lembreime-6df58.firebasestorage.app";
    firebaseConfig.messagingSenderId = "684975032955";
    firebaseConfig.appId = "1:684975032955:web:a142503ad20c00d66730de";
  }
}

console.log('🚀 Inicializando Firebase...');
console.log('📁 Projeto:', firebaseConfig.projectId || 'Não configurado');

// Inicializar Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
  console.log('✅ Firebase inicializado com sucesso!');
} catch (error) {
  console.error('❌ ERRO ao inicializar Firebase:', error);
  throw error;
}

export const db = getFirestore(app);