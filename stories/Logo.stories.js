import React from 'react';

import { BoaterBase, useBoaterBase } from '../src/BoaterBase';

import Logo from '../src/Logo';

export default {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {},
};

const Template = (args) => (
  <div>
    <Logo {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  size: 5,
};
