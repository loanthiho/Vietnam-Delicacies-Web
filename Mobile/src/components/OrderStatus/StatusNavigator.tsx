
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import OrderStatus from './OrderStatus';
import Wait_for_confirmation from './Wait_for_confirmation';
import Waiting_delivery from './Waiting_delivery';
import Wait_for_delivery from './Waiting_for_delivery';

const Tab = createMaterialTopTabNavigator();

const StatusNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Chờ xác nhận" component={Wait_for_confirmation} initialParams={{ selectedStatus: 'Chờ xác nhận' }} />
      <Tab.Screen name="Chờ lấy hàng" component={Wait_for_delivery} initialParams={{ selectedStatus: 'Chờ lấy hàng' }} />
      <Tab.Screen name="Chờ giao hàng" component={Waiting_delivery} initialParams={{ selectedStatus: 'Chờ giao hàng' }} />
      <Tab.Screen name="Đánh giá" component={OrderStatus} initialParams={{ selectedStatus: 'Đánh giá' }} />
    </Tab.Navigator>
  );
};

export default StatusNavigator;
