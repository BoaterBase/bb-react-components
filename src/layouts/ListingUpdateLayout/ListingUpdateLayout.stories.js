import React from 'react';
import BoaterBase from '../../BoaterBase';
import ListingUpdateLayout from './index';

export default {
  title: 'Layouts/ListingUpdateLayout',
  component: ListingUpdateLayout,
  argTypes: {},
};

export const Preview = (props) => {
  return (
    <BoaterBase>
      <ListingUpdateLayout {...props} />
    </BoaterBase>
  );
};

Preview.args = {
  listingId: 'g5nm2l6X',
  updateId: 'w1R0mZGm',
};
