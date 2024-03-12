import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';

const Wait_for_delivery = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Áo thun trắng',
      price: 150000,
      Files: [{ src: 'https://via.placeholder.com/150' }],
    },
    {
      id: 2,
      name: 'Quần jean đen',
      price: 300000,
      Files: [{ src: 'https://via.placeholder.com/150' }],
    },
  ]);

  const renderItem = ({ item }:any) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{ uri: item.Files?.[0]?.src }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price} đ</Text>
      </View>
      <View style={styles.status}>
        <Text style={styles.update}>Đang chờ</Text>
        <Text style={styles.delete}>Mua lại</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={cartItems} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  itemText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginLeft: 10,
  },
  status: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  update: {
    fontSize: 16,
    color: '#2E7D32',
    marginBottom: 10,
  },
  delete: {
    fontSize: 16,
    color: 'red',
  },
});

export default Wait_for_delivery;
