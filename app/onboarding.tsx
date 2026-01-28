import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { authStyles as styles } from '../src/styles/styles';

export default function Onboarding() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Bem-vindo ao LembreiMe',
      description: 'Seu app de memórias e lembretes pessoais',
      icon: '📝',
    },
    {
      title: 'Segurança',
      description: 'Seus dados são protegidos com criptografia de ponta a ponta',
      icon: '🔒',
    },
    {
      title: 'Sincronização',
      description: 'Acesse suas lembretes de qualquer dispositivo',
      icon: '☁️',
    },
    {
      title: 'Pronto!',
      description: 'Você está pronto para começar',
      icon: '🚀',
    },
  ];

  const handleNext = async () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      try {
        await AsyncStorage.setItem('onboardingCompleted', 'true');
        router.replace('/protected/protected/home');
      } catch (error) {
        Alert.alert('Erro', 'Falha ao completar onboarding');
      }
    }
  };

  const handleSkip = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      router.replace('./home');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao pular onboarding');
    }
  };

  const currentStep = steps[step];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
        <View style={styles.card}>
          <Text style={{ fontSize: 80, marginBottom: 20, textAlign: 'center' }}>
            {currentStep.icon}
          </Text>

          <Text style={styles.logo}>{currentStep.title}</Text>

          <Text style={{ 
            fontSize: 16, 
            color: '#666', 
            textAlign: 'center',
            marginBottom: 30,
            lineHeight: 24,
          }}>
            {currentStep.description}
          </Text>

          {/* Indicadores de progresso */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 40 }}>
            {steps.map((_, index) => (
              <View
                key={index}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                  backgroundColor: index <= step ? '#3B82F6' : '#E5E7EB',
                }}
              />
            ))}
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>
              {step === steps.length - 1 ? 'COMEÇAR' : 'PRÓXIMO'}
            </Text>
          </TouchableOpacity>

          {step < steps.length - 1 && (
            <TouchableOpacity onPress={handleSkip}>
              <Text style={styles.link}>
                <Text style={styles.linkBold}>Pular</Text>
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
