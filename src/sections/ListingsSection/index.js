import React from 'react';
import Search from '../../Search';
import Hits from '../../Search/Hits';

export default function ListingsSection({ searchState, columns }) {
  return (
    <section>
      <Search state={searchState}>
        <Hits columns={columns} />
      </Search>
    </section>
  );
}
