import React, { Suspense } from 'react';
import BoaterBase from '../../BoaterBase';
import ListingBlock, { getListing } from './index';
import suspend from '../../utils/suspend';
import wait from '../../utils/wait';

export default {
  title: 'Blocks/ListingBlock',
  component: ListingBlock,
  argTypes: {},
};

const S = ({ getListing }) => (
  <Suspense fallback={<b>Loading</b>}>
    <ListingBlock getListing={getListing} />
  </Suspense>
);

const PreviewTemplate = (args) => (
  <BoaterBase>
    <S {...args} />
  </BoaterBase>
);

export const Preview = PreviewTemplate.bind({});
//const urlParams = new URLSearchParams(document.location.search);
//const listingId = urlParams.get('listingId');
Preview.args = {
  getListing: suspend(getListing('g5nm2l6X')),
};
