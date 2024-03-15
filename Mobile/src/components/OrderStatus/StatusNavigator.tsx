import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Wait_for_confirmation from './Wait_for_confirmation';
import Waiting_delivery from './Waiting_delivery';
import Wait_for_delivery from './Waiting_for_delivery';
import Canceled from './Canceled';
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
          textTransform: 'none', 
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
      />
      <Tab.Screen
        name="Chờ lấy hàng"
        component={Wait_for_delivery}
      />
      <Tab.Screen
        name="Chờ giao hàng"
        component={Waiting_delivery}
      />
      <Tab.Screen
        name="Đánh giá "
        component={Review}
      />
       <Tab.Screen
        name="Đã huỷ"
        component={Canceled}
      />
    </Tab.Navigator>
  );
};

export default StatusNavigator;
