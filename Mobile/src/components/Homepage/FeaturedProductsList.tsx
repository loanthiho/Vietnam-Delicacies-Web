import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FeaturedProductsList = ({ data, navigation}:any) => {
    return (
        <FlatList
            horizontal={true}
            data={data?.data}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.featuredProducts}
                    onPress={() => navigation.navigate('ProductDetailScreen', { selectedItem: item })}>
                    {item.Files.length > 0 ? (
                            <Image
                                source={{ uri: item.Files[0].src}}
                                style={styles.itemPhoto}
                                resizeMode="cover"
                            />
                        ) : (
                            <Image
                                source={require('../../assets/no_image.jpg')}
                                style={styles.itemPhoto}
                                resizeMode="cover"
                            />
                        )}
                    <View>
                        <Text style={styles.itemText}>{item.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="star" style={styles.starIcon} />
                            <Text style={styles.textIcon}>4.5</Text>
                            <Ionicons name="cart" style={styles.cartIcon} />
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.key}
        />
    );
};

const styles = StyleSheet.create({
    featuredProducts: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop: 20,
        marginBottom: 20,
        width: 150,
        height: 220,
        borderColor: 'white',
    },
    itemPhoto: {
        width: 130,
        height: 130,
        borderRadius: 20,
        position: 'relative',
        left: 10,
        top: 10,
    },
    itemText: {
        color: 'black',
        marginTop: 20,
        fontSize: 16, 
        textAlign:'center', 
        marginBottom:10,
    },
    starIcon: {
        fontSize: 25,
        color: 'yellow',
        paddingLeft: 10,
    },
    textIcon: {
        paddingLeft: 40,
        right: 30,
        fontSize: 15,
    },
    cartIcon: {
        fontSize: 25,
        color: '#2E7D32',
        paddingLeft: 20,
    },
});

export default FeaturedProductsList;
