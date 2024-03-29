// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
// import { TouchableOpacity } from 'react-native-gesture-handler'; 

// const Wait_for_confirmation = () => {
//   return (
//     <View style={styles.container}>
//       <MaterialCommunityIcons name="file-document-edit" style={styles.icon} /> 
//       <Text style={styles.text}>Chưa có đơn hàng nào</Text> 
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 13,
//     fontWeight: 'bold',
//     marginTop: 10,
//     color:'#FFA000'
//   },
//   icon: {
//     color:'#FFA000',
//     fontSize:70,
//   },
// });

// export default Wait_for_confirmation;


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
import LoaderKit from 'react-native-loader-kit';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../../api/request';
import { useNavigation } from '@react-navigation/native';

const Wait_for_confirmation = () => {
  const navigation = useNavigation<any>();
  const queryClient = useQueryClient();
  const { data, isLoading, refetch: refetchOrder } = useQuery({
    queryKey: ['get_order_CHO_XAC_NHAN'],
    queryFn: async () => {
      const res = await api.get('orders', { params: { status: "CHO_XAC_NHAN" } });
      if (res) {
        return res.data?.data;
      }
    },
  });
  const mutation = useMutation({
    mutationKey: ['customer_cancel_order'],
    mutationFn: async (id: string) => (await api.patch(`orders/${id}`, { params: { status: 'DA_HUY' } })).data?.data,
    onSuccess: async (data, vari) => {
      await queryClient.invalidateQueries({
        queryKey: ['get_order_CHO_XAC_NHAN'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['get_order_DA_HUY'],
      });
    }
  });

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchOrder()
      console.log('wait delivery Screen is focused!');
    });

    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }: any) => (
    <View key={item.id.toString()} style={styles.itemContainer}>
      <Image source={{ uri: item.Product?.Files[0]?.src }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.Product?.name}</Text>
        <Text style={styles.itemPrice}>{item?.total_price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
      </View>
      <View style={styles.status}>
        <TouchableOpacity style={styles.waiting}>
          <Text style={styles.cancelText}> Chờ xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={mutation.isPending ? true : false}
          onPress={() => mutation.mutate(item.id)}
        >
          <Text style={styles.statusText}>Huỷ đơn hàng</Text>
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
            <View style={{ flexDirection: 'row', columnGap: 10, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', }}>
              <Text style={{ color: 'green' }}>Hủy</Text>
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
  },
  waiting: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
  },
  cancelText: {
    color: 'green',
    borderRadius: 5,
    fontSize: 12,

    textAlign: 'center',
  },
  statusText: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 5,
    padding: 5,
    fontSize: 12,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 13,
  },
});

export default Wait_for_confirmation;


