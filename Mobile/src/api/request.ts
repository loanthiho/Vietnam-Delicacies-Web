import axios from 'axios';
import {getUserAccessToken} from './storage';

const buildAxios = async (auth: boolean = true) => {
  let headers = {};
  if (auth) {
    console.log('before token');
    const tokenData = await getUserAccessToken();
    console.log(' token', tokenData);
    if (!tokenData) {
      // redirect to login
    }
    headers = {Authorization: `Bearer ${tokenData.token}`};
  }
  return axios.create({
    baseURL: `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/`,
    // baseURL: ` https://349a-113-176-99-140.ngrok-free.app/`,
    headers,
  });
};

const performRequest = async (
  method: string,
  endpoint: string,
  auth: boolean = true,
  data: {} = {},
  params: {} = {},
  headers: Record<string, string> = {},
) => {
  console.log('perform', method);
  const client = await buildAxios(auth);
  console.log('client', client);
  if (data instanceof FormData) {
    headers['Content-Type'] = 'multipart/form-data';
  }
  const response = await client.request({
    method,
    url: endpoint,
    params,
    headers,
    data,
  });
  console.log('res', response);
  return response;
};

const api = {
  get: async (endpoint: string, {params, headers, auth}: any = {}) =>
    performRequest('get', endpoint, auth, {}, params, headers),
  post: async (endpoint: string, {params, data, headers, auth}: any = {}) =>
    performRequest('post', endpoint, auth, data, params, headers),
  patch: async (endpoint: string, {params, data, headers, auth}: any = {}) =>
    performRequest('patch', endpoint, auth, data, params, headers),
  put: async (endpoint: string, {params, data, headers, auth}: any = {}) =>
    performRequest('put', endpoint, auth, data, params, headers),
  delete: async (endpoint: string, {params, data, headers, auth}: any = {}) =>
    performRequest('delete', endpoint, auth, {}, params, headers),
};

export default api;
