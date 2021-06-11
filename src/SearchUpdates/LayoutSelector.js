import { useSearch } from '../SearchUpdates';
import React, { memo } from 'react';
import classNames from 'classnames';

function LayoutSelector() {
  const [searchState, setSearchState] = useSearch();
  const onClick = (event) => {
    setSearchState({ ...searchState, layout: event.currentTarget.value });
  };

  const buttonClass =
    'bb-relative bb-inline-flex bb-items-center bb-px-2 bb-py-2 bb-border bb-border-gray-300 bb-bg-white bb-text-sm bb-leading-5 bb-font-medium bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150';

  return (
    <div>
      <span className="bb-hidden md:bb-inline-flex bb-relative bb-z-0 bb-shadow-sm">
        <button
          onClick={onClick}
          value="list"
          type="button"
          className={classNames(searchState.layout == 'list' ? 'bb-bg-blue-50' : 'bb-bg-white', buttonClass, 'bb-rounded-l-md')}
          aria-label="List"
        >
          <svg className="bb-h-5 bb-w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        </button>
        <button
          onClick={onClick}
          value="compact"
          type="button"
          className={classNames(searchState.layout == 'compact' ? 'bb-bg-blue-50' : 'bb-bg-white', buttonClass, 'bb--ml-px', 'bb-rounded-r-md')}
          aria-label="Compact"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="th-list"
            className="bb-h-5 bb-w-5"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"
            />
          </svg>
        </button>
      </span>

      {searchState.layout == 'list' && (
        <button
          onClick={onClick}
          value="compact"
          type="button"
          className="md:bb-hidden bb-relative bb-inline-flex bb-items-center bb-px-2 bb-py-2 bb-rounded-md bb-border bb-border-gray-300 bb-bg-white bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150"
          aria-label="Compact"
        >
          <svg className="bb-h-6 bb-w-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        </button>
      )}

      {searchState.layout == 'compact' && (
        <button
          onClick={onClick}
          value="list"
          type="button"
          className="md:bb-hidden bb-relative bb-inline-flex bb-items-center bb-px-2 bb-py-2 bb-rounded-md bb-border bb-border-gray-300 bb-bg-white bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150"
          aria-label="List"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="th-list"
            className="bb-h-6 bb-w-6"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default memo(LayoutSelector);
