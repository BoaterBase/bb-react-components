import React from 'react';
import BoaterBase from '../../BoaterBase';
import MessageForm from './index';

export default {
  title: 'Forms/MessageForm',
  component: MessageForm,
  argTypes: {},
};

export const Preview = (props) => {
  return (
    <BoaterBase>
      <MessageForm {...props} />
    </BoaterBase>
  );
};

Preview.args = {
  onSubmit: (data) => alert(JSON.stringify(data)),
  name: 'BoaterBase',
};
