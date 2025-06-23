export const isFullName = (txt: string) =>
  /^[А-ЯЁA-Z][\p{L}\-']+\s+[А-ЯЁA-Z][\p{L}\-']+(\s+[А-ЯЁA-Z][\p{L}\-']+)?$/u.test(
    txt.trim()
  );

export const isPhone = (txt: string) =>
  /^\+7\s?\(?\d{3}\)?\s?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/.test(txt);

export const isStrongPassword = (txt: string) =>
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).{8,}$/.test(txt);
