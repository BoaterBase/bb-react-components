import { connectHits } from 'react-instantsearch-dom';
import React, { memo } from 'react';
import { useSearch } from '../Search';
import Hit from '../Search/Hit';

const BaseHits = memo(
  ({ hits, hitClassName, hitSlider }) => {
    const [searchState] = useSearch();

    return hits.map((item) => (
      <div className={hitClassName} key={item.objectID} style={{ scrollSnapAlign: 'start' }}>
        <Hit className={hitClassName} data={item} />
      </div>
    ));
  },
  ({ hits: prevHits, ...prevProps }, { hits: nextHits, ...nextProps }) => {
    // BUG - By default Hits renders multiple times due to hits array mutating, so need to check for real changes or causes poor performance and breaks transitions
    // https://github.com/algolia/react-instantsearch/issues/1370

    // Standard shallow check for existing props
    for (let key in nextProps) {
      if (nextProps[key] !== prevProps[key]) return false;
    }

    // Check hits array for size or item changes
    if (prevHits.length !== nextHits.length) {
      return false;
    }

    for (let i = 0; i < nextHits.length; i++) {
      if (nextHits[i].objectID !== prevHits[i].objectID) {
        return false;
      }
    }

    return true;
  }
);

const Hits = connectHits(BaseHits);
export default Hits;
