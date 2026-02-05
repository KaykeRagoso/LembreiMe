import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, User } from 'firebase/auth';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../services/auth/firebase';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  needsOnboarding: boolean;
}

const AuthContext = createContext<AuthContextData>({
  user: null,
  loading: true,
  needsOnboarding: false,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    // Restaurar sessão persistente e verificar onboarding
    const restoreSession = async () => {
      try {
        const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
        setNeedsOnboarding(!onboardingCompleted);
      } catch (error) {
        console.error('Erro ao restaurar onboarding:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      // Salvar sessão persistente
      if (currentUser) {
        try {
          await AsyncStorage.setItem('user', JSON.stringify(currentUser));
        } catch (error) {
          console.error('Erro ao salvar sessão:', error);
        }
      } else {
        try {
          await AsyncStorage.removeItem('user');
        } catch (error) {
          console.error('Erro ao remover sessão:', error);
        }
      }
      
      setLoading(false);
    });

    restoreSession();
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, needsOnboarding }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
