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
import { TextInput } from 'react-native-gesture-handler';

interface Item {
  key: string;
  text: string;
  price: number;
  uri: string;
}

interface New {
  item: Item;
}
const AddProduct = () => {
  const [cartItems, setCartItems] = useState([]);

  return (
    <View>
      <Text>Thêm sản phẩm</Text>
      <TextInput placeholder="Thêm sản phẩm" />
      <TextInput placeholder="Thêm sản phẩm" />
      <TextInput placeholder="Thêm sản phẩm" />
      <TextInput placeholder="Thêm sản phẩm" />
    </View>
  );
};

const styles = StyleSheet.create({});

export default AddProduct;
