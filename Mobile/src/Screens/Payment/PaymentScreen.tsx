import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AddressComponent from '../../components/Payment/AddressComponent';
import OrderDetailComponent from '../../components/Payment/OrderDetails';
import PaymentItemComponent from '../../components/Payment/PaymentItem';
import PaymentMethods from '../../components/Payment/PaymentMethod';
import Ionicons from 'react-native-vector-icons/Ionicons';
import fonts from '../../ultils/_fonts';
import useCheckout from '../../Hooks/useCheckout';
import { useQueryClient } from '@tanstack/react-query';
import LoaderKit from 'react-native-loader-kit';
import useCreatePaymentIntent from '../../Hooks/useCreatePaymentIntent';
import { initPaymentSheet, presentPaymentSheet } from '@stripe/stripe-react-native';

const PaymentScreen = ({ route, navigation }: any) => {
  const { selectedItems } = route.params;
  const queryClient = useQueryClient();
  const { mutateAsync: mutatePaymentIntent, error: paymentIntentError, isPending: paymentIntentIsLoading } = useCreatePaymentIntent();

  const [showPaymentDetail, setShowPaymentDetail] = useState<boolean>(true);
  const [proPrepareCheckout, setProPrepareCheckout] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const mutation = useCheckout(navigation);
  var productCartIds: any[] = [];
  const shippingFee = 30000;

  const [order, setOrder] = useState({
    payment_method: 'stripe',
    shipping_address: '',
    total_amount: 0,
    total_quantity: 0,
    product_cart_ids: []
  });

  useEffect(() => {
    if (selectedItems.length > 0) {
      setProPrepareCheckout(selectedItems);
    }
    /**
     * Caculate total price!
     */
    const totalPrice = proPrepareCheckout?.reduce((acc: number, currentItem: any) => {
      productCartIds.push(currentItem?.id);
      return acc + currentItem.Product.price * currentItem.quantity;
    }, 0);
    /**
     * Caculate total quantity
     */
    const totalQuantity = proPrepareCheckout?.reduce(
      (acc: any, currentItem: { quantity: any }) => {
        return acc + currentItem.quantity;
      },
      0,
    );

    /**
     * Caculate total Amount!
     */
    const totalAmount = totalPrice + shippingFee;

    setOrder({
      ...order,
      shipping_address: userInfo?.detail_address,
      total_quantity: totalQuantity,
      total_amount: totalAmount,
      product_cart_ids: productCartIds
    })
  }, [userInfo]);

  console.log("\n__\n________\norder__", order)
  const togglePaymentDetail = () => {
    setShowPaymentDetail(!showPaymentDetail);
  };

  const handleCheckout = async () => {
    if (order.payment_method == 'stripe') {
      const paymentIntentData = await mutatePaymentIntent(order.total_amount);

      if (!paymentIntentData?.paymentIntent) {
        console.log('No intent received', paymentIntentData);
        return;
      }

      console.log('current data', paymentIntentData)
      const initResponse = await initPaymentSheet({
        merchantDisplayName: 'VND_APP',
        paymentIntentClientSecret: paymentIntentData.paymentIntent
      });

      if (initResponse.error) {
        console.error("Init response:", initResponse.error);
        Alert.alert('Lỗi Thanh toán bằng stripe', initResponse?.error.toString());
        return;
      }
      const paymentResponse = await presentPaymentSheet();
      if (paymentResponse.error) {
        Alert.alert(`Lỗi`,
          paymentResponse?.error?.message === "The payment flow has been canceled" ? "Giao dịch bị hủy" : paymentResponse?.error?.message);
        return;
      }
    }
    mutation.mutate(order);
  }


  // const handleCheckout = async () => {
  //   if (order.payment_method == 'stripe') {
  //     mutatePaymentIntent(order.total_amount);
  //   } else {
  //     mutation.mutate(order);
  //   }
  // }

  // useEffect(() => {
  //   if (!paymentIntentData?.paymentIntent) {
  //     return;
  //   }

  //   console.log('current data', paymentIntentData)
  //   const initResponse = await initPaymentSheet({
  //     merchantDisplayName: 'VND_APP',
  //     paymentIntentClientSecret: paymentIntentData.paymentIntent
  //   });

  //   if (initResponse.error) {
  //     console.error("Init response:", initResponse.error);
  //     Alert.alert('Lỗi Thanh toán bằng stripe', initResponse?.error.toString());
  //     return;
  //   }
  //   const paymentResponse = await presentPaymentSheet();
  //   if (paymentResponse.error) {
  //     Alert.alert(`Lỗi`,
  //       paymentResponse?.error?.message === "The payment flow has been canceled" ? "Giao dịch bị hủy" : paymentResponse?.error?.message);
  //     return;
  //   }

  //   mutation.mutate(order);
  // }, [paymentIntentData])

  useEffect(() => {
    if (paymentIntentError) {
      Alert.alert('Lỗi khi thanh toán', paymentIntentError?.message);
    }
  }, [paymentIntentError])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.Texttitle}>Thanh toán</Text>
      </View>
      <ScrollView>
        <View style={styles.addressContainer}>
          <AddressComponent navigation={navigation} userInfo={userInfo} setUserInfo={setUserInfo} />
        </View>
        <Text style={styles.title}>Chi tiết đơn hàng</Text>
        <FlatList
          data={selectedItems}
          renderItem={({ item }) => (
            <PaymentItemComponent
              item={item}
            />
          )}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.flatListContainer}
        />
        <OrderDetailComponent
          showPaymentDetail={showPaymentDetail}
          togglePaymentDetail={togglePaymentDetail}
          totalPrice={order.total_amount - shippingFee}
          shippingFee={shippingFee}
          totalAmount={order.total_amount}
          totalQuantity={order.total_quantity}
          style={styles.orderDetail}
        />
        <Text style={styles.title}>Chọn phương thức thanh toán</Text>
        <PaymentMethods order={order} setOrder={setOrder} />
      </ScrollView>
      <View style={styles.agreementContainer}>
        <Ionicons name="document-text-sharp" size={24} color="#FFA000" />
        <Text style={styles.agreementText}>
          Nhấn <Text style={styles.btnText}>Mua ngay</Text>  đồng nghĩa với việc
          bạn đồng ý {'\n'}tuân thủ Điều khoản VnD
        </Text>
      </View>
      <View style={styles.btn}>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.BtnTotal}>Tổng giá:</Text>
          <Text style={styles.numAlltotal}>
            {(order.total_amount)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
          </Text>
        </View>
        <TouchableOpacity
          style={styles.BtnShow}
          onPress={handleCheckout}
          disabled={mutation.isPending}
        >
          {
            mutation?.isPending || paymentIntentIsLoading ?
              <LoaderKit
                style={{ width: 35, height: 35, alignSelf: 'center' }}
                name={'BallPulse'} // Optional: see list of animations below
                color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
              />
              : <Text style={styles.textPayment}>Thanh Toán</Text>
          }
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowLeft: {
    fontSize: 30,
  },
  Texttitle: {
    paddingLeft: 10,
    fontSize: fonts.$18,
    color: '#FFA000',
  },
  addressContainer: {
    // marginBottom: -30,

  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E7D32',
    padding: 10,
  },
  flatListContainer: {
    marginBottom: 10,
  },
  orderDetail: {
    marginBottom: 10,
  },
  BtnTotal: {
    fontSize: 15,
    marginBottom: 5,
  },
  numAlltotal: {
    fontWeight: 'bold',
    color: '#FFA000',
    fontSize: fonts.$18,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    padding: 10
  },
  agreementText: {
    color: '#333',
  },
  totalPriceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  BtnShow: {
    // flexDirection: 'row',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 5,
    paddingHorizontal: 40,
    backgroundColor: '#2E7D32',
    borderRadius: 50,
    justifyContent: 'center',
    // alignItems: 'center',
    // color: 'white',
  },
  btn: {
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnText: {
    fontWeight: 'bold',
    color: '#2E7D32',
    fontSize: 15,
  },
  textPayment: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },
});

export default PaymentScreen;
