import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
        <Ionicons name="close" size={28} color="#fff" />
      </TouchableOpacity>

      <Image 
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/189/189664.png" }} 
        style={styles.icon} 
      />
      
      <Text style={styles.title}>It's okay! Reset your password</Text>
      
      <TextInput 
        style={styles.input} 
        placeholder="Enter Email/Phone number" 
        placeholderTextColor="#B0BEC5"
        value={email}
        onChangeText={setEmail}
      />
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => router.push("/change-password")}
      >
        <Text style={styles.buttonText}>Continue</Text>
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
  closeButton: {
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
    fontSize: 18,
    color: "#fff",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
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

export default ForgotPasswordScreen;
