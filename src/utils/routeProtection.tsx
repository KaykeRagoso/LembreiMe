import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Proteção de Rotas
 * Define quais rotas são públicas e quais necessitam autenticação
 */

export const PUBLIC_ROUTES = [
  '/login',
  '/register',
  '/forgot-password',
];

export const PROTECTED_ROUTES = [
  '/home',
  '/profile',
];

export const ONBOARDING_ROUTES = [
  '/onboarding',
];

/**
 * Valida se uma rota pode ser acessada com base no estado do usuário
 */
export async function canAccessRoute(route: string, isAuthenticated: boolean) {
  // Rotas públicas podem ser acessadas sempre
  if (PUBLIC_ROUTES.includes(route)) {
    return true;
  }

  // Rotas protegidas precisam de autenticação
  if (PROTECTED_ROUTES.includes(route)) {
    return isAuthenticated;
  }

  // Rotas de onboarding precisam de autenticação e que não tenha completado
  if (ONBOARDING_ROUTES.includes(route)) {
    if (!isAuthenticated) return false;
    const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
    return !onboardingCompleted;
  }

  return false;
}

/**
 * Obter rota padrão baseado no estado
 */
export async function getDefaultRoute(isAuthenticated: boolean) {
  if (!isAuthenticated) {
    return '/login';
  }

  const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
  if (!onboardingCompleted) {
    return '/onboarding';
  }

  return '/home';
}
