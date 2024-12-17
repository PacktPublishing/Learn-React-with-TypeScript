'use client';
import { useActionState } from 'react';
import { insertContact } from '@/data/insertContact';

export function ContactForm() {
  const [
    { ok, error, errors, formData },
    formAction,
    isPending,
  ] = useActionState(insertContact, {
    ok: false,
    error: '',
    errors: {
      name: null,
      email: null,
      reason: null,
    },
    formData: new FormData(),
  });

  return (
    <form action={formAction}>
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          name="name"
          defaultValue={
            (formData.get('name') ?? '') as string
          }
          aria-invalid={
            errors.name ? 'true' : 'false'
          }
          aria-describedby="name-error"
        />
        {errors.name && (
          <div id="name-error" role="alert">
            {errors.name.message}
          </div>
        )}
      </div>
      <div className="field">
        <label htmlFor="email">
          Your email address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          defaultValue={
            (formData.get('email') ??
              '') as string
          }
          aria-invalid={
            errors.email ? 'true' : 'false'
          }
          aria-describedby="email-error"
        />
        {errors.email && (
          <div id="email-error" role="alert">
            {errors.email.message}
          </div>
        )}
      </div>
      <div className="field">
        <label htmlFor="reason">
          Reason you need to contact us
        </label>
        <select
          id="reason"
          name="reason"
          defaultValue={
            (formData.get('reason') ??
              '') as string
          }
          aria-invalid={
            errors.reason ? 'true' : 'false'
          }
          aria-describedby="reason-error"
        >
          <option value=""></option>
          <option value="Support">Support</option>
          <option value="Feedback">
            Feedback
          </option>
          <option value="Other">Other</option>
        </select>
        {errors.reason && (
          <div id="reason-error" role="alert">
            {errors.reason.message}
          </div>
        )}
      </div>
      <div className="field">
        <label htmlFor="notes">
          Additional notes
        </label>
        <textarea
          id="notes"
          name="notes"
          defaultValue={
            (formData.get('notes') ??
              '') as string
          }
        />
      </div>
      {!ok && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      {isPending && (
        <p role="alert">Saving ...</p>
      )}
      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
}
