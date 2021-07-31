<template>
  <div class="container">
    <h3>Валюты</h3>
    <div v-if="!loading">
      <div v-for="currency in currencies" :key="currency.CharCode">
        <TwoCurrencies
          :secondCurrency="currency"
          :mainCurrency="mainCurrency"
        />
      </div>
    </div>
    <loader v-else />
  </div>
</template>

<script>
import TwoCurrencies from "./TwoCurrencies.vue";
export default {
  components: { TwoCurrencies },
  data() {
    return {
      currencies: [],
      loading: true,
      mainCurrency: {
        CharCode: "RUB",
        Nominal: 1,
        Name: "Российский рубль",
        Value: 1,
        Previous: 1,
      },
    };
  },
  async mounted() {
    await this.$store.dispatch("updateCurrencies");
    this.currencies = this.$store.getters.currencies;
    if(this.currencies) this.loading = false;
  },
};
</script>