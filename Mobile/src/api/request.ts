import axios from 'axios';
export const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImJmMWNmNjEwLTg3NDgtNDhlYy1hNWU4LTZkMDcwODZjOTNjNCIsImVtYWlsIjoiZGkuaG8yNGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJDNqcktpb1YwQk16MldBNmNZWC5OZi5YVVRCOHlRcDUwcmpBbzJKdC93QnZoMGp6NGFjVmFhIiwibmFtZSI6IkRpIEhvIiwiaWF0IjoxNzA5NTM2MTQzfQ.GjUo09rUAKWt7BwvuvgoQ71BmUbue3vKFnXCHR20-2Y';
const baseAxios = axios.create({
  baseURL: `https://e8aa-113-176-99-140.ngrok-free.app/`,
});

const api = {
    get: async (endpoint: string, params = {}, headers = {}) => {
        const res = await baseAxios.get(endpoint, { params, headers });
        return res.data;
    },
    post: async (endpoint: string, data = {}, params = {}, headers = {}) => {
        const res = await baseAxios.post(endpoint, data, { params, headers });
        return res.data;
    },
    patch: async (endpoint: string, data = {}, params = {}, headers = {}) => {
        const res = await baseAxios.patch(endpoint, data, { params, headers });
        return res.data;
    },
    put: async (endpoint: string, data = {}, params = {}, headers = {}) => {
        const res = await baseAxios.put(endpoint, data, { params, headers });
        return res.data;
    },
    delete: async (endpoint: string, data = {}, params = {}, headers = {}) => {
        const res = await baseAxios.delete(endpoint, { params, headers, data });
        return res.data;
    }
}
    

export default api;