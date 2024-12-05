type Props = {
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};
export default async function Thanks({
  searchParams,
}: Props) {
  return (
    <main>
      <h2>Form successfully submitted</h2>
      Thank you {(await searchParams).name}, we
      will be in touch soon.
    </main>
  );
}
