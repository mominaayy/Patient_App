import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from "../utils/constants"; // Adjust path if needed
import { useAuthStore } from '../store/authStore';

const ConsultOnline = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = useAuthStore.getState().token;

  const filteredDoctors = doctors.filter((doctor) =>
    (doctor.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doctor.specialization  || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/doctor/all`, {
          headers: {
            'Authorization': `${token}`,
          }
        });
        const json = await res.json();
        if (res.ok) {
          setDoctors(json.doctors || []);
        } else {
          console.error(json.error || 'Failed to load doctors');
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Online Consultations</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Search */}
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

      {/* Filters */}
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

      {/* Doctor Cards */}
      <View style={styles.cardsContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#284b63" />
        ) : (
          filteredDoctors.map((doctor) => (
            <TouchableOpacity 
              key={doctor.id}
              style={styles.card}
            >
              <View style={styles.cardContent}>
                <Text style={styles.doctorName}>{doctor.full_name}</Text>
                <Text style={styles.doctorSpecialty}>{doctor.specialization}</Text>
                
                <View style={styles.feeContainer}>
                  <Text style={styles.feeText}>Phone: {doctor.phone_number}</Text>
                  <Text style={styles.availabilityText}>Clinic: {doctor.clinic_address}</Text>
                </View>

                <TouchableOpacity
                  style={styles.bookButton}
                  onPress={() =>
                    router.push({
                      pathname: '/book-consultation',
                      params: {
                        doctorId: doctor.id,
                        name: doctor.full_name,
                        specialty: doctor.specialization,
                      },
                    })
                  }
                >
                  <Text style={styles.bookButtonText}>Book Consultation</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
        )}
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f4f8' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 50,
    backgroundColor: '#284b63',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  searchContainer: { padding: 16 },
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
    backgroundColor: '#284b63',
  },
  selectedFilterText: {
    color: '#fff',
  },
  cardsContainer: { padding: 16 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
  },
  cardContent: { padding: 15 },
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
    color: '#284b63',
  },
  availabilityText: {
    fontSize: 14,
    color: '#40c057',
    fontWeight: '500',
  },
  bookButton: {
    backgroundColor: '#284b63',
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