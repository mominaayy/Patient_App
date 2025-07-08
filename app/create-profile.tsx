import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { CheckCircle } from "lucide-react";
import { API_BASE_URL } from "../utils/constants";
import { useAuthStore } from "../store/authStore";

export function CreatePatientProfileScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Female");
  const [phone, setPhone] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const setLocalId = useAuthStore((state) => state.setLocalId);

  const handleCreateProfile = async () => {
    if (!fullName || !age || !gender || !phone) {
      Toast.show({
        type: "error",
        text1: "All fields except medical condition are required.",
      });
      return;
    }

    const token = useAuthStore.getState().token;
    const userId = useAuthStore.getState().uid;

    const payload = {
      user_firebase_uid: userId,
      full_name: fullName,
      age: parseInt(age),
      gender: gender.toUpperCase(),
      phone_number: phone,
      medical_condition: medicalCondition || null,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/patient/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok && data.profile?.id) {
        // ✅ Set local ID from newly created profile
        setLocalId(data.profile.id);

        Toast.show({
          type: "success",
          text1: "Profile created successfully",
        });

        setTimeout(() => {
          router.push("/home");
        }, 1500);
      } else {
        throw new Error(data?.error || "Profile creation failed");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create Your Profile</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
      />

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        {["Male", "Female", "Other"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.genderButton,
              gender === option && styles.selectedGender,
            ]}
            onPress={() => setGender(option)}
          >
            <Text
              style={[
                styles.genderText,
                gender === option && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Medical Condition (optional)</Text>
      <TextInput
        style={styles.input}
        value={medicalCondition}
        onChangeText={setMedicalCondition}
        multiline
      />

      <TouchableOpacity
        style={styles.updateButton}
        onPress={handleCreateProfile}
      >
        <Text style={styles.updateButtonText}>Create Profile</Text>
      </TouchableOpacity>

      <Toast config={toastConfig} />
    </View>
  );
}

const toastConfig = {
  success: ({ text1 }) => (
    <View style={styles.successToast}>
      <CheckCircle size={20} color="white" />
      <Text style={styles.toastText}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: { fontSize: 14, fontWeight: "500", marginBottom: 5, color: "#333" },
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
    justifyContent: "space-around",
    marginBottom: 15,
  },
  genderButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  selectedGender: {
    backgroundColor: "#284b63",
  },
  genderText: {
    color: "#333",
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
  successToast: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 25,
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

export default CreatePatientProfileScreen;
