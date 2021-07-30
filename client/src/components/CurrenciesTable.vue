<template>
  <div class="container">
    <h3>Валюты</h3>
    <div v-for="currency in currencies" :key="currency.CharCode">
      <TwoCurrencies :secondCurrency="currency" :mainCurrency="mainCurrency"/>
    </div>
  </div>
</template>

<script>
import TwoCurrencies from "./TwoCurrencies.vue";
export default {
  components: { TwoCurrencies },
  data() {
    return {
      currencies: [
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
    };
  },
};
</script>