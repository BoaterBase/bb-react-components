/** BoaterBase external interfaces */
export { default as BoaterBase, useBoaterBase } from './BoaterBase';

export { useCurrency } from './Currency';
export { useAlerts } from './Alerts';

export { default as ListingLayout } from './layouts/ListingLayout';
export { default as ListingsLayout } from './layouts/ListingsLayout';
export { default as ListingUpdateLayout } from './layouts/ListingUpdateLayout';
export { default as ProfileLayout } from './layouts/ProfileLayout';

export { default as getListing } from './data/getListing';
export { default as getProfile } from './data/getProfile';
export { default as getProfileByHandle } from './data/getProfileByHandle';
export { default as getListingUpdates } from './data/getListingUpdates';
export { default as getListingUpdate } from './data/getListingUpdate';

export * as store from './data/store';

export { default as Link } from './Link';

// export { default as Version } from './Version';
// export { default as Logo } from './Logo';
// export { default as Listing } from './Listing';
// export { default as Listings } from './Listings';
// export { default as Update } from './Update';
// export { default as Updates } from './Updates';

// export { default as Search, useSearch } from './Search';
// export { default as Hits } from './Search/Hits';

// /** API */
// export { allListings } from './api';
// export { listingUpdates } from './api';
// export { getCurrencyRates } from './api';

import { version } from '../package.json';
export function getPackageVersion() {
  return version;
}
