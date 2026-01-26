import { Redirect } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../src/context/AuthContext';
import { auth } from '../src/services/firebase';

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) return null;

  if (!user) {
    return <Redirect href="/login" />;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Bem-vindo, {user.email}</Text>
      <Button title="Sair" onPress={() => signOut(auth)} />
    </View>
  );
}
