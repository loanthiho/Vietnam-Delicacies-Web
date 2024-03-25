import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getUserAccessToken } from '../../api/storage';

const AddressComponent = ({ navigation, userInfo, setUserInfo }: any) => {
  const [oldUserData, setOldUserData] = useState({});
  const getUserData = async () => {
    const userATK = await getUserAccessToken();
    if (userATK) {
      setOldUserData(userATK);
      setUserInfo(userATK.user);
    }
  }
  useEffect(() => {
    getUserData();
  }, [navigation]);
  return (
    <View>
      {
        userInfo?.phone_number &&
          userInfo?.detail_address
          ? (
            <View style={styles.addressContainer}>
              <Text style={styles.title}>Địa chỉ nhận hàng</Text>
              <View style={styles.AddressInfo}>
                <View>
                  <Text style={styles.AddressNum}>{userInfo?.name}</Text>
                  <Text style={styles.AddressNum}>{userInfo?.phone_number}</Text>
                  <Text style={styles.Address}>{userInfo?.detail_address}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate({
                  name: 'Contact',
                  params: {
                    userInfo: userInfo,
                    oldUserData: oldUserData,
                    setUserInfo: setUserInfo
                  }
                })}>
                  <Ionicons style={styles.AddressIcon} name="chevron-forward-outline" />
                </TouchableOpacity>
              </View>
            </View>
          )
          : (
            <TouchableOpacity
              style={styles.AddressAdd}
              onPress={() => navigation.navigate({
                name: 'Contact',
                params: {
                  userInfo: userInfo,
                  oldUserData: oldUserData,
                  setUserInfo: setUserInfo
                }
              })}>
              <Text style={{ color: userInfo.user?.detail_address ? null : 'red' }}>Thêm thông tin nhận hàng</Text>
              <AntDesign name="pluscircle" size={24} color="#FFA000" />
            </TouchableOpacity>
          )}
    </View>
  );
};

const styles = StyleSheet.create({
  addressContainer: {
    // paddingBottom: 20,
    marginTop:10,
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
    // marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  AddressAdd: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#CCCCCC',
    borderRadius: 10,
    marginBottom: 20,
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
