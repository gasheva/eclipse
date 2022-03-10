import axios from 'axios';
import store from '@/store/index';

const provider = axios.create({
    baseURL: process.env.VUE_APP_CURRENCY_PROVIDER,
});

provider.interceptors.response.use(null, error => {
    console.log(error);
    store.commit('SET_ERROR', error?.response?.data);
    store.commit('CLEAR_CACHE');
});

export default provider;