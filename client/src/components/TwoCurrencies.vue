<template>
  <card :title="secondCurrency.Name">
    <div class="row">
      <div class="col s2 text-left">
        {{ left | currency(true) }}
      </div>
      <div class="col s2 text-left">
        {{ right | currency(true) }}
      </div>
      <div class="col s6 text-right" :class="[trend.color]">
        {{trend.arrow}}{{ trend | currency }}
      </div>
    </div>
  </card>
</template>

<script>
import swapMixin from "../mixins/swap.mixin";
export default {
  props: {
    secondCurrency: null,
    mainCurrency: null,
  },
  mixins: [swapMixin],
  computed: {
    // тренд цены
    trend() {
      //TODO(добавить относительно основной валюты)
      const dif = Math.abs(this.left.Value - this.left.Previous);
      if (this.left.Value > this.left.Previous)
        return { Nominal: dif, arrow: " ▲", color: "green-text" };
      if (this.left.Value < this.left.Previous)
        return { Nominal: dif, arrow: " ▼", color: "red-text" };
      return "";
    },
  },
  created() {
    this.setup(this.mainCurrency, this.secondCurrency);
  },
};
</script>

<style scoped>
.text-left {
  text-align: start;
}
.text-right {
  text-align: end;
}
</style>