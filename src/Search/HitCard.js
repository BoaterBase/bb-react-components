import React from 'react';
import { useState } from 'react';
import { mod, imagePath } from '../utils';
import Link from '../Link';
import classNames from 'classnames';
import Info from '../icons/Info';
import Location from '../icons/Location';

export default function HitCard({
  slug,
  title,
  summary,
  images,
  location,
  specifications,
  avatar,
  name,
  handle,
  logo,
  businessName,
  businessHandle,
  availability,
  message,
  label,
  price,
}) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="bb-rounded-md bb-bg-gray-50 bb-shadow hover:bb-shadow-md bb-transition-transform bb-duration-300 bb-transform hover:bb--translate-y-px bb-cursor-pointer bb-h-full">
      <div className="bb-relative bb-rounded-t-md">
        <Link title={title} to={`/listings/${slug}`}>
          <svg viewBox="0 0 4 3" className="bb-relative bb-block bb-w-full bb-rounded-t-md bb-bg-gradient-to-b bb-from-blue-500 bb-to-blue-400"></svg>
          {images?.length > 0 && (
            <img
              src={imagePath(images[mod(currentImage, images.length)])}
              className="bb-absolute bb-inset-0 bb-w-full bb-h-full hover:bb-animate-slide-objec bb-rounded-t-md bb-object-cover"
            />
          )}
        </Link>
        {logo && (
          <Link title={businessName} to={`/profiles/${businessHandle}`}>
            <img
              alt={businessName}
              src={logo}
              style={{ maxWidth: '30%', maxHeight: '20%' }}
              className="bb-absolute bb-top-1.5 bb-right-1.5 bb-bg-white bb-shadow bb-rounded-sm bb-p-0.5 bb-opacity-75 hover:bb-opacity-100"
            />
          </Link>
        )}

        {avatar && (
          <Link title={name} to={`/profiles/${handle}`}>
            <img
              alt={name}
              src={avatar}
              className="bb-absolute bb-top-1.5 bb-left-1.5 bb-w-10 bb-h-10 bb-shadow bb-rounded-full bb-bg-white bb-p-px bb-opacity-75 hover:bb-opacity-100"
            />
          </Link>
        )}
        <Link title={title} to={`/listings/${slug}`}>
          <div className="bb-absolute bb-bottom-0 bb-left-0 bb-w-full bb-bg-gray-50 bb-bg-opacity-75">
            <div className="bb-relative bb-pt-2 bb-px-2 bb-bg-gradient-to-b bb-from-transparent bb-to-gray-50">
              <div className={classNames('bb-text-sm bb-font-semibold bb-text-red-500 bb-truncate bb-leading-snug', !message && 'bb-invisible')}>
                {message || '-'}
              </div>
            </div>
          </div>
        </Link>
        {images?.length > 1 && (
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
        {images?.length > 1 && (
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
      <Link title={title} to={`/listings/${slug}`}>
        <h3 title={title} className="bb-px-2 bb-text-xl bb-font-semibold bb-text-gray-700 bb-truncate bb-leading-normal">
          {title}
        </h3>
        <div title={specifications} className="bb-flex bb-items-center bb-px-2 bb-text-indigo-500 bb-text-sm bb-font-medium">
          <Info className="bb-w-4 bb-h-4 bb-mr-0.5 bb-opacity-50" />
          <span className="bb-truncate">{specifications}</span>
        </div>
        <div title={location} className="bb-flex bb-items-center bb-px-2 bb-text-gray-500 bb-text-sm bb-font-normal">
          <Location className="bb-flex-none bb-w-4 bb-h-4 bb-mr-0.5 bb-opacity-50" />
          <span className="bb-truncate">{location}</span>
        </div>
        {availability.length > 0 && !availability.includes('Sold') ? (
          <div className="bb-flex bb-items-center bb-px-2 bb-pb-1 bb-h-10">
            <span className="bb-text-2xl bb-text-orange-400 bb-font-medium bb-mr-3">{price}</span>
            {label && isNaN(label) && <span className="bb-ml-auto bb-text-normal bb-text-orange-400 bb-font-medium">{label}</span>}
          </div>
        ) : availability.length > 0 && availability.includes('Sold') ? (
          <div className="bb-flex bb-items-center bb-px-2 bb-pb-1 bb-h-10 bb-text-red-400 bb-text-xl bb-font-medium">Sold</div>
        ) : (
          <div className="bb-flex bb-items-center bb-justify-end bb-px-2 bb-pb-1 bb-h-10 bb-text-gray-200">Not Available</div>
        )}
      </Link>
    </div>
  );
}
