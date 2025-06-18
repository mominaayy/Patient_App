import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const doctors = [
  {
    id: '1',
    name: 'Dr. Sarah Ahmed',
    specialty: 'Cardiologist',
    rating: 4.9,
    experience: 12,
    languages: ['English', 'Urdu'],
    fee: 'PKR 1,500',
    availability: 'Today 4:30 PM'
  },
  {
    id: '2',
    name: 'Dr. Ali Khan',
    specialty: 'Pediatrician',
    rating: 4.8,
    experience: 8,
    languages: ['English', 'Urdu', 'Punjabi'],
    fee: 'PKR 1,200',
    availability: 'Tomorrow 10:00 AM'
  },
  {
    id: '3',
    name: 'Dr. Fatima Zahra',
    specialty: 'Dermatologist',
    rating: 4.7,
    experience: 10,
    languages: ['English', 'Urdu'],
    fee: 'PKR 1,800',
    availability: 'Today 6:00 PM'
  },
];

const ConsultOnline = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredDoctors = doctors.filter(doctor => 
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Online Consultations</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search doctors or specialties..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {['All', 'Cardiology', 'Pediatrics', 'Dermatology', 'Orthopedics', 'Gynecology'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter.toLowerCase() && styles.selectedFilter
            ]}
            onPress={() => setSelectedFilter(filter.toLowerCase())}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter.toLowerCase() && styles.selectedFilterText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.cardsContainer}>
        {filteredDoctors.map((doctor) => (
          <TouchableOpacity 
            key={doctor.id}
            style={styles.card}
            onPress={() => router.push(`/doctor-detail/${doctor.id}`)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.doctorName}>{doctor.name}</Text>
              <Text style={styles.doctorSpecialty}>{doctor.specialty}</Text>
              
              <View style={styles.ratingContainer}>
                <Ionicons name="star" size={16} color="#FFC107" />
                <Text style={styles.ratingText}>{doctor.rating} ({doctor.experience}+ years)</Text>
              </View>
              
              <View style={styles.languagesContainer}>
                {doctor.languages.map((lang, index) => (
                  <Text key={index} style={styles.languageTag}>{lang}</Text>
                ))}
              </View>
              
              <View style={styles.feeContainer}>
                <Text style={styles.feeText}>{doctor.fee}</Text>
                <Text style={styles.availabilityText}>{doctor.availability}</Text>
              </View>
              
              <TouchableOpacity style={styles.bookButton}>
                <Text style={styles.bookButtonText}>Book Consultation</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
  searchContainer: {
    padding: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 15,
    elevation: 2,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  filtersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e9ecef',
    borderRadius: 20,
    marginRight: 10,
  },
  filterText: {
    color: '#495057',
    fontWeight: '500',
  },
  selectedFilter: {
    backgroundColor: '#284b63', // Updated to theme color
  },
  selectedFilterText: {
    color: '#fff',
  },
  cardsContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
  },
  cardContent: {
    padding: 15,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#495057',
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  languageTag: {
    backgroundColor: '#e7f5ff',
    color: '#228be6',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 12,
    marginRight: 5,
    marginBottom: 5,
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  feeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#284b63', // Updated to theme color
  },
  availabilityText: {
    fontSize: 14,
    color: '#40c057',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#284b63', // Updated to theme color
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConsultOnline;