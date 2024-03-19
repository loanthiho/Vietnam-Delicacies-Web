import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogOut, setUserAccessToken } from '../../api/storage';
import { useMutation } from '@tanstack/react-query';
import api from '../../api/request';
import LoaderKit from 'react-native-loader-kit';
import { showMessage } from 'react-native-flash-message';


const EditProfileScreen = ({ navigation, route }: any) => {
  const { userInfo, oldUserInfo, setUserInfo } = route.params;
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

  const mutation = useMutation({
    mutationKey: ['updateUserInfo'],
    mutationFn: async (data) => {
      const res = await api.patch(`users/${oldUserInfo.user?.id}`, { data: data });
      return res.data?.data;
    },
    onSuccess: async (data, variable) => {
      showMessage({
        type: 'success',
        message: 'Cập nhật thành công!'
      });
      await setUserAccessToken({ token: oldUserInfo?.token, user: data });
      setUserInfo({
        ...userInfo,
        name: data?.name,
        detail_address: data?.detail_address,
        phone_number: data?.phone_number,
        avatar: data?.avatar
      });
      setIsEditing(false);
    },
    onError: (error, variable) => {
      console.error("error update", error.response?.data)
      showMessage({
        type: 'danger',
        message: 'Lỗi cập nhật!'
      });
      setIsEditing(true);
    }
  })

  const handleSave = async () => {
    // Kiểm tra nếu tên chứa ký tự @
    if (name.includes('@')) {
      Alert.alert('Lỗi', 'Tên không được chứa ký tự @');
      return;
    }
    if (name.length <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập tên người dùng!');
      return;
    }

    // Kiểm tra nếu email chứa ký tự đặc biệt
    const regexSpecialCharacters = /[!#$%^&*()+\=\[\]{};':"\\|,<>\/?]/;
    if (regexSpecialCharacters.test(email)) {
      Alert.alert('Lỗi', 'Email không được chứa ký tự đặc biệt');
      return;
    }

    // Kiểm tra xem email có ít nhất một ký tự @ hay không
    if (!email.includes('@')) {
      Alert.alert('Lỗi', 'Email phải chứa ít nhất một ký tự @');
      return;
    }

    // Kiểm tra nếu số điện thoại không phải là số
    if (phone_number.toString().length <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại!');
      return;
    }
    if (detail_address.toString().length <= 0) {
      Alert.alert('Lỗi', 'Vui lòng nhập địa chỉ của bạn!');
      return;
    }
    if (isNaN(phone_number)) {
      Alert.alert('Lỗi', 'Số điện thoại phải là số');
      return;
    }
    if (isNaN(phone_number) || phone_number.length !== 10) {
      Alert.alert('Lỗi', 'Số điện thoại phải là số và có độ dài 10 chữ số');
      return;
    }
    const dataUpdate = {
      name: name,
      detail_address: detail_address,
      phone_number: phone_number
    }
    console.log("data update", dataUpdate)
    mutation.mutate(dataUpdate);
    setIsEditing(false);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.textNavigation}>Chỉnh sửa thông tin</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profileImageContainer}>
        <Image
          source={avatar ? { uri: avatar } : require('../../assets/huong.jpg')}
          style={styles.profileImage}
        />
      </TouchableOpacity>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <AntDesign name="user" style={styles.icon} />
          <TextInput
            placeholder="Tên"
            style={[styles.input, !isEditing ? { opacity: 0.5 } : null]}
            value={name}
            onChangeText={(text) => {
              if (isEditing) setName(text);
            }}
            editable={isEditing}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="email" style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={[styles.input, { opacity: 0.5 }]}
            value={email}
            onChangeText={(text) => {
              if (isEditing) setEmail(text);
            }}
            editable={false}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialCommunityIcons name="map-marker" style={styles.icon} />
          <TextInput
            placeholder="Địa chỉ"
            style={[styles.input, !isEditing ? { opacity: 0.5 } : null]}
            value={detail_address}
            onChangeText={(text) => {
              if (isEditing) setAddress(text);
            }}
            editable={isEditing}
          />
        </View>
        <View style={styles.inputContainer}>
          <AntDesign name="phone" style={styles.icon} />
          <TextInput
            placeholder="Số điện thoại"
            style={[styles.input, !isEditing ? { opacity: 0.5 } : null]}
            value={phone_number}
            onChangeText={(number) => {
              if (isEditing) setPhoneNumber(number);
            }}
            keyboardType="numeric"
            editable={isEditing}
            maxLength={10}
          />
        </View>
        <View style={styles.saveButtonTextContainer}>
          <TouchableOpacity
            disabled={mutation.isPending}
            onPress={isEditing ? handleSave : () => setIsEditing(true)}>
            {mutation.isPending ?
              (
                <LoaderKit
                  style={{ width: 35, height: 35 }}
                  name={'BallPulse'}
                  color={'green'}
                />
              )
              :
              <Text style={styles.saveButtonText}>
                {isEditing ? 'Lưu' : 'Chỉnh sửa'}
              </Text>}

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
  textNavigation: {
    fontSize: 15,
    bottom: 60,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginRight: '40%',
  },
  arrowLeft: {
    fontSize: 22,
    bottom: 80,
    right: 150,
    marginRight: 'auto',
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
    justifyContent: 'center',
    marginTop: 50,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#fff',
    paddingVertical: 13,
    paddingHorizontal: 70,
    borderRadius: 5,
    backgroundColor: '#2E7D32',
  },
});

export default EditProfileScreen;
