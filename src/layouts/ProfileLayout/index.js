import React from 'react';
import getProfileByHandle from '../../data/getProfileByHandle';
import Suspend from '../../data/Suspend';
import ContactSection from '../../sections/ContactSection';
import Share from '../../parts/Share';
import { Image, Transformation, Placeholder } from 'cloudinary-react';

function Profile({ Head = () => null, profileResource }) {
  const profile = profileResource.read();

  return (
    <div className="bb-grid bb-grid-cols-4 bb-gap-3">
      <Head>
        <title>{profile.name}</title>
      </Head>
      <div className="bb-col-span-3 bb-space-y-2">
        {profile.header && (
          <div className="bb-relative bb-rounded-md bb-shadow">
            <svg viewBox="0 0 21 9" className="bb-block bb-w-full bb-invisible"></svg>
            <a href={profile.header} target="_preview">
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
      </div>

      <div className="bb-col-span-1 bb-space-y-2">
        <ContactSection profileId={profile.id} />
        <Share pathname={`/profiles/${profile.handle}`} title={profile.name} summary={profile.summary} />
      </div>
    </div>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

export default function ProfileLayout({ handle, loading, Head }) {
  // If the server is rendering a loading page it can tell us to show a loading state and we exit early without triggering resource request
  if (loading) return <Loading />;

  // Start data request early so Suspend can use it for ssr fallback
  const profileResource = getProfileByHandle(handle);

  return (
    <Suspend resources={profileResource} fallback={<Loading />}>
      <Profile Head={Head} profileResource={profileResource} />
    </Suspend>
  );
}
