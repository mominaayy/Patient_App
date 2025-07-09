// app/book-consultation.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import Toast from "react-native-toast-message";
// import { CircleCheck } from "lucide-react";
import { API_BASE_URL } from "../utils/constants";
import { useAuthStore } from "../store/authStore";

const BookConsultation = () => {
  const { doctorId, name, specialty } = useLocalSearchParams();
  const router = useRouter();
  const params = useLocalSearchParams();

  // Doctor details
  const doctor = {
    id: doctorId,
    name: name,
    specialty: specialty,
  };

  // Form state
  const [patientName, setPatientName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [procedure, setProcedure] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showProcedureModal, setShowProcedureModal] = useState(false);

  // Procedure options
  const procedures = [
    "Medical Examination",
    "Regular Check-up",
    "Result Analysis",
    "Consultation",
    "Follow-up Visit",
    "Vaccination",
  ];

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatTimeForBackend = (time: Date) => {
    const hours = String(time.getHours()).padStart(2, "0");
    const minutes = String(time.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handleBookAppointment = async () => {
    if (!patientName || !gender || !phone || !address || !procedure) {
      Toast.show({
        type: "error",
        text1: "Missing Information",
        text2: "Please fill in all required fields",
      });
      return;
    }

    const token = useAuthStore.getState().token;
    const localId = useAuthStore.getState().localId;

    // Create payload
    const payload = {
      doctor_id: doctorId,
      patient_id: localId,
      appointment_date: date.toISOString().split("T")[0], // format: YYYY-MM-DD
      appointment_time: formatTimeForBackend(time), // format: HH:MM
    };

    try {
      const response = await fetch(`${API_BASE_URL}/appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Optional: only if protected
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Booking Failed",
          text2: result.error || "Unable to confirm the appointment.",
        });
        return;
      }

      // Show success
      Toast.show({
        type: "success",
        position: "bottom",
        text1: "Appointment Confirmed",
        text2: `Your appointment with ${doctor.name} has been booked!`,
        visibilityTime: 2000,
        autoHide: true,
        bottomOffset: 50,
      });

      setTimeout(() => {
        router.replace("/home");
      }, 2000);
    } catch (error) {
      console.error("Error booking appointment:", error);
      Toast.show({
        type: "error",
        text1: "Network Error",
        text2: "Please try again later.",
      });
    }
  };

  const renderDoctorInfo = () => (
    <View style={styles.doctorCard}>
      <View style={styles.avatarPlaceholder}>
        <Ionicons name="person" size={32} color="#fff" />
      </View>

      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{doctor.name}</Text>
        <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
      </View>
    </View>
  );

  const renderFormField = (
    label,
    value,
    placeholder,
    onChange,
    iconName,
    isPicker = false,
    onPress = null
  ) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <Ionicons
          name={iconName}
          size={20}
          color="#6c757d"
          style={styles.inputIcon}
        />
        {isPicker ? (
          <TouchableOpacity style={styles.input} onPress={onPress}>
            <Text style={value ? styles.inputText : styles.placeholderText}>
              {value || placeholder}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6c757d" />
          </TouchableOpacity>
        ) : (
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#aaa"
            value={value}
            onChangeText={onChange}
          />
        )}
      </View>
    </View>
  );

  const renderGenderOptions = () => (
    <View style={styles.genderContainer}>
      {["Male", "Female", "Other"].map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.genderOption,
            gender === option && styles.selectedGenderOption,
          ]}
          onPress={() => setGender(option)}
        >
          <View
            style={[
              styles.genderRadio,
              gender === option && styles.selectedGenderRadio,
            ]}
          >
            {gender === option && <View style={styles.genderRadioInner} />}
          </View>
          <Text style={styles.genderText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Book Appointment</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.formContainer}>
          {renderDoctorInfo()}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Patient Information</Text>
            <View style={styles.divider} />
          </View>

          {renderFormField(
            "Full Name",
            patientName,
            "Enter patient's full name",
            setPatientName,
            "person"
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Gender</Text>
            {renderGenderOptions()}
          </View>

          {renderFormField(
            "Contact Number",
            phone,
            "Enter phone number",
            setPhone,
            "call"
          )}
          {renderFormField(
            "Address",
            address,
            "Enter full address",
            setAddress,
            "location"
          )}

          {renderFormField(
            "Procedure",
            procedure,
            "Select procedure type",
            null,
            "medkit",
            true,
            () => setShowProcedureModal(true)
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Appointment Details</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.dateTimeContainer}>
            <View style={styles.dateTimeGroup}>
              <Text style={styles.label}>Appointment Date</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar" size={20} color="#284b63" />
                <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                />
              )}
            </View>

            <View style={styles.dateTimeGroup}>
              <Text style={styles.label}>Appointment Time</Text>
              <TouchableOpacity
                style={styles.dateTimeButton}
                onPress={() => setShowTimePicker(true)}
              >
                <Ionicons name="time" size={20} color="#284b63" />
                <Text style={styles.dateTimeText}>{formatTime(time)}</Text>
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  display="spinner"
                  onChange={handleTimeChange}
                />
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.bookButton}
            onPress={handleBookAppointment}
          >
            <Text style={styles.bookButtonText}>Confirm Appointment</Text>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#fff"
              style={styles.bookIcon}
            />
          </TouchableOpacity>
        </View>

        {/* Procedure Selection Modal */}
        <Modal
          visible={showProcedureModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowProcedureModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Select Procedure</Text>

              <View style={styles.modalScroll}>
                {procedures.map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={[
                      styles.procedureOption,
                      procedure === item && styles.selectedProcedureOption,
                    ]}
                    onPress={() => {
                      setProcedure(item);
                      setShowProcedureModal(false);
                    }}
                  >
                    <Ionicons
                      name={
                        procedure === item
                          ? "radio-button-on"
                          : "radio-button-off"
                      }
                      size={20}
                      color={procedure === item ? "#284b63" : "#aaa"}
                    />
                    <Text style={styles.procedureText}>{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setShowProcedureModal(false)}
              >
                <Text style={styles.modalCloseText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>

      {/* Toast Component */}
      <Toast config={toastConfig} />
    </View>
  );
};

// Custom Toast Configuration
const toastConfig = {
  success: ({ text1, text2 }) => (
    <View style={styles.successToast}>
      <View style={styles.toastTextContainer}>
        <Text style={styles.toastText1}>{text1}</Text>
        <Text style={styles.toastText2}>{text2}</Text>
      </View>
    </View>
  ),
  error: ({ text1, text2 }) => (
    <View style={styles.errorToast}>
      <Ionicons name="warning" size={20} color="white" />
      <View style={styles.toastTextContainer}>
        <Text style={styles.toastText1}>{text1}</Text>
        <Text style={styles.toastText2}>{text2}</Text>
      </View>
    </View>
  ),
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#284b63",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  formContainer: {
    padding: 20,
  },
  doctorCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#284b63",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 6,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: "#495057",
  },
  feeContainer: {
    backgroundColor: "#e8f4ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  feeText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#284b63",
  },
  sectionHeader: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: "#e9ecef",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#212529",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 0,
  },
  inputText: {
    fontSize: 16,
    color: "#212529",
  },
  placeholderText: {
    fontSize: 16,
    color: "#aaa",
  },
  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 8,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  genderOption: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  selectedGenderOption: {
    backgroundColor: "#f0f7ff",
  },
  genderRadio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#adb5bd",
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedGenderRadio: {
    borderColor: "#284b63",
  },
  genderRadioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#284b63",
  },
  genderText: {
    fontSize: 15,
    color: "#495057",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  dateTimeGroup: {
    width: "48%",
  },
  dateTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  dateTimeText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#212529",
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#284b63",
    paddingVertical: 16,
    borderRadius: 14,
    marginTop: 10,
    shadowColor: "#284b63",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  bookButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginRight: 10,
  },
  bookIcon: {
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 30,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#212529",
    marginBottom: 20,
    textAlign: "center",
  },
  modalScroll: {
    maxHeight: 300,
  },
  procedureOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f3f5",
  },
  selectedProcedureOption: {
    backgroundColor: "#f0f7ff",
    borderRadius: 10,
  },
  procedureText: {
    fontSize: 16,
    color: "#495057",
    marginLeft: 15,
  },
  modalCloseButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    alignItems: "center",
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#495057",
  },
  // Toast Styles
  successToast: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 25,
    width: "90%",
    alignSelf: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  errorToast: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F44336",
    padding: 15,
    borderRadius: 25,
    width: "90%",
    alignSelf: "center",
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  toastTextContainer: {
    marginLeft: 15,
  },
  toastText1: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  toastText2: {
    color: "white",
    fontSize: 14,
    marginTop: 2,
  },
});

export default BookConsultation;
