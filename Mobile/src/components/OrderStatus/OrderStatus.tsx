import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Wait_for_confirmation from './Wait_for_confirmation';
 
const OrderStatus = ({ route, navigation }:any) => {
  const [selectedItem, setSelectedItem] = useState(route.params.selectedStatus);
  const status = ['Chờ xác nhận', 'Chờ lấy hàng', 'Chờ giao hàng', 'Đánh giá'];

  const renderItem = ({item}:any) => (
    <TouchableOpacity
      style={[
        styles.itemOption,
        { backgroundColor: selectedItem === item ? '#2E7D32' : 'white' },
      ]}
      onPress={() => {
        setSelectedItem(item);
        if (item === 'Chờ xác nhận') {
          navigation.navigate('Wait_for_confirmation'); 
        }
      }}>
      <Text style={{ color: selectedItem === item ? 'white' : 'black' }}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    navigation.setOptions({ title: 'Order Status' });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={status}
        renderItem={renderItem}
        keyExtractor={item => item}
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemOption: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderStatus;
