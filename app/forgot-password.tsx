import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../src/services/firebase';
import { authStyles as styles } from '../src/styles/styles';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecoverPassword = async () => {
    if (!email) {
      Alert.alert('Erro', 'Informe seu email');
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        'Sucesso',
        'Email de recuperação enviado! Verifique sua caixa de entrada.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>Recuperar Senha</Text>

        <Text style={{ color: '#666', marginBottom: 20, textAlign: 'center' }}>
          Digite seu email para receber um link de recuperação
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          editable={!loading}
          style={styles.input}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleRecoverPassword}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'ENVIANDO...' : 'ENVIAR EMAIL'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>
            Voltar para o <Text style={styles.linkBold}>login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
