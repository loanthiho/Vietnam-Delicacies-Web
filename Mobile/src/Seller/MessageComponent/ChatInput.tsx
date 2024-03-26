import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Voice from '@react-native-voice/voice';
import LoaderKit from 'react-native-loader-kit';
const ChatInput = ({changeDataChat, chatDataMessage, mutation}: any) => {
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const [isRecognizing, setIsRecognizing] = useState(false);

  useEffect(() => {
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechResults = (e: any) => {
    console.log(e);
    setResults(e.value);
     changeDataChat(e.value.join(' '));
    setIsRecognizing(false);
  };

  const startRecognizing = async () => {
    try {
      setIsRecognizing(true);
      await Voice.start('vi-VN');
      setResults([]);
    } catch (error) {
      console.log(error);
      setIsRecognizing(false);
    }
  };

  const cancelRecoding = () => {
    setIsRecognizing(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.inputAndMicrophone}>
          <TouchableOpacity style={styles.emoticonButton}>
            <Ionicons name="happy-outline" size={23} />
          </TouchableOpacity>
          <TextInput
            multiline
            placeholder="Nhập tin..."
            style={styles.input}
            value={chatDataMessage}
            onChangeText={text => changeDataChat(text)}
          />
        </View>

        <TouchableOpacity
          onPress={() => mutation.mutate()}
          style={styles.sendButton}>
          {isRecognizing || mutation.ispending ? (
            <TouchableOpacity onPress={cancelRecoding}>
              <LoaderKit
                style={{width: 20, height: 20}}
                name={'BallPulse'}
                color={'#fff'}
              />
            </TouchableOpacity>
          ) : chatDataMessage ? (
            <Ionicons name="send-outline" size={23} color={'#fff'} />
          ) : (
            <Ionicons
              onPress={startRecognizing}
              name="mic-outline"
              size={23}
              color={'#fff'}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  innerContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },

  inputAndMicrophone: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    flex: 3,
    marginRight: 8,
    paddingVertical: Platform.OS === 'android' ? 6 : 0,
    borderRadius: 30,
    justifyContent: 'space-between',
  },

  input: {
    backgroundColor: 'transparent',
    paddingLeft: 18,
    color: '#000',
    flex: 3,
    height: 40,
    fontSize: 15,
    alignSelf: 'center',
  },

  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },

  sendButton: {
    backgroundColor: '#ffa000',
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
});

export default ChatInput;
