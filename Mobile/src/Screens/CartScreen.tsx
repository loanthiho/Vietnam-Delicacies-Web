import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

import CartItem from '../components/Cart/CartItem';

import axios from 'axios';
import CheckAuth from '../services/checkAuth';
import { getUserAccessToken } from '../api/storage';

const CartScreen = ({ route, navigation }: any) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [token, setToken] = useState<any>('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRkZTIwNzlhLThiNzUtNGQ2Yy1hOTMzLWJkY2Y2ZGQ5MzQyNCIsImVtYWlsIjoibG9hbkBnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRJcHovRUdqTjR1RERMYXprbC5ia28uMkNVUDNlRW5QRnhVRi8yWkkxbi9sUlFOUFZQZTROaSIsIm5hbWUiOiJ0aGkgYSIsImlhdCI6MTcwOTY1MzcwNX0.2tOS8RduIZ6NC69rcvkQJjC_6CkKPFiCOr0Tbr9AUVQ');
  CheckAuth({ navigation });

  const totalPrice = useMemo(
    () =>
      cartItems.reduce?.((total, item) => {
        return item.selected
          ? total + item.Product.price * item.quantity
          : total;
      }, 0),
    [cartItems],
  );

  const fetchDataShoppingcart = async () => {
    const res = await axios.get(
      `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return res.data;
  };
  useEffect(() => {
    fetchDataShoppingcart().then(res => setCartItems(res.data));
  }, []);

  const changeQuantity = async (itemId: string, diff: number) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item => {
        if (item.id !== itemId) {
          return item;
        }
        const newQuantity = Math.min(Math.max(item.quantity + diff, 1), 50);
        return { ...item, quantity: newQuantity };
      }),
    );

    const rIncrease = await axios.post(
      `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts/update-qty/${itemId}`,
      null,
      {
        params: { action: diff > 0 ? 'increase' : 'decrease' },
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (rIncrease) {
      console.log('decrease successfully:', rIncrease.data);
    }
  };

  const changeSelectedItem = async (itemId: string, selected: boolean) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item => {
        if (item.id !== itemId) {
          return item;
        }
        return { ...item, selected };
      }),
    );
  };

  const removeItem = async (itemId: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.id !== itemId),
    );

    try {
      const conRemove = await axios.delete(
        `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (conRemove) {
        console.log('Remove successfully:', conRemove);
      }
    } catch (error) {
      console.error('Lỗi khi remove product cart:', error);
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        {cartItems && cartItems.length > 0
          ? cartItems?.map((item, index) => (
            <CartItem
              key={index.toString()}
              item={item}
              changeQuantity={changeQuantity}
              changeSelectedItem={changeSelectedItem}
              removeItem={removeItem}
            />
          ))
          : null}
      </ScrollView>
      <View>
        <View style={styles.footer}>
          <View style={styles.groupTotal}>
            <Text style={styles.checkoutText}>
              Tổng <Text style={styles.tamTinhText}>(tạm tính)</Text>
            </Text>
            <Text style={styles.money}>
              {totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              navigation.navigate('Payment', {
                selectedItem: cartItems,
              })
            }>
            <Text style={styles.checkoutButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  footer: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tamTinhText: {
    fontSize: 14,
  },

  groupTotal: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkoutText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA000',
  },
  money: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA000',
  },
  checkoutButton: {
    alignSelf: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default CartScreen;
