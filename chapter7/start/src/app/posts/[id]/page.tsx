import { posts } from '@/data/posts';

export default async function Post({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  if (!Number.isInteger(id)) {
    return <main>Post not found</main>;
  }
  const post = posts.find((post) => post.id === Number(id));
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
