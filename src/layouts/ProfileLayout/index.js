import React, { useEffect } from 'react';
import getProfileByHandle from '../../data/getProfileByHandle';
import trackHit from '../../utils/trackHit';
import trackEvent from '../../utils/trackEvent';

import createProfileMessage from '../../data/createProfileMessage';
import { useModal } from '../../Modal';
import { useAlerts } from '../../Alerts';
import Suspend from '../../data/Suspend';
import ContactSection from '../../sections/ContactSection';
import Share from '../../parts/Share';
import { Image, Transformation, Placeholder } from 'cloudinary-react';
import ListingsSection from '../../sections/ListingsSection';
import ProfileUpdatesSection from '../../sections/ProfileUpdatesSection';
import Link from '../../Link';
import Version from '../../Version';
import MessageForm from '../../forms/MessageForm';
import Content from '../../parts/Content';

function Profile({ Head = () => null, profileResource, onEvent }) {
  const setModal = useModal();
  const createAlert = useAlerts();

  const profile = profileResource.read();

  const profileId = profile.teamProfileId || profile.id;
  const contactId = profile.teamProfileId && profile.id;

  async function createMessage(data) {
    try {
      await createProfileMessage(profile.id, data);
      createAlert('Message Sent!', 'success');
      setModal(null);
      trackEvent([], 'Message', 'Sent', `/profiles/${profile.handle}`);
      onEvent && onEvent({ category: 'Message', action: 'Sent', label: `/profiles/${profile.handle}` });
    } catch (err) {
      createAlert('Error sending message!', 'error');
      console.error(err);
    }
  }

  function sendMessage() {
    setModal(<MessageForm onSubmit={createMessage} className="bb-bg-white bb-shadow-2xl bb-rounded-lg bb-p-4 bb-w-full sm:bb-w-5/6 md:bb-w-1/2" />);

    trackEvent([], 'Message', 'Click', `/profiles/${profile.handle}`);
    onEvent && onEvent({ category: 'Message', action: 'Click', label: `/profiles/${profile.handle}` });
  }

  return (
    <div className="bb-grid bb-grid-cols-4 bb-gap-3">
      <Head>
        <title>{profile.name}</title>
      </Head>
      <div className="bb-col-span-4 md:bb-col-span-3 bb-space-y-2">
        {profile.header && (
          <div className="bb-relative bb-rounded-md bb-shadow">
            <svg viewBox="0 0 21 9" className="bb-block bb-w-full bb-invisible"></svg>
            <a href={profile.header.original} target="_preview">
              <Image
                className="bb-rounded-md bb-absolute bb-w-full bb-h-full bb-bg-gray-400 bb-inset-0 bb-object-cover"
                publicId={profile.header.id}
                dpr="auto"
                responsive
                width="auto"
                responsiveUseBreakpoints="true"
              >
                <Placeholder type="blur" />
                <Transformation quality="auto" fetchFormat="auto" />
              </Image>
            </a>
          </div>
        )}
        <div>
          <h1 className="bb-text-3xl bb-font-semibold bb-text-gray-800 bb-leading-9">{profile.name}</h1>
          <p className="bb-mt-2 bb-font-serif bb-text-xl bb-font-medium bb-text-gray-500 bb-italic">{profile.summary}</p>
        </div>

        <ListingsSection
          title={
            <div className="bb-flex bb-justify-between bb-items-end bb-my-2">
              <h2 className="bb-text-xl bb-font-bold bb-text-gray-700">Listings</h2>
              <Link
                to={{
                  pathname: '/listings',
                  query: {
                    configure: { filters: profile.business ? `business.id:${profile.id}` : `profile.id:${profile.id}` },
                  },
                }}
                className="bb-font-medium bb-text-blue-500"
              >
                Show All →
              </Link>
            </div>
          }
          searchState={{
            layout: 'gallery',
            configure: { filters: profile.business ? `business.id:${profile.id}` : `profile.id:${profile.id}`, hitsPerPage: 6 },
            sortBy: 'Listings',
          }}
        />

        <div>
          <Content items={profile.content} className="bb-mt-2" />
        </div>

        <div>
          <h2 className="bb-mt-4 bb-mb-4 bb-text-3xl bb-font-semibold bb-text-gray-800">Updates</h2>
          <ProfileUpdatesSection id={profile.id} slug={profile.handle} limit={6} />
        </div>
      </div>

      <div className="bb-col-span-4 md:bb-col-span-1 bb-space-y-2">
        <ContactSection profileId={profileId} contactId={contactId} sendMessage={sendMessage} />
        <Share pathname={`/profiles/${profile.handle}`} title={profile.name} summary={profile.summary} />
        <div className="bb-text-center bb-mt-3">
          <Version />
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

export default function ProfileLayout({ handle, loading, Head, onReady, onEvent }) {
  // If the server is rendering a loading page it can tell us to show a loading state and we exit early without triggering resource request
  if (loading) return <Loading />;

  // Start data request early so Suspend can use it for ssr fallback
  const profileResource = getProfileByHandle(handle);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const profile = await profileResource.get();

        // TODO - use parent profile / group trackers if available
        //const profile = await getProfile(listing.profileId).get();
        //const contact = await getProfile(listing.contactId).get();

        await trackHit([], `/profiles/${profile.handle || profile.id}`, profile.name || profile.handle || profile.id);
        onReady && onReady({ profile });
      } catch (err) {
        console.error(err);
      }
    }, 100);
  }, [profileResource]);

  return (
    <Suspend resources={profileResource} fallback={<Loading />}>
      <Profile Head={Head} profileResource={profileResource} />
    </Suspend>
  );
}
