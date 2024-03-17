import {useQuery} from '@tanstack/react-query';
import api from '../api/request';

const useGetOrder = (status: string) => {
  const {data, isLoading} = useQuery({
    queryKey: ['get_order_CHO_XAC_NHAN'],
    queryFn: async () => {
      const res = await api.get('orders', {params: {status: status}});
      if (res) {
        return res.data?.data;
      }
    },
    refetchOnWindowFocus: 'always',
  });
  return {data, isLoading};
};

export default useGetOrder;
