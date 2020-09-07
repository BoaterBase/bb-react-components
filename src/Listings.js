import React from 'react';
import PropTypes from 'prop-types';
import Search from './Search';
import Hits from './Search/Hits';
import LayoutSelector from './Search/LayoutSelector';
import SortSelector from './Search/SortSelector';
import CurrencySelector from './Search/CurrencySelector';
import FilterButton from './Search/FilterButton';
import Filters from './Search/Filters';
import Refinements from './Search/Refinements';
import SearchInput from './Search/SearchInput';
import LocationSelector from './Search/LocationSelector';
import Paging from './Search/Paging';

/** Listings component to display a list of BoaterBase listings with search interface and paging */
function Listings({ filters, layout }) {
  return (
    <div>
      Hello
      <Search filters={filters} layout={layout} hitsPerPage={24}>
        <div className="md:bb-flex">
          <div className="bb-flex-auto bb-flex md:bb-mr-1 bb-mb-1 md:bb-mb-0">
            <SearchInput />
            <LocationSelector />
          </div>
          <div className="bb-flex-auto bb-flex bb-space-x-1">
            <LayoutSelector />
            <CurrencySelector />
            <SortSelector />
            <FilterButton />
          </div>
        </div>

        <div className="bb-flex bb-mb-4">
          <div className="bb-flex-auto">
            <Refinements />
            <Hits />
            <Paging />
          </div>
          <div className="bb-w-30">
            <Filters />
          </div>
        </div>
      </Search>
    </div>
  );
}

Listings.propTypes = {
  layout: PropTypes.oneOf(['card', 'list', 'map', 'gallery']),
};
export default Listings;
