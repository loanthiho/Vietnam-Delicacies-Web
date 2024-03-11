import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { setUserAccessToken } from '../../api/storage';
import { useMutation } from '@tanstack/react-query';
import api from '../../api/request';
import LoaderKit from 'react-native-loader-kit';
import { showMessage } from 'react-native-flash-message';

const Contact = ({ route, navigation }) => {
  const { userInfo, setUserInfo, oldUserData } = route.params;
  const [userInfoL1, setUserInfoL1] = useState({ ...userInfo })

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = (await api.patch(`users/${oldUserData?.user?.id}`, { data })).data;
      return res
    },
    onSuccess: async (data, variable) => {
      await setUserAccessToken({ token: oldUserData.token, user: data.data });
      setUserInfo(data.data);
      showMessage({
        style: {
          width: '99%', padding: 20,
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          alignSelf: 'center',
          alignItems: 'center'
        },
        position: 'top',
        message: data.msg,
        type: 'success',
        animated: true
      })
      return navigation.goBack();
    },
    onError: (err, vari) => showMessage({
      style: { width: '99%', padding: 20, borderBottomEndRadius: 20, borderBottomStartRadius: 20, alignSelf: 'center', alignItems: 'center' },
      position: 'top',
      message: err.response?.data?.error,
      type: 'danger',
      animated: true
    })
  })

  const onChange = (field, value) => {
    setUserInfoL1({
      ...userInfoL1,
      [field]: value
    })
  }

  const save = async () => {
    mutation.mutate(userInfoL1);
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
      </TouchableOpacity>

      <Text style={styles.label}>Họ và Tên</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập họ và tên"
        value={userInfoL1?.name}
        onChangeText={(text) => onChange('name', text)}
      />

      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        value={userInfoL1?.phone_number}
        onChangeText={(text) => onChange('phone_number', text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        style={[styles.input]}
        placeholder="Nhập địa chỉ"
        multiline={true}
        value={userInfoL1?.detail_address}
        onChangeText={(text) => onChange('detail_address', text)}
      />
      <TouchableOpacity
        style={[styles.saveButton, mutation.isPending ? { opacity: 0.5 } : null]}
        onPress={save}
        disabled={mutation.isPending ? true : false}
      >
        <Text style={styles.saveButtonText}>Lưu thông tin</Text>
        {
          mutation.isPending ?
            <LoaderKit
              style={{ width: 20, height: 20 }}
              name={'BallPulse'} // Optional: see list of animations below
              color={'white'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
            />
            : null
        }
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#FFA000',
    fontWeight: 'bold',
  },
  input: {
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,

  },
  saveButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  arrowLeft: {
    fontSize: 30,
    color: 'black',
    marginBottom: 20,
  },
});

export default Contact;
