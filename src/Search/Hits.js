import { connectHits } from 'react-instantsearch-dom';
import React, { memo } from 'react';
import { useSearch } from '../Search';
import Hit from '../Search/Hit';

const spacing = {
  // Auto flow
  list: 'bb-my-2 md:bb-my-3 lg:bb-my-4 bb-gap-2 md:bb-gap-3 lg:bb-gap-4',
  card: 'bb-my-2 md:bb-my-3 lg:bb-my-4 bb-gap-2 md:bb-gap-3 lg:bb-gap-4',
  gallery: 'bb-my-2 md:bb-my-3 lg:bb-my-4 bb-gap-2 md:bb-gap-3 lg:bb-gap-4',
  mini: 'bb-my-2 md:bb-my-3 lg:bb-my-4 bb-gap-2 md:bb-gap-3 lg:bb-gap-4',
};

const grids = [
  {
    // Auto flow
    list: 'bb-grid-cols-1',
    card: 'bb-grid-cols-1 md:bb-grid-cols-2 xl:bb-grid-cols-3',
    gallery: 'bb-grid-cols-1 md:bb-grid-cols-2',
    mini: 'bb-grid-cols-2 sm:bb-grid-cols-3 lg:bb-grid-cols-4',
  },
  {
    // 1
    list: 'bb-grid-cols-1',
    card: 'bb-grid-cols-1 md:bb-grid-cols-2 xl:bb-grid-cols-3',
    gallery: 'bb-grid-cols-1 md:bb-grid-cols-2',
    mini: 'bb-grid-cols-2 sm:bb-grid-cols-3 lg:bb-grid-cols-4',
  },
  {
    // 2
    list: 'bb-grid-cols-2 bb-w-2/1',
    card: 'bb-grid-cols-2 bb-w-2/1 md:bb-w-full',
    gallery: 'bb-grid-cols-2 bb-w-2/1 md:bb-w-full',
    mini: 'bb-grid-cols-2 bb-w-full',
  },
  {
    // 3
    list: 'bb-grid-cols-3 bb-w-3/1',
    card: 'bb-grid-cols-3 bb-w-3/1 md:bb-w-3/2 xl:bb-w-full',
    gallery: 'bb-grid-cols-3 bb-w-3/1 md:bb-w-3/2',
    mini: 'bb-grid-cols-3 bb-w-3/2 md:bb-w-full',
  },
  {
    // 4
    list: 'bb-grid-cols-4 bb-w-4/1',
    card: 'bb-grid-cols-4 bb-w-4/1 md:bb-w-4/2 xl:bb-w-4/3',
    gallery: 'bb-grid-cols-4 bb-w-4/1 md:bb-w-4/2',
    mini: 'bb-grid-cols-4 bb-w-4/2 md:bb-w-4/3 xl:bb-w-full',
  },
  {
    // 5
    list: 'bb-grid-cols-5 bb-w-5/1',
    card: 'bb-grid-cols-5 bb-w-5/1 md:bb-w-5/2 xl:bb-w-5/3',
    gallery: 'bb-grid-cols-5 bb-w-5/1 md:bb-w-5/2',
    mini: 'bb-grid-cols-5 bb-w-5/2 md:bb-w-5/3 xl:bb-w-5/4',
  },
  {
    // 6
    list: 'bb-grid-cols-6 bb-w-6/1',
    card: 'bb-grid-cols-6 bb-w-6/1 md:bb-w-6/2 xl:bb-w-6/3',
    gallery: 'bb-grid-cols-6 bb-w-6/1 md:bb-w-6/2',
    mini: 'bb-grid-cols-6 bb-w-6/2 md:bb-w-6/3 xl:bb-w-6/4',
  },
];

const BaseHits = memo(
  ({ hits, columns = 0, ...rest }) => {
    const [searchState] = useSearch();

    columns = Math.min(hits.length, columns);

    return (
      <div
        className={columns ? 'bb-overflow-x-scroll' : 'bb-overflow-x-visible'}
        style={{
          scrollSnapType: 'x proximity',
          background: `linear-gradient(0deg, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%)
                      ,linear-gradient(0deg, rgba(255,255,255,1) 100%, rgba(255,255,255,1) 100%)
                      ,linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 100%)
                      ,linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 50%, rgba(255,255,255,1) 100%)
                      ,linear-gradient(-90deg, rgba(0,0,0,0) 25%, rgba(0,0,0,0.1) 100%)
                      ,linear-gradient(90deg, rgba(0,0,0,0) 25%, rgba(0,0,0,0.1) 100%)`,
          backgroundSize: '1rem 100%, 1rem 100%, 1rem 100%, 1rem 100%, 0.75rem 100%, 0.75rem 100%',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'local, local, scroll, scroll, scroll, scroll',
          backgroundPosition: '0 0, right 0, 0 0, right 0, 0 0, right 0',
        }}
      >
        <div className={`${columns ? 'bb-grid bb-relative bb-pr-2' : 'bb-grid'} ${grids[columns][searchState.layout]} ${spacing[searchState.layout]}`}>
          {hits.map((item, index) => {
            return <Hit data={item} key={item.objectID} />;
          })}
        </div>
      </div>
    );
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
BaseHits.whyDidYouRender = { customName: 'BaseHits' };

const Hits = connectHits(BaseHits);
export default Hits;
