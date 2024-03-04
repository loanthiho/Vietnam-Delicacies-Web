import axios from 'axios';
export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImVkNWE3NGU3LTgwZDUtNDllOS1iMDAxLTNlNWQxY2UxYjQ3NCIsImVtYWlsIjoiZGkxLmhvMjRnbWFpbC5jb20iLCJwYXNzd29yZCI6IiQyYSQxMCRMSGFZSm45YWhQbzh1elZKaXZnT0x1Q2FKMXV0dU1tWWRlUFpiTlQ2cTNxY2pHOHEwVlQ3YSIsIm5hbWUiOiJEaSBIbyIsImlhdCI6MTcwOTUzODgxMX0.xYYgaEY7XmxtGNukHZxB5RlzSBe1rSjd3mhZc7doYMY';
const baseAxios = axios.create({
  baseURL: `https://972f-2401-d800-25d1-71ab-dd89-e81e-b165-cabd.ngrok-free.app/`,
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
