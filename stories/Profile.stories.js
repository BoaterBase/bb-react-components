import React from 'react';
import BoaterBase from '../src/BoaterBase';
import Profile from '../src/Profile';
import { getProfile } from '../src/api';
import storybookLinker from './storybookLinker';

export default {
  title: 'Blocks/Profile',
  component: Profile,
  argTypes: {},
};

const PreviewTemplate = ({ profileId, ...args }) => (
  <BoaterBase linker={storybookLinker}>
    <Profile {...args} data={getProfile(profileId)} />
  </BoaterBase>
);

export const Preview = PreviewTemplate.bind({});
const urlParams = new URLSearchParams(document.location.search);
const profileId = urlParams.get('profileId');
Preview.args = {
  profileId: profileId || 'marinemotion',
};

const Template = (args) => (
  <BoaterBase linker={storybookLinker}>
    <Profile {...args} />
  </BoaterBase>
);
export const Loading = Template.bind({});
Loading.args = {
  data: null,
};

export const Missing = Template.bind({});
Missing.args = {
  data: undefined,
};

export const Error = Template.bind({});
Error.args = {
  data: false,
};
