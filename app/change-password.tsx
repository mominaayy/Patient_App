import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ChangePasswordScreen = () => {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {
    if (!code || !newPassword || !confirmPassword) {
      alert("Please fill all fields!");
      return;
    }
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    // Simulate a successful password reset
    alert("Password reset successful!");
    
    // Navigate to Success Screen
    router.push("/sucess-screen");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Image 
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/189/189664.png" }} 
        style={styles.icon} 
      />
      
      <Text style={styles.title}>Reset your password</Text>
      <Text style={styles.subtitle}>We have sent a four-digit code on your phone/email.</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Four digit code" 
        placeholderTextColor="#B0BEC5"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
      />

      <TextInput 
        style={styles.input} 
        placeholder="New password" 
        placeholderTextColor="#B0BEC5"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Confirm password" 
        placeholderTextColor="#B0BEC5"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#284b63",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#B0BEC5",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#284b63",
  },
});

export default ChangePasswordScreen;
