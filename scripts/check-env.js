// scripts/check-env.js
require('dotenv').config();

console.log('🔍 Verificando variáveis de ambiente...\n');

const requiredVars = [
  'EXPO_PUBLIC_FIREBASE_API_KEY',
  'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
  'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'EXPO_PUBLIC_FIREBASE_APP_ID'
];

let allGood = true;

requiredVars.forEach(variable => {
  const value = process.env[variable];
  if (value && value !== `your_${variable.toLowerCase()}`) {
    console.log(`✅ ${variable}: ${value.substring(0, 10)}...`);
  } else if (value === `your_${variable.toLowerCase()}`) {
    console.log(`❌ ${variable}: NÃO CONFIGURADO (ainda com valor placeholder)`);
    allGood = false;
  } else {
    console.log(`❌ ${variable}: NÃO DEFINIDO`);
    allGood = false;
  }
});

console.log('\n' + '='.repeat(50));

if (allGood) {
  console.log('🎉 Todas as variáveis de ambiente estão configuradas!');
  process.exit(0);
} else {
  console.log('⚠️  Algumas variáveis não estão configuradas.');
  console.log('📝 Copie .env.example para .env e preencha com seus dados.');
  process.exit(1);
}