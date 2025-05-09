import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated, Easing } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const FeedbackScreen = () => {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState(null);
  const [details, setDetails] = useState("");
  const animatedValue = new Animated.Value(0);

  const handleCancel = () => router.push("/home"); 

  const animateOption = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true
    }).start();
  };

  const scaleInterpolate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.95, 1]
  });

  return (
    <LinearGradient colors={['#f8f9fa', '#ffffff']} style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Share Your Thoughts</Text>
        <Text style={styles.subHeader}>Help us improve your experience</Text>
        <View style={styles.headerLine} />
      </View>

      {/* Options Section */}
      <View style={styles.optionsContainer}>
        <Animated.View style={{ transform: [{ scale: scaleInterpolate }] }}>
          <TouchableOpacity
            style={[styles.option, selectedOption === "feedback" && styles.selectedOption]}
            onPress={() => { 
              setSelectedOption("feedback");
              animateOption();
              router.push('/suggestion');
            }}
          >
            <LinearGradient 
              colors={selectedOption === "feedback" ? ['#284b63', '#3a6b8a'] : ['#f0f0f0', '#f8f8f8']}
              style={styles.iconContainer}
            >
              <FontAwesome 
                name="thumbs-up" 
                size={24} 
                color={selectedOption === "feedback" ? "#fff" : "#666"} 
              />
            </LinearGradient>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Suggestion or Feedback</Text>
              <Text style={styles.optionDescription}>
                Share ideas to enhance Health Tracker
              </Text>
            </View>
            <View style={[styles.radioOuter, selectedOption === "feedback" && styles.radioActive]}>
              {selectedOption === "feedback" && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scaleInterpolate }] }}>
          <TouchableOpacity
            style={[styles.option, selectedOption === "issue" && styles.selectedOption]}
            onPress={() => { 
              setSelectedOption("issue");
              animateOption();
              router.push('/report');
            }}
          >
            <LinearGradient 
              colors={selectedOption === "issue" ? ['#284b63', '#3a6b8a'] : ['#f0f0f0', '#f8f8f8']}
              style={styles.iconContainer}
            >
              <FontAwesome 
                name="exclamation-triangle" 
                size={24} 
                color={selectedOption === "issue" ? "#fff" : "#666"} 
              />
            </LinearGradient>
            <View style={styles.optionTextContainer}>
              <Text style={styles.optionTitle}>Report an Issue</Text>
              <Text style={styles.optionDescription}>
                Technical problems or bugs
              </Text>
            </View>
            <View style={[styles.radioOuter, selectedOption === "issue" && styles.radioActive]}>
              {selectedOption === "issue" && <View style={styles.radioInner} />}
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Feedback Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.detailsLabel}>
          Your Message <Text style={styles.required}>*</Text>
        </Text>
        <TextInput
          style={[styles.textInput, details && styles.activeInput]}
          placeholder="Share your thoughts..."
          placeholderTextColor="#999"
          value={details}
          onChangeText={setDetails}
          multiline
          numberOfLines={5}
        />
        <Text style={styles.charCount}>{details.length}/500</Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton, !details && styles.disabledButton]}
          disabled={!details}
        >
          <LinearGradient
            colors={['#284b63', '#3a6b8a']}
            style={styles.gradient}
          >
            <Text style={styles.submitText}>Send Feedback</Text>
            <FontAwesome name="paper-plane" size={16} color="#fff" style={styles.buttonIcon} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    paddingTop: 50,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  header: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a365d',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#4a5568',
    fontWeight: '500',
  },
  headerLine: {
    width: 50,
    height: 4,
    backgroundColor: '#284b63',
    borderRadius: 2,
    marginTop: 15,
  },
  optionsContainer: {
    marginBottom: 25,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: '#284b63',
    shadowColor: '#284b63',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a365d',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#718096',
    lineHeight: 20,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#cbd5e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    borderColor: '#284b63',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#284b63',
  },
  inputContainer: {
    marginBottom: 25,
  },
  detailsLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a365d',
    marginBottom: 12,
  },
  required: {
    color: '#e53e3e',
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    fontSize: 16,
    lineHeight: 24,
    color: '#1a365d',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    minHeight: 150,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
  },
  activeInput: {
    borderColor: '#284b63',
  },
  charCount: {
    position: 'absolute',
    right: 15,
    bottom: 15,
    color: '#a0aec0',
    fontSize: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  button: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 25,
    paddingVertical: 14,
  },
  submitButton: {
    shadowColor: '#284b63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 14,
  },
  disabledButton: {
    opacity: 0.6,
  },
  cancelText: {
    color: '#4a5568',
    fontWeight: '600',
    fontSize: 16,
  },
  submitText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 10,
  },
  buttonIcon: {
    marginTop: 2,
  },
});

export default FeedbackScreen;