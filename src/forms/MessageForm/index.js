import React from 'react';
import { useForm } from 'react-hook-form';

import Input from '../../form/Input';
import Textarea from '../../form/Textarea';

export default function MessageForm({ onSubmit, name, heading = true, className }) {
  const { register, handleSubmit, watch, errors } = useForm();

  const doSubmit = (data, e) => {
    e.target.reset(); // reset after form submit
    onSubmit && onSubmit(data, e);
  };

  return (
    <form className={className} onSubmit={handleSubmit(doSubmit)}>
      {heading && <h1 className="bb-text-xl bb-font-medium">Send a message...</h1>}
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
        type="tel"
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
        error={errors.content}
        name="content"
        placeholder="Enter a message..."
        rows={3}
        className="bb-mt-2"
      />
      <div className="bb-mt-5 sm:bb-mt-6">
        <span className="bb-flex bb-w-full bb-rounded-md bb-shadow-sm">
          <button
            type="submit"
            className="bb-inline-flex bb-justify-center bb-w-full bb-rounded-md bb-border bb-border-transparent bb-px-4 bb-py-2 bb-bg-blue-600 bb-text-base bb-leading-6 bb-font-medium bb-text-white bb-shadow-sm hover:bb-bg-blue-500 focus:bb-outline-none focus:bb-border-indigo-700 focus:bb-shadow-outline-indigo bb-transition bb-ease-in-out bb-duration-150 sm:bb-text-sm sm:bb-leading-5"
          >
            Send Message
          </button>
        </span>
      </div>
    </form>
  );
}
