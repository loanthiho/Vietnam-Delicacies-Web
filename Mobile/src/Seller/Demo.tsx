import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Voice from '@react-native-voice/voice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Demo = () => {
  const [started, setStarted] = useState('');
  const [ended, setEnded] = useState('');
  const [results, setResults] = useState([]);
  useEffect(() => {
    // Voice.onSpeechStart = onSpeechStart;
    // Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  // const onSpeechStart = e => {
  //   console.log(e);
  //   setStarted('True');
  // };

  // const onSpeechEnd = e => {
  //   console.log(e);
  //   setEnded('True');
  // };

  const onSpeechResults = e => {
    console.log(e);
    setResults(e.value);
  };

  const startRecognizing = async () => {
    try {
      await Voice.start('vi-VN');
      setStarted('');
      setEnded('');
      setResults([]);
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
      await Voice.destroy();
      setStarted('');
      setEnded('');
      setResults([]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          color: 'black',
          alignSelf: 'center',
          marginTop: 20,
          fontSize: 20,
        }}>
        Voice to
      </Text>
      <TouchableOpacity
        style={{alignSelf: 'center', marginTop: 20}}
        onPress={() => {
          startRecognizing();
        }}>
        <Ionicons
          style={{fontSize: 50}}
          name="mic-outline"
          size={23}
          color={'#ffa000'}
        />
      </TouchableOpacity>
      <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Text>Started{started}</Text>
        <Text>Ended{ended}</Text>
      </View>
      <ScrollView horizontal>
        {results && results.length > 0 ? (
          results.map((item, index) => <Text key={index}>{item}</Text>)
        ) : (
          <Text>No results</Text>
        )}
      </ScrollView>
      <TouchableOpacity
        style={{
          width: '100%',
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'black',
          position: 'absolute',
          bottom: 0,
        }}
        onPress={() => {
          stopRecognizing();
        }}>
        <Text style={{color: 'white'}}>Stop Listening</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Demo;

const styles = StyleSheet.create({});
