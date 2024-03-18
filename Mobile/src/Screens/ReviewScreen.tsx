import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'; 
import ImageResizer from 'react-native-image-resizer';
import {
  requestCameraPermission,
  requestImageLibraryPermission,
} from '../Seller/permissions';
import Video from 'react-native-video';

const ReviewScreen: React.FC = () => {
  const navigation = useNavigation();
  const [textValue, setTextValue] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [video, setVideo] = useState<string>(''); // Thêm state để lưu đường dẫn của video
  const [showIcon, setShowIcon] = useState<boolean>(true);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Nem chua Thanh Hoá',
      price: 150000,
      Files: [
        {
          src: 'https://i.pinimg.com/564x/6a/9a/12/6a9a122a60a435725152db7a6632da58.jpg',
        },
      ],
    },
  ]);

  const handleChooseOption = () => {
    Alert.alert(
      'Chọn phương thức',
      'Bạn muốn chọn ảnh từ thư viện hay chụp ảnh mới?',
      [
        {
          text: 'Chọn ảnh từ thư viện',
          onPress: () => requestImageLibrary(),
        },
        {
          text: 'Chụp ảnh mới',
          onPress: () => requestCamera(),
        },
        {
          text: 'Quay video',
          onPress: () => requestVideo(),
        },
      ],
      {cancelable: true},
    );
  };

  const requestCamera = async () => {
    try {
      const granted = await requestCameraPermission();
      if (granted) {
        launchCamera(
          {mediaType: 'photo', cameraType: 'back'},
          handleImageCapture,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestImageLibrary = async () => {
    try {
      const granted = await requestImageLibraryPermission();
      if (granted) {
        launchImageLibrary(
          {mediaType: 'photo', selectionLimit: 3},
          handleImageCapture,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestVideo = async () => {
    try {
      const granted = await requestCameraPermission();
      if (granted) {
        launchCamera(
          {mediaType: 'video', cameraType: 'back'},
          handleVideoCapture,
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageCapture = async (result: any) => {
    if (!result.didCancel) {
      try {
        const resizedImageUri = await ImageResizer.createResizedImage(
          result.assets[0].uri,
          300,
          300,
          'JPEG',
          80,
        );
        setImage(resizedImageUri.uri);
        setShowIcon(false);
      } catch (error) {
        console.error('resizeImage error:', error);
        setImage(result.assets[0].uri);
        setShowIcon(false);
      }
    }
  };

  const handleVideoCapture = async (result: any) => {
    if (!result.didCancel) {
      try {
      } catch (error) {
        console.error('Video capture error:', error);
      }
    }
  };
  
  const renderItem = ({item}: any) => (
    <View key={item.id} style={styles.itemContainer}>
      <Image source={{uri: item.Files?.[0]?.src}} style={styles.itemImage} />
      <View style={styles.content}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemPrice}>
          {item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}đ
        </Text>
      </View>
      <View style={styles.status}>
        <TouchableOpacity style={styles.reviewButton}>
          <Text style={styles.buttonText}>Đã giao</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList data={cartItems} renderItem={renderItem} />

        <View style={styles.image}>
  {showIcon && (
    <TouchableOpacity onPress={() => handleChooseOption()}>
      <AntDesign name="camerao" size={24} style={styles.camera} />
    </TouchableOpacity>
  )}
  {image !== '' && (
    <TouchableOpacity onPress={() => handleChooseOption()}>
      <Image source={{uri: image}} style={styles.imagePreview} />
    </TouchableOpacity>
  )}
  {video !== '' ? (
    <Video source={{uri: video}} style={styles.videoPreview} />
  ) : (
    <TouchableOpacity onPress={() => handleChooseOption()}>
      <AntDesign name="videocamera" size={24} style={styles.camera} />
    </TouchableOpacity>
  )}
</View>


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
  image: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  camera: {
    margin: 20,
    fontSize: 50,
    color: 'white',
    backgroundColor: '#2E7D32',
    borderRadius: 20,
    width: 100,
    height: 100,
    lineHeight: 100,
    textAlign: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    marginHorizontal: 20,
    margin: 20,
  },
  videoPreview: {
    width: 100,
    height: 100,
    marginHorizontal: 20,
    margin: 20,
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
