import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Wait_for_confirmation from './Wait_for_confirmation';
import Waiting_delivery from './Waiting_delivery';
import Wait_for_delivery from './Waiting_for_delivery';
import Canceled from './Canceled';
import Success from './Success';

const Tab = createMaterialTopTabNavigator();

const StatusNavigator = ({ route, navigation }: any) => {
  // const status = route && route.params && route.params.status ? route.params.status : false;
  console.log("status _ \n \n \n", route);
  return (
    <Tab.Navigator
      initialRouteName={''}
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
      <Tab.Screen name="Chờ xác nhận" component={Wait_for_confirmation} />
      <Tab.Screen name="Đã xác nhận" component={Wait_for_delivery} />
      <Tab.Screen name="Hàng đang giao" component={Waiting_delivery} />
      <Tab.Screen name="Thành công" component={Success} />
      <Tab.Screen name="Đã hủy" component={Canceled} />
    </Tab.Navigator>
  );
};

export default StatusNavigator;
