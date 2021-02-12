import React, { useEffect, useState, useRef } from 'react';
import getListing from '../../data/getListing';
//import getProfile from '../../data/getProfile';
import trackHit from '../../utils/trackHit';
import trackEvent from '../../utils/trackEvent';
import createListingMessage from '../../data/createListingMessage';
import createListingSubscriber from '../../data/createListingSubscriber';
import Version from '../../Version';

import { cloudUrl } from '../../BoaterBase';

import Suspend from '../../data/Suspend';

import { useModal } from '../../Modal';
import { useAlerts } from '../../Alerts';

import ListingLoading from './ListingLoading';

//import formatCoords from '../../utils/formatCoords';
import formatNumber from '../../utils/formatNumber';
import formatCurrency from '../../utils/formatCurrency';

import LocationIcon from '../../icons/Location';
import Plus from '../../icons/Plus';
import Minus from '../../icons/Minus';

import MapImage from '../../parts/MapImage';
import MapBox from '../../parts/MapBox';

import Content from '../../parts/Content';
import Gallery from '../../parts/Gallery';
import Share from '../../parts/Share';
import Variants from '../../parts/Variants';
//import QRCode from '../../parts/QRCode';

import ContactSection from '../../sections/ContactSection';
import ListingUpdatesSection from '../../sections/ListingUpdatesSection';

import MessageForm from '../../forms/MessageForm';
import WatchForm from '../../forms/WatchForm';

const specifications = [
  {
    key: 'manufacturer',
    title: 'Make or Manufacturer',
  },
  {
    key: 'model',
    title: 'Model',
  },
  {
    key: 'condition',
    title: 'Condition',
  },
  {
    key: 'year',
    title: 'Year',
    tip: 'Year of manufacture',
  },
  {
    key: 'name',
    title: 'Name',
  },
  {
    key: 'category',
    title: 'Category',
  },
  {
    key: 'classification',
    title: 'Class',
  },
  {
    key: 'profile',
    title: 'Profile',
  },
  {
    key: 'designer',
    title: 'Designer',
  },
  {
    key: 'builder',
    title: 'builder',
  },
  {
    key: 'loa',
    title: 'Length Overall',
    tip: 'The total length from bow to stern (LOA)',
    unit: 'm',
  },
  {
    key: 'lwl',
    title: 'Length at Waterline',
    tip: 'The total length at the waterline (LWL)',
    unit: 'm',
  },
  {
    key: 'beam',
    title: 'Beam',
    tip: 'The total width of the boat',
    unit: 'm',
  },
  {
    key: 'draft',
    title: 'Draft',
    unit: 'm',
  },
  {
    key: 'haw',
    title: 'Height at Waterline',
    unit: 'm',
  },
  {
    key: 'displacement',
    title: 'Displacement',
    tip: 'The amount of water the boat displaces',
    unit: 'kg',
  },
  {
    key: 'weight',
    title: 'Weight',
    tip: 'The dry weight',
    unit: 'kg',
  },
  {
    key: 'material',
    title: 'Material',
  },
  {
    key: 'fuel',
    title: 'Fuel',
  },
  {
    key: 'fuelcapacity',
    title: 'Fuel Capacity',
    unit: 'l',
  },
  {
    key: 'power',
    title: 'Power',
    unit: 'kw',
  },
  {
    key: 'propulsion',
    title: 'Propulsion',
  },
  {
    key: 'watercapacity',
    title: 'Water Capacity',
    unit: 'l',
  },
  {
    key: 'berths',
    title: 'Berths',
  },
  {
    key: 'cabins',
    title: 'Cabins',
  },
  {
    key: 'certification',
    title: 'Certification',
  },
  {
    key: 'registry',
    title: 'Registry',
  },
];

function Specifications({ data }) {
  const items = specifications
    .filter(({ key }) => !!data[key])
    .map(({ key, title, tip, unit }) => ({
      key,
      title,
      tip,
      value: unit ? formatNumber(data[key]) : data[key],
      unit: unit,
    }));

  return items.length ? (
    <ul className="bb-mt-2 bb-border-t bb-border-gray-100 bb-grid md:bb-grid-cols-2 lg:bb-grid-cols-3">
      {items.map(({ key, title, tip, value, unit }, index) => (
        <li key={key} className="bb-border-t bb-border-gray-100 bb-py-1 bb-px-0.5 bb-w-full bb-overflow-hidden">
          <h4 className="bb-uppercase bb-tracking-tight bb-text-xs md:bb-text-sm bb-font-semibold bb-text-gray-700 bb-truncate">
            <span title={tip} style={{ cursor: !!tip && 'help' }}>
              {title}
            </span>
          </h4>
          <div className="bb-text-gray-400 bb-font-extralight md:bb-text-lg bb-truncate">
            {value}
            {unit && <small className="bb-text-xs bb-text-gray-300 bb-ml-0.5">{unit}</small>}
          </div>
        </li>
      ))}
    </ul>
  ) : null;
}

function ListingBlock({ listingResource, Head = () => null, onReady, onEvent }) {
  const setModal = useModal();
  const createAlert = useAlerts();
  //const [showVariants, setShowVariants] = useState();
  const [snippet, setShowSnippet] = useState(true);
  const [gallery, setGallery] = useState();

  const listing = listingResource.read();

  async function createMessage(data) {
    try {
      await createListingMessage(listing.id, data);
      createAlert('Message Sent!', 'success');
      setModal(null);
      trackEvent([], 'Message', 'Sent', `/listings/${listing.slug}`);
      onEvent && onEvent({ category: 'Message', action: 'Sent', label: `/listings/${listing.slug}` });
    } catch (err) {
      createAlert('Error sending message!', 'error');
      console.error(err);
    }
  }

  async function createSubscriber(data, el) {
    try {
      await createListingSubscriber(listing.id, data);
      createAlert('Added to watch list!', 'success');
      trackEvent([], 'Watch', 'Subscribed', `/listings/${listing.slug}`);
      onEvent && onEvent({ category: 'Watch', action: 'Subscribed', label: `/listings/${listing.slug}` });
    } catch (err) {
      createAlert('Error creating subscription!', 'error');
      console.error(err);
    }
    el.target.reset();
  }

  function sendMessage() {
    setModal(<MessageForm onSubmit={createMessage} className="bb-bg-white bb-shadow-2xl bb-rounded-lg bb-p-4 bb-w-full sm:bb-w-5/6 md:bb-w-1/2" />);

    trackEvent([], 'Message', 'Click', `/listings/${listing.slug}`);
    onEvent && onEvent({ category: 'Message', action: 'Click', label: `/listings/${listing.slug}` });
  }

  // function toggleVariants() {
  //   setShowVariants((state) => !state);
  // }

  function showMap() {
    setModal(<MapBox latitude={listing.geo.latitude} longitude={listing.geo.longitude} zoom={10} />);
  }

  // Section Refs
  const titleRef = useRef();
  const specsRef = useRef();
  const contentRef = useRef();
  const updatesRef = useRef();
  const priceRef = useRef();

  // Give parent access to data and actions
  useEffect(() => {
    onReady &&
      onReady({
        listing: listing,
        showSendMessage: sendMessage,
        showSlideshow: gallery && gallery.showSlideshow,
        showTitle: () => {
          titleRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        },
        showSpecifications: () => {
          specsRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        },
        showContent: () => {
          setShowSnippet(false);
          contentRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        },
        showPrice: () => {
          //setShowVariants(true);
          priceRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        },
        showUpdates: () => {
          updatesRef.current.scrollIntoView({ block: 'start', behavior: 'smooth' });
        },
      });
  }, [onReady, gallery]);

  return (
    <div>
      <Head>
        <title>{listing.title}</title>
        <meta name="description" content={listing.summary} />
        <meta name="twitter:site" content="@boaterbase" />
        <meta name="og:title" content={listing.title} />
        <meta name="og:description" content={listing.summary} />

        {listing.media && listing.media[0] && <meta name="twitter:card" content="summary_large_image" />}
        {listing.media && listing.media[0] && <meta property="og:image" content={cloudUrl(listing.media[0].id, { transformation: 'large_image' })} />}
      </Head>
      {listing.media && listing.media[0]?.width >= 900 && (
        <div className="bb-mb-3">
          <Gallery media={listing.media} layout="primary" onReady={setGallery} />
        </div>
      )}

      <div className="bb-grid bb-grid-cols-4 bb-gap-3">
        <div className="bb-col-span-4 md:bb-col-span-3">
          {listing.media && listing.media[0]?.width < 900 && (
            <div className="bb-mb-2">
              <Gallery media={listing.media} layout="primary" />
            </div>
          )}
          {listing.message && <div className="bb-text-red-500 bb-font-medium md:bb-text-lg">{listing.message}</div>}
          <h1 ref={titleRef} className="bb-text-2xl md:bb-text-3xl bb-font-semibold bb-text-gray-800 bb-leading-9">
            {listing.title}
          </h1>
          <p className="bb-mt-2 bb-font-serif bb-text-lg md:bb-text-xl bb-font-medium bb-text-gray-500 bb-italic">{listing.summary}</p>
          <button
            onClick={showMap}
            type="button"
            className="bb-flex bb-items-start md:bb-items-center bb-text-left bb-mt-2 bb-text-blue-400 hover:bb-text-blue-500"
          >
            <LocationIcon className="bb-text-blue-500 bb-w-5 bb-h-5" />
            <span className="bb-font-medium md:bb-text-xl bb-mx-1">{listing.location}</span>
          </button>
          <div ref={priceRef} className="bb-flex bb-mt-2">
            <div className="bb-mr-4">
              <span className="bb-text-2xl md:bb-text-4xl bb-font-medium bb-text-gray-800 bb-mr-1">
                {listing.price ? formatCurrency(listing.price, listing.currency) : 'POA'}
              </span>
              <span className="bb-font-medium bb-text-gray-400 bb-truncate bb-text-sm md:bb-text-base">{listing.label}</span>
            </div>
          </div>
          {listing.variants?.length ? <Variants items={listing.variants} sendMessage={sendMessage} /> : null}
          <div ref={specsRef} className="bb-w-full">
            <Specifications data={listing.specifications} />
          </div>
          {listing.media.length > 1 && (
            <div className="bb-mt-2">
              <Gallery media={listing.media} layout="grid" limit={10} />
            </div>
          )}
          <div ref={contentRef}>
            <Content snippet={snippet} items={listing.content} className="bb-mt-2" />
          </div>

          <div ref={updatesRef}>
            <ListingUpdatesSection id={listing.id} slug={listing.slug} limit={6} />
          </div>
        </div>
        <div className="bb-col-span-4 md:bb-col-span-1 bb-space-y-4">
          <ContactSection profileId={listing.profileId} contactId={listing.contactId} Head={Head} sendMessage={sendMessage} />
          <Share pathname={`/listings/${listing.slug}`} title={listing.title} summary={listing.summary} />

          {listing.geo && (
            <div>
              <h3 className="bb-mb-1 bb-uppercase bb-text-center bb-font-medium bb-text-gray-500 bb-text-sm">Map</h3>

              <MapImage
                className="bb-shadow bb-rounded-md bb-w-full bb-cursor-pointer"
                onClick={showMap}
                width={400}
                height={300}
                latitude={listing.geo.latitude}
                longitude={listing.geo.longitude}
              />
            </div>
          )}

          <div className="bb-bg-gradient-to-b bb-from-blue-400 bb-to-blue-500 bb-p-2 bb-rounded-md bb-shadow bb-border bb-border-blue-500">
            <h3 className="bb-uppercase bb-text-center bb-mb-1 bb-font-medium bb-text-gray-50 bb-text-sm">Follow This Boat</h3>
            <WatchForm onSubmit={createSubscriber} />
          </div>

          {/* <div className="bb-p-2">
            <QRCode pathname={`/listings/${listing.slug}`} />
          </div> */}
          <div>
            <h3 className="bb-uppercase bb-text-center bb-mb-1 bb-font-medium bb-text-gray-500 bb-text-sm">Data</h3>
            <div className="bb-max-h-20 bb-overflow-y-auto bb-break-all bb-font-mono bb-text-xs bb-bg-gray-800 bb-text-gray-400 bb-rounded bb-shadow bb-p-2">
              <code>{JSON.stringify(listing)}</code>
            </div>
          </div>
          <div className="bb-text-center">
            <Version />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ListingLayout({ id, loading, Head, onReady, onEvent }) {
  // If the server is rendering a loading page it can tell us to show a loading state and we exit early without triggering resource request
  if (loading) return <ListingLoading />;

  // Start data request early so Suspend can use it for ssr fallback
  const listingResource = getListing(id);

  // Delay hit tracking to wait for cache warmup
  useEffect(() => {
    setTimeout(async () => {
      try {
        const listing = await listingResource.get();

        // TODO - use profile / group trackers if available
        //const profile = await getProfile(listing.profileId).get();
        //const contact = await getProfile(listing.contactId).get();

        await trackHit([], `/listings/${listing.slug}`, listing.title);
      } catch (err) {
        console.error(err);
      }
    }, 100);
  }, [listingResource]);

  return (
    <Suspend resources={listingResource} fallback={<ListingLoading />}>
      <ListingBlock Head={Head} listingResource={listingResource} onReady={onReady} onEvent={onEvent} />
    </Suspend>
  );
}
