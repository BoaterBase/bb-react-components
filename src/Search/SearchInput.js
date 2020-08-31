import React, { memo } from 'react';
import { connectSearchBox } from 'react-instantsearch-dom';

const SearchBox = memo(({ currentRefinement, refine, isSearchStalled }) => {
  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        refine(currentRefinement);
      }}
      role="search"
      className="bb-flex-auto bb-relative focus-within:bb-z-10"
    >
      <input
        autoFocus
        value={currentRefinement}
        onChange={(event) => refine(event.currentTarget.value)}
        type="search"
        className="bb-form-input bb-rounded-r-none bb-block bb-w-full bb-pl-10 bb-text-base bb-leading-6 sm:bb-text-sm md:bb-leading-5"
        placeholder="Search..."
      />
      {isSearchStalled ? (
        <span className="bb-cursor-wait bb-absolute bb-inset-y-0 bb-left-0 bb-px-2 bb-flex bb-items-center">
          <svg className="bb-animate-spin bb-h-5 bb-w-5 bb-text-gray-200" fill="none" viewBox="0 0 24 24">
            <circle className="bb-opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />{' '}
            <path
              className="bb-opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </span>
      ) : (
        <button
          type="submit"
          onClick={(event) => {
            event.preventDefault();
            refine(currentRefinement);
          }}
          className="bb-absolute bb-inset-y-0 bb-left-0 bb-px-2 bb-flex bb-items-center bb-bg-transparent bb-rounded-l-md focus:bb-outline-none focus:bb-shadow-outline-blue focus:bb-border-blue-300 hover:bb-cursor-pointer "
        >
          <svg
            className="bb-h-5 bb-w-5 bb-text-gray-400"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      )}
    </form>
  );
});

const ConnectedSearchBox = connectSearchBox(SearchBox);

export default ConnectedSearchBox;
