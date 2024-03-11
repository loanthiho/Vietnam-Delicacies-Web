import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import OrderStatus from '../../components/OrderStatus/OrderStatus';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
      </TouchableOpacity>
      <OrderStatus />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:10,
  },
  arrowLeft:{
    fontSize:25,
    
  }
});

export default OrderScreen;
