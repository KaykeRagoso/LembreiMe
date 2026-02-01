// App.js
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Reunião com equipe', completed: true },
    { id: 2, text: 'Enviar relatório', completed: false },
    { id: 3, text: 'Comprar presentes', completed: false },
    { id: 4, text: 'Academia às 18:00', completed: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.time}>3:41</Text>
        <Text style={styles.title}>Minhas Tarefas</Text>
      </View>

      {/* Lista de Tarefas */}
      <View style={styles.tasksSection}>
        <ScrollView style={styles.tasksList}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.taskRow}>
              <TouchableOpacity 
                style={styles.checkboxWrapper}
                onPress={() => toggleTask(task.id)}
              >
                <View style={[
                  styles.checkbox,
                  task.completed ? styles.checkboxChecked : styles.checkboxUnchecked
                ]}>
                  {task.completed && (
                    <MaterialIcons name="check" size={18} color="#FFFFFF" />
                  )}
                </View>
              </TouchableOpacity>
              <Text style={[
                styles.taskText,
                task.completed && styles.taskTextCompleted
              ]}>
                {task.text}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Barra de Navegação */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Início</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Perfil</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton}>
          <Text style={styles.navText}>Config</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  time: {
    fontSize: 48,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#000000',
  },
  tasksSection: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  tasksList: {
    paddingHorizontal: 20,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  checkboxWrapper: {
    marginRight: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  checkboxUnchecked: {
    borderColor: '#CCCCCC',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    borderColor: '#007AFF', // AZUL do iOS
    backgroundColor: '#007AFF', // AZUL do iOS
  },
  taskText: {
    fontSize: 17,
    color: '#000000',
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#666666',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#007AFF', // AZUL igual do iOS
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '500',
  },
});