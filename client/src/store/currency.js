import Api from '../services/Api';
export default{
  state:{
    currencies: JSON.parse(sessionStorage.getItem('currencies')),
    lastDateUpdate: sessionStorage.getItem('lastDateUpdate'),
    RUR: {
      CharCode: "RUR",
      Nominal: 1,
      Name: "Российский рубль",
      Value: 1,
      Previous: 1,
    }
  },
  getters:{
    currencies: state => state.currencies,
    lastDateUpdate: state => state.lastDateUpdate,
    RUR: state => state.RUR
  },
  mutations:{
    SET_LAST_DATE(state, date){
      sessionStorage.setItem('lastDateUpdate', date);
      state.lastDateUpdate = date;
    },
    SET_CURRENCIES(state, currencies){
      sessionStorage.setItem('currencies', JSON.stringify(currencies));
      state.currencies = currencies;
      state.currencies.unshift(state.RUR);
    },
    CLEAR_CACHE(state){
      sessionStorage.removeItem('currencies');
      state.currencies = null;
    }
  },
  actions:{
    async updateCurrencies({commit, getters}){
      try{
        // проверка кэша
        // если даты совпадают и кэш существует, то обращение к кэшу
        if (getters.currencies && getters.lastDateUpdate && (new Date(getters.lastDateUpdate)).toDateString() === new Date().toDateString()){
          console.log('Cash is relevant');
        }else{
          // запрос в случае отсутствия\нерелевантности кэша
          commit('CLEAR_CACHE');
          let newCurrencies = Object.values((await Api.getCurrencies()).data.Valute);
          console.log(newCurrencies);
          commit('SET_LAST_DATE', new Date());
          // обновление кэша
          commit('SET_CURRENCIES', newCurrencies);
        }
      }catch(err){
        // ошибка сети
        if (err.message && err.message === "Network Error"){
            commit('SET_ERROR', err.message);
          }
          // другие ошибки
          else{
            commit('SET_ERROR', err.response.data);
            commit('CLEAR_CACHE');
          }
      }
    }
  }
}