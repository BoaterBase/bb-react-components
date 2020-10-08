import React from 'react';
import { useState } from 'react';
import { mod, imagePath } from '../utils';
import Link from '../Link';
import classNames from 'classnames';
import Info from '../icons/Info';
import Location from '../icons/Location';

export default function HitList({
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
    <div className="bb-rounded-md bb-flex bb-bg-gray-50 bb-shadow hover:bb-shadow-md bb-transition-transform bb-duration-300 bb-transform hover:bb--translate-y-px bb-cursor-pointer">
      <div className="bb-relative bb-rounded-l-md bb-flex-none">
        <svg viewBox="0 0 8 5" className="bb-block bb-w-full bb-rounded-l-md"></svg>
        {images?.length && (
          <Link title={title} to={`/listings/${slug}`}>
            <img
              src={imagePath(images[mod(currentImage, images.length)])}
              className="bb-absolute hover:bb-animate-slide-object bb-w-full bb-rounded-l-md bb-h-full bb-bg-gray-400 bb-inset-0 bb-object-cover"
            />
          </Link>
        )}
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
      <div className="bb-flex-auto bb-p-2 bb-flex bb-flex-col bb-w-full bb-overflow-hidden">
        {message && (
          <div className={classNames('bb-text-sm bb-font-semibold bb-text-red-500 bb-truncate bb-leading-snug', !message && 'bb-invisible')}>{message}</div>
        )}

        <h3 title={title} className="bb-text-xl bb-font-semibold bb-text-gray-700 bb-truncate bb-leading-normal">
          {title}
        </h3>
        <p className="bb-text-base bb-mb-1 bb-font-serif bb-text-gray-500 bb-italic bb-truncate bb-w-full bb-block">{summary}</p>
        <div title={specifications} className="bb-flex bb-items-center bb-text-indigo-500 bb-text-sm bb-font-medium">
          <Info className="bb-w-4 bb-h-4 bb-mr-0.5 bb-opacity-50" />
          <span className="bb-truncate">{specifications}</span>
        </div>
        <div title={location} className="bb-flex bb-items-center bb-text-gray-500 bb-text-sm bb-font-normal">
          <Location className="bb-flex-none bb-w-4 bb-h-4 bb-mr-0.5 bb-opacity-50" />
          <span className="bb-truncate">{location}</span>
        </div>
        {availability.length > 0 ? (
          <div className="bb-mt-auto bb-flex bb-items-center bb-h-8">
            <span className="bb-text-2xl bb-text-orange-400 bb-font-medium bb-mr-3">{price}</span>
            {label && isNaN(label) && <span className="bb-ml-auto bb-text-normal bb-text-orange-400 bb-font-medium">{label}</span>}
          </div>
        ) : (
          <div className="bb-mt-auto bb-flex bb-items-center bb-justify-end bb-h-8 bb-text-gray-200">Not Available</div>
        )}
      </div>
    </div>
  );
}
