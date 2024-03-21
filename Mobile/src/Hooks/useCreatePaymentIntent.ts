import {useMutation} from '@tanstack/react-query';
import api from '../api/request';

const useCreatePaymentIntent = () => {
  return useMutation({
    mutationKey: ['paymentIntent'],
    mutationFn: async data => {
      const res = await api.post('payments/intents', {data: {amount: data}});
      if (res) {
        return res.data;
      }
    },
  });
};

export default useCreatePaymentIntent;
