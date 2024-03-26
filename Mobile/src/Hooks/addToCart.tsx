import {QueryClient, useQuery, useQueryClient} from '@tanstack/react-query';
import api from '../api/request';
import {showMessage} from 'react-native-flash-message';

export const addToCart = async (id_product: string, qty: number) => {
  try {
    console.log('posting ...');
    console.log('id product befor add:', id_product, qty);
    const res = await api.post(`carts/${id_product}`, {
      data: {quantity: qty},
    }); 
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
  try {
    const res = await api.get('carts');
    return res.data;
  } catch (error) {
    console.log('Cart fetch Error:', error?.message);
    showMessage({
      type: 'danger',
      message:
        error?.message == 'Request failed with status code 502'
          ? 'Lỗi! Không thể kết nối đến dữ liệu'
          : error?.message,
    });
    return [];
  }
};

export const useShoppingCartData = () => {
  return useQuery({
    queryKey: ['shoppingCart'],
    queryFn: fetchDataShoppingcart,
  });
};
