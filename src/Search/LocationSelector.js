import React, { useState, memo } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { useTransition, animated } from 'react-spring';
import { connectHierarchicalMenu } from 'react-instantsearch-dom';

const LocationSelectorBase = memo(({ currentRefinement, items, refine }) => {
  const [visible, setVisible] = useState(false);

  const transitions = useTransition(visible, null, {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
  });

  // NOTE: Truncated child needs min-w-0 to work and must set maxWidth for parent flex
  return (
    <div className="bb-relative bb-flex-shrink bb-flex" style={{ maxWidth: '40%' }}>
      <button
        onClick={() => setVisible(true)}
        type="button"
        className="bb-min-w-0 bb-flex bb-items-center bb--ml-px bb-rounded-r-md bb-border bb-border-gray-300 bb-px-3 bb-py-2 bb-bg-white bb-text-base bb-leading-6 sm:bb-text-sm sm:bb-leading-5 bb-font-normal bb-text-gray-500 hover:bb-text-gray-700 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-50 active:bb-text-gray-800 bb-transition bb-ease-in-out bb-duration-150"
        id="location-menu"
        aria-haspopup="true"
        aria-expanded={visible}
      >
        <span className="bb-flex-auto bb-truncate bb-min-w-0">{currentRefinement ? currentRefinement.split('>').reverse().join(', ') : 'Anywhere'}</span>
        <svg
          className="bb-flex-none bb--mr-1 bb-ml-2 bb-h-4 bb-w-4 bb-text-gray-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="bb-z-10 bb-origin-top-right bb-absolute bb-right-0 bb-top-full bb-mt-2 bb-w-56 bb-rounded-md bb-shadow-lg"
            >
              <OutsideClickHandler onOutsideClick={() => setVisible(false)}>
                <div
                  className="bb-rounded-md bb-bg-white bb-shadow-xs"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="location-menu"
                  aria-hidden={!visible}
                >
                  <div className="bb-px-4 bb-py-3">
                    <button
                      className="bb-block bb-appearance-none"
                      onClick={() => {
                        refine('');
                        setVisible(false);
                      }}
                    >
                      Anywhere
                    </button>

                    {items &&
                      items.map((country) => (
                        <div key={country.label}>
                          <button className="bb-block bb-appearance-none" onClick={() => refine(country.value)}>
                            {country.label}
                          </button>
                          {country.items &&
                            country.items.map((region) => (
                              <div key={region.label}>
                                <button className="bb-block bb-appearance-none" onClick={() => refine(region.value)}>
                                  {region.label}
                                </button>
                                {region.items &&
                                  region.items.map((city) => (
                                    <div key={city.label}>
                                      <button className="bb-block bb-appearance-none" onClick={() => refine(city.value)}>
                                        {city.label}
                                      </button>
                                    </div>
                                  ))}
                              </div>
                            ))}
                        </div>
                      ))}
                  </div>
                </div>
              </OutsideClickHandler>
            </animated.div>
          )
      )}
    </div>
  );
});

const ConnectedLocationSelector = connectHierarchicalMenu(LocationSelectorBase);
const LocationSelector = () => (
  <ConnectedLocationSelector
    limit={15}
    showMoreLimit={100}
    showMore={true}
    showParentLevel={false}
    attributes={['address.lvl0', 'address.lvl1', 'address.lvl2']}
  />
);

export default LocationSelector;
