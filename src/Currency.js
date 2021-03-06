import React, { createContext, useState, useContext, useEffect, memo } from 'react';

/** Get currency rates */
async function getCurrencyRates() {
  // TODO - use rates from db cache!!
  //console.info('getCurrencyRates()');
  //return await fetch('https://api.exchangeratesapi.io/latest?base=USD&symbols=USD,GBP,EUR,CAD,AUD,SGD').then((r) => r.json());
  return {
    rates: {
      CAD: 1.2688163265,
      EUR: 0.8163265306,
      SGD: 1.3247346939,
      USD: 1,
      AUD: 1.2863673469,
      GBP: 0.7357387755,
    },
    base: 'USD',
    date: '2021-01-08',
  };
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
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(window.localStorage?.getItem(key));
    } catch (e) {
      console.error(e);
      return undefined;
    }
  } else {
    return undefined;
  }
}

function setLocalStorage(key, value) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage?.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  } else {
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
    let isMounted = true;
    setRates(null);
    currencyRatesPromise.then((r) => isMounted && setRates(r.rates || false)).catch(() => isMounted && setRates(false));
    return () => (isMounted = false);
  }, []);

  function getRate(code) {
    return rates[code];
  }

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
        getRate,
        currency,
        setCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}
export default memo(Currency);
