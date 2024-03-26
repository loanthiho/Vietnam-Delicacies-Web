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
import LoaderKit from 'react-native-loader-kit';

import {useMutation, useQuery} from '@tanstack/react-query';
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
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          rowGap: 10,
        }}>
        <Text style={{color: 'green', fontSize: 20}}>
          {' '}
          Người dùng không tồn tại
        </Text>
        <TouchableOpacity
          style={{
            padding: 10,
            borderColor: 'green',
            borderWidth: 1,
            borderRadius: 20,
          }}
          onPress={() => navigation.goBack()}>
          <Text style={{color: 'green'}}>Quay lại</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const seller_id = selectedItem.User.id;
  const {
    data,
    refetch: refetchProduct,
    isLoading,
  } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('products', {
        auth: false,
        params: {seller_id: selectedItem.seller_id},
      });
      return response.data.data;
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchProduct();
      console.log('Shop owner is focus!');
    });

    return unsubscribe;
  }, [navigation]);

  const renderProductOwner = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        style={styles.productContainer}
        onPress={() =>
          navigation.navigate('ProductDetailScreen', {
            selectedItem: item,
          })
        }>
        <Image
          source={{uri: item.Files[0].src}}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <Text numberOfLines={1} style={styles.itemText}>
          {item.name}
        </Text>
        <View style={styles.iconContainer}>
          <View style={{flexDirection: 'row'}}>
            <Ionicons name="star" style={styles.starIcon} />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
          <Text style={styles.itemprice}>
            {item.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const mutation = useMutation({
    mutationKey: ['createNewChat'],
    mutationFn: async (seller_id: string) => {
      console.log('create chat room with seller id', seller_id);
      try {
        const createNewChat = await api.post(`chats/${seller_id}`);
        console.log('response create chat', createNewChat.data);
        return createNewChat.data.data;
      } catch (error) {
        console.log('Lỗi khi cố gắng chat với người dùng này');
      }
    },
    onSuccess: (data, variable) => {
      // console.log("dataRom", data)
      navigation.navigate('MessegesScreen', {dataRoomChat: data[0]});
    },
  });
  const chat = async () => {
    console.log('create new chat!');
    mutation.mutate(seller_id);
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={styles.search}>
          <Ionicons name="search-outline" style={styles.searchIcon} />
          <TextInput placeholder="Tìm kiếm..." style={styles.searchInput} />
        </View>
        <TouchableOpacity
          onPress={() => chat()}
          style={{alignSelf: 'center', alignItems: 'center'}}>
          {mutation.isPending ? (
            <>
              <LoaderKit
                style={{
                  width: 50,
                  height: 50,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignSelf: 'center',
                }}
                name={'BallPulse'} // Optional: see list of animations below
                color={'green'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
              />
            </>
          ) : (
            <Ionicons name="chatbox" style={styles.chat} />
          )}
        </TouchableOpacity>
      </View>

      <View style={{flex: 1, alignItems: 'center', marginVertical: 10}}>
        {isLoading ? (
          <LoaderKit
            style={{
              width: 50,
              height: 50,
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            name={'BallPulse'} // Optional: see list of animations below
            color={'green'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
          />
        ) : (
          <FlatList
            data={data}
            numColumns={2}
            renderItem={renderProductOwner}
            keyExtractor={(_item, index) => index.toString()}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginHorizontal: 5,
  },
  productContainer: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    width: 160,
    marginHorizontal: 5,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerText: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 5,
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
    padding: 4,
    borderRadius: 10,
    width: '85%',
    backgroundColor: '#ffffff',
  },
  searchIcon: {
    fontSize: 20,
    color: 'black',
    marginLeft: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginLeft: 5,
  },
  chat: {
    fontSize: 34,
    color: '#2E7D32',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 6,
  },
  itemPhoto: {
    width: 130,
    height: 130,
    borderRadius: 10,
    marginLeft: 4,
    marginTop: 5,
  },
  itemText: {
    textAlign: 'center',
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemprice: {
    color: '#fff',
    padding: 4,
    backgroundColor: '#ffa000',
    borderRadius: 6,
    fontSize: 13,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    justifyContent: 'space-between',
  },
  starIcon: {
    fontSize: 18,
    color: '#ffa000',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 13,
  },
});

export default ShopOwnerScreen;
