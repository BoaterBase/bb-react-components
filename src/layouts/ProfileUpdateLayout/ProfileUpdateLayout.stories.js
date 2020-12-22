import React from 'react';
import BoaterBase from '../../BoaterBase';
import ProfileUpdateLayout from './index';

export default {
  title: 'Layouts/ProfileUpdateLayout',
  component: ProfileUpdateLayout,
  argTypes: {},
};

export const Preview = (props) => {
  return (
    <BoaterBase>
      <ProfileUpdateLayout {...props} />
    </BoaterBase>
  );
};

Preview.args = {
  profileHandle: 'marinemotion',
  updateId: 'dgUtYUyV',
};
