import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';

const CartScreen = ({ route, navigation }: { route: any; navigation: any }) => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (route.params && route.params.selectedItem) {
      const selectedItem = route.params.selectedItem;
      selectedItem.key = Math.random().toString();
      selectedItem.quantity = 1;
      setCartItems(prevCartItems => [...prevCartItems, selectedItem]);
    }
  }, [route.params]);

  useEffect(() => {
    let sum = 0;
    cartItems.forEach(item => {
      sum += item.price * item.quantity;
    });
    setTotalPrice(sum);
  }, [cartItems]);

  const increaseQuantity = (itemId: number) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.key === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (itemId: number) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.key === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };

  const removeItem = (itemId: number) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.key !== itemId),
    );
  };

  const renderItem = ({ item }: any) => (
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
          <Image source={{ uri: item.Files[0]?.src }} style={styles.itemImage} />
          <Text style={styles.itemText}>{item.name}</Text>
          <Text style={styles.itemPrice}>{item.price} đ</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decreaseQuantity(item.key)}
              style={[styles.button, { backgroundColor: '#FFA000' }]}>
              <Text style={styles.buttonText}> -</Text>
            </TouchableOpacity>
            <Text>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => increaseQuantity(item.key)}
              style={[styles.button, { backgroundColor: '#FFA000' }]}>
              <Text style={styles.buttonText}> +</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView style={styles.listItem}>
        <TouchableOpacity style={styles.shopContent}>
          <Ionicons name="checkbox-blank-outline" style={styles.chevronIcon} />
          <Text style={styles.shopText}> </Text>
        </TouchableOpacity>
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item?.key?.toString()}
        />
      </ScrollView>
      <View style={styles.calculateContainer}>
        <View style={styles.totalContainer}>
          <Text style={styles.checkoutText}>Tổng: </Text>
          <Text style={styles.money}>{totalPrice} đ</Text>
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
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    paddingTop: 40,
  },
  itemContainer: {
    paddingTop: 20,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
    top: 5,
  },
  itemText: {
    marginRight: 10,
    borderRadius: 10,
    color: '#FFA000',
    paddingTop: 20,
    overflow: 'hidden',
  },
  itemPrice: {
    width: 60,
    height: 20,
    marginRight: 10,
    borderRadius: 5,
    color: '#FFFFFF',
    backgroundColor: '#FFA000',
    position: 'relative',
    top: 50,
    right: 90,
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
  checkoutButton: {
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 10,
    width: 300,
    height: 50,
    left: 25,
  },
  calculateContainer: {
    borderRadius: 20,
    width: 350,
    height: 120,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  money: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFA000',
    marginLeft: 60,
  },
  checkoutText: {
    color: '#FFA000',
    fontSize: 20,
  },
  checkoutButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    top: 20,
  },
  shopContent: {
    width: 300,
    height: 50,
  },
  shopText: {
    fontSize: 25,
    color: '#2E7D32',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    bottom: 50,
  },
  chevronIcon: {
    color: '#2E7D32',
    fontSize: 30,
    left: 150,
  },
  checkboxIcon: {
    color: '#2E7D32',
    fontSize: 35,
    right: 2,
    top: 70,
  },
  checkboxIconText: {
    color: '#2E7D32',
    fontSize: 35,
    right: 40,
    top: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 90,
    borderRadius: 10,
    gap: 10,
    top: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 350,
    height: 90,
    borderColor: 'white',
    elevation: 10,
  },
});

export default CartScreen;
