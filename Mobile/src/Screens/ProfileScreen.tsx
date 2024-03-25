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
import {useMutation, useQuery} from '@tanstack/react-query';
import api from '../api/request';
import {SwipeListView} from 'react-native-swipe-list-view';

const ProfileScreen = ({navigation}: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<any>();
  const [oldUserInfo, setOldUserInfo] = useState<any>();
  const [cartItems, setCartItems] = useState<any[]>([]);

  const getUserData = async () => {
    const userInfoOld = await getUserAccessToken();
    if (userInfoOld.user) {
      setUserInfo(userInfoOld.user);
      setIsLoggedIn(true);
      setOldUserInfo(userInfoOld);
    } else {
      setUserInfo(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('Profile Screen is focused!');
      getUserData();
    });
    return unsubscribe;
  }, [navigation]);

  const {
    data,
    isLoading,
    refetch: refetchOrder,
  } = useQuery({
    queryKey: ['get_order_CHO_DANH_GIA'],
    queryFn: async () => {
      const res = await api.get('orders', {params: {status: 'CHO_DANH_GIA'}});
      if (res) {
        return res.data?.data;
      }
    },
  });

  const {
    isPending: removePending,
    error,
    isSuccess,
    mutate: removeOrder,
  } = useMutation({
    mutationKey: ['remove_received_order'],
    mutationFn: async (id: string) =>
      (await api.delete(`orders/${id}`)).data?.data,
  });

  const deleteItem = async (itemId: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    removeOrder(itemId);
    setCartItems(updatedCartItems);
    refetchOrder();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetchOrder();
      console.log('wait delivery Screen is focused!');
    });

    return unsubscribe;
  }, [navigation]);

  console.log('Dtaa', data);

  const renderItemHistory = ({item}: any) => (
    <TouchableOpacity key={item.id} style={styles.itemContainer}>
      <Image
        source={{uri: item.Product?.Files?.[0]?.src}}
        style={styles.itemImage}
      />
      <View style={styles.content}>
        <Text numberOfLines={1} style={styles.itemText}>
          {item.Product?.name}
        </Text>
        <Text numberOfLines={1} style={styles.messenger}>
          {item.Product?.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          đ
        </Text>
      </View>
    </TouchableOpacity>
  );
  const renderHiddenItem = ({item}: any) => (
    <View>
      <TouchableOpacity
        disabled={removePending}
        style={[styles.backRightBtn]}
        onPress={() => deleteItem(item.id)}>
        <Text style={styles.backTextWhite}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#2E7D32',
          paddingBottom: 10,
        }}>
        THÔNG TIN CÁ NHÂN
      </Text>
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
              params: {userInfo, setUserInfo, oldUserInfo},
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

      <Text style={{fontSize: 16, fontWeight: 'bold', color: '#2E7D32'}}>
        Lịch sử đơn hàng
      </Text>

      <SwipeListView
        data={data}
        renderItem={renderItemHistory}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-60}
      />

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
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#2E7D32',
    flexShrink: 0,
    flexGrow: 0,
    paddingBottom: 5,
  },

  iconTextContainer: {
    alignItems: 'center',
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

  info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
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
    textAlign: 'center',
    margin: 10,
  },

  itemContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 10,
    padding: 10,
    paddingRight: 20,
    borderColor: 'white',
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },

  content: {
    alignSelf: 'center',
    gap: 10,
  },
  itemText: {
    marginRight: 50,
    fontSize: 16,
    borderRadius: 10,
    color: '#FFA000',
  },
  messenger: {
    marginRight: 40,
    fontSize: 14,
    borderRadius: 5,
    color: '#000',
  },

  arrowLeft: {
    fontSize: 20,
  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  Subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  backTextWhite: {
    color: '#fff',
    marginTop: 10,
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 40,
    paddingBottom: 40,
    backgroundColor: 'red',
    alignContent: 'center',
    alignSelf: 'flex-end',
    borderRadius: 10,
  },

  backRightBtn: {
    textAlign: 'right',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
