import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { API_BASE_URL } from "../../utils/constants"; // update path if needed
import { useAuthStore } from "../../store/authStore"; 

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore.getState().token;

  const patientId = 1; // Hardcoded for now

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/patient/${patientId}/appointments`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        
        const json = await response.json();

        if (response.ok && json.appointments) {
          setAppointments(json.appointments);
        } else {
          console.error("Failed to load appointments:", json.error || "Unknown error");
        }
      } catch (error) {
        console.error("Network error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.docName}>{item.doctor_name}</Text>
      <Text style={styles.details}>Date: {formatDate(item.date)}</Text>
      <Text style={styles.details}>Time: {formatTime(item.time)}</Text>
      <Text style={styles.details}>Status: {item.status}</Text>
      {item.notes && <Text style={styles.details}>Notes: {item.notes}</Text>}
    </View>
  );

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = (isoTime: string) => {
    const time = new Date(`1970-01-01T${isoTime}`);
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Appointments</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 20 }} />
      ) : appointments.length === 0 ? (
        <Text style={{ color: "#fff", textAlign: "center", marginTop: 20 }}>
          No appointments found.
        </Text>
      ) : (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#284b63" },
  header: { 
    fontSize: 22, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 15, 
    color: "#ffffff" 
  },
  appointmentCard: {
    padding: 15,
    backgroundColor: "#f0f5f9", // Light card background for contrast
    borderRadius: 10,
    marginBottom: 10,
  },
  docName: { fontSize: 18, fontWeight: "bold", color: "#284b63" },
  details: { fontSize: 16, color: "#284b63" },
  fee: { fontSize: 16, fontWeight: "bold", color: "#d32f2f" }, // Red for highlighting fee
});

export default AppointmentScreen;