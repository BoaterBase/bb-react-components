import React, { useEffect, useState } from 'react';
import { useAsyncData } from '../src/utils';
import Updates from './Updates';

// TODO - should the api for this be 1 request or multiple?
//      - if the getUpdates() api call still needs access to the listing (e.g. for the slug if we do full path)
//      - then it might make sense to combine, else we can do more progressive loading
//      - we also need the profile, maybe multiple loads are best then can run in parallel
function ListingUpdate({ listingData, updatesData }) {
  const [listing, listingError] = useAsyncData(listingData);

  return (
    <div className="bb-grid">
      <Updates data={updatesData} />
    </div>
  );
}
export default ListingUpdate;
