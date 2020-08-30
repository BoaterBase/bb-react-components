export function imagePath(path, transform = 't_large_image', format = 'jpg') {
  return `https://res.cloudinary.com/boaterbase/image/upload/${transform}/${path}.${format}`;
}

export function mod(x, m) {
  return ((x % m) + m) % m;
}
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    useGrouping: true,
    minimumFractionDigits: 0,
  }).format(amount);
}
