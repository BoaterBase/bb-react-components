import React, { useState } from 'react';
import BoaterBase from '../../BoaterBase';
import ListingLayout from './index';
import ListingLoading from './ListingLoading';

export default {
  title: 'Layouts/ListingLayout',
  component: ListingLayout,
  argTypes: {
    id: {
      control: {
        type: 'select',
        options: ['g5nm2l6X', 'hyiazle3', 'Awwe1IQm'],
      },
    },
  },
};

export const Preview = (props) => {
  const [controls, setControls] = useState();
  return (
    <BoaterBase>
      {controls && (
        <div className="bb-h-8">
          <div className="bb-z-20 bb-fixed bb-top-2 bb-left-5 bb-py-1 bb-px-3 bb-flex bb-rounded-full bb-bg-white bb-space-x-3 bb-text-sm bb-text-gray-400 bb-divide-gray-100">
            <button className="hover:bb-underline bb-font-medium bb-appearance-none" onClick={controls.showTitle}>
              Title
            </button>
            <button className="hover:bb-underline bb-font-medium bb-appearance-none" onClick={controls.showPrice}>
              Price
            </button>
            <button className="hover:bb-underline bb-font-medium bb-appearance-none" onClick={controls.showSpecifications}>
              Specifications
            </button>
            <button className="hover:bb-underline bb-font-medium bb-appearance-none" onClick={controls.showContent}>
              Content
            </button>
            <button className="hover:bb-underline bb-font-medium bb-appearance-none" onClick={controls.showUpdates}>
              Updates
            </button>
            <button className="hover:bb-underline bb-font-medium bb-appearance-none" onClick={controls.showSendMessage}>
              Message
            </button>
            {controls.showSlideshow && (
              <button className="hover:bb-underline bb-font-medium bb-appearance-none" onClick={() => controls.showSlideshow()}>
                Slides
              </button>
            )}
          </div>
        </div>
      )}
      <ListingLayout {...props} onReady={setControls} />
    </BoaterBase>
  );
};
//const urlParams = new URLSearchParams(document.location.search);
//const listingId = urlParams.get('listingId');
Preview.args = {
  id: 'Awwe1IQm',
  hideContact: false,
};

export const Loading = (props) => {
  return (
    <BoaterBase>
      <ListingLoading {...props} />
    </BoaterBase>
  );
};
