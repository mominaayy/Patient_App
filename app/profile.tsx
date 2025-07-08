import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Toast from "react-native-toast-message";
import { CheckCircle } from "lucide-react";
import { API_BASE_URL } from "../utils/constants";
import { useAuthStore } from "../store/authStore";

export default function PatientProfileScreen() {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("FEMALE");
  const [phone, setPhone] = useState("");
  const [medicalCondition, setMedicalCondition] = useState("");
  const [loading, setLoading] = useState(true);

  const token = useAuthStore.getState().token;
  const userId = useAuthStore.getState().uid;

  useEffect(() => {
    const fetchPatientProfile = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/patient/${userId}`);
        const data = await response.json();

        if (response.ok) {
          setFullName(data.full_name || "");
          setAge(data.age?.toString() || "");
          setGender(data.gender || "OTHER");
          setPhone(data.phone_number || "");
          setMedicalCondition(data.medical_condition || "");
        } else {
          throw new Error(data?.error || "Failed to load profile");
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Error loading profile",
          text2: error.message,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPatientProfile();
  }, []);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ActivityIndicator size="large" color="#284b63" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Profile</Text>

      <Text style={styles.label}>Full Name</Text>
      <TextInput style={styles.input} value={fullName} editable={false} />

      <Text style={styles.label}>Age</Text>
      <TextInput style={styles.input} value={age} editable={false} />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.genderContainer}>
        {["MALE", "FEMALE", "OTHER"].map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.genderButton,
              gender === option && styles.selectedGender,
            ]}
            disabled
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
      <TextInput style={styles.input} value={phone} editable={false} />

      <Text style={styles.label}>Medical Condition</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={medicalCondition}
        editable={false}
        multiline
      />

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
    backgroundColor: "#f9fafb",
    color: "#333",
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
