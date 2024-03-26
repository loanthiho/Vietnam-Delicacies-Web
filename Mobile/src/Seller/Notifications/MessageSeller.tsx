import {View, Text} from 'react-native';
import React, {useState} from 'react';
import ChatHeader from '../MessageComponent/ChatHeader';
import MessageList from '../MessageComponent/MessageList';
import ChatInput from '../MessageComponent/ChatInput';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import api from '../../api/request';

const MessengesScreen = ({route}: any) => {
  const {dataRoomChat} = route.params;
  const queryClient = useQueryClient();
    const [chatData, setChatData] = useState({
      chat_id: dataRoomChat.id,
      sender_id: dataRoomChat.sender_id,
      message: '',
    });

     const changeDataChat = (message: string) => {
       setChatData({
         ...chatData,
         message: message,
       });
     };

     const mutation = useMutation({
       mutationKey: ['chat'],
       mutationFn: async () => {
         const res = await api.post('chats/chat', {data: chatData});
         return res.data?.data;
       },
       onSuccess: (data, variable) => {
         queryClient.invalidateQueries({queryKey: ['fetchRoo']});
         setChatData({
           ...chatData,
           message: '',
         });
       },
     });
  return (
    <View style={{flex: 1}}>
      <ChatHeader
        itemName={dataRoomChat.Sender.name}
        itemImage={dataRoomChat.Sender.avatar}
        onlineStatus={'Online'}
      />
      <MessageList dataRoomChat={dataRoomChat} />
      <ChatInput
        changeDataChat={changeDataChat}
        chatDataMessage={chatData.message}
        mutation={mutation}
      />
    </View>
  );
};

export default MessengesScreen;
