import React, { useEffect, useMemo, useState } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { useShoppingCartData } from '../Hooks/addToCart';
import api from '../api/request';
import CartItem from '../components/Cart/CartItem';

const CartScreen = ({ route, navigation }: any) => {
  const { data, refetch } = useShoppingCartData();
  const [selected, setSelected] = useState<boolean[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const totalPrice = useMemo(() => {
    let i = 0;
    return data?.data?.reduce?.(
      (total: number, item: { Product: { price: number }; quantity: number }) => {
        const productPrice =
          selected.length > i && selected[i]
            ? item.Product.price * item.quantity
            : 0;
        i += 1;
        return productPrice ? total + productPrice : total;
      },
      0,
    );
  }, [data?.data, selected]);

  if (!data) {
    return <Text>Loading ... </Text>;
  }

  const cartItems = data.data;

  const changeQuantity = async (itemId: string, diff: number) => {
    const rIncrease = await api.post(`/carts/update-qty/${itemId}`, {
      params: { action: diff > 0 ? 'increase' : 'decrease' },
    });
    if (rIncrease) {
      refetch();
    }
  };

  const changeSelectedItem = async (index: number, value: boolean) => {
    let newSelected = [...selected];
    for (let i = newSelected.length; i < index + 1; i += 1) {
      newSelected.push(false);
    }
    newSelected[index] = value;
    setSelected(newSelected);
  };

  const removeItem = async (itemId: string) => {
    try {
      const conRemove = await api.delete(`carts/${itemId}`);
      if (conRemove) {
        refetch();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {errorMessage && !selected.some(item => item) ? (
<<<<<<< HEAD
  <Text style={styles.setErrorMessage}>
    Vui lòng chọn ít nhất một sản phẩm để thanh toán
  </Text>
) : null}
=======
        <Text style={styles.setErrorMessage}>
          Vui lòng chọn ít nhất một sản phẩm để thanh toán
        </Text>
      ) : null}
>>>>>>> 20f7f14a3179392418f88ed8b54278690a7599d2
      <ScrollView>
        {cartItems && cartItems.length > 0
          ? cartItems?.map((item: any, index: number) => (
            <CartItem
              key={index.toString()}
              item={item}
              changeQuantity={changeQuantity}
              selected={selected[index]}
              changeSelectedItem={(selected: boolean) =>
                changeSelectedItem(index, selected)
              }
              removeItem={removeItem}
            />
          ))
          : null}
      </ScrollView>
      <View>
        <View style={styles.footer}>
          <View style={styles.groupTotal}>
            <Text style={styles.checkoutText}>
              Tổng <Text style={styles.tamTinhText}>(tạm tính)</Text>
            </Text>
            <Text style={styles.money}>
              {totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              const selectedItems = cartItems.filter(
                (item: any, index: number) => selected[index],
              );
              if (selectedItems.length > 0) {
                navigation.navigate('PaymentScreen', {
                  selectedItems: selectedItems,
                });
              } else {
                setErrorMessage(
                  'Vui lòng chọn ít nhất một sản phẩm để thanh toán',
                );
              }
            }}>
            <Text style={styles.checkoutButtonText}>Thanh toán</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  footer: {
    padding: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  tamTinhText: {
    fontSize: 14,
  },

  groupTotal: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  checkoutText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA000',
  },
  money: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA000',
  },
  checkoutButton: {
    alignSelf: 'center',
  },
  checkoutButtonText: {
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,

  },
  setErrorMessage: {
    color: 'red',
    textAlign: 'center',
  },
});

export default CartScreen;
