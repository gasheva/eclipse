import provider from '@/services/Api';

export default {
    state:     {
        currencies:     JSON.parse(sessionStorage.getItem('currencies')),
        lastDateUpdate: sessionStorage.getItem('lastDateUpdate'),
        RUR:            {
            CharCode: 'RUR',
            Nominal:  1,
            Name:     'Российский рубль',
            Value:    1,
            Previous: 1,
        },
    },
    getters:   {
        currencies:     state => state.currencies,
        lastDateUpdate: state => state.lastDateUpdate,
        RUR:            state => state.RUR,
    },
    mutations: {
        SET_LAST_DATE(state, date) {
            sessionStorage.setItem('lastDateUpdate', date);
            state.lastDateUpdate = date;
        },
        SET_CURRENCIES(state, currencies) {
            currencies.unshift(state.RUR);
            sessionStorage.setItem('currencies', JSON.stringify(currencies));
            state.currencies = currencies;
        },
        CLEAR_CACHE(state) {
            sessionStorage.removeItem('currencies');
            state.currencies = null;
        },
    },
    actions:   {
        async updateCurrencies({commit, getters}) {
            try {
                // checking cache
                // if dates coincide & cache exists then take from cache
                if (getters.currencies && getters.lastDateUpdate && (new Date(getters.lastDateUpdate)).toDateString() === new Date().toDateString()) {
                    console.log('Cash is relevant');
                } else {
                    // if cache is irrelevant
                    commit('CLEAR_CACHE');
                    let newCurrencies = await provider.get('/daily_json.js');
                    if (newCurrencies && newCurrencies.data && newCurrencies.data.Valute) {
                        newCurrencies = Object.values(newCurrencies.data.Valute);
                        commit('SET_LAST_DATE', new Date());
                        commit('SET_CURRENCIES', newCurrencies);        // update cache
                    }
                }
            } catch (err) {
                // network error
                if (err.message && err.message === 'Network Error') {
                    commit('SET_ERROR', err.message);
                }
                // other errors
                else {
                    commit('SET_ERROR', err.response.data);
                    commit('CLEAR_CACHE');
                }
            }
        },
    },
};