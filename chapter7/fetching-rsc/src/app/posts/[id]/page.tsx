import { Suspense } from 'react';
import { Loading } from '@/components/Loading';
import { PostDetail } from '@/components/PostDetail';
import { ErrorBoundary } from '@/components/ErrorBoundary';

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
      <Suspense fallback={<Loading />}>
        <ErrorBoundary>
          <PostDetail id={Number(params.id)} />
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}
