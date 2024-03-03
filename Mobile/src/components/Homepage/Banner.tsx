import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Banner = () => {
    return (
        <View style={styles.banner}>
            <Image source={require('../../assets/Image.png')} style={styles.image} />
        </View>
    );
};

const styles = StyleSheet.create({
    banner: {
        width: '100%',
        height: 200,
        backgroundColor: '#2E7D32',
        marginBottom: 10,
        borderRadius: 20,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 20,
    },
});

export default Banner;
