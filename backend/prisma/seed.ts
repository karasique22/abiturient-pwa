import { PrismaClient, Prisma } from '@prisma/client';
import { genSaltSync, hashSync } from 'bcrypt-ts';

const prisma = new PrismaClient();

async function main() {
  /* 1. роли */
  const [studentRole, moderatorRole, adminRole] = await Promise.all(
    ['student', 'moderator', 'admin'].map((name) =>
      prisma.role.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  /* 2. пользователи */
  const salt = genSaltSync(10);
  const hash = (p: string) => hashSync(p, salt);

  const [admin, moderator, student] = await Promise.all([
    prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        password: hash('admin123'),
        fullName: 'Администратор',
        roles: { connect: { id: adminRole.id } },
      },
    }),
    prisma.user.upsert({
      where: { email: 'moderator@example.com' },
      update: {},
      create: {
        email: 'moderator@example.com',
        password: hash('moderator123'),
        fullName: 'Модератор',
        roles: { connect: { id: moderatorRole.id } },
      },
    }),
    prisma.user.upsert({
      where: { email: 'student@example.com' },
      update: {},
      create: {
        email: 'student@example.com',
        password: hash('student123'),
        fullName: 'Иван Студент',
        roles: { connect: { id: studentRole.id } },
      },
    }),
  ]);

  /* 3. категории */
  const [designCat, itCat] = await Promise.all([
    prisma.programCategory.upsert({
      where: { name: 'Дизайн' },
      update: {},
      create: { name: 'Дизайн' },
    }),
    prisma.programCategory.upsert({
      where: { name: 'IT' },
      update: {},
      create: { name: 'IT' },
    }),
  ]);

  /* 4. программы */
  const [paintingProgram] = await Promise.all([
    prisma.program.upsert({
      where: { title: 'Мастер-класс по живописи' },
      update: {},
      create: {
        title: 'Мастер-класс по живописи',
        description: 'Базовые техники рисунка за 4 недели',
        durationWeeks: 4,
        startDate: new Date('2025-11-14'),
        priceRub: new Prisma.Decimal('15000.00'),
        categoryId: designCat.id,
      },
    }),
    prisma.program.upsert({
      where: { title: 'Основы веб-разработки' },
      update: {},
      create: {
        title: 'Основы веб-разработки',
        description: 'HTML + CSS + JS с нуля',
        durationWeeks: 6,
        startDate: new Date('2025-12-01'),
        priceRub: new Prisma.Decimal('20000.00'),
        categoryId: itCat.id,
      },
    }),
  ]);

  /* 5. заявка студента */
  await prisma.application.create({
    data: {
      userId: student.id,
      programId: paintingProgram.id,
      status: 'new',
      comment: 'Хочу научиться рисовать маслом',
    },
  });

  console.log('Seed завершён.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
