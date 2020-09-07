import React, { createContext, useState, useContext, useEffect, memo } from 'react';
import { getCurrencyRates } from './api';

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
