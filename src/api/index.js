export { allListings } from './listings';
export { listingUpdates } from './updates';

/** Wait for some time to happen - for delaying and testing async code */
const wait = (time, ...args) => new Promise((resolve) => setTimeout(resolve, time, args));

/** Get currency rates */
export async function getCurrencyRates() {
  console.info('getCurrencyRates()');
  return await fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,EUR,CAD,AUD,SGD').then((r) => r.json());
}
