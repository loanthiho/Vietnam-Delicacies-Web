import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FeaturedProductsList = ({products, navigation}: any) => {
  return (
    <>
      {products && products.length > 0 ? (
        <FlatList
          horizontal={true}
          data={products}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.featuredProducts}
              onPress={() =>
                navigation.navigate('ProductDetailScreen', {
                  selectedItem: item,
                })
              }>
              {item && item?.Files?.length > 0 ? (
                <Image
                  source={{uri: item.Files[0].src}}
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
                <Text numberOfLines={1} style={styles.itemText}>
                  {item.name}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    padding: 6,
                    marginBottom: 10,
                    justifyContent: 'space-between',
                  }}>
                  <View style={styles.star}>
                    <Ionicons name="star" style={styles.starIcon} />
                    <Text style={styles.textIcon}>4.5</Text>
                  </View>
                  <Text numberOfLines={1} style={styles.itemPrice}>
                    {item.price
                      ?.toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                    đ
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.key}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  featuredProducts: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 160,
    marginHorizontal: 5,
    marginTop: 20,
    marginBottom: 20,
  },
  itemPhoto: {
    alignSelf: 'center',
    marginTop: 16,
    width: 120,
    height: 120,
    borderRadius: 10,
    justifyContent: 'space-between',
  },
  itemText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    padding: 14,
  },
  itemPrice: {
    color: '#fff',
    padding: 4,
    backgroundColor: '#ffa000',
    borderRadius: 6,
    marginRight: 4,
    fontSize: 13,
  },

  star: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 5,
    paddingLeft: 6,
  },
  starIcon: {
    fontSize: 16,
    alignSelf: 'center',
    color: '#ffa000',
  },
  textIcon: {
    fontSize: 13,
    alignSelf: 'center',
  },
});

export default FeaturedProductsList;
