import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatHeader = ({username, bio, picture, onlineStatus, onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Icon name="chevron-back-outline" size={30} color={'#fff'}></Icon>
      </TouchableOpacity>
      <View style={styles.profileOptions}>
        <TouchableOpacity style={styles.profile}>
          <Image style={styles.image} source={{uri: picture}} />
          <View style={styles.usernameAndOnlineStatus}>
            <Text style={styles.username}>{username}</Text>
            <Text style={styles.onlineStatus}>{onlineStatus}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.options}>
          <TouchableOpacity style={{paddingHorizontal: 5, flexDirection: "row", gap: 10}}>
            <Icon name="call-outline" size={30} color={'#fff'}></Icon>
            <Icon
              name="ellipsis-vertical-outline"
              size={30}
              color={'#fff'}></Icon>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ChatHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#ffa000',
    paddingTop: 20,
    paddingBottom: 10,
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
    paddingHorizontal: 10,
  },

  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 4,
  },

  image: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
  },
  usernameAndOnlineStatus: {
    flexDirection: 'column',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },

  username: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },

  onlineStatus: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
