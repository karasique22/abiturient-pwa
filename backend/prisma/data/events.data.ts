import { slugify } from 'src/shared/slugify';
import { Prisma } from '@prisma/client';
import { EventCategory } from '@prisma/client';

/* ---------- EVENTS ---------- */
export const EVENTS = [
  {
    title: 'День открытых дверей факультета дизайна',
    slug: 'open-day-design-faculty',
    description:
      'Экскурсии по мастерским, встречи с преподавателями и демонстрация студенческих проектов.',
    dateTime: new Date('2025-08-20T10:00:00'),
    address: 'Москва, ул. Малая Калужская, 1',
    category: EventCategory.TRIAL,
    curatorName: 'Светлана Никулина',
    curatorInfo: 'Декан факультета дизайна',
    images: {
      create: {
        url: 'https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=640&h=480',
        alt: 'Экскурсия по дизайн-лабораториям',
        order: 0,
      },
    },
  },
  {
    title: 'Мастер-класс: 3D-печать обуви',
    slug: 'master-class-3d-print-shoes',
    description:
      'Практическая сессия по созданию прототипов обуви на 3D-принтере.',
    dateTime: new Date('2025-09-12T14:00:00'),
    address: 'Москва, пр-т Вернадского, 86к1, FabLab',
    category: EventCategory.MASTER_CLASS,
    curatorName: 'Игорь Сергеев',
    curatorInfo: 'Руководитель FabLab RGU',
    images: {
      create: {
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=640&h=480',
        alt: '3D-принтер печатает обувь',
        order: 0,
      },
    },
  },
  {
    title: 'Основы видеомонтажа в Premiere Pro',
    slug: 'online-lesson-premiere-basics',
    description: 'Разбор интерфейса, горячих клавиш и сборка короткого ролика.',
    dateTime: new Date('2025-09-18T18:00:00'),
    address: 'Zoom-платформа (ссылка после регистрации)',
    category: EventCategory.LESSON,
    curatorName: 'Наталья Литвинова',
    curatorInfo: 'Motion Designer, Skillbox',
    images: {
      create: {
        url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=640&h=480',
        alt: 'Рабочее место видеомонтажёра',
        order: 0,
      },
    },
  },
  {
    title: 'Digital-иллюстрация на iPad',
    slug: 'trial-digital-illustration-ipad',
    description:
      'Протестируйте возможности Procreate под руководством профессионального иллюстратора.',
    dateTime: new Date('2025-09-26T17:00:00'),
    address: 'Москва, ул. Садовая, 21, ауд. А-301',
    category: EventCategory.TRIAL,
    curatorName: 'Виктория Корнилова',
    curatorInfo: 'Digital-художник, победитель CG Event',
    images: {
      create: {
        url: 'https://images.unsplash.com/photo-1599009432031-ba5d3a794aec?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'Студент рисует на iPad',
        order: 0,
      },
    },
  },
  {
    title: 'Fashion-стилизация съёмок',
    slug: 'master-class-fashion-styling',
    description:
      'Научитесь подбирать образы и аксессуары для fashion-фотосессий.',
    dateTime: new Date('2025-10-06T15:00:00'),
    address: 'Москва, фотостудия «LightSpace»',
    category: EventCategory.MASTER_CLASS,
    curatorName: 'Оксана Филиппова',
    curatorInfo: 'Fashion-стилист Vogue',
    images: {
      create: {
        url: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=640&h=480',
        alt: 'Подбор образа для модели',
        order: 0,
      },
    },
  },
  {
    title: 'Карьера UX-дизайнера',
    slug: 'online-meet-ux-career',
    description:
      'Требования рынка, портфолио и собеседование в product-компании.',
    dateTime: new Date('2025-10-10T19:00:00'),
    address: 'MS Teams (ссылка после регистрации)',
    category: EventCategory.LESSON,
    curatorName: 'Сергей Демидов',
    curatorInfo: 'Lead Product Designer Яндекс',
    images: {
      create: {
        url: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=640&h=480',
        alt: 'Презентация UX-карьеры',
        order: 0,
      },
    },
  },
  {
    title: 'Блокчейн для креативных индустрий',
    slug: 'trial-blockchain-creative',
    description: 'Как NFT и токенизация меняют рынки искусства и моды.',
    dateTime: new Date('2025-10-22T18:30:00'),
    address: 'Москва, ул. Грузинский Вал, 11',
    category: EventCategory.TRIAL,
    curatorName: 'Андрей Поляков',
    curatorInfo: 'CEO «CryptoArt Hub»',
    images: {
      create: {
        url: 'https://images.unsplash.com/photo-1731536782762-076739de99b6?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'NFT-арт на экране',
        order: 0,
      },
    },
  },
  {
    title: 'Звуковой брендинг',
    slug: 'master-class-audio-branding',
    description: 'Создание аудиологотипа и фирменного звука для бренда.',
    dateTime: new Date('2025-11-03T13:30:00'),
    address: 'Москва, студия Mosfilm, зал 4',
    category: EventCategory.MASTER_CLASS,
    curatorName: 'Игорь Чернышев',
    curatorInfo: 'Sound Producer Mosfilm',
    images: {
      create: {
        url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=640&h=480',
        alt: 'Работа над аудиологотипом',
        order: 0,
      },
    },
  },
  {
    title: 'Базовый After Effects',
    slug: 'online-lesson-ae-basic',
    description: 'Анимация текста и инфографики за один вечер.',
    dateTime: new Date('2025-11-12T18:00:00'),
    address: 'Zoom-платформа (ссылка после регистрации)',
    category: EventCategory.LESSON,
    curatorName: 'Наталья Литвинова',
    curatorInfo: 'Motion Designer, Skillbox',
    images: {
      create: {
        url: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=640&h=480',
        alt: 'Анимация в After Effects',
        order: 0,
      },
    },
  },
  {
    title: 'Инновационные медиа-лаборатории',
    slug: 'open-day-media-labs',
    description:
      'Познакомьтесь с VR-павильоном и студией виртуального производства университета.',
    dateTime: new Date('2025-12-05T11:00:00'),
    address: 'Москва, ул. Садовническая, 52, корпус М',
    category: EventCategory.TRIAL,
    curatorName: 'Илья Борисов',
    curatorInfo: 'Руководитель MediaLab',
    images: {
      create: {
        url: 'https://images.unsplash.com/photo-1624792054848-98a03bbb8546?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        alt: 'VR-павильон университета',
        order: 0,
      },
    },
  },
] satisfies Prisma.EventCreateInput[];
