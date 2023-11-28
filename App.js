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

  const Stack = createStackNavigator();

  export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
    }, []);

    return (
      <NavigationContainer>
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <Stack.Navigator initialRouteName="Landing">
            {/* Landing Page */}
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={{ headerShown: false }}
            />

            {/* Main App Screens */}
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
          </Stack.Navigator>
        )}
      </NavigationContainer>
    );
  }
