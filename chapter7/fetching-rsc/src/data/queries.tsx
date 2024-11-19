import { createClient } from '@libsql/client';
import {
  postsSchema,
  postSchema,
} from './schema';

// async function delay() {
//   await new Promise((resolve) =>
//     setTimeout(resolve, 1000),
//   );
// }

export async function getAllPosts() {
  // await delay();
  const client = createClient({
    url: process.env.DB_URL ?? '',
  });
  //   const data = await client.execute(
  //     'SELECT CAST(id as text) as id, title, description FROM posts',
  //   );
  const data = await client.execute(
    'SELECT id, title, description FROM posts',
  );
  client.close();
  return postsSchema.parse(data.rows);
}

export async function getFilteredPosts(
  criteria: string,
) {
  // await delay();
  const client = createClient({
    url: process.env.DB_URL ?? '',
  });
  const data = await client.execute({
    sql: 'SELECT id, title, description FROM posts WHERE title LIKE ?',
    args: [`%${criteria}%`],
  });
  client.close();
  return postsSchema.parse(data.rows);
}

export async function getPost(id: number) {
  // await delay();
  const client = createClient({
    url: process.env.DB_URL ?? '',
  });
  const data = await client.execute({
    sql: 'SELECT id, title, description FROM posts WHERE id = ?',
    args: [id],
  });
  client.close();
  if (data.rows.length === 0) {
    return undefined;
  }
  return postSchema.parse(data.rows[0]);
}
