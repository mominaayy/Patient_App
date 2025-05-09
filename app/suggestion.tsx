// app/feedback.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

const FeedbackScreen = () => {
  const [feedback, setFeedback] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);

  const emojis = [
    { id: 0, emoji: '😕' },
    { id: 1, emoji: '😐' },
    { id: 2, emoji: '😊' },
    { id: 3, emoji: '😄' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.cancel}>Cancel</Text>
        <Text style={styles.title}>Feedback</Text>
        <Text style={{ width: 60 }} /> {/* Empty to balance Cancel */}
      </View>

      <Text style={styles.question}>How’s your Experience on oladoc so far?</Text>

      <View style={styles.emojiRow}>
        {emojis.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => setSelectedEmoji(item.id)}
            style={[
              styles.emojiContainer,
              selectedEmoji === item.id && styles.emojiSelected,
            ]}
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.feedbackLabel}>Your Feedback</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Any feedback or suggestion about your experience on oladoc"
        placeholderTextColor="#999"
        value={feedback}
        onChangeText={setFeedback}
      />

      <Text style={styles.privacyText}>Oladoc keeps your feedback private</Text>

      <TouchableOpacity
        style={[
          styles.submitButton,
          !(feedback || selectedEmoji !== null) && styles.submitDisabled,
        ]}
        disabled={!(feedback || selectedEmoji !== null)}
      >
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeedbackScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cancel: {
    color: '#284b63',
    fontSize: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  question: {
    marginTop: 30,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '500',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  emojiContainer: {
    padding: 10,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emojiSelected: {
    borderColor: '#284b63',
  },
  emoji: {
    fontSize: 28,
  },
  feedbackLabel: {
    fontSize: 14,
    marginBottom: 5,
    marginTop: 10,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    backgroundColor: '#f7f9fc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    height: 120,
    textAlignVertical: 'top',
    fontSize: 14,
    color: '#333',
  },
  privacyText: {
    marginTop: 10,
    fontSize: 12,
    color: '#777',
    textAlign: 'left',
  },
  submitButton: {
    backgroundColor: '#284b63',
    padding: 15,
    marginTop: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitDisabled: {
    backgroundColor: '#eee',
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
