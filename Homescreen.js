import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Icon } from 'react-native-elements'; 
import { useNavigation } from '@react-navigation/native';
import { db, collection, getDocs } from './firebase/index';

const HomeScreen = () => {
  const [nameList, setNameList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [backgroundColor, setBackgroundColor] = useState(generateRandomColor()); // Initial random color
  const navigation = useNavigation();

  function generateRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function generateColorByIndex(index) {
    const colors = ['#EC7063', '#9B59B6', '#3498DB', '#1ABC9C', '#2C3E50', '#F4D03F'];
    return colors[index % colors.length];
  }

  const addNameToList = (name) => {
    setNameList([...nameList, name]);
  };

  const fetchCategories = async () => {
    try {
      const categoriesCollection = collection(db, 'categories');
      const querySnapshot = await getDocs(categoriesCollection);

      const categories = [];
      querySnapshot.forEach((doc) => {
        categories.push(doc.data().name);
      });

      // Sort the categories alphabetically
      const sortedCategories = categories.sort((a, b) => a.localeCompare(b));
      
      setNameList(sortedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredNameList = nameList.filter((name) =>
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: backgroundColor }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
    >
      <View style={styles.container}>
        <Text style={styles.textAbove}>CATEGORIES</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="🔍 SEARCH"
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
        </View>
        <ScrollView
          style={styles.categoryContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.nameList}>
            {filteredNameList.map((name, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.nameBox,
                  index % 2 === 0 ? styles.leftNameBox : styles.rightNameBox,
                  { backgroundColor: generateColorByIndex(index) },
                ]}
                onPress={() => {
                  navigation.navigate('ProductInput', { category: name });
                }}
              >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.roundButton}
            onPress={() => {
              navigation.navigate('Category', { addNameToList });
            }}
          >
            <Text style={styles.buttonText}>ADD</Text>
          </TouchableOpacity>
        </View>
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
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 150,
    paddingHorizontal: 16,
    backgroundColor: '#f6f5f5',
  },
  textAbove: {
    textAlign: 'center',
    color: '#2d0c57',
    fontSize: 45,
    fontWeight: 'thin',
    fontWeight: 'bold',
    position: 'absolute',
    top: 70,
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
  nameList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  nameBox: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 40,
    width: '48%',
    marginVertical: 5,
    borderRadius: 20,
    marginRight: 5,
  },
  
  leftNameBox: {
    alignSelf: 'flex-start',
  },
  rightNameBox: {
    alignSelf: 'flex-end',
  },
  categoryContainer: {
    maxHeight: 420,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 80,
    right: 150,
    width: 100,
    height: 40,
  },
  roundButton: {
    borderRadius: 20,
    backgroundColor: 'black',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
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
});

export default HomeScreen;
