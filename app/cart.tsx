// app/cart.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const CartScreen = () => {
  const router = useRouter();
  
  // State for cart items
  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Complete Blood Count',
      type: 'test',
      price: 1200,
      quantity: 1
    },
    {
      id: '2',
      name: 'Laser Eye Surgery',
      type: 'procedure',
      price: 80000,
      quantity: 1
    },
    {
      id: '3',
      name: 'Panadol Extra',
      type: 'medicine',
      price: 120,
      quantity: 2
    }
  ]);

  // Remove an item from cart
  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Update item quantity
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 200;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
        
        {/* Clear cart button */}
        <TouchableOpacity onPress={clearCart}>
          <Ionicons name="trash" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          {cartItems.length === 0 
            ? "Your cart is empty" 
            : `Cart Items (${cartItems.length})`
          }
        </Text>
        
        {cartItems.map((item) => (
          <View key={item.id} style={styles.cartItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemType}>
                {item.type === 'test' && 'Lab Test'}
                {item.type === 'procedure' && 'Medical Procedure'}
                {item.type === 'medicine' && 'Medicine'}
              </Text>
            </View>
            
            <View style={styles.priceContainer}>
              <Text style={styles.priceText}>PKR {(item.price * item.quantity).toLocaleString()}</Text>
              
              <View style={styles.quantityContainer}>
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  <Ionicons name="remove" size={16} color="#fff" />
                </TouchableOpacity>
                
                <Text style={styles.quantityText}>{item.quantity}</Text>
                
                <TouchableOpacity 
                  style={styles.quantityButton}
                  onPress={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  <Ionicons name="add" size={16} color="#fff" />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => removeItem(item.id)}
              >
                <Ionicons name="close" size={20} color="#e53e3e" />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {cartItems.length > 0 && (
          <>
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>PKR {subtotal.toLocaleString()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Delivery Fee</Text>
                <Text style={styles.summaryValue}>PKR {deliveryFee.toLocaleString()}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax (5%)</Text>
                <Text style={styles.summaryValue}>PKR {tax.toLocaleString()}</Text>
              </View>
              <View style={[styles.summaryRow, styles.totalRow]}>
                <Text style={[styles.summaryLabel, styles.totalLabel]}>Total</Text>
                <Text style={[styles.summaryValue, styles.totalValue]}>
                  PKR {total.toLocaleString()}
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.checkoutButton}
              onPress={() => {
                clearCart();
                router.push('/payment-confirmation');
              }}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity 
          style={styles.continueButton}
          onPress={() => router.push('/')}
        >
          <Text style={styles.continueButtonText}>
            {cartItems.length > 0 ? 'Continue Shopping' : 'Browse Services'}
          </Text>
        </TouchableOpacity>
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
    backgroundColor: '#284b63',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 20,
  },
  cartItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 5,
  },
  itemType: {
    fontSize: 14,
    color: '#6c757d',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#284b63',
    marginBottom: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#284b63',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: 5,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 12,
    marginTop: 5,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#4a5568',
  },
  summaryValue: {
    fontSize: 16,
    color: '#4a5568',
    fontWeight: '500',
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#212529',
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#212529',
    fontSize: 18,
  },
  checkoutButton: {
    backgroundColor: '#284b63',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  continueButton: {
    backgroundColor: '#e2e8f0',
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  continueButtonText: {
    color: '#4a5568',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CartScreen;