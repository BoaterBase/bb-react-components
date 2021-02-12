import React from 'react';
import getProfileUpdatesByHandle from '../../data/getProfileUpdatesByHandle';
import Suspend from '../../data/Suspend';
//import getProfileUpdates from '../../data/getProfileUpdates';
import Updates from '../../parts/Updates';
import Link from '../../Link';

function Section({ Head, resource, slug }) {
  const updates = resource.read();
  return (
    !!updates.length && (
      <section>
        <div className="bb-flex bb-items-center">
          <h2 className="bb-mt-4 bb-mb-4 bb-text-3xl bb-font-semibold bb-text-gray-800">Logbook</h2>
          <Link to={`/profiles/${slug}/updates`} className="bb-text-blue-500 bb-font-semibold bb-ml-auto hover:bb-underline">
            Show All →
          </Link>
        </div>

        <Updates pathname={`/profiles/${slug}`} updates={updates} />
      </section>
    )
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
