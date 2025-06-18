// app/laboratory-tests.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 'blood', name: 'Blood Tests', icon: 'water' },
  { id: 'urine', name: 'Urine Tests', icon: 'flask' },
  { id: 'imaging', name: 'Imaging', icon: 'scan' },
  { id: 'cancer', name: 'Cancer Screening', icon: 'alert-circle' },
  { id: 'hormone', name: 'Hormone Tests', icon: 'pulse' },
  { id: 'allergy', name: 'Allergy Tests', icon: 'flower' },
];

const tests = [
  {
    id: '1',
    name: 'Complete Blood Count',
    category: 'blood',
    description: 'Measures different components of your blood',
    price: 'PKR 1,200',
    discount: '20% OFF',
    originalPrice: 'PKR 1,500',
    fasting: 'Fasting Required',
    results: '24 hours'
  },
  {
    id: '2',
    name: 'Thyroid Profile',
    category: 'hormone',
    description: 'Tests thyroid gland function',
    price: 'PKR 2,500',
    discount: '15% OFF',
    originalPrice: 'PKR 2,950',
    fasting: 'No Fasting',
    results: '48 hours'
  },
  {
    id: '3',
    name: 'Ultrasound Abdomen',
    category: 'imaging',
    description: 'Imaging test for abdominal organs',
    price: 'PKR 3,800',
    discount: '10% OFF',
    originalPrice: 'PKR 4,200',
    fasting: 'Fasting Required',
    results: 'Same day'
  },
];

const LaboratoryTests = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(0);

  const filteredTests = tests.filter(test => 
    test.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    test.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Laboratory Tests</Text>
        <TouchableOpacity onPress={() => router.push('/cart')}>
          <View style={styles.cartBadge}>
            <Ionicons name="cart" size={24} color="#fff" />
            {cartCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{cartCount}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#aaa" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search tests or packages..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.infoBanner}>
        <Ionicons name="information-circle" size={24} color="#2c5282" />
        <Text style={styles.infoText}>
          Home sample collection available for all tests
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesContainer}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryButton,
              selectedCategory === category.id && styles.selectedCategory
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Ionicons 
              name={category.icon} 
              size={24} 
              color={selectedCategory === category.id ? '#fff' : '#284b63'} 
            />
            <Text style={[
              styles.categoryName,
              selectedCategory === category.id && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Popular Tests</Text>
        
        {filteredTests.map((test) => (
          <TouchableOpacity 
            key={test.id}
            style={styles.testCard}
            onPress={() => router.push(`/test-detail/${test.id}`)}
          >
            <Ionicons name="flask" size={48} color="#3182ce" style={styles.testIcon} />
            <View style={styles.testInfo}>
              <Text style={styles.testName}>{test.name}</Text>
              <Text style={styles.testDescription}>{test.description}</Text>
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Ionicons name="time" size={16} color="#6c757d" />
                  <Text style={styles.detailText}>{test.results}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="restaurant" size={16} color="#6c757d" />
                  <Text style={styles.detailText}>{test.fasting}</Text>
                </View>
              </View>
              
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{test.price}</Text>
                <Text style={styles.originalPrice}>{test.originalPrice}</Text>
                <View style={styles.discountTag}>
                  <Text style={styles.discountTagText}>{test.discount}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => setCartCount(cartCount + 1)}
              >
                <Text style={styles.addButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.packageBanner}>
        <Ionicons name="cube" size={32} color="#fff" />
        <View style={styles.packageContent}>
          <Text style={styles.packageTitle}>Health Packages</Text>
          <Text style={styles.packageText}>Save up to 40% with our health checkup packages</Text>
        </View>
        <Ionicons name="arrow-forward" size={24} color="#fff" />
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
    backgroundColor: '#284b63',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartBadge: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#e53e3e',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf8ff',
    padding: 15,
    margin: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2c5282',
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#2c5282',
    flex: 1,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },
  categoryName: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#4a5568',
  },
  selectedCategory: {
    backgroundColor: '#284b63',
  },
  selectedCategoryText: {
    color: '#fff',
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
  testCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  testIcon: {
    marginRight: 15,
  },
  testInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  testDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 2,
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  detailText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#495057',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    flexWrap: 'wrap',
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#284b63',
    marginRight: 10,
  },
  originalPrice: {
    fontSize: 14,
    color: '#a0aec0',
    textDecorationLine: 'line-through',
    marginRight: 10,
  },
  discountTag: {
    backgroundColor: '#dbeafe',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  discountTagText: {
    color: '#3182ce',
    fontWeight: 'bold',
    fontSize: 12,
  },
  addButton: {
    backgroundColor: '#284b63',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  packageBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#284b63',
    padding: 20,
    margin: 16,
    borderRadius: 15,
    elevation: 3,
  },
  packageContent: {
    flex: 1,
    marginHorizontal: 15,
  },
  packageTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  packageText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default LaboratoryTests;