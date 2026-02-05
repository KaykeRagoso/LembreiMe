// app/index.tsx
import { Task, taskService } from '@/src/services/tasks';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Buscar tarefas
  const fetchTasks = async () => {
    try {
      const fetchedTasks = await taskService.getTasks();
      setTasks(fetchedTasks);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar as tarefas');
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Carregar tarefas ao iniciar
  useEffect(() => {
    fetchTasks();
  }, []);

  // Deletar tarefa
  const handleDelete = async (id: string, title: string) => {
    Alert.alert(
      'Deletar Tarefa',
      `Tem certeza que deseja deletar "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: async () => {
            try {
              await taskService.deleteTask(id);
              await fetchTasks(); // Recarregar lista
              Alert.alert('Sucesso', 'Tarefa deletada!');
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível deletar a tarefa');
            }
          },
        },
      ]
    );
  };

  // Alternar status
  const handleToggle = async (id: string, completed: boolean) => {
    try {
      await taskService.toggleTask(id, completed);
      await fetchTasks(); // Recarregar lista
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa');
    }
  };

  // Renderizar cada tarefa
  const renderTask = ({ item }: { item: Task }) => (
    <View style={styles.taskCard}>
      <TouchableOpacity 
        style={styles.taskContent}
        onPress={() => handleToggle(item.id, item.completed)}
      >
        <View style={styles.checkbox}>
          {item.completed ? (
            <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
          ) : (
            <Ionicons name="ellipse-outline" size={24} color="#666" />
          )}
        </View>
        
        <View style={styles.taskInfo}>
          <Text style={[
            styles.taskTitle,
            item.completed && styles.taskCompleted
          ]}>
            {item.title}
          </Text>
          {item.description ? (
            <Text style={styles.taskDescription}>{item.description}</Text>
          ) : null}
          <Text style={styles.taskDate}>
            Criada em: {item.createdAt.toLocaleDateString('pt-BR')}
          </Text>
        </View>
      </TouchableOpacity>

      <View style={styles.taskActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push(`/edit/${item.id}`)}
        >
          <Ionicons name="pencil" size={20} color="#007AFF" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => handleDelete(item.id, item.title)}
        >
          <Ionicons name="trash" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Tela de loading
  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando tarefas...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📋 Minhas Tarefas</Text>
        <Text style={styles.subtitle}>
          {tasks.length} {tasks.length === 1 ? 'tarefa' : 'tarefas'}
        </Text>
      </View>

      {/* Lista de tarefas */}
      <FlatList
        data={tasks}
        renderItem={renderTask}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="checkmark-done-circle" size={64} color="#DDD" />
            <Text style={styles.emptyText}>Nenhuma tarefa ainda</Text>
            <Text style={styles.emptySubtext}>
              Toque no botão abaixo para criar sua primeira tarefa
            </Text>
          </View>
        }
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          fetchTasks();
        }}
      />

      {/* Botão flutuante para adicionar */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push('/create')}
      >
        <Ionicons name="add" size={28} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  taskCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  taskContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkbox: {
    marginRight: 12,
    marginTop: 2,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  taskCompleted: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  taskDate: {
    fontSize: 12,
    color: '#999',
  },
  taskActions: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  actionButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    padding: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#AAA',
    textAlign: 'center',
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});