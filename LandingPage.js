import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet, Pressable } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { collection, getDocs } from 'firebase/firestore';
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

  // Define onEdit function to be passed to ProductProfile
  const handleEdit = (productId) => {
    // Implement your logic to navigate to the EditProduct screen with the product ID
    console.log('Edit product with ID:', productId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Expiring Products</Text>
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
                {/* Pass onEdit as a prop to ProductProfile */}
                <ProductProfile productData={product} onEdit={handleEdit} />
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
                navigation.navigate('Landing');
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
              <Icon name="calendar" type="font-awesome" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.pressable}
              onPress={() => {
                // Handle onPress for the third icon
              }}
            >
              <Icon name="question" type="font-awesome" size={24} color="black" />
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
    fontWeight: 'thin',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderColor: '#d4bfb0',
    alignContent: 'center',
    alignItems: 'center',
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
