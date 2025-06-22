import InfoBlock from '@/components/ui/InfoBlock/InfoBlock';
import { license } from '../info';

export default function Page() {
  return (
    <>
      {license.map((license) => (
        <InfoBlock
          key={license.title}
          title={license.title}
          content={license.content}
          link={license.link}
        />
      ))}
    </>
  );
}
