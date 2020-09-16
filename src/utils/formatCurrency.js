export default function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    useGrouping: true,
    minimumFractionDigits: 0,
  }).format(amount);
}
