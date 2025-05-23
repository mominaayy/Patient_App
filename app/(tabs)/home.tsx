import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { Alert, Dimensions } from 'react-native';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, 
  StyleSheet, Animated, Pressable 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    Animated.timing(slideAnim, {
      toValue: isSidebarOpen ? height : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={toggleSidebar}>
            <Ionicons name="menu" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Current City</Text>
          <Ionicons name="notifications" size={24} color="white" />
        </View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#aaa" />
            <TextInput 
              placeholder="Find Doctors, Specialties, Disease..." 
              placeholderTextColor="#aaa"
              style={styles.searchInput} 
            />
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.locationBox}>
            <Text style={styles.locationText}>Your location is set to Lahore.</Text>
            <View style={styles.locationButtons}>
              <Text style={styles.linkText}>Change City</Text>
              <Text style={styles.linkText}>Keep Lahore</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={{ opacity: fadeAnim }}>
          <View style={styles.bookingSection}>
            <Text style={styles.bookingTitle}>Welcome</Text>
            <Text style={styles.bookingText}>Book an appointment using PKR 200</Text>
            <TouchableOpacity 
              style={styles.bookNowButton}
              activeOpacity={0.9}
            >
              <Text style={styles.bookNowText}>Book Now →</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <View style={styles.servicesGrid}>
          {[
            { icon: "people", title: "Consult Online" },
            { icon: "medkit", title: "In-Clinic Appointments" },
            { icon: "flask", title: "Laboratory Tests" },
            { icon: "construct", title: "Procedures & Surgeries" },
            { icon: "medal", title: "Discounted Medicines" },
          ].map((service, index) => (
            <TouchableOpacity 
              key={index} 
              style={[
                styles.serviceBox,
                { width: index < 2 ? '48%' : '32%' }
              ]}
              activeOpacity={0.9}
            >
              <Ionicons name={service.icon} size={32} color="#284b63" />
              <Text style={styles.serviceText}>{service.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <Pressable style={styles.overlay} onPress={toggleSidebar}>
          <Animated.View 
            style={[
              styles.sidebar, 
              { transform: [{ translateY: slideAnim }] }
            ]}
          >
            <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.sidebarTitle}>Menu</Text>
            
            <TouchableOpacity 
        style={{ padding: 10, backgroundColor: 'lightgray' }} 
        onPress={() => {
          router.push('/profile'); // Ensure profile.tsx exists in app folder
        }}
      >
        <Text>Profile</Text>
      </TouchableOpacity>
            <TouchableOpacity 
              style={styles.sidebarItem} 
              onPress={() => { 
                toggleSidebar(); 
                router.push('/appointment'); 
              }}
            >
              <Text style={styles.sidebarText}>Appointments</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.sidebarItem}
              onPress={() => {
                toggleSidebar();
                router.push('/feedback');
              }}
            >
              <Text style={styles.sidebarText}>Give Feedback</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.sidebarItem} 
              onPress={() => {
                Alert.alert(
                  "Logout", 
                  "Are you sure you want to logout?", 
                  [
                    { text: "Cancel", style: "cancel" },
                    { text: "Logout", onPress: () => router.replace('/(tabs)') } 
                  ],
                  { cancelable: true }
                );
              }}
            >
              <Text style={styles.sidebarText}>Logout</Text>
            </TouchableOpacity>
          </Animated.View>
        </Pressable>
      )}
    </View>
  );
};

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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerTitle: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  searchBar: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F5F5F5', 
    margin: 16,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  searchInput: { 
    marginLeft: 10, 
    flex: 1, 
    fontSize: 16,
    color: '#333',
  },
  locationBox: { 
    backgroundColor: '#F5F5F5', 
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  locationText: {
    fontSize: 16,
    color: '#444',
  },
  locationButtons: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 12,
  },
  linkText: { 
    color: '#5B435D', 
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookingSection: { 
    backgroundColor: '#284b63', 
    padding: 24, 
    margin: 16, 
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  bookingTitle: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#fff',
    marginBottom: 8,
  },
  bookingText: { 
    fontSize: 16, 
    color: '#fff', 
    marginBottom: 16,
    textAlign: 'center',
  },
  bookNowButton: { 
    backgroundColor: '#fff', 
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 2,
  },
  bookNowText: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#284b63',
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
    color: '#333',
  },
  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  sidebar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "70%",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    paddingTop: 50,
    paddingHorizontal: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  sidebarTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  sidebarItem: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "rgba(40, 75, 99, 0.1)",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sidebarText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#284b63",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 10,
  },
});

export default HomeScreen;