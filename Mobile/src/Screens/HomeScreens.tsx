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
    title: 'Made for you',

    data: [
      {
        key: '1',
        text: ' Xôi 7 màu ',
        uri: 'https://i.pinimg.com/564x/27/23/28/272328c04f37971919c9e6f28fdd03ce.jpg',
      },
      {
        key: '2',
        text: 'Cá làng Vũ Đại',
        uri: 'https://i.pinimg.com/736x/da/76/e5/da76e520e0bfed988c544ecd7d265ae7.jpg',
      },
      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1002/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1006/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1008/200',
      },
    ],
  },
  {
    title: 'Punk and hardcore',
    horizontal: true,
    vertical: true,
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1011/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1012/200',
      },
      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1013/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1015/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1016/200',
      },
    ],
  },
  {
    title: 'Based on your recent listening',
    horizontal: true,
    data: [
      {
        key: '1',
        text: 'Item text 1',
        uri: 'https://picsum.photos/id/1020/200',
      },
      {
        key: '2',
        text: 'Item text 2',
        uri: 'https://picsum.photos/id/1024/200',
      },
      {
        key: '3',
        text: 'Item text 3',
        uri: 'https://picsum.photos/id/1027/200',
      },
      {
        key: '4',
        text: 'Item text 4',
        uri: 'https://picsum.photos/id/1035/200',
      },
      {
        key: '5',
        text: 'Item text 5',
        uri: 'https://picsum.photos/id/1038/200',
      },
    ],
  },
];

const HomePage = (props: any) => {
  console.log('received props', props);
  const {navigation} = props;
  const [selectedItem, setSelectedItem] = useState('Tất cả');
  const data = ['Tất cả', 'Miền Bắc', 'Miền Nam', 'Miền Trung'];

  const renderItem = ({item}) => (
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

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textheader}>Đặc sản Việt </Text>
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
        <TouchableOpacity>
          <Ionicons name="notifications-outline" style={styles.notifications} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item}
          horizontal
        />
      </View>
      <ScrollView>
        <View style={styles.banner}>
          <Image source={require('../assets/Image.png')} />
        </View>

        <View>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Sản phẩm nổi bật
          </Text>
          <FlatList
            horizontal={true}
            data={SECTIONS[0].data}
            renderItem={({item}) => (
              <View style={styles.featuredProducts}>
                <Image
                  source={{uri: item.uri}}
                  style={styles.itemPhoto}
                  resizeMode="cover"
                />
                <View>
                  <Text style={styles.itemText}>{item.text}</Text>
                  <Ionicons name="star-outline" style={styles.starIcon} />
                  <Text style={styles.textIcon}>4.5</Text>
                  <Ionicons name="heart-outline" style={styles.heartIcon} />
                </View>
              </View>
            )}
            keyExtractor={item => item.key}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Sản phẩm yêu thích
          </Text>
          <FlatList
            horizontal={false}
            data={SECTIONS[0].data}
            numColumns={2}
            contentContainerStyle={{
              width: '100%',
              flexDirection: 'column',
              gap: 20,
              height: 'auto',
            }}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.favouriteProducts}
                onPress={() =>
                  navigation.navigate('ProductDetailScreen', {
                    selectedItem: item,
                  })
                }>
                <View style={styles.item}>
                  <Image
                    source={{uri: item.uri}}
                    style={styles.itemPhoto}
                    resizeMode="cover"
                  />
                  <View>
                    <Text style={styles.itemText}>{item.text}</Text>
                    <Ionicons name="star-outline" style={styles.starIcon} />
                    <Text style={styles.textIcon}>4.5</Text>
                    <Ionicons name="heart-outline" style={styles.heartIcon} />
                  </View>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.key}
          />
        </View>
      </ScrollView>
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
  },
  heartIcon: {
    fontSize: 20,
    color: 'red',
    paddingLeft: 120,
    bottom: 20,
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
  banner: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    backgroundColor: '#2E7D32',
  },
  item: {
    margin: 10,
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
    width: 170,
    height: 220,
    borderColor: 'white',
    elevation: 10,
  },
});

export default HomePage;
