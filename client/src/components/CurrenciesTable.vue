<template>
  <div class="container">
    <h3>Валюты</h3>
      <div v-for="currency in currencies" :key="currency.CharCode">
        <TwoCurrencies
          :secondCurrency="currency"
          :mainCurrency="mainCurrency"
        />
      </div>
    </div>
</template>

<script>
import TwoCurrencies from "./TwoCurrencies.vue";
export default {
  props:{
    currencies: null,
    mainCurrency: null
  },
  components: { TwoCurrencies },
};
</script>