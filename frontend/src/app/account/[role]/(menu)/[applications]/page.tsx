import ApplicationsClient from './ApplicationsClient';

export default async function Page(props: {
  params: Promise<{ applications: 'events' | 'programs' }>;
}) {
  const params = await props.params;
  const type = params.applications;
  return <ApplicationsClient type={type} />;
}
