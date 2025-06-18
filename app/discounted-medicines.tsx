import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 'all', name: 'All Medicines' },
  { id: 'prescription', name: 'Prescription' },
  { id: 'otc', name: 'OTC Products' },
  { id: 'wellness', name: 'Wellness' },
  { id: 'ayurvedic', name: 'Ayurvedic' },
];

const medicines = [
  {
    id: '1',
    name: 'Panadol Extra',
    description: 'Pain Relief Tablets',
    price: 'PKR 120',
    discount: '30% OFF',
    originalPrice: 'PKR 170',
    quantity: '20 Tablets',
  },
  {
    id: '2',
    name: 'Vitamin C Capsules',
    description: 'Immune Support',
    price: 'PKR 850',
    discount: '25% OFF',
    originalPrice: 'PKR 1,130',
    quantity: '60 Capsules',
  },
  {
    id: '3',
    name: 'Accu-Chek Active',
    description: 'Blood Glucose Test Strips',
    price: 'PKR 1,350',
    discount: '15% OFF',
    originalPrice: 'PKR 1,590',
    quantity: '50 Strips',
  },
];

const DiscountedMedicines = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(3);

  const filteredMedicines = medicines.filter(medicine => 
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discounted Medicines</Text>
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
            placeholder="Search medicines or health products..."
            placeholderTextColor="#aaa"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
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
            <Text style={[
              styles.categoryText,
              selectedCategory === category.id && styles.selectedCategoryText
            ]}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.discountBanner}>
        <View style={styles.discountContent}>
          <Text style={styles.discountTitle}>FLAT 25% OFF</Text>
          <Text style={styles.discountText}>On all orders above PKR 1,500</Text>
          <Text style={styles.codeText}>Use code: HEALTH25</Text>
        </View>
        <Ionicons name="pricetag" size={60} color="#2c5282" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Discounted Products</Text>
        
        {filteredMedicines.map((medicine) => (
          <TouchableOpacity 
            key={medicine.id}
            style={styles.medicineCard}
            onPress={() => router.push(`/medicine-detail/${medicine.id}`)}
          >
            <Ionicons name="medical" size={60} color="#3182ce" style={styles.medicineIcon} />
            <View style={styles.medicineInfo}>
              <Text style={styles.medicineName}>{medicine.name}</Text>
              <Text style={styles.medicineDescription}>{medicine.description}</Text>
              <Text style={styles.medicineQuantity}>{medicine.quantity}</Text>
              
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{medicine.price}</Text>
                <Text style={styles.originalPrice}>{medicine.originalPrice}</Text>
                <View style={styles.discountTag}>
                  <Text style={styles.discountTagText}>{medicine.discount}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.addToCartButton}
                onPress={() => setCartCount(cartCount + 1)}
              >
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.deliveryBanner}>
        <View style={styles.deliveryItem}>
          <Ionicons name="timer" size={24} color="#3182ce" />
          <Text style={styles.deliveryText}>90 min delivery</Text>
        </View>
        <View style={styles.deliveryItem}>
          <Ionicons name="shield-checkmark" size={24} color="#3182ce" />
          <Text style={styles.deliveryText}>Authentic Products</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.prescriptionBanner}>
        <Ionicons name="document-attach" size={32} color="#fff" />
        <View style={styles.prescriptionContent}>
          <Text style={styles.prescriptionTitle}>Upload Prescription</Text>
          <Text style={styles.prescriptionText}>Get prescription medicines delivered</Text>
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
    backgroundColor: '#284b63', // Updated to theme color
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
  categoriesContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#edf2f7',
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: '#4a5568',
    fontWeight: '500',
  },
  selectedCategory: {
    backgroundColor: '#284b63', // Updated to theme color
  },
  selectedCategoryText: {
    color: '#fff',
  },
  discountBanner: {
    backgroundColor: '#ebf8ff',
    borderRadius: 15,
    margin: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  discountContent: {
    flex: 1,
  },
  discountTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c5282',
    marginBottom: 5,
  },
  discountText: {
    fontSize: 16,
    color: '#2c5282',
    marginBottom: 5,
  },
  codeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c5282',
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
  medicineCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
  },
  medicineIcon: {
    marginRight: 15,
  },
  medicineInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  medicineDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 2,
  },
  medicineQuantity: {
    fontSize: 14,
    color: '#718096',
    marginTop: 2,
    marginBottom: 10,
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
    color: '#3182ce',
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
  addToCartButton: {
    backgroundColor: '#284b63', // Updated to theme color
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deliveryBanner: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 15,
    elevation: 2,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#2c5282',
    fontWeight: '500',
  },
  prescriptionBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#284b63', // Updated to theme color
    padding: 20,
    margin: 16,
    borderRadius: 15,
    elevation: 3,
  },
  prescriptionContent: {
    flex: 1,
    marginHorizontal: 15,
  },
  prescriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  prescriptionText: {
    fontSize: 14,
    color: '#fff',
  },
});

export default DiscountedMedicines;