import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AddressComponent from '../../components/Payment/AddressComponent';
import OrderDetailComponent from '../../components/Payment/OrderDetails';
import PaymentItemComponent from '../../components/Payment/PaymentItem';
import PaymentMethods from '../../components/Payment/PaymentMethod';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PaymentScreen = ({route, navigation}: any) => {
  const {selectedItems} = route.params;

  const [showPaymentDetail, setShowPaymentDetail] = useState(true);

  const decreaseQuantity = (itemId: string) => {
    selectedItems((prevItems: any[]) =>
      prevItems.map((item: {key: string; quantity: number}) =>
        item.key === itemId && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };
  const increaseQuantity = (itemId: string) => {
    selectedItems((prevItems: any[]) =>
      prevItems.map((item: {key: string; quantity: number}) =>
        item.key === itemId ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const totalPrice = selectedItems.reduce((acc: number, currentItem: any) => {
    return acc + currentItem.Product.price * currentItem.quantity;
  }, 0);

  const totalQuantity = selectedItems.reduce(
    (acc: any, currentItem: {quantity: any}) => {
      return acc + currentItem.quantity;
    },
    0,
  );
  const shippingFee = 30000;
  const totalAmount = totalPrice + shippingFee;

  const togglePaymentDetail = () => {
    setShowPaymentDetail(!showPaymentDetail);
    
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
        <View style={styles.addressContainer}>
          <AddressComponent navigation={navigation} />
        </View>
        <Text style={styles.title}>Chi tiết đơn hàng</Text>
        <FlatList
          data={selectedItems}
          renderItem={({item}) => (
            <PaymentItemComponent
              item={item}
              decreaseQuantity={() => decreaseQuantity(item.key)}
              increaseQuantity={() => increaseQuantity(item.key)}
            />
          )}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.flatListContainer}
        />

        <OrderDetailComponent
          showPaymentDetail={showPaymentDetail}
          togglePaymentDetail={togglePaymentDetail}
          totalPrice={totalPrice}
          shippingFee={shippingFee}
          totalAmount={totalAmount}
          totalQuantity={totalQuantity}
          style={styles.orderDetail}
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
          <Text style={styles.numAlltotal}>
            {totalPrice?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
          </Text>
        </View>
        <TouchableOpacity style={styles.BtnShow}  onPress={() =>
              navigation.navigate('SuccessfulPayment')}>
        <Text style={styles.textPayment}>Mua ngay</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 10,
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
  addressContainer:{
  marginBottom:-30,
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
    fontSize: 18,
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
    marginLeft: 1,
  },
  totalPriceContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  BtnShow: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    backgroundColor: '#2E7D32',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
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
