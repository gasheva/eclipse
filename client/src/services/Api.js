import axios from 'axios';

export default {
    async getCurrencies() {
        return axios('https://www.cbr-xml-daily.ru/daily_json.js');
    },
};