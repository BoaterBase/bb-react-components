import React from 'react';
import { memo } from 'react';
import { useTransition, animated, config } from 'react-spring';
import { useSearch } from '../Search';

import Item from './Item';
export default memo(function Hit({ data }) {
  const [searchState, setSearchState] = useSearch();

  const trans = useTransition(searchState.layout, (p) => p, {
    from: { opacity: 0, transform: 'translateZ(-100px)', position: 'absolute' },
    enter: { opacity: 1, transform: 'translateZ(0px)', position: 'relative' },
    leave: { opacity: 0, transform: 'translateZ(-100px)', position: 'absolute' },
    config: config.stiff,
  });

  return (
    <div className="bb-relative" style={{ perspective: '300px' }}>
      {trans.map(({ item, props, key }) => (
        <animated.div key={key} style={props} className="bb-origin-top bb-w-full bb-relative">
          <Item key={data.objectId} data={data} layout={item} />
        </animated.div>
      ))}
    </div>
  );
});
