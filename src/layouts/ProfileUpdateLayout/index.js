import React, { useEffect } from 'react';
import Content from '../../parts/Content';
import trackHit from '../../utils/trackHit';
import Share from '../../parts/Share';
import Suspend from '../../data/Suspend';
import Version from '../../Version';
import Link from '../../Link';
import getProfileByHandle from '../../data/getProfileByHandle';
import getProfileUpdateByHandle from '../../data/getProfileUpdateByHandle';

function UpdateLoading() {
  return <div>Loading...</div>;
}

function ProfileUpdate({ Head = () => null, profileResource, updateResource }) {
  const profile = profileResource.read();
  const update = updateResource.read();

  return (
    <div className="bb-grid bb-grid-cols-4 bb-gap-3">
      <Head>
        <title>{update.title}</title>
      </Head>
      <div className="bb-col-span-4 md:bb-col-span-3">
        <h1 className="bb-text-3xl bb-font-semibold bb-text-gray-800 bb-leading-9">{update.title}</h1>
        <p className="bb-text-sm bb-leading-5 bb-text-gray-500">
          <time dateTime="2020-03-16">{new Date(update.created).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
        </p>
        <p className="bb-mt-2 bb-font-serif bb-text-xl bb-font-medium bb-text-gray-500 bb-italic">
          on{' '}
          <Link className="bb-underline" to={`/profiles/${profile.handle}`}>
            {profile.name}
          </Link>
        </p>
        <Content items={update.content} />
      </div>

      <div className="bb-col-span-4 md:bb-col-span-1">
        <Share pathname={`/profiles/${profile.handle}/updates/${update.slug}`} title={update.title} summary={update.summary} />
        <div className="bb-text-center bb-mt-3">
          <Version />
        </div>
      </div>
    </div>
  );
}

export default function ProfileUpdateLayout({ profileHandle, updateId, loading, Head, onReady }) {
  // If the server is rendering a loading page it can tell us to show a loading state and we exit early without triggering resource request
  if (loading) return <UpdateLoading />;

  // Start data request early so Suspend can use it for ssr fallback
  const profileResource = getProfileByHandle(profileHandle);
  const updateResource = getProfileUpdateByHandle(profileHandle, updateId);

  useEffect(() => {
    setTimeout(async () => {
      try {
        const profile = await profileResource.get();
        const update = await updateResource.get();

        // TODO - use parent profile / group trackers if available
        //const profile = await getProfile(listing.profileId).get();
        //const contact = await getProfile(listing.contactId).get();

        await trackHit([], `/profiles/${profile.handle}/updates/${update.slug}`, update.title);
        onReady && onReady({ profile, update });
      } catch (err) {
        console.error(err);
      }
    }, 100);
  }, [profileResource, updateResource]);

  return (
    <Suspend resources={[profileResource, updateResource]} fallback={<UpdateLoading />}>
      <ProfileUpdate Head={Head} profileResource={profileResource} updateResource={updateResource} />
    </Suspend>
  );
}
