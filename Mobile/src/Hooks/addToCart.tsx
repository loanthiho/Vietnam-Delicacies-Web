import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import api, {token} from '../api/request';
export const addToCart = async (id_product: string, navigation: any) => {
  try {
    console.log('posting ...');
    console.log('id product befor add:', id_product);
    const res = await axios.post(
      `https://972f-2401-d800-25d1-71ab-dd89-e81e-b165-cabd.ngrok-free.app/carts/${id_product}`,
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
};

const fetchDataShoppingcart = async () => {
  const res = await axios.get(
    'https://972f-2401-d800-25d1-71ab-dd89-e81e-b165-cabd.ngrok-free.app/carts',
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
