import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, Button, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../src/services/firebase';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert('Login realizado com sucesso!');
      // Aqui você pode navegar para a tela principal do app
      // router.push('/home');
    } catch (error: any) {
      Alert.alert('Erro no login', error.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 5 }}
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
        <TouchableOpacity onPress={() => router.push('../register')}>
          <Text style={{ color: 'blue' }}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('../reset-password')}>
          <Text style={{ color: 'blue' }}>Esqueci a senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
