import React from 'react';
import BoaterBase from '../../BoaterBase';
import UpdatesLayout from './index';

export default {
  title: 'Layouts/UpdatesLayout',
  component: UpdatesLayout,
  argTypes: {},
};

export const Preview = (props) => {
  return (
    <BoaterBase>
      <UpdatesLayout {...props} />
    </BoaterBase>
  );
};

Preview.args = {
  searchState: {
    layout: 'gallery',
    hideContact: false,
    configure: {
      filters: 'profiles.handle:maritimesolutions', //'profiles.id:yTxBjbGz',
    },
  },
};
