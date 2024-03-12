import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Waiting_confirmation = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chờ giao hàng</Text>
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

export default Waiting_confirmation;
