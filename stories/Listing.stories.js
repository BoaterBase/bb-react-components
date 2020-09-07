import React from 'react';
import BoaterBase from '../src/BoaterBase';
import Listing from '../src/Listing';
import { getListing } from '../src/api';
import storybookLinker from './storybookLinker';

export default {
  title: 'Blocks/Listing',
  component: Listing,
  argTypes: {},
};

const PreviewTemplate = ({ listingId, ...args }) => (
  <BoaterBase linker={storybookLinker}>
    <Listing {...args} data={getListing(listingId)} />
  </BoaterBase>
);

export const Preview = PreviewTemplate.bind({});
const urlParams = new URLSearchParams(document.location.search);
const listingId = urlParams.get('listingId');
Preview.args = {
  listingId: listingId || 'g5nm2l6X',
};

const Template = (args) => (
  <BoaterBase linker={storybookLinker}>
    <Listing {...args} />
  </BoaterBase>
);
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
