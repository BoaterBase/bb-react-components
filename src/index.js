/** BoaterBase external interfaces */
export { default as BoaterBase, useBoaterBase } from './BoaterBase';

export { useCurrency } from './Currency';

export { default as ListingBlock } from './Blocks/ListingBlock';

export { default as getListing } from './data/getListing';

export * as store from './data/store';

// export { default as Version } from './Version';
// export { default as Logo } from './Logo';
// export { default as Link } from './Link';
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
