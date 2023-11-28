import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProductProfile = ({ productData, onEdit }) => {
  const { name, category, expirationDate } = productData;

  return (
    <TouchableOpacity onPress={() => onEdit(productData)}>
      <View style={styles.container}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.category}>Category: {category}</Text>
        <Text style={styles.expirationDate}>Expiration Date: {expirationDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  category: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 4,
  },
  expirationDate: {
    fontSize: 14,
    color: 'gray',
  },
});

export default ProductProfile;
