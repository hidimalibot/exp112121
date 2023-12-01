// LandingPage.js
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import ProductProfile from './ProductProfile';
import { db } from './firebase/index';

const LandingPage = () => {
  const [expiringProducts, setExpiringProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const fetchExpiringProducts = async () => {
      try {
        const productsCollection = collection(db, 'products');
        const querySnapshot = await getDocs(productsCollection);

        const expiringProductsData = [];
        querySnapshot.forEach((doc) => {
          expiringProductsData.push({ id: doc.id, ...doc.data() });
        });

        expiringProductsData.sort((a, b) => {
          const dateA = new Date(a.expirationDate);
          const dateB = new Date(b.expirationDate);
          return dateA - dateB;
        });

        setExpiringProducts(expiringProductsData);
      } catch (error) {
        console.error('Error fetching expiring products:', error);
        setErrorMessage('Error fetching expiring products');
      }
    };

    fetchExpiringProducts();
  }, []);

  const filteredExpiringProducts = expiringProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const navigateToEditScreen = (productId) => {
    navigation.navigate('EditProductScreen', { productData: productId, onSave: handleSave });
  };

  const handleSave = (editedProduct) => {
    console.log('Save edited product:', editedProduct);
  };

  const handleEdit = (productId) => {
    console.log('Edit product with ID:', productId);
  };

  const handleDelete = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId));

      const updatedProducts = expiringProducts.filter((product) => product.id !== productId);
      setExpiringProducts(updatedProducts);
    } catch (error) {
      console.error('Error deleting product:', error);
      setErrorMessage('Error deleting product');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PRODUCTS</Text>
      {errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="🔍 SEARCH"
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
            />
          </View>
          <ScrollView style={styles.productContainer} showsVerticalScrollIndicator={false}>
            {filteredExpiringProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                style={styles.productItem}
                onPress={() => navigateToEditScreen(product.id)}
              >
                <ProductProfile productData={product} onEdit={handleEdit} onDelete={handleDelete} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </>
      )}
<View style={styles.violetContainer}>
  <View style={styles.pressablesContainer}>
    <TouchableOpacity
      style={styles.pressable}
      onPress={() => {
        navigation.replace('Landing');
      }}
    >
      <Icon name="home" type="font-awesome" size={24} color="black" />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.pressable}
      onPress={() => {
        navigation.navigate('ExpiTrack');
      }}
    >
      {/* Change the icon name to "bars" for a menu icon */}
      <Icon name="bars" type="font-awesome" size={24} color="black" />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.pressable}
      onPress={() => {
        navigation.navigate('Help');
      }}
    >
      {/* Change the icon name to "calendar" */}
      <Icon name="calendar" type="font-awesome" size={24} color="black" />
    </TouchableOpacity>
  </View>
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#f6f5f5',
  },
  title: {
    color: '#2d0c57',
    fontSize: 45,
    fontWeight: 'bold', // Change 'thin' to 'bold'
    top: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderColor: '#d4bfb0',
    alignContent: 'center',
    alignItems: 'center',
    top: 50,
  },
  textInput: {
    color: '#9586A8',
    borderWidth: 1,
    borderColor: '#D9D0E3',
    marginRight: 15,
    padding: 5,
    width: 350,
    borderRadius: 27,
    backgroundColor: 'white',
  },
  productContainer: {
    maxHeight: 420,
    top: 80,
  },
  productItem: {
    marginBottom: 16,
  },
  violetContainer: {
    backgroundColor: '#f6f5f5',
    padding: 5,
    marginTop: 'auto',
    borderRadius: 10,
    marginBottom: 10,
  },
  pressablesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 10,
  },
  pressable: {
    alignItems: 'center',
  },
  pressableText: {
    color: 'black',
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});

export default LandingPage;
