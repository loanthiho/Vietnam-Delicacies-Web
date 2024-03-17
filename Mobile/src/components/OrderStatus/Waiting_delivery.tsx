
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity
} from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import LoaderKit from 'react-native-loader-kit';
import api from '../../api/request';

const Waiting_confirmation = () => {
  const queryClient = useQueryClient();
  const [idUpdate, setIdUpdate] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['get_order_CHO_GIAO_HANG'],
    queryFn: async () => {
      const res = await api.get('orders', { params: { status: "CHO_GIAO_HANG" } });
      if (res) {
        return res.data?.data;
      }
    },
  });

  const mutation = useMutation({
    mutationKey: ['customer_received_order'],
    mutationFn: async (id: string) => (await api.patch(`orders/${id}`, { params: { status: 'CHO_DANH_GIA' } })).data?.data,
    onSuccess: async (data, vari) => {
      await queryClient.invalidateQueries({
        queryKey: ['get_order_CHO_GIAO_HANG'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['get_order_CHO_DANH_GIA'],
      });
    }
  })

  const renderItem = ({ item }: any) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{ uri: item.Product?.Files?.[0]?.src }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.Product?.name}</Text>
        <Text style={styles.itemPrice}>{item.Product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
      </View>
      <View style={styles.status}>
        <Text style={styles.update}>Đang giao</Text>
        <TouchableOpacity
          disabled={mutation.isPending ? true : false}
          onPress={() => mutation.mutate(item.id)}
        >
          <Text style={styles.statusText}>Đã nhận</Text>

        </TouchableOpacity>

      </View>
    </View >
  );

  return (
    <View style={styles.container}>
      {
        mutation.isPending
          ?
          (
            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ color: 'green' }}>Đang xác nhận</Text>
              <LoaderKit
                style={{ width: 35, height: 20, alignSelf: 'center' }}
                name={'BallPulse'}
                color={'green'}
              />
            </View>)
          : null
      }
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
            : <Text style={{ alignSelf: 'center', marginTop: 10 }}>Không có đơn chờ giao hàng nào cả!</Text>
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
  statusText: {
    fontSize: 13,
    backgroundColor: '#2E7D32',
    color: 'white',
    margin: 7,
    width: 50,
    height: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  update: {
    fontSize: 13,
    color: '#2E7D32',
    margin: 7,
  },
});

export default Waiting_confirmation;

