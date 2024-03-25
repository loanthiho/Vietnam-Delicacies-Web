import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { useQuery } from '@tanstack/react-query';
import api from '../api/request';
import LoaderKit from 'react-native-loader-kit';


const ChatScreen = () => {
  const navigation = useNavigation<any>();
  const [cartItems, setCartItems] = useState([]);

  const { data, isLoading, refetch: refreshProductList } = useQuery({
    queryKey: ['fetchRooms'],
    queryFn: async () => {
      console.log("fetching...")
      try {
        const resFetchRoom = await api.get('chats/get-rooms');
        if (resFetchRoom) {
          setCartItems(resFetchRoom.data.data)
          return resFetchRoom.data.data
        }
      } catch (error) {
        console.log(error.response);
        return []
      }
    },
    refetchInterval: 3000
  });

  useEffect(() => {
    refreshProductList();
  }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      console.log("data =>", data)
      refreshProductList();
    }, []),
  );


  const handlePress = (item: any) => {
    navigation.navigate('MessegesScreen', {
      itemId: item.id,
      itemName: item.name,
      itemImage: item.image,
    });
    console.log('first data before send', item);
    console.log(typeof item.image);
  };
  const deleteItem = (itemId: number) => {
    const updatedItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedItems);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshProductList()
      console.log('Cart Screen focus!');
    });
    return unsubscribe;
  }, [navigation]);


  const renderItem = ({ item }: any) => {
    console.log("item 1 ", item);
    // return <Text> {item.User.name}</Text>
    return <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handlePress(item)}>
      <Image
        source={item.User?.avatar ? { uri: item.User?.avatar } : { uri: './none-image.jpg' }}
        style={styles.itemImage}
      />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.User?.name}
        </Text>
        <Text numberOfLines={1} style={styles.messenger}>
          {item.Messages[0]?.message}
        </Text>
      </View>
    </TouchableOpacity>
  };

  const renderHiddenItem = ({ item }: any) => (
    <View>
      <TouchableOpacity
        style={[styles.backRightBtn]}
        onPress={() => deleteItem(item.id)}>
        <Text style={styles.backTextWhite}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
  if (isLoading) {
    return <Text> Is loading room chat ...</Text>;
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.Subtitle}>TIN NHẮN</Text>
      </View>
      {
        isLoading ?
          (
            <LoaderKit
              style={{ width: 35, height: 35 }}
              name={'BallPulse'}
              color={'green'}
            />
          ) : (
            <SwipeListView
              data={cartItems}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-60}
            />
          )
      }

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

export default ChatScreen;
