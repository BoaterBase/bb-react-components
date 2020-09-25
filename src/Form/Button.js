import React from 'react';
import classNames from 'classnames';

const colors = {
  light:
    'bb-border-gray-300 bb-text-gray-700 bb-bg-gray-50 hover:bb-text-gray-500 hover:bb-bg-white focus:bb-shadow-outline-blue focus:bb-border-blue-300 active:bb-bg-gray-100 active:bb-text-gray-700',
  gray: 'bb-text-gray-50 bb-bg-gray-600 hover:bb-bg-gray-500 focus:bb-border-gray-700 focus:bb-shadow-outline-gray ',
};

export default function Button({ color = 'light', children, appended, prepended, ...props }) {
  return (
    <span className={classNames('bb-flex', appended || prepended ? '' : 'bb-rounded-md bb-shadow-sm')}>
      <button
        {...props}
        className={classNames(
          'bb-inline-flex bb-justify-center bb-w-full bb-rounded-md bb-border bb-border-transparent bb-px-4 bb-py-2 bb-text-base bb-leading-6 bb-font-medium bb-shadow-sm focus:bb-outline-none bb-transition bb-ease-in-out bb-duration-150 sm:bb-text-sm sm:bb-leading-5',
          appended && 'bb--ml-px bb-rounded-l-none',
          prepended && 'bb--mr-px bb-rounded-r-none',
          colors[color] || colors.gray
        )}
      >
        {children}
      </button>
    </span>
  );
}
