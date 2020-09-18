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

/** ListingsLayout component to display a list of BoaterBase listings with search interface and paging */
function ListingsLayout({ filters, layout }) {
  const [filtersToggle, setFiltersToggle] = useState(false);

  return (
    <div>
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
            <FilterButton onClick={() => setFiltersToggle((state) => !state)} />
          </div>
        </div>

        <div className="bb-flex bb-mb-4">
          <div className="bb-flex-auto">
            <Refinements />
            <Hits />
            <Paging />
          </div>
          <div className={classNames('bb-w-30', filtersToggle ? 'bb-block md:bb-hidden' : 'bb-hidden md:bb-block')}>
            <Filters />
          </div>
        </div>
      </Search>
    </div>
  );
}

ListingsLayout.propTypes = {
  layout: PropTypes.oneOf(['card', 'list', 'map', 'gallery']),
};
export default ListingsLayout;
