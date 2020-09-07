import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { CloudinaryContext } from 'cloudinary-react';
import qs from 'qs';
import p from '../package.json';
import Currency from './Currency';
import Alerts from './Alerts';

const Context = createContext();

/*
 * Hook for providing BoaterBase context to wrapped components.
 */
export function useBoaterBase() {
  const context = useContext(Context);
  return context;
}

const defaultTheme = {
  hitTitle: (hit) => hit.title,
};

const defaultLinker = {
  changeUrl: ({ pathname, query }) => {
    window.location.assign(pathname + (query ? '?' + qs.stringify(query) : ''));
  },
  updateUrl: ({ pathname, query }) => {
    window.history.pushState({}, '', pathname + (query ? '?' + qs.stringify(query) : ''));
  },
  createUrl: ({ pathname, query }) => {
    return pathname + (query ? '?' + qs.stringify(query) : '');
  },
  createPermalink: ({ pathname, query }) => {
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
        <Currency>
          <Alerts>{children}</Alerts>
        </Currency>
      </CloudinaryContext>
    </Context.Provider>
  );
}

BoaterBase.propTypes = {
  linker: PropTypes.shape({
    changeUrl: PropTypes.func,
    updateUrl: PropTypes.func,
    createUrl: PropTypes.func,
    createPermalink: PropTypes.func,
  }),
  theme: PropTypes.object,
};
export default BoaterBase;
