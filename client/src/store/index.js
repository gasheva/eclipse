import Vue      from 'vue';
import Vuex     from 'vuex';
import currency from '@/store/currency';

Vue.use(Vuex);

export default new Vuex.Store({
    state:     {
        error: null,    // последняя возникшая ошибка при работе с сервером
    },
    getters:   {
        error: (s) => s.error,
    },
    mutations: {
        SET_ERROR(state, error) {
            state.error = null;
            state.error = error;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        },
    },
    modules:   {
        currency,
    },
});
