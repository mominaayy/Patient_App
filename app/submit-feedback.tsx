import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from 'expo-router';

interface FeedbackModalProps {
  visible: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ visible, onClose }) => {
    const router = useRouter();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <FontAwesome name="check-circle" size={50} color="green" />
          <Text style={styles.title}>Feedback submitted successfully!</Text>
          <Text style={styles.subtitle}>
            We will try our best to ensure your best experience on the app.
          </Text>

          <TouchableOpacity style={styles.buttonPrimary} onPress={() => {}}>
            <Text style={styles.buttonText}>Rate us on Playstore</Text>
          </TouchableOpacity>

          <TouchableOpacity 
      style={styles.buttonSecondary} 
      onPress={() => {
        router.push('/home'); // Navigate to Home
        onClose && onClose(); // Close modal if `onClose` is provided
      }}
    >
      <Text style={styles.buttonTextSecondary}>Remind me Later</Text>
    </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginVertical: 10,
  },
  buttonPrimary: {
    backgroundColor: "#284b63", // Updated button color
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonSecondary: {
    borderColor: "#284b63",
    borderWidth: 1,
    paddingVertical: 12,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextSecondary: {
    color: "#284b63",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default FeedbackModal;
