import React from 'react';
import { useBoaterBase } from './BoaterBase';

/**
 * Display the BoaterBase version number when correctly wrapped in the BoaterBase provider.
 */
const Version = () => {
  const { version } = useBoaterBase();
  return (
    <a href="https://www.boaterbase.com" className="bb-inline-flex bb-items-baseline bb-leading-none bb-opacity-75 hover:bb-opacity-100">
      <small className="bb-mr-0.5 bb-text-gray-400 bb-opacity-75" style={{ fontSize: '9px' }}>
        Powered by
      </small>
      <span className="bb-text-blue-500 bb-font-semibold">Boater</span>
      <span className="bb-text-orange-400 bb-font-semibold">Base</span>
      <small className="bb-ml-0.5 bb-text-gray-400 bb-opacity-75" style={{ fontSize: '7px' }}>
        𝗏{version || 'No Provider'}
      </small>
    </a>
  );
};

export default Version;
