export default function currencyFilter(currency, withCharCode = false) {
    if (!currency) return '';
    const nominal = Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: 4,
    }).format(currency.Nominal);
    return `${nominal} ${withCharCode ? currency.CharCode : ''}`;
}