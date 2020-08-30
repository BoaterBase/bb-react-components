import React, { createContext, useState, useContext, useEffect } from 'react';

// TODO - use rate and add conversion to provider for easy access!
function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    useGrouping: true,
    minimumFractionDigits: 0,
  }).format(amount);
}

const currencySymbols = {
  USD: '$',
  GBP: '£',
  EUR: '€',
  CAD: '$',
  AUD: '$',
  SGD: '$',
};
export function getCurrencySymbol(currency) {
  return currencySymbols[currency];
}

async function getCurrencyRates() {
  return await fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,EUR,CAD,AUD,SGD').then((r) => r.json());
}

// Cache the rates request promise so don't retrigger
let currencyRatesPromise = undefined;

const CurrencyContext = createContext();

/*
 * Hook for providing currency context to wrapped components.
 */
export function useCurrency() {
  return useContext(CurrencyContext);
}

function getLocalStorage(key) {
  try {
    return JSON.parse(window?.localStorage?.getItem(key));
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

function setLocalStorage(key, value) {
  try {
    window?.localStorage?.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

/**
 * Create a Currency context provider that provides rates and currency state.
 */
function Currency({ localStorageKey = 'currency', defaultCurrency = '', children }) {
  // Global State
  const [currency, setCurrencyState] = useState(getLocalStorage(localStorageKey) || defaultCurrency);

  function setCurrency(state) {
    setLocalStorage(localStorageKey, state);
    return setCurrencyState(state);
  }

  // NOTE: undefined is waiting, null is loading, false is error
  const [rates, setRates] = useState(undefined);

  // Only 1 component needs to trigger and store the fetch promise
  if (!currencyRatesPromise) {
    currencyRatesPromise = getCurrencyRates();
  }

  useEffect(() => {
    setRates(null);
    currencyRatesPromise.then((r) => setRates(r.rates || false)).catch(() => setRates(false));
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        rates:
          rates &&
          Object.entries(rates).map(([key, value]) => ({
            code: key,
            rate: value,
            symbol: getCurrencySymbol(key),
          })),
        getRate: (code) => rates[code],
        currency,
        setCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}
export default Currency;
