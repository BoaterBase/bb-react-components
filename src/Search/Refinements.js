import { connectCurrentRefinements } from 'react-instantsearch-dom';
import classNames from 'classnames';
import React, { memo, useState } from 'react';

function Refinements({ items, refine, createUrl }) {
  //console.log(items);
  return (
    <div className="bb-mt-2">
      {items.map(({ value, attribute, label, items, currentRefinement }) => (
        <span key={attribute}>
          {!items && currentRefinement && (
            <button
              onClick={() => refine(value)}
              className="bb-inline-flex bb-items-center bb-rounded-full bb-bg-blue-100 hover:bb-bg-blue-200 bb-text-blue-500 bb-text-xs bb-pl-2 bb-mr-0.5 bb-mb-0.5"
            >
              {currentRefinement}
              <svg
                className="bb-w-3 bb-h-3 bb-mx-1"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          {items && (
            <span>
              {items.map(({ label, value }) => (
                <button
                  key={label}
                  onClick={() => refine(value)}
                  className="bb-inline-flex bb-items-center bb-rounded-full bb-bg-blue-100 hover:bb-bg-blue-200 bb-text-blue-500 bb-text-xs bb-pl-2 bb-mr-0.5 bb-mb-0.5"
                >
                  {label.split('::')[0]}
                  <svg
                    className="bb-w-3 bb-h-3 bb-mx-1"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              ))}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}

export default connectCurrentRefinements(Refinements);
