import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';


const Message = ({time, isLeft, message, onSwipe}) => {
  const startingPosition = 0;


  const isOnLeft = (type: string) => {
    if (isLeft && type === 'messageContainer') {
      return {
        alignSelf: 'flex-start',
        backgroundColor: '#f0f0f0',
        borderTopLeftRadius: 0,
      };
    } else if (isLeft && type === 'message') {
      return {
        color: '#000',
      };
    } else if (isLeft && type === 'time') {
      return {
        color: 'darkgray',
      };
    } else {
      return {
        borderTopRightRadius: 0,
      };
    }
  };



  return (
    <FlingGestureHandler
      direction={isLeft ? Directions.RIGHT : Directions.LEFT}
      onHandlerStateChange={({nativeEvent}) => {
        if (nativeEvent.state === State.ACTIVE) {
          onSwipe(message, isLeft);
        }
      }}>
      <View style={[styles.container]}>
        <View style={[styles.messageContainer, isOnLeft('messageContainer')]}>
          <View style={styles.messageView}>
            <Text style={[styles.message, isOnLeft('message')]}>{message}</Text>
          </View>
          <View style={styles.timeView}>
            <Text style={[styles.time, isOnLeft('time')]}>{time}</Text>
          </View>
        </View>
      </View>
    </FlingGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    maxWidth: '80%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
    backgroundColor: '#2E7D32',
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  message: {
    color: '#fff',
    alignSelf: 'flex-start',
    fontSize: 15,
  },
  time: {
    color: 'lightgray',
    alignSelf: 'flex-end',
    fontSize: 10,
  },
});

export default Message;
