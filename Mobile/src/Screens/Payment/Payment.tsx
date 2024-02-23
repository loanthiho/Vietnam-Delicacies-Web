import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
interface Item {
    key: string;
    text: string;
    price: number;
    uri: string;
}
interface New {
    item: Item;
}
const ProductScreen = () => {
  const [cartItems, setCartItems] = useState([
    {
      key: '1',
      text: ' Xôi 7 màu ',
      price: 500000,
      uri: 'https://i.pinimg.com/564x/27/23/28/272328c04f37971919c9e6f28fdd03ce.jpg',
    },
    {
      key: '1',
      text: ' Xôi 7 màu ',
      price: 500000,
      uri: 'https://i.pinimg.com/564x/27/23/28/272328c04f37971919c9e6f28fdd03ce.jpg',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = () => (
    <View>
      <View style={styles.itemContainer}>
        {/* <Image source={{uri: item.uri}} style={styles.itemImage} /> */}
        <View style={styles.content}>
          <Text style={styles.itemText}>Hồ Văn Đi</Text>
          <Text style={styles.itemPrice}>Lớp PNV đ</Text>
        </View>
        <View style={styles.status}>
          <Text style={styles.update}>Sửa</Text>
          <Pressable onPress={() => setModalVisible(true)}>
            <Text style={styles.delete}>Xóa</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

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

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.key.toString()}>
      </FlatList>

      <View style={styles.btn}>
        <Text style={styles.BtnAdd}>Thêm</Text>
        <Text style={styles.BtnShow}>Xem Shop</Text>
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

  status: {
    flex: 2,
    position: 'absolute',
    right: 20,
    gap: 10,
  },
  update: {
    color: '#2E7D32',
    fontSize: 18,
  },
  delete: {
    fontSize: 18,
    color: 'red',
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

  btn: {
    paddingTop: 20,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  BtnAdd: {
    width: 110,
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
  },

  BtnShow: {
    padding: 10,
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
});

export default ProductScreen;
