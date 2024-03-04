import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useQuery} from '@tanstack/react-query';
import api from '../../api/request';
import SuggestionsList from '../../components/Homepage/SuggestionsList';
const ShopOwnerScreen = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const {selectedItem}: {selectedItem: any} = route.params;

  const {isLoading, error, data} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('products', {}, {});
      return response;
    },
  });
  console.log('my product', selectedItem);

  const renderProductOwner = ({item}: any) => {
    return (
      <View>
        <Image
          source={{uri: item.Files[0].src}}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
        <View>
          <Text style={styles.itemText}>{item.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="star-outline" style={styles.starIcon} />
            <Text style={styles.textIcon}>4.5</Text>
            <Ionicons name="heart-outline" style={styles.heartIcon} />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textheader}>
          {selectedItem?.User && selectedItem.User.name
            ? selectedItem.User.name
            : 'Unknown'}
        </Text>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={require('../../assets/huong.jpg')}
            style={styles.profileImage}
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
      <FlatList
        data={selectedItem}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={renderProductOwner}
        keyExtractor={item => item.key}
      />
       <SuggestionsList data={data} navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    marginHorizontal: 10,
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
    textAlign: 'center',
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
  productList: {
    flexDirection: 'column',
    gap: 40,
    marginHorizontal: 10,
  },
});

export default ShopOwnerScreen;
