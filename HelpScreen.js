import React, { useState, useEffect } from 'react';
import { Text, View,TouchableOpacity, ScrollView, StyleSheet, Pressable} from 'react-native';
import { collection, getDocs, db } from './firebase/index';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const HelpScreen = () => {
  const [products, setProducts] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = collection(db, 'products');
        const querySnapshot = await getDocs(q);
        const productsData = [];

        querySnapshot.forEach((doc) => {
          productsData.push({ ...doc.data(), id: doc.id });
        });

        productsData.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));

        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };

    fetchProducts();
  }, []);

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

    return products
      .filter((product) => new Date(product.expirationDate) <= end)
      .map((product) => (
        <View key={product.name} style={styles.productContainer}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productDate}>{formatDate(product.expirationDate)}</Text>
        </View>
      ));
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePeriodPress = (period) => {
    setSelectedPeriod(period);
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SUMMARY</Text>

      {/* Pressable components for each period in one row */}
      <View style={styles.rowContainer}>
        <Pressable
          style={styles.pressable}
          onPress={() => handlePeriodPress('day')}
        >
          <Text style={styles.pressableText}>Day</Text>
        </Pressable>

        <Pressable
          style={styles.pressable}
          onPress={() => handlePeriodPress('week')}
        >
          <Text style={styles.pressableText}>Week</Text>
        </Pressable>

        <Pressable
          style={styles.pressable}
          onPress={() => handlePeriodPress('month')}
        >
          <Text style={styles.pressableText}>Month</Text>
        </Pressable>
      </View>

      {/* Display the list of products based on the selected period */}
      {selectedPeriod && (
        <ScrollView>
          <Text style={styles.subtitle}>Products expiring within {selectedPeriod}:</Text>
          {filterProductsByPeriod(selectedPeriod)}
        </ScrollView>
      )}

      {/* Icon buttons at the bottom of the screen */}
      <View style={styles.violetContainer}>
    <View style={styles.pressablesContainer}>
    <TouchableOpacity
      style={styles.pressableb}
      onPress={() => {
        navigation.replace('Landing');
      }}
    >
      <Icon name="home" type="font-awesome" size={24} color="black" />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.pressableb}
      onPress={() => {
        navigation.navigate('ExpiTrack');
      }}
    >
      {/* Change the icon name to "bars" for a menu icon */}
      <Icon name="bars" type="font-awesome" size={24} color="black" />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.pressableb}
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
      justifyContent: 'flex-start', // Align to the top
      alignItems: 'center',
      backgroundColor: '#f6f5f5',
    },
    title: {
      alignSelf: 'flex-start', // Align to the upper-left
      color: '#2d0c57',
      fontSize: 45,
      fontWeight: 'bold',
      position: 'absolute',
      top: 70,
      left: 15,
    },
    subtitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 16,
    },
    rowContainer: {
      flexDirection: 'row',
    },
    pressable: {
      backgroundColor: '#76D7C4',
      padding: 10,
      margin: 5,
      borderRadius: 5,
      marginTop: 170, // Adjust the marginTop as needed
    },
    pressableText: {
      fontSize: 16,
    },
    productContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 8,
    },
    productName: {
      fontSize: 16,
    },
    productDate: {
      fontSize: 16,
      color: 'gray',
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
      pressableb: {
        alignItems: 'center',
        marginHorizontal: 50, // Add margin to create space between icons
      },
  });
  
  export default HelpScreen;
