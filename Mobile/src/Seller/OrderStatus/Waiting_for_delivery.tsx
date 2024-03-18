import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';

const Wait_for_delivery = () => {
  const navigation = useNavigation<any>();

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
  ]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Thực hiện refresh lại các giá trị ở đây
      console.log('wait for delivery Screen is focused!');
    });

    return unsubscribe;
  }, [navigation]);


  const renderItem = ({ item }: any) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{ uri: item.Files?.[0]?.src }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
      </View>
      <Text style={styles.update}>Xác nhận giao hàng</Text>
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
    backgroundColor: "#ffa000",
    padding: 2,
    fontSize: 13,
    color: "#fff",
    marginTop: 15,
    marginRight: 10,
    maxWidth: 95,
    textAlign: 'center',
    borderRadius: 5,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },

  update: {
    fontSize: 13,
    color: '#2E7D32',
    maxWidth: 70,
    textAlign: 'center',
  },
});

export default Wait_for_delivery;
