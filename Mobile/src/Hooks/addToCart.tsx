import axios from 'axios';
import { QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserAccessToken } from '../api/storage';
import api from '../api/request';

export const addToCart = async (id_product: string) => {
  try {
    console.log('posting ...');
    console.log('id product befor add:', id_product);
    const res = await api.post(`carts/${id_product}`);
    if (res) {
      console.log('add response:', res.data);
      // queryClient.invalidateQueries({ queryKey: ['shoppingCart'] })
    } else {
      console.log('can not add to cart ');
    }
  } catch (error) {
    console.log('can not add to cart ');
  }
};

const fetchDataShoppingcart = async () => {
  console.log('fetching');
  const res = await api.get('carts');
  return res.data;
};

export const useShoppingCartData = () => {
  return useQuery({
    queryKey: ['shoppingCart'],
    queryFn: fetchDataShoppingcart,
  });
};
