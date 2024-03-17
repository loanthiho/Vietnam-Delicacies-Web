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

import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Text, Image, FlatList, StyleSheet, Pressable} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const Wait_for_confirmation = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Nem chua Thanh Hoá',
      price: 150000,
      Files: [
        {
          src: 'https://i.pinimg.com/564x/6a/9a/12/6a9a122a60a435725152db7a6632da58.jpg',
        },
      ],
    },
    {
      id: 2,
      name: 'Gạo đen Tây Bắc',
      price: 300000,
      Files: [
        {
          src: 'https://i.pinimg.com/736x/8d/98/1e/8d981eadabf77f64baad46aac7279241.jpg',
        },
      ],
    },
    {
      id: 2,
      name: 'Gạo đen Tây Bắc',
      price: 300000,
      Files: [
        {
          src: 'https://i.pinimg.com/736x/8d/98/1e/8d981eadabf77f64baad46aac7279241.jpg',
        },
      ],
    },
  ]);

  const renderItem = ({item}: any) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{uri: item.Files?.[0]?.src}} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
        </Text>
      </View>
      <View style={styles.status}>
        <TouchableOpacity style={styles.cancelText}>
          <Text style={styles.cancelText}> Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.statusText}>
          <Text style={styles.statusText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={cartItems} renderItem={renderItem} />
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
    backgroundColor: '#ffa000',
    color: 'white',
    borderRadius: 5,
    fontSize: 12,
    padding: 2,
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
