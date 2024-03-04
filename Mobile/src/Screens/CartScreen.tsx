import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';

import {GestureHandlerRootView, Swipeable} from 'react-native-gesture-handler';

import CartItem from '../components/Cart/CartItem';

import axios from 'axios';
import {token} from '../api/request';

const CartScreen = ({route, navigation}: any) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const fetchDataShoppingcart = async () => {
    const res = await axios.get(
      `https://972f-2401-d800-25d1-71ab-dd89-e81e-b165-cabd.ngrok-free.app/carts`,
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

  const updateTotalPrice = (priceChange: number) => {
    setTotalPrice(prevTotalPrice => prevTotalPrice + priceChange);
  };

  useEffect(() => {
    let sum = 0;
    // cartItems.forEach(item => {
    //   if (item.isChecked) {
    //     sum += item.price * item.quantity;
    //   }
    // });
    setTotalPrice(sum);
  }, [cartItems]);

  const increaseQuantity = async (itemId: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === itemId && item.quantity < 50
          ? {...item, quantity: item.quantity + 1}
          : item,
      ),
    );
    console.log('Increasing ...');
    // try {
    //   const rIncrease = await axios.post(
    //     `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts/update-qty/${itemId}`,
    //     null,
    //     {
    //       params: {action: 'increase'},
    //       headers: {Authorization: `Bearer ${token}`},
    //     },
    //   );
    //   if (rIncrease) {
    //     console.log('Increase successfully:', rIncrease);
    //   }
    // } catch (error) {
    //   console.error('Lỗi khi increase product cart:', error);
    // }
  };

  const decreaseQuantity = async (itemId: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === itemId && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
    console.log('Decreasing ...');
    // try {
    //   const rIncrease = await axios.post(
    //     `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts/update-qty/${itemId}`,
    //     null,
    //     {
    //       params: {action: 'decrease'},
    //       headers: {Authorization: `Bearer ${token}`},
    //     },
    //   );
    //   if (rIncrease) {
    //     console.log('decrease successfully:', rIncrease.data);
    //   }
    // } catch (error) {
    //   console.error('Lỗi khi increase product cart:', error);
    // }
  };

  const removeItem = (itemId: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.key !== itemId),
    );
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        {cartItems && cartItems.length > 0
          ? cartItems?.map((item, index) => (
              <CartItem
                key={index.toString()}
                item={item}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeItem={removeItem}
                updateTotalPrice={updateTotalPrice}
              />
            ))
          : null}
      </ScrollView>
      <View>
        <View style={styles.footer}>
          <View style={styles.groupTotal}>
            <Text style={styles.checkoutText}>
              Tổng <Text style={styles.tamTinhText}>(tạm tính):</Text>
            </Text>
            <Text style={styles.money}>{totalPrice}đ</Text>
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
    paddingVertical: 10,
  },
  tamTinhText: {
    fontSize: 14,
  },

  groupTotal: {
    flexDirection: 'row',
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
    backgroundColor: '#2E7D32',
    borderRadius: 10,
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
});

export default CartScreen;
