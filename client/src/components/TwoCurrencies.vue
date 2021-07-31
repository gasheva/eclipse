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
    // тренд цены относительно основной валюты через рубли
    trend() {
      const rightToLeftNew = this.right.Value/this.left.Value;
      const rightToLeftOld = this.right.Previous/this.left.Previous;

      const dif = rightToLeftNew - rightToLeftOld;

      if (dif>0)
        return { Nominal: dif, arrow: " ▲", color: "green-text" };
      if (dif<0)
        return { Nominal: Math.abs(dif), arrow: " ▼", color: "red-text" };
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