import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function IndexScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image 
        source={{ uri: 'https://img.icons8.com/ios-filled/100/ffffff/health.png' }} 
        style={styles.logo} 
      />

      {/* App Name */}
      <Text style={styles.appName}>Health Tracker</Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/register')}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign Up Button */}
      <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/login')}>
        <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Guest Option */}
      <TouchableOpacity onPress={() => router.push('/(tabs)/home')}>
        <Text style={styles.guestText}>Continue as a guest</Text>
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
    backgroundColor: '#284b63', 
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#284b63',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#fff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestText: {
    color: '#ffffffcc',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});
