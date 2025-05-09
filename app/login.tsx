import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const LoginScreen = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    
    // Simulate successful login
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            placeholderTextColor="#909090"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {email.length > 0 && (
            <MaterialIcons 
              name="check-circle" 
              size={24} 
              color="#4CAF50" 
              style={styles.icon} 
            />
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput 
            style={styles.input} 
            placeholder="Password" 
            placeholderTextColor="#909090"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible} 
            autoCapitalize="none"
          />
          <TouchableOpacity 
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.iconButton}
          >
            <FontAwesome 
              name={passwordVisible ? "eye-slash" : "eye"} 
              size={20} 
              color="#607D8B" 
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.utilityContainer}>
        <TouchableOpacity style={styles.rememberMe}>
          <MaterialIcons name="check-box-outline-blank" size={20} color="#607D8B" />
          <Text style={styles.utilityText}> Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/forgot-password")}>
          <Text style={[styles.utilityText, styles.link]}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity 
        style={styles.primaryButton}
        onPress={handleSignIn}
        activeOpacity={0.9}
      >
        <Text style={styles.primaryButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => router.push("/register")}
        activeOpacity={0.7}
      >
        <Text style={styles.secondaryText}>
          Don't have an account?{' '}
          <Text style={styles.secondaryLink}>Sign Up</Text>
        </Text>
      </TouchableOpacity>

      <View style={styles.divider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>OR</Text>
        <View style={styles.dividerLine} />
      </View>

      <View style={styles.socialContainer}>
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => Alert.alert("Google Sign In")}
        >
          <Image 
            source={{ uri: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png" }} 
            style={styles.socialIcon} 
          />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.socialButton}
          onPress={() => Alert.alert("Facebook Sign In")}
        >
          <FontAwesome name="facebook" size={24} color="#1877F2" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 32,
    justifyContent: "center",
  },
  header: {
    marginBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#284b63",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#757575",
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#424242",
  },
  icon: {
    marginLeft: 8,
  },
  iconButton: {
    padding: 8,
  },
  utilityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  rememberMe: {
    flexDirection: "row",
    alignItems: "center",
  },
  utilityText: {
    color: "#757575",
    fontSize: 14,
  },
  link: {
    color: "#284b63",
    fontWeight: "500",
  },
  primaryButton: {
    backgroundColor: "#284b63",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 24,
    elevation: 3,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryText: {
    color: "#757575",
    textAlign: "center",
    marginBottom: 24,
  },
  secondaryLink: {
    color: "#284b63",
    fontWeight: "600",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E0E0E0",
  },
  dividerText: {
    color: "#757575",
    paddingHorizontal: 12,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
  socialButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
});

export default LoginScreen;