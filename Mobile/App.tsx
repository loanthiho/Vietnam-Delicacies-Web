import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import {ProductDetailScreen} from './src/Screens/Product/ProductDetail';
import ProductDetailScreen from './src/Screens/Product/ProductDetail';
import HomePage from './src/Screens/HomeScreens';
import ChatScreen from './src/Screens/ChatScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import CartScreen from './src/Screens/CartScreen';
import Payment from './src/Screens/Payment/Payment';
import ShopOwnerScreen from './src/Screens/Shop/ShopOwner';
import Seller from './src/Seller/Seller';
import AddProduct from './src/Seller/AddProduct';
import SignUp from './src/Screens/userAuth/signUp';
import ChooseRole from './src/Screens/userAuth/signUp/ChooseRule';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';
          if (route.name === 'Trang chủ') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Giỏ hàng') {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === 'Tin nhắn') {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
          } else if (route.name === 'Tôi') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color="#2E7d32" />;
        },
      })}>
      <Tab.Screen name="Trang chủ" component={HomePage} />
      <Tab.Screen name="Giỏ hàng" component={CartScreen} />
      <Tab.Screen name="Tin nhắn" component={ChatScreen} />
      <Tab.Screen name="Tôi" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="SignUp">
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
          />
          <Stack.Screen
            name="ShopOwnerScreen"
            component={ShopOwnerScreen}
          />
          <Stack.Screen
            name="Payment"
            component={Payment}
          />
          <Stack.Screen
            name="Main"
            component={TabNavigator}
          />
          <Stack.Screen name='SignUp' component={SignUp} />
          <Stack.Screen name='ChooseRole' component={ChooseRole} />
        </Stack.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
