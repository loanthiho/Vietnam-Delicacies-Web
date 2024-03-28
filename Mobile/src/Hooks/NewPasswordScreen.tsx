import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, TouchableOpacity, Text, Image } from 'react-native'; // Added StyleSheet import
import api from '../api/request';
import { showMessage } from 'react-native-flash-message';
import LoaderKit from 'react-native-loader-kit';

const NewPasswordScreen = ({ route, navigation }: any) => {
  const { data } = route.params;
  const [password, setPassword] = useState('');

  const mutation = useMutation({
    mutationKey: ['changePassword'],
    mutationFn: async (data) => {
      console.log("data _________________-", data)
      const changePass = await api.post(`users/change-password`, { auth: false, data: data });
      return changePass.data.data;
    },
    onSuccess: (data, variable) => {
      console.log("data update success:", data)
      showMessage({
        type: "success",
        message: "Thay đổi mật khẩu thành công!"
      })
      return navigation.navigate('SignIn');
    },
    onError: (error, variable) => {
      console.log("error when update password", error.response?.data);
      return showMessage({
        type: "danger",
        message: error.response.data.message
      })
    }
  });
  console.log("data send from email finded:", data);

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    if (password.trim() === '') {
      Alert.alert('', 'Vui lòng nhật mật khẩu mới!');
      return;
    }
    const dataToPost = {
      email: data?.email,
      newPassword: password
    }
    mutation.mutate(dataToPost)
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} resizeMode="contain" source={require('../assets/img_login_sigup/Logo-app.png')}></Image>
      </View>
      <TextInput
        placeholder="Nhập mật khẩu mới "
        secureTextEntry={true}
        onChangeText={handlePasswordChange}
        value={password}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button}
        onPress={handleSubmit}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? (
          <LoaderKit
            style={{ width: 35, height: 35, alignSelf: 'center' }}
            name={'BallPulse'}
            color={'white'}
          />
        ) : <Text style={styles.buttonText}>Đổi mật khẩu</Text>
        }

      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignSelf: 'flex-start',
    bottom: '50%',
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    bottom: '10%',
    marginBottom: '10%',
  },
  button: {
    backgroundColor: '#2E7D32',
    padding: 10,
    borderRadius: 10,
    width: '50%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NewPasswordScreen;
