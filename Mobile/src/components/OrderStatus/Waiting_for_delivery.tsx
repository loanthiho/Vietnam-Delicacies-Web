import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Wait_for_delivery = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Waiting_for_delivery screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Wait_for_delivery;
