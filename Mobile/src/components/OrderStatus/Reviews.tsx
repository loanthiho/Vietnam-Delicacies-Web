import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoaderKit from 'react-native-loader-kit';
import { useQuery } from '@tanstack/react-query';
import api from '../../api/request';

const Review = () => {
  const navigation = useNavigation();
  const { data, isLoading, refetch: refetchOrder } = useQuery({
    queryKey: ['get_order_CHO_DANH_GIA'],
    queryFn: async () => {
      const res = await api.get('orders', { params: { status: "CHO_DANH_GIA" } });
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
          {item.Product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
        </Text>
      </View>
      <View style={styles.status}>
        {/* <TouchableOpacity
          style={styles.review}
          onPress={() => navigation.navigate({
            name: 'ReviewScreen'
          })}>
          <Text style={styles.buttonText}>Đánh giá</Text>
        </TouchableOpacity> */}
        {/* <TouchableOpacity style={styles.statusText}>
          <Text style={styles.buttonText}>Mua lại</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {
        isLoading ?
          (
            <LoaderKit
              style={{ width: 45, height: 45, alignSelf: 'center' }}
              name={'BallPulse'}
              color={'green'}
            />
          )
          :
          data && data.length > 0 ?
            < FlatList data={data} renderItem={renderItem} />
            : <Text style={{ alignSelf: 'center', marginTop: 10 }}>Không có đơn cần đánh giá nào cả!</Text>
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
    fontSize: 13,
    marginTop: 15,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  status: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  review: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    backgroundColor: '#2E7D32',
    color: 'white',
    width: 70,
    height: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  statusText: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    backgroundColor: '#FFA000',
    color: '#2E7D32',
    width: 70,
    height: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 13,
  },
});

export default Review;
