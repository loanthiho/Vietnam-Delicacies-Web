import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const Banner = () => {
    return (
      <View style={styles.banner}>
        <Image
          source={require('../../assets/advertising.png')}
          style={styles.image}
        />
        <Text style={styles.advertise}>Đặc sản sạch ăn vào là mê</Text>
      </View>
    );
};

const styles = StyleSheet.create({
  banner: {
    width: '100%',
    height: 200,
    flexDirection: 'row',
    marginBottom: 10,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  advertise:{
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'absolute',
    right:0,
    top:80,
    width:180
  }
});

export default Banner;
