import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const EditContact = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [save,setSave]=useState(false)
  useEffect(() => {
    const getContactInfo = async () => {
      try {
        const storedFullName = await AsyncStorage.getItem('fullName');
        const storedPhoneNumber = await AsyncStorage.getItem('phoneNumber');
        const storedAddress = await AsyncStorage.getItem('address');

        if (storedFullName !== null) {
          setFullName(storedFullName);
        }
        if (storedPhoneNumber !== null) {
          setPhoneNumber(storedPhoneNumber);
        }
        if (storedAddress !== null) {
          setAddress(storedAddress);
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin liên hệ từ AsyncStorage:', error);
      }
    };

    getContactInfo();
  }, [navigation,handleSaveContact,save]);

  const handleSaveContact = async () => {
    try {
      await AsyncStorage.setItem('fullName', fullName);
      await AsyncStorage.setItem('phoneNumber', phoneNumber);
      await AsyncStorage.setItem('address', address);
      setSave(true)
      console.log('Thông tin liên hệ đã được lưu vào AsyncStorage.');
      navigation.navigate('PaymentScreen');
    } catch (error) {
      console.error('Lỗi khi lưu thông tin liên hệ vào AsyncStorage:', error);
      setSave(false)
    }
  };

  return (
    <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
        </TouchableOpacity>
      <Text style={styles.label}>Họ và Tên</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={(text) => setFullName(text)}
      />

      <Text style={styles.label}>Số điện thoại</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>Địa chỉ</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        value={address}
        onChangeText={(text) => setAddress(text)}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSaveContact}>
        <Text style={styles.saveButtonText}>Lưu thông tin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color:'#FFA000',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#2E7D32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    top:10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default EditContact;
