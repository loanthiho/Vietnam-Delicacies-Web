import axios from 'axios';

const baseAxios = axios.create({
    baseURL: `http://localhost:3000/`
});

const api = {
    get: (enpoint: string, params: {}, headers: {}) => baseAxios.get(enpoint, { params, headers, }),
    post: (enpoint: string, data: {}, params: {}, headers: {}) => baseAxios.post(enpoint, data, { params, headers, }),
    patch: (enpoint: string, data: {}, params: {}, headers: {}) => baseAxios.patch(enpoint, data, { params, headers, }),
    put: (enpoint: string, data: {}, params: {}, headers: {}) => baseAxios.put(enpoint, data, { params, headers, }),
    delete: (enpoint: string, data: {}, params: {}, headers: {}) => baseAxios.delete(enpoint, { params, headers, }),
}

export default api;