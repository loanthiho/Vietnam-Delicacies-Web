
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const ProfileScreen = () => {
  const [checkBox, setCheckBox] = useState<boolean>();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Food HomePage!</Text>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
