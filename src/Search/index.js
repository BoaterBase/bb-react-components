import algoliasearch from 'algoliasearch/lite';

import { InstantSearch, Configure } from 'react-instantsearch-dom';
import React, { useState, createContext, useContext, useEffect } from 'react';
import { useDeepCompareEffect } from 'react-use';

const searchClient = algoliasearch('ZVD9UQIAVD', '4d24114774dc27c20690d04da6962b44');

const Context = createContext();

export function useSearch() {
  return useContext(Context);
}
export default function Search({ state, onStateChange, children }) {
  const [searchState, setSearchState] = useState({
    layout: 'card',
    ...state,
    configure: { filters: '', hitsPerPage: 24, ...state.configure },
  });

  // Try and prevent state update loops with deep check
  useDeepCompareEffect(() => {
    setSearchState({ layout: 'card', ...state, configure: { filters: '', hitsPerPage: 24, ...state.configure } });
  }, [state]);

  // NOTE - onSearchStateChange does not always trigger for example when we update via changing setSearchState so listen with effect
  //      - but other times it does and cause a duplicate so use a deep check on listening for updates
  useDeepCompareEffect(() => {
    onStateChange && onStateChange(searchState);
  }, [searchState]);

  const onSearchStateChange = (newSearchState) => {
    setSearchState(newSearchState);
  };

  // NOTE: We need to pass the configure state into the Configure component so it triggers updates to InstantSearch
  // NOTE: Use context to pass the layout into the hit components without triggering re-render of the hits due to buggy mutating InstantSearch results
  return (
    <InstantSearch searchClient={searchClient} indexName="Listings" searchState={searchState} onSearchStateChange={onSearchStateChange}>
      <Configure {...searchState.configure} />
      <Context.Provider value={[searchState, setSearchState]}>{children}</Context.Provider>
    </InstantSearch>
  );
}
