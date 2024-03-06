import {useMutation, useQuery} from '@tanstack/react-query';
import api from '../../../api/request';
import axios from 'axios';

const useCheckEmail = () => {
  const isExistEmail = async (email: string) => {
    try {
      await api.get(`users/by-email/${email}`, {}, {});
      return true;
    } catch (error) {
      return false; // Return data directly, assuming you want to access data directly
    }
  };
  return {isExistEmail};
};
export default useCheckEmail;
