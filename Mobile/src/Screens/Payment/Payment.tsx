import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import AddressComponent from '../../components/Payment/AddressComponent';
import CartItem from '../../components/Cart/CartItem';
import OrderDetails from '../../components/Payment/OrderDetails';
import styles from '../../components/Payment/styles';
const PaymentScreen = ({ navigation }:any) => {
  const [showPaymentDetail, setShowPaymentDetail] = useState(true);
  const [cartItems, setCartItems] = useState([
    {
      key: '1',
      text: 'Xôi 7 màu',
      uri: 'https://i.pinimg.com/564x/27/23/28/272328c04f37971919c9e6f28fdd03ce.jpg',
      price: 10000,
      quantity: 1,
    },
    {
      key: '2',
      text: 'Gạo lứt',
      uri: 'https://i.pinimg.com/564x/31/5d/0c/315d0ca6e2529bdec7af0198685b7d47.jpg',
      price: 20000,
      quantity: 2,
    },
  ]);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const increaseQuantity = (itemId: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.key === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems(
      cartItems.map((item) =>
        item.key === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (acc, currentItem) => acc + currentItem.price * currentItem.quantity,
    0
  );
  const shippingFee = 30000;
  const totalAmount = totalPrice + shippingFee;

  const togglePaymentDetail = () => {
    setShowPaymentDetail(!showPaymentDetail);
  };

  return (
    <View style={styles.container}>
      <AddressComponent navigation={navigation} />
      <ScrollView>
        <Text style={styles.OrderDetails}>Chi tiết đơn hàng</Text>
      </ScrollView>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            formatPrice={formatPrice}
            decreaseQuantity={decreaseQuantity}
            increaseQuantity={increaseQuantity}
          />
        )}
        keyExtractor={(item) => item.key.toString()}
      />
      <OrderDetails
        formatPrice={formatPrice}
        cartItems={cartItems}
        shippingFee={shippingFee}
        totalAmount={totalAmount}
      />
      <View style={styles.btn}>
        <View>
          <Text style={styles.BtnTotal}>Tổng giá:</Text>
          <Text style={[styles.BtnTotal, styles.numAlltotal]}>
            {formatPrice(totalAmount)} đ
          </Text>
        </View>
        <Text style={styles.BtnShow}>Mua ngày</Text>
      </View>
    </View>
  );
};

export default PaymentScreen;
