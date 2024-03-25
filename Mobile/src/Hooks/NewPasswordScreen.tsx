import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet,TouchableOpacity,Text,Image } from 'react-native'; // Added StyleSheet import

const NewPasswordScreen = () => {
  const [password, setPassword] = useState('');

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = () => {
    if (password.trim() === '') {
      Alert.alert('Error', 'Password cannot be empty');
    } else {
      Alert.alert('Success', 'Password updated successfully');
    }
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
      <TouchableOpacity style={styles.button}onPress={handleSubmit}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
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
    bottom:'50%',
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    bottom:'10%',
    marginBottom:'10%',
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
