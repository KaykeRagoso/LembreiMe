import { useRouter } from 'expo-router';
import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../src/services/firebase';

export default function ResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleReset = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Email de redefinição enviado!');
      router.push('/');
    } catch (error: any) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LembreiMe</Text>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Text style={styles.icon}>📧</Text>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
      </View>

      {/* Botão */}
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Redefinir Senha</Text>
      </TouchableOpacity>

      {/* Link */}
      <View style={styles.linksContainer}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.link}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 30, backgroundColor: '#f5faff' },
  title: { fontSize: 36, fontWeight: 'bold', textAlign: 'center', marginBottom: 40, color: '#0077b6' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  icon: { fontSize: 18, marginRight: 10 },
  input: { flex: 1, paddingVertical: 12, fontSize: 16 },
  button: { backgroundColor: '#0077b6', padding: 15, borderRadius: 25, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
  linksContainer: { marginTop: 20, alignItems: 'center' },
  link: { color: '#0077b6', textDecorationLine: 'underline', marginTop: 10, fontSize: 16 },
});
