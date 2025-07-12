import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useAuthStore } from "../../store/authStore";
import { API_BASE_URL } from "../../utils/constants";

export default function RemindersScreen() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading]   = useState(true);

  const token    = useAuthStore.getState().token;     // idToken
  const patientId = useAuthStore.getState().localId;  // numeric id from profile

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const localNow = new Date();
        const tzCorrected = new Date(localNow.getTime() - localNow.getTimezoneOffset() * 60000);
        const nowISO = tzCorrected.toISOString().slice(0, 19); // “2025‑07‑13T00:12:00”

        const res = await fetch(
          `${API_BASE_URL}/medication/patient/${patientId}/today?now=${encodeURIComponent(
            nowISO
          )}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        if (res.ok && data.reminders) {
          // map to UI shape + convert 24‑h → 12‑h with AM/PM
          const mapped = data.reminders.map((r) => ({
            id: String(r.medication_id),
            name: r.drug_name,
            time: to12h(r.time),
            note: r.notes,
          }));
          setReminders(mapped);
        } else {
          console.warn(data.error || "Failed to load reminders");
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  /**  '14:00' → '02:00 PM' */
  const to12h = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = ((h + 11) % 12) + 1;
    return `${hour12.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")} ${suffix}`;
  };

  const renderItem = ({ item }) => (
    <View style={styles.reminderCard}>
      <Text style={styles.medName}>{item.name}</Text>
      <Text style={styles.medTime}>{item.time}</Text>
      <Text style={styles.medTime}>{item.note}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Medication Reminders</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" />
      ) : reminders.length === 0 ? (
        <Text style={{ color: "#fff", textAlign: "center" }}>
          No doses remaining today
        </Text>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      )}
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
    color: "#ffffff",
  },
  reminderCard: {
    padding: 15,
    backgroundColor: "#f0f5f9",
    borderRadius: 10,
    marginBottom: 10,
  },
  medName: { fontSize: 18, fontWeight: "bold", color: "#284b63" },
  medTime: { fontSize: 16, color: "#284b63" },
});
