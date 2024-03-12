import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getUserAccessToken} from '../api/storage';
const ProfileScreen = ({navigation}: any) => {
  const [checkBox, setCheckBox] = useState<boolean>();
  const [userInfo, setUserInfo] = useState<any>();
  const [oldUserInfo, setOldUserInfo] = useState<any>();

  const getUserData = async () => {
    const userInfoOld = await getUserAccessToken();
    console.log('user:', userInfoOld.user);
    if (userInfoOld.user) {
      setUserInfo(userInfoOld.user);
    } else {
      setUserInfo(null);
    }
  };
  useEffect(() => {
    getUserData();
    if (userInfo) {
      console.log('data user:', userInfo);
    }
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
              params: {userInfo, oldUserInfo, setUserInfo: setUserInfo},
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
        <TouchableOpacity>
          <AntDesign name="right" style={styles.iconStatus} />
        </TouchableOpacity>
      </View>
      <View style={styles.orderStatus}>
        <TouchableOpacity style={styles.iconTextContainer}>
          <MaterialCommunityIcons
            name="timer-settings-outline"
            style={styles.iconStatus}
          />
          <Text style={styles.textStatus}>Chờ xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTextContainer}>
          <AntDesign name="inbox" style={styles.iconStatus} />
          <Text style={styles.textStatus}>Chờ lấy hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTextContainer}>
          <MaterialCommunityIcons
            name="truck-delivery-outline"
            style={styles.iconStatus}
          />
          <Text style={styles.textStatus}>Chờ giao hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconTextContainer}>
          <AntDesign name="staro" style={styles.iconStatus} />
          <Text style={styles.textStatus}>Đánh giá</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.introductionText}>Cộng đông khách VnD</Text>
        <TouchableOpacity>
          <AntDesign name="right" style={styles.iconStatus} />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.introductionText}>Chia sẻ phản hồi</Text>
        <TouchableOpacity>
          <AntDesign name="right" style={styles.iconStatus} />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.introductionText}>Thông tin ứng dụng</Text>
        <TouchableOpacity>
          <AntDesign name="right" style={styles.iconStatus} />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.introductionText}>Trợ giúp</Text>
        <TouchableOpacity>
          <AntDesign name="right" style={styles.iconStatus} />
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <Text style={styles.introductionText}>Đã xem gần đây</Text>
        <TouchableOpacity>
          <AntDesign name="right" style={styles.iconStatus} />
        </TouchableOpacity>
      </View>

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
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#2E7D32',
    padding: 5,
  },
  iconStatus: {
    marginRight: 5,
    color: '#2E7D32',
    fontSize: 24,
  },
  textStatus: {
    marginRight: 10,
    fontSize: 13,
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
});

export default ProfileScreen;
