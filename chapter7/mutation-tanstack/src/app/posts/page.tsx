import { PostList } from '@/components/PostList';
import { NewPost } from '@/components/NewPost';

type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
export default function Posts({
  searchParams: { criteria },
}: Props) {
  const resolvedHeading =
    typeof criteria === 'string'
      ? `Posts for ${criteria}`
      : 'Posts';
  return (
    <main>
      <h2>{resolvedHeading}</h2>
      <NewPost />
      <PostList criteria={criteria} />
    </main>
  );
}
