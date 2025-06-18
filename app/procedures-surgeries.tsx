import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const categories = [
  { id: 'cosmetic', name: 'Cosmetic', icon: 'body' },
  { id: 'orthopedic', name: 'Orthopedic', icon: 'walk' },
  { id: 'cardiac', name: 'Cardiac', icon: 'heart' },
  { id: 'neurological', name: 'Neurological', icon: 'brain' },
  { id: 'dental', name: 'Dental', icon: 'medical' },
  { id: 'ophthalmic', name: 'Ophthalmic', icon: 'eye' },
];

const procedures = [
  {
    id: '1',
    name: 'Laser Eye Surgery',
    category: 'ophthalmic',
    description: 'Correct vision problems with laser technology',
    duration: '30 min',
    recovery: '1-2 days',
    price: 'PKR 80,000',
    hospitals: 15,
  },
  {
    id: '2',
    name: 'Knee Replacement',
    category: 'orthopedic',
    description: 'Surgical procedure to replace damaged knee joint',
    duration: '2 hours',
    recovery: '6-12 weeks',
    price: 'PKR 450,000',
    hospitals: 8,
  },
  {
    id: '3',
    name: 'Dental Implants',
    category: 'dental',
    description: 'Replace missing teeth with artificial roots',
    duration: '1-2 hours',
    recovery: '3-6 months',
    price: 'PKR 50,000',
    hospitals: 22,
  },
];

const ProceduresSurgeries = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProcedures = selectedCategory === 'all' 
    ? procedures 
    : procedures.filter(p => p.category === selectedCategory);

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Procedures & Surgeries</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.infoBanner}>
        <Ionicons name="information-circle" size={24} color="#2c5282" />
        <Text style={styles.infoText}>
          All procedures are performed by certified surgeons in accredited facilities
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
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
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {selectedCategory === 'all' ? 'All Procedures' : `${categories.find(c => c.id === selectedCategory)?.name} Procedures`}
        </Text>
        
        {filteredProcedures.map((procedure) => (
          <TouchableOpacity 
            key={procedure.id}
            style={styles.procedureCard}
            onPress={() => router.push(`/procedure-detail/${procedure.id}`)}
          >
            <View style={styles.procedureInfo}>
              <Text style={styles.procedureName}>{procedure.name}</Text>
              <Text style={styles.procedureDescription}>{procedure.description}</Text>
              
              <View style={styles.detailsContainer}>
                <View style={styles.detailItem}>
                  <Ionicons name="time" size={16} color="#6c757d" />
                  <Text style={styles.detailText}>{procedure.duration}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="calendar" size={16} color="#6c757d" />
                  <Text style={styles.detailText}>{procedure.recovery} recovery</Text>
                </View>
              </View>
              
              <View style={styles.priceContainer}>
                <Text style={styles.priceText}>{procedure.price}</Text>
                <View style={styles.hospitalsContainer}>
                  <Ionicons name="business" size={16} color="#6c757d" />
                  <Text style={styles.hospitalsText}>{procedure.hospitals} hospitals</Text>
                </View>
              </View>
              
              <TouchableOpacity style={styles.consultButton}>
                <Text style={styles.consultButtonText}>Consult a Surgeon</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.financeBanner}>
        <View style={styles.financeContent}>
          <Text style={styles.financeTitle}>Financial Assistance Available</Text>
          <Text style={styles.financeText}>
            Get help with medical financing and insurance claims
          </Text>
          <TouchableOpacity style={styles.financeButton}>
            <Text style={styles.financeButtonText}>Learn More</Text>
          </TouchableOpacity>
        </View>
        <Ionicons name="wallet" size={60} color="#284b63" style={styles.financeIcon} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Patient Success Stories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[1, 2, 3].map((item) => (
            <View key={item} style={styles.storyCard}>
              <Ionicons name="person-circle" size={60} color="#cbd5e0" style={styles.patientIcon} />
              <Text style={styles.storyTitle}>My Knee Replacement Journey</Text>
              <Text style={styles.storyText} numberOfLines={3}>
                "The team made my surgery experience comfortable and pain-free. Recovery was faster than expected."
              </Text>
              <Text style={styles.patientName}>- Ahmed Raza, 62</Text>
            </View>
          ))}
        </ScrollView>
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
  infoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf8ff',
    padding: 15,
    margin: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2c5282', // Updated to dark blue
  },
  infoText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#2c5282', // Updated to dark blue
    flex: 1,
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
  categoriesContainer: {
    paddingBottom: 5,
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
    backgroundColor: '#284b63', // Updated to theme color
  },
  selectedCategoryText: {
    color: '#fff',
  },
  procedureCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 3,
    padding: 15,
  },
  procedureInfo: {
    padding: 0,
  },
  procedureName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 5,
  },
  procedureDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 15,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#284b63', // Updated to theme color
  },
  hospitalsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hospitalsText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#495057',
  },
  consultButton: {
    backgroundColor: '#284b63', // Updated to theme color
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  consultButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  financeBanner: {
    backgroundColor: '#ebf8ff',
    borderRadius: 15,
    margin: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
  },
  financeContent: {
    flex: 1,
  },
  financeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#284b63', // Updated to theme color
    marginBottom: 5,
  },
  financeText: {
    fontSize: 14,
    color: '#2c5282', // Updated to dark blue
    marginBottom: 15,
  },
  financeButton: {
    backgroundColor: '#284b63', // Updated to theme color
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  financeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  financeIcon: {
    marginLeft: 10,
  },
  storyCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginRight: 15,
    width: 280,
    elevation: 2,
  },
  patientIcon: {
    alignSelf: 'center',
    marginBottom: 15,
  },
  storyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    textAlign: 'center',
    marginBottom: 10,
  },
  storyText: {
    fontSize: 14,
    color: '#4a5568',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  patientName: {
    fontSize: 14,
    color: '#718096',
    fontWeight: '500',
    textAlign: 'right',
  },
});

export default ProceduresSurgeries;