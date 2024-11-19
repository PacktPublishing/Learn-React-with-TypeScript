'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
// import {
//   getAllPosts,
//   getFilteredPosts,
// } from '@/data/queries';
import { Loading } from './Loading';
import { ErrorAlert } from './ErrorAlert';
import { postsSchema } from '@/data/schema';

export function PostList({
  criteria,
}: {
  criteria: string | string[] | undefined;
}) {
  const {
    data: resolvedPosts,
    isPending,
    error,
  } = useQuery({
    queryKey: ['posts', criteria],
    queryFn: async () => {
      // if (typeof criteria === 'string') {
      //   return getFilteredPosts(criteria);
      // }
      // return getAllPosts();
      const path =
        typeof criteria === 'string'
          ? `/api/posts/?criteria=${encodeURIComponent(criteria)}`
          : '/api/posts/';
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error('Problem fetching data');
      }
      return postsSchema.parse(
        await response.json(),
      );
    },
  });
  if (isPending) {
    return <Loading />;
  }
  if (error) {
    return <ErrorAlert error={error} />;
  }

  return (
    <ul>
      {resolvedPosts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            {post.title}
          </Link>
          <p>{post.description}</p>
        </li>
      ))}
    </ul>
  );
}
