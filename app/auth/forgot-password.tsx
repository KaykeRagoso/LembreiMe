import { router } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../../src/services/auth/firebase';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRecoverPassword = async () => {
    const emailFormatted = email.trim().toLowerCase();

    if (!emailFormatted) {
      Alert.alert('Erro', 'Informe seu email');
      return;
    }

    try {
      setLoading(true);

      await sendPasswordResetEmail(auth, emailFormatted);

      Alert.alert(
        'Email enviado com sucesso',
        'O link de recuperação pode levar alguns minutos para chegar. Se não encontrar, verifique a pasta de spam.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    } catch (error: any) {
      console.log('Firebase error:', error.code, error.message);

      let message = 'Erro ao enviar email de recuperação';

      switch (error.code) {
        case 'auth/user-not-found':
          message = 'Nenhuma conta encontrada com esse email';
          break;
        case 'auth/invalid-email':
          message = 'Email inválido';
          break;
        case 'auth/too-many-requests':
          message = 'Muitas tentativas. Tente novamente mais tarde';
          break;
      }

      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Recuperar Senha</Text>

        <Text style={styles.subtitle}>
          Digite seu email para receber um link de recuperação
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#9CA3AF"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          editable={!loading}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleRecoverPassword}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>ENVIAR EMAIL</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
          <Text style={styles.link}>
            Voltar para o <Text style={styles.linkBold}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3A55',
    marginBottom: 15,
    alignSelf: 'center',
  },
  subtitle: {
    color: '#666',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#4A90E2',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },
  backLink: {
    alignItems: 'center',
  },
  link: {
    color: '#4A90E2',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  linkBold: {
    fontWeight: '700',
  },
});
