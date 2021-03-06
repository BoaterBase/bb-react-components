import React from 'react';
import { useUID } from 'react-uid';
import classNames from 'classnames';

function Input({ inputRef, id, className, error, compact, label, message, append, prepend, prefix, suffix, ...props }) {
  const htmlId = id || useUID();

  return (
    <div className={className}>
      <label htmlFor={htmlId} className={compact ? 'bb-sr-only' : 'bb-block bb-mb-1 bb-text-sm bb-font-medium bb-leading-5 bb-text-gray-700'}>
        {label}
      </label>
      <div className="bb-flex bb-items-stretch bb-rounded-md bb-shadow-sm">
        {prepend}
        <div className="bb-flex-auto bb-relative">
          <input
            ref={inputRef}
            id={htmlId}
            className={classNames(
              'bb-block bb-w-full sm:bb-text-sm sm:bb-leading-5 bb-rounded-md focus:bb-ring',
              append && 'bb-rounded-r-none',
              prepend && 'bb-rounded-l-none',
              error && 'bb-pr-10',
              error
                ? 'focus:bb-ring-red-300 bb-border-red-300 focus:bb-border-red-300 bb-text-red-900 bb-placeholder-red-300'
                : 'bb-border-gray-300 focus:bb-ring-blue-500'
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
        {append}
      </div>
      {error && <p className="bb-mt-2 bb-text-sm bb-text-red-600">{error.message}</p>}
    </div>
  );
}

export default Input;
