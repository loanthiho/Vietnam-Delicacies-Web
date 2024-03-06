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
                flexDirection: 'row',
                gap: 20,
                height: 'auto',
            }}
            renderItem={({ item }) => (
                <TouchableOpacity 
                    onPress={() => navigation.navigate('ProductDetailScreen', { selectedItem: item })}>
                        <View style={styles.groupProduct}> 
                    <View style={styles.featuredProducts}>
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
                            <Text numberOfLines={1} style={styles.itemText}>{item.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', padding:10, justifyContent:"space-between" }}>
                            <View style={styles.star}>
                                <Ionicons name="star" style={styles.starIcon} />
                                <Text style={styles.textIcon}>4.5</Text>
                                </View>
                                <Ionicons name="cart" style={styles.cartIcon} />
                          
                            </View>
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

    groupProduct:{
        justifyContent:"center",
    },
    featuredProducts: {
        backgroundColor: 'white',
        borderRadius: 10,     
        width: 150,
        marginHorizontal: 5,
        marginTop: 20,
        marginBottom: 20,
    },
    itemPhoto: {
        alignSelf:'center',
        marginTop: 10,
        width:120,
        height: 120,
        borderRadius: 10,
        justifyContent: "space-between"
    },
    itemText: {
        color: 'black',
        fontSize: 16, 
        textAlign:'center', 
        padding: 14
    },
    star:{
    flexDirection: "row",
    alignSelf:"center",
    gap: 5,
    paddingLeft:10,

    },
    starIcon: {
        fontSize: 18,
        color: '#ffa000',
    },
    textIcon: {
        fontSize: 15,
        alignSelf:"center"
    },
    cartIcon: {
        fontSize: 25,
        marginRight:10,
        color: '#2E7D32',
    },
});

export default SuggestionsList;
