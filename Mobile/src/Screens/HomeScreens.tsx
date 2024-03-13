import React, { useCallback, useEffect, useState } from 'react';
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
import LoaderKit from 'react-native-loader-kit';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Banner from '../components/Homepage/Banner';
import FeaturedProductsList from '../components/Homepage/FeaturedProductsList';
import SuggestionsList from '../components/Homepage/SuggestionsList';
import { useQuery } from '@tanstack/react-query';
import api from '../api/request';
import { debounce } from 'lodash';
import fonts from '../ultils/_fonts';
import { getUserAccessToken } from '../api/storage';

const HomePage = ({ navigation }: any) => {
  const [selectedItem, setSelectedItem] = useState('Tất cả');
  const [products, setProducts] = useState([]);
  const [domains, setDomain] = useState<any[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [find, setFind] = useState({
    filterByDomainId: '',
    searchByProductName: ''
  });


  const [checkBox, setCheckBox] = useState<boolean>();
  const [userInfo, setUserInfo] = useState<any>();
  const [oldUserInfo, setOldUserInfo] = useState<any>();

  const getUserData = async () => {
    const userInfoOld = await getUserAccessToken();
    console.log('user:', userInfoOld.user);
    if (userInfoOld.user) {
      setUserInfo(userInfoOld.user);
    } else {
      setUserInfo(null);
    }
  };

  useEffect(() => {
    getUserData();
    if (userInfo) {
      console.log('data user:', userInfo);
    }
  }, []);


  const [loading, setLoading] = useState({
    searchLoading: false,
    firstFetchLoading: false,
  });

  useEffect(() => {
    if (find.searchByProductName === '' && find.filterByDomainId === 'all') {
      setIsSearch(false);
    }
    const launchSearch = async () => await handleSearch(find);
    launchSearch()
  }, [find.filterByDomainId, find.searchByProductName, find]);


  const actionFind = async (field: string, value: string) => {
    setIsSearch(true)
    if (field === 'filterByDomainId') {
      return setFind({
        ...find,
        filterByDomainId: value
      })
    }
    return setFind({
      ...find,
      searchByProductName: value
    })
  }

  /**
   * Handle debounce search product
   */
  const handleSearch = useCallback(
    debounce(async (key: any) => {
      try {
        setLoading({
          ...loading,
          searchLoading: true
        })
        const response = await api.get('products', {
          auth: false,
          params: {
            searchByProductName: key.searchByProductName === '' ? null : key.searchByProductName,
            filterByDomainId: key.filterByDomainId === '' ? null : key.filterByDomainId,
          }
        });
        if (response) {
          setLoading({
            ...loading,
            searchLoading: false
          })
          setProducts(response?.data?.data)
        }
      } catch (error: any) {
        console.error("Error___", error.response?.data)
      }
    }, 500),
    []
  );




  /**
   * Fetch the first data products.
   */
  const productsFetch = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      try {
        setIsSearch(false)
        const response = await api.get('products', { auth: false });
        if (response) {
          setProducts(response.data?.data.length === 0 ? [] : response.data?.data);
        }
        return response.data;
      } catch (error) {
        setProducts([])
      }
    },
  });

  /**
   * @domain The first fetch to get all domain.
   */
  const domain = useQuery({
    queryKey: ['domains'],
    queryFn: async () => {
      try {
        setIsSearch(false)
        var domainArray = [{
          "id": "all",
          "name": "Tất cả",
          "createdAt": "2024-03-10T21:53:20.000Z",
          "updatedAt": "2024-03-10T21:53:20.000Z"
        }]
        const response = await api.get('domains', { auth: false });
        if (response) {
          setDomain([...domainArray, ...response.data?.data]);
        }
        return response.data;
      } catch (error) {
        console.error("Error:", error)
      }
    },
  });







  const renderDomain = ({ item }: any) => (
    <>
      <TouchableOpacity
        key={item?.id}
        style={[
          styles.itemOption,
          { backgroundColor: selectedItem === item?.id ? '#2E7D32' : 'white' },
        ]}
        onPress={() => {
          setSelectedItem(item.id);
          actionFind('filterByDomainId', item.id)
        }}
      >
        <Text style={{ color: selectedItem === item?.id ? 'white' : 'black' }}>
          {item?.name}
        </Text>

      </TouchableOpacity>
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={styles.textheader}>Đặc sản</Text>
          <Text style={styles.textViet}>Việt</Text>
        </View>
        <TouchableOpacity style={styles.profileImageContainer}
        onPress={() =>
          navigation.navigate({
            name: 'EditProfileScreen',
            params: { userInfo, oldUserInfo, setUserInfo: setUserInfo },
          })
        }>
          <Image
            source={require('../assets/huong.jpg')}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
      <Text style={{ color: '#000' }}>Đặt món đặc sản bạn yêu thích </Text>

      <View style={styles.search}>
        <Ionicons name="search-outline" style={styles.searchIcon} />
        <TextInput
          placeholder="Tìm kiếm..."
          placeholderTextColor={'#000000'}
          style={styles.searchInput}
          onChangeText={(keyWord) => actionFind('searchByProductName', keyWord)}
        />
      </View>
      {
      /**
       * @domain
       * - This is fetch data for domain
       */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 70
        }}>
        {
          /**
           *  @domains this is to fetch the domains.
           *  @renderItem The component to render the domains
           * 
           *  @domain_isLoading to check the domain is fetching!
           */
        }

        {domain.isLoading
          ?
          (
            <>
              <LoaderKit
                style={{ width: 50, height: 50, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}
                name={'BallPulse'} // Optional: see list of animations below
                color={'green'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
              />
            </>
          )
          : (
            <>
              <FlatList
                data={domains}
                renderItem={renderDomain}
                keyExtractor={item => item.id}
                horizontal
              />
            </>
          )}

      </View>

      <ScrollView style={{ flex: 1 }}>
        <Banner />
        {
          productsFetch.isLoading || loading.searchLoading ? (
            <>
              <LoaderKit
                style={{ width: 50, height: 50, flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}
                name={'BallPulse'} // Optional: see list of animations below
                color={'green'} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
              />
            </>
          ) :
            productsFetch.isError
              ?
              (
                <Text style={{ color: 'red', opacity: 0.5, fontSize: fonts.$18, fontWeight: '700' }}> {productsFetch.error.message}</Text>
              )
              :
              products && products?.length === 0
                ?
                (
                  <Text style={{ fontSize: fonts.$18, opacity: 0.5, fontWeight: '800', color: 'black', }}> Không có sản phẩm nào hết!</Text>
                )
                :
                <FlatList
                  data={products}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={null}
                  ListHeaderComponent={
                    <>
                      {
                        !isSearch
                          ?
                          (<Text
                            onPress={() => console.log("isSearch = ", isSearch)}
                            style={{
                              fontSize: fonts.$18,
                              fontWeight: 'bold', color: 'black'
                            }}>
                            Sản phẩm nổi bật{' '}
                          </Text>
                          )
                          : null
                      }
                    </>
                  }
                  ListFooterComponent={
                    <>
                      {
                        !isSearch
                          ?
                          (
                            <FeaturedProductsList products={products} navigation={navigation} />
                          )
                          :
                          null
                      }
                      <Text
                        onPress={() => console.log("isSearch:", isSearch)}
                        style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
                        Sản phẩm đề xuất
                      </Text>
                      <SuggestionsList products={products} navigation={navigation} />
                    </>
                  }
                />
        }
      </ScrollView>
    </View >
  );

};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textheader: {
    fontSize: 24,
    color: '#ffa000',
    fontFamily: 'Lobster-Regular',
  },

  textViet: {
    color: '#ffa000',
    fontSize: 26,
    marginBottom: 15,
    fontFamily: 'Meddon-Regular',
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
    borderRadius: 20,
    paddingEnd: 30,
    backgroundColor: '#ffffff',
    marginTop: 10,
  },
  searchIcon: {
    marginLeft: 15,
    fontSize: 20,
    color: 'black',
  },
  searchInput: {
    flex: 1,
    marginLeft: 15,
    fontSize: 16,
    color: 'black'
  },

  itemOption: {
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 15,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;
