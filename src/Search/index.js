import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import React, { useState, createContext, useContext } from 'react';

const searchClient = algoliasearch('ZVD9UQIAVD', '4d24114774dc27c20690d04da6962b44');

const Context = createContext();

export function useSearch() {
  return useContext(Context);
}
export default function Search({ filters, hitsPerPage = 24, layout = 'card', children }) {
  const [searchState, setSearchState] = useState({
    layout,
    configure: { filters, hitsPerPage },
  });

  const onSearchStateChange = (searchState) => {
    console.log(searchState);

    // TODO - shallow update url here
    setSearchState(searchState);
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
