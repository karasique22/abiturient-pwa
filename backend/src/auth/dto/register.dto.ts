import {
  IsEmail,
  Matches,
  IsPhoneNumber,
  MinLength,
  minLength,
} from 'class-validator';

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

  @MinLength(11)
  phone: string;
}
