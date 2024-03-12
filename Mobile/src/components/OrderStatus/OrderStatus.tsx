import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';

const OrderStatus = ({route, navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState('');
  const status = ['Chờ xác nhận', 'Chờ lấy hàng', 'Chờ giao hàng', 'Đánh giá'];

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={[
        styles.itemOption,
        {backgroundColor: selectedItem === item ? '#2E7D32' : 'white'},
      ]}
      onPress={() => setSelectedItem(item)}>
      <Text style={{color: selectedItem === item ? 'white' : 'black'}}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    if (route && route.params && route.params.selectedStatus) {
      setSelectedItem(route.params.selectedStatus);
    }
    if (navigation) {
      navigation.setOptions({title: 'Order Status'});
    }
  }, [route, navigation]);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={status}
          renderItem={renderItem}
          keyExtractor={item => item}
          horizontal
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemOption: {
    marginTop: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 15,
  },
});

export default OrderStatus;
