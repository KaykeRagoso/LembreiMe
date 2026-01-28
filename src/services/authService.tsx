import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth } from './firebase';

export const authService = {
  // Cadastro
  async register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // Login
  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  },

  // Logout
  async logout() {
    await signOut(auth);
  },

  // Recuperação de senha
  async forgotPassword(email: string) {
    await sendPasswordResetEmail(auth, email);
  },

  // Atualizar perfil (nome)
  async updateUserProfile(displayName: string) {
    if (auth.currentUser) {
      await updateProfile(auth.currentUser, { displayName });
    }
  },

  // Obter usuário atual
  getCurrentUser() {
    return auth.currentUser;
  },
};
