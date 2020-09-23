import React from 'react';

export default function Plus({ className, ...props }) {
  return (
    <svg {...props} className={className || 'bb-w-6 bb-h-6'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
    </svg>
  );
}
