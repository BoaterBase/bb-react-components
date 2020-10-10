import algoliasearch from 'algoliasearch/lite';

import { InstantSearch, Configure } from 'react-instantsearch-dom';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { useBoaterBase } from '../BoaterBase';

const searchClient = algoliasearch('ZVD9UQIAVD', '4d24114774dc27c20690d04da6962b44');

const Context = createContext();

export function useSearch() {
  return useContext(Context);
}
export default function Search({ state, children }) {
  const [searchState, setSearchState] = useState({
    layout: 'card',
    ...state,
    configure: { filters: '', hitsPerPage: 24, ...state.configure },
  });

  useEffect(() => {
    setSearchState((current) => ({
      ...current,
      ...state,
      configure: { ...current.configure, ...state.configure },
    }));
  }, [state]);

  const { linker } = useBoaterBase();

  const onSearchStateChange = (searchState) => {
    setSearchState(searchState);
    //const permalink = linker.createPermalink({ pathname: '/listings', query: searchState });
    // TODO - we should remove the filters and matching defaults here and/or remove them and layout from the share link
    linker.updateUrl({ pathname: '/listings', query: searchState });
  };

  // NOTE: We need to pass the configure state into the Configure component so it triggers updates to InstantSearch
  // NOTE: Use context to pass the layout into the hit components without triggering re-render of the hits due to buggy mutating InstantSearch results
  return (
    <InstantSearch searchClient={searchClient} indexName="Listings" searchState={searchState} onSearchStateChange={onSearchStateChange}>
      <Configure {...(searchState.configure || {})} />
      <Context.Provider value={[searchState, setSearchState]}>{children}</Context.Provider>
    </InstantSearch>
  );
}
