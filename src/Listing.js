import React, { useEffect, useState } from 'react';
import { useAsyncData, formatCoords, formatNumber } from '../src/utils';
import { getListingUpdates } from '../src/api';
import classNames from 'classnames';
import MapBox from './MapBox';
import MapImage from './MapImage';
import Updates from './Updates';
import LocationIcon from './Icons/Location';
import Content from './Content';
import Gallery from './Gallery';

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

function Listing({ data }) {
  const [listing, listingError] = useAsyncData(data);
  const [overlay, setOverlay] = useState({});
  const [updates, setUpdates] = useState(undefined);

  useEffect(() => {
    if (listing?.id) {
      setUpdates(getListingUpdates(listing.id));
    }
  }, [listing]);

  switch (listing) {
    case undefined:
      return <div>Missing</div>;
    case false:
      listingError && console.log(listingError);
      return <div>Error</div>;
    case null:
      return <div>Loading...</div>;
    default:
      return (
        <div>
          {listing.media && (
            <div className="bb-mb-2">
              <Gallery media={listing.media} layout="primary" />
            </div>
          )}

          <div className="bb-grid bb-grid-cols-4 bb-gap-3 bb-mt-3">
            <div className="bb-col-span-3">
              <h1 className="bb-text-3xl bb-font-semibold bb-text-gray-800">{listing.title}</h1>
              <p className="bb-font-serif bb-text-xl bb-font-medium bb-text-gray-500 bb-italic">{listing.summary}</p>
              <button className="bb-flex bb-items-center bb-mt-2 bb-text-blue-400 hover:bb-text-blue-500">
                <LocationIcon className="bb-text-blue-500 bb-w-6 bb-h-6" />
                <span className=" bb-font-medium bb-text-xl bb-mx-1">{listing.location}</span>
              </button>
              <Specifications data={listing.specifications} />
              <Content items={listing.content} className="bb-border-t bb-border-gray-100 bb-mt-2" />
              <h2 className="bb-mt-4 bb-mb-4 bb-text-3xl bb-font-semibold bb-text-gray-800">Updates</h2>
              <Updates data={updates} />
            </div>
            <div className="bb-col-span-1 bb-space-y-4">
              <div className="bb-flex bb-flex-col bb-text-center bb-bg-white bb-rounded-lg bb-shadow-md">
                <div className="bb-p-4 bb-border-b bb-border-gray-100 bb-rounded-t-lg bb-bg-white">
                  <img className="bb-w-full bb-max-h-10 bb-object-contain" src="https://www.boaterbase.com/assets/logo.png" />
                </div>
                <div className="bb-flex-1 bb-flex bb-flex-col bb-p-8 bb-items-center">
                  <img
                    className="bb-w-32 bb-h-32 bb-flex-shrink-0 bb-mx-auto bb-bg-black bb-rounded-full"
                    src="https://res.cloudinary.com/boaterbase/image/upload/v1577813234/profiles/aoyrk56yv2hhsd0ooxpl.jpg"
                  />
                  <h3 className="bb-mt-6 bb-text-gray-900 bb-text-base bb-leading-5 bb-font-medium">Joe Andrade</h3>
                  <h4 className="bb-text-gray-400 bb-mt-1 bb-text-xl bb-leading-5 bb-font-light">MarineMotion Inc.</h4>
                </div>
                <div className="bb-border-t bb-border-gray-200">
                  <div className="bb--mt-px bb-flex">
                    <div className="bb-w-0 bb-flex-1 bb-flex bb-border-r bb-border-gray-200">
                      <a
                        href="#"
                        className="bb-relative bb--mr-px bb-w-0 bb-flex-1 bb-inline-flex bb-items-center bb-justify-center bb-py-4 bb-text-sm bb-leading-5 bb-text-gray-700 bb-font-medium bb-border bb-border-transparent bb-rounded-bl-lg hover:bb-text-gray-500 focus:bb-outline-none focus:bb-shadow-outline-blue focus:bb-border-blue-300 focus:bb-z-10 bb-transition bb-ease-in-out bb-duration-150"
                      >
                        <svg className="bb-w-5 bb-h-5 bb-text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                        <span className="bb-ml-3">Message</span>
                      </a>
                    </div>
                    <div className="bb--ml-px bb-w-0 bb-flex-1 bb-flex">
                      <a
                        href="#"
                        className="bb-relative bb-w-0 bb-flex-1 bb-inline-flex bb-items-center bb-justify-center bb-py-4 bb-text-sm bb-leading-5 bb-text-gray-700 bb-font-medium bb-border bb-border-transparent bb-rounded-br-lg hover:bb-text-gray-500 focus:bb-outline-none focus:bb-shadow-outline-blue focus:bb-border-blue-300 focus:bb-z-10 bb-transition bb-ease-in-out bb-duration-150"
                      >
                        <svg className="bb-w-5 bb-h-5 bb-text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span className="bb-ml-3">Call</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div>
                  {listing.geo && (
                    <MapImage
                      className="bb-shadow bb-rounded-md bb-w-full"
                      width={600}
                      height={400}
                      latitude={listing.geo.latitude}
                      longitude={listing.geo.longitude}
                    />
                  )}
                </div>
              </div>

              <div className="bb-max-h-20 bb-overflow-y-auto bb-break-all bb-font-mono bb-text-xs bb-bg-gray-800 bb-text-gray-400 bb-rounded bb-shadow bb-p-2">
                <code>{JSON.stringify(listing)}</code>
              </div>

              <div className="bb-flex bb-rounded-md bb-shadow">
                <button
                  type="button"
                  className="bb-flex-auto bb-flex bb-justify-center bb-items-center bb-px-6 bb-py-3 bb-border bb-border-transparent bb-text-lg bb-leading-6 bb-font-medium bb-rounded-md bb-text-white bb-bg-blue-600 hover:bb-bg-blue-500 focus:bb-outline-none focus:bb-border-blue-700 focus:bb-shadow-outline-blue active:bb-bg-blue-700 bb-transition bb-ease-in-out bb-duration-150"
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
              {listing.geo && (
                <div className="bb-mt-2">
                  <MapBox latitude={listing.geo.latitude} longitude={listing.geo.longitude} />
                </div>
              )}

              {listing.location && (
                <div className="bb-mt-2 bb-flex bb-items-center">
                  <LocationIcon className="bb-text-gray-300 bb-w-4 bb-h-4 bb-mr-1" />
                  <span className="bb-text-gray-500 bb-text-base bb-flex-auto">{listing.location}</span>
                  {listing.geo && (
                    <span className="bb-text-xs bb-text-gray-300 bb-font-light bb-leading-tight">
                      {formatCoords(listing.geo.latitude, listing.geo.longitude)}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      );
  }
}
export default Listing;
