import React from 'react';
import { memo } from 'react';
import { useSearch } from '../Search';

import Item from './Item';
export default memo(function Hit({ data }) {
  const [searchState] = useSearch();

  return <Item data={data} layout={searchState.layout} />;
});
