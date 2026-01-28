import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../src/services/firebase';
import { authStyles as styles } from '../src/styles/styles';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
      router.replace('/home');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>LembreiMe</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#9CA3AF"
          autoCapitalize="none"
          editable={!loading}
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          editable={!loading}
          style={styles.input}
        />

        <TouchableOpacity 
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>{loading ? 'ENTRANDO...' : 'ENTRAR'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/forgot-password')}>
          <Text style={styles.link}>
            Esqueceu a senha? <Text style={styles.linkBold}>Recuperar</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.link}>
            Não tem conta? <Text style={styles.linkBold} onPress={() => router.push('/register')}>Criar agora</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
