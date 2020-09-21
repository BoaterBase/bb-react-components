import React from 'react';
import Search from '../../Search';
import Hits from '../../Search/Hits';

export default function ListingsSection({ filters, limit, columns, layout }) {
  return (
    <section>
      <Search layout={layout} filters={filters} hitsPerPage={limit}>
        <Hits columns={columns} />
      </Search>
    </section>
  );
}
