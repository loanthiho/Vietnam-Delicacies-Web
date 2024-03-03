import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';

const AddProduct = () => {
  //DataCategory
  const [categoryAPI, setDataCategoryAPI] = useState<any[]>();
  const [dataCategory, setDataCategory] = useState([]);
  const [categoryId, setcategoryId] = useState(null);

  const SignupSchema = Yup.object().shape({
    category: Yup.string().required('Chưa chọn loại hàng'),
  });

  const apiCategory = 'https://8fae-113-176-99-140.ngrok-free.app/categories';
  useEffect(() => {
    axios
      .get(apiCategory)
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
      categoryId: item.value,
    });
    console.log('category:', categoryId);
  };



  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MGU4NzMwLWY0YmMtNGIwOC1hNWFkLTdkMDU1OWQ5MDk5OSIsImVtYWlsIjoiZGkuaGkyNGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJFVJanBxLlRWMjBSaHhXRjl2bEEyMWVVZjdSTmJUR0hIZ0kzS1Q3RFpqL3F1Wmd5MS9zMGguIiwibmFtZSI6IkRpIEhvIiwiaWF0IjoxNzA5MzQ0NDI4fQ.yZQ5N61U5srLsH7fUVWP2_8bHtufWx07Q-i3KvKIq7E';
  const saveProduct = async () => {

  };

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
      validationSchema={SignupSchema}
      >
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        setFieldValue,
        isValid,
        handleSubmit,
      }) => (
        <View>
          <View style={styles.title}>
            <Ionicons name="arrow-back-outline" style={styles.arrowLeft} />
            <Text style={styles.Subtitle}>Thêm sản phẩm</Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            <View style={styles.FormAdd}>
              <Dropdown
                value={values.category}
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

              <TouchableOpacity
                onPress={saveProduct}
                disabled={!isValid}
                style={[
                  styles.sumbitBtn,
                  {backgroundColor: isValid ? '#ffa000' : '#FAE1B7'},
                ]}>
                <Text style={[styles.BtnAdd]}>Thêm sản phẩm</Text>
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

export default AddProduct;
