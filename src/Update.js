import React from 'react';
import { useAsyncData } from '../src/utils';
import Content from './Content';

function Update({ data }) {
  const [update, updateError] = useAsyncData(data);

  if (!update) return <div>Loading</div>;

  return (
    <div>
      <Content items={update.content} />
    </div>
  );
}

export default Update;
