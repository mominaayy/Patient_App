import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const SuccessScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </TouchableOpacity>

      <Image 
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/2922/2922510.png" }} 
        style={styles.icon} 
      />
      
      <Text style={styles.title}>Woo hoo!</Text>
      <Text style={styles.subtitle}>Your password has been reset successfully!</Text>
      <Text style={styles.subtitle}>Now login with your new password.</Text>

      <TouchableOpacity style={styles.button} onPress={() => router.push("/login")}>
        <Text style={styles.buttonText}>Login</Text>
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
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: "#B0BEC5",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#284b63",
  },
});

export default SuccessScreen;
