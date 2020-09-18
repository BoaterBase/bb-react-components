import React, { Suspense, useState, useEffect } from 'react';
import BoaterBase from '../../BoaterBase';
import ListingLayout from './index';
import ListingLoading from './ListingLoading';

export default {
  title: 'Layouts/ListingLayout',
  component: ListingLayout,
  argTypes: {},
};

export const Preview = (props) => {
  return (
    <BoaterBase>
      <ListingLayout {...props} />
    </BoaterBase>
  );
};
//const urlParams = new URLSearchParams(document.location.search);
//const listingId = urlParams.get('listingId');
Preview.args = {
  id: 'g5nm2l6X',
};

export const Loading = (props) => {
  return (
    <BoaterBase>
      <ListingLoading {...props} />
    </BoaterBase>
  );
};
