
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LogOut } from '../api/storage';
import { useQuery } from '@tanstack/react-query';
import api from '../api/request';

const ChatScreen = () => {
  // LogOut();
  // const { } = useQuery({
  //   queryKey: ['getCart'],
  //   queryFn: async () => {
  //     try {
  //       const Rcarts = await api.get('carts');
  //       if (Rcarts) {
  //         console.log("carts data:", Rcarts.data);
  //       }

  //       return Rcarts.data;
  //     } catch (error) {
  //       console.log("err:", error);
  //     }
  //   }
  // })
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Food HomePagee!</Text>
      <TouchableOpacity

      >
        <Text style={{ fontSize: 20, fontWeight: '700' }}> Fetch data Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ChatScreen;
