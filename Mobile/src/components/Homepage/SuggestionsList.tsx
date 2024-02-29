import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SuggestionsList = ({ data,navigation }:any) => {
    return (
        <FlatList
            horizontal={false}
            data={data?.data}
            numColumns={2}
            contentContainerStyle={{
                width: '100%',
                flexDirection: 'column',
                gap: 20,
                height: 'auto',
            }}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.favouriteProducts}
                    onPress={() => navigation.navigate('ProductDetailScreen', { selectedItem: item })}>
                    <View style={styles.featuredProducts}>
                        <Image
                            source={{ uri: item.Files[0].src }}
                            style={styles.itemPhoto}
                            resizeMode="cover"
                        />
                        <View>
                            <Text style={styles.itemText}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="star-outline" style={styles.starIcon} />
                                <Text style={styles.textIcon}>4.5</Text>
                                <Ionicons name="heart-outline" style={styles.heartIcon} />
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={item => item.key}
        />
    );
};

const styles = StyleSheet.create({
    favouriteProducts: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 20,
        width: 170,
        height: 240,
        elevation: 10,
        top: 20,
    },
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
        marginTop: 5,
        paddingLeft: 40,
        top: 10,
        fontSize: 16,
    },
    starIcon: {
        fontSize: 15,
        color: 'yellow',
        top: 20,
        paddingLeft: 10,
    },
    textIcon: {
        paddingLeft: 40,
        top: 20,
        right: 30,
    },
    heartIcon: {
        fontSize: 20,
        color: 'red',
        paddingLeft: 20,
        top: 20,
    },
});

export default SuggestionsList;
