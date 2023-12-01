import React, { useState, useEffect } from 'react';
import { ScrollView, Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import AddProductForm from './AddProductForm';
import ProductProfile from './ProductProfile';
import { collection, addDoc, setDoc, db, doc, getDocs, query, where, deleteDoc } from './firebase/index';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


const ProductInputScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [productList, setProductList] = useState([]);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  const filterProductsByPeriod = (period) => {
    const now = new Date();
    const end = new Date();

    switch (period) {
      case 'day':
        end.setDate(now.getDate() + 1);
        break;
      case 'week':
        end.setDate(now.getDate() + 7);
        break;
      case 'month':
        end.setMonth(now.getMonth() + 1);
        break;
      default:
        break;
    }

    return productList.filter((product) => new Date(product.expirationDate) <= end);
  };

  const handleAddProduct = async (productName) => {
    const productData = { name: productName, category, expirationDate: 'N/A' };

    // Add a new document to the 'products' collection
    const docRef = await addDoc(collection(db, 'products'), productData);

    // Update the local product list
    setProductList([...productList, { ...productData, id: docRef.id }]);
    setIsAddingProduct(false);
  };

  const handleEditProduct = (productData) => {
    navigation.navigate('EditProduct', {
      productData,
      onSave: (editedProduct) => handleSaveProduct(productData, editedProduct),
    });
  };

  const handleSaveProduct = async (oldProduct, editedProduct) => {
    const productDocRef = doc(db, 'products', oldProduct.id);

    // Update the document in the 'products' collection
    await setDoc(productDocRef, editedProduct);

    // Update the local product list
    const updatedList = productList.map((product) => {
      if (product.id === oldProduct.id) {
        return { ...product, ...editedProduct };
      }
      return product;
    });

    setProductList(updatedList);
  };

  const handleDeleteProduct = async (productId) => {
    // Remove the product from the 'products' collection in the database
    await deleteDoc(doc(db, 'products', productId));

    // Update the local product list
    const updatedList = productList.filter((product) => product.id !== productId);
    setProductList(updatedList);
  };

  const handleAddButtonPress = () => {
    setIsAddingProduct(true);
  };

  useEffect(() => {
    // Fetch documents from the 'products' collection based on the category
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('category', '==', category));
      const querySnapshot = await getDocs(q);

      const products = [];
      querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: doc.id });
      });

      setProductList(products);
    };

    fetchProducts();
  }, [category]); // Trigger the effect whenever the category changes

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{category}</Text>
      {isAddingProduct ? (
        <AddProductForm onAddProduct={handleAddProduct} />
      ) : (
        <View>
          {productList.map((product) => (
            <View key={product.id}>
              <ProductProfile
                productData={product}
                onEdit={() => handleEditProduct(product)}
                onDelete={() => handleDeleteProduct(product.id)}
              />
            </View>
          ))}
          <Button title="Add" onPress={handleAddButtonPress} />
        </View>
      )}
    </ScrollView>
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
});

export default ProductInputScreen;
