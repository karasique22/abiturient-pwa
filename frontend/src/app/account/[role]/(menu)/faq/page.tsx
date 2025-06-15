'use client';

import AccordionBlock from '@/components/ui/AccordionBlock/AccordionBlock';
import detailsStyles from '@/app/details/Details.module.css';
import styles from './faq.module.css';

const qa = [
  {
    q: 'Как оформить налоговый вычет?',
    a: `Чтобы оформить справку об оплате образовательных услуг, необходимо перейти по ссылке

Во вкладке "Информация подразделения" будет указан перечень документов, которые необходимо подписать и принести в бухгалтерию Университета, чтобы начать оформление справки

Оформление справки происходит только с физическим подписанием документов через бухгалтерию`,
  },
  {
    q: 'Варианты оплаты обучения',
    a: 'Чтобы оформить оплату материнским капиталом, необходимо подписать Дополнительное соглашение на материнский капитал в кабинете 1445',
  },
  {
    q: 'Виды договоров',
    a: 'Чтобы оформить договор на юридическое лицо, необходимо подписать Дополнительное соглашение к договору на юридическое лицо в кабинете 1445 Университета',
  },
];

export default function Page() {
  return (
    <div className={`${styles.faq} container background-container`}>
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
