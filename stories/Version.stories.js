import React from "react";

import Version from "../src/Version";

export default {
  title: "Example/Version",
  component: Version,
  argTypes: {},
};

const Template = (args) => <Version {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: "Hello",
};
