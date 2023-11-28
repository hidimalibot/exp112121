import { createStackNavigator } from '@react-navigation/stack';
import ProductInputScreen from './ProductInputScreen';

const Stack = createStackNavigator();

const YourStackComponent = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProductInput"
        component={ProductInputScreen}
        options={({ route }) => ({ title: route.params.category })}
      />
    </Stack.Navigator>
  );
};

export default YourStackComponent;
