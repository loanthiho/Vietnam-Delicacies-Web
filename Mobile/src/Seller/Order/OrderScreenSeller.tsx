import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StatusNavigator from '../OrderStatus/StatusNavigator';

const OrderScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{flexDirection: 'row', gap: 10, marginBottom: 10, marginTop: 10}}
        onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
        <Text style={styles.title}>Trạng thái đơn hàng</Text>
      </TouchableOpacity>
      <StatusNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  arrowLeft: {
    fontSize: 18,
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#2E7D32',
  },
});

export default OrderScreen;
