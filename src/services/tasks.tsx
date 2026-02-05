// src/services/tasks.ts
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    orderBy,
    query,
    Timestamp,
    updateDoc
} from 'firebase/firestore';
import { db } from './firebase';

// Tipo da tarefa
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Coleção no Firestore
const tasksCollection = collection(db, 'tasks');

// CRUD de tarefas
export const taskService = {
  // Criar tarefa
  async createTask(title: string, description?: string): Promise<Task> {
    try {
      const newTask = {
        title,
        description: description || '',
        completed: false,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      };

      const docRef = await addDoc(tasksCollection, newTask);
      
      return {
        id: docRef.id,
        ...newTask,
        createdAt: newTask.createdAt.toDate(),
        updatedAt: newTask.updatedAt.toDate(),
      };
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      throw error;
    }
  },

  // Ler todas as tarefas
  async getTasks(): Promise<Task[]> {
    try {
      const q = query(tasksCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const tasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tasks.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          completed: data.completed,
          createdAt: data.createdAt.toDate(),
          updatedAt: data.updatedAt.toDate(),
        });
      });
      
      return tasks;
    } catch (error) {
      console.error('Erro ao buscar tarefas:', error);
      throw error;
    }
  },

  // Atualizar tarefa
  async updateTask(id: string, updates: Partial<Omit<Task, 'id'>>): Promise<void> {
    try {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, {
        ...updates,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      throw error;
    }
  },

  // Deletar tarefa
  async deleteTask(id: string): Promise<void> {
    try {
      const taskRef = doc(db, 'tasks', id);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
      throw error;
    }
  },

  // Alternar status (completa/não completa)
  async toggleTask(id: string, completed: boolean): Promise<void> {
    try {
      const taskRef = doc(db, 'tasks', id);
      await updateDoc(taskRef, {
        completed: !completed,
        updatedAt: Timestamp.now(),
      });
    } catch (error) {
      console.error('Erro ao alternar tarefa:', error);
      throw error;
    }
  },
};