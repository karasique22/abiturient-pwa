import InfoBlock from '@/components/ui/InfoBlock/InfoBlock';
import { contacts } from '../info';

export default function Page() {
  return (
    <>
      {contacts.map((contact) => (
        <InfoBlock
          key={contact.title}
          title={contact.title}
          content={contact.content}
          link={contact.link}
        />
      ))}
    </>
  );
}
