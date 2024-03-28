import React, {useState, useRef, useEffect} from 'react';
import {ScrollView} from 'react-native';

import Message from './Message';
import {useQuery} from '@tanstack/react-query';
import api from '../../api/request';
import {getUserAccessToken} from '../../api/storage';

const MessagesList = ({onSwipeToReply, dataRoomChat}: any) => {
  const [user, setUser] = useState();
  const scrollView = useRef();
  const [messages, setMessage] = useState([]);
  const {
    data,
    isLoading,
    refetch: refreshProductList,
  } = useQuery({
    queryKey: ['fetchRoo'],
    queryFn: async () => {
      try {
        const resFetchRoom = await api.get(
          `chats/get-message/${dataRoomChat.id}`,
        );
        if (resFetchRoom) {
          console.log('data in room chat list ', resFetchRoom);
          setMessage(resFetchRoom.data.data);
          return resFetchRoom.data.data;
        }
      } catch (error) {
        console.log(error?.response);
        setMessage([]);
        return [];
      }
    },
    refetchInterval: 3000,
  });

  const fetchUser = async () => {
    const {user} = await getUserAccessToken();

    if (user) {
      console.log('current usser', user);
      setUser(user);
    }
  };
  useEffect(() => {
    fetchUser();
    refreshProductList();
  }, [data]);

  useEffect(() => {
    refreshProductList();
  }, [data]);

  return (
    <ScrollView
      style={{backgroundColor: '#fff', flex: 1}}
      ref={ref => (scrollView.current = ref)}
      onContentChange={() => {
        scrollView.current.scrollToEnd({animated: true});
      }}>
      {messages &&
        messages.length > 0 &&
        messages.map((message, index) => (
          <Message
            key={index}
            isLeft={message?.sender_id !== user?.id}
            message={message?.message}
            onSwipe={onSwipeToReply}
          />
        ))}
    </ScrollView>
  );
};

export default MessagesList;
