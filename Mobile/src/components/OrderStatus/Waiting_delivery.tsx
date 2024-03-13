
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

const Waiting_confirmation = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Nem chua Thanh Hoá',
      price: 150000,
      Files: [{ src: 'https://i.pinimg.com/564x/6a/9a/12/6a9a122a60a435725152db7a6632da58.jpg' }],
    },
    {
      id: 2,
      name: 'Gạo đen Tây Bắc',
      price: 300000,
      Files: [{ src: 'https://i.pinimg.com/736x/8d/98/1e/8d981eadabf77f64baad46aac7279241.jpg' }],
    },
    {
      id: 2,
      name: 'Gạo đen Tây Bắc',
      price: 300000,
      Files: [{ src: 'https://i.pinimg.com/736x/8d/98/1e/8d981eadabf77f64baad46aac7279241.jpg' }],
    },
  ]);

  const renderItem = ({ item }:any) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{ uri: item.Files?.[0]?.src }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>

      </View>
      <View style={styles.status}>
        <Text style={styles.update}>Đang giao</Text>
        <Text style={styles.statusText}>Đã nhận</Text>
        
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
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 13,
    marginTop: 15,
  },
  itemImage: {
    width:70,
    height: 70,
    borderRadius: 10,
    marginRight:10,
  },
  status: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  statusText:{
    fontSize: 13,
    backgroundColor: '#2E7D32',
    color:'white',
    margin:7,
    width:50,
    height:20,
    borderRadius:5,
    textAlign:'center',
  },
  update: {
    fontSize: 13,
    color: '#2E7D32',
    margin:7,
  },
});

export default Waiting_confirmation;

