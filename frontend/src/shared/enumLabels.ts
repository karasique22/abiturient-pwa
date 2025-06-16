import {
  EventCategory,
  ApplicationStatus,
  ProgramCategory,
  ProgramDocument,
  ProgramFormat,
  ProgramLevel,
} from '@/shared/prismaEnums';

export const eventLabels: Record<EventCategory, string> = {
  [EventCategory.MASTER_CLASS]: 'Мастер-класс',
  [EventCategory.TRIAL]: 'Пробное занятие',
  [EventCategory.LESSON]: 'Онлайн-урок',
};

export const programLevelLabel: Record<ProgramLevel, string> = {
  BEGINNER: 'Начальный',
  INTERMEDIATE: 'Средний',
  ADVANCED: 'Продвинутый',
};

export const programCategoryLabel: Record<ProgramCategory, string> = {
  PROFESSIONAL_RETRAINING: 'Профессиональная переподготовка',
  PROFESSIONAL_DEVELOPMENT: 'Повышение квалификации',
};

export const programDocumentLabel: Record<ProgramDocument, string> = {
  DIPLOMA_PROFESSIONAL_RETRAINING: 'Диплом о проф. переподготовке',
  DIPLOMA_PROFESSIONAL_DEVELOPMENT: 'Диплом о повышении квалификации',
  CERTIFICATE_OF_COMPLETION: 'Сертификат об обучении',
};

export const programFormatLabel: Record<ProgramFormat, string> = {
  OFFLINE: 'Очный формат',
  ONLINE: 'Онлайн формат',
};

export const applicationStatusLabel: Record<ApplicationStatus, string> = {
  NEW: 'На рассмотрении',
  CANCELLED: 'Отменено',
  APPROVED: 'Подтверждено',
};
