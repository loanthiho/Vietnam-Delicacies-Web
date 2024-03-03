import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import signupSchema from './Validation';
import * as yup from 'yup';

const SignUp: React.FC = ({ navigation }: any) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    })
    validateField(field, value);
  }
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

  const handleSubmit = async (formData: any) => {
    try {
      await signupSchema.validate(formData, { abortEarly: false });

    } catch (error) {
      // validate the data ---------------------
      if (error instanceof yup.ValidationError) {
        const newErrors = {};
        error.inner.forEach(err => {
          newErrors[err.path] = err.message;
        });
        setErrors(newErrors);
      }
    }
  }

  return (
    // <ScrollView>
    <View style={{ flex: 1 }} source={require('../../../assets/img_login_sigup/background-sign-up.jpg')}>

      <View style={styles.container}>
        <View style={{}}>
          <View>
            <Image resizeMode='contain' source={require('../../../assets/img_login_sigup/Logo-app.png')}></Image>
          </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Tên người dùng"
          value={formData.name}
          onChangeText={(text) => handleChange('name', text)}
        />
        {errors?.name && <Text style={styles.error}>{errors?.name}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
        />
        {errors?.email && <Text style={styles.error}>{errors?.email}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
        />
        {errors?.password && <Text style={styles.error}>{errors?.password}</Text>}
        <Button title="Đăng Ký" onPress={handleSubmit} />

        <View style={{ flexDirection: 'row' }}>
          <Text style={{ width: '45%', borderBottomWidth: 1, borderColor: 'black', borderBottomRightRadius: 50 }}></Text>
          <Text>OR</Text>
          <Text style={{ width: '45%', borderBottomWidth: 1, borderColor: 'black', borderBottomLeftRadius: 50 }}></Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 20, marginTop: 10, marginBottom: 10 }}>
          <TouchableOpacity style={{ padding: 20, borderWidth: 1, borderColor: 'red', borderTopWidth: 1 }}>
            <Image style={{ width: 45, height: 45, borderRadius: 50, }} source={require('../../../assets/img_login_sigup/facebook.jpeg')} ></Image>
          </TouchableOpacity>

          <TouchableOpacity style={{ padding: 20, borderWidth: 1 }}>
            <Image style={{ width: 45, height: 45, borderRadius: 50, }} source={require('../../../assets/img_login_sigup/Google__G__logo.svg.png')} ></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

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
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 5,
  },
});

export default SignUp;