import React, { useState } from 'react';
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

const layouts = {
  card: 'bb-grid bb-grid-cols-3 bb-gap-4',
  gallery: 'bb-grid bb-grid-cols-3 bb-gap-4',
  list: 'bb-grid bb-grid-cols-1 bb-gap-4',
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
function ListingsLayout({ searchState }) {
  const [filtersToggle, setFiltersToggle] = useState(true);

  return (
    <div>
      <Search state={searchState}>
        <div className="md:bb-flex">
          <div className="bb-flex-auto bb-flex md:bb-mr-1 bb-mb-1 md:bb-mb-0">
            <SearchInput />
            <LocationSelector />
          </div>
          <div className="bb-flex-auto bb-flex bb-space-x-1">
            <LayoutSelector />
            <CurrencySelector />
            <SortSelector />
            <FilterButton onClick={() => setFiltersToggle((state) => !state)} />
          </div>
        </div>

        <div className="bb-flex bb-mb-4">
          <div className="bb-flex-auto">
            <Refinements />
            <Grid>
              <Hits />
            </Grid>
            <Paging />
          </div>
          <div className={classNames('bb-w-30', filtersToggle ? 'bb-block md:bb-hidden' : 'bb-hidden md:bb-block')}>
            <Filters />
            <ShareSearch />
          </div>
        </div>
      </Search>
    </div>
  );
}

ListingsLayout.propTypes = {
  searchState: PropTypes.object,
};
export default ListingsLayout;
