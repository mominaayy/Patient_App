import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { CheckCircle } from "lucide-react-native"; // Importing checkmark icon

export default function ProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("Female");

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem("userProfile");
        if (userData) {
          const parsedData = JSON.parse(userData);
          setName(parsedData.name || "");
          setEmail(parsedData.email || "");
          setAge(parsedData.age || "");
          setPassword(parsedData.password || "");
          setGender(parsedData.gender || "Female");
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      }
    };
    loadUserData();
  }, []);

  const handleUpdateProfile = async () => {
    if (!name || !email || !age || !password) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "All fields are required!",
      });
      return;
    }

    const updatedProfile = { name, email, age, password, gender };
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(updatedProfile));

      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Profile updated successfully",
        visibilityTime: 2000,
        autoHide: true,
        bottomOffset: 50,
      });

      setTimeout(() => {
        router.push("/home"); // Navigate to home screen after showing toast
      }, 2000);
    } catch (error) {
      console.error("Error saving user data:", error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to update profile.",
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />

      <Text style={styles.label}>Age</Text>
      <TextInput style={styles.input} value={age} onChangeText={setAge} placeholder="Enter your age" keyboardType="numeric" />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        <TouchableOpacity
          style={[styles.genderButton, gender === "Male" && styles.selectedGender]}
          onPress={() => setGender("Male")}
        >
          <Text style={[styles.genderText, gender === "Male" && styles.selectedText]}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === "Female" && styles.selectedGender]}
          onPress={() => setGender("Female")}
        >
          <Text style={[styles.genderText, gender === "Female" && styles.selectedText]}>Female</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Enter password" secureTextEntry={true} />

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdateProfile}>
        <Text style={styles.updateButtonText}>Update Profile</Text>
      </TouchableOpacity>

      <Toast config={toastConfig} />
    </View>
  );
}

// Custom Toast Configuration
const toastConfig = {
  success: ({ text1 }) => (
    <View style={styles.successToast}>
      <CheckCircle size={20} color="white" />
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 5,
    color: "#333",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  genderContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 15,
  },
  genderButton: {
    flex: 1,
    padding: 15,
    alignItems: "center",
  },
  selectedGender: {
    backgroundColor: "#284b63",
  },
  genderText: {
    fontSize: 14,
    color: "#555",
  },
  selectedText: {
    color: "#fff",
    fontWeight: "bold",
  },
  updateButton: {
    backgroundColor: "#284b63",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  // Custom Toast Styles
  successToast: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50", // Green background
    padding: 10,
    borderRadius: 25, // Rounded shape
    width: "80%",
    alignSelf: "center",
    justifyContent: "center",
  },
  toastText: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfileScreen;
