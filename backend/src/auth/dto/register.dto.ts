import { IsEmail, Matches, IsPhoneNumber, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).+$/)
  password: string;

  @Matches(
    /^[А-ЯЁA-Z][\p{L}\-']+\s+[А-ЯЁA-Z][\p{L}\-']+(\s+[А-ЯЁA-Z][\p{L}\-']+)?$/u,
    {
      message: 'fullName must be "Фамилия Имя Отчество"',
    },
  )
  fullName: string;

  @IsPhoneNumber('RU', { message: 'phone must be a valid RU number' })
  phone: string;
}
