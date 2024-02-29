import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductDetailScreen = ({route, navigation}: any) => {
  const [quantity, setQuantity] = useState(1);

  if (!route.params || !route.params.selectedItem) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Không có thông tin sản phẩm!</Text>
      </ScrollView>
    );
  }

  const {selectedItem}: {selectedItem: any} = route.params;

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{uri: selectedItem?.Files[0]?.src}}
            style={styles.image}
          />
          <Text style={styles.text}>{selectedItem.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star-outline" style={styles.starIcon} />
            <Text style={styles.textIcon}>4.5 - 26 phút</Text>
          </View>
          <Text style={styles.textscript}>
            Gấc bổ đổi lấy hết hạt để riêng ra bát, sau đó cho 1/2 bát con rượu
            trắng vào ngâm 30 phút cho gấc phai hết màu ra nước. Tiếp đó bạn đeo
            găng tay nilon bóp lại cho hạt gấc ra hết màu hoàn toàn rồi bỏ hạt
            đen đi.
          </Text>
          <View style={styles.itemPriceContainer}>
            <Text style={styles.itemPriceText}>
              Giá: <Text>{selectedItem.price}đ</Text>
            </Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={[styles.button, {backgroundColor: '#FFA000'}]}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{quantity}</Text>

            <TouchableOpacity
              onPress={increaseQuantity}
              style={[styles.button, {backgroundColor: '#FFA000'}]}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.comment}>Bình Luận </Text>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity
          style={styles.seenContainer}
          onPress={() =>
            navigation.navigate('ShopOwnerScreen', {
              selectedItem: selectedItem,
            })
          }>
          <Text style={styles.seenButton}>Xem shop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() =>
            navigation.navigate('Giỏ hàng', {
              selectedItem: selectedItem,
            })
          }>
          <Text style={styles.cartButton}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  arrowLeft: {
    fontSize: 30,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffa000',
    marginBottom: 20,
    marginTop: 20,
    top: 10,
  },
  image: {
    width: 'auto',
    height: 300,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  starIcon: {
    fontSize: 20,
    color: 'yellow',
    marginRight: 5,
  },
  textIcon: {
    fontSize: 15,
  },
  textscript: {
    paddingHorizontal: 20,
    fontSize: 15,
    marginBottom: 20,
  },
  itemPriceContainer: {
    backgroundColor: '#FFA000',
    width: 110,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    top: 40,
  },
  itemPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    left: '40%',
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#FFA000',
    marginRight: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  comment: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFA000',
  },
  cartContainer: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    width: 160,
    height: 60,
    left: '55%',
    top: '12%',
  },
  cartButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    top: 20,
    left: 10,
  },
  seenContainer: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    width: 100,
    height: 60,
    left: '10%',
    top: '60%',
  },
  seenButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    top: 20,
    left: 10,
  },
});

export default ProductDetailScreen;
