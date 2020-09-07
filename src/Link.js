import React from 'react';
import PropTypes from 'prop-types';

import { useBoaterBase } from './BoaterBase';
/** Convert a url string to a url object */
function normalizeUrl(url) {
  return typeof url === 'string' ? { pathname: url } : url;
}

/** Create a Link for routing BoaterBase paths */
function Link({ to, children, ...props }) {
  const { linker } = useBoaterBase();
  const onClick = (event) => {
    event.preventDefault();
    linker.changeUrl(normalizeUrl(to));
  };

  return (
    <a {...props} href={linker.createUrl(normalizeUrl(to))} onClick={onClick}>
      {children}
    </a>
  );
}

Link.propTypes = {
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string,
      query: PropTypes.object,
    }),
  ]),
};
export default Link;
