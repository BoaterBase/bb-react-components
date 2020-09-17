import React, { Suspense, useState, useEffect } from 'react';
import BoaterBase from '../../BoaterBase';
import ListingBlock from './index';

export default {
  title: 'Blocks/ListingBlock',
  component: ListingBlock,
  argTypes: {},
};

// const Loader = ({ $, Component }) => {
//   const [state, setState] = useState();

//   useEffect(() => {
//     $.listing.then((data) => {
//       setState({
//         listing: data,
//       });
//     });
//   }, [$]);

//   if (state) return <Component {...state} />;
//   else return <div>Loader loading...</div>;
// };

const Component = (props) => (
  <>
    <Suspense fallback="Loading...">
      <ListingBlock {...props} />
    </Suspense>
  </>
);

export const Preview = (props) => {
  return (
    <BoaterBase>
      <Component {...props} />
    </BoaterBase>
  );
};
//const urlParams = new URLSearchParams(document.location.search);
//const listingId = urlParams.get('listingId');
Preview.args = {
  id: 'g5nm2l6X',
};
