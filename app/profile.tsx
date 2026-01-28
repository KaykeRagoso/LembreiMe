import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { authService } from '../src/services/authService';

export default function Profile() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [loading, setLoading] = useState(false);

  if (!user) {
    return <View><Text>Carregando...</Text></View>;
  }

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        setPhotoURL(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao selecionar imagem');
    }
  };

  const handleUpdateProfile = async () => {
    if (!displayName.trim()) {
      Alert.alert('Erro', 'Digite um nome');
      return;
    }

    try {
      setLoading(true);
      await authService.updateUserProfile(displayName, photoURL);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Deletar Conta',
      'Tem certeza? Esta ação é irreversível e todos os seus dados serão perdidos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);
              await authService.deleteAccount();
              router.replace('/login');
            } catch (error: any) {
              Alert.alert('Erro', error.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        {/* Cabeçalho */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Perfil</Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={{ fontSize: 18 }}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Foto de Perfil */}
        <View style={{ alignItems: 'center', marginBottom: 30 }}>
          {photoURL ? (
            <Image
              source={{ uri: photoURL }}
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                marginBottom: 15,
              }}
            />
          ) : (
            <View
              style={{
                width: 120,
                height: 120,
                borderRadius: 60,
                backgroundColor: '#E5E7EB',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 15,
              }}
            >
              <Text style={{ fontSize: 50 }}>👤</Text>
            </View>
          )}

          <TouchableOpacity 
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              backgroundColor: '#3B82F6',
              borderRadius: 8,
            }}
            onPress={pickImage}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              Alterar Foto
            </Text>
          </TouchableOpacity>
        </View>

        {/* Informações do Usuário */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 }}>
            Nome
          </Text>
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            placeholder="Digite seu nome"
            editable={!loading}
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 16,
              marginBottom: 20,
            }}
          />

          <Text style={{ fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 8 }}>
            Email
          </Text>
          <TextInput
            value={user.email || ''}
            editable={false}
            style={{
              borderWidth: 1,
              borderColor: '#E5E7EB',
              borderRadius: 8,
              paddingHorizontal: 12,
              paddingVertical: 10,
              fontSize: 16,
              backgroundColor: '#F9FAFB',
              color: '#999',
            }}
          />
        </View>

        {/* Botão Salvar */}
        <TouchableOpacity 
          style={{
            backgroundColor: '#10B981',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginBottom: 15,
          }}
          onPress={handleUpdateProfile}
          disabled={loading}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            {loading ? 'SALVANDO...' : 'SALVAR PERFIL'}
          </Text>
        </TouchableOpacity>

        {/* Botão Deletar Conta */}
        <TouchableOpacity 
          style={{
            backgroundColor: '#EF4444',
            paddingVertical: 12,
            borderRadius: 8,
            alignItems: 'center',
          }}
          onPress={handleDeleteAccount}
          disabled={loading}
        >
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>
            DELETAR CONTA
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
