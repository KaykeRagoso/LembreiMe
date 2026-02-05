// app/edit/[id].tsx
import { Task, taskService } from '@/src/services/tasks';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditTaskScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Carregar tarefa
  useEffect(() => {
    if (!id) {
      Alert.alert('Erro', 'ID da tarefa não encontrado');
      router.back();
      return;
    }

    const loadTask = async () => {
      try {
        setLoading(true);
        const tasks = await taskService.getTasks();
        const foundTask = tasks.find(t => t.id === id);
        
        if (!foundTask) {
          Alert.alert('Erro', 'Tarefa não encontrada');
          router.back();
          return;
        }
        
        setTask(foundTask);
        setTitle(foundTask.title);
        setDescription(foundTask.description || '');
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar a tarefa');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadTask();
  }, [id]);

  // Salvar alterações
  const handleSave = async () => {
    if (!task || !title.trim()) {
      Alert.alert('Atenção', 'Digite um título para a tarefa');
      return;
    }

    if (title.length > 100) {
      Alert.alert('Atenção', 'O título deve ter no máximo 100 caracteres');
      return;
    }

    // Verificar se houve alterações
    if (title === task.title && description === (task.description || '')) {
      Alert.alert('Atenção', 'Nenhuma alteração foi feita');
      return;
    }

    setSaving(true);

    try {
      await taskService.updateTask(task.id, {
        title: title.trim(),
        description: description.trim(),
      });
      
      Alert.alert(
        'Sucesso!',
        'Tarefa atualizada com sucesso',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível atualizar a tarefa');
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  // Tela de loading
  if (loading) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando tarefa...</Text>
      </SafeAreaView>
    );
  }

  if (!task) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <Ionicons name="alert-circle" size={64} color="#FF9500" />
        <Text style={styles.errorText}>Tarefa não encontrada</Text>
        <TouchableOpacity style={styles.backButtonFull} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#007AFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Editar Tarefa</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* Informações da tarefa */}
          <View style={styles.taskInfo}>
            <Text style={styles.taskMeta}>
              Criada em: {task.createdAt.toLocaleDateString('pt-BR')}
            </Text>
            <Text style={styles.taskMeta}>
              Status: {task.completed ? 'Concluída' : 'Pendente'}
            </Text>
          </View>

          {/* Formulário */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Título *</Text>
              <TextInput
                style={styles.input}
                placeholder="Título da tarefa"
                value={title}
                onChangeText={setTitle}
                maxLength={100}
              />
              <Text style={styles.charCount}>
                {title.length}/100 caracteres
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Descrição</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Descrição da tarefa"
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Botões */}
            <View style={styles.buttons}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => router.back()}
                disabled={saving}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.button,
                  styles.saveButton,
                  (!title.trim() || saving) && styles.saveButtonDisabled,
                ]}
                onPress={handleSave}
                disabled={!title.trim() || saving}
              >
                {saving ? (
                  <Text style={styles.saveButtonText}>Salvando...</Text>
                ) : (
                  <Text style={styles.saveButtonText}>Salvar Alterações</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 18,
    color: '#FF9500',
    marginTop: 16,
    marginBottom: 24,
  },
  backButtonFull: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    padding: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  taskInfo: {
    backgroundColor: '#FFF',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  taskMeta: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    minHeight: 100,
    maxHeight: 200,
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 4,
  },
  buttons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 32,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F0F0F0',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#007AFF',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});