import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Button,
  PermissionsAndroid,
  Image,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// import {useMutation} from 'react-query';

const AddProduct = () => {
  const [nameProduct, setnameProduct] = useState('');
  const [descProduct, setdescProduct] = useState('');
  const [quantityProduct, setquantityProduct] = useState('');
  const [weightProduct, setweightProduct] = useState('');
  const [priceProduct, setpriceProduct] = useState(0);
  const [value, setValue] = useState(null);
  const [img, setImg] = useState('');
  const navigation = useNavigation();
  const [dataDomain, setDataDomain] = useState<any[]>();
  const [data, setData] = useState([]);

  const apiDomain = 'https://b467-113-176-99-140.ngrok-free.app/domains';

  useEffect(() => {
    axios
      .get(apiDomain)
      .then(response => {
        setDataDomain(response.data.data);
      })
      .catch(error => {
        console.error('Đã xảy ra lỗi khi gọi API:', error);
      });
  }, []);


  useEffect(() => {
    if (dataDomain && dataDomain.length > 0) {
      const newData = dataDomain.map(item => ({
        label: item.name,
        value: item.id,
      }));
      setData(newData);
    }
    // console.log('dataProvincedomian', data);
  }, [dataDomain]);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MGU4NzMwLWY0YmMtNGIwOC1hNWFkLTdkMDU1OWQ5MDk5OSIsImVtYWlsIjoiZGkuaGkyNGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFVJanBxLlRWMjBSaHhXRjl2bEEyMWVVZjdSTmJUR0hIZ0kzS1Q3RFpqL3F1Wmd5MS9zMGguIiwibmFtZSI6IkRpIEhvIiwiaWF0IjoxNzA5MTc4MzUyfQ.Lp8QV0oJTmV2nqvcmp0LVmxE8QB6fc3IWUVx9I7z1ts';
  const saveProduct = async () => {
    let ojb = {
      category_id: '023923',
      seller_id: '04',
      name: nameProduct,
      price: priceProduct,
      description: descProduct,
      quantity: quantityProduct,
      weight: weightProduct,
      inventory: 30,
    };

    const formData = new FormData();
    formData.append('files', {
      uri: img,
      type: 'image/jpeg',
      name: 'product_image.jpg',
    });

    // Thêm dữ liệu từ ojb vào formData
    Object.keys(ojb).forEach(key => {
      formData.append(key, ojb[key]);
    });

    let url_api = 'https://b467-113-176-99-140.ngrok-free.app/products';
    try {
      const test = await axios.get(
        'https://b467-113-176-99-140.ngrok-free.app/products',
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const response = await axios.post(url_api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      Alert.alert('Thêm thành công');
      navigation.navigate('ProductScreen');
    } catch (error) {
      Alert.alert('add products failure');
    }
  };

  const handleChooseOption = () => {
    Alert.alert(
      'Chọn ảnh',
      'Bạn muốn chọn ảnh từ thư viện hay chụp ảnh mới?',
      [
        {
          text: 'Chọn ảnh từ thư viện',
          onPress: () => requestImageLibraryPermission(),
        },
        {
          text: 'Chụp ảnh mới',
          onPress: () => requestCameraPermission(),
        },
      ],
      {cancelable: true},
    );
  };

  const requestCameraPermission = async () => {
    try {
      const checkPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (checkPermission === PermissionsAndroid.RESULTS.GRANTED) {
        const result: any = await launchCamera({
          mediaType: 'photo',
          cameraType: 'back',
        });
        setImg(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const requestImageLibraryPermission = async () => {
    try {
      const checkPermission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (checkPermission === PermissionsAndroid.RESULTS.GRANTED) {
        const result: any = await launchImageLibrary({
          mediaType: 'photo',
          selectionLimit: 3,
        });
        setImg(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <View style={styles.title}>
        <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
        <Text style={styles.Subtitle}>Thêm sản phẩm</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.FormAdd}>
          <View>
            <Text style={[styles.textIcon, styles.titleName]}>
              Tên sản phẩm *
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập tên sản phẩm"
              onChangeText={text => setnameProduct(text)}
            />
          </View>

          <View style={styles.image}>
            <Text style={styles.titleImg} onPress={() => handleChooseOption()}>
              Hình ảnh *
            </Text>
            {img != '' ? (
              <Image source={{uri: img}} style={{width: 150, height: 150}} />
            ) : (
              ''
            )}
          </View>

          <View>
            <Text style={[styles.textIcon, styles.titleName]}>Mô tả</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập mô tả"
              onChangeText={text => setdescProduct(text)}
            />
          </View>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Chọn vùng"
            searchPlaceholder="Tiềm kiếm..."
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
            renderLeftIcon={() => (
              <Ionicons
                name="shield-checkmark-outline"
                style={styles.IconCheck}></Ionicons>
            )}
          />

          <View style={styles.group}>
            <Text style={[styles.textIcon, styles.titleName]}>Giá *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập giá"
              onChangeText={text => setpriceProduct(text)}
            />
          </View>

          <View style={styles.group}>
            <Text style={[styles.textIcon, styles.titleName]}>Số lượng *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập số lượng"
              onChangeText={text => setquantityProduct(text)}
            />
          </View>
          <View style={styles.group}>
            <Text style={[styles.textIcon, styles.titleName]}>Cân nặng *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Nhập cân nặng"
              onChangeText={text => setweightProduct(text)}
            />
          </View>

          <Button title="Thêm sản phẩm" onPress={saveProduct} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 60,
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
    fontSize: 25,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 18,
  },
  placeholderStyle: {
    fontSize: 18,
  },
  selectedTextStyle: {
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 18,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },

  textInput: {
    fontSize: 16,
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  arrowLeft: {
    fontSize: 30,
  },
  Subtitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2E7D32',
  },

  iconImg: {
    fontSize: 30,
  },
});

export default AddProduct;
