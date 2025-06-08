import Details from '../../details/Details';

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  return <Details slug={params.slug} type='program' />;
}
