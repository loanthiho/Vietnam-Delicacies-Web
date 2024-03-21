import {useMutation} from '@tanstack/react-query';
import api from '../api/request';
import {useQueryClient} from '@tanstack/react-query';
import {showMessage} from 'react-native-flash-message';
const useCheckout = (navigation: any) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['checkout'],
    mutationFn: async (data: object) => {
      const rCheckOut = await api.post('orders', {data: data});
      return rCheckOut.data;
    },
    onSuccess: async (data, vari) => {
      await queryClient.invalidateQueries({
        queryKey: ['shoppingCart'],
      });
      await queryClient.invalidateQueries({
        queryKey: ['get_order_CHO_XAC_NHAN'],
      });
      return navigation.navigate({name: 'SuccessfulPayment'});
    },
    onError: async (err, vari, context) => {
      showMessage({
        type: 'danger',
        message: err.response?.data?.error,
      });
    },
  });
  return mutation;
};

export default useCheckout;
