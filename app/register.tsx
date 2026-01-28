import { router } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../src/services/firebase';
import { authStyles as styles } from '../src/styles/styles';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sucesso', 'Conta criada com sucesso!');
      router.replace('/login');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.logo}>Cadastre-Se</Text>

            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                style={styles.input}
            />

            <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity 
              style={styles.button}
              onPress={handleRegister}
            >
            <Text style={styles.buttonText}>REGISTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity>
            <Text style={styles.link}>
                Já tem conta? <Text style={styles.linkBold} onPress={() => router.push('/login')}>Logar agora</Text>
            </Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}
