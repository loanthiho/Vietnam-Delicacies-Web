import React, {useState, useEffect} from 'react';
import ChatBubble from './ChatBubble';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setErrors] = useState(null);

  const API_KEY = 'AIzaSyCiUgjyar16ZGctkkEyxV69XKHgRZEgzjU';

  const handleUserInput = async () => {
    // add use inputto chart
    let updateChat = [
      ...messages,
      {
        role: 'user',
        parts: [{text: userInput}],
      },
    ];
    setLoading(true);
    try {
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: updateChat,
        },
      );
      console.log('gọi api ', response.data);
      // setLoading(false);
      const modelResponse =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

      if (modelResponse) {
        // add mobile response
        const updateChatWithModel = [
          ...updateChat,
          {
            role: 'model',
            parts: [{text: modelResponse}],
          },
        ];
        setMessages(updateChatWithModel);
        setUserInput('');
        // setLoading(false);
      }
    } catch (error) {
      console.log('error calling Gemini API: ', error);
      console.log('error response: ', error.response);
      setErrors('An error occcured. please try again');
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = async text => {
    console.log('isSpeaking', isSpeaking);
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      if (!(await isSpeaking())) {
        speak(text);
        setIsSpeaking(true);
      }
    }
  };

  const renderChatItem = ({item}) => (
    <ChatBubble
      role={item.role}
      text={item.parts[0].text}
      onSpeech={() => handleSpeech(item.parts[0].text)}
    />
  );

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 22,
          color: '#ffa000',
          marginBottom: 20,
        }}>
        Chat VnD
      </Text>
      <FlatList
        data={messages}
        renderItem={renderChatItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nhập tin nhắn..."
          onChangeText={setUserInput}
          value={userInput}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        <TouchableOpacity style={styles.button} onPress={handleUserInput}>
          {loading ? (
            <ActivityIndicator size={23} color={'#fff'} />
          ) : (
            <Ionicons name="send-outline" size={23} color={'#fff'} />
          )}
        </TouchableOpacity>
      </View>

      {error && <Text style={styles.error} color={'#333'} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  chatContainer: {flexGrow: 1, justifyContent: 'flex-end'},
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  input: {
    paddingLeft: 25,
    color: '#000',
    flex: 3,
    height: 55,
    fontSize: 15,
    backgroundColor: '#F3F4F6',
    alignSelf: 'center',
    borderRadius: 30,
    marginRight: 10,
    elevation: 5,
  },

  button: {
    backgroundColor: '#ffa000',
    borderRadius: 50,
    height: 55,
    width: 55,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  buttonText: {color: '#fff', textAlign: 'center'},

  loading: {
    marginTop: 10,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});

export default ChatBox;
