import {View, Text} from 'react-native';
import React from 'react';
import ChatHeader from '../MessageComponent/ChatHeader';
import MessageList from '../MessageComponent/MessageList';
import ChatInput from '../MessageComponent/ChatInput';

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
