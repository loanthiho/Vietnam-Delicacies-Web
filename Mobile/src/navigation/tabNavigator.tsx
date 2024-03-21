import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomePage from '../Screens/HomeScreens';
import ChatScreen from '../Screens/ChatScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import CartScreen from '../Screens/CartScreen';

export default function BottomTab() {
    const Tab = createBottomTabNavigator();
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
            })}
        >
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
    )
}