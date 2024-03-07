import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, ScrollView,TouchableOpacity} from 'react-native';
import AddressComponent from '../../components/Payment/AddressComponent';
import OrderDetailComponent from '../../components/Payment/OrderDetails';
import PaymentItemComponent from '../../components/Payment/PaymentItem';
import PaymentMethods from '../../components/Payment/PaymentMethod';
import Ionicons from 'react-native-vector-icons/Ionicons';
const PaymentScreen = ({navigation}: any) => {
  const [showPaymentDetail, setShowPaymentDetail] = useState(true);

  const [cartItems, setCartItems] = useState([
    {
      key: '1',
      text: 'Xôi 7 màu',
      uri: 'https://i.pinimg.com/564x/27/23/28/272328c04f37971919c9e6f28fdd03ce.jpg',
      price: 10000,
      quantity: 1,
    },
    {
      key: '2',
      text: 'Gạo lứt',
      uri: 'https://i.pinimg.com/564x/31/5d/0c/315d0ca6e2529bdec7af0198685b7d47.jpg',
      price: 20000,
      quantity: 2,
    },
  ]);

  const decreaseQuantity = ({itemId}: any) => {
    setCartItems(
      cartItems.map(item =>
        item.key === itemId && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };

  const increaseQuantity = ({itemId}: any) => {
    setCartItems(
      cartItems.map(item =>
        item.key === itemId ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const totalPrice = cartItems.reduce((acc, currentItem) => {
    return acc + currentItem.price * currentItem.quantity;
  }, 0);

  const totalQuantity = cartItems.reduce((acc, currentItem) => {
    return acc + currentItem.quantity;
  }, 0);

  const shippingFee = 30000;
  const totalAmount = totalPrice + shippingFee;

  const togglePaymentDetail = () => {
    setShowPaymentDetail(!showPaymentDetail);
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <View style={styles.container}>
        <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
        </TouchableOpacity>
        <Text style={styles.Texttitle}>Thanh toán</Text>
      </View>
      <ScrollView>
        <AddressComponent navigation={navigation} />
        <Text style={styles.title}>Chi tiết đơn hàng</Text>
        <FlatList
          data={cartItems}
          renderItem={({item}) => (
            <PaymentItemComponent
              item={item}
              decreaseQuantity={decreaseQuantity}
              increaseQuantity={increaseQuantity}
            />
          )}
          keyExtractor={item => item.key.toString()}
        />
        <OrderDetailComponent
          showPaymentDetail={showPaymentDetail}
          togglePaymentDetail={togglePaymentDetail}
          totalPrice={totalPrice}
          shippingFee={shippingFee}
          totalAmount={totalAmount}
          totalQuantity={totalQuantity}
          formatPrice={formatPrice}
        />
        <Text style={styles.title}>Chọn phương thức thanh toán</Text>
        <PaymentMethods />
      </ScrollView>
      <View style={styles.agreementContainer}>
        <Ionicons name="document-text-sharp" size={24} color="#FFA000" />
        <Text style={styles.agreementText}>
          Nhấn <Text style={styles.btnText}>Mua ngày</Text> đồng nghĩa với việc
          bạn đồng ý tuân thủ Điều khoản VnD
        </Text>
      </View>
      <View style={styles.btn}>
        <View style={styles.totalPriceContainer}>
          <Text style={styles.BtnTotal}>Tổng giá:</Text>
          <Text style={styles.numAlltotal}>{formatPrice(totalAmount)}đ</Text>
        </View>
        <Text style={styles.BtnShow}>Mua ngay</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop:10,
  },
  arrowLeft: {
    fontSize: 30,
  },
  Texttitle: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA000',
  },
  title: {
    paddingLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFA000',
  },
    BtnShow: {
      paddingTop: 15,
      paddingBottom: 10,
      paddingLeft: 30,
      paddingRight: 30,
      fontSize: 20,
      color: 'white',
      backgroundColor: '#2E7D32',
      borderRadius: 10,
    },
  btn: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnText: {
    fontWeight: 'bold',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    color: '#2E7D32',
  },
  BtnTotal: {
    fontSize: 20,
    marginBottom: 5,
  },
  numAlltotal: {
    fontWeight: 'bold',
    color: '#FFA000',
    fontSize: 25,
  },
  agreementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    top: 10,
  },
  agreementText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 20,
  },
  totalPriceContainer: {
    flexDirection: 'column', 
    alignItems: 'flex-start', 
  },
});

export default PaymentScreen;