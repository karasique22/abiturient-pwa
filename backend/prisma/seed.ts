/* prisma/seed.ts */
import {
  PrismaClient,
  Prisma,
  EventCategory,
  ProgramCategory,
  ProgramLevel,
  ProgramDocument,
  ProgramFormat,
} from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt-ts';
import { faker } from '@faker-js/faker/locale/ru';

const prisma = new PrismaClient();
const D = Prisma.Decimal;

async function main() {
  /* ── роли + админ ───────────────────────────────────────── */
  const salt = genSaltSync(10);
  const adminPassword = hashSync('admin123', salt);
  const moderatorPassword = hashSync('moderator', salt);
  const studentPassword = hashSync('student123', salt);

  function slugify(input: string) {
    return input
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }

  const [student, moderator, admin] = await Promise.all(
    ['student', 'moderator', 'admin'].map((name) =>
      prisma.role.upsert({ where: { name }, update: {}, create: { name } }),
    ),
  );

  await prisma.session.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      fullName: 'Администратор Администраторович',
      roles: { connect: { id: admin.id } },
    },
  });

  await prisma.user.upsert({
    where: { email: 'moderator@example.com' },
    update: {},
    create: {
      email: 'moderator@example.com',
      password: moderatorPassword,
      fullName: 'Модератор Модераторович',
      roles: { connect: { id: moderator.id } },
    },
  });

  await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      password: studentPassword,
      fullName: 'Студент Студентович',
      roles: { connect: { id: student.id } },
    },
  });
  /* ── 10 программ ────────────────────────────────────────── */
  await prisma.programImage.deleteMany({});
  await prisma.program.deleteMany({});
  const programPromises = Array.from({ length: 10 }).map(() => {
    const title = faker.company.catchPhrase();

    return prisma.program.create({
      data: {
        title,
        slug: slugify(title),
        description: faker.lorem.paragraphs(2),
        durationHours: faker.number.int({
          min: 200,
          max: 1500,
          multipleOf: 50,
        }),
        durationYears: faker.number.int({
          min: 1,
          max: 5,
        }),
        category: faker.helpers.arrayElement([
          ProgramCategory.PROFESSIONAL_RETRAINING,
          ProgramCategory.PROFESSIONAL_DEVELOPMENT,
        ]),
        level: faker.helpers.arrayElement([
          ProgramLevel.BEGINNER,
          ProgramLevel.ADVANCED,
          ProgramLevel.INTERMEDIATE,
        ]),
        document: faker.helpers.arrayElement([
          ProgramDocument.CERTIFICATE_OF_COMPLETION,
          ProgramDocument.DIPLOMA_PROFESSIONAL_DEVELOPMENT,
          ProgramDocument.DIPLOMA_PROFESSIONAL_RETRAINING,
        ]),
        content: [
          'Модуль 1. Исходная информация для цифрового моделирования одежды',
          'Модуль 2. Цифровой манекен, методы оценки качества одежды с применением трехмерных технологий',
          'Модуль 3. Визуализация образа потребителя в трехмерной среде, принципы работы с эскизами одежды',
          'Модуль 4. Конструирование и художественное моделирование швейных изделий в цифровой среде',
        ],
        curatorName: faker.person.fullName(),
        curatorInfo: faker.person.bio(),
        startDate: faker.date.soon({ days: 45 }),
        priceRub: new D(
          faker.finance.amount({ min: 20000, max: 90000, dec: 2 }),
        ),
        format: faker.helpers.arrayElement([
          ProgramFormat.OFFLINE,
          ProgramFormat.ONLINE,
        ]),
        images: {
          create: {
            url: faker.image.urlLoremFlickr({
              category: 'education',
              width: 640,
              height: 480,
            }),
            alt: 'Обложка программы',
            order: 0,
          },
        },
      },
    });
  });

  await Promise.all(programPromises);

  /* ── 10 событий ─────────────────────────────────────────── */
  await prisma.eventImage.deleteMany({});
  await prisma.event.deleteMany({});
  const eventPromises = Array.from({ length: 10 }).map(() => {
    const title = faker.company.catchPhrase();

    return prisma.event.create({
      data: {
        title,
        slug: slugify(title),
        description: faker.lorem.paragraph(),
        dateTime: faker.date.soon({ days: 60 }),
        address: `${faker.location.city()}, ${faker.location.streetAddress()}`,
        category: faker.helpers.arrayElement([
          EventCategory.MASTER_CLASS,
          EventCategory.TRIAL,
          EventCategory.LESSON,
        ]),
        curatorName: faker.person.fullName(),
        curatorInfo: faker.person.jobTitle(),
        images: {
          create: {
            url: faker.image.urlPicsumPhotos(),
            alt: 'Фото мероприятия',
            order: 0,
          },
        },
      },
    });
  });

  await Promise.all(eventPromises);

  console.log('🌱  Сид-данные успешно добавлены');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
