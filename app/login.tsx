import { router } from 'expo-router';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { authStyles as styles } from '../src/styles/styles';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.logo}>LembreiMe</Text>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#9CA3AF"
          style={styles.input}
        />

        <TextInput
          placeholder="Senha"
          placeholderTextColor="#9CA3AF"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>ENTRAR</Text>
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
