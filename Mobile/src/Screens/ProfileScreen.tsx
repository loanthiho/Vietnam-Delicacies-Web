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
import {LogOut, getUserAccessToken} from '../api/storage';

const ProfileScreen = ({navigation}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>();

  const getUserData = async () => {
    const userInfoOld = await getUserAccessToken();
    console.log('user....:', userInfoOld.user);
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
          <Text style={styles.textEmail}>{userInfo?.email}</Text>
        </View>
          <TouchableOpacity
            style={styles.editIconContainer}
            onPress={() =>
              navigation.navigate({
                name: 'EditProfileScreen',
                params: {userInfo},
              })
            }>
            <AntDesign name="edit" style={styles.IconEdit} />
          </TouchableOpacity>
      </View>
      <View style={styles.introduction}>
        <AntDesign name="gift" style={styles.iconGiff} />
        <Text style={styles.introductionText}>
          Giới thiệu bạn bè nhận quà ngay
        </Text>
      </View>

      <ScrollView style={styles.orderStatus} horizontal={true}>
        <TouchableOpacity
          style={styles.iconTextContainer}
          onPress={() =>
            navigation.navigate({
              name: 'OrderScreen',
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
              name: 'OrderScreen',
            })
          }>
          <AntDesign name="inbox" style={styles.iconStatus} />
          <Text style={styles.textStatus}>Chờ lấy hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconTextContainer}
          onPress={() =>
            navigation.navigate({
              name: 'OrderScreen',
            })
          }>
          <MaterialCommunityIcons
            name="truck-delivery-outline"
            style={styles.iconStatus}
          />
          <Text style={styles.textStatus}>Chờ giao hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconTextContainer}
          onPress={() =>
            navigation.navigate({
              name: 'OrderScreen',
            })
          }>
          <AntDesign name="staro" style={styles.iconStatus} />
          <Text style={styles.textStatus}>Đánh giá</Text>
        </TouchableOpacity>
      </ScrollView>

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
      {userInfo?.role === 'seller' ? (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AccSetup');
          }}>
          <View style={styles.info}>
            <Text style={styles.introductionText}>Thiết lập tài khoản</Text>
            <TouchableOpacity>
              <AntDesign name="right" style={styles.iconStatus} />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ) : null}
      <TouchableOpacity onPress={() => LogOut(navigation)}>
        <Text style={styles.logoutButton}>Đăng xuất</Text>
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
  editIconContainer: {},
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
  textEmail: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  introduction: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
    flexDirection: 'column',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    margin: 3,
  },
  logoutButton: {
    marginLeft: 10,
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 16,
    color: '#fff',
    textAlign:'center',
    margin:10,
  },
});

export default ProfileScreen;
