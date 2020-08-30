import React from 'react';

import BoaterBase, { useBoaterBase } from '../src/BoaterBase';

export default {
  title: 'Configuration/Provider',
  component: BoaterBase,
  argTypes: {},
};

export const Connected = () => {
  // Get the version BoaterBase context
  const Result = () => {
    const { version } = useBoaterBase() || {};
    return <div>{version ? 'BoaterBase Provider Connected!' : 'No BoaterBase Provider Connected!'}</div>;
  };

  return (
    <BoaterBase>
      <Result />
    </BoaterBase>
  );
};

const Template = (args) => <BoaterBase {...args}></BoaterBase>;
export const Routing = Template.bind({});
Routing.args = {};

export const NotFound = () => {
  // Get the version BoaterBase context
  const Result = () => {
    const { version } = useBoaterBase() || {};
    return <div>{version ? 'BoaterBase Provider Connected!' : 'No BoaterBase Provider Connected!'}</div>;
  };

  // No Provider
  return <Result />;
};
NotFound.parameters = {
  docs: {
    description: {
      story: 'Without a BoaterBase provider the context will not be available.',
    },
  },
};
