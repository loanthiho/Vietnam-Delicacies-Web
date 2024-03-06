
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LogOut } from '../api/storage';
import colors from '../ultils/_colors';


const ProfileScreen = ({ navigation }: any) => {
  const [checkBox, setCheckBox] = useState<boolean>();
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Welcome to Food HomePage!</Text> */}
      <TouchableOpacity
        style={{ padding: 15, backgroundColor: colors.green }}
        onPress={() => LogOut(navigation)}>
        <Text style={{ fontSize: 20, fontWeight: '700', color: 'white' }}> logOut</Text>
      </TouchableOpacity>
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
