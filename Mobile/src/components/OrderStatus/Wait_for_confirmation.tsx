import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Wait_for_confirmation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Wait for confirmation screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Wait_for_confirmation;
