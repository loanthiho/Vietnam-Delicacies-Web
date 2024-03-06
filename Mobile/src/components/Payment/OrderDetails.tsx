import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const OrderDetailComponent = ({
  showPaymentDetail,
  togglePaymentDetail,
  totalPrice,
  shippingFee,
  totalAmount,
  totalQuantity,
  formatPrice
}: any) => {
  return (
    <View style={styles.container}>
      {showPaymentDetail && (
        <View style={styles.detailContainer}>
          <View style={styles.detailItem}>
            <Text>Giá:</Text>
            <Text>{formatPrice(totalPrice)}đ</Text>
          </View>
          <View style={styles.detailItem}>
            <Text>Số lượng:</Text>
            <Text>{totalQuantity}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text>Phí vận chuyển:</Text>
            <Text>{formatPrice(shippingFee)}đ</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.totalText}>Tổng:</Text>
            <Text style={styles.totalAmount}>{formatPrice(totalAmount)}đ</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  detailText: {
    fontSize: 18,
    color: '#FFA000',
  },
  detailContainer: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    borderRadius: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  totalText: {
    fontWeight: 'bold',
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#FFA000',
  },
});

export default OrderDetailComponent;
