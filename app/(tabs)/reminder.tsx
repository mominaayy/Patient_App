import { View, Text, FlatList, StyleSheet } from "react-native";

const reminders = [
  { id: "1", name: "Paracetamol", time: "08:00 AM" },
  { id: "2", name: "Antibiotics", time: "12:00 PM" },
  { id: "3", name: "Vitamin C", time: "06:00 PM" },
];

export default function RemindersScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medication Reminders</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reminderCard}>
            <Text style={styles.medName}>{item.name}</Text>
            <Text style={styles.medTime}>{item.time}</Text>
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
  reminderCard: {
    padding: 15,
    backgroundColor: "#f0f5f9", // Light background for contrast
    borderRadius: 10,
    marginBottom: 10,
  },
  medName: { fontSize: 18, fontWeight: "bold", color: "#284b63" },
  medTime: { fontSize: 16, color: "#284b63" },
});
