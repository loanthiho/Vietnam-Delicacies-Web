import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CartItem = ({
  item,
  changeQuantity,
  selected,
  changeSelectedItem,
  removeItem,
}: any) => {


  const toggleCheckbox = () => changeSelectedItem(!selected);
  const defaultImagePath = require('../../assets/no_image.jpg');
  const formatPrice = (price: { toString: () => string }) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeItem(item.id)}>
          <Text style={styles.deleteButtonText}>Xoá</Text>
        </TouchableOpacity>
      )}
    >
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={toggleCheckbox}>
          {selected ? (
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

        <View style={styles.item}>
          <Image
            source={{
              uri: item.Product?.Files[0]?.src,
            }}
            style={styles.itemImage}
          />
          <View style={styles.groupCartQuantity}>
            <View style={styles.groupCart}>
              <Text style={styles.itemText}>{item.Product?.name}</Text>
              <Text style={styles.itemPrice}>{formatPrice(item.Product?.price)}đ</Text>
            </View>

            <View style={{
              flex: 2,
              flexDirection: 'column',
              backgroundColor: 'white',
              height: '100%',
              justifyContent: 'flex-end',
              alignItems: 'flex-end'
            }}>
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  onPress={async () => await changeQuantity(item.id, -1)}
                  style={[styles.button, { backgroundColor: '#FFA000' }]}>
                  <Text style={styles.buttonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item?.quantity}</Text>
                <TouchableOpacity
                  onPress={async () => await changeQuantity(item.id, 1)}
                  style={[styles.button, { backgroundColor: '#FFA000' }]}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
    top: 10,
    left: 10,
  },

  groupCart: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },

  groupCartQuantity: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },

  itemText: {
    maxWidth: 150,
    borderRadius: 10,
    color: '#FFA000',
    overflow: 'hidden',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    borderRadius: 5,
    color: '#FFFFFF',
    backgroundColor: '#2E7D32',
    alignSelf: 'flex-start',
    padding: 5,
    fontSize: 14,
  },
  button: {
    width: 26,
    borderRadius: 5,
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonText: {
    backgroundColor: '#ffa000',
    fontSize: 18,
    alignSelf: 'center',
    color: 'white',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    height: 100,
    padding: 20,
    marginTop: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    width: 'auto',
    height: 20,
  },
  item: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%',
    height: 100,
  },
  quantityContainer: {
    flexDirection: 'row',
    columnGap: 10
  },
  quantity: {
    fontSize: 12,
    alignSelf: 'center',
    color: '#000',
  },
  checkboxButton: {
    color: '#2E7D32',
    fontSize: 22,
  },
});

export default CartItem;
