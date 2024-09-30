import { IsEmail, IsString } from 'class-validator';

export class CustomerRegistDto {
  @IsString()
  name: string;
  @IsString()
  userID: string;
  @IsString()
  userPW: string;
  @IsString()
  address: string;
  @IsEmail()
  email: string;
}
