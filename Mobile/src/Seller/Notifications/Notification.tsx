import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';

const Notification = () => {
  const navigation = useNavigation<any>();

  const data = [
    {
      id: 1,
      name: 'Văn Đi shop',
      messenger: 'Giá hiện tại là bao nhiều vậy shop',
      image: require('../../assets/huong.jpg'),
    },
    {
      id: 2,
      name: 'Chấm chéo Tây Bắc',
      messenger: 'Chị check tin nhắn em với ạ',
      image: require('../../assets/huong.jpg'),
    },

    {
      id: 3,
      name: 'A Thi Shop',
      messenger: 'Chị check tin nhắn em với',
      image: require('../../assets/huong.jpg'),
    },

  ];

  const deleteItem = (itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
  };

  const OnClickBack = () => {
    navigation.navigate('ShopSeller');
  };

  const handlePress = (item: any) => {
    navigation.navigate('MessageSeller', {
      itemId: item.id,
      itemName: item.name,
      itemImage: item.image,
    });
    console.log('first data before send', item);
    console.log(typeof item.image);
  };
  const [cartItems, setCartItems] = useState(data);

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePress(item)}>
      <Image
        source={typeof item.image === 'string' ? {uri: item.image} : item.image}
        style={styles.itemImage}
      />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.name}
        </Text>
        <Text numberOfLines={1} style={styles.messenger}>
          {item.messenger}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = ({item}: any) => (
    <View>
      <TouchableOpacity
        style={[styles.backRightBtn]}
        onPress={() => deleteItem(item.id)}>
        <Text style={styles.backTextWhite}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Ionicons
          name="arrow-back-outline"
          style={styles.arrowLeft}
          onPress={() => OnClickBack()}
        />
        <Text style={styles.Subtitle}>Thông báo</Text>
      </View>
      <SwipeListView
        data={cartItems}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-60}
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
    paddingRight: 20,
    borderColor: 'white',
    elevation: 10,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },

  content: {
    alignSelf: 'center',
    gap: 10,
  },
  itemText: {
    marginRight: 50,
    fontSize: 16,
    borderRadius: 10,
    color: '#FFA000',
  },
  messenger: {
    marginRight: 40,
    fontSize: 14,
    borderRadius: 5,
    color: '#000',
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

  backTextWhite: {
    color: '#fff',
    marginTop: 20,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: 'red',
    alignContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 10,
  },

  backRightBtn: {
    textAlign: 'right',
    justifyContent: 'center',
  },
});

export default Notification;
