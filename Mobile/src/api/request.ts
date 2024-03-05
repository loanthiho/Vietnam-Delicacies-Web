import axios from 'axios';
import {getUserAccessToken} from './storage';

var TOKEN = '';
const getUAToken = async () => {
  try {
    const userCredentials = await getUserAccessToken();
    if (userCredentials) {
      TOKEN = userCredentials.token;
    }
  } catch (error) {
    console.log('Error while get token');
  }
};

getUAToken();
const baseAxios = axios.create({
  // -- AWS baseURL______
  // baseURL: `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/`,
  // -- Local baseURL_____
  baseURL: `https://b169-2402-9d80-41f-98da-ec7e-76e1-6ebd-5f38.ngrok-free.app/`, // Can be usually change!
  headers: {
    Authorization: `Bearer ${TOKEN ? TOKEN : null}`,
  },
});
const api = {
  get: async (enpoint: string, params: {}, headers: {}) => {
    const response = await baseAxios.get(enpoint, {params, headers});
    return response;
  },
  post: async (enpoint: string, data: {}, params: {}, headers: {}) => {
    const response = await baseAxios.post(enpoint, data, {params, headers});
    return response;
  },
  patch: async (enpoint: string, data: {}, params: {}, headers: {}) => {
    const response = await baseAxios.patch(enpoint, data, {params, headers});
    return response;
  },
  put: async (enpoint: string, data: {}, params: {}, headers: {}) => {
    const response = await baseAxios.put(enpoint, data, {params, headers});
    return response;
  },
  delete: async (enpoint: string, params: {}, headers: {}) => {
    const response = await baseAxios.delete(enpoint, {params, headers});
    return response;
  },
};

export default api;
