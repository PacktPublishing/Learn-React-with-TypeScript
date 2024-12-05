'use client';
import {
  useActionState,
  useRef,
  startTransition,
} from 'react';
import { insertContact } from '@/data/insertContact';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema } from '@/data/schema';

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

  const {
    handleSubmit,
    register,
    formState: { errors: clientErrors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      reason: '',
      notes: '',
      ...(Object.fromEntries(formData) ?? {}),
    },
  });

  const formRef = useRef<HTMLFormElement>(null);

  function onSubmit() {
    startTransition(() => {
      formAction(new FormData(formRef.current!));
    });
  }
  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="field">
        <label htmlFor="name">Your name</label>
        <input
          type="text"
          id="name"
          defaultValue={
            (formData.get('name') ?? '') as string
          }
          {...register('name')}
          aria-invalid={
            (clientErrors.name ?? errors.name)
              ? 'true'
              : 'false'
          }
          aria-describedby="name-error"
          aria-required="true"
        />
        {(clientErrors.name ?? errors.name) && (
          <div
            id="name-error"
            role="alert"
            className="error"
          >
            {clientErrors.name?.message ??
              errors.name?.message}
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
          defaultValue={
            (formData.get('email') ??
              '') as string
          }
          {...register('email')}
          aria-invalid={
            (clientErrors.email ?? errors.email)
              ? 'true'
              : 'false'
          }
          aria-describedby="email-error"
        />
        {(clientErrors.email ?? errors.email) && (
          <div
            id="email-error"
            role="alert"
            className="error"
          >
            {clientErrors.email?.message ??
              errors.email?.message}
          </div>
        )}
      </div>
      <div className="field">
        <label htmlFor="reason">
          Reason you need to contact us
        </label>
        <select
          id="reason"
          defaultValue={
            (formData.get('reason') ??
              '') as string
          }
          {...register('reason')}
          aria-invalid={
            (clientErrors.reason ?? errors.reason)
              ? 'true'
              : 'false'
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
        {(clientErrors.reason ??
          errors.reason) && (
          <div
            id="reason-error"
            role="alert"
            className="error"
          >
            {clientErrors.reason?.message ??
              errors.reason?.message}
          </div>
        )}
      </div>
      <div className="field">
        <label htmlFor="notes">
          Additional notes
        </label>
        <textarea
          id="notes"
          defaultValue={
            (formData.get('notes') ??
              '') as string
          }
          {...register('notes')}
        />
      </div>
      {isPending && (
        <p role="alert">Saving ...</p>
      )}
      {!ok && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
}
