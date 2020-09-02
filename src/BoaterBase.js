import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { CloudinaryContext } from 'cloudinary-react';
import qs from 'qs';
import p from '../package.json';

import Currency from './Currency';

const Context = createContext();

/*
 * Hook for providing BoaterBase context to wrapped components.
 */
export function useBoaterBase() {
  return useContext(Context);
}

const defaultTheme = {
  hitTitle: (hit) => hit.title,
};

/** Convert a url string to a url object */
function normalizeUrl(url) {
  return typeof url === 'string' ? { pathname: url } : url;
}

const defaultLinker = {
  changeUrl: (url) => {
    const { pathname, query } = normalizeUrl(url);
    window.location.assign(pathname + (query ? '?' + qs.stringify(query) : ''));
  },
  updateUrl: (url) => {
    const { pathname, query } = normalizeUrl(url);
    window.history.pushState({}, '', pathname + (query ? '?' + qs.stringify(query) : ''));
  },
  createUrl: (url) => {
    const { pathname, query } = normalizeUrl(url);
    return pathname + (query ? '?' + qs.stringify(query) : '');
  },
  createPermalink: (url) => {
    const { pathname, query } = normalizeUrl(url);
    return 'https://www.boaterbase.com' + pathname + (query ? '?' + qs.stringify(query) : '');
  },
};

/**
 * Create a BoaterBase context provider that provides routing and context to our components.
 */
function BoaterBase({ linker, theme, children }) {
  // Global State
  const [currency, setCurrency] = useState('');

  return (
    <Context.Provider
      value={{
        version: p.version,
        linker: { ...defaultLinker, ...linker },
        theme: { ...defaultTheme, ...theme },
      }}
    >
      <CloudinaryContext cloudName="boaterbase" secure>
        <Currency>{children}</Currency>
      </CloudinaryContext>
    </Context.Provider>
  );
}

BoaterBase.propTypes = {
  linker: {
    changeUrl: PropTypes.func,
    updateUrl: PropTypes.func,
    createUrl: PropTypes.func,
    createPermalink: PropTypes.func,
  },
  theme: PropTypes.object,
};
export default BoaterBase;
