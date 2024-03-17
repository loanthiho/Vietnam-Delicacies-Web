import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';

const ReviewScreen: React.FC = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [textValue, setTextValue] = useState('');
  const [image, setImage] = useState('');
  const [video, setVideo] = useState('');

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Nem chua Thanh Hoá',
      price: 150000,
      Files: [{ src: 'https://i.pinimg.com/564x/6a/9a/12/6a9a122a60a435725152db7a6632da58.jpg' }],
    },
  ]);

  const renderStarIcons = () => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
          <AntDesign
            name={i < rating ? 'star' : 'staro'}
            size={24}
            color={i < rating ? '#FFD700' : '#FFD700'}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const renderItem = ({ item }: any) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{ uri: item.Files?.[0]?.src }} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ</Text>
      </View>
      <View style={styles.status}>
        <TouchableOpacity style={styles.reviewButton}>
          <Text style={styles.buttonText}>Đã giao</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleCameraPress = () => {
    ImagePicker.openPicker({
      mediaType: 'any',
    }).then((response) => {
      if (!response.cancelled) {
        if (response.mime.includes('image')) {
          setImage(response.path);
          setVideo('');
        } else if (response.mime.includes('video')) {
          setVideo(response.path);
          setImage('');
        }
      }
    }).catch((error) => {
      console.log('ImagePicker Error: ', error);
    });
  };
  

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList data={cartItems} renderItem={renderItem} />
        <View style={styles.starContainer}>{renderStarIcons()}</View>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={handleCameraPress}>
            <AntDesign name="camerao" style={styles.iconCamerao} />
          </TouchableOpacity>
          <AntDesign name="videocamera" style={styles.iconVideocamera} />
        </View>
        {image !== '' && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
        {video !== '' && <Text>Video: {video}</Text>}
        <TextInput
          style={styles.input}
          value={textValue}
          onChangeText={setTextValue}
          placeholder="Hãy chia sẻ nhận xét cho sản phẩm này nhé!"
        />
      </View>
      <Text style={styles.send}>Gửi đánh giá</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arrowLeft: {
    paddingLeft: 10,
    fontSize: 25,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    elevation: 5,
  },
  content: {
    flex: 1,
  },
  itemText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 13,
    marginTop: 15,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  status: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  reviewButton: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 7,
    width: 70,
    height: 20,
    borderRadius: 5,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 13,
    color: '#2E7D32',
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: 20,
  },
  iconCamerao: {
    fontSize: 50,
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    width: 100,
    height: 100,
    lineHeight: 100,
    textAlign: 'center',
  },
  iconVideocamera: {
    fontSize: 50,
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    width: 100,
    height: 100,
    lineHeight: 100,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    marginHorizontal: 20,
    height: 100,
  },
  send: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 10,
    lineHeight: 50,
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 200,
  },
});

export default ReviewScreen;
