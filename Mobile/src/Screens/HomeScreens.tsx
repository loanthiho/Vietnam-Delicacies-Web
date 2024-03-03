import React, {useEffect, useState} from 'react';
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
import Banner from '../components/Homepage/Banner';
import FeaturedProductsList from '../components/Homepage/FeaturedProductsList';
import SuggestionsList from '../components/Homepage/SuggestionsList';
import {useQuery} from '@tanstack/react-query';
import api from '../api/request';
import axios from 'axios';

const HomePage = ({navigation}: any) => {
  const [selectedItem, setSelectedItem] = useState('Tất cả');
  const datas = ['Tất cả', 'Miền Bắc', 'Miền Nam', 'Miền Trung'];
  
  const {isLoading, error, data} = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const response = await api.get('products', {}, {});
      return response;
    },
  });
  if (data) {
    console.log('data responesed:', data);
  }
  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={[
        styles.itemOption,
        {backgroundColor: selectedItem === item ? '#2E7D32' : 'white'},
      ]}
      onPress={() => setSelectedItem(item)}>
      <Text style={{color: selectedItem === item ? 'white' : 'black'}}>
        {item}
      </Text>
    </TouchableOpacity>
  );

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textheader}>Đặc sản Việt</Text>
        <TouchableOpacity style={styles.profileImageContainer}>
          <Image
            source={require('../assets/huong.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <Text>Đặt món đặc sản bạn yêu thích </Text>

      <View style={styles.search}>
        <Ionicons name="search-outline" style={styles.searchIcon} />
        <TextInput placeholder="Tìm kiếm..." style={styles.searchInput} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={datas}
          renderItem={renderItem}
          keyExtractor={item => item}
          horizontal
        />
      </View>

      <View style={{flex: 1}}>
        <FlatList
          data={data}
          keyExtractor={item => item.key}
          renderItem={null}
          ListHeaderComponent={
            <>
              <Banner />
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Sản phẩm nổi bật{' '}
              </Text>
            </>
          }
          ListFooterComponent={
            <>
              <FeaturedProductsList data={data} navigation={navigation} />
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                Sản phẩm đề xuất
              </Text>
              <SuggestionsList data={data} navigation={navigation} />
            </>
          }></FlatList>
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
  searchInput: {
    flex: 1,
    marginLeft: 20,
    fontSize: 20,
  },
  itemOption: {
    margin: 10,
    width: 100,
    padding: 10,
    borderRadius: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;
