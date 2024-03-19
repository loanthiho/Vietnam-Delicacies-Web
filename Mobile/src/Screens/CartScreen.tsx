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
import LoaderKit from 'react-native-loader-kit';
import { showMessage } from 'react-native-flash-message';

const CartScreen = ({ route, navigation }: any) => {
  const { data, refetch, isLoading, isRefetching } = useShoppingCartData();
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
  const cartItems = data?.data;
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


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch()
      console.log('Cart Screen focus!');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={{
        paddingTop: 10, fontSize: 20,
        fontWeight: 'bold',
        color: '#2E7D32',
      }}>GIỎ HÀNG CỦA BẠN</Text>

      {/* {errorMessage && !selected.some(item => item) ? (
        <Text style={styles.setErrorMessage}>
          Vui lòng chọn ít nhất một sản phẩm để thanh toán
        </Text>
      ) : null} */}
      <ScrollView
        // style={{ flexDirection: 'column', backgroundColor: 'red' }}
        contentContainerStyle={[{
          flexDirection: 'column',
          alignItems: 'center',
          flex: 1, // Thêm thuộc tính này để đảm bảo nội dung căn giữa trên toàn bộ ScrollView
        }, cartItems && cartItems?.length <= 0 ? { justifyContent: 'center' } : null]}
      >
        {isLoading ?
          (
            <LoaderKit
              style={{ width: 35, height: 35 }}
              name={'BallPulse'}
              color={'green'}
            />
          )
          : null}
        {cartItems && cartItems.length > 0
          ? cartItems?.map(
            (item: any, index: number) =>
            (
              <CartItem
                key={index.toString()}
                item={item}
                changeQuantity={changeQuantity}
                selected={selected[index]}
                changeSelectedItem={(selected: boolean) => changeSelectedItem(index, selected)}
                removeItem={removeItem}
              />
            )
          )
          : null
        }
        {!isLoading && !cartItems.length ? (
          <Text style={{ textAlign: 'center', alignSelf: "center" }}> Không có sản phẩm nào!</Text>
        ) : null}
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
            disabled={data?.data.length == 0 ? true : false}
            onPress={() => {
              const selectedItems = cartItems.filter(
                (item: any, index: number) => selected[index],
              );
              if (selectedItems.length > 0) {
                navigation.navigate('PaymentScreen', {
                  selectedItems: selectedItems,
                });
              } else {
                showMessage({
                  type: 'warning',
                  message: 'Vui lòng chọn sản phẩm'
                })
              }
            }}>
            <Text style={[styles.checkoutButtonText, data?.data.length == 0 ? { opacity: 0.3 } : null]}>Thanh toán</Text>
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
    borderRadius: 5,
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
