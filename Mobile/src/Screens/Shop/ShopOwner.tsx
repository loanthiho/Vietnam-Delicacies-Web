import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SECTIONS = [
  {
    id: '1',
    name: 'Shop A',
    image: 'https://i.pinimg.com/564x/07/38/8b/07388ba2c4928158b963f51d1dc15675.jpg',
    products: [
      {
        key: '1',
        text: 'Xôi 7 màu',
        price: 10000,
        uri: 'https://i.pinimg.com/564x/27/23/28/272328c04f37971919c9e6f28fdd03ce.jpg',
      },
      {
        key: '2',
        text: 'Cá làng Vũ Đại',
        price: 15000,
        uri: 'https://i.pinimg.com/736x/da/76/e5/da76e520e0bfed988c544ecd7d265ae7.jpg',
      },
      {
        key: '3',
        text: 'Xôi 7 màu',
        price: 10000,
        uri: 'https://i.pinimg.com/564x/27/23/28/272328c04f37971919c9e6f28fdd03ce.jpg',
      },
      {
        key: '4',
        text: 'Cá làng Vũ Đại',
        price: 15000,
        uri: 'https://i.pinimg.com/736x/da/76/e5/da76e520e0bfed988c544ecd7d265ae7.jpg',
      },
    ],
  },
  {
    id: '2',
    name: 'Shop B',
    image: 'https://example.com/shopB.jpg',
    products: [
      {
        key: '3',
        text: 'Bánh tráng Trảng Bàng',
        price: 12000,
        uri: 'https://i.pinimg.com/564x/1f/da/ef/1fdaef8c6ed72c630f86c07a1e5a3634.jpg',
      },
      {
        key: '4',
        text: 'Bún chả Hà Nội',
        price: 20000,
        uri: 'https://i.pinimg.com/736x/38/44/1b/38441b82f34382e07d62ac99f2cc5c82.jpg',
      },
    ],
  },
];

const ShopOwnerScreen = ({navigation}: {navigation: any}) => {
  const [selectedItem, setSelectedItem] = useState('Tất cả');

  const renderItem = ({item}: {item: {id: string, name: string}}) => (
    <TouchableOpacity
      style={[
        styles.itemOption,
        {backgroundColor: selectedItem === item.name ? '#2E7D32' : 'white'},
      ]}
      onPress={() => setSelectedItem(item.name)}>
      <Text style={{color: selectedItem === item.name ? 'white' : 'black'}}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderFeaturedProduct = ({item}: {item: any}) => (
    <TouchableOpacity
      style={styles.featuredProducts}
      onPress={() =>
        navigation.navigate('ProductDetailScreen', {
          selectedItem: item,
        })
      }>
      <Image
        source={{uri: item.uri}}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <View>
        <Text style={styles.itemText}>{item.text}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Ionicons name="star-outline" style={styles.starIcon} />
          <Text style={styles.textIcon}>4.5</Text>
          <Ionicons name="heart-outline" style={styles.heartIcon} />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textheader}>{SECTIONS[0].name}</Text>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={{uri: SECTIONS[0].image}}
            style={styles.profileImage}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.search}>
        <Ionicons name="search-outline" style={styles.searchIcon} />
        <TextInput placeholder="Tìm kiếm..." style={styles.searchInput} />
        <TouchableOpacity>
          <Ionicons name="notifications-outline" style={styles.notifications} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          horizontal={false}
          data={SECTIONS[0].products}
          numColumns={2}
          contentContainerStyle={{
            width: '100%',
            flexDirection: 'column',
            gap: 20,
            height: 'auto',
            position:'relative',
            left:'5%'
          }}
          renderItem={renderFeaturedProduct}
          keyExtractor={item => item.key}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textheader: {
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  profileImageContainer: {
    borderRadius: 50,
    overflow: 'hidden',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 50,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    paddingEnd: 30,
    backgroundColor: '#ffffff',
    marginTop: 20,
  },
  searchIcon: {
    fontSize: 34,
    color: 'black',
  },
  starIcon: {
    fontSize: 20,
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
  searchInput: {
    flex: 1,
    marginLeft: 20,
  },
  notifications: {
    fontSize: 34,
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
  },
  itemOption: {
    margin: 10,
    width: 100,
    padding: 10,
    borderRadius: 15,
    textAlign: 'center',
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
    elevation: 10,
  },
  favouriteProducts: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginHorizontal: 5,
    marginTop: 20,
    marginBottom: 20,
    width: '45%',
    aspectRatio: 1,
    borderColor: 'white',
    elevation: 10,
  },
});

export default ShopOwnerScreen;
