import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import signupSchema from './validation';
import LoaderKit from 'react-native-loader-kit';

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import useLogin from '../../../Hooks/useLogin';
import { showMessage } from 'react-native-flash-message';
import { setUserAccessToken } from '../../../api/storage';

const SignIn: React.FC = ({ navigation, route }: any) => {
  const { mutation, errorMess } = useLogin();
  const [userCredentials, setUserCredentials] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const checkMess = async () => {
    if (mutation.isSuccess) {
      showMessage({
        message: 'Đăng nhập thành công!',
        type: 'success',
      });
    }
    if (mutation.isError) {
      showMessage({
        message: errorMess ? errorMess : "Không thể kết nối!",
        type: 'danger',
      });
    }
  };
  useEffect(() => {
    checkMess();
    if (mutation.isSuccess) {
      const func = async () => {
        const { token, user } = mutation.data.data;
        await setUserAccessToken({ token, user, isBuyer: false });
        // Nếu không, điều hướng tới màn hình chính
        if (user && user.role === 'seller') {
          return navigation.navigate('ShopSeller');
        }
        return navigation.navigate('Main');
      };
      func();
    }
  }, [mutation.isError, mutation.isSuccess, errorMess]);

  const handleChange = (field: string, value: string) => {
    setUserCredentials({
      ...userCredentials,
      [field]: value,
    });
    validateField(field, value);
  };

  const validateField = async (field: string, value: string) => {
    try {
      await yup.reach(signupSchema, field).validate(value);
      // Nếu không có lỗi, xóa lỗi của trường đó
      setErrors({
        ...errors,
        [field]: '',
      });
    } catch (error) {
      // Nếu có lỗi, cập nhật lỗi của trường đó
      if (error instanceof yup.ValidationError) {
        setErrors({
          ...errors,
          [field]: error.message,
        });
      }
    }
  };

  const handleSubmit = async () => {
    try {
      await signupSchema.validate(userCredentials, { abortEarly: false });
      if (errors?.email === '' && errors?.password === '') {
        try {
          mutation.mutate(userCredentials);
          if (mutation.isSuccess) {
            const { token, user } = mutation.data.data;
            await setUserAccessToken({ token, user });
          }
        } catch (error) {
          console.error('Error when login:', error);
        }
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.inner.forEach((err, index) => {
          setErrors({
            ...errors,
            [err.path]: err.message,
          });
        });
      }
    }
  };
  return (
    <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <View>
            <View>
              <Image
                resizeMode="contain"
                source={require('../../../assets/img_login_sigup/Logo-app.png')}></Image>
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={userCredentials.email}
            placeholderTextColor={'gray'}
            onChangeText={text => handleChange('email', text)}
          />
          <View style={styles.groupErr}>
            {errors?.email && <Text style={styles.error}>{errors?.email}</Text>}
          </View>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu"
            secureTextEntry
            placeholderTextColor={'gray'}
            value={userCredentials.password}
            onChangeText={text => handleChange('password', text)}
          />
          <View style={styles.groupErr}>
            {errors?.password && (
              <Text style={styles.error}>{errors?.password}</Text>
            )}
          </View>

          <TouchableOpacity
            disabled={mutation.isPending}
            onPress={handleSubmit}
            style={{
              padding: 10,
              margin: 20,
              width: '100%',
              alignItems: 'center',
              borderRadius: 15,
              backgroundColor: '#FFA000',
            }}>
            <View
              style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 24,
                  flex: 4,
                  textAlign: 'right',
                }}>
                {' '}
                Đăng Nhập
              </Text>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {mutation.isPending ? (
                  <LoaderKit
                    style={{ width: 20, height: 20 }}
                    name={'BallPulse'}
                    color={'white'}
                  />
                ) : null}
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
            <Text
              style={{
                color: 'black',
                fontSize: 15,
                textAlign: 'right',
                marginBottom: 10
              }}>
              Bạn quên mật khẩu ư?
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              margin: 10,
            }}>
            <Text style={{ color: '#012345' }}>Bạn chưa có tài khoản?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={{ color: '#FFA000' }}> Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    color: 'black',
    fontSize: 14,
  },
  error: {
    marginLeft: 5,
    color: 'red',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },

  groupErr: {
    height: 30,
    alignSelf: 'flex-start',
  },
});

export default SignIn;
