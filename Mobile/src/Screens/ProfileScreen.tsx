import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ProfileScreen = ({ navigation }: any) => {
  const [checkBox, setCheckBox] = useState<boolean>();

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={require('../assets/huong.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.profileDetails}>
          <Text style={styles.text}>Huong</Text>
          <Text style={styles.text}> 0123456789</Text>
        </View>
        <TouchableOpacity style={styles.editIconContainer}>
        <AntDesign name="edit" style={styles.IconEdit} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  editIconContainer: {
    marginRight: 10,
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
  profileDetails: {
    marginLeft: 10,
  },
  IconEdit:{
  fontSize: 20,
  color:'#2E7D32',

  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});

export default ProfileScreen;
