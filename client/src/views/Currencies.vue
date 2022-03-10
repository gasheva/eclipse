<template>
    <div class="container">
        <h3>Валюты</h3>
        <div v-if="!loading">
            <div class="row">
                <div class="col s12">
                    <div class="row">
                        <div class="input-field col s12">
                            <input type="text" id="autocomplete-input" class="autocomplete" ref="autocomplete"
                                   autocomplete="off">
                            <label for="autocomplete-input">Основная валюта</label>
                            <i class="material-icons prefix">search</i>
                        </div>
                    </div>
                </div>
            </div>
            <currencies-table :currencies="currencies" :mainCurrency="mainCurrency" :key="counter"/>
        </div>
        <loader v-else/>

        <div class="fixed-action-btn">
            <a href="" class="btn-floating btn-large red darken-4" @click.prevent="scrollToTop">
                <i class="large material-icons">arrow_upward</i>
            </a>
        </div>
    </div>
</template>

<script>
import M               from 'materialize-css';
import CurrenciesTable from '@/components/CurrenciesTable.vue';

export default {
    components: {CurrenciesTable},
    data() {
        return {
            loading:      true,
            currencies:   null,
            autocomplete: null,
            mainCurrency: null,
            counter:      0,
        };
    },
    async mounted() {
        await this.$store.dispatch('updateCurrencies');
        this.currencies = this.$store.getters.currencies;
        if (this.currencies) {
            let data = {};
            // create autocomplete array. Search by name and CharCode
            this.currencies.forEach(val => {
                data[`${val.Name}`]     = '';
                data[`${val.CharCode}`] = '';
            });
            setTimeout(() => {
                this.autocomplete = M.Autocomplete.init(this.$refs.autocomplete, {
                    data,
                    onAutocomplete: (val) => {
                        this.searchHandler(val);
                    },
                });
            });
            this.mainCurrency = this.$store.getters.RUR;  // by default - ruble
            this.loading      = false;
        }
    },
    beforeDestroy() {
        if (this.autocomplete && this.autocomplete.destroy) {
            this.autocomplete.destroy();
        }
    },
    methods: {
        // передача
        searchHandler(val) {
            this.$log('searchHandler');
            this.$log(val);
            this.mainCurrency = this.currencies.find(cur => cur.CharCode === val || cur.Name === val);
            this.counter++;   // trigger to update table
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
    },
};
</script>

<style lang="scss">
.input-field > label {
    color: $placeholder-text-color;
}
</style>