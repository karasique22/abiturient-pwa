import AccordionBlock from '@/components/ui/AccordionBlock/AccordionBlock';

import detailsStyles from '@/app/details/Details.module.css';
import { qa } from '../info';

export default function Page() {
  return (
    <>
      {qa.map(({ q, a }) => (
        <AccordionBlock key={q} title={q} variant='faq'>
          <ul className={detailsStyles.list}>
            {a
              .split('\n')
              .filter((line) => line.trim())
              .map((line, i) => (
                <li key={i} className={detailsStyles.listItem}>
                  {line}
                </li>
              ))}
          </ul>
        </AccordionBlock>
      ))}
    </>
  );
}
