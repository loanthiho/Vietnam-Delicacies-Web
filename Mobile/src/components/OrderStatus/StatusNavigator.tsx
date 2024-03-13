import React from 'react';
import { StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Wait_for_confirmation from './Wait_for_confirmation';
import Waiting_delivery from './Waiting_delivery';
import Wait_for_delivery from './Waiting_for_delivery';
import Review from './Reviews';

const Tab = createMaterialTopTabNavigator();

const StatusNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: '#ffffff',
        tabBarLabelStyle: {
          fontSize: 10,
        },
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarIndicatorStyle: {
          backgroundColor: '#ffffff',
          height: '100%',
          borderRadius: 1,
        },
        tabBarStyle: {
          backgroundColor: '#2E7D32',
          borderRadius: 10,
        },
      }}>
      <Tab.Screen
        name="Chờ xác nhận"
        component={Wait_for_confirmation}
        initialParams={{ selectedStatus: 'Chờ xác nhận' }}
      />
      <Tab.Screen
        name="Chờ lấy hàng"
        component={Wait_for_delivery}
        initialParams={{ selectedStatus: 'Chờ lấy hàng' }}
      />
      <Tab.Screen
        name="Chờ giao hàng"
        component={Waiting_delivery}
        initialParams={{ selectedStatus: 'Chờ giao hàng' }}
      />
      <Tab.Screen
        name="Đánh giá"
        component={Review}
        initialParams={{ selectedStatus: 'Đánh giá' }}
      />
    </Tab.Navigator>
  );
};
const a = {
}
export default StatusNavigator;
