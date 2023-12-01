import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements';
import LoadingScreen from './LoadingScreen';
import HomeScreen from './Homescreen';
import NameInputScreen from './NameInputScreen';
import ProductInputScreen from './ProductInputScreen';
import EditProductScreen from './EditProductScreen';
import LandingScreen from './LandingPage';
import HelpScreen from './HelpScreen'; // Import the HelpScreen component

const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Stack.Navigator initialRouteName="Landing">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExpiTrack"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Category"
            component={NameInputScreen}
            options={({ navigation }) => ({
              headerTitle: '',
              headerLeft: () => (
                <Icon
                  name="arrow-left"
                  type="font-awesome"
                  size={24}
                  color="black"
                  containerStyle={{ marginLeft: 16 }}
                  onPress={() => navigation.goBack()}
                />
              ),
            })}
          />
          <Stack.Screen
            name="ProductInput"
            component={ProductInputScreen}
            options={({ navigation }) => ({
              headerTitle: '',
              headerLeft: () => (
                <Icon
                  name="arrow-left"
                  type="font-awesome"
                  size={24}
                  color="black"
                  containerStyle={{ marginLeft: 16 }}
                  onPress={() => navigation.goBack()}
                />
              ),
            })}
          />
          <Stack.Screen
            name="EditProduct"
            component={EditProductScreen}
            options={({ navigation }) => ({
              headerTitle: '',
              headerLeft: () => (
                <Icon
                  name="arrow-left"
                  type="font-awesome"
                  size={24}
                  color="black"
                  containerStyle={{ marginLeft: 16 }}
                  onPress={() => navigation.goBack()}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Help"
            component={HelpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
