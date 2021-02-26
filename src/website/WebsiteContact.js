import React from 'react';
import Markdown from 'markdown-to-jsx';
import MessageForm from '../forms/MessageForm';
import { useAlerts } from '../Alerts';
import createProfileMessage from '../data/createProfileMessage';
import Email from '../icons/Email';
import Telephone from '../icons/Telephone';
import Facebook from '../icons/Facebook';
import Twitter from '../icons/Twitter';
import Linkedin from '../icons/Linkedin';
import Pinterest from '../icons/Pinterest';
import Instagram from '../icons/Instagram';
import Youtube from '../icons/Youtube';
import Location from '../icons/Location';
import MapGL from '../parts/MapGL';

/** Website Contact Section*/
function WebsiteContact({ profile, ...props }) {
  const createAlert = useAlerts();

  async function sendMessage(data) {
    try {
      await createProfileMessage(profile.id, data);
      createAlert('Message Sent!', 'success');
      //setModal(null);
      //trackEvent([], 'Message', 'Sent', `/profiles/${profile.handle}`);
      //onEvent && onEvent({ category: 'Message', action: 'Sent', label: `/profiles/${profile.handle}` });
    } catch (err) {
      createAlert('Error sending message!', 'error');
      console.error(err);
    }
  }

  const social = [];
  profile.facebook && social.push({ Icon: Facebook, link: 'https://facebook.com/' + profile.facebook });
  profile.twitter && social.push({ Icon: Twitter, link: 'https://twitter.com/' + profile.twitter });
  profile.linkedin && social.push({ Icon: Linkedin, link: 'https://linkedin.com/' + profile.linkedin });
  profile.pinterest && social.push({ Icon: Pinterest, link: 'https://pinterest.com/' + profile.pinterest });
  profile.instagram && social.push({ Icon: Instagram, link: 'https://instagram.com/' + profile.instagram });
  profile.youtube && social.push({ Icon: Youtube, link: 'https://youtube.com/' + profile.youtube });

  return (
    <div className="bb-max-w-7xl bb-mx-auto">
      <div className="lg:bb-grid lg:bb-grid-cols-5">
        <div className="bb-py-16 bb-px-4 sm:bb-px-6 lg:bb-col-span-2 lg:bb-px-8 lg:bb-py-24 xl:bb-pr-12">
          <Markdown
            options={{
              forceBlock: true,
              overrides: {
                h1: {
                  component: 'h2',
                  props: {
                    className: 'bb-text-2xl bb-font-extrabold bb-tracking-tight bb-text-gray-900 sm:bb-text-3xl',
                  },
                },
                p: {
                  component: 'p',
                  props: {
                    className: 'bb-mt-3 bb-text-lg bb-leading-6 bb-text-gray-500',
                  },
                },
              },
            }}
          >
            {profile.message || '# Contact'}
          </Markdown>
          {(profile.telephone || profile.email) && (
            <ul className="bb-mt-8 bb-text-blue-500 bb-space-y-2">
              {profile.telephone && (
                <li>
                  <a className="bb-flex bb-items-center hover:bb-underline hover:bb-text-blue-700" href={'tel:' + profile.telephone}>
                    <Email className="bb-w-5 bb-h-5 bb-mr-2 bb-opacity-80" /> {profile.telephone}
                  </a>
                </li>
              )}
              {profile.email && (
                <li>
                  <a className="bb-flex bb-items-center hover:bb-underline hover:bb-text-blue-700" href={'mailto:' + profile.email}>
                    <Telephone className="bb-w-5 bb-h-5 bb-mr-2 bb-opacity-80" /> {profile.email}
                  </a>
                </li>
              )}
            </ul>
          )}

          {!!social.length && (
            <ul className="bb-flex bb-flex-wrap bb-items-center bb-content-center bb-mt-4">
              {social.map((e, i) => (
                <li key={i}>
                  <a href={e.link} className="bb-flex bb-m-1 bb-p-2 bb-rounded-full bb-bg-gray-200 hover:bb-bg-gray-700 bb-text-blue-400">
                    <e.Icon className="bb-w-7 bb-h-7" />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="bb-py-16 bb-px-4 sm:bb-px-6 lg:bb-col-span-3 lg:bb-px-8 lg:bb-py-24 xl:bb-pr-12">
          <MessageForm heading={false} onSubmit={sendMessage} />
        </div>
      </div>

      {profile.location && profile.geo?.latitude && profile.geo?.longitude && (
        <div className="lg:bb-grid lg:bb-grid-cols-5">
          <div className="bb-py-16 bb-px-4 sm:bb-px-6 lg:bb-col-span-2 lg:bb-px-8 lg:bb-py-24 xl:bb-pr-12">
            <h2 className="bb-text-2xl bb-font-extrabold bb-text-gray-900 sm:bb-text-3xl">Location</h2>

            <div className="bb-mt-6 bb-text-base bb-text-gray-500 bb-flex bb-items-center">
              <Location className="bb-w-5 bb-h-5 bb-mr-2 bb-opacity-80" />

              {profile.location}
            </div>
          </div>
          <div className="bb-py-16 bb-px-4 sm:bb-px-6 lg:bb-col-span-3 lg:bb-px-8 lg:bb-py-24 xl:bb-pr-12">
            <div className="bb-relative bb-rounded-md bb-shadow-xl">
              <svg viewBox="0 0 4 3" className="bb-relative bb-block bb-w-full bb-rounded-md bb-bg-gradient-to-b bb-from-blue-500 bb-to-blue-400"></svg>

              <MapGL
                latitude={profile.geo.latitude}
                longitude={profile.geo.longitude}
                zoom={10}
                className="bb-absolute bb-top-0 bb-left-0 bb-w-full bb-h-full bb-rounded-md bb-overflow-hidden"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WebsiteContact;
