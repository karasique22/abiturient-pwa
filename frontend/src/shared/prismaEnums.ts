export enum EventCategory {
  MASTER_CLASS = 'MASTER_CLASS',
  TRIAL = 'TRIAL',
  LESSON = 'LESSON',
}

export enum ProgramCategory {
  PROFESSIONAL_RETRAINING = 'PROFESSIONAL_RETRAINING', // профессиональная переподготовка
  PROFESSIONAL_DEVELOPMENT = 'PROFESSIONAL_DEVELOPMENT', // повышение квалификации
}

export enum ProgramLevel {
  BEGINNER = 'BEGINNER', // начальный
  INTERMEDIATE = 'INTERMEDIATE', // средний
  ADVANCED = 'ADVANCED', // продвинутый
}

export enum ProgramDocument {
  DIPLOMA_PROFESSIONAL_RETRAINING = 'DIPLOMA_PROFESSIONAL_RETRAINING', // диплом о профессиональной переподготовке
  DIPLOMA_PROFESSIONAL_DEVELOPMENT = 'DIPLOMA_PROFESSIONAL_DEVELOPMENT', // диплом о повышении квалификации
  CERTIFICATE_OF_COMPLETION = 'CERTIFICATE_OF_COMPLETION', // сертификат об обучении
}

export enum ProgramFormat {
  OFFLINE = 'OFFLINE',
  ONLINE = 'ONLINE',
}

export enum ApplicationStatus {
  NEW = 'NEW',
  CANCELLED = 'CANCELLED',
  APPROVED = 'APPROVED',
}
