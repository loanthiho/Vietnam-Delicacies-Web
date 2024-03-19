import { useNavigation } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import api from '../../api/request';
import LoaderKit from 'react-native-loader-kit';

const Wait_for_delivery = () => {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const { data, isLoading, refetch: refetchOrder, isRefetching } = useQuery({
    queryKey: ['seller_get_order_CHO_LAY_HANG'],
    queryFn: async () => {
      const res = await api.get('orders', { params: { status: "CHO_LAY_HANG" } });
      if (res) {
        return res.data?.data;
      }
    },
  });

  const { mutate, isPending, data: dataMutation } = useMutation({
    mutationKey: ['seller_interact_order_CHO_GIAO_HANG'],
    mutationFn: async ({ id, status }: any) => (await api.patch(`orders/${id}`, { params: { status: status } })).data?.data,
    onSuccess: async (data, vari) => {
      await queryClient.invalidateQueries({
        queryKey: ['seller_get_order_CHO_LAY_HANG'],
      });
    },
    onError: (err, varr) => console.error("Error:", err.response?.data)
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchOrder()
      console.log('wait for delivery Screen is focused!');
    });

    return unsubscribe;
  }, [navigation]);


  const renderItem = ({ item }: any) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{ uri: item.Product?.Files?.[0]?.src }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.Product?.name}</Text>
        <Text style={styles.itemPrice}>{item?.total_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
      </View>
      <TouchableOpacity
        disabled={isPending}
        onPress={() => mutate({ id: item.id, status: 'CHO_GIAO_HANG' })}
      >
        <Text style={styles.update}>Giao hàng</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {
        isPending ?
          (<View style={{ flexDirection: 'row', justifyContent: 'center', columnGap: 20, alignItems: 'center' }}>
            <Text style={{ color: 'green' }}>Đang xác nhận</Text>
            <LoaderKit
              style={{ width: 35, height: 35, alignSelf: 'center' }}
              name={'BallPulse'}
              color={'green'}
            />
          </View>
          )
          : null
      }
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
    backgroundColor: "#ffa000",
    padding: 2,
    fontSize: 13,
    color: "#fff",
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
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'green',
    fontSize: 13,
    color: 'white',
    maxWidth: 100,
    textAlign: 'center',
  },
});

export default Wait_for_delivery;
