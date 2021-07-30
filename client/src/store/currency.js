import Api from ('../services/Api');
export default{
  state:{
    currencies: sessionStorage.getItem('currencies'),
    lastDataUpdate: sessionStorage.lastDataUpdate
  },
  getters:{
    currencies: state => state.currencies
  },
  mutations:{
    SET_CURRENCIES(state, currencies){
      sessionStorage.setItem('currencies', currencies);
      state.currencies = currencies;
    }
  },
  actions:{
    async updateCurrencies({commit, dispatch}){
      try{
        // проверка кэша
        // если даты совпадают и кэш существует, то обращение к кэшу
        if (currencies && (new Date(this.lastDataUpdate)).toDateString() === new Date().toDateString()){
          
        }else{
          // запрос в случае отсутствия\нерелевантности кэша
          const newCurrencies = await Api.getCurrencies();
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
          }
      }
    }
  }
}