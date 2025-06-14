import React from "react";
import { View, Text, ScrollView, StyleSheet, useColorScheme } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AboutScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const theme = {
    bg: isDark ? "#121212" : "#ffffff",
    text: isDark ? "#f5f5f5" : "#3c3c3c",
    heading: "#284b63",
    cardBg: isDark ? "#1e1e1e" : "#f5f9fd",
    subText: isDark ? "#cccccc" : "#d9d9d9",
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Header Section */}
      <View style={[styles.header, styles.headerShadow]}>
        <Text style={styles.headerTitle}>About Us</Text>
        <Text style={[styles.headerSubtitle, { color: theme.subText }]}>
          Your Trusted Health Companion
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        {/* App Introduction */}
        <View style={styles.section}>
          <View style={styles.row}>
            <MaterialCommunityIcons name="heart-pulse" size={28} color={theme.heading} />
            <Text style={[styles.title, { color: theme.heading }]}>Health Trackers</Text>
          </View>

          <Text style={[styles.paragraph, { color: theme.text }]}>
            Health Trackers revolutionizes the way patients and doctors collaborate on treatment plans. 
            Our platform ensures seamless medication management through intelligent reminders and 
            real-time progress tracking.
          </Text>

          <View style={[styles.quoteBox, { borderLeftColor: theme.heading }]}>
            <Text style={[styles.quoteText, { color: theme.text }]}>
              "Empowering patients through technology and personalized care"
            </Text>
          </View>
        </View>

        {/* Key Features */}
        <View style={styles.section}>
          <Text style={[styles.subtitle, { color: theme.heading }]}>Key Features</Text>
          <View style={styles.featureList}>
            {[
              { icon: "alarm", text: "Smart Medication Reminders" },
              { icon: "chart-bar", text: "Detailed Progress Analytics" },
              { icon: "doctor", text: "Direct Doctor Communication" },
              { icon: "video", text: "Educational Resources" },
            ].map((feature, index) => (
              <View key={index} style={[styles.featureItem, { backgroundColor: theme.cardBg }]}>
                <MaterialCommunityIcons name={feature.icon} size={24} color={theme.heading} />
                <Text style={[styles.featureText, { color: theme.text }]}>{feature.text}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Version Info */}
        <View style={[styles.infoBox, { backgroundColor: theme.cardBg }]}>
          <Text style={[styles.infoTitle, { color: theme.heading }]}>App Information</Text>
          <View style={styles.infoList}>
            <InfoRow icon="information" text="Version: 1.0.0" color={theme.text} />
            <InfoRow icon="code-tags" text="Developed by: Health Trackers Team" color={theme.text} />
            <InfoRow icon="web" text="Website: www.healthtrackers.com" color={theme.text} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const InfoRow = ({ icon, text, color }) => (
  <View style={styles.infoRow}>
    <MaterialCommunityIcons name={icon} size={20} color="#284b63" style={{ marginRight: 10 }} />
    <Text style={[styles.infoText, { color }]}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#284b63",
    padding: 24,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  headerShadow: {
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  main: {
    padding: 24,
  },
  section: {
    marginBottom: 32,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 12,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  quoteBox: {
    borderLeftWidth: 4,
    paddingLeft: 12,
  },
  quoteText: {
    fontStyle: "italic",
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 10,
  },
  featureText: {
    fontSize: 16,
    marginLeft: 12,
  },
  infoBox: {
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  infoList: {
    gap: 10,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    fontSize: 16,
  },
});
