/** BoaterBase external interfaces */
export { default as BoaterBase, useBoaterBase } from './BoaterBase';

export { useCurrency } from './Currency';
export { useAlerts } from './Alerts';
export { useModal } from './Modal';

/** Data */
export { default as getListing } from './data/getListing';
export { default as getProfile } from './data/getProfile';
export { default as getWebsite } from './data/getWebsite';
export { default as getDomain } from './data/getDomain';
export { default as getProfileByHandle } from './data/getProfileByHandle';
export { default as getProfileUpdates } from './data/getProfileUpdates';
export { default as getProfileUpdateByHandle } from './data/getProfileUpdateByHandle';
export { default as getProfileUpdatesByHandle } from './data/getProfileUpdatesByHandle';
export { default as getWebsitePage } from './data/getWebsitePage';
export { default as getWebsitePageByPath } from './data/getWebsitePageByPath';

export { default as getListingUpdates } from './data/getListingUpdates';
export { default as getListingUpdate } from './data/getListingUpdate';

/** Pages */
export { default as ListingLayout } from './layouts/ListingLayout';
export { default as ListingsLayout } from './layouts/ListingsLayout';
export { default as ListingUpdateLayout } from './layouts/ListingUpdateLayout';
export { default as ProfileLayout } from './layouts/ProfileLayout';
export { default as ProfileUpdateLayout } from './layouts/ProfileUpdateLayout';

/** Sections */
export { default as ListingsSection } from './sections/ListingsSection';

/** Parts */
export { default as ContentPart } from './parts/Content';
export { default as UpdatesPart } from './parts/Updates';

/** Website */
export { default as WebsiteContact } from './website/WebsiteContact';

export * as store from './data/store';

export { default as Link } from './Link';

export { Image, Video, Placeholder, Transformation } from 'cloudinary-react';

// export { default as Version } from './Version';
// export { default as Logo } from './Logo';
// export { default as Listing } from './Listing';
// export { default as Listings } from './Listings';
// export { default as Update } from './Update';
// export { default as Updates } from './Updates';

// export { default as Search, useSearch } from './Search';
// export { default as Hits } from './Search/Hits';

import { version } from '../package.json';
export function getPackageVersion() {
  return version;
}
