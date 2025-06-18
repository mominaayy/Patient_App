// app/choose-location.tsx
import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput,
  FlatList, TouchableOpacity, Alert, 
  Keyboard, Animated, Platform, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const topCities = [
  { name: 'Lahore', emoji: '🏙️' },
  { name: 'Karachi', emoji: '🌊' },
  { name: 'Islamabad', emoji: '⛰️' },
  { name: 'Peshawar', emoji: '🕌' },
  { name: 'Multan', emoji: '🕍' },
  { name: 'Quetta', emoji: '🏔️' },
  { name: 'Faisalabad', emoji: '🏭' },
  { name: 'Hyderabad', emoji: '🌉' }
];

const ChooseLocation = () => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(topCities);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // Save selected location to storage
  const saveLocation = async (city: string) => {
    try {
      await AsyncStorage.setItem('selectedCity', city);
      console.log('Location saved:', city);
    } catch (error) {
      console.error('Failed to save location:', error);
    }
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setFiltered(
      topCities.filter(city =>
        city.name.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      ])
    ).start();
  };

  const handleCitySelect = (city: string) => {
    // Save to storage and navigate to home
    saveLocation(city);
    
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      // Pass as param and replace the stack
      router.replace({ 
        pathname: '/', 
        params: { selectedCity: city } 
      });
    });
  };

  const detectCurrentLocation = async () => {
    setIsLocating(true);
    setLocationStatus('Requesting permission...');
    startPulseAnimation();
    
    try {
      // Check if location services are enabled
      const servicesEnabled = await Location.hasServicesEnabledAsync();
      if (!servicesEnabled) {
        Alert.alert(
          'Location Services Disabled',
          'Please enable location services in your device settings',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Location.enableNetworkProviderAsync() }
          ]
        );
        setIsLocating(false);
        return;
      }

      // Request permission
      setLocationStatus('Checking permissions...');
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied', 
          'Location permission is required to detect your current location.',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Open Settings', onPress: () => Location.openSettings() }
          ]
        );
        setIsLocating(false);
        return;
      }

      // Get current location
      setLocationStatus('Detecting your location...');
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000 // 15 seconds timeout
      });
      
      // Reverse geocode to get city name
      setLocationStatus('Finding your city...');
      const geo = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
      
      if (geo && geo.length > 0) {
        // Try different possible city fields
        const city = 
          geo[0].city || 
          geo[0].subregion || 
          geo[0].region || 
          'Unknown';
          
        if (city !== 'Unknown') {
          handleCitySelect(city);
        } else {
          Alert.alert(
            'Location Error',
            "Couldn't determine your city. Please select manually.",
            [{ text: 'OK', style: 'cancel' }]
          );
        }
      } else {
        Alert.alert(
          'Location Error',
          "Couldn't determine your location. Please try again or select a city manually.",
          [{ text: 'OK', style: 'cancel' }]
        );
      }
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert(
        'Location Error',
        'Unable to determine your location. Please try again or select a city manually.',
        [{ text: 'OK', style: 'cancel' }]
      );
    } finally {
      setIsLocating(false);
      Animated.timing(pulseAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const renderCityItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.cityItem} 
      onPress={() => handleCitySelect(item.name)}
      activeOpacity={0.7}
    >
      <Text style={styles.cityEmoji}>{item.emoji}</Text>
      <Text style={styles.cityText}>{item.name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#a0aec0" />
    </TouchableOpacity>
  );

  const renderCityCard = ({ item }) => (
    <TouchableOpacity 
      style={styles.cityCard}
      onPress={() => handleCitySelect(item.name)}
      activeOpacity={0.7}
    >
      <Text style={styles.cityCardEmoji}>{item.emoji}</Text>
      <Text style={styles.cityCardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Find Healthcare Providers</Text>
        <Text style={styles.subtitle}>Select your city to find the best doctors near you</Text>
      </View>

      <View style={styles.content}>
        {/* Search Section */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={22} color="#718096" />
            <TextInput
              style={styles.input}
              placeholder="Search cities in Pakistan..."
              placeholderTextColor="#a0aec0"
              value={query}
              onChangeText={setQuery}
              returnKeyType="search"
            />
          </View>

          <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
            <TouchableOpacity 
              style={styles.detectButton} 
              onPress={detectCurrentLocation}
              activeOpacity={0.8}
              disabled={isLocating}
            >
              {isLocating ? (
                <View style={styles.locationIcon}>
                  <ActivityIndicator color="#fff" />
                </View>
              ) : (
                <View style={styles.locationIcon}>
                  <Ionicons name="locate" size={18} color="#fff" />
                </View>
              )}
              <Text style={styles.detectText}>
                {isLocating ? 'Detecting Location...' : 'Use Current Location'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
          
          {isLocating && (
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{locationStatus}</Text>
            </View>
          )}
        </View>

        {/* Cities Section */}
        <Text style={styles.sectionTitle}>Top Cities in Pakistan</Text>
        
        {!isKeyboardVisible ? (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.name}
            renderItem={renderCityCard}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.citiesContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.name}
            renderItem={renderCityItem}
            style={styles.list}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.listContainer}
          />
        )}
      </View>
    </Animated.View>
  );
};

export default ChooseLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#284b63',
    padding: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    maxWidth: '85%',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#4a5568',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#edf2f7',
    padding: 16,
    borderRadius: 15,
    marginBottom: 20,
  },
  input: {
    marginLeft: 12,
    fontSize: 16,
    flex: 1,
    color: '#2d3748',
  },
  detectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6f7ff',
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#bee3f8',
  },
  locationIcon: {
    backgroundColor: '#3182ce',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detectText: {
    fontSize: 16,
    color: '#2b6cb0',
    fontWeight: '600',
  },
  statusContainer: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#f0f9ff',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#3182ce',
  },
  statusText: {
    color: '#3182ce',
    fontSize: 14,
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 20,
    marginLeft: 8,
  },
  citiesContainer: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  cityCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    minWidth: '48%',
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#a0aec0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cityCardEmoji: {
    fontSize: 32,
    marginBottom: 10,
  },
  cityCardText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 30,
  },
  cityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 18,
    marginBottom: 12,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3182ce',
    shadowColor: '#cbd5e0',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cityEmoji: {
    fontSize: 24,
    marginRight: 15,
  },
  cityText: {
    flex: 1,
    fontSize: 17,
    color: '#4a5568',
    fontWeight: '500',
  },
});