// app/_layout.tsx
import { AuthProvider } from "@/src/context/AuthContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Telas públicas */}
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="forgot-password" />
        
        {/* Telas protegidas */}
        <Stack.Screen name="home" />
        <Stack.Screen name="profile" />
      </Stack>
    </AuthProvider>
  );
}