export default function formatNumber(amount) {
  return new Intl.NumberFormat('en-US', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumSignificantDigits: 2,
  }).format(amount);
}
