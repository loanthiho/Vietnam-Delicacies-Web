import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

const ChatHeader = ({itemName, itemImage, onlineStatus}) => {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Icon
          name="chevron-back-outline"
          size={26}
          color={'#fff'}
          onPress={() => {
            navigation.navigate('Notification');
          }}></Icon>
      </TouchableOpacity>
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile}>
          <Image style={styles.image} source={{uri: itemImage}} />
          {/* <Image style={styles.image} source={itemImage} /> */}
          <View style={styles.usernameAndOnlineStatus}>
            <Text style={styles.username}>{itemName}</Text>
            <Text style={styles.onlineStatus}>{onlineStatus}</Text>
          </View>
        </TouchableOpacity>
        {/* <View style={styles.options}>
          <TouchableOpacity
            style={{paddingHorizontal: 5, flexDirection: 'row', gap: 10}}>
            <Icon name="call-outline" size={26} color={'#fff'}></Icon>
            <Icon
              name="ellipsis-vertical-outline"
              size={26}
              color={'#fff'}></Icon>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffa000',
    paddingTop: 10,
    paddingBottom: 6,
  },
  backButton: {
    paddingHorizontal: 10,
    alignSelf: 'center',
  },
  profileOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 4,
  },

  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  usernameAndOnlineStatus: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  onlineStatus: {
    color: '#fff',
    fontSize: 12,
  },
  // options: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   justifyContent: 'flex-end',
  //   alignItems: 'center',
  // },
});
