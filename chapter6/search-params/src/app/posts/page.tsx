import Link from 'next/link';
import { posts } from '@/data/posts';

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
export default function Posts({
  searchParams: { criteria },
}: Props) {
  const resolvedPosts =
    typeof criteria === 'string'
      ? posts.filter((post) =>
          post.title
            .toLowerCase()
            .includes(criteria.toLowerCase()),
        )
      : posts;
  const resolvedHeading =
    typeof criteria === 'string'
      ? `Posts for ${criteria}`
      : 'Posts';
  return (
    <main>
      <h2>{resolvedHeading}</h2>
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
    </main>
  );
}
