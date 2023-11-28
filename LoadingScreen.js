import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./Load.png')} // Replace with the actual path to your image
        style={styles.image}
      />
      <Text style={styles.loadingText}>ExpiTrack</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#06BE77',
  },
  image: {
    width: 200,
    height: 200,
    transform: [{ scale: 1.0 }], // Adjust the scale value as needed
    resizeMode: 'contain',
  },
  loadingText: {
    marginTop: 5,
    color: 'black',
    fontSize: 35,
  },
});

export default LoadingScreen;
