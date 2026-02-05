// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark"/>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        {/* Tela inicial - lista de tarefas */}
        <Stack.Screen name="index" />
        
        {/* Tela de criar tarefa */}
        <Stack.Screen 
          name="create" 
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        
        {/* Tela de editar tarefa (parâmetro dinâmico) */}
        <Stack.Screen 
          name="edit/[id]" 
          options={{
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </>
  );
}