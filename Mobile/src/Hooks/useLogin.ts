import {useMutation} from '@tanstack/react-query';
import api from '../api/request';

const useLogin = () => {
  const login = async (data: {}) => {
    const res = await api.post('users/sign-in', data, {}, {});
    return res;
  };

  const mutation = useMutation({
    mutationKey: ['login'],
    mutationFn: login,
  });

  return {mutation};
};

export default useLogin;
