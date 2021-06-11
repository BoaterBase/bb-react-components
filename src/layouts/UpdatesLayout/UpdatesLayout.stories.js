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
    layout: 'compact',
    hideContact: false,
    configure: {
      //filters: 'business.id:yTxBjbGz',
    },
  },
};
