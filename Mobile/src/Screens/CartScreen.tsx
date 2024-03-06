import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { useShoppingCartData } from '../Hooks/addToCart';
import { getUserAccessToken } from '../api/storage';

import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

import CartItem from '../components/Cart/CartItem';

import axios from 'axios';
import CheckAuth from '../services/checkAuth';
// import { getUserAccessToken } from '../api/storage';
import api from '../api/request';

const CartScreen = ({ route, navigation }: any) => {

  const { data, refetch } = useShoppingCartData();
  const [selected, setSelected] = useState<boolean[]>([])
  console.log('hello', data?.length);
  const [reload, setReload] = useState<number>(() => Math.random());
  const totalPrice = useMemo(
    () => {
      let i = 0;
      return data?.data?.reduce?.((total, item) => {
        const productPrice = selected.length > i && selected[i] ? item.Product.price * item.quantity : 0;
        // console.log('bbb', total, i, productPrice, selected.length > i, selected[i], item.price, item);
        i += 1;
        return productPrice ? total + productPrice : total;
      }, 0);
    },
    [data?.data, selected]
  );

  if (!data) {
    return <Text> Loading data ---</Text>;
  }

  const cartItems = data.data;



  const changeQuantity = async (itemId: string, diff: number) => {
    // setCartItems(prevCartItems =>
    //   prevCartItems.map(item => {
    //     if (item.id !== itemId) {
    //       return item;
    //     }
    //     const newQuantity = Math.min(Math.max(item.quantity + diff, 1), 50);
    //     return { ...item, quantity: newQuantity };
    //   }),
    // );
    // const { token } = await getUserAccessToken();
    const rIncrease = await api.post(`/carts/update-qty/${itemId}`, { params: { action: diff > 0 ? 'increase' : 'decrease' } });
    // const rIncrease = await axios.post(
    //   `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts/update-qty/${itemId}`,
    //   null,
    //   {
    //     params: { action: diff > 0 ? 'increase' : 'decrease' },
    //     headers: { Authorization: `Bearer ${token}` },
    //   },
    // );
    if (rIncrease) {
      console.log('decrease successfully:', rIncrease.data);
    }
    refetch();
  };

  const changeSelectedItem = async (index: number, value: boolean) => {
    let newSelected = [...selected];
    for (let i = newSelected.length; i < index + 1; i += 1) {
      newSelected.push(false);
    }
    newSelected[index] = value;
    setSelected(newSelected);
    // setCartItems(prevCartItems =>
    //   prevCartItems.map(item => {
    //     if (item.id !== itemId) {
    //       return item;
    //     }
    //     return { ...item, selected };
    //   }),
    // );
  };

  const removeItem = async (itemId: string) => {
    // setCartItems(prevCartItems =>
    //   prevCartItems.filter(item => item.id !== itemId),
    // );
    try {
      const conRemove = await api.delete(`carts/${itemId}`)
      if (conRemove) {
        console.log('Remove successfully:', conRemove.data);
        refetch();
      }
    } catch (error) {
      console.error('Lỗi khi remove product cart:', error?.response.data);
    }
    refetch();
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
              selected={selected[index]}
              changeSelectedItem={(selected: boolean) => changeSelectedItem(index, selected)}
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
              {totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
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
