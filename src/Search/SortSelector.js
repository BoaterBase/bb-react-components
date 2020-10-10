import { connectSortBy } from 'react-instantsearch-dom';
import React, { useState, memo } from 'react';
import { useSearch } from '../Search';

const BaseSortSelector = memo(({ items, currentRefinement }) => {
  const [searchState, setSearchState] = useSearch();

  const [finding, setFinding] = useState(false);

  function getLocation(success, error) {
    if (!navigator.geolocation) {
      error('No Navigator');
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  function selectSort(event) {
    // Need to update multiple search fields for nearest support so can't use refine
    if (event.target.value === 'nearest') {
      setFinding(true);
      getLocation(
        ({ coords }) => {
          setFinding(false);
          setSearchState({
            ...searchState,
            sortBy: 'Listings',
            configure: {
              ...searchState.configure,
              aroundLatLngViaIP: false,
              aroundLatLng: `${coords.latitude}, ${coords.longitude}`,
            },
          });
        },
        () => {
          setFinding(false);
          setSearchState({
            ...searchState,
            sortBy: 'Listings',
            configure: {
              ...searchState.configure,
              aroundLatLngViaIP: true,
              aroundLatLng: undefined,
            },
          });
        }
      );
    } else {
      setSearchState({
        ...searchState,
        sortBy: event.target.value,
        configure: {
          ...searchState.configure,
          aroundLatLngViaIP: false,
          aroundLatLng: undefined,
        },
      });
    }
  }
  const aroundMe = searchState.configure?.aroundLatLngViaIP || searchState.configure?.aroundLatLng;

  return finding ? (
    <span className="bb-cursor-wait bb-min-w-0 bb-flex bb-justify-end bb-rounded-md bb-border bb-border-gray-300 bb-px-3 bb-py-2 bb-bg-white bb-text-base bb-leading-6 sm:bb-text-sm sm:bb-leading-5 bb-font-normal bb-text-gray-500">
      <span className="bb-truncate">Finding Location...</span>
      <svg className="bb-flex-none bb--mr-1 bb-ml-2 bb-animate-spin bb-h-5 bb-w-5 bb-text-gray-200" fill="none" viewBox="0 0 24 24">
        <circle className="bb-opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />{' '}
        <path
          className="bb-opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
    </span>
  ) : (
    <select
      value={aroundMe ? 'nearest' : currentRefinement}
      onChange={selectSort}
      className="bb-cursor-pointer bb-flex-auto bb-form-select bb-block bb-pl-2 sm:bb-pl-3 bb-pr-10 bb-py-2 bb-text-gray-500 bb-font-normal hover:bb-text-gray-700 bb-border-gray-300 focus:bb-outline-none focus:bb-shadow-outline-blue focus:bb-border-blue-300 bb-text-base bb-leading-6 sm:bb-text-sm sm:bb-leading-5"
    >
      {items.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
      <option value={'nearest'}>Nearest</option>
    </select>
  );
});

const ConnectedSortSelector = connectSortBy(BaseSortSelector);
export default function SortSelector() {
  return (
    <ConnectedSortSelector
      defaultRefinement="Listings"
      items={[
        { value: 'Listings', label: 'Featured' },
        { value: 'ListingsLatest', label: 'Latest' },
      ]}
    />
  );
}
