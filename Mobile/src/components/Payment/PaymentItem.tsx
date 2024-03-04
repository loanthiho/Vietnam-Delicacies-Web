import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';

const PaymenItem = ({ item, formatPrice, decreaseQuantity, increaseQuantity}:any) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.uri }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text style={styles.itemPrice}>{formatPrice(item.price)} đ</Text>
      </View>
      <View style={styles.quantityContainer}>
        <TouchableOpacity
          onPress={() => decreaseQuantity(item.key)}
          style={[styles.button, { backgroundColor: '#FFA000' }]}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity
          onPress={() => increaseQuantity(item.key)}
          style={[styles.button, { backgroundColor: '#FFA000' }]}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymenItem ;
