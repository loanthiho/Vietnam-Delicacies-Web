import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import AddProduct from './AddProduct';
import ProductScreen from './ProductScreen';
import UpdateProduct from './UpdateProduct';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();
const Seller = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ProductScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="ProductScreen" component={ProductScreen} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
        <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Seller;
