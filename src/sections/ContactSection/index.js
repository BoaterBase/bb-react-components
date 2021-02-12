import React, { Fragment } from 'react';
import Suspend from '../../data/Suspend';
import getProfile from '../../data/getProfile';
import { Image, Transformation } from 'cloudinary-react';
import classNames from 'classnames';
import Link from '../../Link';

import Facebook from '../../icons/Facebook';
import Twitter from '../../icons/Twitter';
import Website from '../../icons/Website';

function Section({ profileResource, contactResource, Head = () => null, sendMessage }) {
  const profile = profileResource && profileResource.read();
  const contact = contactResource && contactResource.read();

  return (
    <section className="bb-text-center bb-bg-white bb-rounded-lg bb-shadow">
      {profile?.business && (
        <div className="bb-p-2 bb-pt-4">
          {profile?.avatar && (
            <Link className="hover:bb-underline" to={`/profiles/${profile.handle}`}>
              <Image className="bb-max-w-full bb-max-h-12 bb-m-auto" publicId={profile.avatar.id} transformation="small_image" />
            </Link>
          )}
          <h4 className="bb-text-gray-400 bb-mt-2 bb-text-lg bb-leading-none bb-font-light">
            <Link className="hover:bb-underline" to={`/profiles/${profile.handle}`}>
              {profile.name || profile.handle}
            </Link>
          </h4>
          <div>
            {profile.telephone && (
              <a className="bb-text-sm bb-text-blue-400 hover:bb-underline" href={`tel:${profile.telephone}`}>
                {profile.telephone}
              </a>
            )}
            {profile.telephone && profile.email && ' · '}
            {profile.email && (
              <a className="bb-text-sm bb-text-blue-400 hover:bb-underline" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            )}
          </div>

          <div className="bb-flex bb-items-center bb-justify-center">
            {profile.facebook && (
              <a href={`https://facebook.com/${profile.facebook}`} target="_blank" className="bb-p-1 bb-bg-gray-50 bb-rounded bb-m-1 bb-text-blue-300">
                <Facebook />
              </a>
            )}
            {profile.twitter && (
              <a href={`https://twitter.com/${profile.twitter}`} target="_blank" className="bb-p-1 bb-bg-gray-50 bb-rounded bb-m-1 bb-text-blue-300">
                <Twitter />
              </a>
            )}
            {profile.website && (
              <a href={profile.website} target="_blank" className="bb-p-1 bb-bg-gray-50 bb-rounded bb-m-1 bb-text-blue-300">
                <Website />
              </a>
            )}
          </div>
        </div>
      )}

      {(contact || (profile && !profile.business)) && (
        <div className="bb-p-8 bb-border-t bb-border-gray-200">
          {(contact?.avatar?.id || profile?.avatar?.id) && (
            <Link to={`/profiles/${contact ? contact.handle : profile.handle}`}>
              <Image className="bb-w-32 bb-h-32 bb-mx-auto bb-bg-black bb-rounded-full" publicId={contact?.avatar?.id || profile.avatar.id}>
                <Transformation width="300" height="300" gravity="face" crop="thumb" />
              </Image>
            </Link>
          )}

          <h3 className="bb-mt-6 bb-text-gray-900 bb-text-base bb-leading-5 bb-font-medium">
            <Link className="hover:bb-underline" to={`/profiles/${contact ? contact.handle : profile.handle}`}>
              {contact ? contact.name : profile.name}
            </Link>
          </h3>
          {contact ? (
            <Fragment>
              <div>
                {contact.telephone && (
                  <a className="bb-text-sm bb-text-blue-400 hover:bb-underline" href={`tel:${contact.telephone}`}>
                    {contact.telephone}
                  </a>
                )}
                {contact.telephone && contact.email && ' · '}
                {contact.email && (
                  <a className="bb-text-sm bb-text-blue-400 hover:bb-underline" href={`mailto:${contact.email}`}>
                    {contact.email}
                  </a>
                )}
              </div>
              <div className="bb-flex bb-items-center bb-justify-center">
                {contact.facebook && (
                  <a href={`https://facebook.com/${contact.facebook}`} target="_blank" className="bb-p-1 bb-bg-gray-50 bb-rounded bb-m-1 bb-text-blue-300">
                    <Facebook />
                  </a>
                )}
                {contact.twitter && (
                  <a href={`https://twitter.com/${contact.twitter}`} target="_blank" className="bb-p-1 bb-bg-gray-50 bb-rounded bb-m-1 bb-text-blue-300">
                    <Twitter />
                  </a>
                )}
                {contact.website && (
                  <a href={contact.website} target="_blank" className="bb-p-1 bb-bg-gray-50 bb-rounded bb-m-1 bb-text-blue-300">
                    <Website />
                  </a>
                )}
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <div>
                {profile.telephone && (
                  <a className="bb-text-sm bb-text-blue-400 hover:bb-underline" href={`tel:${profile.telephone}`}>
                    {profile.telephone}
                  </a>
                )}
                {profile.telephone && profile.email && ' · '}
                {profile.email && (
                  <a className="bb-text-sm bb-text-blue-400 hover:bb-underline" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                )}
              </div>

              <div className="bb-flex bb-items-center bb-justify-center">
                {profile.facebook && (
                  <a href={`https://facebook.com/${profile.facebook}`} target="_blank" className="bb-p-1 bb-bg-gray-50 bb-rounded bb-m-1 bb-text-blue-300">
                    <Facebook />
                  </a>
                )}
                {profile.twitter && (
                  <a href={`https://twitter.com/${profile.twitter}`} target="_blank" className="bb-p-1 bb-bg-gray-50 bb-rounded bb-m-1 bb-text-blue-300">
                    <Twitter />
                  </a>
                )}
                {profile.website && (
                  <a href={profile.website} target="_blank" className="bb-p-1 bb-bg-gray-50 bb-rounded bb-m-1 bb-text-blue-300">
                    <Website />
                  </a>
                )}
              </div>
            </Fragment>
          )}
        </div>
      )}

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
