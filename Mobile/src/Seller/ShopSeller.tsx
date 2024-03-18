import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getUserAccessToken} from '../api/storage';

const ShopSeller = ({navigation}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>();

  const getUserData = async () => {
    const userInfoOld = await getUserAccessToken();
    console.log('user:', userInfoOld.user);
    if (userInfoOld.user) {
      setUserInfo(userInfoOld.user);
      setIsLoggedIn(true);
    } else {
      setUserInfo(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text style={styles.Subtitle}>Cửa hàng của tôi</Text>
        <View style={{position: 'relative'}}>
          <Text
            style={{
              position: 'absolute',
              right: 0,
              bottom: 18,
              fontWeight: 'bold',
              fontSize: 10,
              color: '#ffa000',
            }}>
            1
          </Text>
          <Ionicons
            onPress={() => navigation.navigate('Notification')}
            name="notifications-outline"
            style={styles.IconNoti}></Ionicons>
        </View>
      </View>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={
              userInfo?.avatar
                ? {uri: userInfo.avatar}
                : require('../assets/huong.jpg')
            }
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.profileDetails}>
          <Text style={styles.textName}>{userInfo?.name}</Text>
          <Text style={styles.phoneNumber}>(84+){userInfo?.phone_number}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ProductScreen')}>
          <Text style={{color: '#ffa000'}}>Xem cửa hàng</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.orderStatus} horizontal={true}>
        <TouchableOpacity
          style={styles.iconTextContainer}
          onPress={() =>
            navigation.navigate({
              name: 'OrderScreenSeller',
            })
          }>
          <MaterialCommunityIcons
            name="timer-settings-outline"
            style={styles.iconStatus}
          />
          <Text style={styles.textStatus}>Chờ xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconTextContainer}
          onPress={() =>
            navigation.navigate({
              name: 'OrderScreenSeller',
            })
          }>
          <AntDesign name="inbox" style={styles.iconStatus} />
          <Text style={styles.textStatus}>Đã xác nhận</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconTextContainer}
          onPress={() =>
            navigation.navigate({
              name: 'OrderScreenSeller',
            })
          }>
          <MaterialCommunityIcons
            name="truck-delivery-outline"
            style={styles.iconStatus}
          />
          <Text style={styles.textStatus}>Đang giao hàng</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconTextContainer}
          onPress={() =>
            navigation.navigate({
              name: 'OrderScreenSeller',
            })
          }>
          <MaterialCommunityIcons
            name="checkbox-outline"
            style={styles.iconStatus}
          />
          <Text style={styles.textStatus}>Thành công</Text>
        </TouchableOpacity>
      </ScrollView>
      <View>
        <Text style={styles.titleStatistical}>Thống kê</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.statisticsNumber}> 10</Text>
            <Text style={styles.statisticTitle}> Đã bán</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.statisticsNumber}> 10</Text>
            <Text style={styles.statisticTitle}> Đơn hàng của bạn</Text>
          </View>
          <View>
            <Text style={styles.statisticsNumber}> 10</Text>
            <Text style={styles.statisticTitle}> Đã hủy</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AppInf');
        }}>
        <View style={styles.info}>
          <Text style={styles.introductionText}>Thông tin ứng dụng</Text>
          <TouchableOpacity>
            <AntDesign
              onPress={() => {
                navigation.navigate('AppInf');
              }}
              name="right"
              style={styles.iconStatus}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Help');
        }}>
        <View style={styles.info}>
          <Text style={styles.introductionText}>Trợ giúp</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Help');
            }}>
            <AntDesign name="right" style={styles.iconStatus} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('AccSeller');
        }}>
        <View style={styles.info}>
          <Text style={styles.introductionText}>Thiết lập tài khoản</Text>
          <TouchableOpacity>
            <AntDesign
              onPress={() => {
                navigation.navigate('AccSeller');
              }}
              name="right"
              style={styles.iconStatus}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('AddProduct');
        }}>
        <Text style={styles.btnTitle}>Đăng sản phẩm</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
    borderColor: '#FFA000',
    borderWidth: 2,
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
  profileDetails: {
    flex: 1,
    marginLeft: 10,
  },
  IconEdit: {
    fontSize: 20,
    color: '#2E7D32',
  },

  textName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#2E7D32',
  },
  phoneNumber: {
    fontSize: 12,
    marginBottom: 5,
  },

  titleStatistical: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
    marginTop: 15,
    color: '#2E7D32',
  },

  statisticsNumber: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#ffa000',
    color: 'white',
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingRight: 12,
  },

  statisticTitle: {
    color: '#2E7D32',
    marginBottom: 10,
  },

  iconGiff: {
    marginRight: 10,
    color: '#2E7D32',
    fontSize: 24,
  },
  introductionText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: 'black',
  },
  icon: {
    color: '#2E7D32',
    fontSize: 24,
  },

  orderStatus: {
    marginTop: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#2E7D32',
    maxHeight: 55,
  },

  iconStatus: {
    marginRight: 5,
    color: '#2E7D32',
    fontSize: 20,
  },

  btn: {
    marginTop: 25,
  },

  btnTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    padding: 12,
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    elevation: 2,
    marginHorizontal: 15,
  },

  textStatus: {
    marginRight: 10,
    fontSize: 13,
  },
  loginButton: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLogin: {
    marginHorizontal: 5,
    fontSize: 13,
    textAlign: 'center',
  },
  IconLogin: {
    fontSize: 20,
    color: '#2E7D32',
  },

  iconTextContainer: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    margin: 3,
  },

  Subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  IconNoti: {
    fontSize: 26,
    color: '#2E7D32',
  },
});

export default ShopSeller;
