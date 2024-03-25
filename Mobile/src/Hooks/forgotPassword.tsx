import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation(); 

  const handleResetPassword = () => {
    if (email.trim() === '') {
      Alert.alert('Vui lòng nhập địa chỉ email');
      return;
    }
    return navigation.navigate('NewPassword'); 
  };

  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.logo} resizeMode="contain" source={require('../assets/img_login_sigup/Logo-app.png')}></Image>
      </View>
      <Text style={styles.textForgot}>Tìm tài khoản </Text>
      <TextInput
        style={styles.input}
        placeholder="Nhập email của bạn "
        onChangeText={text => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Tìm kiếm</Text>
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
  textForgot: {
    bottom: '15%',
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2E7D32',
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    bottom: '12%',
    borderRadius: 10,
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

export default ForgotPasswordScreen;
