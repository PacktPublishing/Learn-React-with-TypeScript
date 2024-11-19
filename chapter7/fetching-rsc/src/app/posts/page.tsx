import { Suspense } from 'react';
import { Loading } from '@/components/Loading';
import { PostList } from '@/components/PostList';
import { ErrorBoundary } from '@/components/ErrorBoundary';

type Props = {
  searchParams: {
    [key: string]:
      | string
      | string[]
      | undefined;
  };
};
export default function Posts({
  searchParams: { criteria },
}: Props) {
  const resolvedHeading =
    typeof criteria ===
    'string'
      ? `Posts for ${criteria}`
      : 'Posts';
  return (
    <main>
      <h2>
        {resolvedHeading}
      </h2>
      <Suspense
        fallback={<Loading />}
      >
        <ErrorBoundary>
          <PostList
            criteria={
              criteria
            }
          />
        </ErrorBoundary>
      </Suspense>
    </main>
  );
}