import { connectPagination, connectStats } from 'react-instantsearch-dom';
import classNames from 'classnames';
import React, { memo } from 'react';

function PaginationBase({ currentRefinement, nbPages, refine, createURL }) {
  const onPageClick = (index) => (event) => {
    event.preventDefault();
    refine(index);
  };
  return (
    <nav className="bb-relative bb-z-0 bb-inline-flex bb-shadow-sm">
      <a
        onClick={currentRefinement > 1 ? onPageClick(currentRefinement - 1) : undefined}
        href={currentRefinement > 1 ? createURL(currentRefinement - 1) : undefined}
        className={classNames(
          currentRefinement == 1 ? 'bb-bg-gray-100' : 'bb-bg-white',
          'bb-relative bb-inline-flex bb-items-center bb-px-2 bb-py-2 bb-rounded-l-md bb-border bb-border-gray-300 bb-text-sm bb-leading-5 bb-font-medium bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150'
        )}
        aria-label="Previous"
      >
        <svg className="bb-h-5 bb-w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      {Array(nbPages)
        .fill(null)
        .map((_, index) => (
          <a
            key={index}
            onClick={onPageClick(index + 1)}
            href={createURL(index + 1)}
            className={classNames(
              index + 1 === currentRefinement ? 'bb-bg-blue-100' : 'bb-bg-white',
              'bb--ml-px bb-relative bb-inline-flex bb-items-center bb-px-4 bb-py-2 bb-border bb-border-gray-300 bb-text-sm bb-leading-5 bb-font-medium bb-text-gray-700 hover:bb-text-gray-500 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-700 bb-transition bb-ease-in-out bb-duration-150'
            )}
          >
            {index + 1}
          </a>
        ))}
      <a
        onClick={currentRefinement < nbPages ? onPageClick(currentRefinement + 1) : undefined}
        href={currentRefinement < nbPages ? createURL(currentRefinement + 1) : undefined}
        className={classNames(
          currentRefinement >= nbPages ? 'bb-bg-gray-100' : 'bb-bg-white',
          'bb--ml-px bb-relative bb-inline-flex bb-items-center bb-px-2 bb-py-2 bb-rounded-r-md bb-border bb-border-gray-300 bb-text-sm bb-leading-5 bb-font-medium bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150'
        )}
        aria-label="Next"
      >
        <svg className="bb-h-5 bb-w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </a>
    </nav>
  );
}

function StatsBase({ processingTimeMS, nbHits }) {
  return (
    <div className="bb-text-sm bb-text-gray-500">
      Found <b>{nbHits}</b> results in <b>{processingTimeMS}ms</b>
    </div>
  );
}

const Pagination = connectPagination(PaginationBase);
const Stats = connectStats(StatsBase);

const Paging = () => (
  <div className="bb-flex bb-justify-between bb-items-center">
    <Stats />
    <Pagination />
  </div>
);
export default Paging;
