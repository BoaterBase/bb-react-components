import React from 'react';
import Suspend from '../../data/Suspend';
import getProfile from '../../data/getProfile';
import { Image, Transformation } from 'cloudinary-react';
import classNames from 'classnames';

function Section({ profileResource, contactResource, Head, sendMessage }) {
  const profile = profileResource && profileResource.read();
  const contact = contactResource && contactResource.read();

  return (
    <section className="bb-flex bb-flex-col bb-text-center bb-bg-white bb-rounded-lg bb-shadow">
      {contact?.avatar && profile?.avatar && (
        <div className="bb-p-4 bb-border-b bb-border-gray-100 bb-rounded-t-lg bb-bg-white bb-flex bb-justify-center">
          <Image className="bb-max-w-full bb-max-h-12" publicId={profile.avatar.id}>
            <Transformation width="600" />
          </Image>
        </div>
      )}
      <div className="bb-flex-1 bb-flex bb-flex-col bb-p-8 bb-items-center">
        {(contact?.avatar?.id || profile?.avatar?.id) && (
          <Image className="bb-w-32 bb-h-32 bb-flex-shrink-0 bb-mx-auto bb-bg-black bb-rounded-full" publicId={contact?.avatar?.id || profile.avatar.id}>
            <Transformation width="300" height="300" gravity="face" crop="thumb" />
          </Image>
        )}

        <h3 className="bb-mt-6 bb-text-gray-900 bb-text-base bb-leading-5 bb-font-medium">
          {profile && contact && contact.name}
          {profile && !contact && profile.name}
        </h3>
        {profile && contact && <h4 className="bb-text-gray-400 bb-mt-1 bb-text-xl bb-leading-5 bb-font-light">{profile.name || profile.handle}</h4>}
      </div>
      <div className="bb-border-t bb-border-gray-100 bb-bg-gradient-to-b bb-from-white bb-via-white bb-to-blue-50 bb-rounded-b">
        <div className="bb--mt-px bb-flex">
          <div className={classNames('bb-w-0 bb-flex-1 bb-flex bb-border-gray-100', (profile?.telephone || contact?.telephone) && 'bb-border-r')}>
            <button
              type="button"
              onClick={() => {
                sendMessage && sendMessage();
              }}
              className="bb-relative bb--mr-px bb-w-0 bb-flex-1 bb-inline-flex bb-items-center bb-justify-center bb-py-4 bb-text-sm bb-leading-5 bb-text-gray-700 bb-font-medium bb-border bb-border-transparent bb-rounded-bl-lg hover:bb-text-gray-500 focus:bb-outline-none focus:bb-shadow-outline-blue focus:bb-border-blue-300 focus:bb-z-10 bb-transition bb-ease-in-out bb-duration-150"
            >
              <svg className="bb-w-5 bb-h-5 bb-text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="bb-ml-3">Message</span>
            </button>
          </div>

          {(profile?.telephone || contact?.telephone) && (
            <div className="bb--ml-px bb-w-0 bb-flex-1 bb-flex">
              <a
                href={`tel:${contact?.telephone || profile?.telephone}`}
                className="bb-relative bb-w-0 bb-flex-1 bb-inline-flex bb-items-center bb-justify-center bb-py-4 bb-text-sm bb-leading-5 bb-text-gray-700 bb-font-medium bb-border bb-border-transparent bb-rounded-br-lg hover:bb-text-gray-500 focus:bb-outline-none focus:bb-shadow-outline-blue focus:bb-border-blue-300 focus:bb-z-10 bb-transition bb-ease-in-out bb-duration-150"
              >
                <svg className="bb-w-5 bb-h-5 bb-text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="bb-ml-3">Call</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Loading() {
  return <section className="bb-animate-pulse bb-h-60 bb-bg-gray-400 bb-rounded"></section>;
}

export default function ContactSection({ profileId, contactId, Head, loading, sendMessage }) {
  // If the server is rendering a loading page it can tell us to show a loading state and we exit early without triggering resource request
  if (loading) return <Loading />;

  // Start data request early so Suspend can use it for ssr fallback
  const profileResource = profileId && getProfile(profileId);
  const contactResource = contactId && getProfile(contactId);

  return (
    <Suspend resources={[profileResource, contactResource]} fallback={<Loading />}>
      <Section Head={Head} profileResource={profileResource} contactResource={contactResource} sendMessage={sendMessage} />
    </Suspend>
  );
}
