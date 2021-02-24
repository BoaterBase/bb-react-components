import React from 'react';
import BoaterBase from '../BoaterBase';
import WebsiteContact from './WebsiteContact';
import getWebsite from '../data/getWebsite';
import getProfile from '../data/getProfile';

export default {
  title: 'Website/WebsiteContact',
  component: WebsiteContact,
  argTypes: {},
};

export const Preview = (props, { loaded: { website, profile } }) => {
  return (
    <BoaterBase>
      <WebsiteContact {...props} website={website} profile={profile} />
    </BoaterBase>
  );
};

Preview.args = {};

Preview.loaders = [
  async () => {
    const website = await getWebsite('charterchaton').get();
    const profile = await getProfile(website.profileId).get();

    return {
      website: website,
      profile: profile,
    };
  },
];
