<template>
  <card :title="secondCurrency.Name">
    <div class="row">
      <div class="col s2 text-left">
        {{ left | currency }}
      </div>
      <div class="col s2 text-left">
        <a href="" @click.prevent="swapCurrencies">
          <i class="material-icons">swap_horiz</i>
        </a>
      </div>
      <div class="col s2 text-left">
        {{ right | currency }}
      </div>
      <div class="col s6 text-right" :class="[trend.color]">
        {{ trend.val }}
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
    trend() {
      const dif = Math.abs(this.left.Value - this.left.Previous);
      if (this.left.Value > this.left.Previous)
        return { val: dif + " ▲", color: "green-text" };
      if (this.left.Value < this.left.Previous)
        return { val: dif + " ▼", color: "red-text" };
      return "";
    },
  },
  created() {
    this.setup(this.mainCurrency, this.secondCurrency);
  },
  methods: {
    swapCurrencies() {
      this.swap();
    },
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