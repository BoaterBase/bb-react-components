import React from 'react';
import Suspend from '../../data/Suspend';
import getProfile from '../../data/getProfile';

function Section({ profileResource, contactResource, Head }) {
  const profile = profileResource.read();
  return (
    <section>
      <h3>{profile.name || profile.handle}</h3>
    </section>
  );
}

function Loader() {
  return <section className="bb-animate-pulse bb-h-60 bb-bg-gray-400 bb-rounded"></section>;
}

export default function ContactSection({ profileId, contactId, Head }) {
  // Start data request early so Suspend can use it for ssr fallback
  const profileResource = getProfile(profileId);
  const contactResource = getProfile(contactId);

  return (
    <Suspend resources={[profileResource, contactResource]} fallback={<Loader />}>
      <Section Head={Head} profileResource={profileResource} contactResource={contactResource} />
    </Suspend>
  );
}
