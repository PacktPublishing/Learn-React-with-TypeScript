type Props = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
export default function Page({
  searchParams,
}: Props) {
  return (
    <main>
      Searching: {searchParams.type},{' '}
      {searchParams.when}
    </main>
  );
}
