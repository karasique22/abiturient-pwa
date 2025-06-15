'use client';

import AccordionBlock from '@/components/ui/AccordionBlock/AccordionBlock';
import detailsStyles from '@/app/details/Details.module.css'; // те же list-классы
import styles from './faq.module.css';

const qa = [
  {
    q: 'Как оформить налоговый вычет?',
    a: `Чтобы оформить справку об оплате образовательных услуг, необходимо перейти по ссылке

Во вкладке "Информация подразделения" будет указан перечень документов, которые необходимо подписать и принести в бухгалтерию Университета, чтобы начать оформление справки

Оформление справки происходит только с физическим подписанием документов через бухгалтерию`,
  },
  /* …другие вопросы… */
];

export default function Page() {
  return (
    <div className={`${styles.list} container`}>
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
    </div>
  );
}
