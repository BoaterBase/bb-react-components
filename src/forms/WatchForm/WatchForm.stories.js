import React from 'react';
import BoaterBase from '../../BoaterBase';
import WatchForm from './index';

export default {
  title: 'Forms/WatchForm',
  component: WatchForm,
  argTypes: {},
};

export const Preview = (props) => {
  return (
    <BoaterBase>
      <WatchForm {...props} />
    </BoaterBase>
  );
};

Preview.args = {
  onSubmit: (data) => alert(JSON.stringify(data)),
  name: 'BoaterBase',
};
