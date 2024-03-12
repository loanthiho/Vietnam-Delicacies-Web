import {View, Text} from 'react-native';
import React from 'react';
import ChatHeader from './Messenges/ChatHeader';
import MessageList from './Messenges/MessageList';
import ChatInput from './Messenges/ChatInput';

const MessengesScreen = ({navigation, route}) => {
  const {username, bio, picture, isBlocked, isMuted} = route.params;
  return (
    <View style={{flex: 1}}>
      <ChatHeader
        onPress={() => {}}
        username={username}
        picture={picture}
        onlineStatus={'Online'}
      />
      {/* <MessageList /> */}
      <ChatInput />
    </View>
  );
};

export default MessengesScreen;
