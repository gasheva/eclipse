<template>
    <card :title="secondCurrency.Name">
        <div class="row">
            <div class="col s2 text-left">
                {{ mainCurrency | currency(true) }}
            </div>
            <div class="col s2 text-left">
                ↔
            </div>
            <div class="col s2 text-left">
                {{ calculatedCurrency | currency(true) }}
            </div>
            <div class="col s6 text-right" :class="[trend.color]">
                {{ trend.arrow }}{{ trend | currency }}
            </div>
        </div>
    </card>
</template>

<script>
import swapMixin from '@/mixins/swap.mixin';

export default {
    props:    {
        secondCurrency: null,
        firstCurrency:  null,
    },
    mixins:   [swapMixin],
    computed: {
        // тренд цены относительно основной валюты через рубли
        trend() {
            const calculatedCurrencyToMainCurrencyNew = this.calculatedCurrency.Value / this.mainCurrency.Value;
            const calculatedCurrencyToMainCurrencyOld = this.calculatedCurrency.Previous / this.mainCurrency.Previous;

            const dif = calculatedCurrencyToMainCurrencyNew - calculatedCurrencyToMainCurrencyOld;

            if (dif > 0)
                return {Nominal: dif, arrow: ' ▲', color: 'green-text'};
            if (dif < 0)
                return {Nominal: Math.abs(dif), arrow: ' ▼', color: 'red-text'};
            return '';
        },
    },
    created() {
        this.setup(this.firstCurrency, this.secondCurrency);
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