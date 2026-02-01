import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

interface TaskCardProps {
  title: string;
  description?: string;
  date?: string;
  priority?: 'low' | 'medium' | 'high';
  done?: boolean;
  onToggle: () => void;
}

export default function TaskCard({
  title,
  description,
  date,
  priority = 'low',
  done = false,
  onToggle,
}: TaskCardProps) {


  const priorityColor = {
    low: '#4CAF50',
    medium: '#FF9800',
    high: '#F44336',
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.card,
        done && styles.cardDone
      ]}
      onPress={onToggle}
    >
      {/* Checkbox */}
      <View style={styles.left}>
        <View style={[
          styles.checkbox,
          done && styles.checkboxChecked
        ]}>
          {done && <View style={styles.checkboxInner} />}
        </View>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            done && styles.titleDone
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>

        {description ? (
          <Text style={styles.description} numberOfLines={2}>
            {description}
          </Text>
        ) : null}

        <View style={styles.footer}>
          {date && <Text style={styles.date}>{date}</Text>}

          <View
            style={[
              styles.priorityDot,
              { backgroundColor: priorityColor[priority] }
            ]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  cardDone: {
    opacity: 0.6,
  },

  left: {
    justifyContent: 'center',
    marginRight: 12,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
  },

  checkboxChecked: {
    borderColor: '#4CAF50',
  },

  checkboxInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4CAF50',
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },

  titleDone: {
    textDecorationLine: 'line-through',
    color: '#777',
  },

  description: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },

  date: {
    fontSize: 12,
    color: '#999',
  },

  priorityDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});
