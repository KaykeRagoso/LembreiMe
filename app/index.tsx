import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../src/context/AuthContext';

export default function Index() {
  const { user, loading, needsOnboarding } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Se usuário logado e precisa fazer onboarding
  if (user && needsOnboarding) {
    return <Redirect href="./onboarding" />;
  }

  // Se usuário logado e já fez onboarding
  if (user) {
    return <Redirect href="./home" />;
  }

  // Se não logado, vai para login
  return <Redirect href="./login" />;
}
