// ProductProfile.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Modal } from 'react-native';

const ProductProfile = ({ productData, onEdit, onDelete }) => {
  const { name, category, expirationDate } = productData;
  const [isDeleteModalVisible, setDeleteModalVisible] = useState(false);

  const handleDelete = () => {
    setDeleteModalVisible(false);
    onDelete(productData.id);
  };

  return (
    <TouchableOpacity onPress={() => onEdit(productData)}>
      <View style={styles.container}>
        <Text style={styles.productName}>{name}</Text>
        <Text style={styles.category}>Category: {category}</Text>
        <Text style={styles.expirationDate}>Expiration Date: {expirationDate}</Text>
        <Button title="Delete" onPress={() => setDeleteModalVisible(true)} color="#EA1600" />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDeleteModalVisible}
          onRequestClose={() => setDeleteModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Do you really want to delete this product??</Text>
              <Button title="Cancel" onPress={() => setDeleteModalVisible(false)} color="#7F8C8D" />
              <Button title="Yes" onPress={handleDelete} color="#EA1600" />
            </View>
          </View>
        </Modal>
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
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ProductProfile;
