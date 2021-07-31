<template>
  <div class="container">
    <div class="row">
        <div class="col s12">
          <div class="row">
            <div class="input-field col s12">
              <input
                class="input-search"
                id="input-search"
                placeholder="Валюта"
                v-model.trim="search"
              />
              <i class="material-icons prefix">search</i>
            </div>
          </div>
        </div>
      </div>
      <div v-for="currency in items" :key="currency.CharCode">
        <TwoCurrencies
          :secondCurrency="currency"
          :mainCurrency="mainCurrency"
        />
      </div>
    </div>
</template>

<script>
import M from 'materialize-css'
import TwoCurrencies from "./TwoCurrencies.vue";
export default {
  components: { TwoCurrencies },
  props:{
    currencies: null,
    mainCurrency: null
  },
  data(){
    return{
      search:'',
      items: []
    }
  },
  mounted(){
    this.items = this.currencies;
    setTimeout(()=> {
      M.updateTextFields();
    })
  },
  watch:{
    search:{
      handler:function(val){
        this.searchHandler(val);
      }
    }
  },
  methods:{
    searchHandler(val){
      console.log(val);
      if(!val){
        this.items = this.currencies;
      }else{
        let pattern = new RegExp(`${val}`, 'i');
        this.items = this.currencies.filter(cur=>pattern.test(cur.Name) || pattern.test(cur.CharCode));
      }
    }
  }
  
};
</script>