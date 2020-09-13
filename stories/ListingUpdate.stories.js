import React from 'react';
import BoaterBase from '../src/BoaterBase';
import Update from '../src/Update';
import { listingUpdates } from '../src/api';
export default {
  title: 'Blocks/ListingUpdate',
  component: Update,
  argTypes: {},
};

const PreviewTemplate = ({ listingId, updateId, ...args }) => (
  <BoaterBase>
    <Update {...args} data={listingUpdates(listingId).doc(updateId).get()} />
  </BoaterBase>
);

const Template = (args) => (
  <BoaterBase>
    <Update {...args} />
  </BoaterBase>
);

export const Preview = PreviewTemplate.bind({});
const urlParams = new URLSearchParams(document.location.search);
const listingId = urlParams.get('listingId');
const updateId = urlParams.get('updateId');
Preview.args = {
  listingId: listingId || 'g5nm2l6X',
  updateId: updateId || 'w1R0mZGm',
};

export const Loading = Template.bind({});
Loading.args = {
  data: null,
};

export const Missing = Template.bind({});
Missing.args = {
  data: undefined,
};

export const Error = Template.bind({});
Error.args = {
  data: false,
};
