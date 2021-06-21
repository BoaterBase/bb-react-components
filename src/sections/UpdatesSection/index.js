import React, { Fragment, useRef, useEffect, useState } from 'react';

import SearchUpdates from '../../SearchUpdates';
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
      <SearchUpdates state={searchState}>
        <div className="bb-mb-4">
          <Hits defaultProfileId={defaultProfileId} />
        </div>

        <VirtualSearchBox />
        <VirtualTags />
      </SearchUpdates>
    </section>
  );
}
