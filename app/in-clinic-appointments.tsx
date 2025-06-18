import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const clinics = [
  {
    id: '1',
    name: 'Aga Khan Hospital',
    specialty: 'Multi-Specialty',
    rating: 4.8,
    distance: '2.5 km',
    address: 'Stadium Road, Karachi',
    availability: 'Open until 10 PM'
  },
  {
    id: '2',
    name: 'Shaukat Khanum Hospital',
    specialty: 'Cancer Center',
    rating: 4.9,
    distance: '5.7 km',
    address: 'Johar Town, Lahore',
    availability: 'Open 24/7'
  },
  {
    id: '3',
    name: 'Shifa International',
    specialty: 'General Hospital',
    rating: 4.7,
    distance: '3.2 km',
    address: 'Sector H-8/4, Islamabad',
    availability: 'Open until 11 PM'
  },
];

const InClinicAppointments = () => {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const specialties = [
    'Cardiology', 'Dermatology', 'Orthopedics', 
    'Pediatrics', 'Gynecology', 'Neurology'
  ];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>In-Clinic Appointments</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.dateSelector}>
        <Text style={styles.dateLabel}>Select Date:</Text>
        <TouchableOpacity style={styles.dateButton}>
          <Ionicons name="calendar" size={20} color="#fff" />
          <Text style={styles.dateButtonText}>{formatDate(selectedDate)}</Text>
          <Ionicons name="chevron-down" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Specialties</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.specialtiesContainer}
        >
          {specialties.map((specialty) => (
            <TouchableOpacity
              key={specialty}
              style={[
                styles.specialtyButton,
                selectedSpecialty === specialty.toLowerCase() && styles.selectedSpecialty
              ]}
              onPress={() => setSelectedSpecialty(specialty.toLowerCase())}
            >
              <Text style={[
                styles.specialtyText,
                selectedSpecialty === specialty.toLowerCase() && styles.selectedSpecialtyText
              ]}>
                {specialty}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Clinics</Text>
        {clinics.map((clinic) => (
          <TouchableOpacity 
            key={clinic.id}
            style={styles.clinicCard}
            onPress={() => router.push(`/clinic-detail/${clinic.id}`)}
          >
            <View style={styles.clinicInfo}>
              <Text style={styles.clinicName}>{clinic.name}</Text>
              <Text style={styles.clinicSpecialty}>{clinic.specialty}</Text>
              
              <View style={styles.clinicMeta}>
                <View style={styles.ratingContainer}>
                  <Ionicons name="star" size={16} color="#FFC107" />
                  <Text style={styles.ratingText}>{clinic.rating}</Text>
                </View>
                <View style={styles.distanceContainer}>
                  <Ionicons name="location" size={16} color="#6c757d" />
                  <Text style={styles.distanceText}>{clinic.distance}</Text>
                </View>
              </View>
              
              <Text style={styles.clinicAddress}>{clinic.address}</Text>
              <Text style={styles.clinicAvailability}>{clinic.availability}</Text>
              
              <TouchableOpacity style={styles.viewSlotsButton}>
                <Text style={styles.viewSlotsText}>View Available Slots</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.mapButton}>
        <Ionicons name="map" size={20} color="#fff" />
        <Text style={styles.mapButtonText}>View Clinics on Map</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#284b63', // Updated to theme color
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 15,
    elevation: 2,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#495057',
    marginRight: 10,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#284b63', // Updated to theme color
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  dateButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginHorizontal: 8,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 15,
  },
  specialtiesContainer: {
    paddingBottom: 5,
  },
  specialtyButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e9ecef',
    borderRadius: 20,
    marginRight: 10,
  },
  specialtyText: {
    color: '#495057',
    fontWeight: '500',
  },
  selectedSpecialty: {
    backgroundColor: '#284b63', // Updated to theme color
  },
  selectedSpecialtyText: {
    color: '#fff',
  },
  clinicCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    padding: 15,
  },
  clinicInfo: {
    flex: 1,
  },
  clinicName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  clinicSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 2,
  },
  clinicMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#495057',
  },
  distanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  distanceText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#495057',
  },
  clinicAddress: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
  },
  clinicAvailability: {
    fontSize: 14,
    color: '#40c057',
    fontWeight: '500',
    marginTop: 4,
  },
  viewSlotsButton: {
    backgroundColor: '#284b63', // Updated to theme color
    paddingVertical: 8,
    borderRadius: 8,
    marginTop: 12,
    alignItems: 'center',
  },
  viewSlotsText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#284b63', // Updated to theme color
    padding: 15,
    margin: 16,
    borderRadius: 15,
    elevation: 3,
  },
  mapButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default InClinicAppointments;