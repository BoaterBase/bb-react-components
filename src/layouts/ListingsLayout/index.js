import React, { useState, useEffect } from 'react';
import trackHit from '../../utils/trackHit';
import { useDeepCompareEffect } from 'react-use';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Search from '../../Search';
import Hits from '../../Search/Hits';
import LayoutSelector from '../../Search/LayoutSelector';
import SortSelector from '../../Search/SortSelector';
import CurrencySelector from '../../Search/CurrencySelector';
import FilterButton from '../../Search/FilterButton';
import Filters from '../../Search/Filters';
import Refinements from '../../Search/Refinements';
import SearchInput from '../../Search/SearchInput';
import LocationSelector from '../../Search/LocationSelector';
import Paging from '../../Search/Paging';

import Share from '../../parts/Share';

import { useSearch } from '../../Search';
import { useBoaterBase } from '../../BoaterBase';

const layouts = {
  card: 'bb-grid bb-grid-cols-1 sm:bb-grid-cols-2 md:bb-grid-cols-3 bb-gap-2 sm:bb-gap-3 md:bb-gap-4',
  gallery: 'bb-grid bb-grid-cols-1 sm:bb-grid-cols-2 md:bb-grid-cols-3 bb-gap-2 sm:bb-gap-3 md:bb-gap-4',
  list: 'bb-grid bb-grid-cols-1 bb-gap-2 sm:bb-gap-3 md:bb-gap-4',
};

/** We need access to search states layout to format the grid */
function Grid({ children }) {
  const [searchState] = useSearch();
  return <div className={classNames('bb-mt-4', layouts[searchState.layout])}>{children}</div>;
}

function ShareSearch() {
  const [searchState] = useSearch();
  const query = { ...searchState, layout: undefined, configure: { ...searchState.configure, hitsPerPage: undefined } };
  return (
    <div className="bb-p-2">
      <Share pathname={`/listings`} query={query} title="BoaterBase Search Results" />

      <h3 className="bb-uppercase bb-text-center bb-mt-2 bb-mb-1 bb-font-medium bb-text-gray-500 bb-text-sm">Data</h3>
      <div className="bb-max-h-20 bb-overflow-y-auto bb-break-all bb-font-mono bb-text-xs bb-bg-gray-800 bb-text-gray-400 bb-rounded bb-shadow bb-p-2">
        <code>{JSON.stringify(searchState)}</code>
      </div>
    </div>
  );
}

/** ListingsLayout component to display a list of BoaterBase listings with search interface and paging */
function ListingsLayout({ searchState, onReady }) {
  const [filtersToggle, setFiltersToggle] = useState(false);

  // TODO - we need to track search query somehow
  useDeepCompareEffect(() => {
    setTimeout(async () => {
      try {
        // TODO - figure how to use profile or group ids without real route
        await trackHit([], '/listings', 'Listings');
        onReady && onReady({ searchState });
      } catch (err) {
        console.error(err);
      }
    }, 100);
  }, [searchState]);

  const { linker } = useBoaterBase();

  //http://localhost:4000/listings?layout=card&configure[filters]=&configure[hitsPerPage]=24&configure[aroundLatLngViaIP]=false&sortBy=ListingsLatest
  //http://localhost:4000/listings?layout=card&configure[filters]=&configure[hitsPerPage]=24

  // Update the browser when search changes
  const onSearchStateChange = (searchState) => {
    //console.log('----onStateChange', JSON.stringify(searchState));
    linker.updateUrl && linker.updateUrl({ pathname: '/listings', query: searchState });
  };

  return (
    <div>
      <Search state={searchState} onStateChange={onSearchStateChange}>
        <div className="md:bb-flex">
          <div className="bb-flex-auto bb-flex md:bb-mr-1 bb-mb-1 md:bb-mb-0">
            <SearchInput />
            <LocationSelector />
          </div>
          <div className="bb-flex-auto bb-flex bb-space-x-1 bb-relative">
            <LayoutSelector />
            <CurrencySelector />
            <SortSelector />
            <FilterButton onClick={() => setFiltersToggle((state) => !state)} />
            <div
              className={classNames(
                'bb-z-10 bb-absolute bb-right-0 bb-top-full bb-p-0.5 bb-mt-0.5 bb-max-w-xs bb-max-h-screen bb-overflow-y-auto bb-bg-white bb-rounded-md bb-shadow-lg bb-border bb-border-gray-200',
                filtersToggle ? 'bb-block' : 'bb-hidden'
              )}
            >
              <Filters />
              <ShareSearch />
            </div>
          </div>
        </div>

        <div className="bb-mb-4">
          <Refinements />
          <Grid>
            <Hits />
          </Grid>
          <Paging className="bb-mt-4" />
        </div>
      </Search>
    </div>
  );
}

ListingsLayout.propTypes = {
  searchState: PropTypes.object,
};
export default ListingsLayout;
