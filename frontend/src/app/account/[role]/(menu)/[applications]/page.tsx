import ApplicationsClient from './ApplicationsClient';

export default async function Page(
  props: {
    params: Promise<{ applications: 'events' | 'programs' }>;
  }
) {
  const params = await props.params;
  const type = params.applications.slice(0, -1) as 'event' | 'program';
  return <ApplicationsClient type={type} />;
}
