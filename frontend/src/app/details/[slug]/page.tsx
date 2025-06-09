import Details from '../Details';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  console.log(params);
  return <Details slug={params.slug} />;
}
