import { View, Text, FlatList, StyleSheet } from "react-native";

const appointments = [
  { 
    id: "1", 
    doctorName: "Dr. Ayesha Khan", 
    specialization: "Cardiologist", 
    appointmentTime: "09:30 AM", 
    checkupDuration: "30 mins", 
    appointmentType: "Online", 
    fee: "PKR 3,500" 
  },
  { 
    id: "2", 
    doctorName: "Dr. Faisal Iqbal", 
    specialization: "Dermatologist", 
    appointmentTime: "01:00 PM", 
    checkupDuration: "45 mins", 
    appointmentType: "In-Clinic", 
    fee: "PKR 2,800" 
  },
  { 
    id: "3", 
    doctorName: "Dr. Hina Raza", 
    specialization: "Pediatrician", 
    appointmentTime: "04:00 PM", 
    checkupDuration: "20 mins", 
    appointmentType: "Online", 
    fee: "PKR 2,000" 
  },
  { 
    id: "4", 
    doctorName: "Dr. Imran Siddiqui", 
    specialization: "Orthopedic Surgeon", 
    appointmentTime: "06:30 PM", 
    checkupDuration: "40 mins", 
    appointmentType: "In-Clinic", 
    fee: "PKR 4,500" 
  },
];

export default function AppointmentScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Appointments</Text>
      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.appointmentCard}>
            <Text style={styles.docName}>{item.doctorName}</Text>
            <Text style={styles.details}>Specialization: {item.specialization}</Text>
            <Text style={styles.details}>Appointment Time: {item.appointmentTime}</Text>
            <Text style={styles.details}>Duration: {item.checkupDuration}</Text>
            <Text style={styles.details}>Type: {item.appointmentType}</Text>
            <Text style={styles.fee}>Fee: {item.fee}</Text>
          </View>
        )}
      />
    </View>
  );
}

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
