import React, { useState } from 'react';
import getListing from '../../data/getListing';

import formatCoords from '../../utils/formatCoords';
import formatNumber from '../../utils/formatNumber';
import formatCurrency from '../../utils/formatCurrency';

import MapImage from '../../parts/MapImage';
import Updates from '../../parts/Updates';
import LocationIcon from '../../icons/Location';
import Content from '../../parts/Content';
import Gallery from '../../parts/Gallery';
import Share from '../../parts/Share';

import Profile from '../../parts/Profile';

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

function ListingBlock({ id }) {
  const [overlay, setOverlay] = useState({});

  const listing = getListing(id).read();
  const updates = undefined;

  return (
    <div>
      {listing.media && listing.media[0]?.width >= 900 && (
        <div className="bb-mb-3">
          <Gallery media={listing.media} layout="primary" />
        </div>
      )}

      <div className="bb-grid bb-grid-cols-4 bb-gap-3">
        <div className="bb-col-span-3">
          {listing.media && listing.media[0]?.width < 900 && (
            <div className="bb-mb-2">
              <Gallery media={listing.media} layout="primary" />
            </div>
          )}

          <h1 className="bb-text-3xl bb-font-semibold bb-text-gray-800 bb-leading-9">{listing.title}</h1>
          <p className="bb-mt-2 bb-font-serif bb-text-xl bb-font-medium bb-text-gray-500 bb-italic">{listing.summary}</p>
          <button className="bb-flex bb-items-center bb-mt-2 bb-text-blue-400 hover:bb-text-blue-500">
            <LocationIcon className="bb-text-blue-500 bb-w-6 bb-h-6" />
            <span className=" bb-font-medium bb-text-xl bb-mx-1">{listing.location}</span>
          </button>
          <div>
            <span className="bb-text-4xl bb-font-medium bb-text-gray-800 bb-mr-1">{formatCurrency(listing.price, listing.currency)}</span>
            <span className="bb-font-medium bb-text-gray-400">{listing.label}</span>
          </div>
          <Specifications data={listing.specifications} />
          <Content items={listing.content} className="bb-border-t bb-border-gray-100 bb-mt-2" />
          <h2 className="bb-mt-4 bb-mb-4 bb-text-3xl bb-font-semibold bb-text-gray-800">Updates</h2>
          {updates && <Updates pathname={`/listings/${listing.slug}`} />}
        </div>
        <div className="bb-col-span-1 bb-space-y-4">
          <Profile profile={listing.profile} contact={listing.contact} listingId={listing.id} />
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
            <h3 className="bb-uppercase bb-text-center bb-mb-1 bb-font-medium bb-text-gray-500 bb-text-sm">Data</h3>
            <div className="bb-max-h-20 bb-overflow-y-auto bb-break-all bb-font-mono bb-text-xs bb-bg-gray-800 bb-text-gray-400 bb-rounded bb-shadow bb-p-2">
              <code>{JSON.stringify(listing)}</code>
            </div>
          </div>

          <div className="bb-hidden xbb-flex bb-rounded-md bb-shadow">
            <button
              onClick={() => setOverlay('message')}
              type="button"
              className="bb-flex-auto bb-flex bb-justify-center bb-items-center bb-px-6 bb-py-3 bb-border bb-border-transparent bb-text-lg bb-leading-6 bb-font-medium bb-rounded-md bb-text-white bb-bg-gradient-to-b bb-from-blue-500  bb-to-blue-600 hover:bb-to-blue-700 focus:bb-outline-none focus:bb-border-blue-700 focus:bb-shadow-outline-blue active:bb-bg-blue-700 bb-transition bb-ease-in-out bb-duration-150"
            >
              Send Message
              <svg className="bb-ml-3 bb--mr-1 bb-h-5 bb-w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {overlay.type === 'map' && (
        <div>
          {listing.geo && <div className="bb-mt-2">Map Here</div>}

          {listing.location && (
            <div className="bb-mt-2 bb-flex bb-items-center">
              <LocationIcon className="bb-text-gray-300 bb-w-4 bb-h-4 bb-mr-1" />
              <span className="bb-text-gray-500 bb-text-base bb-flex-auto">{listing.location}</span>
              {listing.geo && (
                <span className="bb-text-xs bb-text-gray-300 bb-font-light bb-leading-tight">{formatCoords(listing.geo.latitude, listing.geo.longitude)}</span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
export default ListingBlock;
