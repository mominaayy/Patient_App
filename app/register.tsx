import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, Image, Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '../utils/constants'; // Adjust path if needed

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
          role: 'PATIENT'
        })
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Account created successfully!');
        router.push('/login'); // Or wherever you want to go
      } else {
        Alert.alert('Signup Failed', result?.error || 'Something went wrong.');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Unable to connect to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Account</Text>
      <Text style={styles.subtitle}>to get started now!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        placeholderTextColor="#ddd"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#ddd"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor="#ddd"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={styles.signupButton}
        onPress={handleSignUp}
        disabled={loading}
      >
        <Text style={styles.signupText}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.orText}>Or Sign Up with</Text>

      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialButton}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/facebook-new.png' }}
            style={styles.socialIcon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.loginText}>
          Already have an account? <Text style={{ fontWeight: 'bold' }}>Login Now</Text>
        </Text>
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
