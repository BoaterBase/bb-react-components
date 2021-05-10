import React from 'react';
import BoaterBase from '../../BoaterBase';
import ProfileLayout from './index';

export default {
  title: 'Layouts/ProfileLayout',
  component: ProfileLayout,
  argTypes: {
    handle: {
      type: 'select',
      options: ['ant', 'captjoe', 'marinemotion'],
    },
  },
};

export const Preview = (props) => {
  return (
    <BoaterBase>
      <ProfileLayout {...props} />
    </BoaterBase>
  );
};
//const urlParams = new URLSearchParams(document.location.search);
//const listingId = urlParams.get('listingId');
Preview.args = {
  handle: 'ant',
};

export const Sub = (props) => {
  return (
    <BoaterBase>
      <ProfileLayout {...props} />
    </BoaterBase>
  );
};
//const urlParams = new URLSearchParams(document.location.search);
//const listingId = urlParams.get('listingId');
Sub.args = {
  handle: 'captjoe',
};

export const Embeds = (props) => {
  return (
    <BoaterBase>
      <ProfileLayout {...props} />
    </BoaterBase>
  );
};
//const urlParams = new URLSearchParams(document.location.search);
//const listingId = urlParams.get('listingId');
Embeds.args = {
  handle: 'acorcutt',
};
