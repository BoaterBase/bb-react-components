import React, { useEffect, useState, useRef } from 'react';

import getListing from '../../data/getListing';
import createListingMessage from '../../data/createListingMessage';
import createListingSubscriber from '../../data/createListingSubscriber';

import Suspend from '../../data/Suspend';

import { useModal } from '../../Modal';
import { useAlerts } from '../../Alerts';

import ListingLoading from './ListingLoading';

import formatCoords from '../../utils/formatCoords';
import formatNumber from '../../utils/formatNumber';
import formatCurrency from '../../utils/formatCurrency';

import LocationIcon from '../../icons/Location';
import Plus from '../../icons/Plus';
import Minus from '../../icons/Minus';

import MapImage from '../../parts/MapImage';
import Content from '../../parts/Content';
import Gallery from '../../parts/Gallery';
import Share from '../../parts/Share';
import Variants from '../../parts/Variants';

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
        <li key={key} className="bb-border-t bb-border-gray-100 bb-py-1 bb-px-0.5">
          <h4 className="bb-uppercase bb-tracking-tight bb-text-sm bb-font-semibold bb-text-gray-700 bb-truncate">
            <span title={tip} style={{ cursor: !!tip && 'help' }}>
              {title}
            </span>
          </h4>
          <div className="bb-text-gray-400 bb-font-thin bb-text-lg bb-truncate">
            {value}
            {unit && <small className="bb-text-xs bb-text-gray-300 bb-ml-0.5">{unit}</small>}
          </div>
        </li>
      ))}
    </ul>
  ) : null;
}

function ListingBlock({ listingResource, Head = () => null, onReady }) {
  const setModal = useModal();
  const createAlert = useAlerts();
  const [showVariants, setShowVariants] = useState();
  const [snippet, setShowSnippet] = useState(true);
  const [gallery, setGallery] = useState();

  const listing = listingResource.read();

  async function createMessage(data) {
    try {
      await createListingMessage(listing.id, data);
      createAlert('Message Sent!', 'success');
      setModal(null);
    } catch (err) {
      createAlert('Error sending message!', 'error');
      console.error(err);
    }
  }

  async function createSubscriber(data, el) {
    try {
      await createListingSubscriber(listing.id, data);
      createAlert('Added to watch list!', 'success');
    } catch (err) {
      createAlert('Error creating subscription!', 'error');
      console.error(err);
    }
    el.target.reset();
  }

  function sendMessage() {
    setModal(<MessageForm onSubmit={createMessage} className="bb-bg-white bb-shadow-2xl bb-rounded-lg bb-p-4 bb-w-full sm:bb-w-5/6 md:bb-w-1/2" />);
  }

  function toggleVariants() {
    setShowVariants((state) => !state);
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
          setShowVariants(true);
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
      </Head>
      {listing.media && listing.media[0]?.width >= 900 && (
        <div className="bb-mb-3">
          <Gallery media={listing.media} layout="primary" onReady={setGallery} />
        </div>
      )}

      <div className="bb-grid bb-grid-cols-4 bb-gap-3">
        <div className="bb-col-span-3">
          {listing.media && listing.media[0]?.width < 900 && (
            <div className="bb-mb-2">
              <Gallery media={listing.media} layout="primary" />
            </div>
          )}
          {listing.message && <div className="bb-text-red-500 bb-font-medium bb-text-lg">{listing.message}</div>}
          <h1 ref={titleRef} className="bb-text-3xl bb-font-semibold bb-text-gray-800 bb-leading-9">
            {listing.title}
          </h1>
          <p className="bb-mt-2 bb-font-serif bb-text-xl bb-font-medium bb-text-gray-500 bb-italic">{listing.summary}</p>
          <button className="bb-flex bb-items-center bb-mt-2 bb-text-blue-400 hover:bb-text-blue-500">
            <LocationIcon className="bb-text-blue-500 bb-w-6 bb-h-6" />
            <span className=" bb-font-medium bb-text-xl bb-mx-1">{listing.location}</span>
          </button>
          <div ref={priceRef} className="bb-flex">
            <div className="bb-mr-4">
              <span className="bb-text-4xl bb-font-medium bb-text-gray-800 bb-mr-1">
                {listing.price ? formatCurrency(listing.price, listing.currency) : 'POA'}
              </span>
              <span className="bb-font-medium bb-text-gray-400 bb-truncate">{listing.label}</span>
            </div>
            {listing.variants?.length ? (
              <div className="bb-ml-auto bb-relative bb-overflow-hidden bb-max-w-sm bb-mt-1">
                {!showVariants && (
                  <div className="bb-hidden md:bb-flex bb-flex-no-wrap bb-opacity-75 bb-divide-x bb-divide-gray-200">
                    {listing.variants.map((v, index) => (
                      <div key={index} className="bb-text-center bb-px-2">
                        <span className="bb-block bb-font-medium bb-text-gray-400 bb-text-sm bb-truncate">{v.label || '–'}</span>
                        <span className="bb-block bb-text-lg bb-leading-none bb-font-medium bb-text-gray-800 bb-truncate">
                          {v.amount ? formatCurrency(v.amount, v.currency) : 'POA'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="bb-absolute bb-inset-0" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 60%)' }} />
                {listing.variants?.length ? (
                  <button
                    onClick={toggleVariants}
                    className="bb-absolute bb-right-0 bb-top-2 bb-text-orange-500 bb-font-medium bb-flex bb-flex-no-wrap bb-items-center hover:bb-underline focus:bb-outline-none"
                  >
                    More Options {showVariants ? <Minus className="bb-w-8 bb-h-8" /> : <Plus className="bb-w-8 bb-h-8" />}
                  </button>
                ) : null}
              </div>
            ) : null}
            {listing.variants?.length && showVariants ? (
              <button
                onClick={toggleVariants}
                className="bb-text-orange-500 bb-font-medium bb-flex bb-flex-no-wrap bb-items-center hover:bb-underline focus:bb-outline-none"
              >
                <Minus className="bb-w-8 bb-h-8" />
              </button>
            ) : null}
          </div>
          {showVariants && listing.variants?.length ? <Variants items={listing.variants} sendMessage={sendMessage} /> : null}
          <div ref={specsRef}>
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
            <h2 className="bb-mt-4 bb-mb-4 bb-text-3xl bb-font-semibold bb-text-gray-800">Blog</h2>
            <ListingUpdatesSection id={listing.id} slug={listing.slug} limit={6} />
          </div>
        </div>
        <div className="bb-col-span-1 bb-space-y-4">
          <ContactSection profileId={listing.profileId} contactId={listing.contactId} Head={Head} sendMessage={sendMessage} />
          <Share pathname={`/listings/${listing.slug}`} title={listing.title} summary={listing.summary} />

          {listing.geo && (
            <div>
              <h3 className="bb-mb-1 bb-uppercase bb-text-center bb-font-medium bb-text-gray-500 bb-text-sm">Map</h3>

              <MapImage
                className="bb-shadow bb-rounded-md bb-w-full"
                width={400}
                height={300}
                latitude={listing.geo.latitude}
                longitude={listing.geo.longitude}
              />
            </div>
          )}

          <div>
            <h3 className="bb-uppercase bb-text-center bb-mb-1 bb-font-medium bb-text-gray-500 bb-text-sm">Follow Listing</h3>
            <WatchForm onSubmit={createSubscriber} />
          </div>

          <div>
            <h3 className="bb-uppercase bb-text-center bb-mb-1 bb-font-medium bb-text-gray-500 bb-text-sm">Data</h3>
            <div className="bb-max-h-20 bb-overflow-y-auto bb-break-all bb-font-mono bb-text-xs bb-bg-gray-800 bb-text-gray-400 bb-rounded bb-shadow bb-p-2">
              <code>{JSON.stringify(listing)}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ListingLayout({ id, loading, Head, onReady }) {
  // If the server is rendering a loading page it can tell us to show a loading state and we exit early without triggering resource request
  if (loading) return <ListingLoading />;

  // Start data request early so Suspend can use it for ssr fallback
  const listingResource = getListing(id);

  return (
    <Suspend resources={listingResource} fallback={<ListingLoading />}>
      <ListingBlock Head={Head} listingResource={listingResource} onReady={onReady} />
    </Suspend>
  );
}
