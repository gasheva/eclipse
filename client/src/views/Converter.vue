<template>
  <div class="row">
    <h3>Конвертер</h3>
    <div v-if="!loading">
      <converter-card :currencies="currencies" 
      :selected="left.CharCode" 
      :readOnly="false"
      @changed="onChangeLeft"
      :key="'sw'+swapCounter"
      />
      <div class="text-left">
        <a href="" @click.prevent="swapCurrencies">
          <i class="material-icons white-text">swap_horiz</i>
        </a>
      </div>
      <converter-card :currencies="currencies" 
      :selected="right.CharCode" 
      :computedNominal="right.Nominal"
      :readOnly="'readonly'"
      @changed="onChangeRight"
      :key="counter"
      />
    </div>
    <loader v-else/>
  </div>
</template>

<script>
import ConverterCard from '../components/app/ConverterCard.vue'
import swapMixin from "../mixins/swap.mixin";
export default {
  components:{ConverterCard},
  data() {
    return {
      loading: true,
      currencies: null, // списко всех валют
      mainCurrency: null,
      left: null,   // главная валюта
      right: null,  // второстепенная валюта
      counter: 0,    // для оповещения об изменении номинала
      swapCounter: 0
    };
  },
  mixins: [swapMixin],
  async created(){
    await this.$store.dispatch('updateCurrencies');
    this.currencies = this.$store.getters.currencies;
    if(this.currencies){
      this.mainCurrency = this.$store.getters.RUR;  // по умолчанию основная валюта - рубль
      this.loading = false;
    }
    this.left = Object.assign({},this.currencies[0]);
    this.right = Object.assign({}, this.currencies[0]);
  },
  methods:{
    onChangeLeft(val){
      console.log('left value changes');
      this.left = Object.assign({}, val);
      this.right.Nominal = this.calculateNewRight(
        this.left.Nominal,
        this.left.Value,
        this.right.Value
      );
      this.counter++;   //триггер для обновления дочернего элемента
    },
    onChangeRight(val){
      console.log('right value changes');
      this.right = Object.assign({}, val);
      this.right.Nominal = this.calculateNewRight(
        this.left.Nominal,
        this.left.Value,
        this.right.Value
      );
      this.counter++;
    },
    swapCurrencies(){
      this.swap();
      this.counter++;
      this.swapCounter++;
    }
  }
};
</script>