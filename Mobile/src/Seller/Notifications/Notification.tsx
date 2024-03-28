import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {useMutation, useQuery} from '@tanstack/react-query';
import api from '../../api/request';
import LoaderKit from 'react-native-loader-kit';

const Notification = () => {
  const navigation = useNavigation<any>();
  const [cartItems, setCartItems] = useState([]);

  const {
    data,
    isLoading,
    refetch: refreshProductList,
  } = useQuery({
    queryKey: ['fetch'],
    queryFn: async () => {
      try {
        const resFetchRoom = await api.get('chats/get-rooms');
        if (resFetchRoom) {
          setCartItems(resFetchRoom.data.data);
          return resFetchRoom.data.data;
        }
      } catch (error) {
        console.log(error.response);
        return [];
      }
    },
    refetchInterval: 3000,
  });

  console.log('dataa', data);

  useEffect(() => {
    refreshProductList();
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      refreshProductList();
    }, []),
  );

  const mutation = useMutation({
    mutationKey: ['delete'],
    mutationFn: async (id: string) => {
      try {
        const resDeleteRoom = await api.delete(`chats/remove-room/${id}`);
        if (resDeleteRoom) {
          setCartItems(resDeleteRoom.data.data);
          return resDeleteRoom.data.data;
        }
      } catch (error) {
        console.log(error.response);
        return [];
      }
    },
  });

  const deleteItem = (itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
    mutation.mutate(itemId);
  };

  const OnClickBack = () => {
    navigation.navigate('ShopSeller');
  };

  const handlePress = (item: any) => {
    navigation.navigate('MessageSeller', {
      dataRoomChat: item,
    });
    console.log('first data before send', item);
    console.log(typeof item.image);
  };

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePress(item)}>
      <Image
        source={
          item.Sender?.avatar
            ? {uri: item.Sender?.avatar}
            : {uri: './none-image.jpg'}
        }
        style={styles.itemImage}
      />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.Sender?.name}
        </Text>
        <Text numberOfLines={1} style={styles.messenger}>
          {item.Messages[0]?.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHiddenItem = ({item}: any) => (
    <View>
      <TouchableOpacity
        disabled={mutation.isPending}
        style={[styles.backRightBtn]}
        onPress={() => deleteItem(item.id)}>
        <Text style={styles.backTextWhite}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  if (isLoading) {
    return (
      <Text style={{alignSelf: 'center', justifyContent: 'center'}}>
        Đang tải ...
      </Text>
    );
  }

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
      {mutation.isPending && (
        <>
          <LoaderKit
            style={{
              width: 25,
              height: 25,
              flexDirection: 'row',
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            name={'BallPulse'} // Optional: see list of animations below
            color={'green'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
          />
        </>
      )}
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
    paddingRight: 10,
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
