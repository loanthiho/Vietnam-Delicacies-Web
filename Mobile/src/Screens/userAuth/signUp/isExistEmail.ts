import {useQuery} from '@tanstack/react-query';
import api from '../../../api/request';

const checkExistEmail = (email: string) => {
  console.log('emil need to check:', email);
  const fetchDataUser = async () => {
    const res = await api.get('users', {}, {});
    return res.data;
  };

  const {data, isError, isPending, error} = useQuery({
    queryKey: ['userData'],
    queryFn: fetchDataUser,
  });

  if (isError) {
    console.log('Fetching user data error:', error);
  }

  if (data) {
    console.log('Data Fetched:', data);
    // You can render the data here
    // For example:
    return data;
  }

  if (isPending) {
    console.log('Fetching user data...');
  }
};

export default checkExistEmail;
