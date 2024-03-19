import React, {useState, useEffect, useRef} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductImg from './ProductImg';
import {Formik} from 'formik';
import * as Yup from 'yup';
import api from '../api/request';
import {getUserAccessToken} from '../api/storage';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useQueryClient} from '@tanstack/react-query';

// import {useMutation} from 'react-query';

const AddProduct = () => {
  const [nameProduct, setnameProduct] = useState('');
  const [descProduct, setdescProduct] = useState('');
  const [quantityProduct, setquantityProduct] = useState('');
  const [weightProduct, setweightProduct] = useState('');
  const [priceProduct, setpriceProduct] = useState('');

  const navigation = useNavigation();
  //DataDomain
  const [selectedItem, setSelectedItem] = useState(null);
  const [dataDomain, setDataDomain] = useState<any[]>();
  const [data, setData] = useState([]);
  const [domainId, setDomainId] = useState(null);
  //DataCategory
  const [categoryAPI, setDataCategoryAPI] = useState<any[]>();
  const [dataCategory, setDataCategory] = useState([]);
  const [categoryId, setcategoryId] = useState(null);
  //focus
  const [isFocused, setIsFocused] = useState(false);
  const [isFocusedDetail, setIsFocusedDetail] = useState(false);

  //Onpress
  const priceInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const weightInputRef = useRef(null);
  //img
  const [img, setImg] = useState<string>('');

  function convertToNumber(text: any) {
    // Loại bỏ các dấu chấm trong chuỗi
    if (typeof text === 'string') {
      var so = parseFloat(text.replace(/\./g, ''));
      return so;
    }
    return text;
  }

  //Formk
  const SignupSchema = Yup.object().shape({
    nameProduct: Yup.string()
      .min(2, 'Tên quá ngắn!')
      .max(40, 'Vui lòng đặt tên ngắn gọn!')
      .required('Vui lòng nhập tên sản phẩm'),
    priceProduct: Yup.string().required('Chưa nhập giá'),
    quantityProduct: Yup.string().required('Chưa nhập số lượng'),
    weightProduct: Yup.string().required('Chưa nhập cân nặng'),
    category: Yup.string().required('Chưa chọn loại hàng'),
  });

  //Loading
  const [isLoading, setIsLoading] = useState(true);

  //token
  const [userInfo, setUserInfo] = useState<any>();

  const getUserData = async () => {
    setUserInfo(await getUserAccessToken());
  };

  useEffect(() => {
    getUserData();
    console.log('userInfo', userInfo);
  }, []);

  const formatPrice = (text: string) => {
    const formattedText = text.replace(/\D/g, '');
    const formattedNumber = Number(formattedText).toLocaleString();
    return formattedNumber;
  };

  const formatQuantity = (text: string) => {
    const formattedText = text.replace(/\D/g, '');
    const formattedNumber = Number(formattedText).toLocaleString();
    return formattedNumber;
  };

  const formatWeight = (text: string) => {
    const formattedText = text.replace(/\D/g, '');
    const formattedNumber = Number(formattedText).toLocaleString();
    return formattedNumber;
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handlePress = inputRef => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFocusDetail = () => {
    setIsFocusedDetail(true);
  };

  const handleBlurDetail = () => {
    setIsFocusedDetail(false);
  };

  //domain
  useEffect(() => {
    api
      .get('domains')
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
  }, [dataDomain]);

  const handleDomainChange = (item: React.SetStateAction<null>) => {
    setSelectedItem(item);
    setDomainId(item.value);
    console.log('Data dimain before sending:', {
      domainId: item.value,
      domainName: item.label,
    });
    console.log('Domain:', domainId);
  };
  //domain

  useEffect(() => {
    api
      .get('categories')
      .then(response => {
        setDataCategoryAPI(response.data.data);
      })
      .catch(error => {
        console.error('Đã xảy ra lỗi khi gọi API:', error);
      });
  }, []);

  useEffect(() => {
    if (categoryAPI && categoryAPI.length > 0) {
      const newcategoryAPI = categoryAPI.map(item => ({
        label: item.name,
        value: item.id,
      }));
      setDataCategory(newcategoryAPI);
    }
  }, [categoryAPI]);

  const handleCategoryChange = item => {
    setDataCategoryAPI(item);
    setcategoryId(item.value);
    console.log('Data category before sending:', {
      domainId: item.value,
      domainName: item.label,
    });
  };

  const saveProduct = async () => {
    if (nameProduct === '') {
      Alert.alert('Vui lòng nhập thông tin');
      return;
    }
    setIsLoading(false);
    let ojb = {
      seller_id: userInfo?.user.id,
      category_id: categoryId,
      name: nameProduct,
      price: convertToNumber(priceProduct),
      description: descProduct,
      inventory: convertToNumber(quantityProduct),
      weight: convertToNumber(weightProduct),
      domain_id: domainId,
    };

    const formData = new FormData();
    if (img) {
      formData.append('files', {
        uri: img,
        type: 'image/jpeg',
        name: 'product_image.jpg',
      });
    }

    Object.keys(ojb).forEach(key => {
      formData.append(key, ojb[key]);
    });

    try {
      const response = await api.post('products', {
        data: formData,
      });

      setnameProduct('');
      setdescProduct('');
      setquantityProduct('');
      setweightProduct('');
      setpriceProduct('');
      setImg('');
      setData([]);
      setDataCategory([]);

      setIsLoading(true);
      Alert.alert('Thêm thành công');
      navigation.navigate('ProductScreen');
    } catch (error) {
      Alert.alert('Thêm chưa thành công vui lòng kiểm tra lại');
      setIsLoading(true);
    }
  };

  if (!isLoading) {
    return (
      <View style={styles.Loadingcontainer}>
        <ActivityIndicator size="large" color="#ffa000" />
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return (
    <Formik
      initialValues={{
        nameProduct: '',
        descProduct: '',
        quantityProduct: '',
        weightProduct: '',
        category: '',
        priceProduct: '',
        img: '',
      }}
      validationSchema={SignupSchema}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        setFieldValue,
        isValid,
      }) => (
        <View>
          <View style={styles.title}>
            <TouchableOpacity onPress={() => navigation.navigate('ShopSeller')}>
              <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
            </TouchableOpacity>
            <Text style={styles.Subtitle}>Thêm sản phẩm</Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.FormAdd}>
              <View>
                <Text style={[styles.textIcon, styles.titleName]}>
                  Tên sản phẩm
                </Text>
                <TextInput
                  style={[
                    styles.textInput,
                    styles.Inputname,
                    isFocused ? styles.textInputFocus : null,
                  ]}
                  value={values.nameProduct}
                  onFocus={handleFocus}
                  onBlur={() => {
                    handleBlur();
                    setFieldTouched('nameProduct');
                  }}
                  placeholder="Tên sản phẩm"
                  onChangeText={text => {
                    setnameProduct(text);
                    handleChange('nameProduct')(text);
                  }}
                />
                {touched.nameProduct && errors.nameProduct && (
                  <Text style={styles.errorTsx}>{errors.nameProduct}</Text>
                )}
              </View>

              <ProductImg setImage={setImg} />

              <View>
                <Text style={[styles.textIcon, styles.titleName]}>Mô tả</Text>
                <TextInput
                  multiline
                  numberOfLines={2}
                  style={[
                    styles.textInput,
                    styles.Inputname,
                    isFocusedDetail ? styles.textInputFocus : null,
                  ]}
                  onFocus={handleFocusDetail}
                  onBlur={handleBlurDetail}
                  placeholder="Mô tả sản phẩm"
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
                placeholder="Chọn vùng đặc sản"
                searchPlaceholder="Tìm kiếm..."
                value={selectedItem}
                onChange={handleDomainChange}
                renderLeftIcon={() => (
                  <Ionicons
                    name="shield-checkmark-outline"
                    style={styles.IconCheck}></Ionicons>
                )}
              />
              <Dropdown
                value={values.category || selectedItem}
                onBlur={() => {
                  setFieldTouched('category');
                }}
                onChangeText={text => {
                  setFieldValue('category', text.valueOf);
                }}
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={dataCategory}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Thể loại hàng"
                searchPlaceholder="Tìm kiếm..."
                onChange={handleCategoryChange}
                renderLeftIcon={() => (
                  <Ionicons
                    name="fast-food-outline"
                    style={styles.IconCheck}></Ionicons>
                )}
              />
              {touched.category && errors.category && (
                <Text style={styles.errorTsx}>{errors.category}</Text>
              )}

              <View>
                <View style={styles.group}>
                  <TouchableWithoutFeedback
                    onPress={() => handlePress(priceInputRef)}>
                    <Text style={[styles.textIcon, styles.titleName]}>
                      Giá (vnđ)
                    </Text>
                  </TouchableWithoutFeedback>
                  <TextInput
                    ref={priceInputRef}
                    onFocus={() => handlePress(priceInputRef)}
                    onBlur={() => setFieldTouched('priceProduct')}
                    style={[styles.textInput, {textAlign: 'right'}]}
                    placeholder="Giá"
                    value={formatPrice(priceProduct) || values.priceProduct}
                    onChangeText={text => {
                      setpriceProduct(text);
                      handleChange('priceProduct')(text);
                    }}
                    keyboardType="numeric"
                  />
                </View>
                {touched.priceProduct && errors.priceProduct && (
                  <Text style={styles.errorTsx}>{errors.priceProduct}</Text>
                )}
              </View>

              <View>
                <View style={styles.group}>
                  <TouchableWithoutFeedback
                    onPress={() => handlePress(quantityInputRef)}>
                    <Text style={[styles.textIcon, styles.titleName]}>
                      Số lượng
                    </Text>
                  </TouchableWithoutFeedback>
                  <TextInput
                    ref={quantityInputRef}
                    onFocus={() => handlePress(quantityInputRef)}
                    onBlur={() => setFieldTouched('quantityProduct')}
                    style={[styles.textInput, {textAlign: 'right'}]}
                    placeholder="Số lượng"
                    value={
                      formatWeight(quantityProduct) || values.quantityProduct
                    }
                    keyboardType="numeric"
                    onChangeText={text => {
                      setquantityProduct(text);
                      handleChange('quantityProduct')(text);
                    }}
                  />
                </View>
                {touched.quantityProduct && errors.quantityProduct && (
                  <Text style={styles.errorTsx}>{errors.quantityProduct}</Text>
                )}
              </View>

              <View>
                <View style={styles.group}>
                  <TouchableWithoutFeedback
                    onPress={() => handlePress(weightInputRef)}>
                    <Text style={[styles.textIcon, styles.titleName]}>
                      Cân nặng (kg)
                    </Text>
                  </TouchableWithoutFeedback>
                  <TextInput
                    ref={weightInputRef}
                    onFocus={() => handlePress(weightInputRef)}
                    onBlur={() => setFieldTouched('weightProduct')}
                    value={
                      formatQuantity(weightProduct) || values.weightProduct
                    }
                    keyboardType="numeric"
                    style={[styles.textInput, {textAlign: 'right'}]}
                    placeholder="Cân nặng"
                    onChangeText={text => {
                      setweightProduct(text);
                      handleChange('weightProduct')(text);
                    }}
                  />
                </View>
                {touched.weightProduct && errors.weightProduct && (
                  <Text style={styles.errorTsx}>{errors.weightProduct}</Text>
                )}
              </View>

              <TouchableOpacity
                onPress={saveProduct}
                disabled={!isValid}
                style={[
                  styles.sumbitBtn,
                  {backgroundColor: isValid ? '#ffa000' : '#FAE1B7'},
                ]}>
                <Text style={[styles.BtnAdd]} onPress={saveProduct}>
                  Thêm sản phẩm
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    paddingVertical: 60,
    // paddingBottom: 40,
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
    marginBottom: 20,
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

  Loadingcontainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
  },
});

export default AddProduct;
