import React, { createContext, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { CloudinaryContext } from 'cloudinary-react';
import { Cloudinary } from 'cloudinary-core';

import qs from 'qs';
import { version } from '../package.json';
import Currency from './Currency';
import Alerts from './Alerts';
import Modal from './Modal';

const Context = createContext();

/*
 * Hook for providing BoaterBase context to wrapped components.
 */
export function useBoaterBase() {
  const context = useContext(Context);
  return context;
}

const cloudinaryCore = new Cloudinary({ cloud_name: 'boaterbase', secure: true });

export function cloudUrl(id, options) {
  return cloudinaryCore.url(id, options);
}

const defaultTheme = {
  hitTitle: (hit) => hit.title,
};

const defaultLinker = {
  /** Change the browser url and navigate to page */
  changeUrl: ({ pathname, query }) => {
    window.location.assign(pathname + (query ? '?' + qs.stringify(query, { encodeValuesOnly: true }) : ''));
  },
  /** Update the browser url without navigating */
  updateUrl: ({ pathname, query }) => {
    window.history.pushState({}, '', pathname + (query ? '?' + qs.stringify(query, { encodeValuesOnly: true }) : ''));
  },
  /** Create a url for an internal link */
  createUrl: ({ pathname, query }) => {
    return pathname + (query ? '?' + qs.stringify(query, { encodeValuesOnly: true }) : '');
  },
  /** Create a url for an external link */
  createPermalink: ({ pathname, query }) => {
    return 'https://www.boaterbase.com' + pathname + (query ? '?' + qs.stringify(query, { encodeValuesOnly: true }) : '');
  },
  /** Create a url for an external link */
  createEmbed: ({ pathname, query }) => {
    return 'https://embed.boaterbase.com' + pathname + (query ? '?' + qs.stringify(query, { encodeValuesOnly: true }) : '');
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
        version: version,
        linker: { ...defaultLinker, ...linker },
        theme: { ...defaultTheme, ...theme },
      }}
    >
      <CloudinaryContext cloudName="boaterbase" secure>
        <Currency>
          <Modal>
            <Alerts>{children}</Alerts>
          </Modal>
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
