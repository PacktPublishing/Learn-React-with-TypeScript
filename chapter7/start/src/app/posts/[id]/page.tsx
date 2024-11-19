import { posts } from '@/data/posts';

type Props = { params: { id: string } };
export default function Post({ params }: Props) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return <main>Post not found</main>;
  }
  const post = posts.find(
    (post) => post.id === Number(id),
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
