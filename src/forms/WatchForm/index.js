import React from 'react';
import { useForm } from 'react-hook-form';

import Input from '../../form/Input';
import Button from '../../form/Button';

export default function WatchForm({ onSubmit, className }) {
  const { register, handleSubmit, errors } = useForm();

  return (
    <form className={className} onSubmit={handleSubmit(onSubmit)}>
      <Input
        inputRef={register({ required: 'Enter your email address.' })}
        error={errors.email}
        name="email"
        compact
        label="Email"
        placeholder="Notification Email"
        type="email"
        className="bb-mt-2"
        append={
          <Button type="submit" appended>
            Subscribe
          </Button>
        }
      />
    </form>
  );
}
