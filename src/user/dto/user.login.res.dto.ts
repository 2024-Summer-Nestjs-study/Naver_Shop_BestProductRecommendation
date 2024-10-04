import { IsString } from 'class-validator';

export class UserLoginResDto {
  @IsString()
  accessToken: string;
  @IsString()
  refreshToken: string;
}
