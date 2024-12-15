'use server';
import { revalidatePath } from 'next/cache';
import {
  createClient,
  type Client,
  type ResultSet,
} from '@libsql/client';

export async function createPost(
  title: string,
  description: string,
) {
  let client: Client | undefined;
  let result: ResultSet | undefined;
  let ok = true;
  try {
    const client = createClient({
      url: process.env.DB_URL ?? '',
    });
    await client.execute({
      sql: 'INSERT INTO posts(title, description) VALUES (?, ?)',
      args: [title, description],
    });
  } catch {
    ok = false;
  }
  if (client) {
    client.close();
  }
  revalidatePath('/');
  return {
    ok,
    id: result ? result.lastInsertRowid : undefined,
  };
}
