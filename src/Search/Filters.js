import { connectRefinementList } from 'react-instantsearch-dom';
import classNames from 'classnames';
import React, { memo, useState } from 'react';

function RefinementListBase({
  title,
  attribute,
  items,
  currentRefinement,
  refine,
  isFromSearch,
  searchForItems,
  createURL,
  showMore,
  limit,
  showMoreLimit,
  ...rest
}) {
  // console.log(items, rest, isFromSearch, searchForItems);
  const [moreVisible, setMoreVisible] = useState(false);

  return (
    <div className="bb-flex-auto bb-px-1 bb-mr-1 bb-mb-1">
      <h3 className="bb-text-base bb-font-semibold bb-text-gray-800 bb-my-1">{title}</h3>
      <input className="bb-form-input" type="search" onChange={(event) => searchForItems(event.currentTarget.value)} />

      <ul className="">
        {items.slice(0, showMore && !moreVisible ? limit : showMoreLimit).map((item, index) => (
          <li key={item.label} className="bb-block bb-mb-1">
            <button
              type="button"
              value={item.value}
              type="button"
              onClick={() => refine(item.value)}
              className={classNames(
                item.isRefined ? 'bb-text-blue-700 bb-bg-blue-100' : 'bb-text-gray-700 bb-bg-gray-100',
                'bb-w-full bb-flex bb-items-center bb-pl-1.5 bb-pr-0.5 bb-py-0.5 bb-border bb-border-transparent bb-text-sm bb-leading-4 bb-font-medium bb-rounded-md focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue hover:bb-bg-blue-50 active:bb-bg-blue-200 bb-transition bb-ease-in-out bb-duration-150'
              )}
            >
              {item.isRefined ? (
                <svg className="bb-flex-none bb-w-4 bb-h-4 bb-mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="bb-flex-none bb-w-4 bb-h-4 bb-mr-1 bb-text-gray-50" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx={12} cy={12} r={9} />
                </svg>
              )}
              <span className="bb-flex-auto bb-truncate bb-text-left">{item.label}</span>
              <span
                className={classNames(
                  item.isRefined ? 'bb-bg-blue-300 bb-text-blue-800' : 'bb-bg-gray-300 bb-text-gray-800',
                  'bb-flex-none bb-ml-1.5 bb-px-1 bb-py-0.5 bb-rounded-md bb-text-xs bb-font-medium bb-leading-4'
                )}
              >
                {item.count}
              </span>
            </button>
          </li>
        ))}
        {showMore && items.length > limit && !moreVisible && (
          <li className="bb-inline-flex bb-mr-1 bb-mb-1">
            <button
              onClick={() => setMoreVisible(true)}
              className="bb-text-gray-700 bb-bg-gray-100 bb-inline-flex bb-items-center bb-p-1 bb-border bb-border-transparent bb-text-sm bb-leading-4 bb-font-medium bb-rounded-md focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue hover:bb-bg-blue-50 active:bb-bg-blue-200 bb-transition bb-ease-in-out bb-duration-150"
            >
              <svg className="bb-w-4 bb-h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </li>
        )}
        {showMore && items.length > limit && moreVisible && (
          <li className="bb-inline-flex bb-mr-1 bb-mb-1">
            <button
              onClick={() => setMoreVisible(false)}
              className="bb-text-blue-700 bb-bg-blue-100 bb-inline-flex bb-items-center bb-p-1 bb-border bb-border-transparent bb-text-sm bb-leading-4 bb-font-medium bb-rounded-md focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue hover:bb-bg-blue-50 active:bb-bg-blue-200 bb-transition bb-ease-in-out bb-duration-150"
            >
              <svg className="bb-w-4 bb-h-4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} viewBox="0 0 24 24" stroke="currentColor">
                <path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

const RefinementList = connectRefinementList(memo(RefinementListBase));

export default function Filters() {
  return (
    <div className="bb-bg-white bb-pl-1 bb-pt-1 bb-mt-4">
      <RefinementList title="Availability" attribute="availability" />
      <RefinementList title="Condition" attribute="specifications.condition" />
      <RefinementList title="Category" attribute="specifications.category" />
      <RefinementList title="Classification" attribute="specifications.classification" />
      <RefinementList title="Model" attribute="specifications.model" limit={10} showMore showMoreLimit={50} />
      <RefinementList title="Manufacturer" attribute="specifications.manufacturer" />
    </div>
  );
}
