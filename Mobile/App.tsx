import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductDetailScreen from './src/Screens/Product/ProductDetail';
import HomePage from './src/Screens/HomeScreens';
import ChatScreen from './src/Screens/ChatScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import CartScreen from './src/Screens/CartScreen';
import Payment from './src/Screens/Payment/PaymentScreen';
import ShopOwnerScreen from './src/Screens/Shop/ShopOwner';
import EditContact from './src/components/Payment/EditContact';
import Contact from './src/components/Payment/AddContact';
import AddressComponent from './src/components/Payment/AddressComponent';
import SignUp from './src/Screens/userAuth/signUp';
import ChooseRole from './src/Screens/userAuth/signUp/ChooseRule';
import ForgotPasswordScreen from './src/Hooks/forgotPassword';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';
import FlashMessage from 'react-native-flash-message';
import SignIn from './src/Screens/userAuth/logIn';
import SuccessfulPayment from './src/components/Payment/SuccessfulPayment';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';
import AccSetup from './src/AccConversion/AccSetup';
import AccSeller from './src/AccConversion/AccSeller';
import AddProduct from './src/Seller/AddProduct';
import ProductScreen from './src/Seller/ProductScreen';
import UpdateProduct from './src/Seller/UpdateProduct';
import EditProfileScreen from './src/components/Profile/EditProfile';
import OrderScreen from './src/Screens/Order/OrderScreen';
import OrderScreenSeller from './src/Seller/Order/OrderScreenSeller';
import MessegesScreen from './src/Screens/MessengesScreen';
import { getUserAccessToken } from './src/api/storage';
import ReviewScreen from './src/Screens/ReviewScreen';
// Seller
import ShopSeller from './src/Seller/ShopSeller';
import Help from './src/Support/Help';
import AppInf from './src/Support/AppInf';
import Notification from './src/Seller/Notifications/Notification';
import MessageSeller from './src/Seller/Notifications/MessageSeller';
// import Demo from './src/Seller/Demo';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality',
  'Each child in a list should have a unique "key" prop.',
  'ViewPropTypes will be removed from React Native, along with all other PropTypes',
  'Encountered two children with the same key',
  `Image source "null" doesn't exist`,
  'new NativeEventEmitter()` was called with a non-null argument without the required `addListener` method',
  '`new NativeEventEmitter()` was called with a non-null argument without the required `removeListeners` method.',
]);

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
          return <Ionicons name={iconName} size={28} color="#2E7D32" />;
        },
        tabBarLabel: '',
        tabBarShowLabel: false,
      })}>
      <Tab.Screen
        name="Trang chủ"
        component={HomePage}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Giỏ hàng"
        component={CartScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tin nhắn"
        component={ChatScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Tôi"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator
<<<<<<< HEAD
            screenOptions={{ headerShown: false }}
=======
            screenOptions={{headerShown: false}}
>>>>>>> 6252a062177d4684d7f5fcb9037251c83465aab6
            initialRouteName={'SignIn'}>
            <Stack.Screen
              name="ProductDetailScreen"
              component={ProductDetailScreen}
            />
            <Stack.Screen name="PaymentScreen" component={Payment} />
            <Stack.Screen name="ShopOwnerScreen" component={ShopOwnerScreen} />
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ChooseRole" component={ChooseRole} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
            <Stack.Screen name="Contact" component={Contact} />
            <Stack.Screen name="EditContact" component={EditContact} />
            <Stack.Screen
              name="EditProfileScreen"
              component={EditProfileScreen}
            />
            <Stack.Screen
              name="AddressComponent"
              component={AddressComponent}
            />
            <Stack.Screen
              name="SuccessfulPayment"
              component={SuccessfulPayment}
            />

            <Stack.Screen name="MessegesScreen" component={MessegesScreen} />
            <Stack.Screen name="AccSetup" component={AccSetup} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />

            {/* seller */}
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            <Stack.Screen name="AddProduct" component={AddProduct} />
            <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
            <Stack.Screen
              name="OrderScreenSeller"
              component={OrderScreenSeller}
            />
            <Stack.Screen name="ShopSeller" component={ShopSeller} />
            <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
            <Stack.Screen name="Help" component={Help} />
            <Stack.Screen name="AppInf" component={AppInf} />
            <Stack.Screen name="AccSeller" component={AccSeller} />
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="MessageSeller" component={MessageSeller} />
            {/* seller */}
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" />
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
