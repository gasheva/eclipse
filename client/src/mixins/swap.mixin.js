export default {
    data() {
        return {
            mainCurrency:       null,
            calculatedCurrency: null,
        };
    },
    methods: {
        setup(mainCurrency, calculatedCurrency) {
            this.mainCurrency         = Object.assign({}, mainCurrency);
            this.mainCurrency.Nominal = 1;
            console.log(this.mainCurrency.Nominal);
            this.calculatedCurrency         = Object.assign({}, calculatedCurrency);
            this.calculatedCurrency.Nominal = this.calculate(this.mainCurrency.Nominal, this.mainCurrency.Value, this.calculatedCurrency.Value);
        },
        swap() {
            console.log('swaping');
            // new nominal
            const newCalculatedCurrencyNominal = this.calculate(this.mainCurrency.Nominal, this.calculatedCurrency.Value, this.mainCurrency.Value);
            const mainCurrencyNominal          = this.mainCurrency.Nominal;  // сохраняем номинал слева
            // swap values
            const temp                      = Object.assign({}, this.mainCurrency);
            this.mainCurrency               = Object.assign({}, this.calculatedCurrency);
            this.calculatedCurrency         = temp;
            this.mainCurrency.Nominal       = mainCurrencyNominal;  // присваиваем старый номинал слева
            this.calculatedCurrency.Nominal = newCalculatedCurrencyNominal; // присваиваем справа новый номинал
        },
        // вычисление нового номинала валюты
        calculate(mainCurrencyNominal, mainCurrencyValue, calculatedCurrencyValue) {
            if (!mainCurrencyNominal) return 1;
            return mainCurrencyNominal * mainCurrencyValue / calculatedCurrencyValue;
        },
    },

};