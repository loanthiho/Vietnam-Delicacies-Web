import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Review = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Review screen</Text>
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

export default Review;
