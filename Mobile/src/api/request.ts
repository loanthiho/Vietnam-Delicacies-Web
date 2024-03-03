import axios from 'axios';

const baseAxios = axios.create({
    baseURL: `http://nodejs-app-env-1.eba-q2t7wpq3.ap-southeast-2.elasticbeanstalk.com/`
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