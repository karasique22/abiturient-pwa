import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  // Создание пользователей
  const student = await prisma.user.create({
    data: {
      id: randomUUID(),
      name: 'Иван Абитуриент',
      email: 'ivan@student.ru',
      password: 'hashed_password_1', // FIXME: обычно тут хеш
      role: 'STUDENT',
    },
  });

  const moderator = await prisma.user.create({
    data: {
      id: randomUUID(),
      name: 'Мария Модератор',
      email: 'maria@moderator.ru',
      password: 'hashed_password_2',
      role: 'MODERATOR',
    },
  });

  // Создание курсов
  const course1 = await prisma.course.create({
    data: {
      id: randomUUID(),
      title: 'Введение в программирование',
      description: 'Курс для начинающих с нуля',
    },
  });

  const course2 = await prisma.course.create({
    data: {
      id: randomUUID(),
      title: 'Базы данных и SQL',
      description: 'Работа с реляционными БД',
    },
  });

  // Создание заявки
  await prisma.application.create({
    data: {
      id: randomUUID(),
      userId: student.id,
      courseId: course1.id,
      status: 'PENDING',
    },
  });

  await prisma.application.create({
    data: {
      id: randomUUID(),
      userId: student.id,
      courseId: course2.id,
      status: 'APPROVED',
    },
  });

  console.log('✅ Сиды успешно добавлены');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Ошибка при сидинге:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
