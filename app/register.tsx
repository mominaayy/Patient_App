import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>to get started now!</Text>

      {/* Input Fields */}
      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#ddd" />
      <TextInput style={styles.input} placeholder="Email Address" placeholderTextColor="#ddd" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#ddd" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#ddd" secureTextEntry />

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/(tabs)/home')}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <Text style={styles.orText}>Or Sign Up with</Text>

      {/* Social Login Buttons */}
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }} style={styles.socialIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image source={{ uri: 'https://img.icons8.com/color/48/facebook-new.png' }} style={styles.socialIcon} />
        </TouchableOpacity>
      </View>

      {/* Already have an account? */}
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.loginText}>Already have an account? <Text style={{ fontWeight: 'bold' }}>Login Now</Text></Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#284b63', // Same theme as before
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    backgroundColor: '#3B677A', 
    padding: 14,
    borderRadius: 10,
    color: '#fff',
    fontSize: 14,
    marginBottom: 12,
  },
  signupButton: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  signupText: {
    color: '#284b63',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    color: '#ddd',
    marginBottom: 10,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  loginText: {
    color: '#ddd',
    fontSize: 14,
  },
});
