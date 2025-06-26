/* prisma/seed.ts */
import { PrismaClient } from '@prisma/client';
import { withOptimize } from '@prisma/extension-optimize';
import { genSaltSync, hashSync } from 'bcrypt-ts';

import { EVENTS } from './data/events.data';
import { PROGRAMS } from './data/programs.data';

const prisma = new PrismaClient();

async function main() {
  /* ── роли + demo-пользователи (как раньше) ──────────────── */
  const salt = genSaltSync(10);
  const adminPass = hashSync('admin123', salt);
  const modPass = hashSync('moderator', salt);
  const studPass = hashSync('student123', salt);

  const [student, moderator, admin] = await Promise.all(
    ['student', 'moderator', 'admin'].map((name) =>
      prisma.role.upsert({ where: { name }, update: {}, create: { name } }),
    ),
  );

  await prisma.session.deleteMany({});
  await prisma.application.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: adminPass,
      fullName: 'Администратор Администраторович',
      roles: { connect: { id: admin.id } },
      phone: '+7 900 000-00-01',
    },
  });
  await prisma.user.upsert({
    where: { email: 'moderator@example.com' },
    update: {},
    create: {
      email: 'moderator@example.com',
      password: modPass,
      fullName: 'Модератор Модераторович',
      roles: { connect: { id: moderator.id } },
      phone: '+7 900 000-00-02',
    },
  });
  await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      password: studPass,
      fullName: 'Студент Студентович',
      roles: { connect: { id: student.id } },
      phone: '+7 900 000-00-03',
    },
  });

  await prisma.programImage.deleteMany({});
  await prisma.program.deleteMany({});

  for (const p of PROGRAMS) await prisma.program.create({ data: p });

  await prisma.eventImage.deleteMany({});
  await prisma.event.deleteMany({});

  for (const e of EVENTS) await prisma.event.create({ data: e });

  console.log('🌱  Обновлённые сид-данные успешно добавлены');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
