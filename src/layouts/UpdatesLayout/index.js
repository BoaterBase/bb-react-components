import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDeepCompareEffect } from 'react-use';
import { useBoaterBase } from '../../BoaterBase';
import SearchUpdates, { useSearch } from '../../SearchUpdates';
import Hits from '../../SearchUpdates/Hits';
import Paging from '../../Search/Paging';
import Refinements from '../../Search/Refinements';
import SearchInput from '../../Search/SearchInput';
import LocationSelector from '../../Search/LocationSelector';
import LayoutSelector from '../../SearchUpdates/LayoutSelector';
function UpdatesLayout({ searchState, onReady, defaultProfileId, pathName = '/updates' }) {
  const { linker } = useBoaterBase();

  //http://localhost:4000/listings?layout=card&configure[filters]=&configure[hitsPerPage]=24&configure[aroundLatLngViaIP]=false&sortBy=ListingsLatest
  //http://localhost:4000/listings?layout=card&configure[filters]=&configure[hitsPerPage]=24

  // Update the browser when search changes
  const onSearchStateChange = (searchState) => {
    //console.log('----onStateChange', JSON.stringify(searchState));
    linker.updateUrl && linker.updateUrl({ pathname: pathName, query: searchState });
  };

  return (
    <div>
      <SearchUpdates state={searchState} onStateChange={onSearchStateChange}>
        <div className="bb-flex">
          <SearchInput />
          <LocationSelector />
          <div className="bb-ml-1">
            <LayoutSelector />
          </div>
        </div>
        <div className="bb-mb-4">
          <Refinements />
          <Hits defaultProfileId={defaultProfileId} />
          <Paging className="bb-mt-4" />
        </div>
      </SearchUpdates>
    </div>
  );
}

UpdatesLayout.propTypes = {
  searchState: PropTypes.object,
  defaultProfileId: PropTypes.string,
  pathName: PropTypes.string,
};
export default UpdatesLayout;
