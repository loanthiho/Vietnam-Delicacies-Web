import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
const ChatInput = () => {
  const [message, setMessage] = useState('');
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
            onChangeText={text => setMessage(text)}
          />
          {/* <TouchableOpacity style={styles.rightIconButtonStyle}>
            <Ionicons name="attach-outline" size={23} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightIconButtonStyle}>
            <Ionicons name="camera-outline" size={23} />
          </TouchableOpacity> */}
        </View>

        <TouchableOpacity style={styles.sendButton}>
          <Ionicons
            name={message ? 'send-outline' : 'mic-outline'}
            size={23}
            color={'#fff'}
          />
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

  // rightIconButtonStyle: {
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: '#f0f0f0',
  //   paddingRight: 15,
  //   paddingLeft: 10,
  //   borderLeftWidth: 1,
  //   borderLeftColor: '#fff',
  // },

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
