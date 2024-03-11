import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const PaymentItemComponent = ({ item }: any) => {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.Product.Files[0].src }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.Product.name}</Text>
        <Text style={styles.itemPrice}>{item.Product.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
      </View>

      <View style={styles.quantityContainer}>
        <Text>x{item.quantity}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 10,
    padding: 10,
    flex: 1,
    maxHeight: 85,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 10,
  },
  content: {
    flex: 1,
    marginRight: 5,
  },
  itemText: {
    fontSize: 18,
    color: '#FFA000',
    margin: 5,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 18,
    margin: 10,
    color: '#000000'
  },
  button: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
});

export default PaymentItemComponent;
