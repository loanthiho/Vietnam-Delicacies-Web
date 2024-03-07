import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
const SuccessfulPayment = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.contain}>
        <Ionicons name="checkmark-circle-sharp" size={100} color="#2E7D32" />
        <Text style={styles.title}>Thành công !</Text>
        <Text style={styles.message}>Cảm ơn bạn đã mua hàng!</Text>
        <TouchableOpacity 
          style={styles.GoBack} 
          onPress={() => navigation.navigate('Trang chủ')}>
          <Text style={styles.TextGoBack}>Trở về </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
  },
  contain: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  message: {
    fontSize: 18,
    color: '#333333',
  },
  GoBack: {
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    height: 50,
    width: 70,
    textAlign:'center',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 20,
    
  },
  TextGoBack:{
    color:'white',
  }
});

export default SuccessfulPayment;
