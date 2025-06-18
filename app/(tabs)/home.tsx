// app/index.tsx
import React, { useEffect, useRef, useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Alert,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

const HomeScreen = () => {
  const router = useRouter();
  const { selectedCity } = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [city, setCity] = useState('Lahore');
  const [showLocationBox, setShowLocationBox] = useState(true);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setCity(String(selectedCity));
      setShowLocationBox(false);
    }
  }, [selectedCity]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    Animated.timing(slideAnim, {
      toValue: isSidebarOpen ? height : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const keepLahore = () => {
    setCity('Lahore');
    setShowLocationBox(false);
  };

  // Service navigation handlers
  const navigateToService = (service: string) => {
    switch(service) {
      case 'Consult Online':
        router.push('/consult-online');
        break;
      case 'In-Clinic Appointments':
        router.push('/in-clinic-appointments');
        break;
      case 'Laboratory Tests':
        router.push('/laboratory-tests');
        break;
      case 'Procedures & Surgeries':
        router.push('/procedures-surgeries');
        break;
      case 'Discounted Medicines':
        router.push('/discounted-medicines');
        break;
      default:
        break;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>

          {/* Current City in Header - Clickable */}
          <TouchableOpacity onPress={() => router.push('/choose-location')}>
            <Text style={styles.headerTitle}>Current City: {city}</Text>
          </TouchableOpacity>

          <Ionicons name="notifications" size={24} color="white" />
        </View>

        {/* Search Bar */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <TouchableOpacity
            style={styles.searchBar}
            activeOpacity={0.9}
            onPress={() => router.push('/search')}
          >
            <Ionicons name="search" size={20} color="#aaa" />
            <Text style={{ marginLeft: 10, color: '#aaa', fontSize: 16 }}>
              Find Doctors, Specialties, Disease...
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Location Box */}
        {showLocationBox && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <View style={styles.locationBox}>
              <Text style={styles.locationText}>Your location is set to {city}.</Text>
              <View style={styles.locationButtons}>
                <TouchableOpacity onPress={() => router.push('/choose-location')}>
                  <Text style={[styles.linkText, { color: '#284b63' }]}>Change City</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={keepLahore}>
                  <Text style={[styles.linkText, { color: '#284b63' }]}>Keep Lahore</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>
        )}

        {/* Booking Section */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.bookingSection}>
            <Text style={styles.bookingTitle}>Welcome</Text>
            <Text style={styles.bookingText}>Book an appointment using PKR 200</Text>
            <TouchableOpacity 
              style={styles.bookNowButton} 
              activeOpacity={0.9}
              onPress={() => router.push('/laboratory-tests')} // Link to Laboratory Tests
            >
              <Text style={styles.bookNowText}>Book Now →</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        {/* Services Grid */}
        <View style={styles.servicesGrid}>
          {[
            { icon: 'people', title: 'Consult Online' },
            { icon: 'medkit', title: 'In-Clinic Appointments' },
            { icon: 'flask', title: 'Laboratory Tests' },
            { icon: 'construct', title: 'Procedures & Surgeries' },
            { icon: 'medal', title: 'Discounted Medicines' },
          ].map((service, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.serviceBox, { width: index < 2 ? '48%' : '32%' }]}
              activeOpacity={0.9}
              onPress={() => navigateToService(service.title)}
            >
              <Ionicons name={service.icon} size={32} color="#284b63" />
              <Text style={styles.serviceText}>{service.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Sidebar */}
      {isSidebarOpen && (
        <Pressable style={styles.overlay} onPress={toggleSidebar}>
          <Animated.View style={[styles.sidebar, { transform: [{ translateY: slideAnim }] }]}>
            <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.sidebarTitle}>Menu</Text>

            <SidebarItem label="Profile" icon="person" onPress={() => router.push('/profile')} />
            <SidebarItem label="Appointments" icon="calendar" onPress={() => router.push('/appointment')} />
            <SidebarItem label="Give Feedback" icon="chatbox-ellipses" onPress={() => router.push('/feedback')} />
            <SidebarItem label="Settings" icon="settings" onPress={() => router.push('/settings')} />
            <SidebarItem label="Help & Support" icon="help-circle-outline" onPress={() => router.push('/support')} />
            <SidebarItem label="About App" icon="information-circle-outline" onPress={() => router.push('/about')} />

            <TouchableOpacity
              style={styles.sidebarItem}
              onPress={() => {
                Alert.alert(
                  'Logout',
                  'Are you sure you want to logout?',
                  [
                    { text: 'Cancel', style: 'cancel' },
                    {
                      text: 'Logout',
                      onPress: () => {
                        setIsSidebarOpen(false);
                        router.replace('/login');
                      },
                    },
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Ionicons name="log-out-outline" size={24} color="#284b63" />
              <Text style={styles.sidebarText}>Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
};

// SidebarItem component
const SidebarItem = ({ icon, label, onPress }) => (
  <TouchableOpacity style={styles.sidebarItem} onPress={onPress}>
    <Ionicons name={icon} size={24} color="#284b63" />
    <Text style={styles.sidebarText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    paddingTop: 40,
    backgroundColor: '#284b63',
  },
  headerTitle: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    marginHorizontal: 10 
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    margin: 16,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  locationBox: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
  },
  locationText: { 
    fontSize: 16, 
    color: '#444' 
  },
  locationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  linkText: { 
    fontWeight: 'bold', 
    fontSize: 16 
  },
  bookingSection: {
    backgroundColor: '#284b63',
    padding: 24,
    margin: 16,
    borderRadius: 16,
    elevation: 4,
  },
  bookingTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff', 
    marginBottom: 8 
  },
  bookingText: { 
    fontSize: 16, 
    color: '#fff', 
    marginBottom: 16, 
    textAlign: 'center' 
  },
  bookNowButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 2,
    alignSelf: 'center',
  },
  bookNowText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#284b63' 
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 16,
  },
  serviceBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  serviceText: { 
    marginTop: 12, 
    fontSize: 15, 
    fontWeight: '600', 
    textAlign: 'center', 
    color: '#333' 
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  sidebar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingTop: 50,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  sidebarTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#333', 
    textAlign: 'center', 
    marginBottom: 20 
  },
  sidebarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: 'rgba(40, 75, 99, 0.1)',
  },
  sidebarText: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: '#284b63', 
    marginLeft: 12 
  },
  closeButton: { 
    position: 'absolute', 
    top: 10, 
    right: 10, 
    padding: 10 
  },
});

export default HomeScreen;