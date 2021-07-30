<template>
  <card :title="title">
      <div class="row">
        <div class="input-field col s6">
          <select ref="select" v-model="selected" @change="onChangeLeft">
            <option :value="mainCurrency.CharCode" selected>
              {{mainCurrency.CharCode}}
            </option>
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
import M from "materialize-css";
import swapMixin from "../../mixins/swap.mixin";
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props:{
    currencies: [],
    mainCurrency: null,
    disabledSelect: null,
  },
  computed:{
    nominal:{
      get(){return this.left.Nominal},
      set(val){this.left.Nominal = val}
    }, 
    title(){
      return this.left.Name;
    }
  },
  mixins: [swapMixin],
  validations: {
    nominal: { required, minValue: minValue(1) },
  },
  created(){
    this.setup(this.mainCurrency, this.currencies[0]);
    this.selected = this.left.CharCode;
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
  methods:{
    onChangeLeft(){
      console.log('onChangeLeft');
      console.log(this.selected);
      this.$emit('changed', {selected: this.selected, nominal: this.nominal})
    }
  }
};
</script>