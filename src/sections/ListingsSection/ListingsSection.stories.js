import React from 'react';
import BoaterBase from '../../BoaterBase';
import ListingsSection from './index';
import Link from '../../Link';
import Arrow from '../../icons/ArrowRight';

export default {
  title: 'Sections/ListingsSection',
  component: ListingsSection,
  argTypes: {},
};

export const Preview = (props) => {
  return (
    <BoaterBase>
      <br />
      <br />
      <ListingsSection
        {...props}
        className=""
        title={
          <div className="bb-flex bb-mb-2">
            <h2 className="bb-text-2xl bb-font-bold">Featured</h2>
            <Link
              to={{
                pathname: '/listings',
                query: { ...props.searchState, layout: undefined, configure: { ...props.searchState.configure, hitsPerPage: undefined } },
              }}
              className="bb-text-blue-500 hover:bb-underline bb-ml-auto bb-flex bb-flex-nowrap bb-items-center"
            >
              All <Arrow className="bb-w-4 bb-h-4 bb-ml-0.5" />
            </Link>
          </div>
        }
      />
    </BoaterBase>
  );
};

Preview.args = {
  searchState: { layout: 'card', configure: { hitsPerPage: 12 }, refinementList: { 'specifications.condition': ['New'] } },
};
