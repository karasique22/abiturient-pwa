import ApplicationsClient from './ApplicationsClient';

export default async function Page(props: {
  params: Promise<{
    applications: 'events' | 'programs';
    role: 'student' | 'moderator';
  }>;
}) {
  const params = await props.params;
  const type = params.applications;
  const role = params.role;
  return <ApplicationsClient type={type} role={role} />;
}
