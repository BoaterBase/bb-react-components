import React, { useEffect, useState } from 'react';
import formatcoords from 'formatcoords';

export function imagePath(path, transform = 't_large_image', format = 'jpg') {
  return `https://res.cloudinary.com/boaterbase/image/upload/${transform}/${path}.${format}`;
}

export function mod(x, m) {
  return ((x % m) + m) % m;
}

export function formatCoords(lat, lon) {
  return formatcoords(lat, lon).format();
}
export function formatCurrency(amount, currency = 'USD') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    useGrouping: true,
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(amount) {
  return new Intl.NumberFormat('en-US', {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumSignificantDigits: 2,
  }).format(amount);
}

/* Remove junk from user entered text */
export function cleanText(text) {
  return text.replace(/[^a-zA-Z0-9\-\s]/g, '');
}

/** Use async data as if its not async
 * @param {(object|undefined|null|false|Promise)}
 * @returns {[(object|undefined|null|false),error]} Returns object or undefined if missing, null if loading or false if error
 */
export const useAsyncData = (data) => {
  const [state, setState] = useState([data?.then ? null : data]);

  useEffect(() => {
    let isMounted = true;
    if (data?.then) {
      data.then((result) => isMounted && setState([result])).catch((e) => isMounted && setState([false, e]));
    }
    return () => (isMounted = false);
  }, [data]);

  return state;
};

export const withAsyncData = (data, key = 'data') => (Component) => (props) => {
  const state = useAsyncData(data);
  return (
    <Component
      {...{
        ...props,
        [key]: state,
      }}
    />
  );
};
