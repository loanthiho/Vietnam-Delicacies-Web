import React from 'react';
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
import LoaderKit from 'react-native-loader-kit';
import useGetOrder from '../../Hooks/useGetOrder';
import api from '../../api/request';
import { useQuery } from '@tanstack/react-query';

const Wait_for_delivery = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['get_order_CHO_LAY_HANG'],
    queryFn: async () => {
      const res = await api.get('orders', { params: { status: "CHO_LAY_HANG" } });
      if (res) {
        return res.data?.data;
      }
    },
  });
  const renderItem = ({ item }: any) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{ uri: item.Product?.Files?.[0]?.src }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.Product?.name}</Text>
        <Text style={styles.itemPrice}>{item.Product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
      </View>
      <View style={styles.status}>
        <Text style={styles.update}>Đang chờ lấy hàng</Text>
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
            : <Text style={{ alignSelf: 'center', marginTop: 10 }}>Không có đơn chờ lấy hàng nào cả!</Text>
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
    alignItems: 'flex-end',
  },
  update: {
    fontSize: 13,
    color: '#2E7D32',
    marginTop: 30,
  },
});

export default Wait_for_delivery;
