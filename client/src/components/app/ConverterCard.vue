<template>
  <card :title="title">
    <div class="row">
      <div class="input-field col s6">
        <select ref="select" v-model="selected" @change="onChangeLeft">
          <option :value="currencies[0].CharCode" selected>
            {{ currencies[0].CharCode }}
          </option>
          <option
            v-for="currency in currencies.slice(1)"
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
          :readonly = "readOnly"
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
import { required, minValue } from "vuelidate/lib/validators";
export default {
  props: {
    currencies: [],
    readOnly: null,
    selected: null,
    computedNominal: null,
  },
  data() {
    return {
      left: null,
      select: null,
    };
  },
  computed: {
    nominal: {
      get() {
        return this.computedNominal ? this.computedNominal : this.left.Nominal;
      },
      set(val) {
        this.left.Nominal = val;
        this.onChangeLeft();
      },
    },
    title() {
      return this.left.Name;
    },
  },
  validations: {
    nominal: { required, minValue: minValue(1) },
  },
  created() {
    this.left = this.currencies.find((cur) => cur.CharCode === this.selected);
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
    onChangeLeft() {
      console.log("onChangeCard");
      const chosen = Object.assign(
        {},
        this.currencies.find((cur) => cur.CharCode === this.selected)
      );
      this.left = {
        Name: chosen.Name,
        CharCode: this.selected,
        Nominal: this.nominal,
        Value: chosen.Value,
      };
      this.$emit("changed", this.left);
    },
  },
};
</script>