<template>
  <div class="row">
    <h3>Конвертер</h3>
    <div v-if="!loading">
      <converter-card :currencies="currencies" 
      :selected="left.CharCode" 
      :disabledSelect="false"
      @changed="onChangeLeft"
      :key="left.CharCode"
      />
      <div class="text-left">
        <a href="" @click.prevent="swapCurrencies">
          <i class="material-icons">swap_horiz</i>
        </a>
      </div>
      <converter-card :currencies="currencies" 
      :selected="right.CharCode" 
      :disabledSelect="false"
      :computedNominal="right.Nominal"
      @changed="onChangeRight"
      :key="right.CharCode+counter"
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
      currencies: null,
      mainCurrency: null,
      left: null,
      right: null,
      counter: 0    // для оповещения об изменении номинала
    };
  },
  mixins: [swapMixin],
  created(){
    this.$store.dispatch('updateCurrencies');
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
    }
  }
};
</script>