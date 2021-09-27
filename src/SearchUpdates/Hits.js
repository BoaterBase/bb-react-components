import { connectHits } from 'react-instantsearch-dom';
import React, { memo, useState } from 'react';
import { useSearch } from '../SearchUpdates';
import { mod, imagePath } from '../utils';
import Link from '../Link';

const BaseHits = memo(
  ({ hits, defaultProfileId }) => {
    const [searchState] = useSearch();
    const [currentImage, setCurrentImage] = useState(0);
    //console.log(searchState, hits);
    switch (searchState.layout) {
      case 'compact':
        return (
          <ul className="bb-divide-y bb-divide-gray-100">
            {hits.map((item) => {
              return (
                <li key={item.slug + item.random} className="bb-py-2 bb-flex bb-space-x-2">
                  <div className="bb-w-20 bb-flex-none">
                    <div className="bb-relative bb-rounded-md">
                      {item.images?.length > 0 ? (
                        <Link title={item.title} to={`/${item.slug}`}>
                          <svg
                            viewBox="0 0 4 3"
                            className="bb-relative bb-block bb-w-full bb-rounded-md bb-bg-gradient-to-b bb-from-blue-500 bb-to-blue-400"
                          ></svg>

                          <img
                            src={imagePath(item.images[mod(currentImage, item.images.length)])}
                            className="bb-absolute bb-inset-0 bb-w-full bb-h-full hover:bb-animate-slide-object bb-shadow-md bb-rounded-md bb-object-cover"
                          />
                        </Link>
                      ) : (
                        <svg viewBox="0 0 4 3" className="bb-relative bb-block bb-w-full bb-rounded-md bb-bg-white"></svg>
                      )}
                    </div>
                  </div>

                  <div className="bb-flex bb-flex-col bb-flex-auto bb-leading-tight">
                    <time className="bb-text-xs bb-font-light bb-text-gray-500 bb-leading-tight" dateTime={new Date(item.created).toISOString()}>
                      {new Date(item.created).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </time>
                    <h2 className="bb-text-lg bb-font-semibold bb-text-gray-800 bb-line-clamp-1 hover:bb-underline  bb-leading-snug">
                      <Link title={item.title} to={`/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h2>

                    <p className="bb-text-gray-500 bb-line-clamp-1 bb-text-sm bb-leading-tight">{item.content}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        );
      case 'gallery':
        return (
          <div className="bb-w-full bb-grid bb-grid-cols-1 sm:bb-grid-cols-2 md:bb-grid-cols-3 bb-gap-2 md:bb-gap-3">
            {hits.map((item) => {
              return (
                <div className="bb-rounded-md bb-bg-gray-50 bb-shadow hover:bb-shadow-md bb-transition-transform bb-duration-300 bb-transform hover:bb--translate-y-px bb-cursor-pointer bb-h-full">
                  <div className="bb-relative bb-rounded-md">
                    <Link title={item.title} to={`/${item.slug}`}>
                      <svg viewBox="0 0 4 3" className="bb-relative bb-block bb-w-full bb-rounded-md bb-bg-gradient-to-b bb-from-blue-200 bb-to-blue-100"></svg>
                      {item.images?.length > 0 && (
                        <img
                          src={imagePath(item.images[mod(currentImage, item.images.length)])}
                          className="bb-absolute hover:bb-animate-slide-object bb-w-full bb-rounded-md bb-h-full bb-inset-0 bb-object-cover"
                        />
                      )}
                    </Link>
                    {item.business && item.business.name && item.business.logo && (
                      <Link title={item.business.name} to={`/profiles/${item.business.name.split('::')[1] || item.business.id}`}>
                        <img
                          alt={item.business.name}
                          src={item.business.logo}
                          style={{ maxWidth: '30%', maxHeight: '20%' }}
                          className="bb-absolute bb-top-1.5 bb-right-1.5 bb-bg-white bb-shadow bb-rounded-sm bb-p-0.5 bb-opacity-75 hover:bb-opacity-100"
                        />
                      </Link>
                    )}
                  </div>
                  <Link
                    title={item.title}
                    to={`/${item.slug}`}
                    style={{ textShadow: '0 0 2px rgba(0,0,0,0.75)' }}
                    className="bb-block bb-leading-tight bb-pt-8 bb-rounded-b-md bb-absolute bb-bottom-0 bb-left-0 bb-w-full bb-bg-gradient-to-b bb-from-transparent bb-to-gray-500"
                  >
                    <h3 title={item.title} className="bb-px-2 bb-pb-1 bb-text-xl bb-font-semibold bb-text-gray-100 bb-clamp-2 bb-leading-tight">
                      {item.title}
                    </h3>
                  </Link>
                </div>
              );
            })}
          </div>
        );
      default:
        return (
          <ul className="bb-divide-y bb-divide-gray-100">
            {hits.map((item) => {
              return (
                <li key={item.slug + item.random} className="bb-py-3 bb-block sm:bb-flex sm:bb-space-x-3 bb-space-y-3 sm:bb-space-y-0">
                  <div className="sm:bb-w-1/4 bb-flex-none">
                    <div className="bb-relative bb-rounded-md">
                      {item.images?.length > 0 ? (
                        <Link title={item.title} to={`/${item.slug}`}>
                          <svg
                            viewBox="0 0 16 9"
                            className="bb-relative bb-block bb-w-full bb-rounded-md bb-bg-gradient-to-b bb-from-blue-500 bb-to-blue-400"
                          ></svg>

                          <img
                            src={imagePath(item.images[mod(currentImage, item.images.length)])}
                            className="bb-absolute bb-inset-0 bb-w-full bb-h-full hover:bb-animate-slide-object bb-shadow-md bb-rounded-md bb-object-cover"
                          />
                        </Link>
                      ) : (
                        <svg viewBox="0 0 16 9" className="bb-relative bb-block bb-w-full bb-rounded-md bb-bg-white"></svg>
                      )}
                    </div>
                  </div>

                  <div className="bb-flex bb-flex-col bb-flex-auto">
                    <time className="bb-text-sm bb-font-light bb-text-gray-500" dateTime={new Date(item.created).toISOString()}>
                      {new Date(item.created).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </time>
                    <h2 className="bb-text-lg md:bb-text-xl bb-font-semibold bb-text-gray-800 bb-line-clamp-1 hover:bb-underline">
                      <Link title={item.title} to={`/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h2>

                    <p className="bb-text-gray-500 bb-line-clamp-2">{item.content}</p>
                    <div className="bb-flex-auto"></div>
                    <div>
                      {item.business && item.business.name && (
                        <div className="bb-mt-3 bb-flex bb-justify-start">
                          <Link title={item.business.name} to={`/profiles/${item.business.name.split('::')[1] || item.business.id}`}>
                            {item.business?.logo ? (
                              <img style={{ maxWidth: 100, maxHeight: 30 }} src={item.business.logo} title={item.business.name} />
                            ) : (
                              <span className="bb-text-sm bb-font-semibold bb-text-gray-800 hover:bb-underline">{item.business.name.split('::')[0]}</span>
                            )}
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        );
    }
  },
  ({ hits: prevHits, ...prevProps }, { hits: nextHits, ...nextProps }) => {
    // BUG - By default Hits renders multiple times due to hits array mutating, so need to check for real changes or causes poor performance and breaks transitions
    // https://github.com/algolia/react-instantsearch/issues/1370

    // Standard shallow check for existing props
    for (let key in nextProps) {
      if (nextProps[key] !== prevProps[key]) return false;
    }

    // Check hits array for size or item changes
    if (prevHits.length !== nextHits.length) {
      return false;
    }

    for (let i = 0; i < nextHits.length; i++) {
      if (nextHits[i].objectID !== prevHits[i].objectID) {
        return false;
      }
    }

    return true;
  }
);

const Hits = connectHits(BaseHits);
export default Hits;
