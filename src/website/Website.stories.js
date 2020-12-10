import React from 'react';
import BoaterBase from '../BoaterBase';
import Menu from './Menu';
import getWebsite from '../data/getWebsite';
import getProfile from '../data/getProfile';

export default {
  title: 'Website/Preview',
  //component: Menu,
  //argTypes: {},
};

export const Preview = (props, { loaded: { website, profile } }) => {
  return (
    <BoaterBase>
      <Menu {...props} />
      Preview
      {JSON.stringify(website)}
      {JSON.stringify(profile)}
    </BoaterBase>
  );
};

Preview.args = {
  backgroundColor: 'red',
  foregroundColor: 'white',
};

Preview.loaders = [
  async () => {
    const website = await getWebsite('bigskyyachts').get();
    const profile = await getProfile(website.sourceId).get();
    return {
      website: website,
      profile: profile,
    };
  },
];
