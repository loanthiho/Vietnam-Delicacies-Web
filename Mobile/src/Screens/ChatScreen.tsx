import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, FlatList, StyleSheet} from 'react-native';
import api from '../api/request';
import {useNavigation} from '@react-navigation/native';

const ChatScreen = () => {
  const navigation = useNavigation<any>();
  const [cartItems, setCartItems] = useState(data);

  const data = [
    {
      id: 1,
      name: 'Product 1',
      price: '$10',
      image: require('../../assets/banner/mix.jpg'),
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$20',
      image: require('../assets/Image.png'),
    },
  ];

  const OnClickBack = () => {
    navigation.navigate('AddProduct');
  };

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image
        source={typeof item.image === 'string' ? {uri: item.image} : item.image}
        style={styles.itemImage}
      />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.name} Hô Văn Đi</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
      </View>
    </View>
  );

  console.log(item);

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Ionicons
          name="arrow-back-outline"
          style={styles.arrowLeft}
          onPress={() => OnClickBack()}
        />
        <Text style={styles.Subtitle}>Tin Nhắn</Text>
      </View>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
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
    fontSize: 16,
    borderRadius: 10,
    color: '#FFA000',
  },
  itemPrice: {
    marginRight: 40,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 14,
    borderRadius: 5,
    color: '#FFFFFF',
    backgroundColor: '#FFA000',
  },

  arrowLeft: {
    fontSize: 20,
  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  Subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  btn: {
    paddingTop: 20,
    paddingRight: 24,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  BtnAdd: {
    width: 110,
    textAlign: 'center',
    fontSize: 16,
    padding: 8,
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
  },

  BtnShow: {
    padding: 8,
    fontSize: 16,
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
  },
});

export default ChatScreen;
