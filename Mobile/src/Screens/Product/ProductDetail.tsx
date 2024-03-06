import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { addToCart } from '../../Hooks/addToCart';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductDetailScreen = ({ route, navigation }: any) => {
  const [quantity, setQuantity] = useState(1);

  const addToCartHandler = (product_id: any) => {
    console.log('id Product add to cart', product_id);
    addToCart(product_id, navigation);
  };

  if (!route.params || !route.params.selectedItem) {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Không có thông tin sản phẩm!</Text>
      </ScrollView>
    );
  }

  const { selectedItem }: any = route.params;

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
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
      </TouchableOpacity>
      <ScrollView>
        <View style={styles.container}>
          <Image
            source={{ uri: selectedItem?.Files[0]?.src }}
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
          <View style={styles.infoContainer}>
            <View style={styles.itemPriceContainer}>
              <Text style={styles.itemPriceText}>
                <Text>{formatPrice(selectedItem.price)}đ</Text>
              </Text>
            </View>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={decreaseQuantity}
                style={[styles.button, { backgroundColor: '#FFA000' }]}>
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>

              <Text style={styles.quantityText}>{quantity}</Text>

              <TouchableOpacity
                onPress={increaseQuantity}
                style={[styles.button, { backgroundColor: '#FFA000' }]}>
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
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
    fontSize: 30,
    color: 'yellow',
    marginRight: 5,
  },
  textIcon: {
    fontSize: 20,
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
  },
  itemPriceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 1,
    left: 20,
    right: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  cartContainer: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    width: 150,
    height: 50,
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cartButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  seenContainer: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    width: 150,
    height: 50,
    justifyContent: 'center',
    alignContent: 'center',
    right: 20,
  },
  seenButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});

export default ProductDetailScreen;
