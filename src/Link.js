import React from 'react';
import PropTypes from 'prop-types';

import { useBoaterBase } from './BoaterBase';

/** Create a Link for routing BoaterBase paths */
function Link({ to, children, ...props }) {
  const { linker } = useBoaterBase();
  const onClick = (event) => {
    event.preventDefault();
    linker.changeUrl(top);
  };

  return (
    <a {...props} href={linker.createUrl(to)} onClick={onClick}>
      {children}
    </a>
  );
}

Link.propTypes = {
  to: PropTypes.oneOf([
    PropTypes.string,
    {
      pathname: PropTypes.string,
      query: PropTypes.object,
    },
  ]),
};
export default Link;
