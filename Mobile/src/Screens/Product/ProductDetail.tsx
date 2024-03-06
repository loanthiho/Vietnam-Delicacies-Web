import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {addToCart} from '../../Hooks/addToCart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getUserAccessToken} from '../../api/storage';

const ProductDetailScreen = ({route, navigation}: any) => {
  const [quantity, setQuantity] = useState(1);
  const [token, setToken] = useState('');

  const addToCartHandler = (product_id: any) => {
    console.log('id Product add to cart', product_id);
    if (token) {
      // addToCart(product_id, navigation, token);
      console.log('token:', token);
    } else {
      console.log('there is no token!');
    }
  };
  const fetToken = async () => {
    const token = (await getUserAccessToken()).token;
    setToken(token);
  };
  useEffect(() => {
    fetToken();
  }, []);

  if (!route.params || !route.params.selectedItem) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Không có thông tin sản phẩm!</Text>
      </ScrollView>
    );
  }

  const {selectedItem}: any = route.params;

  console.log('my data', selectedItem);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  return (
    <View style={{flex: 1}}>
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
            <Ionicons name="star" style={styles.starIcon} />
            <Text style={styles.textIcon}>4.5 - 26 phút</Text>
          </View>
          <ScrollView>
            <Text style={styles.textscript}>{selectedItem.description}</Text>
          </ScrollView>

          <View style={styles.GroupPrice}>
            <View style={styles.itemPriceContainer}>
              <Text style={styles.itemPriceText}>
                Giá: <Text>{formatPrice(selectedItem.price)}đ</Text>
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
          </View>

          <Text style={styles.comment}>Bình Luận</Text>
        </View>
      </ScrollView>

      <View style={styles.GruopBtn}>
        <TouchableOpacity
          style={styles.seenContainer}
          onPress={() =>
            navigation.navigate('ShopOwnerScreen', {
              selectedItem: selectedItem,
            })
          }>
          <Text style={styles.seenButton}>Xem cửa hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.cartContainer}
          onPress={() => addToCartHandler(selectedItem?.id)}>
          <Text style={styles.cartButton}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  arrowLeft: {
    fontSize: 22,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffa000',
    marginBottom: 10,
    marginTop: 10,
    top: 10,
  },
  image: {
    width: 'auto',
    height: 250,
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
    color: '#ffa000',
    marginRight: 5,
  },
  textIcon: {
    fontSize: 16,
  },
  textscript: {
    paddingHorizontal: 16,
    fontSize: 14,
    marginBottom: 20,
  },

  GroupPrice: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemPriceContainer: {
    backgroundColor: '#FFA000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  itemPriceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
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
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA000',
  },
  cartContainer: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
  },
  cartButton: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },

  GruopBtn: {
    padding: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  seenContainer: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
  },
  seenButton: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ProductDetailScreen;
