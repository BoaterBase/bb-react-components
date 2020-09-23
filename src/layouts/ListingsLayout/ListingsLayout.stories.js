import React from 'react';
import BoaterBase from '../../BoaterBase';
import ListingsLayout from './index';

export default {
  title: 'Layouts/ListingsLayout',
  component: ListingsLayout,
  argTypes: {},
};

export const Preview = (props) => {
  return (
    <BoaterBase>
      <ListingsLayout {...props} />
    </BoaterBase>
  );
};

Preview.args = {
  searchState: {
    layout: 'card',
  },
};
