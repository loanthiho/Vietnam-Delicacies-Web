import axios from 'axios';
import {useMutation} from '@tanstack/react-query';

const useAddToCart = () => {
  const addToCart = async (id_product: string) => {
    // useMutation(async id_product => {
    //   try {
    //     const response = await axios.post(
    //       `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts/${id_product}`,
    //     );
    //     return response.data;
    //   } catch (error) {
    //     throw new Error('Failed to add item to cart');
    //   }
    // });
    const response = await axios.post(
      `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/carts/${id_product}`,
      {headers: {Authorization: `Bearer ${token}`}},
    );
  };
  return;
};

export default useAddToCart;
