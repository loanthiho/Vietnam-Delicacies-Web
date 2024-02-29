
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useAddToCart = () => {
  return useMutation(async(selectedItem: any) => {
    const response = await axios.post('http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/productcarts', {
      selectedItem: selectedItem,
    });
    return response.data;
  });
};

export default useAddToCart;
