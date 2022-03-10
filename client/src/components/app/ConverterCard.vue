<template>
    <card :title="name">
        <div class="row">
            <div class="input-field col s6">
                <select ref="select" v-model="selected" @change="onChange">
                    <option
                        v-for="currency in currencies"
                        :key="currency.CharCode"
                        :value="currency.CharCode"
                    >
                        {{ currency.CharCode }}
                    </option>
                </select>
            </div>

            <div class="input-field col s6">
                <input
                    id="nominal1"
                    type="number"
                    v-model.number="nominal"
                    :class="{ invalid: $v.nominal.$error }"
                    :readonly="readOnly"
                />
                <span
                    class="helper-text invalid"
                    v-if="$v.nominal.$dirty && !$v.nominal.minValue"
                >
          Количество должно быть больше
          {{ $v.nominal.$params.minValue.min }}
        </span>
            </div>
        </div>
    </card>
</template>

<script>
import M                    from 'materialize-css';
import {required, minValue} from 'vuelidate/lib/validators';

export default {
    props: {
        readOnly:         null,
        inititalCurrency: null,
        currencies:       null,
    },
    data() {
        return {
            select:   null,
            selected: null,
            currency: null,
        };
    },
    computed:    {
        nominal: {
            get() {
                return this.currency.Nominal;
            },
            set(val) {
                this.currency.Nominal = val;
                this.onChange();
            },
        },
        name() {
            return this.currency.Name;
        },
    },
    validations: {
        nominal: {required, minValue: minValue(1)},
    },
    created() {
        // копируем переданный объект, чтобы изменения не отражались на родительском объекте
        this.currency = Object.assign({}, this.inititalCurrency);
        this.selected = this.currency.CharCode;
    },
    mounted() {
        setTimeout(() => {
            this.select = M.FormSelect.init(this.$refs.select);
            M.updateTextFields();
        });
    },
    beforeDestroy() {
        if (this.select && this.select.destroy) this.select.destroy();
    },
    methods: {
        onChange() {
            this.$log('onChangeCard');
            const nominal         = this.nominal;
            this.currency         = Object.assign({}, this.currencies.find(cur => cur.CharCode === this.selected));
            this.currency.Nominal = nominal;
            // передаем новый объект
            this.$emit('changed', Object.assign({}, this.currency));
        },
    },
};
</script>