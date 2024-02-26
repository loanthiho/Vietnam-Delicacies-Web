import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';

const ProductScreen = () => {
  interface New {
    key: string;
    text: string;
    price: number;
    uri: string;
    quantity: number;
  }

  interface Item {
    item: New;
  }
  const [modalVisible, setModalVisible] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      key: '1',
      text: ' Xôi 7 màu ',
      uri: 'https://i.pinimg.com/564x/27/23/28/272328c04f37971919c9e6f28fdd03ce.jpg',
      price: 10000,
      quantity: 1,
    },
  ]);

  const renderItem = ({item}: Item) => {
    const totalPrice = item.price * item.quantity;
    const shippingFee = 30000;
    const totalAmount = totalPrice + shippingFee;
    const estimatedDeliveryTime = 'sau 3 ngày';

    return (
      <View>
        <View style={styles.itemContainer}>
          <Image source={{uri: item.uri}} style={styles.itemImage} />
          <View style={styles.content}>
            <Text style={styles.itemText}>{item.text}</Text>
            <Text style={styles.itemPrice}>{item.price} đ</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => decreaseQuantity(item.key)}
              style={[styles.button, {backgroundColor: '#FFA000'}]}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>
            <Text>{item.quantity}</Text>
            <TouchableOpacity
              onPress={() => increaseQuantity(item.key)}
              style={[styles.button, {backgroundColor: '#FFA000'}]}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infOrder}>
          <Text style={styles.detailOrder}>Chi tiết thành toán</Text>
          <View style={styles.groupPrice}>
            <Text style={styles.groupPrice}>Giá: </Text>
            <Text style={styles.groupPrice}>{totalPrice} đ </Text>
          </View>
          <View style={styles.groupPrice}>
            <Text style={styles.groupPrice}>Số lượng: </Text>
            <Text style={styles.groupPrice}>{item.quantity} </Text>
          </View>
          <View style={styles.groupPrice}>
            <Text style={styles.groupPrice}>Phí vận chuyển: </Text>
            <Text style={styles.groupPrice}>{shippingFee} đ </Text>
          </View>
          <View style={styles.groupPrice}>
            <Text style={[styles.groupPrice, styles.totalPrice]}>Tổng: </Text>
            <Text style={[styles.groupPrice, styles.totalPrice]}>
              {totalAmount} đ
            </Text>
          </View>
          <View style={styles.groupPrice}>
            <Text style={styles.groupPrice}>
              Ước tính thời gian giao hàng:{' '}
            </Text>
            <Text style={styles.groupPrice}>{estimatedDeliveryTime} </Text>
          </View>
        </View>
      </View>
    );
  };

  const increaseQuantity = (itemId: string) => {
    setCartItems(
      cartItems.map(item =>
        item.key === itemId ? {...item, quantity: item.quantity + 1} : item,
      ),
    );
  };

  const decreaseQuantity = (itemId: string) => {
    setCartItems(
      cartItems.map(item =>
        item.key === itemId && item.quantity > 1
          ? {...item, quantity: item.quantity - 1}
          : item,
      ),
    );
  };

  const totalPrice = cartItems.reduce((acc, currentItem) => {
    return acc + currentItem.price * currentItem.quantity;
  }, 0);

  // Phí vận chuyển cố định
  const shippingFee = 30000;

  // Tổng giá tiền của đơn hàng (tổng giá của tất cả các sản phẩm + phí vận chuyển)
  const totalAmount = totalPrice + shippingFee;

  return (
    <View style={styles.container}>
      <View>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
        <Text style={styles.TitleAddress}>Địa chỉ nhận hàng</Text>
      </View>

      <View style={styles.AddressInfo}>
        <View>
          <Text style={styles.AddressNum}>(+84) 035921510</Text>
          <Text style={styles.Address}>Lâm Thủy, Lệ Thủy, Quảng Binh </Text>
        </View>
        <Ionicons
          style={styles.AddressIcon}
          name="chevron-forward-outline"></Ionicons>
      </View>
      <Text style={styles.OrderDetails}>Chi tiết đơn hàng</Text>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.key.toString()}
      />

      <View style={styles.btn}>
        <View>
          <Text style={styles.BtnTotal}>Tổng giá:</Text>
          <Text style={[styles.BtnTotal, styles.numAlltotal]}>
            {totalAmount} đ
          </Text>
        </View>
        <Text style={styles.BtnShow}>Mua ngày</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 20,
    padding: 10,
    borderColor: 'white',
    elevation: 10,
  },

  quantityContainer: {
    gap: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    top: 30,
  },

  itemImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },

  content: {
    alignSelf: 'center',
    gap: 10,
  },
  itemText: {
    maxWidth: 140,
    marginRight: 10,
    fontSize: 20,
    borderRadius: 10,
    color: '#FFA000',
  },
  itemPrice: {
    marginRight: 40,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 18,
    borderRadius: 5,
    color: '#FFFFFF',
    backgroundColor: '#FFA000',
  },

  arrowLeft: {
    fontSize: 30,
  },

  TitleAddress: {
    padding: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA000',
  },

  OrderDetails: {
    paddingLeft: 20,
    paddingTop: 20,
    fontSize: 18,
    color: '#FFA000',
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

  btn: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  BtnTotal: {
    fontSize: 20,
  },

  numAlltotal: {
    fontWeight: 'bold',
    color: '#FFA000',
    fontSize: 25,
  },

  BtnShow: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    fontSize: 20,
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
  },

  AddressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
  },

  AddressNum: {
    fontSize: 16,
  },

  Address: {
    fontSize: 16,
  },

  AddressIcon: {
    fontSize: 20,
    alignSelf: 'center',
  },

  infOrder: {
    padding: 10,
    marginTop: 10,
  },

  detailOrder: {
    fontSize: 18,
    color: '#FFA000',
  },

  groupPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 18,
  },

  totalPrice: {
    fontWeight: 'bold',
  },
});

export default ProductScreen;
