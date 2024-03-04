import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartItem = ({
  item,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  updateTotalPrice,
}: any) => {
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
    const priceChange = isChecked
      ? -item.Product.price * item.quantity
      : item.Product.price * item.quantity;

    updateTotalPrice(priceChange);
    console.log('so luong', item.quantity);
  };

  const defaultImagePath = require('../../assets/no_image.jpg');

  const formatPrice = (price: {toString: () => string}) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };
  return (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeItem(item.key)}>
          <Text style={styles.deleteButtonText}>Xoá</Text>
        </TouchableOpacity>
      )}>
      <View style={styles.itemContainer}>
        <View style={styles.item}>
          <Image
            source={{
              uri: item.Product?.Files[0]?.src,
            }}
            style={styles.itemImage}
          />

          <Text style={styles.itemText}>{item.Product?.name}</Text>
          <Text style={styles.itemPrice}>
            {formatPrice(item.Product?.price)}đ
          </Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decreaseQuantity(item.key)}
              style={[styles.button, {backgroundColor: '#FFA000'}]}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantity}>{item.Product?.quantity}</Text>
            <TouchableOpacity
              onPress={() => increaseQuantity(item.key)}
              style={[styles.button, {backgroundColor: '#FFA000'}]}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity onPress={toggleCheckbox}>
          {isChecked ? (
            <MaterialCommunityIcons
              name="checkbox-marked"
              style={styles.checkboxButton}
            />
          ) : (
            <MaterialCommunityIcons
              name="checkbox-blank-outline"
              style={styles.checkboxButton}
            />
          )}
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -20,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
    top: 10,
    left: 10,
  },
  itemText: {
    marginRight: 10,
    borderRadius: 10,
    color: '#FFA000',
    paddingTop: 20,
    overflow: 'hidden',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemPrice: {
    width: 80,
    height: 25,
    marginRight: 10,
    borderRadius: 5,
    color: '#FFFFFF',
    backgroundColor: '#2E7D32',
    position: 'absolute',
    top: 60,
    right: 160,
    textAlign: 'center',
    fontSize: 17,
  },
  button: {
    width: 20,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    bottom: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 100,
    borderRadius: 10,
    top: 10,
    marginHorizontal: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    width: 'auto',
    height: 20,
  },
  item: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 350,
    height: 100,
    borderColor: 'white',
    elevation: 10,
    marginLeft: 50,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 60,
    right: 20,
    paddingHorizontal: 10,
    width: 80,
    position: 'absolute',
  },
  quantity: {
    backgroundColor: 'red',
    fontSize: 10,
  },
  checkboxButton: {
    color: '#2E7D32',
    fontSize: 40,
    right: 170,
    bottom: 70,
  },
});

export default CartItem;
