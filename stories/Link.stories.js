import React from "react";

import BoaterBase from "../src/BoaterBase";
import Link from "../src/Link";

export default {
  title: "Components/Link",
  component: Link,
  argTypes: {},
};

const Template = (args) => (
  <BoaterBase>
    <Link {...args} />
  </BoaterBase>
);

export const Primary = Template.bind({});
Primary.args = {
  url: "/listings",
  children: "Listings",
};
