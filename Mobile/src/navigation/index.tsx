import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Customer import stack screen_____________________________________________
import Payment from '../Screens/Payment/PaymentScreen';
import ShopOwnerScreen from '../Screens/Shop/ShopOwner';
import EditContact from '../components/Payment/EditContact';
import Contact from '../components/Payment/AddContact';
import AddressComponent from '../components/Payment/AddressComponent';
import SignUp from '../Screens/userAuth/signUp';
import ChooseRole from '../Screens/userAuth/signUp/ChooseRule';
import ForgotPasswordScreen from '../Hooks/forgotPassword';
import NewPasswordScreen from "../Hooks/NewPasswordScreen";
import SignIn from '../Screens/userAuth/logIn';
import SuccessfulPayment from '../components/Payment/SuccessfulPayment';
import AccSetup from '../AccConversion/AccSetup';
import EditProfileScreen from '../components/Profile/EditProfile';
import OrderScreen from '../Screens/Order/OrderScreen';
import MessegesScreen from '../Screens/MessengesScreen';
import ProductDetailScreen from '../Screens/Product/ProductDetail';
import BottomTab from "./tabNavigator";
// End customer import stack screen_____________________________________________




// Eeller import stack screen_______________________________________________
import ProductScreen from '../Seller/ProductScreen';
import UpdateProduct from '../Seller/UpdateProduct';
import OrderScreenSeller from '../Seller/Order/OrderScreenSeller';
import ReviewScreen from '../Screens/ReviewScreen';
import AccSeller from '../AccConversion/AccSeller';
import AddProduct from '../Seller/AddProduct';
import ShopSeller from '../Seller/ShopSeller';
import Help from '../Support/Help';
import AppInf from '../Support/AppInf';
import Notification from '../Seller/Notifications/Notification';
import MessageSeller from '../Seller/Notifications/MessageSeller';
import ChatBox from "../Screens/Chat/ChatBox";

// End seller import stack screen_______________________________________________


const Navigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName={'SignIn'}
            >
                {/* | Customer screen ________________________________________________________________ */}
                <Stack.Screen name="Main" component={BottomTab} />
                <Stack.Screen name="SignIn" component={SignIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ChooseRole" component={ChooseRole} />
                <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
                <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
                <Stack.Screen name="PaymentScreen" component={Payment} />
                <Stack.Screen name="ShopOwnerScreen" component={ShopOwnerScreen} />
                <Stack.Screen name="Contact" component={Contact} />
                <Stack.Screen name="EditContact" component={EditContact} />
                <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
                <Stack.Screen name="AddressComponent" component={AddressComponent} />
                <Stack.Screen name="SuccessfulPayment" component={SuccessfulPayment} />
                <Stack.Screen name="MessegesScreen" component={MessegesScreen} />
                <Stack.Screen name="AccSetup" component={AccSetup} />
                <Stack.Screen name="OrderScreen" component={OrderScreen} />
                {/* | End customer screen _______________________________________________________________ */}



                {/* | Seller screen _____________________________________________________________________ */}
                <Stack.Screen name="ProductScreen" component={ProductScreen} />
                <Stack.Screen name="AddProduct" component={AddProduct} />
                <Stack.Screen name="UpdateProduct" component={UpdateProduct} />
                <Stack.Screen name="OrderScreenSeller" component={OrderScreenSeller} />
                <Stack.Screen name="ShopSeller" component={ShopSeller} />
                <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
                <Stack.Screen name="Help" component={Help} />
                <Stack.Screen name="AppInf" component={AppInf} />
                <Stack.Screen name="AccSeller" component={AccSeller} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="MessageSeller" component={MessageSeller} />
                <Stack.Screen name="ChatBox" component={ChatBox} />
                {/* | End Seller screen _________________________________________________________________ */}

            </Stack.Navigator>
        </NavigationContainer>
    );

}

export default Navigation;