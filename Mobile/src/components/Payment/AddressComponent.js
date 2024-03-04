import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles from './styles';

const AddressComponent = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
      </TouchableOpacity>
      <Text style={styles.TitleAddress}>Địa chỉ nhận hàng</Text>
      <View style={styles.AddressInfo}>
        <View>
          <Text style={styles.AddressNum}>(+84) 035921510</Text>
          <Text style={styles.Address}>Lâm Thủy, Lệ Thủy, Quảng Binh </Text>
        </View>
        <Ionicons style={styles.AddressIcon} name="chevron-forward-outline" />
      </View>
    </View>
  );
};

export default AddressComponent;
