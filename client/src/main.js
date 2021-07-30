import Vue from 'vue'
import Vuelidate from "vuelidate";

import App from './App.vue'
import router from './router'
import store from './store'
import Card from './components/app/Card'

import currencyFilter from './filters/currency.filter'

import 'materialize-css/dist/css/materialize.min.css'

Vue.config.productionTip = false

Vue.use(Vuelidate);
Vue.filter('currency', currencyFilter);
Vue.component('card', Card);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')