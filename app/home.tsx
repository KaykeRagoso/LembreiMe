import { router } from 'expo-router';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TaskCard from '../src/components/TaskCard';
import { auth } from '../src/services/firebase';

interface Task {
  id: string;
  title: string;
  description?: string;
  date?: string;
  priority?: 'low' | 'medium' | 'high';
  done?: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    setTasks([
      {
        id: '1',
        title: 'Estudar Firestore',
        description: 'Criar collections e regras',
        date: 'Hoje',
        priority: 'high',
        done: false,
      },
      {
        id: '2',
        title: 'Ajustar layout',
        description: 'Deixar tudo clean e redondo',
        date: 'Amanhã',
        priority: 'medium',
        done: true,
      },
    ]);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace('/login');
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá {auth.currentUser?.displayName || 'usuário'}</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('pt-BR', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>

        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logout}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={({ item }) => (
          <TaskCard
            title={item.title}
            description={item.description}
            date={item.date}
            priority={item.priority}
            done={item.done}
            onToggle={() => console.log('toggle', item.id)}
          />
        )}
      />

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    paddingTop: 60,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },

  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },

  date: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
    textTransform: 'capitalize',
  },

  logout: {
    fontSize: 14,
    color: '#EF4444',
    fontWeight: '600',
  },

  fab: {
    position: 'absolute',
    right: 24,
    bottom: 32,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4F46E5',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },

  fabText: {
    fontSize: 32,
    color: '#FFF',
    lineHeight: 32,
  },
});
