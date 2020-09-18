import React from 'react';

export default function ListingLoading({ Head = () => null }) {
  return (
    <div className="bb-space-y-3">
      <Head>
        <title>Loading Listing...</title>
      </Head>
      <div className="bb-animate-pulse bb-bg-gray-400 bb-rounded">
        <svg viewBox="0 0 16 9" className="bb-block bb-w-full bb-invisible"></svg>
      </div>
      <div className="bb-animate-pulse bb-h-8 bb-bg-gray-400 bb-rounded"></div>
      <div className="bb-space-y-2">
        <div className="bb-animate-pulse bb-h-4 bb-bg-gray-400 bb-rounded bb-w-5/6"></div>
        <div className="bb-animate-pulse bb-h-4 bb-bg-gray-400 bb-rounded bb-w-3/6"></div>
        <div className="bb-animate-pulse bb-h-4 bb-bg-gray-400 bb-rounded bb-w-4/6"></div>
        <div className="bb-animate-pulse bb-h-4 bb-bg-gray-400 bb-rounded bb-w-2/6"></div>
      </div>
    </div>
  );
}
