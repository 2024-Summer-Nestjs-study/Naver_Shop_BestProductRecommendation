import { IsString } from 'class-validator';

export class UserLoginResDto {
  @IsString()
  accesToken: string;
  @IsString()
  refreshToken: string;
}
