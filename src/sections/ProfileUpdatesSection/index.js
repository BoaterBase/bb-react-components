import React from 'react';
import Suspend from '../../data/Suspend';
import getProfileUpdatesByHandle from '../../data/getProfileUpdatesByHandle';
//import getProfileUpdates from '../../data/getProfileUpdates';

import Updates from '../../parts/Updates';

function Section({ Head, resource, slug }) {
  return (
    <section>
      <Updates pathname={`/profiles/${slug}`} updates={resource.read()} />
    </section>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

export default function ProfileUpdatesSection({ id, slug, Head, loading, limit }) {
  // If the server is rendering a loading page it can tell us to show a loading state and we exit early without triggering resource request
  if (loading) return <Loading />;

  // Start data request early so Suspend can use it for ssr fallback
  //const resource = getProfileUpdates(id, limit);
  const resource = getProfileUpdatesByHandle(id, limit);
  return (
    <Suspend resources={resource} fallback={<Loading />}>
      <Section Head={Head} slug={slug} resource={resource} />
    </Suspend>
  );
}
