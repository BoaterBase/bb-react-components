import React, { Fragment, useRef, useEffect, useState } from 'react';

import Search from '../../SearchUpdates';
import Hits from '../../SearchUpdates/Hits';
import ChevronLeft from '../../icons/ChevronLeft';
import ChevronRight from '../../icons/ChevronRight';
import classNames from 'classnames';
import { useScroll, useThrottle, useTimeout } from 'react-use';

import { connectRefinementList, connectSearchBox, connectSortBy } from 'react-instantsearch-dom';
import { connectTag } from '../../Search/TagRefinement';

const VirtualRefinementList = connectRefinementList(() => null);
const VirtualSearchBox = connectSearchBox(() => null);
const VirtualSortBy = connectSortBy(() => null);
const VirtualTags = connectTag(() => null);

export default function UpdatesSection({ className, searchState, title, defaultProfileId }) {
  return (
    <section className={className}>
      {title && <header>{title}</header>}
      <Search state={searchState}>
        <div className="bb-grid bb-grid-cols-1 sm:bb-grid-cols-2 md:bb-grid-cols-3 bb-gap-2 sm:bb-gap-3 md:bb-gap-4">
          <Hits defaultProfileId={defaultProfileId} />
        </div>

        <VirtualSearchBox />
        <VirtualTags />
      </Search>
    </section>
  );
}
