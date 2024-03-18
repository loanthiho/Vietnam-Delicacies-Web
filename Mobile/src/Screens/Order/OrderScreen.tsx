import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StatusNavigator from '../../components/OrderStatus/StatusNavigator';

const OrderScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
       <View style={styles.row}>
       <TouchableOpacity onPress={() => navigation.navigate('Main')}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
      </TouchableOpacity>
        <Text style={styles.textNavigation}>Trạng thái đơn hàng</Text>
      </View>
      
      <StatusNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding:10,
  },
  textNavigation: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#2E7D32',
    paddingLeft:10,
  },
  arrowLeft: {
    fontSize: 24,
  },
});

export default OrderScreen;
