import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';

const AccSeller = () => {
  const navigation = useNavigation<any>();

  const data = [
    {
      id: 1,
      name: 'Tài Khoản cá nhân',
      messenger: 'Người có nhu câu mua hàng',
      image: require('../assets/huong.jpg'),
    },
    {
      id: 2,
      name: 'Tài khoản bán hàng',
      messenger: 'Người có nhu câu bán hàng',
      image: require('../assets/huong.jpg'),
    },
  ];

  const OnClickBack = () => {
    navigation.navigate('ShopSeller');
  };

  const handlePress = (item: any) => {
    if (item.id === 1) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('ShopSeller');
    }
  };
  const [cartItems, setCartItems] = useState(data);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePress(item)}>
      <Image
        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
        style={styles.itemImage}
      />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.messenger}>{item.messenger}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Ionicons
          name="arrow-back-outline"
          style={styles.arrowLeft}
          onPress={() => OnClickBack()}
        />
        <Text style={styles.Subtitle}>Thiết lập tài khoản</Text>
      </View>

      <View style={{ paddingHorizontal: 10, paddingTop: 20 }}>
        <Text style={styles.titleChose}>Chọn loại tài khoản</Text>
        <Text>
          Thông tin này giúp chúng tôi đem đén cho bạn những quyền lợi đặc biệt
          theo từng loại tài khoản và tối ưu trải nghiệm của bạn
        </Text>
      </View>
      <SwipeListView data={cartItems} renderItem={renderItem} />
    </View>
  );
};

export default AccSeller;

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
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 32,
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

  titleChose: {
    color: '#ffa000',
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
