import styles from './InfoBlock.module.css';
import OutsideLinkIcon from '@/components/icons/OutsideLinkIcon';

interface Props {
  title: string;
  content: string;
  link?: string;
}

function formatLink(link: string): string {
  if (
    link.startsWith('http://') ||
    link.startsWith('https://') ||
    link.startsWith('/')
  ) {
    return link;
  }

  if (link.includes('@') && !link.startsWith('mailto:')) {
    return `mailto:${link}`;
  }

  if (/^\+?\d[\d\s\-()]+$/.test(link)) {
    return `tel:${link.replace(/\s+/g, '')}`;
  }

  return link;
}

export default function InfoBlock({ title, content, link }: Props) {
  const href = link ? formatLink(link) : undefined;

  const Wrapper = href ? 'a' : 'div';

  return (
    <Wrapper
      className={styles.block}
      {...(href
        ? {
            href,
            target: href.startsWith('/') ? undefined : '_blank',
            rel: href.startsWith('/') ? undefined : 'noopener noreferrer',
          }
        : {})}
    >
      <span className='font-body-medium'>{title}</span>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>{content}</div>
        {href && !href.startsWith('/') && <OutsideLinkIcon />}
      </div>
    </Wrapper>
  );
}
