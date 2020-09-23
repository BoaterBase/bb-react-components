import React from 'react';
import Search from '../../Search';
import Hits from '../../Search/Hits';

import { connectRefinementList, connectSearchBox, connectSortBy } from 'react-instantsearch-dom';

const VirtualRefinementList = connectRefinementList(() => null);
const VirtualSearchBox = connectSearchBox(() => null);
const VirtualSortBy = connectSortBy(() => null);

export default function ListingsSection({ searchState, columns }) {
  return (
    <section>
      <Search state={searchState}>
        <Hits columns={columns} />

        <VirtualSearchBox />
        <VirtualSortBy
          defaultRefinement="Listings"
          items={[
            { value: 'Listings', label: 'Featured' },
            { value: 'ListingsLatest', label: 'Latest' },
          ]}
        />
        <VirtualRefinementList attribute="availability" />
        <VirtualRefinementList attribute="specifications.condition" />
        <VirtualRefinementList attribute="specifications.category" />
        <VirtualRefinementList attribute="specifications.classification" />
        <VirtualRefinementList attribute="specifications.model" />
        <VirtualRefinementList attribute="specifications.manufacturer" />
      </Search>
    </section>
  );
}
