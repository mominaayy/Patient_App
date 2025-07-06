
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
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import moment from 'moment';

const { height, width } = Dimensions.get('window');

// Medication history item type
type MedicationHistoryItem = {
  id: string;
  date: Date;
  medication: string;
  dosage: string;
  scheduledTime: string;
  actualTime: string | null;
  status: 'taken' | 'missed' | 'late';
};

const HomeScreen = () => {
  const router = useRouter();
  const { selectedCity } = useLocalSearchParams();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(height)).current;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [city, setCity] = useState('Lahore');
  const [showLocationBox, setShowLocationBox] = useState(true);
  const [showMedicationPopup, setShowMedicationPopup] = useState(false);
  const [showHistoryPopup, setShowHistoryPopup] = useState(false);
  const [medicationHistory, setMedicationHistory] = useState<MedicationHistoryItem[]>([]);
  
  // Current medication data
  const medication = {
    name: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    scheduledTime: "08:00",
    instructions: "Take with a full glass of water"
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    
    // Initialize with some sample history
    setMedicationHistory([
      {
        id: '1',
        date: new Date(Date.now() - 86400000 * 2), // 2 days ago
        medication: "Lisinopril",
        dosage: "10mg",
        scheduledTime: "08:00",
        actualTime: "08:05",
        status: 'taken'
      },
      {
        id: '2',
        date: new Date(Date.now() - 86400000), // 1 day ago
        medication: "Lisinopril",
        dosage: "10mg",
        scheduledTime: "08:00",
        actualTime: "10:30",
        status: 'late'
      },
      {
        id: '3',
        date: new Date(Date.now() - 86400000 * 3), // 3 days ago
        medication: "Lisinopril",
        dosage: "10mg",
        scheduledTime: "08:00",
        actualTime: null,
        status: 'missed'
      }
    ]);
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

  // Handle notification bell press
  const handleBellPress = () => {
    setShowMedicationPopup(true);
  };

  // Close medication popup
  const closeMedicationPopup = () => {
    setShowMedicationPopup(false);
  };

  // Handle medication status
  const handleStatusSelect = (status: 'taken' | 'missed' | 'late') => {
    const now = new Date();
    
    const newHistoryItem: MedicationHistoryItem = {
      id: Date.now().toString(),
      date: now,
      medication: medication.name,
      dosage: medication.dosage,
      scheduledTime: medication.scheduledTime,
      actualTime: status !== 'missed' ? moment(now).format('HH:mm') : null,
      status: status
    };
    
    // Add to history
    setMedicationHistory(prev => [newHistoryItem, ...prev]);
    
    // Show confirmation
    Alert.alert(
      "Status Recorded",
      `You marked medication as ${status}.`,
      [
        { 
          text: "OK", 
          onPress: () => {
            setTimeout(() => {
              setShowMedicationPopup(false);
            }, 300);
          } 
        }
      ]
    );
  };

  // Format time for display
  const formatTime = (timeString: string) => {
    return moment(timeString, 'HH:mm').format('h:mm A');
  };

  // Format date for display
  const formatDate = (date: Date) => {
    return moment(date).format('MMM D, YYYY');
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

  // History item component
  const HistoryItem = ({ item }: { item: MedicationHistoryItem }) => (
    <View style={styles.historyItem}>
      <View style={styles.historyDateContainer}>
        <Text style={styles.historyDate}>{formatDate(item.date)}</Text>
        <View style={[
          styles.statusIndicator, 
          item.status === 'taken' && styles.takenIndicator,
          item.status === 'late' && styles.lateIndicator,
          item.status === 'missed' && styles.missedIndicator,
        ]}>
          <Text style={styles.statusIndicatorText}>{item.status.toUpperCase()}</Text>
        </View>
      </View>
      
      <View style={styles.historyDetails}>
        <Text style={styles.historyMedication}>{item.medication} • {item.dosage}</Text>
        
        <View style={styles.timeContainer}>
          <View style={styles.timeBlock}>
            <Ionicons name="time" size={16} color="#5d8aa8" />
            <Text style={styles.timeLabel}>Scheduled:</Text>
            <Text style={styles.timeValue}>{formatTime(item.scheduledTime)}</Text>
          </View>
          
          {item.actualTime && (
            <View style={styles.timeBlock}>
              <Ionicons name="time" size={16} color={item.status === 'taken' ? '#4CAF50' : '#FF9800'} />
              <Text style={styles.timeLabel}>Actual:</Text>
              <Text style={styles.timeValue}>{formatTime(item.actualTime)}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

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

          {/* Notification Bell - Clickable */}
          <TouchableOpacity onPress={handleBellPress}>
            <Ionicons name="notifications" size={24} color="white" />
            {medicationHistory.length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>{medicationHistory.length}</Text>
              </View>
            )}
          </TouchableOpacity>
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
              onPress={() => router.push('/laboratory-tests')}
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

      {/* Medication Reminder Popup */}
      <Modal
        visible={showMedicationPopup}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMedicationPopup}
      >
        <Pressable style={styles.modalContainer} onPress={closeMedicationPopup}>
          <Pressable style={styles.modalContent}>
            {/* Header with close button */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Medication Reminder</Text>
              <TouchableOpacity onPress={closeMedicationPopup} style={styles.closeModalButton}>
                <Ionicons name="close" size={24} color="#777" />
              </TouchableOpacity>
            </View>
            
            {/* Medication Card */}
            <View style={styles.medicationCard}>
              <View style={styles.medicationIconContainer}>
                <Ionicons name="medical" size={36} color="#fff" />
              </View>
              
              <View style={styles.medicationDetails}>
                <Text style={styles.medicationName}>{medication.name}</Text>
                <Text style={styles.medicationDosage}>{medication.dosage} • {medication.frequency}</Text>
                
                <View style={styles.medicationTimeContainer}>
                  <Ionicons name="time" size={18} color="#284b63" />
                  <Text style={styles.medicationTime}>{formatTime(medication.scheduledTime)}</Text>
                </View>
              </View>
            </View>
            
            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <Ionicons name="information-circle" size={20} color="#5d8aa8" />
              <Text style={styles.instructionsText}>{medication.instructions}</Text>
            </View>
            
            {/* Status Selection */}
            <Text style={styles.statusTitle}>Update Medication Status</Text>
            
            <View style={styles.statusContainer}>
              <TouchableOpacity 
                style={[styles.statusButton, styles.takenButton]}
                onPress={() => handleStatusSelect('taken')}
              >
                <Ionicons name="checkmark-circle" size={20} color="#fff" />
                <Text style={styles.statusButtonText}>Taken</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.statusButton, styles.lateButton]}
                onPress={() => handleStatusSelect('late')}
              >
                <Ionicons name="alarm" size={20} color="#fff" />
                <Text style={styles.statusButtonText}>Late</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.statusButton, styles.missedButton]}
                onPress={() => handleStatusSelect('missed')}
              >
                <Ionicons name="close-circle" size={20} color="#fff" />
                <Text style={styles.statusButtonText}>Missed</Text>
              </TouchableOpacity>
            </View>
            
            {/* History Button */}
            <TouchableOpacity 
              style={styles.historyButton}
              onPress={() => {
                setShowMedicationPopup(false);
                setShowHistoryPopup(true);
              }}
            >
              <Text style={styles.historyButtonText}>View Medication History</Text>
              <Ionicons name="arrow-forward" size={18} color="#284b63" />
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Medication History Popup */}
      <Modal
        visible={showHistoryPopup}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowHistoryPopup(false)}
      >
        <View style={styles.historyModalContainer}>
          <View style={styles.historyModalContent}>
            {/* Header */}
            <View style={styles.historyHeader}>
              <Text style={styles.historyTitle}>Medication History</Text>
              <TouchableOpacity 
                onPress={() => setShowHistoryPopup(false)}
                style={styles.closeHistoryButton}
              >
                <Ionicons name="close" size={24} color="#777" />
              </TouchableOpacity>
            </View>
            
            {/* Stats Summary */}
            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{medicationHistory.filter(h => h.status === 'taken').length}</Text>
                <Text style={styles.statLabel}>Taken</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{medicationHistory.filter(h => h.status === 'late').length}</Text>
                <Text style={styles.statLabel}>Late</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statValue}>{medicationHistory.filter(h => h.status === 'missed').length}</Text>
                <Text style={styles.statLabel}>Missed</Text>
              </View>
            </View>
            
            {/* History List */}
            <View style={styles.historyListContainer}>
              <Text style={styles.historySubtitle}>RECENT HISTORY</Text>
              
              {medicationHistory.length === 0 ? (
                <View style={styles.emptyHistory}>
                  <Ionicons name="file-tray" size={48} color="#ccc" />
                  <Text style={styles.emptyText}>No medication history yet</Text>
                </View>
              ) : (
                <FlatList
                  data={medicationHistory}
                  renderItem={HistoryItem}
                  keyExtractor={item => item.id}
                  contentContainerStyle={styles.historyList}
                />
              )}
            </View>
          </View>
        </View>
      </Modal>

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
  notificationBadge: {
    position: 'absolute',
    right: -5,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  // Enhanced styles for medication popup
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#284b63',
  },
  closeModalButton: {
    padding: 8,
  },
  medicationCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f8ff',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#284b63',
  },
  medicationIconContainer: {
    backgroundColor: '#284b63',
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  medicationDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  medicationName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#284b63',
    marginBottom: 4,
  },
  medicationDosage: {
    fontSize: 16,
    color: '#5d8aa8',
    marginBottom: 10,
  },
  medicationTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1ecf4',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  medicationTime: {
    fontSize: 15,
    fontWeight: '600',
    color: '#284b63',
    marginLeft: 5,
  },
  instructionsContainer: {
    flexDirection: 'row',
    backgroundColor: '#edf7ff',
    padding: 15,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },
  instructionsText: {
    fontSize: 15,
    color: '#3a6a8a',
    marginLeft: 10,
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#284b63',
    alignSelf: 'flex-start',
    marginBottom: 15,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  statusButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginHorizontal: 5,
  },
  takenButton: {
    backgroundColor: '#4CAF50',
  },
  lateButton: {
    backgroundColor: '#FF9800',
  },
  missedButton: {
    backgroundColor: '#F44336',
  },
  statusButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
  historyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#284b63',
  },
  historyButtonText: {
    color: '#284b63',
    fontWeight: '600',
    fontSize: 16,
    marginRight: 8,
  },
  // Styles for history popup
  historyModalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  historyModalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    height: height * 0.85,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#284b63',
  },
  closeHistoryButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#f5f9ff',
    borderRadius: 16,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#284b63',
  },
  statLabel: {
    fontSize: 14,
    color: '#5d8aa8',
    marginTop: 5,
  },
  historyListContainer: {
    flex: 1,
  },
  historySubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5d8aa8',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  historyList: {
    paddingBottom: 30,
  },
  historyItem: {
    backgroundColor: '#f8fbff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#284b63',
  },
  historyDateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusIndicator: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  takenIndicator: {
    backgroundColor: '#4CAF50',
  },
  lateIndicator: {
    backgroundColor: '#FF9800',
  },
  missedIndicator: {
    backgroundColor: '#F44336',
  },
  statusIndicatorText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  historyDetails: {
    paddingLeft: 5,
  },
  historyMedication: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#284b63',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeLabel: {
    marginLeft: 5,
    marginRight: 3,
    color: '#5d8aa8',
    fontSize: 14,
  },
  timeValue: {
    fontWeight: '600',
    color: '#333',
    fontSize: 14,
  },
  emptyHistory: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 18,
    color: '#aaa',
    marginTop: 15,
  },
});

export default HomeScreen;