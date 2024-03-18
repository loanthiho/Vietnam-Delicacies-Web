import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  requestCameraPermission,
  requestImageLibraryPermission,
} from './permissions';

import ImageResizer from 'react-native-image-resizer';

const ProductImg: React.FC<{setImage: (img: string) => void}> = ({
  setImage,
}) => {
  const [img, setImg] = useState<string>('');

  const handleChooseOption = () => {
    Alert.alert(
      'Chọn ảnh',
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
        setImg(resizedImageUri.uri);
        setImage(resizedImageUri.uri);
      } catch (error) {
        console.error('resizeImage error:', error);
        setImg(result.assets[0].uri);
        setImage(result.assets[0].uri);
      }
    }
  };
  return (
    <View style={styles.image}>
      <Text
        style={styles.titleImg}
        onPress={() => {
          handleChooseOption();
        }}>
        Nhấn chọn ảnh
      </Text>
      {img != '' ? (
        <TouchableOpacity>
          <Image source={{uri: img}} style={{width: 100, height: 100}} />
        </TouchableOpacity>
      ) : (
        ''
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 60,
  },

  BtnAdd: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },

  sumbitBtn: {
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center',
  },

  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  IconCheck: {
    color: '#2E7D32',
    marginRight: 10,
    fontSize: 24,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
  },

  title: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },

  FormAdd: {
    paddingRight: 25,
    paddingLeft: 25,
    gap: 10,
  },

  textIcon: {
    fontSize: 16,
  },

  titleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  textInput: {
    fontSize: 14,
  },

  Inputname: {
    borderColor: '#666',
    borderWidth: 1, // Độ dày của đường viền
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
  },

  textInputFocus: {
    borderColor: '#2089dc', // Màu của đường viền khi ô input được chọn
  },

  errorTsx: {
    marginTop: -10,
    color: 'red',
    fontSize: 12,
    textAlign: 'right',
  },

  group: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  image: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },

  titleImg: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  arrowLeft: {
    marginLeft: 10,
    fontSize: 20,
  },
  Subtitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  iconImg: {
    fontSize: 30,
  },
});

export default ProductImg;
