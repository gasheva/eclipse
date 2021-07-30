export default function currencyFilter(currency){
  const nominal = Intl.NumberFormat('ru-RU',{
    maximumFractionDigits: 4
}).format(currency.Nominal)
  return `${nominal} ${currency.CharCode}`;
}