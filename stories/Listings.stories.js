import React from 'react';
import BoaterBase from '../src/BoaterBase';
import Listings from '../src/Listings';

export default {
  title: 'Blocks/Listings',
  component: Listings,
  argTypes: {},
};

const Template = (args) => (
  <BoaterBase>
    <Listings {...args} />
  </BoaterBase>
);

export const Cards = Template.bind({});
Cards.args = {
  layout: 'card',
};
export const List = Template.bind({});
List.args = {
  layout: 'list',
};

export const Gallery = Template.bind({});
Gallery.args = {
  layout: 'gallery',
};
