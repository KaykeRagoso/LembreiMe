import { Redirect, router } from 'expo-router';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { authService } from '../src/services/authService';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Redirect href="/login" />;
  }

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.replace('/login');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
        Bem-vindo!
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 30, color: '#666' }}>
        {user.email}
      </Text>
      <TouchableOpacity 
        style={{ 
          backgroundColor: '#EF4444', 
          padding: 12, 
          borderRadius: 8,
          width: '100%',
          alignItems: 'center'
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
          SAIR
        </Text>
      </TouchableOpacity>
    </View>
  );
}
