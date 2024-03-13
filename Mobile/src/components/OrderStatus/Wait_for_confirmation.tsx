import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { TouchableOpacity } from 'react-native-gesture-handler'; 

const Wait_for_confirmation = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="file-document-edit" style={styles.icon} /> 
      <Text style={styles.text}>Chưa có đơn hàng nào</Text> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 10,
    color:'#FFA000'
  },
  icon: {
    color:'#FFA000',
    fontSize:70,
  },
});

export default Wait_for_confirmation;
