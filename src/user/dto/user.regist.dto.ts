import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserRegistDto {
  @IsString()
  name: string;
  @IsString()
  userID: string;
  @IsString()
  userPW: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  rela: string;
}
