import axios from 'axios';

// import { userAccessToken } from './storage';

// const getUserAccessToken = async () => {
//     try {
//         const userCredentials = await userAccessToken();
//         if (userCredentials) {

//         }
//     } catch (error) {

//     }
// }
const baseAxios = axios.create({
  baseURL: `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/`,
});

const api = {
  get: async (enpoint: string, params: {}, headers: {}) => {
    const response = await baseAxios.get(enpoint, {params, headers});
    return response.data;
  },
  post: async (enpoint: string, data: {}, params: {}, headers: {}) => {
    const response = await baseAxios.post(enpoint, data, {params, headers});
    return response.data;
  },
  patch: async (enpoint: string, data: {}, params: {}, headers: {}) => {
    const response = await baseAxios.patch(enpoint, data, {params, headers});
    return response.data;
  },
  put: async (enpoint: string, data: {}, params: {}, headers: {}) => {
    const response = await baseAxios.put(enpoint, data, {params, headers});
    return response.data;
  },
  delete: async (enpoint: string, data: {}, params: {}, headers: {}) => {
    const response = await baseAxios.delete(enpoint, {params, headers});
    return response.data;
  },
};

export default api;
