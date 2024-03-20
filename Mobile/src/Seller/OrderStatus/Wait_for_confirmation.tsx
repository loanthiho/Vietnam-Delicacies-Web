
import React, { useState, useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, Text, Image, FlatList, StyleSheet, Pressable } from 'react-native';
import LoaderKit from 'react-native-loader-kit';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../../api/request';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigation } from '@react-navigation/native';

const Wait_for_confirmation = () => {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const { data, isLoading, refetch: refetchOrder, isRefetching } = useQuery({
    queryKey: ['seller_get_order_CHO_XAC_NHAN'],
    queryFn: async () => {
      console.log("____\n ____\n Confirm order is refetching!!")
      const res = await api.get('orders', { params: { status: "CHO_XAC_NHAN" } });
      if (res) {
        return res.data?.data;
      }
    },
  });
  const { mutate, isPending, data: dataMutation } = useMutation({
    mutationKey: ['seller_interact_order'],
    mutationFn: async ({ id, status }: any) => (await api.patch(`orders/${id}`, { params: { status: status } })).data?.data,
    onSuccess: async (data, vari) => {
      await queryClient.invalidateQueries({
        queryKey: ['seller_get_order_CHO_XAC_NHAN'],
      });
    },
    onError: (err, varr) => console.error("Error:", err.response?.data)
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchOrder();
      console.log("wait for confim screen focus!")
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: any) => (
    <View key={item.id?.toString() + item.total_price} style={styles.itemContainer}>
      <Image source={{ uri: item.Product?.Files?.[0]?.src }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.Product?.name}</Text>
        <Text style={styles.itemPrice}>
          <Text>{item?.total_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
        </Text>
      </View>
      <View style={styles.status}>
        <TouchableOpacity
          disabled={isPending}
          style={styles.cancelText}
          onPress={() => mutate({ id: item.id, status: 'CHO_LAY_HANG' })}
        >
          <Text style={styles.cancelText}> Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isPending}
          onPress={() => mutate({ id: item.id, status: 'DA_HUY' })}
          style={[styles.statusText]}
        >
          <Text style={styles.statusText}>Hủy</Text>
        </TouchableOpacity>
      </View>
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
            : <Text style={{ alignSelf: 'center', marginTop: 10 }}>Không có đơn chờ xác nhận nào cả!</Text>
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
  status: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 8,
  },

  cancelText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    color: 'white',
    borderRadius: 5,
    fontSize: 12,
    padding: 3,
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
  buttonText: {
    fontSize: 13,
  },
});

export default Wait_for_confirmation;
