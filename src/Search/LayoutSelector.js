import { useSearch } from '../Search';
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
          value="gallery"
          type="button"
          className={classNames(searchState.layout == 'gallery' ? 'bb-bg-blue-50' : 'bb-bg-white', buttonClass, 'bb-rounded-l-md')}
          aria-label="Gallery"
        >
          <svg className="bb-h-5 bb-w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </button>
        <button
          onClick={onClick}
          value="card"
          type="button"
          className={classNames(searchState.layout == 'card' ? 'bb-bg-blue-50' : 'bb-bg-white', buttonClass, 'bb--ml-px')}
          aria-label="Card"
        >
          <svg className="bb-h-5 bb-w-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        </button>
        <button
          onClick={onClick}
          value="list"
          type="button"
          className={classNames(searchState.layout == 'list' ? 'bb-bg-blue-50' : 'bb-bg-white', buttonClass, 'bb--ml-px')}
          aria-label="List"
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
        <button
          onClick={onClick}
          value="map"
          type="button"
          className={classNames(searchState.layout == 'map' ? 'bb-bg-blue-50' : 'bb-bg-white', buttonClass, 'bb--ml-px', 'bb-rounded-r-md')}
          aria-label="Map"
        >
          <svg
            className="bb-h-5 bb-w-5"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="map-marked-alt"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z"
            />
          </svg>
        </button>
      </span>

      {searchState.layout == 'gallery' && (
        <button
          onClick={onClick}
          value="card"
          type="button"
          className="md:bb-hidden bb-relative bb-inline-flex bb-items-center bb-px-2 bb-py-2 bb-rounded-md bb-border bb-border-gray-300 bb-bg-white bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150"
          aria-label="Card"
        >
          <svg className="bb-h-6 bb-w-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      {searchState.layout == 'card' && (
        <button
          onClick={onClick}
          value="list"
          type="button"
          className="md:bb-hidden bb-relative bb-inline-flex bb-items-center bb-px-2 bb-py-2 bb-rounded-md bb-border bb-border-gray-300 bb-bg-white bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150"
          aria-label="List"
        >
          <svg className="bb-h-6 bb-w-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
          </svg>
        </button>
      )}
      {searchState.layout == 'list' && (
        <button
          onClick={onClick}
          value="map"
          type="button"
          className="md:bb-hidden bb-relative bb-inline-flex bb-items-center bb-px-2 bb-py-2 bb-rounded-md bb-border bb-border-gray-300 bb-bg-white bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150"
          aria-label="Map"
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
      {searchState.layout == 'map' && (
        <button
          onClick={onClick}
          value="gallery"
          type="button"
          className="md:bb-hidden bb-relative bb-inline-flex bb-items-center bb-px-2 bb-py-2 bb-rounded-md bb-border bb-border-gray-300 bb-bg-white bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150"
          aria-label="Gallery"
        >
          <svg
            className="bb-h-6 bb-w-6"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="map-marked-alt"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 576 512"
          >
            <path
              fill="currentColor"
              d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default memo(LayoutSelector);
