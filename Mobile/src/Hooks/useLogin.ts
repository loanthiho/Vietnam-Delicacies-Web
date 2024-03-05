import {useMutation} from '@tanstack/react-query';
import api from '../api/request';
import {useState} from 'react';

const useLogin = () => {
  const [errorMess, setErrorsMess] = useState<string>('');
  const mutation = useMutation({
    mutationKey: ['signin'],
    mutationFn: async (data: any) => api.post('users/sign-in', data, {}, {}),
    onError: (error, variable, context) => {
      if (error.response?.data) {
        setErrorsMess(error.response?.data?.message);
      } else {
        setErrorsMess(error?.response?.headers?.statusdescription);
      }
    },
  });

  return {mutation, errorMess, setErrorsMess};
};

export default useLogin;
