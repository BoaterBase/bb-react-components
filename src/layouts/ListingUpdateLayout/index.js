import React, { useEffect } from 'react';
import Content from '../../parts/Content';
import getListing from '../../data/getListing';
import getListingUpdate from '../../data/getListingUpdate';
import trackHit from '../../utils/trackHit';
import Share from '../../parts/Share';
import Suspend from '../../data/Suspend';
import Version from '../../Version';
import Link from '../../Link';
import cleanText from '../../utils/cleanText';
function UpdateLoading() {
  return <div>Loading...</div>;
}

function ListingUpdate({ Head = () => null, listingResource, updateResource }) {
  const listing = listingResource.read();
  const update = updateResource.read();

  return (
    <div className="bb-grid bb-grid-cols-4 bb-gap-3">
      <Head>
        <title>{cleanText(update.title)}</title>
      </Head>
      <div className="bb-col-span-4 md:bb-col-span-3">
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

      <div className="bb-col-span-4 md:bb-col-span-1">
        <Share pathname={`/listings/${listing.slug}/updates/${update.slug}`} title={update.title} summary={update.summary} category="article" />
        <div className="bb-text-center bb-mt-3">
          <Version />
        </div>
      </div>
    </div>
  );
}

export default function ListingUpdateLayout({ listingId, updateId, loading, Head, onReady }) {
  // If the server is rendering a loading page it can tell us to show a loading state and we exit early without triggering resource request
  if (loading) return <UpdateLoading />;

  // Start data request early so Suspend can use it for ssr fallback
  const listingResource = getListing(listingId);
  const updateResource = getListingUpdate(listingId, updateId);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const listing = await listingResource.get();
        const update = await updateResource.get();

        // TODO - use parent profile / group trackers if available
        //const profile = await getProfile(listing.profileId).get();
        //const contact = await getProfile(listing.contactId).get();

        await trackHit([], `/listings/${listing.slug}/updates/${update.slug}`, update.title);
        onReady && onReady({ listing, update });
      } catch (err) {
        console.error(err);
      }
    }, 100);
  }, [listingResource, updateResource]);

  return (
    <Suspend resources={[listingResource, updateResource]} fallback={<UpdateLoading />}>
      <ListingUpdate Head={Head} listingResource={listingResource} updateResource={updateResource} />
    </Suspend>
  );
}
