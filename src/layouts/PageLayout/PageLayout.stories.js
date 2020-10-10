import React from 'react';
import BoaterBase from '../../BoaterBase';
import PageLayout from './index';

export default {
  title: 'Layouts/PageLayout',
  component: PageLayout,
  argTypes: {},
};

// Test global tracking option
window.BB_GA_ID = 'UA-159950-21';
export const Preview = (props) => {
  console.log('Page Layout Story');
  return (
    <BoaterBase>
      <PageLayout {...props}>Testing page layout.</PageLayout>
    </BoaterBase>
  );
};

Preview.args = {
  title: 'Features',
  path: '/features',
};
