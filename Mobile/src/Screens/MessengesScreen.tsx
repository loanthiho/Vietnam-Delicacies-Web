import {View, Text} from 'react-native';
import React from 'react';
import ChatHeader from './Messenges/ChatHeader';
import MessageList from './Messenges/MessageList';
import ChatInput from './Messenges/ChatInput';

const MessengesScreen = ({route}: any) => {
  const {itemId, itemName, itemImage} = route.params;
  return (
    <View style={{flex: 1}}>
      <ChatHeader
        onPress={() => {}}
        itemName={itemName}
        itemImage={itemImage}
        onlineStatus={'Online'}
      />
      <MessageList />
      <ChatInput />
    </View>
  );
};

export default MessengesScreen;
