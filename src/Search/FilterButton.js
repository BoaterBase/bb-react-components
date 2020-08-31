import React from 'react';
export default function FilterButton() {
  return (
    <button
      type="button"
      className="bb-inline-flex bb-items-center bb-px-2 bb-py-2 bb-rounded-md bb-border bb-border-gray-300 bb-bg-white bb-text-gray-500 hover:bb-text-gray-400 focus:bb-z-10 focus:bb-outline-none focus:bb-border-blue-300 focus:bb-shadow-outline-blue active:bb-bg-gray-100 active:bb-text-gray-500 bb-transition bb-ease-in-out bb-duration-150"
      aria-label="Search Filters"
    >
      <svg
        className="bb-h-6 bb-w-6 sm:bb-h-5 sm:bb-w-5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
      </svg>
    </button>
  );
}
