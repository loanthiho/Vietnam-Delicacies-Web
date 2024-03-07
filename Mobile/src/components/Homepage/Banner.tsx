import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {SliderBox} from 'react-native-image-slider-box';

const Banner = () => {
  const data = [
    require('../../assets/banner/chicken.jpg'),
    require('../../assets/banner/mix.jpg'),
    require('../../assets/banner/thanhlong.jpg'),
    require('../../assets/banner/scatteredfruit.jpg'),
    require('../../assets/banner/shrimp.jpg'),
  ];

  return (
    <View style={styles.banner}>
      <SliderBox
        images={data}
        autoplay={true}
        dotColor="#ffa000"
        autoplayInterval={3000}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 15,
          marginHorizontal: 0,
          padding: 0,
          margin: 0,
          backgroundColor: 'rgba(128, 128, 128, 0.92)',
        }}
        circleLoop={true}
        paginationBoxVerticalPadding={10}></SliderBox>
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
    overflow: 'hidden',
  },
});

export default Banner;
