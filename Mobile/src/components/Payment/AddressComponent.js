import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddressComponent = ({ navigation }) => {
  const [hasAddress, setHasAddress] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const getContactInfo = async () => {
      try {
        const fullName = await AsyncStorage.getItem('fullName');
        const phoneNumber = await AsyncStorage.getItem('phoneNumber');
        const address = await AsyncStorage.getItem('address');

        if (fullName && phoneNumber && address) {
          setContactInfo({
            fullName,
            phoneNumber,
            address,
          });
          setHasAddress(true);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin liên hệ từ AsyncStorage:', error);
      }
    };

    getContactInfo();
  }, [navigation]);

  return (
    <View style={styles.container}>
      {hasAddress && contactInfo ? (
        <View style={styles.addressContainer}>
          <Text style={styles.title}>Địa chỉ nhận hàng</Text>
          <View style={styles.AddressInfo}>
            <View>
              <Text style={styles.AddressNum}>{contactInfo.fullName}</Text>
              <Text style={styles.AddressNum}>{contactInfo.phoneNumber}</Text>
              <Text style={styles.Address}>{contactInfo.address}</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('EditContact')}>
              <Ionicons style={styles.AddressIcon} name="chevron-forward-outline" />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.AddressAdd}
          onPress={() => navigation.navigate('Contact')}>
          <Text>Thêm thông tin nhận hàng</Text>
          <AntDesign name="pluscircle" size={24} color="#FFA000" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,

  },
  addressContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  AddressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  AddressAdd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    padding: 10,
  },
  TitleAddress: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  AddressNum: {
    fontSize: 16,
    paddingLeft: 10,
  },
  Address: {
    fontSize: 16,
    paddingLeft: 10,
  },
  AddressIcon: {
    fontSize: 20,
    alignSelf: 'center',
    top: 20,
    color: '#FFA000',
  },
});

export default AddressComponent;
