import React from 'react';

export default function Twitter({ className, ...props }) {
  return (
    <svg
      {...props}
      className={className || 'bb-w-6 bb-h-6'}
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="twitter"
      role="img"
      fill="currentColor"
      viewBox="16 16 240 240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M68 45H167.744C172.715 45 176.744 49.0294 176.744 54V136.093C176.744 139.407 174.058 142.093 170.744 142.093H68V45Z"
        fill="white"
        fillOpacity="0.85"
      />
      <path d="M68 103.256H179.395C184.366 103.256 188.395 107.285 188.395 112.256V203C188.395 207.971 184.366 212 179.395 212H68V103.256Z" fill="white" />
      <rect x="122.372" y="60.5349" width="31.0698" height="31.0698" rx={4} fill="white" />
    </svg>
  );
}
