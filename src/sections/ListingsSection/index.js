import React, { Fragment, useRef, useEffect, useState } from 'react';

import Search from '../../Search';
import Hits from '../../Search/Hits';
import ChevronLeft from '../../icons/ChevronLeft';
import ChevronRight from '../../icons/ChevronRight';
import classNames from 'classnames';
import { useScroll, useThrottle, useTimeout } from 'react-use';

import { connectRefinementList, connectSearchBox, connectSortBy } from 'react-instantsearch-dom';

const VirtualRefinementList = connectRefinementList(() => null);
const VirtualSearchBox = connectSearchBox(() => null);
const VirtualSortBy = connectSortBy(() => null);

// TODO - Remove the grid from the hits component so we can memo outside of scroller

/** Move the scroll state changes outside of the hits render so we can throttle for performance */
function ScrollEdges({ scrollRef }) {
  const [[leftEdge, rightEdge], setEdges] = useState([false, false]);
  const { x: scrollX } = useScroll(scrollRef);

  // TODO - need to listen to content changes not just wait for initial update
  const [timeout] = useTimeout(1000);

  const throttledScrollX = useThrottle(scrollX, 500);
  useEffect(() => {
    if (scrollRef?.current?.scrollWidth && scrollRef?.current?.clientWidth) {
      setEdges([throttledScrollX > 0, throttledScrollX < scrollRef.current.scrollWidth - scrollRef.current.clientWidth]);
    }
  }, [scrollRef, scrollRef.current, throttledScrollX, timeout()]);

  return (
    <Fragment>
      <button
        onClick={() => {
          scrollRef.current.scrollTo({
            top: 0,
            left: scrollX - scrollRef.current.clientWidth,
            behavior: 'smooth',
          });
        }}
        style={{ background: 'radial-gradient(ellipse at left center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%)' }}
        className={classNames(
          'bb-absolute bb-top-0 bb-left-0 bb-h-full bb-text-gray-50 hover:bb-text-gray-600 bb-appearance-none focus:bb-outline-none bb-transition-opacity bb-delay-300',
          leftEdge ? 'bb-opacity-100' : 'bb-opacity-0 bb-pointer-events-none'
        )}
      >
        <ChevronLeft className="bb-w-6 bb-h-6 bb-relative bb-top-1/2" style={{ filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25))' }} />
      </button>

      <button
        onClick={() => {
          scrollRef.current.scrollTo({
            top: 0,
            left: scrollX + scrollRef.current.clientWidth,
            behavior: 'smooth',
          });
        }}
        style={{ background: 'radial-gradient(ellipse at right center, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0) 70%)' }}
        className={classNames(
          'bb-absolute bb-top-0 bb-right-0 bb-h-full bb-text-gray-50 hover:bb-text-gray-600 bb-appearance-none focus:bb-outline-none bb-transition-opacity bb-delay-300',
          rightEdge ? 'bb-opacity-100' : 'bb-opacity-0 bb-pointer-events-none'
        )}
      >
        <ChevronRight className="bb-w-6 bb-h-6 bb-relative bb-top-1/2" style={{ filter: 'drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25))' }} />
      </button>
    </Fragment>
  );
}

function HorizontalScroller({ children }) {
  const scrollRef = useRef(null);

  return (
    <div className="bb-relative">
      <div
        ref={scrollRef}
        className="bb-relative bb-w-full bb-overflow-x-auto bb-overflow-y-visible bb-py-2 bb--my-2 bb-flex bb-flex-no-wrap bb-space-x-3"
        style={{
          scrollSnapType: 'x proximity',
        }}
      >
        {children}
      </div>
      <ScrollEdges scrollRef={scrollRef} />
    </div>
  );
}
export default function ListingsSection({ className, searchState, title }) {
  return (
    <section className={className}>
      {title && <header>{title}</header>}
      <Search state={searchState}>
        <HorizontalScroller>
          <Hits hitClassName="bb-w-1/3 bb-flex-none" />
        </HorizontalScroller>
        <VirtualSearchBox />
        <VirtualSortBy
          defaultRefinement="Listings"
          items={[
            { value: 'Listings', label: 'Featured' },
            { value: 'ListingsLatest', label: 'Latest' },
          ]}
        />
        <VirtualRefinementList attribute="availability" />
        <VirtualRefinementList attribute="specifications.category" />
        <VirtualRefinementList attribute="specifications.classification" />
        <VirtualRefinementList attribute="specifications.model" />
        <VirtualRefinementList attribute="specifications.manufacturer" />
        <VirtualRefinementList attribute="business.name" />
      </Search>
    </section>
  );
}
