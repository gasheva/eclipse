<template>
    <div class="row">
        <h3>Конвертер</h3>
        <div v-if="!loading">
            <converter-card
                :inititalCurrency="left"
                :currencies="currencies"
                :readOnly="false"
                @changed="onChangeLeft"
                :key="'l'+triggerLeft"
            />
            <div class="text-left">
                <a href="" @click.prevent="swapCurrencies">
                    <i class="material-icons black-text">swap_horiz</i>
                </a>
            </div>
            <converter-card
                :inititalCurrency="right"
                :currencies="currencies"
                :readOnly="'readonly'"
                @changed="onChangeRight"
                :key="'r'+triggerRight"
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
    data() {
        return {
            loading:      true,
            currencies:   null,
            triggerRight: 0,  // триггер обновления дочернего компонента
            triggerLeft:  0,
        };
    },
    mixins: [swapMixin],
    async created() {
        await this.$store.dispatch('updateCurrencies');
        this.currencies = this.$store.getters.currencies;
        if (this.currencies) {
            this.left    = this.$store.getters.RUR;  // по умолчанию обе валюты - рубль
            this.right   = this.$store.getters.RUR;
            this.loading = false;
        }
    },
    methods: {
        onChangeLeft(val) {
            console.log('left value changes');
            this.left          = val;
            this.right.Nominal = this.calculateNewRight(
                this.left.Nominal,
                this.left.Value,
                this.right.Value,
            );
            this.triggerRight++;
        },
        onChangeRight(val) {
            console.log('right value changes');
            this.right         = val;
            this.right.Nominal = this.calculateNewRight(
                this.left.Nominal,
                this.left.Value,
                this.right.Value,
            );
            this.triggerRight++;
        },
        swapCurrencies() {
            this.swap();
            this.triggerLeft++;
            this.triggerRight++;

        },
    },
};
</script>