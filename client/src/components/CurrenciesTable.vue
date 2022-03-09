<template>
    <div>
        <div class="row">
            <div class="col s12">
                <div class="row">
                    <div class="input-field col s12">
                        <input
                            class="input-search placeholder-override"
                            id="input-search"
                            placeholder="Валюта"
                            v-model.trim="search"
                        />
                        <i class="material-icons prefix">search</i>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="currency in items" :key="currency.CharCode">
            <TwoCurrencies
                :secondCurrency="currency"
                :mainCurrency="mainCurrency"
            />
        </div>
    </div>
</template>

<script>
import M             from 'materialize-css';
import TwoCurrencies from '@/components/TwoCurrencies.vue';
import debounce      from 'lodash.debounce';

export default {
    components: {TwoCurrencies},
    props:      {
        currencies:   null,
        mainCurrency: null,
    },
    data() {
        return {
            search: this.$route.query.search || '',
            items:  [],
        };
    },
    mounted() {
        this.searchHandler(this.search);  // фильтрация
        setTimeout(() => {
            M.updateTextFields();
        });
    },
    watch:   {
        // сохранение запроса в url
        search: function (val) {
            if (val !== '') {
                this.$router.push({
                    query: {...this.$route.query, search: `${val}`},
                });
            } else {
                this.$router.push({query: {}});
            }
        },
        // отслеживание изменения url
        '$route.query.search': {
            handler: debounce(function (val) {
                this.searchHandler(val);
            }, 300),
        },
    },
    methods: {
        searchHandler(val) {
            if (!val) {
                this.items = this.currencies; // вывод всех пар
            } else {
                let pattern = new RegExp(`${val}`, 'i');
                this.items  = this.currencies.filter(cur => pattern.test(cur.Name) || pattern.test(cur.CharCode));
            }
        },
    },

};
</script>
