import { Redirect, router } from 'expo-router';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { authService } from '../src/services/authService';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Redirect href="./login" />;
  }

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.replace('./login');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        {/* Cabeçalho */}
        <View style={{ alignItems: 'center', marginBottom: 40, marginTop: 20 }}>
          {user.photoURL ? (
            <Image
              source={{ uri: user.photoURL }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                marginBottom: 15,
              }}
            />
          ) : (
            <View
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: '#E5E7EB',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 15,
              }}
            >
              <Text style={{ fontSize: 45 }}>👤</Text>
            </View>
          )}
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            {user.displayName || 'Bem-vindo!'}
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 5 }}>
            {user.email}
          </Text>
        </View>

        {/* Menu de Ações */}
        <TouchableOpacity 
          style={{
            backgroundColor: '#3B82F6',
            padding: 15,
            borderRadius: 8,
            marginBottom: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => router.push('./profile')}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Editar Perfil
          </Text>
          <Text style={{ color: 'white', fontSize: 18 }}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            backgroundColor: '#10B981',
            padding: 15,
            borderRadius: 8,
            marginBottom: 12,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => Alert.alert('Info', 'Configurações em desenvolvimento')}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Configurações
          </Text>
          <Text style={{ color: 'white', fontSize: 18 }}>→</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{
            backgroundColor: '#8B5CF6',
            padding: 15,
            borderRadius: 8,
            marginBottom: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          onPress={() => Alert.alert('Info', 'Ajuda em desenvolvimento')}
        >
          <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>
            Ajuda & Suporte
          </Text>
          <Text style={{ color: 'white', fontSize: 18 }}>→</Text>
        </TouchableOpacity>

        {/* Botão Sair */}
        <TouchableOpacity 
          style={{ 
            backgroundColor: '#EF4444', 
            padding: 15, 
            borderRadius: 8,
            alignItems: 'center'
          }}
          onPress={handleLogout}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            SAIR
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
