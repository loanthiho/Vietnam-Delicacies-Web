import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {getUserAccessToken} from '../api/storage';
import {showMessage} from 'react-native-flash-message';
export const addToCart = async (
  id_product: string,
  navigation: any,
  token: string,
) => {
  if (token) {
    try {
      console.log('posting ...');
      console.log('id product befor add:', id_product);
      const res = await axios.post(
        `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts/${id_product}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (res) {
        return navigation.navigate('Giỏ hàng');
      } else {
        console.log('can not add to cart ');
      }
    } catch (error) {
      console.log('khong them duoc', error);
    }
  } else {
    showMessage({
      type: 'danger',
      message: 'Bạn cần đăng nhập',
    });
    return navigation.navigate('SignIn');
  }
};

const fetchDataShoppingcart = async (token: string) => {
  const res = await axios.get(
    'http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log('data res:', res.data);
  return res.data;
};

export const useShoppingCartData = () => {
  return useQuery('shoppingCartData', fetchDataShoppingcart);
};
