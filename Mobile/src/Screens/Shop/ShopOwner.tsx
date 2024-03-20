import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useQuery} from '@tanstack/react-query';
import api from '../../api/request';
const ShopOwnerScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {selectedItem}: {selectedItem: any} = route.params || {};
  if (!selectedItem.User) {
    return <Text> Người dùng không tồn tại</Text>;
  }
  const {data, refetch: refetchProduct} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('products', {
        auth: false,
        params: {seller_id: selectedItem.seller_id},
      });
      console.log('res', response.data?.data);
      return response.data.data;
    },
  });
  console.log('người dùng', selectedItem);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchProduct();
      console.log('Shop owner is focus!');
    });

    return unsubscribe;
  }, [navigation]);
  const renderProductOwner = ({item}: {item: any}) => {
    return (
      <TouchableOpacity style={styles.productContainer}>
        <Image
          source={{uri: item.Files[0].src}}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text style={styles.itemText}>{item.name}</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="star-outline" style={styles.starIcon} />
          <Text style={styles.ratingText}>4.5</Text>
          <Text style={styles.itemprice}>{item.price  ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    đ</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {selectedItem?.User && selectedItem.User.name
            ? selectedItem.User.name
            : 'Unknown'}
        </Text>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={require('../../assets/huong.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <Ionicons name="search-outline" style={styles.searchIcon} />
        <TextInput placeholder="Search..." style={styles.searchInput} />
        <TouchableOpacity>
          <Ionicons name="chatbox" style={styles.chat} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={renderProductOwner}
        keyExtractor={(_item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
  },
  productContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  productTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productText: {
    fontSize: 16,
    marginBottom: 5,
  },
  productList: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    marginBottom: 20,
  },
  searchIcon: {
    fontSize: 30,
    color: 'black',
    marginRight: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginRight: 5,
  },
  chat: {
    fontSize: 30,
    color: '#2E7D32',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
  },
  itemPhoto: {
    width: 130,
    height: 130,
    borderRadius: 20,
  },
  itemText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemprice: {
    color: '#fff',
    padding: 4,
    backgroundColor: '#ffa000',
    borderRadius: 6,
    fontSize: 13,
    left:10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  starIcon: {
    fontSize: 20,
    color: 'yellow',
  },
  ratingText: {
    marginLeft: 5,
  },
  heartIcon: {
    fontSize: 20,
    color: 'red',
    marginLeft: 10,
  },
});

export default ShopOwnerScreen;
