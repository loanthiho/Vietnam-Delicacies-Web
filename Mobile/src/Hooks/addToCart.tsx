import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import api, {token} from '../api/request';
export const addToCart = async (id_product: string, navigation: any) => {
  try {
    console.log('posting ...');
    const res = await api.post(
      `carts/${id_product}`,{},{},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (res) {
      console.log('response', res);
      return navigation.navigate('Giỏ hàng');
    } else {
      console.log('can not add to cart ');
    }
  } catch (error) {
    console.log("khong them duoc",error);
  }
};

const fetchDataShoppingcart = async () => {
  const res = await api.get(
    `carts`,
    {},
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
