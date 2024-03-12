import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import OrderStatus from '../../components/OrderStatus/OrderStatus';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StatusNavigator from '../../components/OrderStatus/StatusNavigator';

const OrderScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
      </TouchableOpacity>
      <StatusNavigator />
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
