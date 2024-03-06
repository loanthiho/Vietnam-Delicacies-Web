import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AddressComponent = ({navigation}) => {
  const [hasAddress, setHasAddress] = useState(false);
  const [contactInfo, setContactInfo] = useState(null);

  
  useEffect(() => {
    // Lấy thông tin liên hệ từ AsyncStorage
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
    <View>
      <View style={styles.addressContainer}>
        <Text style={styles.title}>Địa chỉ nhận hàng</Text>
        {hasAddress && contactInfo ? (
          <View style={styles.AddressInfo}>
            <View>
              <Text style={styles.AddressNum}>{contactInfo.fullName}</Text>
              <Text style={styles.AddressNum}>{contactInfo.phoneNumber}</Text>
              <Text style={styles.Address}>{contactInfo.address}</Text>
            </View>
            <TouchableOpacity onPress={() => {
              navigation.navigate('EditContact');
            }}>
              <Ionicons
                style={styles.AddressIcon}
                name="chevron-forward-outline"
              />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.AddressAdd}
            onPress={() => {
              navigation.navigate('Contact');
            }}>
            <View>
              <Text>Thêm thông tin nhận hàng </Text>
            </View>
            <AntDesign name="pluscircle" size={24} color="#FFA000" />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView></ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    paddingHorizontal: 1,
  },
  title: {
    paddingLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFA000',
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
    textAlign: 'center',
    paddingRight: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    borderRadius: 10,
    width: 310,
    height: 85,
  },
  AddressAdd: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginBottom: 10,
    width: 310,
    height: 70,
    padding: 10,
    margin: 10,
    right: 10,
  },
  TitleAddress: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  AddressNum: {
    fontSize: 16,
    left: 10,
  },
  Address: {
    fontSize: 16,
    left: 10,
  },
  AddressIcon: {
    fontSize: 20,
    alignSelf: 'center',
    top: 20,
    color: '#FFA000',
  },
});

export default AddressComponent;
