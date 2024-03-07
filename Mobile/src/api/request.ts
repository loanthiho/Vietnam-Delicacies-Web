import axios from 'axios';
export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImY1YmFiNGFjLTI2OGYtNDFhOS05M2M3LThmMmNiYzQwZTlkZCIsImVtYWlsIjoiZGkyLmhvMjRnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCQ5VVhBWDdPVnZPZzlyNThveVlpaVplRzcwT1hNUS82MjhueTFqZy9xOW9kLmxvNHp0NDduMiIsIm5hbWUiOiJEaSBIbyIsImlhdCI6MTcwOTY4OTc1M30.P2GZtfemFmu0rxTQTqfAy6vayC9eX_LDS7Xduf9APK0';
const baseAxios = axios.create({
  baseURL: `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/`,
});

const api = {
  get: async (endpoint: string, params = {}, headers = {}) => {
    const res = await baseAxios.get(endpoint, {params, headers});
    return res.data;
  },
  post: async (endpoint: string, data = {}, params = {}, headers = {}) => {
    const res = await baseAxios.post(endpoint, data, {params, headers});
    return res;
  },
  patch: async (endpoint: string, data = {}, params = {}, headers = {}) => {
    const res = await baseAxios.patch(endpoint, data, {params, headers});
    return res.data;
  },
  put: async (endpoint: string, data = {}, params = {}, headers = {}) => {
    const res = await baseAxios.put(endpoint, data, {params, headers});
    return res.data;
  },
  delete: async (endpoint: string, data = {}, params = {}, headers = {}) => {
    const res = await baseAxios.delete(endpoint, {params, headers, data});
    return res.data;
  },
};

export default api;
