<template>
  <div class="row">
    <h1>Converter</h1>
    <converter-card :currencies="currencies" 
    :mainCurrency="left" 
    :disabledSelect="false"
    @changed="onChangeLeft"
    />
    <div class="col s2 text-left">
      <a href="" @click.prevent="swapCurrencies">
        <i class="material-icons">swap_horiz</i>
      </a>
    </div>
    <converter-card :currencies="currencies" 
    :mainCurrency="mainCurrency" 
    :disabledSelect="false"
    @changed="onChangeLeft"
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
      right: null
    };
  },
  mixins: [swapMixin],
  created(){
    this.left = Object.assign({},this.currencies[0]);
    this.right = Object.assign({},this.mainCurrency);
  },
  methods:{
    onChangeLeft(val){
      console.log('left value changes');
      console.log(val);
      this.left = Object.assign({},this.currencies.find(cur=>cur.CharCode===val.selected) || this.mainCurrency);
      this.calculateNewRight(
        this.left.Nominal,
        this.left.Value,
        this.right.Value
      );
    },
    swapCurrencies(){
      this.swap();
    }
  }
};
</script>