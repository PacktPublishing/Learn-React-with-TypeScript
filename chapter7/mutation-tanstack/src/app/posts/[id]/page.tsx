import { PostDetail } from '@/components/PostDetail';

type Props = { params: { id: string } };
export default async function Post({
  params,
}: Props) {
  const id = Number(params.id);
  if (!Number.isInteger(id)) {
    return <main>Post not found</main>;
  }
  return (
    <main>
      <PostDetail id={Number(params.id)} />
    </main>
  );
}
