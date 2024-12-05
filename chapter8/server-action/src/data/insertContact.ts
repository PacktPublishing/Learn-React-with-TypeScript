'use server';
import {
  createClient,
  type Client,
} from '@libsql/client';
import { contactSchema } from './schema';
import { redirect } from 'next/navigation';

export async function insertContact(
  formData: FormData,
) {
  const parsedResult = contactSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!parsedResult.success) {
    return;
  }
  const { name, email, reason, notes } =
    parsedResult.data;
  let client: Client | undefined;
  let ok = true;
  try {
    client = createClient({
      url: process.env.DB_URL ?? '',
    });
    await client.execute({
      sql: 'INSERT INTO contact(name, email, reason, notes) VALUES (?, ?, ?, ?)',
      args: [name, email, reason, notes ?? null],
    });
  } catch {
    ok = false;
  }
  if (client) {
    client.close();
  }
  if (ok) {
    redirect(
      `/thanks/?name=${encodeURIComponent(name)}`,
    );
  }
}
