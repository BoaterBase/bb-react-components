import React, { useState } from 'react';
import { Image, Transformation } from 'cloudinary-react';
import { useAlerts } from '../Alerts';
import { useForm } from 'react-hook-form';
import Input from '../Form/Input';
import Textarea from '../Form/Textarea';

function SendMessage({ name, setOverlay, listingId }) {
  const { createAlert } = useAlerts();
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = async (data) => {
    try {
      await allListings().doc(listingId).messages().create(data);
      setOverlay(null);
      createAlert('Message sent!', 'success');
    } catch (err) {
      createAlert('There was an error!', 'error');
      console.error(err);
    }
  };

  return (
    <div className="bb-fixed bb-z-10 bb-inset-0 bb-overflow-y-auto">
      <div className="bb-flex bb-items-end bb-justify-center bb-min-h-screen bb-pt-4 bb-px-4 bb-pb-20 bb-text-center sm:bb-block sm:bb-p-0">
        {/*
Background overlay, show/hide based on modal state.

Entering: "ease-out duration-300"
  From: "opacity-0"
  To: "opacity-100"
Leaving: "ease-in duration-200"
  From: "opacity-100"
  To: "opacity-0"
    */}
        <div
          onClick={() => setOverlay(null)}
          className="bb-cursor-not-allowed bb-fixed bb-inset-0 bb-transition-opacity"
          style={{ backdropFilter: 'blur(5px)' }}
        >
          <div className="bb-absolute bb-inset-0 bb-bg-gray-500 bb-opacity-75" />
        </div>
        {/* This element is to trick the browser into centering the modal contents. */}
        <span className="bb-hidden sm:bb-inline-block sm:bb-align-middle sm:bb-h-screen" />​
        {/*
Modal panel, show/hide based on modal state.

Entering: "ease-out duration-300"
  From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
  To: "opacity-100 translate-y-0 sm:scale-100"
Leaving: "ease-in duration-200"
  From: "opacity-100 translate-y-0 sm:scale-100"
  To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bb-inline-block bb-align-bottom bb-bg-white bb-rounded-lg bb-px-4 bb-pt-5 bb-pb-4 bb-text-left bb-overflow-hidden bb-shadow-xl bb-transform bb-transition-all sm:bb-my-8 sm:bb-align-middle sm:bb-max-w-sm sm:bb-w-full sm:bb-p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <h1 className="bb-text-xl bb-font-medium">Send a message...</h1>
          {name && (
            <p className="bb-text-sm bb-text-gray-600">
              to <b>{name}</b>
            </p>
          )}
          <Input
            inputRef={register({ required: 'Please enter your name.' })}
            error={errors.name}
            name="name"
            compact
            label="Name"
            placeholder="Your Name"
            type="text"
            className="bb-mt-2"
          />

          <Input
            inputRef={register}
            error={errors.telephone}
            name="telephone"
            compact
            label="Telephone"
            placeholder="Telephone Number"
            type="telephone"
            className="bb-mt-2"
          />
          <Input
            inputRef={register({ required: 'Enter your email address.' })}
            error={errors.email}
            name="email"
            compact
            label="Email"
            placeholder="Email Address"
            type="email"
            className="bb-mt-2"
          />
          <Textarea
            inputRef={register({ required: 'A message is required.' })}
            error={errors.message}
            name="content"
            placeholder="Enter a message..."
            rows={3}
            className="bb-mt-2"
          />
          <div className="bb-mt-5 sm:bb-mt-6">
            <span className="bb-flex bb-w-full bb-rounded-md bb-shadow-sm">
              <button
                type="submit"
                className="bb-inline-flex bb-justify-center bb-w-full bb-rounded-md bb-border bb-border-transparent bb-px-4 bb-py-2 bb-bg-indigo-600 bb-text-base bb-leading-6 bb-font-medium bb-text-white bb-shadow-sm hover:bb-bg-indigo-500 focus:bb-outline-none focus:bb-border-indigo-700 focus:bb-shadow-outline-indigo bb-transition bb-ease-in-out bb-duration-150 sm:bb-text-sm sm:bb-leading-5"
              >
                Send Message
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

function Profile({ profile, contact, listingId }) {
  const [overlay, setOverlay] = useState();

  return (
    <div className="bb-flex bb-flex-col bb-text-center bb-bg-white bb-rounded-lg bb-shadow">
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
          <div className="bb-w-0 bb-flex-1 bb-flex bb-border-r bb-border-gray-100">
            <button
              type="button"
              onClick={() => setOverlay('message')}
              className="bb-relative bb--mr-px bb-w-0 bb-flex-1 bb-inline-flex bb-items-center bb-justify-center bb-py-4 bb-text-sm bb-leading-5 bb-text-gray-700 bb-font-medium bb-border bb-border-transparent bb-rounded-bl-lg hover:bb-text-gray-500 focus:bb-outline-none focus:bb-shadow-outline-blue focus:bb-border-blue-300 focus:bb-z-10 bb-transition bb-ease-in-out bb-duration-150"
            >
              <svg className="bb-w-5 bb-h-5 bb-text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span className="bb-ml-3">Message</span>
            </button>
          </div>
          <div className="bb--ml-px bb-w-0 bb-flex-1 bb-flex">
            <a
              href="#"
              className="bb-relative bb-w-0 bb-flex-1 bb-inline-flex bb-items-center bb-justify-center bb-py-4 bb-text-sm bb-leading-5 bb-text-gray-700 bb-font-medium bb-border bb-border-transparent bb-rounded-br-lg hover:bb-text-gray-500 focus:bb-outline-none focus:bb-shadow-outline-blue focus:bb-border-blue-300 focus:bb-z-10 bb-transition bb-ease-in-out bb-duration-150"
            >
              <svg className="bb-w-5 bb-h-5 bb-text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span className="bb-ml-3">Call</span>
            </a>
          </div>
        </div>
      </div>
      {overlay === 'message' && <SendMessage name={contact?.name || profile?.name} setOverlay={setOverlay} listingId={listingId} />}
    </div>
  );
}

export default Profile;
