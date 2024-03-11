import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {LogOut, setUserAccessToken} from '../../api/storage';
const EditProfileScreen = ({navigation, route}: any) => {
  const {userInfo, oldUserInfo, setUserInfo} = route.params;
  const [name, setName] = useState(route.params?.userInfo.name || '');
  const [email, setEmail] = useState(route.params?.userInfo.email || '');
  const [detail_address, setAddress] = useState(
    route.params?.userInfo.detail_address || '',
  );
  const [phone_number, setPhoneNumber] = useState(
    route.params?.userInfo.phone_number || '',
  );
  const [avatar, setAvatar] = useState(route.params?.userInfo.avatar || '');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    setUserInfo({
      ...userInfo,
      name,
      email,
      detail_address,
      phone_number,
      avatar,
    });
    await setUserAccessToken({token: oldUserInfo?.token, user: userInfo});
    setIsEditing(false);
    console.log('Thông tin đã được lưu:', {
      name,
      email,
      detail_address,
      phone_number,
      avatar,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileImageContainer}>
        <Image
          source={avatar ? {uri: avatar} : require('../../assets/huong.jpg')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <AntDesign name="user" style={styles.icon} />
          <TextInput
            placeholder="Tên"
            style={styles.input}
            value={name}
            onChangeText={text => {
              if (isEditing) setName(text);
            }}
            editable={isEditing}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={text => {
              if (isEditing) setEmail(text);
            }}
            editable={isEditing}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="map-marker" style={styles.icon} />
          <TextInput
            placeholder="Địa chỉ"
            style={styles.input}
            value={detail_address}
            onChangeText={text => {
              if (isEditing) setAddress(text);
            }}
            editable={isEditing}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="phone" style={styles.icon} />
          <TextInput
            placeholder="Số điện thoại"
            style={styles.input}
            value={phone_number}
            onChangeText={number => {
              if (isEditing) return setPhoneNumber(number);
            }}
            editable={isEditing}
          />
        </View>
        <View style={styles.saveButtonTextContainer}>
          <TouchableOpacity
            onPress={isEditing ? handleSave : () => setIsEditing(true)}>
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Lưu' : 'Chỉnh sửa'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => LogOut(navigation)}>
            <Text style={styles.logoutButton}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowLeft: {
    fontSize: 22,
    bottom: 80,
    right: 150,
  },
  profileImageContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  icon: {
    fontSize: 20,
    marginRight: 10,
    color: '#2E7D32',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  saveButtonTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#2E7D32',
  },
  logoutButton: {
    marginLeft: 10,
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 16,
    color: '#fff',
  },
});

export default EditProfileScreen;
