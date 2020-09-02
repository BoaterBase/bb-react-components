import React from 'react';
import BoaterBase from '../src/BoaterBase';
import Listing from '../src/Listing';
import { getListing } from '../src/api';
export default {
  title: 'Blocks/Listing',
  component: Listing,
  argTypes: {},
};

const PreviewTemplate = ({ listingId, ...args }) => (
  <BoaterBase>
    <Listing {...args} data={getListing(listingId)} />
  </BoaterBase>
);

const Template = (args) => (
  <BoaterBase>
    <Listing {...args} />
  </BoaterBase>
);

export const Preview = PreviewTemplate.bind({});
Preview.args = {
  listingId: 'g5nm2l6X',
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
