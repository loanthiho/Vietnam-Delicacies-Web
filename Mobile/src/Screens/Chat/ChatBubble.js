import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const ChatBubble = ({role, text}) => {
  return (
    <View
      style={[
        styles.chatItem,
        role === 'user' ? styles.userChatItem : styles.modelChatItem,
      ]}>
      <Text
        style={[role === 'user' ? styles.chatTextuser : styles.chatTextmodel]}>
        {text}
      </Text>
    </View>
  );
};

export default ChatBubble;

const styles = StyleSheet.create({
  chatItem: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '70%',
    position: 'relative',
  },

  userChatItem: {
    alignSelf: 'flex-end',
    backgroundColor: '#2E7D32',
  },
  modelChatItem: {
    alignSelf: 'flex-start',
    backgroundColor: '#D9D9D9',
  },

  chatTextuser: {
    color: '#fff',
  },

  chatTextmodel: {
    fontSize: 16,
    color: '#000',
  },

  speakerIcon: {
    position: 'absolute',
    bottom: 5,
    top: 5,
  },
});
