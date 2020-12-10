import React from 'react';
import { useUID } from 'react-uid';
import classNames from 'classnames';

function Textarea({ inputRef, id, className, error, compact, label, message, ...props }) {
  const htmlId = id || useUID();

  return (
    <div className={className}>
      <label htmlFor={htmlId} className={compact ? 'bb-sr-only' : 'bb-block bb-mb-1 bb-text-sm bb-font-medium bb-leading-5 bb-text-gray-700'}>
        {label}
      </label>
      <div className="bb-flex bb-relative bb-rounded-md bb-shadow-sm">
        <textarea
          ref={inputRef}
          id={htmlId}
          className={classNames(
            'bb-rounded-md bb-border-gray-300 bb-block bb-w-full bb-transition bb-duration-150 bb-ease-in-out sm:bb-text-sm sm:bb-leading-5 focus:bb-ring',
            error && 'bb-pr-10 bb-border-red-300 bb-text-red-900 bb-placeholder-red-300 focus:bb-border-red-300 focus:bb-ring-red-300'
          )}
          {...props}
        />
        {error && (
          <div className="bb-absolute bb-inset-y-0 bb-right-0 bb-pr-3 bb-flex bb-items-center bb-pointer-events-none">
            <svg className="bb-h-5 bb-w-5 bb-text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        )}
      </div>

      {error && <p className="bb-mt-2 bb-text-sm bb-text-red-600">{error.message}</p>}
    </div>
  );
}

export default Textarea;
