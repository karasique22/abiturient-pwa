import Details from './Details';

export default function Page({ params }: { params: { slug: string } }) {
  return <Details slug={params.slug} />;
}
