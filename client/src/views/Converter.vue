<template>
  <div class="row">
    <h3>Конвертер</h3>
    <converter-card :currencies="currencies" 
    :selected="left.CharCode" 
    :disabledSelect="false"
    @changed="onChangeLeft"
    :key="counter"
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
    :key="counter"
    />
  </div>
</template>

<script>
import ConverterCard from '../components/app/ConverterCard.vue'
import swapMixin from "../mixins/swap.mixin";
export default {
  components:{ConverterCard},
  data() {
    return {
      currencies: [
        {
          CharCode: "RUB",
          Nominal: 1,
          Name: "Российский рубль",
          Value: 1,
          Previous: 1,
        },
        {
          ID: "R01010",
          NumCode: "036",
          CharCode: "AUD",
          Nominal: 1,
          Name: "Австралийский доллар",
          Value: 54.1609,
          Previous: 54.073,
        },
        {
          ID: "R01020A",
          NumCode: "944",
          CharCode: "AZN",
          Nominal: 1,
          Name: "Азербайджанский манат",
          Value: 43.0785,
          Previous: 43.3248,
        },
      ],
      mainCurrency: {
        CharCode: "RUB",
        Nominal: 1,
        Name: "Российский рубль",
        Value: 1,
        Previous: 1,
      },
      left: null,
      right: null,
      counter: 0    // для оповещения об изменении номинала
    };
  },
  mixins: [swapMixin],
  created(){
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
      this.counter++;
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