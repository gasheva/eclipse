export default {
    data() {
        return {
            left:  null,
            right: null,
        };
    },
    methods: {
        setup(left, right) {
            // валюта слева - основная, справа - вычисляемая
            this.left         = Object.assign({}, left);
            this.left.Nominal = 1;
            console.log(this.left.Nominal);
            this.right         = Object.assign({}, right);
            this.right.Nominal = this.calculateNewRight(this.left.Nominal, this.left.Value, this.right.Value);
        },
        swap() {
            console.log('swaping');
            // номинал справа после обмена
            const newRightNominal = this.calculateNewRight(this.left.Nominal, this.right.Value, this.left.Value);
            const leftNominal     = this.left.Nominal;  // сохраняем номинал слева
            // обмениваем значения
            const temp         = Object.assign({}, this.left);
            this.left          = Object.assign({}, this.right);
            this.right         = temp;
            this.left.Nominal  = leftNominal;  // присваиваем старый номинал слева
            this.right.Nominal = newRightNominal; // присваиваем справа новый номинал
        },
        // вычисление нового номинала валюты справа
        calculateNewRight(leftNominal, leftValue, rightValue) {
            if (!leftNominal) return 1;
            return leftNominal * leftValue / rightValue;
        },
    },

};