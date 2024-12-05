'use client';
import { useActionState } from 'react';
import { completeContact } from '@/data/completeContact';

export function ContactItem({
  id,
  name,
  email,
  reason,
  notes,
  done,
}: {
  id: number;
  name: string;
  email: string;
  reason: string;
  notes: string;
  done: boolean;
}) {
  const [
    { ok, error, formData },
    formAction,
    isPending,
  ] = useActionState(completeContact, {
    ok: false,
    error: '',
    formData: new FormData(),
  });

  return (
    <div>
      <p
        style={{
          textDecoration: done
            ? 'line-through'
            : 'none',
        }}
      >
        <b>{name}</b>, {email}, {reason}
      </p>
      {!done && (
        <form action={formAction}>
          <input
            type="hidden"
            name="id"
            value={id}
          />
          <div className="field">
            <textarea
              name="notes"
              placeholder="Notes"
              defaultValue={
                (notes ??
                  formData.get('notes') ??
                  '') as string
              }
            />
          </div>
          {!ok && (
            <p role="alert" className="error">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={isPending}
          >
            Done
          </button>
        </form>
      )}
    </div>
  );
}
