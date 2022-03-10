<template>
    <div class="row">
        <h3>Конвертер</h3>
        <div v-if="!loading">
            <converter-card
                :currency-id="left.id"
                :inititalCurrency="left"
                :currencies="currencies"
                :readOnly="false"
                @changed="changeValue($event, 'left')"
                :key="'l'+triggerLeft"
            />
            <div class="text-left">
                <a href="" @click.prevent="swapCurrencies">
                    <i class="material-icons black-text">swap_horiz</i>
                </a>
            </div>
            {{right.id}}
            <converter-card
                :currency-id="right.id"
                :inititalCurrency="right"
                :currencies="currencies"
                :readOnly="'readonly'"
                @changed="changeValue($event, 'right')"
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
    mixins:     [swapMixin],
    data() {
        return {
            loading:      true,
            currencies:   null,
            triggerRight: 0,  // триггер обновления дочернего компонента
            triggerLeft:  0,
        };
    },
    async created() {
        await this.$store.dispatch('updateCurrencies');
        this.currencies = this.$store.getters.currencies;
        if (this.currencies) {
            this.setup(this.$store.getters.RUR, this.$store.getters.RUR)
            this.loading = false;
        }
    },
    methods: {
        changeValue(event, side) {
            console.log(`on change ${side}`);
            this[side]         = event;
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