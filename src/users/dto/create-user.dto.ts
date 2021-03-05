import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  firstname: string;
  surname: string;
  dateOfBirth: string;
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
