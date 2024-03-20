
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/request';
import LoaderKit from 'react-native-loader-kit';


const Canceled = () => {
  const navigation = useNavigation<any>();
  const { data, isLoading, refetch: refetchOrder, isRefetching } = useQuery({
    queryKey: ['seller_get_order_DA_HUY'],
    queryFn: async () => {
      const res = await api.get('orders', { params: { status: "DA_HUY" } });
      if (res) {
        return res.data?.data;
      }
    },
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchOrder()
      console.log('wait delivery Screen is focused!');
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: any) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{ uri: item.Product?.Files?.[0]?.src }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.Product?.name}</Text>
        <Text style={styles.itemPrice}>
          {item.total_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
        </Text>
      </View>
      <View style={styles.status}>
        {/* <TouchableOpacity style={styles.cancelText}>
          <Text style={styles.cancelText}>Xác nhận lại hàng</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.statusText}>
          <Text style={styles.statusText}>Đã hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {isRefetching ?
        (
          <LoaderKit
            style={{ width: 35, height: 35, alignSelf: 'center' }}
            name={'BallPulse'}
            color={'green'}
          />
        )
        : null}
      {
        isLoading ?
          (
            <LoaderKit
              style={{ width: 35, height: 35, alignSelf: 'center' }}
              name={'BallPulse'}
              color={'green'}
            />
          )
          :
          data && data.length > 0 ?
            < FlatList data={data} renderItem={renderItem} />
            : <Text style={{ alignSelf: 'center', marginTop: 10 }}>Không có đơn đã hủy nào cả!</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  itemText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemPrice: {
    backgroundColor: '#ffa000',
    padding: 2,
    fontSize: 13,
    color: '#fff',
    marginTop: 15,
    marginRight: 10,
    maxWidth: 95,
    textAlign: 'center',
    borderRadius: 5,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },

  update: {
    fontSize: 13,
    color: '#2E7D32',
    maxWidth: 80,
    textAlign: 'center',
  },

  buttonText: {
    fontSize: 13,
  },

  status: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 8,
  },

  cancelText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffa000',
    color: 'white',
    borderRadius: 5,
    fontSize: 12,
    padding: 2,
    width: 68,
    textAlign: 'center',
  },
  statusText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 5,
    width: 68,
    padding: 2,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Canceled;

