import React from 'react';
import BoaterBase from '../../BoaterBase';
import ListingsSection from './index';

export default {
  title: 'Sections/ListingsSection',
  component: ListingsSection,
  argTypes: {},
};

export const Preview = (props) => {
  return (
    <BoaterBase>
      <ListingsSection {...props} />
    </BoaterBase>
  );
};

Preview.args = {
  searchState: { layout: 'gallery', configure: { hitsPerPage: 6 }, refinementList: { 'specifications.condition': ['New'] } },
};
