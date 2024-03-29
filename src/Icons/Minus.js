import React from 'react';

export default function Minus({ className, ...props }) {
  return (
    <svg {...props} className={className || 'bb-w-6 bb-h-6'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />{' '}
    </svg>
  );
}
