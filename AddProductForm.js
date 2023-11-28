import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddProductForm = ({ onAddProduct }) => {
  const [productName, setProductName] = useState('');

  const handleAddProduct = () => {
    if (productName) {
      onAddProduct(productName);
      setProductName('');
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddProductForm;
