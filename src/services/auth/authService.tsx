import {
    createUserWithEmailAndPassword,
    deleteUser,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from './firebase';

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

  // Atualizar perfil (nome e foto)
  async updateUserProfile(displayName: string, photoURL?: string) {
    if (auth.currentUser) {
      const updateData: { displayName: string; photoURL?: string } = { displayName };
      if (photoURL) updateData.photoURL = photoURL;
      await updateProfile(auth.currentUser, updateData);
    }
  },

  // Exclusão de conta
  async deleteAccount() {
    const user = auth.currentUser;
    if (user) {
      // Deletar dados do Firestore (se houver)
      try {
        await deleteDoc(doc(db, 'users', user.uid));
      } catch (error) {
        console.error('Erro ao deletar dados do Firestore:', error);
      }
      // Deletar usuário do Firebase Auth
      await deleteUser(user);
    }
  },

  // Obter usuário atual
  getCurrentUser() {
    return auth.currentUser;
  },
};
