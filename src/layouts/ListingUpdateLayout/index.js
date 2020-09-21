import React from 'react';
import Content from '../../parts/Content';
import getListing from '../../data/getListing';
import getListingUpdate from '../../data/getListingUpdate';
import Share from '../../parts/Share';
import Suspend from '../../data/Suspend';

import Link from '../../Link';

function UpdateLoading() {
  return <div>Loading...</div>;
}

function ListingUpdate({ Head = () => null, listingResource, updateResource }) {
  const listing = listingResource.read();
  const update = updateResource.read();

  return (
    <div className="bb-grid bb-grid-cols-4 bb-gap-3">
      <Head>
        <title>{update.title}</title>
      </Head>
      <div className="bb-col-span-3">
        <h1 className="bb-text-3xl bb-font-semibold bb-text-gray-800 bb-leading-9">{update.title}</h1>
        <p className="bb-text-sm bb-leading-5 bb-text-gray-500">
          <time dateTime="2020-03-16">{new Date(update.created).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
        </p>
        <p className="bb-mt-2 bb-font-serif bb-text-xl bb-font-medium bb-text-gray-500 bb-italic">
          on{' '}
          <Link className="bb-underline" to={`/listings/${listing.slug}`}>
            {listing.title}
          </Link>
        </p>
        <Content items={update.content} />
      </div>

      <div className="bb-col-span-1">
        <Share pathname={`/listings/${listing.slug}/updates/${update.slug}`} title={update.title} summary={update.summary} />
      </div>
    </div>
  );
}

export default function ListingUpdateLayout({ listingId, updateId, loading, Head }) {
  // If the server is rendering a loading page it can tell us to show a loading state and we exit early without triggering resource request
  if (loading) return <UpdateLoading />;

  // Start data request early so Suspend can use it for ssr fallback
  const listingResource = getListing(listingId);
  const updateResource = getListingUpdate(listingId, updateId);

  return (
    <Suspend resources={[listingResource, updateResource]} fallback={<UpdateLoading />}>
      <ListingUpdate Head={Head} listingResource={listingResource} updateResource={updateResource} />
    </Suspend>
  );
}
