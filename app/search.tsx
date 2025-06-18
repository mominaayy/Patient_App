import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  FlatList,
  Pressable,
  Animated
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const specialties = [
  { label: 'Skin Specialist', icon: 'color-palette', color: '#FF7043' },
  { label: 'Gynecologist', icon: 'female', color: '#E91E63' },
  { label: 'Urologist', icon: 'water', color: '#00BCD4' },
  { label: 'Child Specialist', icon: 'happy', color: '#FF9800' },
  { label: 'Orthopedic', icon: 'bone', color: '#795548' },
  { label: 'Physician', icon: 'person', color: '#9C27B0' },
  { label: 'ENT Specialist', icon: 'ear', color: '#3F51B5' },
  { label: 'Neurologist', icon: 'brain', color: '#673AB7' },
  { label: 'Eye Specialist', icon: 'eye', color: '#2196F3' },
  { label: 'Psychiatrist', icon: 'chatbubble-ellipses', color: '#4CAF50' },
  { label: 'Dentist', icon: 'medical', color: '#C2185B' },
  { label: 'Gastroenterologist', icon: 'nutrition', color: '#FF5722' },
  { label: 'Cardiologist', icon: 'heart', color: '#F44336' },
  { label: 'Pulmonologist', icon: 'cloud', color: '#03A9F4' },
  { label: 'General Physician', icon: 'people', color: '#607D8B' },
  { label: 'Diabetes', icon: 'ice-cream', color: '#8BC34A' },
  { label: 'Surgeon', icon: 'cut', color: '#FF7043' },
  { label: 'Endocrinologist', icon: 'flask', color: '#CDDC39' },
  { label: 'Nephrologist', icon: 'water-outline', color: '#26C6DA' },
  { label: 'Pain Management', icon: 'medkit', color: '#FFB300' },
];

const SearchScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const filteredSpecialties = specialties.filter(specialty => 
    specialty.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFocus = () => {
    setIsSearchFocused(true);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsSearchFocused(false);
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      Keyboard.dismiss();
      router.push({ pathname: '/doctor-list', params: { search: searchQuery } });
    }
  };

  const handleSpecialtyPress = (specialty) => {
    router.push({ pathname: '/doctor-list', params: { specialty } });
  };

  const borderColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#e0e0e0', '#284b63']
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.cityLabel}>Current city</Text>
          <Text style={styles.cityName}>Islamabad</Text>
        </View>
        <TouchableOpacity style={styles.locationButton}>
          <Ionicons name="location-sharp" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <Animated.View style={[styles.searchContainer, { borderColor }]}>
        <Ionicons name="search" size={20} color="#aaa" style={styles.searchIcon} />
        <TextInput
          placeholder="Find Doctors, Specialties, Disease and Hospital"
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearchSubmit}
          returnKeyType="search"
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoFocus={true}
        />
        {searchQuery.length > 0 && (
          <Pressable 
            style={styles.clearButton}
            onPress={() => setSearchQuery('')}
          >
            <Ionicons name="close-circle" size={20} color="#aaa" />
          </Pressable>
        )}
      </Animated.View>

      {/* Search Results */}
      {searchQuery.length > 0 && (
        <View style={styles.searchResults}>
          <Text style={styles.resultsTitle}>Search Results</Text>
          <FlatList
            data={filteredSpecialties}
            keyExtractor={(item) => item.label}
            renderItem={({ item }) => (
              <Pressable
                style={styles.resultItem}
                onPress={() => handleSpecialtyPress(item.label)}
              >
                <Ionicons name={item.icon} size={20} color={item.color} />
                <Text style={styles.resultText}>{item.label}</Text>
              </Pressable>
            )}
            ListEmptyComponent={
              <View style={styles.noResults}>
                <Ionicons name="search" size={40} color="#ddd" />
                <Text style={styles.noResultsText}>No specialties found</Text>
              </View>
            }
          />
        </View>
      )}

      {/* Specialty Grid - Compact Design */}
      {searchQuery.length === 0 && (
        <ScrollView contentContainerStyle={styles.gridContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Search by specialty</Text>
            <Text style={styles.sectionCount}>{specialties.length} specialities</Text>
          </View>

          <View style={styles.grid}>
            {specialties.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.card,
                  { backgroundColor: `${item.color}10` } // 10% opacity
                ]}
                onPress={() => handleSpecialtyPress(item.label)}
              >
                <View style={[styles.iconContainer, { backgroundColor: `${item.color}20` }]}>
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <Text style={styles.cardText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#284b63',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerContent: {
    flex: 1,
  },
  cityLabel: {
    color: '#D9E3F0',
    fontSize: 14,
    fontWeight: '500',
  },
  cityName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 2,
  },
  locationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    padding: 8,
    borderRadius: 15,
    borderWidth: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginHorizontal: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  clearButton: {
    padding: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#284b63',
  },
  sectionCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  gridContainer: {
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  // Smaller card styles
  card: {
    width: CARD_WIDTH,
    backgroundColor: '#f8f8f8',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 16,
  },
  searchResults: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#284b63',
    marginBottom: 12,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  resultText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  noResults: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  noResultsText: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
  },
});