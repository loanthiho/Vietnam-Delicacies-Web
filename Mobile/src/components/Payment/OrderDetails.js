import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';
import styles from './styles';

const OrderDetails = ({ formatPrice, cartItems, shippingFee, totalAmount, togglePaymentDetail, showPaymentDetail}:any) => {
  return (
    <View style={styles.infOrder}>
      <Text style={styles.detailOrder}>Chi tiết đơn hàng</Text>
      <TouchableOpacity onPress={togglePaymentDetail} style={styles.toggleButton}>
        <MaterialIcons
          name={showPaymentDetail ? 'arrow-drop-down' : 'arrow-drop-up'}
          size={24}
          color="#FFA000"
        />
      </TouchableOpacity>
      <View style={styles.groupPrice}>
        <Text>Giá:</Text>
        <Text>{formatPrice(totalPrice)} đ</Text>
      </View>
      <View style={styles.groupPrice}>
        <Text>Số lượng:</Text>
        <Text>{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</Text>
      </View>
      <View style={styles.groupPrice}>
        <Text>Phí vận chuyển:</Text>
        <Text>{formatPrice(shippingFee)} đ</Text>
      </View>
      <View style={styles.groupPrice}>
        <Text style={styles.totalPrice}>Tổng:</Text>
        <Text style={styles.totalPrice}>{formatPrice(totalAmount)} đ</Text>
      </View>
    </View>
  );
};

export default OrderDetails;
