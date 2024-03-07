import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const OrderDetailComponent = ({
  showPaymentDetail,
  togglePaymentDetail,
  totalPrice,
  shippingFee,
  totalAmount,
  totalQuantity,
}: any) => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        {showPaymentDetail && (
          <View style={styles.detailContainer}>
            <View style={styles.detailItem}>
              <Text>Giá:</Text>
              <Text>{totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
            </View>
            <View style={styles.detailItem}>
              <Text>Số lượng:</Text>
              <Text>{totalQuantity}</Text>
            </View>
            <View style={styles.detailItem}>
              <Text>Phí vận chuyển:</Text>
              <Text>{shippingFee?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
            </View>
            <View style={styles.detailItem}>
              <Text style={styles.totalText}>Tổng:</Text>
              <Text style={styles.totalAmount}>{totalAmount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 5,
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
