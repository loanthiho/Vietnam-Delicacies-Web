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

interface Item{
  key: string;
  text: string;
  price: number;
  uri: string;
}

interface New{
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
      key: '2',
      text: 'Cá Kho làng Vũ Đại',
      price: 500000,
      uri: 'https://i.pinimg.com/736x/da/76/e5/da76e520e0bfed988c544ecd7d265ae7.jpg',
    },
    {
      key: '3',
      text: 'Item text 3',
      price: 500000,
      uri: 'https://picsum.photos/id/1002/200',
    },
    {
      key: '4',
      text: 'Item text 4',
      price: 500000,
      uri: 'https://picsum.photos/id/1006/200',
    },
    {
      key: '5',
      text: 'Item text 5',
      price: 500000,
      uri: 'https://picsum.photos/id/1008/200',
    },

    {
      key: '5',
      text: 'Item text 5',
      price: 500000,
      uri: 'https://picsum.photos/id/1008/200',
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const renderItem = ({item}:New) => (
    <View>
      <View style={styles.itemContainer}>
        <Image source={{uri: item.uri}} style={styles.itemImage} />
        <View style={styles.content}>
          <Text style={styles.itemText}>{item.text}</Text>
          <Text style={styles.itemPrice}>{item.price} đ</Text>
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
      <View style={styles.title}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
        <Text style={styles.Subtitle}>Sản phẩm của tôi</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.key.toString()}
      />

      <View style={styles.btn}>
        <Text style={styles.BtnAdd}>Thêm</Text>
        <Text style={styles.BtnShow}>Xem Shop</Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn có chắc chắn muốn xóa sản phẩm không
            </Text>

            <View style={styles.confirm}>
              <Pressable
                style={[styles.button, styles.buttonNo]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Không</Text>
              </Pressable>

              <Pressable
                style={[styles.button, styles.buttonYes]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Có</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonNo: {
    backgroundColor: '#2196F3',
  },
  buttonYes: {
    backgroundColor: 'red',
  },

  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
    textAlign: 'center',
  },

  confirm: {
    flexDirection: 'row',
    gap: 20,
  },

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

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  Subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#2E7D32',
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
});

export default ProductScreen;
