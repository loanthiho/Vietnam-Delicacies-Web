import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const PaymentMethods = ({ order, setOrder }) => {
  const ChangeMethod = (value) => setOrder({
    ...order,
    payment_method: value
  })
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.paymentMethodButton, order.payment_method === 'CashOnDelivery' && styles.selectedPaymentMethod]}
        onPress={() => ChangeMethod('CashOnDelivery')}>
        <View style={styles.paymentMethodContent}>
          <FontAwesome5 name="money-bill" size={30} color="#2E7D32" />
          <Text style={[styles.paymentMethodText, order.payment_method === 'CashOnDelivery' && styles.selectedPaymentText]}>Thanh toán khi nhận hàng</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.paymentMethodButton, order.payment_method === 'stripe' && styles.selectedPaymentMethod]}
        onPress={() => ChangeMethod('stripe')}>
        <View style={styles.paymentMethodContent}>
          <Image
            source={require('../../assets/stripe.jpg')}
            style={styles.stripe}
          />
          <Text style={[styles.paymentMethodText, order.payment_method === 'stripe' && styles.selectedPaymentText]}>Thanh toán online</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    rowGap: 10,
    paddingLeft:6,
    paddingRight:6
  },
  paymentMethodButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
  },
  selectedPaymentMethod: {
    backgroundColor: '#FFA000',
  },
  selectedPaymentText: {
    color: 'white',
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  paymentMethodText: {
    fontWeight: 'bold',
    color: '#333333',
    marginLeft: 10,
  },
  stripe: {
    width: 45, height: 45, borderRadius: 5
  },
});

export default PaymentMethods;
