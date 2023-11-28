// EditProductScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import ThresholdInput from './ThresholdInput';

const EditProductScreen = ({ route, navigation }) => {
  const { productData, onSave } = route.params;
  const [editedProduct, setEditedProduct] = useState({ ...productData });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [threshold, setThreshold] = useState(productData.threshold || 0);

  const handleSave = () => {
    if (!editedProduct.name || !editedProduct.category || !editedProduct.expirationDate) {
      setModalVisible(true);
    } else {
      const productWithThreshold = { ...editedProduct, threshold };
      onSave(productWithThreshold); // Pass the product with updated threshold to onSave

      // Use goBack with the specific route name to go back to ProductInputScreen
      navigation.goBack('ProductInput');
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setEditedProduct({ ...editedProduct, expirationDate: formattedDate });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Product</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={editedProduct.name}
        onChangeText={(text) => setEditedProduct({ ...editedProduct, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={editedProduct.category}
        onChangeText={(text) => setEditedProduct({ ...editedProduct, category: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Expiration Date"
        value={editedProduct.expirationDate}
        onFocus={() => setShowDatePicker(true)}
      />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
      {/* Use ThresholdInput to update the threshold state */}
      <ThresholdInput initialThreshold={threshold} onSaveThreshold={setThreshold} />
      {/* Modal for empty fields */}
      <Modal transparent={true} visible={modalVisible} animationType="none">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Please fill in all fields.</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalButton}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Single "Save" button */}
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  // Styles for the modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 10,
  },
  modalButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 5,
  },
});

export default EditProductScreen;
