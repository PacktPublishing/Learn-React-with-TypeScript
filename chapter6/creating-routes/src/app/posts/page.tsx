// import Link from 'next/link';
import { posts } from '@/data/posts';

// Includes
// - Basic page (no links)

export default function Posts() {
  return (
    <main>
      <h2>Posts</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <span>{post.title}</span>
            <p>{post.description}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
