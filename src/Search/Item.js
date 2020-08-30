import React from 'react';
import { memo, useState } from 'react';
import { mod, imagePath, formatCurrency } from '../utils';
import { useBoaterBase } from '../BoaterBase';
import { useSearch } from '../Search';
import { useCurrency } from '../Currency';
import Link from '../Link';

function Item({ layout, data }) {
  const [searchState, setSearchState] = useSearch();
  const { currency, rates, getRate } = useCurrency();

  const [currentImage, setCurrentImage] = useState(0);

  const { theme } = useBoaterBase();

  // Get the price the user entered by default data.price is indexed usd conversion.
  let displayPrice = data.displayPrice;
  let displayCurrency = data.currency;

  if (displayPrice && displayCurrency && rates && currency != displayCurrency && getRate(displayCurrency) && getRate(currency)) {
    // To USD
    displayPrice = displayPrice / getRate(displayCurrency);
    // To selected currency
    displayPrice = displayPrice * getRate(currency);

    displayCurrency = currency;
  }

  const displayTitle = theme.hitTitle(data);

  const onSpecificationsClick = (attribute) => (event) => {
    setSearchState({
      ...searchState,
      refinementList: {
        ...searchState.refinementList,
        ['specifications.' + attribute]: [...(searchState.refinementList['specifications.' + attribute] || []), data.specifications[attribute]],
      },
    });
  };

  const specs = (
    <span className="bb-truncate">
      {data.specifications.manufacturer && (
        <span onClick={onSpecificationsClick('manufacturer')} className="hover:bb-underline">
          {data.specifications.manufacturer}
        </span>
      )}
      {data.specifications.model && <b> &middot; </b>}
      {data.specifications.model && (
        <span onClick={onSpecificationsClick('model')} className="hover:bb-underline">
          {data.specifications.model}
        </span>
      )}

      {data.specifications.classification && <b> &middot; </b>}
      {data.specifications.classification && (
        <span onClick={onSpecificationsClick('classification')} className="hover:bb-underline">
          {data.specifications.classification}
        </span>
      )}
      {data.specifications.category && <b> &middot; </b>}
      {data.specifications.category && (
        <span onClick={onSpecificationsClick('category')} className="hover:bb-underline">
          {data.specifications.category}
        </span>
      )}
    </span>
  );

  switch (layout) {
    case 'gallery':
      return (
        <div className="bb-relative bb-rounded-md">
          <svg viewBox="0 0 6 4" className="bb-block bb-w-full bb-rounded-md"></svg>
          {data.images?.length && (
            <a href="#img">
              <img
                src={imagePath(data.images[mod(currentImage, data.images.length)])}
                className="bb-absolute bb-w-full bb-rounded-md bb-h-full bb-bg-gray-400 bb-inset-0 bb-object-cover"
              />
            </a>
          )}
          {data.message && (
            <div className="bb-absolute bb-top-2 bb-left-2 bb-max-w-xs bb-bg-blue-600 bb-text-blue-50 bb-py-1 bb-px-2 bb-truncate bb-shadow-sm bb-rounded-md bb-text-xs bb-font-medium bb-bg-opacity-75">
              {data.message}
            </div>
          )}
          {data.profile?.avatar && (
            <a href="#avatar">
              <img
                src={data.profile.avatar}
                className="bb-absolute bb-top-2 bb-right-2 bb-w-12 bb-h-12 md:bb-w-13 md:bb-h-13 bb-shadow-lg bb-border-2 bb-border-white bb-rounded-full bb-bg-gray-400 bb-object-cover"
              />
            </a>
          )}

          <div
            className="bb-absolute bb-rounded-b-md bb-left-0 bb-right-0 bb-bottom-0 bb-p-3 bb-bg-black bb-bg-opacity-50"
            style={{
              background: `linear-gradient(180deg, rgba(0,20,50,0) 0%, rgba(0,20,50,0.8169642857142857) 100%)`,
            }}
          >
            <h3 className="bb-text-lg bb-mt-6 bb-font-semibold bb-truncate bb-leading-tight bb-text-gray-50" title={displayTitle}>
              <Link className="hover:bb-underline" title={displayTitle} to={`/listings/${data.slug}`}>
                {displayTitle}
              </Link>
            </h3>
            <div className="bb-flex bb-items-center  bb-mt-1 bb-text-indigo-400 bb-text-sm bb-font-semibold">
              <svg className="bb-flex-none bb-w-4 bb-h-4 bb-opacity-50 bb-mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="bb-truncate">{specs}</div>
            </div>
            <div className="bb-flex bb-items-center bb-mb-1 bb-text-sm bb-leading-tight bb-m-0 bb-p-0 bb-text-gray-300">
              <svg className="bb-flex-none bb-w-4 bb-h-4 bb-opacity-50 bb-mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {data.profile?.name || data.location ? (
                <div className="bb-truncate">
                  {data.profile?.name?.split('::')[0]}
                  {data.profile?.name && data.location && ' · '}
                  {data.location}
                </div>
              ) : (
                <div>Location Not Set</div>
              )}
            </div>
            {data.label || displayPrice ? (
              <div className="bb-text-orange-400 bb-mt-2 bb-capitalize bb-leading-none bb-text-sm">
                {data.label} {data.displayPrice && <b className="bb-text-base">{formatCurrency(displayPrice, displayCurrency)}</b>}
              </div>
            ) : (
              <div className="bb-text-orange-400 bb-mt-2 bb-capitalize bb-leading-none bb-text-sm">&nbsp;</div>
            )}
          </div>
          {data.images?.length && data.images?.length > 1 && (
            <button
              onClick={() => setCurrentImage(currentImage - 1)}
              className="bb-absolute bb-top-1/2 bb--mt-3 bb-left-2 bb-appearance-none bb-bg-black bb-bg-opacity-25 bb-text-white bb-opacity-50 hover:bb-opacity-100 bb-w-6 bb-h-6 bb-rounded-full focus:bb-outline-none focus:bb-shadow-outline-yellow"
            >
              <svg className="bb-w-6 bb-h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
          {data.images?.length && data.images?.length > 1 && (
            <button
              onClick={() => setCurrentImage(currentImage + 1)}
              className="bb-absolute bb-top-1/2 bb--mt-3 bb-right-2 bb-appearance-none bb-bg-black bb-bg-opacity-25 bb-text-white bb-opacity-50 hover:bb-opacity-100 bb-w-6 bb-h-6 bb-rounded-full focus:bb-outline-none focus:bb-shadow-outline-yellow"
            >
              <svg className="bb-w-6 bb-h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          )}
        </div>
      );
    case 'card':
      return (
        <div className="bb-rounded-md bb-bg-gray-50 bb-shadow hover:bb-shadow-md bb-transition-transform bb-duration-300 bb-transform hover:bb--translate-y-1 bb-cursor-pointer bb-h-full">
          <div className="bb-relative bb-rounded-t-md">
            <svg viewBox="0 0 16 9" className="bb-block bb-w-full bb-rounded-t-md"></svg>
            {data.images?.length && (
              <a href="#img">
                <img
                  src={imagePath(data.images[mod(currentImage, data.images.length)])}
                  className="bb-absolute bb-w-full bb-rounded-t-md bb-h-full bb-bg-gray-400 bb-inset-0 bb-object-cover"
                />
              </a>
            )}
            {data.message && (
              <div className="bb-absolute bb-top-2 bb-left-2 bb-max-w-xs bb-bg-blue-600 bb-text-blue-50 bb-py-1 bb-px-2 bb-truncate bb-shadow-sm bb-rounded-md bb-text-xs bb-font-medium bb-bg-opacity-75">
                {data.message}
              </div>
            )}
            {data.profile?.avatar && (
              <a href="#avatar">
                <img
                  src={data.profile.avatar}
                  className="bb-absolute bb-top-2 bb-right-2 bb-w-12 bb-h-12 md:bb-w-13 md:bb-h-13 bb-shadow-lg bb-border-2 bb-border-white bb-rounded-full bb-bg-gray-400 bb-object-cover"
                />
              </a>
            )}
            {data.images?.length && data.images?.length > 1 && (
              <button
                onClick={() => setCurrentImage(currentImage - 1)}
                className="bb-absolute bb-top-1/2 bb--mt-3 bb-left-2 bb-appearance-none bb-bg-black bb-bg-opacity-25 bb-text-white bb-opacity-50 hover:bb-opacity-100 bb-w-6 bb-h-6 bb-rounded-full focus:bb-outline-none  focus:bb-shadow-outline-yellow"
              >
                <svg className="bb-w-6 bb-h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            {data.images?.length && data.images?.length > 1 && (
              <button
                onClick={() => setCurrentImage(currentImage + 1)}
                className="bb-absolute bb-top-1/2 bb--mt-3 bb-right-2 bb-appearance-none bb-bg-black bb-bg-opacity-25 bb-text-white bb-opacity-50 hover:bb-opacity-100 bb-w-6 bb-h-6 bb-rounded-full focus:bb-outline-none focus:bb-shadow-outline-yellow"
              >
                <svg className="bb-w-6 bb-h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="bb-p-4 bb-border-t bb-border-gray-100">
            <h3 className="bb-text-lg bb-font-semibold bb-truncate bb-leading-tight" title={displayTitle}>
              <Link className="hover:bb-underline" title={displayTitle} to={`/listings/${data.slug}`}>
                {displayTitle}
              </Link>{' '}
            </h3>
            <div className="bb-flex bb-items-center  bb-mt-2 bb-text-indigo-500 bb-text-sm bb-font-semibold">
              <svg className="bb-flex-none bb-w-4 bb-h-4 bb-opacity-50 bb-mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="bb-truncate">{specs}</div>
            </div>
            <div className="bb-flex bb-items-center bb-mb-1 bb-text-sm bb-leading-tight bb-m-0 bb-p-0 bb-text-gray-400">
              <svg className="bb-flex-none bb-w-4 bb-h-4 bb-opacity-50 bb-mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {data.profile?.name || data.location ? (
                <div className="bb-truncate">
                  {data.profile?.name?.split('::')[0]}
                  {data.profile?.name && data.location && ' · '}
                  {data.location}
                </div>
              ) : (
                <div>Location Not Set</div>
              )}
            </div>
            {data.label || displayPrice ? (
              <div className="bb-text-orange-500 bb-mt-2 bb-capitalize bb-leading-none bb-text-sm">
                {data.label} {data.displayPrice && <b className="bb-text-base">{formatCurrency(displayPrice, displayCurrency)}</b>}
              </div>
            ) : (
              <div className="bb-text-orange-500 bb-mt-2 bb-capitalize bb-leading-none bb-text-sm">&nbsp;</div>
            )}
          </div>
        </div>
      );
    case 'list':
      return (
        <div className="sm:bb-flex bb-rounded-md bb-bg-gray-50 bb-shadow hover:bb-shadow-md bb-transition-transform bb-duration-300 bb-transform hover:bb--translate-y-1 bb-cursor-pointer bb-h-full">
          <div className="bb-flex-none bb-relative bb-rounded-l-md">
            <svg viewBox="0 0 6 4" className="bb-block bb-w-full bb-rounded-t-md sm:bb-rounded-t-none sm:bb-rounded-l-md"></svg>
            {data.images?.length && (
              <a href="#img">
                <img
                  src={imagePath(data.images[mod(currentImage, data.images.length)])}
                  className="bb-absolute bb-w-full bb-rounded-t-md sm:bb-rounded-t-none sm:bb-rounded-l-md bb-h-full bb-bg-gray-400 bb-inset-0 bb-object-cover"
                />
              </a>
            )}
            {data.message && (
              <div className="bb-absolute bb-top-2 bb-left-2 bb-max-w-xs bb-bg-blue-600 bb-text-blue-50 bb-py-1 bb-px-2 bb-truncate bb-shadow-sm bb-rounded-md bb-text-xs bb-font-medium bb-bg-opacity-75">
                {data.message}
              </div>
            )}
            {data.profile?.avatar && (
              <a href="#avatar">
                <img
                  src={data.profile.avatar}
                  className="bb-absolute bb-top-2 bb-right-2 bb-w-12 bb-h-12 md:bb-w-13 md:bb-h-13 bb-shadow-lg bb-border-2 bb-border-white bb-rounded-full bb-bg-gray-400 bb-object-cover"
                />
              </a>
            )}

            {data.images?.length && data.images?.length > 1 && (
              <button
                onClick={() => setCurrentImage(currentImage - 1)}
                className="bb-absolute bb-top-1/2 bb--mt-3 bb-left-2 bb-appearance-none bb-bg-black bb-bg-opacity-25 bb-text-white bb-opacity-50 hover:bb-opacity-100 bb-w-6 bb-h-6 bb-rounded-full focus:bb-outline-none  focus:bb-shadow-outline-yellow"
              >
                <svg className="bb-w-6 bb-h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
            {data.images?.length && data.images?.length > 1 && (
              <button
                onClick={() => setCurrentImage(currentImage + 1)}
                className="bb-absolute bb-top-1/2 bb--mt-3 bb-right-2 bb-appearance-none bb-bg-black bb-bg-opacity-25 bb-text-white bb-opacity-50 hover:bb-opacity-100 bb-w-6 bb-h-6 bb-rounded-full focus:bb-outline-none  focus:bb-shadow-outline-yellow"
              >
                <svg className="bb-w-6 bb-h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            )}
          </div>
          <div className="bb-flex-auto bb-overflow-hidden bb-p-4 bb-border-t bb-border-gray-100">
            <h3 className="bb-text-lg bb-font-semibold bb-truncate bb-leading-tight" title={displayTitle}>
              <Link className="hover:bb-underline" title={displayTitle} to={`/listings/${data.slug}`}>
                {displayTitle}
              </Link>{' '}
            </h3>
            <p className="bb-text-gray-500 bb-truncate bb-leading-snug">{data.summary}</p>
            <div className="bb-flex bb-items-center  bb-mt-2 bb-text-indigo-500 bb-text-sm bb-font-semibold">
              <svg className="bb-flex-none bb-w-4 bb-h-4 bb-opacity-50 bb-mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="bb-truncate">{specs}</div>
            </div>
            <div className="bb-flex bb-items-center bb-mb-1 bb-text-sm bb-leading-tight bb-m-0 bb-p-0 bb-text-gray-400">
              <svg className="bb-flex-none bb-w-4 bb-h-4 bb-opacity-50 bb-mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {data.profile?.name || data.location ? (
                <div className="bb-truncate">
                  {data.profile?.name?.split('::')[0]}
                  {data.profile?.name && data.location && ' · '}
                  {data.location}
                </div>
              ) : (
                <div>Location Not Set</div>
              )}
            </div>
            {data.label || displayPrice ? (
              <div className="bb-text-orange-500 bb-mt-2 bb-capitalize bb-leading-none bb-text-sm">
                {data.label} {data.displayPrice && <b className="bb-text-base">{formatCurrency(displayPrice, displayCurrency)}</b>}
              </div>
            ) : (
              <div className="bb-text-orange-500 bb-mt-2 bb-capitalize bb-leading-none bb-text-sm">&nbsp;</div>
            )}
          </div>
        </div>
      );
    case 'mini':
      return (
        <div className="bb-flex bb-p-1 bb-rounded-md bb-border bb-border-gray-200 bb-shadow-sm">
          <img src={data.preview} className="bb-block bb-rounded-sm bb-w-11 bb-h-11 bb-shadow-xs" />
          <div className="bb-ml-1 bb-overflow-hidden bb-h-11 bb-leading-tight">
            <h3 className="bb-text-sm bb-leading-tight bb-truncate bb-m-0 bb-p-0">
              <Link className="hover:bb-underline" title={displayTitle} to={`/listings/${data.slug}`}>
                {displayTitle}
              </Link>
            </h3>
            <div className="bb-text-xs bb-leading-tight bb-truncate bb-m-0 bb-p-0 bb-text-gray-500">
              {data.profile?.name || data.location ? (
                <div className="bb-truncate">
                  {data.profile?.name?.split('::')[0]}
                  {data.profile?.name && data.location && ' · '}
                  {data.location}
                </div>
              ) : (
                <div>Location Not Set</div>
              )}
            </div>
            {data.label || displayPrice ? (
              <div className="bb-text-orange-500 bb-capitalize bb-leading-none bb-text-xs">
                {data.label} {data.displayPrice && <b>{formatCurrency(displayPrice, displayCurrency)}</b>}
              </div>
            ) : (
              <div className="bb-text-orange-500 bb-capitalize bb-leading-none bb-text-xs">&nbsp;</div>
            )}
          </div>
        </div>
      );
    default:
      return (
        <div className="bb-shadow-lg bb-rounded-md bb-bg-red-400 bb-p-2 bb-font-mono bb-text-xs bb-overflow-hidden bb-max-h-20">
          {JSON.stringify(data).slice(0, 200)}
        </div>
      );
  }
}

export default memo(Item);
