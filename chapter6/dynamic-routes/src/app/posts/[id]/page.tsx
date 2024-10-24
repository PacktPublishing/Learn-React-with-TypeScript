import { posts } from '@/data/posts';

type Props = { params: { id: string } };
export default function Post({ params }: Props) {
  const post = posts.find(
    (post) => post.id === Number(params.id),
  );
  if (!post) {
    return <main>Post not found</main>;
  }
  return (
    <main>
      <h2>{post.title}</h2>
      <p>{post.description}</p>
    </main>
  );
}
