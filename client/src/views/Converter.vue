<template>
    <div class="row">
        <h3>Конвертер</h3>
        <div v-if="!loading">
            <converter-card
                :currency-id="mainCurrency.id"
                :inititalCurrency="mainCurrency"
                :currencies="currencies"
                :readOnly="false"
                @changed="changeValue($event, 'mainCurrency')"
                :key="'l'+triggerMain"
            />
            <div class="text-mainCurrency">
                <a href="" @click.prevent="swapCurrencies">
                    <i class="material-icons black-text">swap_horiz</i>
                </a>
            </div>
            <converter-card
                :currency-id="calculatedCurrency.id"
                :inititalCurrency="calculatedCurrency"
                :currencies="currencies"
                :readOnly="'readonly'"
                @changed="changeValue($event, 'calculatedCurrency')"
                :key="'r'+triggerCalculated"
            />
        </div>
        <loader v-else/>
    </div>
</template>

<script>
import ConverterCard from '@/components/app/ConverterCard.vue';
import swapMixin     from '@/mixins/swap.mixin';

export default {
    components: {ConverterCard},
    mixins:     [swapMixin],
    data() {
        return {
            loading:           true,
            currencies:        null,
            triggerCalculated: 0,  // trigger to update child component
            triggerMain:       0,
        };
    },
    async created() {
        await this.$store.dispatch('updateCurrencies');
        this.currencies = this.$store.getters.currencies;
        if (this.currencies) {
            this.setup(this.$store.getters.RUR, this.$store.getters.RUR);
            this.loading = false;
        }
    },
    methods: {
        changeValue(event, side) {
            console.log(`on change ${side}`);
            this[side]                      = event;
            this.calculatedCurrency.Nominal = this.calculate(
                this.mainCurrency.Nominal,
                this.mainCurrency.Value,
                this.calculatedCurrency.Value,
            );
            this.triggerCalculated++;
        },
        swapCurrencies() {
            this.swap();
            this.triggerMain++;
            this.triggerCalculated++;

        },
    },
};
</script>