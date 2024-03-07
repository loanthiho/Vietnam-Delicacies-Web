import React, {useEffect, useState} from 'react';
import {getUserCombineData} from '../../../api/storage';
import {useMutation} from '@tanstack/react-query';
import api from '../../../api/request';

interface dataCredentials {
  name: string;
  email: string;
  password: string;
  role: string;
}
interface signUpHook {
  userCredentials: {};
  signUp: () => void;
  onChange: (feild: string, value: string) => void;
}

const useSignUp = (): signUpHook => {
  const [userCredentials, setUserCredentials] = useState<dataCredentials>({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const onChange = (feild: string, value: string) => {
    setUserCredentials({
      ...userCredentials,
      [feild]: value,
    });
  };

  const signUp = async () => {
    const mutation = useMutation({
      mutationKey: ['signUp'],
      mutationFn: async () => {
        const response = await api.post('users/sign-up', {
          auth: false,
          data: userCredentials,
        });
        return response;
      },
    });
    return mutation;
  };
  return {signUp, onChange, userCredentials};
};
export default useSignUp;
