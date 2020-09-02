import React from 'react';
import BoaterBase from '../src/BoaterBase';
import Update from '../src/Update';
import { getListingUpdate } from '../src/api';
export default {
  title: 'Blocks/ListingUpdate',
  component: Update,
  argTypes: {},
};

const PreviewTemplate = ({ listingId, updateId, ...args }) => (
  <BoaterBase>
    <Update {...args} data={getListingUpdate(listingId, updateId)} />
  </BoaterBase>
);

const Template = (args) => (
  <BoaterBase>
    <Update {...args} />
  </BoaterBase>
);

export const Preview = PreviewTemplate.bind({});
Preview.args = {
  listingId: 'g5nm2l6X',
  updateId: 'w1R0mZGm',
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
