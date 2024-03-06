import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';


import CartItem from '../components/Cart/CartItem';

import axios from 'axios';

const CartScreen = ({route, navigation}: any) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const fetchDataShoppingcart = async () => {
    const res = await axios.get(
      `c`,
      {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzMGE3ZmVkLTY2YzMtNGExYS1iNDdkLTU3MWM3YWFlYTQ0MyIsImVtYWlsIjoidGhpY3VzdG9tZXIuYTI0dGVjaG5vbG9neUBnbWFpLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJEZkbGVtY3MwV0E3WEx3YWRzTjBGMXVYbkFKV21zdEVQWjhSM3pLeHh2UWUvMFlGYVBRa1dLIiwibmFtZSI6InRoaSBjdXN0b21lciIsImlhdCI6MTcwOTIyMzQzNn0.QuQ2zXw7HFSQs2D_XFPl_m7eSUT4lVVpuM_E6Ey0UTg`,
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
    cartItems.forEach(item => {
      if (item.isChecked) {
        sum += item.price * item.quantity;
      }
    });
    setTotalPrice(sum);
  }, [cartItems]);

  const increaseQuantity = (itemId: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.key === itemId ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.key === itemId && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };

  const removeItem = (itemId: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.key !== itemId),
    );
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.checkoutText}>
            Tổng <Text style={styles.tamTinhText}>(tạm tính):</Text>
          </Text>
          <Text style={styles.money}>{totalPrice}đ</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() =>
              navigation.navigate('Payment', {
                selectedItem: cartItems
              })
            }>
            <Text style={styles.checkoutButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    width: 'auto',
    height: 130,
    borderRadius: 10,
  },
  tamTinhText: {
    fontSize: 18,
  },
  checkoutText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFA000',
  },
  money: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFA000',
    left: 300,
    position: 'absolute',
    top: 10,
    marginRight: 30,
  },
  checkoutButton: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    width: 330,
    height: 70,
    top: 55,
    textAlign: 'center',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center', 
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});

export default CartScreen;
