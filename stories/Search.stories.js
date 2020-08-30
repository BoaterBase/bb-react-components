import React from 'react';
import BoaterBase from '../src/BoaterBase';
import Search from '../src/Search';
import Hits from '../src/Search/Hits';

export default {
  title: 'Components/Search',
  component: Search,
  argTypes: {},
};

const Template = (args) => (
  <BoaterBase>
    <Search>
      <Hits />
    </Search>
  </BoaterBase>
);

export const Basic = Template.bind({});
Basic.args = {};
