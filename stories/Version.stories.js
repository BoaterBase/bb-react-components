import React from "react";

import BoaterBase from "../src/BoaterBase";
import Version from "../src/Version";

export default {
  title: "Components/Version",
  component: Version,
  argTypes: {},
};

const Template = (args) => (
  <BoaterBase>
    <Version {...args} />
  </BoaterBase>
);

export const Primary = Template.bind({});
Primary.args = {};
