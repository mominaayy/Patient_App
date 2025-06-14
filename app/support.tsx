import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  Linking
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function SupportScreen() {
  const scheme = useColorScheme();
  const isDark = scheme === "dark";

  const theme = {
    bg: isDark ? "#121212" : "#ffffff",
    text: isDark ? "#eeeeee" : "#3c3c3c",
    cardBg: isDark ? "#1e1e1e" : "#f5f5f5",
    border: isDark ? "#333333" : "#e0e0e0",
    heading: "#284b63",
    subText: isDark ? "#888888" : "#555555",
  };

  const handleContact = (method) => {
    switch (method) {
      case 'email':
        Linking.openURL('mailto:support@healthtrackers.com');
        break;
      case 'phone':
        Linking.openURL('tel:+18001234567');
        break;
      case 'chat':
        console.log('Opening chat...');
        break;
      default:
        console.warn('Unknown contact method:', method);
    }
  };

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to your profile > Settings > Reset Password. Enter your current and new password to update."
    },
    {
      question: "Where can I find my medical records?",
      answer: "Navigate to the Home tab, then click on 'Medical Records' under your profile section."
    },
    {
      question: "How to update payment information?",
      answer: "Go to Settings > Payment Info and update your card or bank details securely."
    },
    {
      question: "Can I share data with my doctor?",
      answer: "Yes! Go to the Charts tab and click 'Share with Doctor' to send your records securely."
    }
  ];

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFAQ = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.heading }]}>
        <Text style={styles.headerText}>Support Center</Text>
        <Text style={[styles.headerSubtitle, { color: "#ffffff" }]}>
          We're here to help you 24/7
        </Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Contact Options */}
        <View style={[styles.section, { backgroundColor: theme.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: theme.heading }]}>
            Contact Options
          </Text>

          <TouchableOpacity style={styles.contactItem} onPress={() => handleContact('email')}>
            <View style={styles.contactLeft}>
              <MaterialIcons name="email" size={24} color="#284b63" />
              <View style={styles.contactTextContainer}>
                <Text style={[styles.contactTitle, { color: theme.text }]}>Email Support</Text>
                <Text style={[styles.contactSubtitle, { color: theme.subText }]}>Typically responds within 2 hours</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subText} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={() => handleContact('phone')}>
            <View style={styles.contactLeft}>
              <Ionicons name="call-outline" size={24} color="#284b63" />
              <View style={styles.contactTextContainer}>
                <Text style={[styles.contactTitle, { color: theme.text }]}>Phone Support</Text>
                <Text style={[styles.contactSubtitle, { color: theme.subText }]}>Available 24/7</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subText} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.contactItem} onPress={() => handleContact('chat')}>
            <View style={styles.contactLeft}>
              <Ionicons name="chatbubbles-outline" size={24} color="#284b63" />
              <View style={styles.contactTextContainer}>
                <Text style={[styles.contactTitle, { color: theme.text }]}>Live Chat</Text>
                <Text style={[styles.contactSubtitle, { color: theme.subText }]}>9 AM - 6 PM (Local Time)</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color={theme.subText} />
          </TouchableOpacity>
        </View>

        {/* FAQ Section */}
        <View style={[styles.section, { backgroundColor: theme.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: theme.heading }]}>
            Frequently Asked Questions
          </Text>

          {faqs.map((faq, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleFAQ(index)}
              style={[styles.faqItem, { borderBottomColor: theme.border }]}
            >
              <View style={{ flex: 1 }}>
                <Text style={[styles.faqText, { color: theme.text }]}>
                  {faq.question}
                </Text>
                {expandedIndex === index && (
                  <Text style={[styles.faqAnswer, { color: theme.subText }]}>
                    {faq.answer}
                  </Text>
                )}
              </View>
              <Ionicons
                name={expandedIndex === index ? "chevron-up" : "chevron-down"}
                size={18}
                color={theme.subText}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Contact Form */}
        <View style={[styles.section, { backgroundColor: theme.cardBg }]}>
          <Text style={[styles.sectionTitle, { color: theme.heading }]}>
            Send Us a Message
          </Text>

          <TouchableOpacity style={styles.contactButton}>
            <Text style={[styles.buttonText, { color: theme.bg }]}>
              Open Contact Form
            </Text>
          </TouchableOpacity>
        </View>

        {/* App Info */}
        <View style={styles.infoContainer}>
          <Text style={[styles.infoText, { color: theme.subText }]}>
            HealthTrackers v1.0.0
          </Text>
          <Text style={[styles.infoText, { color: theme.subText }]}>
            © 2024 HealthTrackers Inc.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 28,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
  },
  content: {
    padding: 16,
  },
  section: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  contactTextContainer: {
    gap: 4,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  contactSubtitle: {
    fontSize: 14,
  },
  faqItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  faqText: {
    fontSize: 16,
    marginBottom: 4,
  },
  faqAnswer: {
    fontSize: 14,
    marginTop: 6,
  },
  contactButton: {
    backgroundColor: '#284b63',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  infoContainer: {
    alignItems: 'center',
    marginTop: 24,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
  },
});
